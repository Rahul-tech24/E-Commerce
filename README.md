# E-Commerce Application

A full-stack e-commerce application built with Node.js, Express, MongoDB, and Redis.

## Features

### Authentication System ✅
- User registration with validation
- User login with JWT tokens
- Secure logout with token invalidation
- Password hashing with bcrypt
- HTTP-only cookies for token storage
- Redis-based session management

### Planned Features 🚧
- Product catalog management
- Shopping cart functionality
- Order processing
- Payment integration (Stripe)
- Image upload (Cloudinary)
- Admin dashboard
- User roles and permissions

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database with Mongoose ODM
- **Redis** - Session storage and caching
- **JWT** - Authentication tokens
- **bcrypt.js** - Password hashing

### Frontend (Planned)
- React.js or similar framework

## Project Structure

```
ecom/
├── backend/
│   ├── controllers/
│   │   └── auth.controller.js     # Authentication logic
│   ├── lib/
│   │   ├── db.js                  # MongoDB connection
│   │   └── redis.js               # Redis client setup
│   ├── models/
│   │   └── user.model.js          # User schema
│   ├── routes/
│   │   └── auth.route.js          # Authentication routes
│   └── server.js                  # Express server setup
├── frontend/                      # Frontend application (TBD)
├── package.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- Redis
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd ecom
```

2. Install dependencies
```bash
npm install
```

3. Create environment variables
Create a `.env` file in the root directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
REDIS_URL=your_redis_connection_string
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
NODE_ENV=development
```

4. Start the development server
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

## Scripts

- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test your changes
5. Submit a pull request

## License

ISC License