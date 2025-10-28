import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./lib/db.js";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// Routes
import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";
import couponRoutes from "./routes/coupon.route.js";
import paymentRoutes from "./routes/payment.route.js";
import analyticsRoutes from "./routes/analytics.route.js";

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/analytics", analyticsRoutes);

// Debug route to check file structure
app.get('/debug-files', (req, res) => {
  import('fs').then(fs => {
    const publicPath = path.join(__dirname, "frontend/public");
    const distPath = path.join(__dirname, "frontend/dist");
    
    try {
      const publicFiles = fs.readdirSync(publicPath);
      let distFiles = [];
      try {
        distFiles = fs.readdirSync(distPath);
      } catch (e) {
        distFiles = ['dist folder not found'];
      }
      
      res.json({
        __dirname,
        NODE_ENV: process.env.NODE_ENV,
        publicPath,
        distPath,
        publicFiles,
        distFiles
      });
    } catch (error) {
      res.json({ error: error.message, __dirname });
    }
  });
});

// ✅ Production setup
if (process.env.NODE_ENV === "production") {
  // Serve React app static files (includes images copied from public folder)
  const frontendPath = path.join(__dirname, "frontend/dist");
  app.use(express.static(frontendPath));

  // Handle React routing - catch-all for non-API, non-static requests
  app.use((req, res, next) => {
    // Skip API routes and static files
    if (req.path.startsWith('/api/') || req.path.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/)) {
      return next();
    }
    res.sendFile(path.join(frontendPath, "index.html"));
  });
} else {
  // Development: serve public folder for images
  app.use(express.static(path.join(__dirname, "frontend/public")));
}

app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
  connectDB();
});
