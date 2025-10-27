import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import redisClient from '../lib/redis.js';

const generateTokens = (userId) => {
    const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
    return { accessToken, refreshToken };
};


const storeRefreshToken = async (userId, refreshToken) => {
    await redisClient.set(`refreshToken:${userId}`, refreshToken, 'EX', 7 * 24 * 60 * 60);
};

const setCookies = (res, accessToken, refreshToken) => {
    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 15 * 60 * 1000 // 15 minutes
    });
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
};

const signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }
        if (email) {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: "Email is already in use" });
            }
        }
        
        // Validate role if provided
        if (role && !['customer', 'admin'].includes(role)) {
            return res.status(400).json({ message: "Invalid role. Must be 'customer' or 'admin'" });
        }

        const userData = { name, email, password };
        if (role) userData.role = role;
        
        const newUser = await User.create(userData);

        const { accessToken, refreshToken } = generateTokens(newUser._id);

        await storeRefreshToken(newUser._id, refreshToken);

        setCookies(res, accessToken, refreshToken);
        const { password: _, ...userWithoutPassword } = newUser.toObject();
        res.status(201).json({ message: "User registered successfully", user: userWithoutPassword });

    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const { accessToken, refreshToken } = generateTokens(user._id);

        await storeRefreshToken(user._id, refreshToken);

        setCookies(res, accessToken, refreshToken);

        const { password: _, ...userWithoutPassword } = user.toObject();
        res.status(200).json({ 
            message: "Login successful", 
            user: userWithoutPassword 
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const logout = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        
        if (refreshToken) {
            const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            await redisClient.del(`refreshToken:${decoded.userId}`);
        }

        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};



const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({ message: "Refresh token missing" });
        }

        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const storedToken = await redisClient.get(`refreshToken:${decoded.userId}`);

        if (storedToken !== refreshToken) {
            return res.status(403).json({ message: "Invalid refresh token" });
        }
        const userId = decoded.userId;

        const newAccessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
        res.cookie('accessToken', newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 15 * 60 * 1000 // 15 minutes
        });

        res.status(200).json({ message: "Token refreshed successfully" });
    } catch (error) {
        console.error("Refresh token error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getProfile = async (req, res) => {
    try {
        // req.user is set by the protectRoute middleware
        const user = req.user;
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user });
    } catch (error) {
        console.error("Get profile error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export { signup, login, logout, refreshToken, getProfile };
