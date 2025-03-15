# 📚 BookVerse - MERN Stack Book Store

A modern, responsive full-stack application for managing book inventory with complete CRUD functionality and featuring image uploads via Multer & Cloudinary.

<br>

![bookverse-logo.png](<https://media-hosting.imagekit.io//c914e0b392db4434/bookverse-logo.png?Expires=1836666116&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=dEQCEQna7sEtoTQOa-Hdjw4c31hoTjZS3U~pOtesAs5UCwO5gBn2exHDTFSohd871C-RjoKzcTYrL-0f9oxtiPUUXp7FNUol-2TMRokg69vJEv2EAgk2VLNsRN1e4IHfs~cUV2hb41WfCO6W4FrWIswWKC8hVvn8GXstbmEiA73VWM9uhXCFLO6yQ5r~CVLfs99BAinNKoPE1dNNwK-wfLoCsJRRoUpa4b-5WP~aPythUug0H0el7OjiGaaTRVRX86L7FjYZiXtEKO8Sc2kKjailuDXUzois6qWwyp~9rj9HbPbmCB43ML6MeaBw1z0XqU3ebsxq4iHUunPgmCAZUA__>)

<br>

### **BookVerse Demo** - [BookVerse Live](https://book-store-mern-web.vercel.app/)

<br>

## 🚀 Features

- **Complete CRUD Operations**: Create, read, update, and delete books.
- **Secure Image Management**: Image upload and editing with Multer.
- **Responsive UI**: Built with React and Tailwind CSS for all device sizes.
- **RESTful API**: Properly structured backend with Express routes.
- **Database Integration**: MongoDB for efficient data storage and retrieval.
- **Frontend Routing**: Seamless navigation between pages.
- **Search Functionality** - Improve book discovery with search the book.
- **Custom Hooks**: Reusable logic for API calls, form handling, and image uploads.
- **Cross-Origin Support**: Configured CORS policy for secure communication.
- **Cloud Storage**: Cloudinary integration for image hosting and optimization.

## 🛠️ Tech Stack

### Frontend:-
- **React.js**: UI library for building the user interface.
- **React Router**: For client-side navigation.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Custom Hooks**: For reusable state logic, API calls, and image handling.
- **Axios**: Promise-based HTTP client for API requests.
- **Code Splitting**: For improved loading performance.
- **Lazy Loading**: For images and components.

### Backend:-
- **Node.js**: JavaScript runtime for server-side logic.
- **Express.js**: Web framework for handling HTTP requests.
- **MongoDB**: NoSQL database for storing book information.
- **Mongoose**: ODM library for MongoDB and Node.js.
- **Multer**: Middleware for handling file uploads.
- **Cloudinary**: Cloud service for image storage and optimization.
- **CORS**: Middleware for enabling cross-origin requests.

### Hosting & Deployment:-
- **Backend**: Deployed on Render.
- **Frontend**: Deployed on Vercel.
- **Database**: MongoDB Atlas cloud database.
- **Media**: Cloudinary for media storage and delivery.

## 📷 Image Upload with Cloudinary

- Book cover images are uploaded securely to Cloudinary using Multer.
- Supports image editing and optimization for fast loading.
- Stored URLs allow images to persist even after backend redeployment.

## 📋 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/books | Fetch all books |
| POST | /api/books | Create a new book |
| GET | /api/books/:id | Fetch a specific book by ID |
| PATCH | /api/books/:id | Update an existing book |
| DELETE | /api/books/:id | Delete a book |

## 📝 Project Structure

```
MERN BOOK-STORE/
├── frontend/                # Frontend React application
│   ├── public/              # Public assets
│   ├── src/
│   │   ├── assets/          # assets for storing images
│   │   ├── Components/      # Reusable UI components
│   │   ├── Hooks/           # Custom React hooks
│   │   ├── Pages/           # Page components
│   │   ├── utils/           # Utility functions
│   │   ├── App.jsx          # Main application component
│   │   └── index.css        # CSS for styling
│   ├── tailwind.config.js   # Tailwind CSS configuration
│   └── package.json         # Frontend dependencies
│
├── backend/                 # Backend Node.js/Express application
│   ├── src/
│   |   ├── Database/        # Database configuration
│   |   ├── Middleware/      # Custom Middleware Multer with Cloudinary setup
│   |   ├── Models/          # Mongoose data models
│   |   ├── Routes/          # Express route definitions
│   |   ├── index.js         # Server entry point
│   └── package.json         # Backend dependencies
│
└── README.md                # Project documentation
```

## 📸 Screenshots: 

![Hero Section](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/edfxtq1jnejm86piawm3.png)

![Featured Book](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/7t93q54t4xgjsg4f91pc.png)

![Book Collection Card View](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/l0iu72mcbxav492ne623.png)

![Book Collection Table View](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/vlbcpa3maygnz7mpl2f6.png)

![Show Details Book](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/mh3vc5r2oshnhgmjop7m.png)

![Create Book](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/rd4tsa7nardpmszts05o.png)

![Edit Book](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/9q4ha6b7nkenh9eyst17.png)

![Delete Book](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/i4y9qh6iytqurjouibce.png)

![About Page](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/501pmmri4flfff0rrxr3.png)

![Footer](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/sf8ztkkwtgonbptgecyy.png)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14.x or later)
- MongoDB (local installation or MongoDB Atlas account)
- Cloudinary account
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/onkar895/BOOK-STORE-MERN.git
   cd MERN BOOK-STORE
   ```

2. Install backend dependencies
   ```bash
   cd backend
   npm install
   ```

3. Set up environment variables
   Create a `.env` file in the backend directory with the following:
   ```
   MONGODB_URL=your_mongodb_connection_string
   PORT=8000
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. Install frontend dependencies
   ```bash
   cd frontend
   npm install
   ```

5. Run the application
   
   In the backend directory:
   ```bash
   npm start  # Using nodemon for development
   ```
   
   In the frontend directory:
   ```bash
   npm run dev
   ```

6. Access the application at [http://localhost:5173](http://localhost:5173)

## 🚀 Deployment

### Backend Deployment (Render)
1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Configure build and start commands:
   - Build Command: `npm install`
   - Start Command: `node index.js`
4. Add environment variables from your `.env` file
5. Deploy the service

### Frontend Deployment (Vercel)
1. Create a new project on Vercel
2. Connect your GitHub repository
3. Configure build settings:
   - Framework Preset: Create React App
   - Build Command: `npm run build`
   - Output Directory: `build`
4. Configure environment variables
5. Deploy the project

## 🎯 Future Enhancements (Working in Progress)

- 🛒 Wishlist & Cart System - Allow users to save books for future purchases.
- ↗️ Redux-Toolkit - Implementation for efficient state management.
- ✨ Shimmer UI - Providing an engaging and visually pleasing loading experience.
- 🔎 Advanced Search & Filters - Enhance book discovery with intelligent search algorithms and category-based filtering.
- 📖 User Authentication & Reviews -  Implement user registration, login, and book reviews.
- 📦 Order & Payment System - Allow users to purchase books and integrate with payment gateways.
- 🚀 Performance Optimization

## 👨‍💻 Author

Created by [Omkar Karale](https://github.com/onkar895)

## 🙏 Acknowledgements

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://reactjs.org/)
- [Node.js Documentation](https://nodejs.org/)
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Render Hosting](https://render.com/docs)
- [Vercel Hosting](https://vercel.com/docs)