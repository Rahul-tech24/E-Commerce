import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './lib/db.js';
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();


import authRoutes from './routes/auth.route.js';
import productRoutes from './routes/product.route.js';
import cartRoutes from './routes/cart.route.js';
import couponRoutes from './routes/coupon.route.js';
import paymentRoutes from './routes/payment.route.js';
import analyticsRoutes from './routes/analytics.route.js';



app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());




app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/analytics', analyticsRoutes);



if (process.env.NODE_ENV === "production") {
	// Serve static files from the React build
	app.use(express.static(path.join(__dirname, "/frontend/dist")));
	
	// Serve static files from public folder (images, etc.)
	app.use(express.static(path.join(__dirname, "/frontend/public")));

	// Handle React routing, return all requests to React app
	app.use((req, res, next) => {
		// Skip API routes and static files
		if (req.path.startsWith('/api/') || req.path.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/)) {
			return next();
		}
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
} else {
	// In development, serve public folder for images
	app.use(express.static(path.join(__dirname, "/frontend/public")));
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
