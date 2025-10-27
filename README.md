# 🛍️ E-Commerce Platform

A full-stack e-commerce application built with the MERN stack, featuring user authentication, product management, shopping cart functionality, Stripe payment integration, and comprehensive admin analytics.

## ✨ Features

### 🔐 Authentication & User Management
- JWT-based authentication with refresh tokens
- Role-based access control (Admin/Customer)
- Secure signup, login, and logout functionality
- Password encryption with bcrypt

### 🛒 Shopping Experience
- Browse products by categories
- Featured products carousel
- Add/remove items from cart
- Real-time cart updates with persistent storage
- Responsive product cards with hover effects

### 💳 Payment Processing
- Stripe integration for secure payments
- Checkout session creation
- Order confirmation pages
- Coupon and discount system
- Purchase success/cancel handling

### 📊 Admin Dashboard
- Product CRUD operations
- User analytics and metrics
- Sales overview with interactive charts
- Revenue tracking and reporting
- Order management system

### 🎨 Modern UI/UX
- Responsive design with Tailwind CSS
- Smooth animations with Framer Motion
- Interactive charts with Recharts
- Toast notifications for user feedback
- Loading states and error handling

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database with Mongoose ODM
- **JWT** - Authentication tokens
- **Stripe** - Payment processing
- **Cloudinary** - Image storage
- **Redis** - Session management

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Zustand** - State management
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Recharts** - Data visualization
- **Axios** - HTTP client

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB database
- Stripe account for payments
- Cloudinary account for image storage

### Environment Variables

Create a `.env` file in the root directory:

```env
# Database
MONGO_URI=your_mongodb_connection_string

# JWT Secrets
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Client URL (for production)
CLIENT_URL=your_frontend_url
```

### Installation & Development

1. **Clone the repository**
```bash
git clone https://github.com/Rahul-tech24/E-Commerce.git
cd E-Commerce
```

2. **Install backend dependencies**
```bash
npm install
```

3. **Install frontend dependencies**
```bash
cd frontend
npm install
cd ..
```

4. **Start development servers**
```bash
# Start backend (from root directory)
npm run dev

# Start frontend (in a new terminal)
cd frontend
npm run dev
```

The application will be available at:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`

### Production Deployment

1. **Build the application**
```bash
npm run build
```

2. **Start production server**
```bash
npm start
```

## 📁 Project Structure

```
ecom/
├── backend/
│   ├── controllers/        # Route handlers
│   ├── lib/               # Database and external services
│   ├── middleware/        # Authentication middleware
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API routes
│   └── server.js         # Express server setup
├── frontend/
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Page components
│   │   ├── store/        # Zustand stores
│   │   ├── lib/          # Utilities and configurations
│   │   └── App.jsx       # Main application
│   ├── public/           # Static assets
│   └── package.json      # Frontend dependencies
├── .env                  # Environment variables
├── package.json          # Backend dependencies
└── README.md             # Project documentation
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get user profile
- `POST /api/auth/refresh-token` - Refresh access token

### Products
- `GET /api/products` - Get all products
- `GET /api/products/featured` - Get featured products
- `GET /api/products/category/:category` - Get products by category
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Shopping Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update item quantity
- `DELETE /api/cart` - Remove item from cart

### Payments
- `POST /api/payments/create-checkout-session` - Create Stripe session
- `POST /api/payments/checkout-success` - Handle successful payment

### Analytics (Admin)
- `GET /api/analytics` - Get comprehensive analytics data

## 🎯 Key Features Implementation

### State Management with Zustand
- **useUserStore**: Authentication and user management
- **useProductStore**: Product data and operations
- **useCartStore**: Shopping cart functionality

### Payment Flow
1. User proceeds to checkout from cart
2. Stripe checkout session created with product details
3. User redirected to Stripe-hosted payment page
4. Payment success/cancel handling with order creation
5. Cart cleared and confirmation displayed

### Admin Analytics
- Real-time sales and revenue tracking
- Interactive charts showing 7-day sales trends
- User and product count metrics
- Responsive dashboard with animated cards

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token rotation and refresh mechanism
- Protected routes with role-based access
- Input validation and sanitization
- Secure payment processing with Stripe

## 🚀 Deployment

The application is configured for easy deployment to platforms like:
- **Heroku**
- **Vercel**
- **Railway**
- **DigitalOcean**

Production build includes:
- Static file serving from backend
- Environment-based configuration
- Optimized frontend bundle
- Database connection handling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Rahul**
- GitHub: [@Rahul-tech24](https://github.com/Rahul-tech24)

## 🙏 Acknowledgments

- React team for the amazing framework
- Stripe for secure payment processing
- MongoDB for the flexible database
- All open-source contributors

---

⭐ **Star this repository if you found it helpful!**