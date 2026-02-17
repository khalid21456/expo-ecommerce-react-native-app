# Expo E-Commerce Platform

A full-stack e-commerce application built with modern web and mobile technologies. The platform consists of three main applications: a React admin dashboard, a Node.js/Express backend API, and a React Native mobile app.

## 🏗️ Project Architecture

```
expo-ecommerce/
├── backend/          # Node.js REST API server
├── admin/            # React admin dashboard
├── mobile/           # React Native mobile application
└── package.json      # Monorepo root configuration
```

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Backend Documentation](#backend-documentation)
- [Admin Dashboard](#admin-dashboard)
- [Mobile Application](#mobile-application)
- [Configuration](#configuration)
- [Development](#development)
- [Deployment](#deployment)
- [Technologies Used](#technologies-used)

## ✅ Prerequisites

- **Node.js**: v20.0.0 or higher
- **npm**: v10.0.0 or higher
- **Git**: For version control
- **Expo CLI**: For mobile development (`npm install -g expo-cli`)
- **Android/iOS SDK**: For mobile app testing (optional)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd expo-ecommerce
```

### 2. Install Dependencies

Install dependencies for all packages:

```bash
npm run build
```

Or install each package individually:

```bash
# Backend
cd backend && npm install && cd ..

# Admin
cd admin && npm install && cd ..

# Mobile
cd mobile && npm install && cd ..
```

### 3. Environment Setup

Create `.env` files for backend and admin dashboard. See [Configuration](#configuration) section.

### 4. Start Development Servers

```bash
# Terminal 1: Start backend
cd backend
npm run dev

# Terminal 2: Start admin dashboard
cd admin
npm run dev

# Terminal 3: Start mobile app
cd mobile
npm start
```

## 📁 Project Structure

### Root Directory

```
package.json          # Monorepo configuration
README.md            # This file
```

### [Backend](./backend)

Complete REST API server built with Express.js and MongoDB.

```
backend/
├── src/
│   ├── server.js              # Express app entry point
│   ├── config/
│   │   ├── db.js              # MongoDB connection
│   │   ├── env.js             # Environment variables
│   │   ├── cloudinary.js       # Image upload service
│   │   └── inngest.js          # Job queue service
│   ├── controllers/
│   │   ├── admin.controller.js     # Admin operations
│   │   ├── user.controller.js      # User management
│   │   ├── product.controller.js   # Product operations
│   │   ├── order.controller.js     # Order processing
│   │   ├── cart.controller.js      # Shopping cart
│   │   └── review.controller.js    # Product reviews
│   ├── models/
│   │   ├── user.model.js      # User schema
│   │   ├── product.model.js    # Product schema
│   │   ├── order.model.js      # Order schema
│   │   ├── cart.model.js       # Cart schema
│   │   └── review.model.js     # Review schema
│   ├── routes/
│   │   ├── admin.route.js      # Admin routes
│   │   ├── user.route.js       # User routes
│   │   ├── product.route.js    # Product routes
│   │   ├── order.route.js      # Order routes
│   │   ├── cart.route.js       # Cart routes
│   │   ├── review.route.js     # Review routes
│   │   └── Clerk.route.js      # Authentication routes
│   └── middleware/
│       ├── auth.middleware.js  # Authentication & authorization
│       └── multer.middleware.js # File upload handling
└── package.json
```

### [Admin Dashboard](./admin)

React-based admin panel for managing products, orders, and customers.

```
admin/
├── src/
│   ├── main.jsx               # React entry point
│   ├── App.jsx                # Main app component
│   ├── index.css              # Global styles
│   ├── components/
│   │   ├── Navbar.jsx         # Top navigation bar
│   │   ├── Sidebar.jsx        # Side navigation
│   │   └── PageLoader.jsx     # Loading component
│   ├── layouts/
│   │   └── DashboardLayout.jsx # Main dashboard layout
│   ├── pages/
│   │   ├── LoginPage.jsx      # Login page
│   │   ├── DashboardPage.jsx  # Dashboard overview
│   │   ├── ProductPage.jsx    # Products management
│   │   ├── OrdersPage.jsx     # Orders management
│   │   └── CustomersPage.jsx  # Customers list
│   └── lib/
│       ├── api.js             # API request helpers
│       ├── axios.js           # Axios instance configuration
│       └── utils.js           # Utility functions
├── vite.config.js             # Vite configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── package.json
└── eslint.config.js           # ESLint configuration
```

### [Mobile App](./mobile)

React Native mobile application using Expo and Expo Router.

```
mobile/
├── app/
│   ├── _layout.tsx            # Root layout
│   ├── modal.tsx              # Modal screen
│   └── (tabs)/
│       ├── _layout.tsx        # Tabs layout
│       ├── index.tsx          # Home tab
│       └── explore.tsx        # Explore tab
├── components/
│   ├── external-link.tsx      # External link component
│   ├── haptic-tab.tsx         # Haptic feedback tab
│   ├── hello-wave.tsx         # Hello wave component
│   ├── parallax-scroll-view.tsx # Parallax scroll component
│   ├── themed-text.tsx        # Theme-aware text
│   ├── themed-view.tsx        # Theme-aware view
│   └── ui/
│       ├── collapsible.tsx    # Collapsible component
│       ├── icon-symbol.tsx    # Icon symbol
│       └── icon-symbol.ios.tsx # iOS-specific icon
├── constants/
│   └── theme.ts               # Theme constants
├── hooks/
│   ├── use-color-scheme.ts    # Color scheme hook
│   ├── use-color-scheme.web.ts # Web-specific color scheme
│   └── use-theme-color.ts     # Theme color hook
├── assets/
│   └── images/                # Image assets
├── scripts/
│   └── reset-project.js       # Project reset script
├── tsconfig.json              # TypeScript configuration
├── package.json
└── app.json                   # Expo app configuration
```

## 🔧 Backend Documentation

### Overview

The backend is a RESTful API built with Express.js and MongoDB, handling all business logic for the e-commerce platform including user management, product catalog, orders, and shopping cart functionality.

### Key Technologies

- **Express.js**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB ODM
- **Clerk**: Authentication service
- **Cloudinary**: Image hosting and optimization
- **Multer**: File upload middleware
- **Inngest**: Job queue and workflow service
- **CORS**: Cross-origin resource sharing

### Database Models

#### User Model

```
- _id (ObjectId)
- email (String)
- phone (String)
- firstName (String)
- lastName (String)
- avatar (String)
- addresses (Array)
- createdAt (Date)
- updatedAt (Date)
```

#### Product Model

```
- _id (ObjectId)
- name (String)
- description (String)
- price (Number)
- discountPrice (Number)
- stock (Number)
- images (Array)
- category (String)
- tags (Array)
- createdAt (Date)
- updatedAt (Date)
```

#### Order Model

```
- _id (ObjectId)
- userId (ObjectId - ref: User)
- items (Array of objects with productId, quantity, price)
- totalAmount (Number)
- status (String: pending, processing, shipped, delivered)
- shippingAddress (Object)
- paymentMethod (String)
- createdAt (Date)
- updatedAt (Date)
```

#### Cart Model

```
- _id (ObjectId)
- userId (ObjectId - ref: User)
- items (Array of objects with productId, quantity)
- createdAt (Date)
- updatedAt (Date)
```

#### Review Model

```
- _id (ObjectId)
- productId (ObjectId - ref: Product)
- userId (ObjectId - ref: User)
- rating (Number: 1-5)
- comment (String)
- createdAt (Date)
- updatedAt (Date)
```

### API Routes

#### Authentication Routes (`/api`)
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `POST /auth/logout` - Logout user

#### Admin Routes (`/api/admin`)
- `GET /dashboard` - Get dashboard statistics
- `GET /analytics` - Get analytics data
- `POST /settings` - Update admin settings

#### User Routes (`/api/users`)
- `GET /` - Get all users
- `GET /:id` - Get user by ID
- `PUT /:id` - Update user
- `DELETE /:id` - Delete user
- `GET /:id/orders` - Get user's orders

#### Product Routes (`/api/product`)
- `GET /` - Get all products
- `GET /:id` - Get product by ID
- `POST /` - Create new product
- `PUT /:id` - Update product
- `DELETE /:id` - Delete product
- `GET /:id/reviews` - Get product reviews

#### Order Routes (`/api/orders`)
- `GET /` - Get all orders
- `POST /` - Create new order
- `GET /:id` - Get order by ID
- `PUT /:id` - Update order status
- `DELETE /:id` - Cancel order

#### Cart Routes (`/api/cart`)
- `GET /` - Get user's cart
- `POST /add` - Add item to cart
- `PUT /update/:productId` - Update cart item quantity
- `DELETE /remove/:productId` - Remove item from cart
- `DELETE /clear` - Clear entire cart

#### Review Routes (`/api/reviews`)
- `GET /` - Get all reviews
- `POST /` - Create new review
- `PUT /:id` - Update review
- `DELETE /:id` - Delete review

### Middleware

- **Authentication (`auth.middleware.js`)**: Verifies Clerk tokens and attaches user information to requests
- **File Upload (`multer.middleware.js`)**: Handles image uploads and file validation

### Environment Variables

Create a `.env` file in the backend directory:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname

# Authentication
CLERK_API_KEY=your_clerk_api_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Image Upload
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# CORS
CORS_ORIGIN=http://localhost:5173
```

### Running Backend

```bash
cd backend

# Development with auto-reload
npm run dev

# Production
npm start
```

## 👨‍💼 Admin Dashboard

### Overview

The admin dashboard is a React application built with Vite, providing a user interface for managing products, orders, and customers.

### Key Technologies

- **React 19**: UI library
- **Vite**: Build tool and dev server
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **DaisyUI**: Component library for Tailwind
- **Clerk**: Authentication
- **TanStack Query**: Data fetching and caching
- **Axios**: HTTP client
- **Lucide React**: Icon library

### Features

- **Dashboard Overview**: Key metrics and statistics
- **Product Management**: CRUD operations for products
- **Order Management**: View and manage customer orders
- **Customer Management**: View customer information
- **Authentication**: Clerk-based login/logout
- **Responsive Design**: Mobile-friendly interface

### Pages

#### Login Page
- User authentication via Clerk
- Redirects authenticated users to dashboard

#### Dashboard Page
- Overview of key metrics
- Recent orders and sales statistics
- Quick action links

#### Products Page
- List all products
- Add new products
- Edit/delete products
- Image upload integration

#### Orders Page
- View all orders
- Filter orders by status
- Update order status
- View order details

#### Customers Page
- List all customers
- Customer details
- Customer order history

### Configuration Files

- **`vite.config.js`**: Vite development server and build settings
- **`tailwind.config.js`**: Tailwind CSS customization
- **`postcss.config.js`**: PostCSS and Autoprefixer configuration
- **`eslint.config.js`**: ESLint rules for code quality

### API Integration

The admin dashboard communicates with the backend API through:

- **`lib/axios.js`**: Axios instance with base URL and interceptors
- **`lib/api.js`**: API request helper functions
- Clerk authentication tokens attached to requests

### Running Admin Dashboard

```bash
cd admin

# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

The admin dashboard runs on `http://localhost:5173` by default.

## 📱 Mobile Application

### Overview

A React Native mobile application built with Expo, providing a shopping experience for customers.

### Key Technologies

- **React Native**: Mobile framework
- **Expo**: React Native toolchain and managed service
- **Expo Router**: File-based routing
- **TypeScript**: Type-safe JavaScript
- **React Navigation**: Navigation library
- **React Native Web**: Web support for React Native

### Project Structure

The mobile app uses Expo Router for file-based routing:

- **`app/_layout.tsx`**: Root layout wrapper
- **`app/(tabs)/_layout.tsx`**: Tab navigation layout
- **`app/(tabs)/index.tsx`**: Home/browse products screen
- **`app/(tabs)/explore.tsx`**: Explore/search screen
- **`app/modal.tsx`**: Modal screen example

### Features

- **Tab Navigation**: Bottom tab navigation for main sections
- **Responsive Design**: Adapts to different screen sizes
- **Dark Mode Support**: Theme switcher with system preference
- **Haptic Feedback**: Tactile feedback for interactions
- **Reanimated**: Smooth animations and transitions

### Hooks

- **`useColorScheme()`**: Get and manage color scheme (light/dark)
- **`useThemeColor()`**: Access theme colors dynamically

### Components

- **Themed Components**: Text and View components with theme support
- **Parallax Scroll**: Parallax scrolling effects
- **Collapsible**: Expandable/collapsible sections
- **External Link**: Links to external URLs
- **Haptic Tab**: Tab with haptic feedback

### Running Mobile App

```bash
cd mobile

# Start Expo development server
npm start

# Run on iOS simulator (macOS only)
npm run ios

# Run on Android emulator
npm run android

# Run web version
npm run web

# Lint code
npm lint
```

### Building for Production

```bash
# iOS
expo build:ios

# Android
expo build:android

# Web
expo export:web
```

## ⚙️ Configuration

### Backend Configuration Files

#### `config/db.js`
Handles MongoDB connection using Mongoose.

#### `config/env.js`
Centralizes environment variable management.

#### `config/cloudinary.js`
Configures Cloudinary for image upload and optimization.

#### `config/inngest.js`
Sets up Inngest for background jobs and workflows.

### Admin Configuration Files

#### `vite.config.js`
```javascript
- Development server settings
- Build optimization
- React plugin configuration
```

#### `tailwind.config.js`
```javascript
- Custom color schemes
- Font configurations
- DaisyUI plugin integration
```

### Mobile Configuration Files

#### `app.json`
Expo app configuration including:
- App name and version
- Icon and splash screen
- Android/iOS-specific settings
- EAS build configuration

#### `tsconfig.json`
TypeScript configuration for type checking.

## 🛠️ Development

### Code Quality

- **ESLint**: Linting for code consistency
- **Prettier**: Code formatting (if configured)
- **TypeScript**: Type safety in mobile app

### Running Linters

```bash
# Admin dashboard
cd admin && npm run lint

# Mobile app
cd mobile && npm run lint
```

### Development Workflow

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Run linters and tests
4. Commit changes: `git commit -am 'Add your message'`
5. Push to branch: `git push origin feature/your-feature`
6. Create Pull Request

## 📦 Deployment

### Backend Deployment

The backend can be deployed to various platforms:

- **Heroku**: Requires `Procfile`
- **AWS**: EC2, Elastic Beanstalk, or Lambda
- **Azure**: App Service
- **DigitalOcean**: App Platform

#### Production Environment Variables

Set these in your deployment platform:

```env
NODE_ENV=production
MONGODB_URI=production_mongodb_uri
PORT=5000
CLERK_API_KEY=production_clerk_key
CLOUDINARY_NAME=cloudinary_name
CLOUDINARY_API_KEY=api_key
CLOUDINARY_API_SECRET=api_secret
CORS_ORIGIN=your_frontend_url
```

#### Building for Production

```bash
cd backend
npm run build
npm start
```

### Admin Dashboard Deployment

Build the admin dashboard for production:

```bash
cd admin
npm run build
```

This generates a `dist` folder that can be served by:
- Vercel
- Netlify
- GitHub Pages
- Traditional web servers (Nginx, Apache)

The backend is configured to serve the admin dashboard from the `dist` folder when `NODE_ENV=production`.

### Mobile App Deployment

Using Expo:

```bash
# Login to Expo
expo login

# Submit build to EAS (Expo Application Services)
eas build --platform all
```

For app stores:
- **Apple App Store**: Follow Apple's app submission guidelines
- **Google Play Store**: Follow Google's app submission guidelines

## 🔐 Security Considerations

1. **Authentication**: Uses Clerk for secure authentication
2. **CORS**: Configured to only allow requests from trusted origins
3. **Environment Variables**: Never commit `.env` files
4. **Input Validation**: Validate and sanitize all user inputs
5. **Rate Limiting**: Consider implementing rate limiting on API endpoints
6. **HTTPS**: Always use HTTPS in production
7. **Password Security**: Passwords should be hashed (handled by Clerk)

## 📝 Common Tasks

### Adding a New Product

1. Go to Admin Dashboard → Products
2. Click "Add Product"
3. Fill in product details
4. Upload product images
5. Set pricing and stock
6. Submit

### Creating an Order

Users can create orders through:
1. Mobile app: Browse → Add to Cart → Checkout
2. API: POST `/api/orders` with order details

### Managing Orders

1. Go to Admin Dashboard → Orders
2. View order details
3. Update order status (pending → processing → shipped → delivered)

## 🐛 Troubleshooting

### Backend Connection Issues

**Problem**: Cannot connect to MongoDB
- Check `MONGODB_URI` in `.env`
- Ensure MongoDB server is running
- Verify network connectivity

**Problem**: Cloudinary upload fails
- Check `CLOUDINARY_NAME` and API credentials
- Verify account is active

### Admin Dashboard Issues

**Problem**: Page not loading
- Clear browser cache
- Check network tab in DevTools
- Ensure backend server is running

**Problem**: Authentication not working
- Verify Clerk keys are correct
- Check CORS configuration

### Mobile App Issues

**Problem**: App crashes on startup
- Run `npm install` to ensure all dependencies are installed
- Clear Expo cache: `expo start -c`
- Check TypeScript errors

**Problem**: Cannot connect to backend
- Ensure backend URL is correct in configuration
- Check network connectivity
- Verify CORS is enabled on backend

## 📚 Resources

- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Expo Documentation](https://docs.expo.dev/)
- [Clerk Documentation](https://clerk.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 📄 License

ISC

