📚 Course Selling App

A full-stack course selling platform where admins can create and manage courses and users can browse, purchase and access them, for learning new technologies.
Built with a modern React+Tailwind frontend, Node.js+Express.js backend, secure (Role-based) JWT authentication, integreted Stripe for paymentGateway, refreshToken-accessToken cycle to prevent leak,misuse and damage of token(authorization) and Redis-based rate limiting to simulate production-level backend practices.

🚀 Features


[ 👤 User Features ]
- User Signup and Signin
- Secure authentication using JWT
- Browse available courses
- Purchase courses
- Access content of purchased courses
- logout


[ 🛠 Admin Features ]
- Admin authentication
- Create new courses
- Update existing courses
- Manage course content
- Delete course
- View all available courses created by other admins(Read-only)

[ 🔒 Security & Backend Practices ]
- JWT Authentication
- Role-based Authorization (Admin/User)
- Password hashing using bcrypt
- Redis-based Rate Limiting
- Secure API architecture
- Middleware-based request validation
- refresh Token cycle to prevent and minimize leak/damage of data and authorization


[ 🧠 Tech Stack ]

[ Frontend ]
- React
- Axios
- React Router
- Tailwind
- ReactToast

Key Implementations [Frontend ]
- Axios API instance
- JWT request interceptor
- Automatic Authorization header injection
- CORS handling
- Authentication flow handling
- Condtional Rendering on content of course

[ Backend ]
- Node.js
- Express.js
- Database
- MongoDB
- Mongoose

Key Implementations [ Backend ]
- RESTful API design
- JWT authentication
- Role-based authorization
- Middleware architecture
- Secure password hashing using bcrypt
- Redis based rate limiting
- MongoDB database modeling

[ Authentication ]
- JWT (JSON Web Tokens)
- bcrypt

[ Performance & Security ]
- Upstash Redis
- @upstash/ratelimit

[ Other Tools ]
- Postman for API testing
- dotenv for environment configuration
- cookie-parser
- cors


[ 📂 Project Structure ]
- course-selling-SaaS
- │
- ├── backend
- │   │
- │   ├── config
- │   │   ├── db.js
- │   │   └── stripe.js
- │   │
- │   ├── controllers
- │   │   ├── adminControllers.js
- │   │   ├── globalControllers.js
- │   │   ├── paymentControllers.js
- │   │   └── userControllers.js
- │   │
- │   ├── Middlewares
- │   │   ├── Middlewares.js
- │   │   └── rateLimiters.js
- │   │
- │   ├── Models
- │   │   └── models.js
- │   │
- │   ├── routes
- │   │   ├── adminRoutes.js
- │   │   ├── globalRoutes.js
- │   │   ├── paymentsRoutes.js
- │   │   └── userRoutes.js
- │   │
- │   ├── utils
- │   │   └── redisClient.js
- │   │
- │   ├── validations
- │   │   ├── adminValidations.js
- │   │   ├── courseValidations.js
- │   │   └── userValidations.js
- │   │
- │   ├── .env
- │   ├── .gitignore
- │   ├── main.js
- │   ├── package.json
- │   └── package-lock.json
- │
- ├── course-app   (Frontend - React + Vite)
- │   │
- │   ├── public
- │   │
- │   ├── src
- │   │   │
- │   │   ├── assets
- │   │   │
- │   │   ├── components
- │   │   │   ├── Button.jsx
- │   │   │   ├── Carsoul.jsx
- │   │   │   ├── FAQ.jsx
- │   │   │   ├── FeaturedProds.jsx
- │   │   │   ├── Footer.jsx
- │   │   │   ├── Hero.jsx
- │   │   │   ├── Input.jsx
- │   │   │   ├── Navbar.jsx
- │   │   │   ├── NavbarSearch.jsx
- │   │   │   ├── Podcasts.jsx
- │   │   │   ├── ProtectedAdminRoute.jsx
- │   │   │   ├── Signin.jsx
- │   │   │   └── Signup.jsx
- │   │   │
- │   │   ├── pages
- │   │   │   ├── adminPanel.jsx
- │   │   │   ├── CourseDetailPage.jsx
- │   │   │   ├── courses.jsx
- │   │   │   ├── home.jsx
- │   │   │   ├── paymentSuccess.jsx
- │   │   │   └── purchasedCourses.jsx
- │   │   │
- │   │   ├── utils
- │   │   │   └── api.js
- │   │   │
- │   │   ├── App.jsx
- │   │   ├── index.css
- │   │   └── main.jsx
- │   │
- │   ├── index.html
- │   ├── vite.config.js
- │   ├── eslint.config.js
- │   ├── .gitignore
- │   ├── package.json
- │   └── package-lock.json
- │
- └── README.md

[ ⚙️ Environment Variables ]
- Create a .env file in the root directory.
- PORT=3000
- MONGO_URI=your_mongodb_connection_string
- JWT_ACCESS_SECRET=your_jwt_secret
- JWT_REFRESH_SECRET=your_jwt_secret
- STRIPE_PUBLISHABLE_KEY=your_stripe-public_key
- STRIPE_SECRET_KEY=your_stripe_secret_key
- STRIPE_SECRET_KEY=your_stripe_secret_key
- UPSTASH_REDIS_REST_URL=your_upstash_redis_url
- UPSTASH_REDIS_TOKEN=your_upstash_redis_token


[ 🧪 Running the Project Locally ]

1️⃣ Clone the repository
- git clone https://github.com/Naufil-29/course-selling-SaaS

2️⃣ Navigate to project
- cd course-selling-app

3️⃣ Install backend and fronetend dependencies
- (backend)
- cd backend
- npm install
- (frontend)
- cd 'course-app'
- npm install

4️⃣ Create .env file and add the required variables.

5️⃣ Run the server
npm run dev
or
node main.js
Server will start on:
http://localhost:3000


[ 🛡 Rate Limiting Implementation ]

This project implements API rate limiting using Upstash Redis.
- Purpose:
- Prevent API abuse
- Protect against brute force attacks
- Improve backend stability
- Example configuration:
- 5 requests per minute per IP

Implemented using:
- @upstash/redis
- @upstash/ratelimit

[ 📬 API Endpoints Overview ]

Users-Routes

- POST /users/signup
- POST /users/signin
- POST /users/course/:courseId (purchase a course)
- GET /users/courses (get all courses)
- GET /users/purchasedCourses (get all purchased courses)
- GET /users/course/:courseId (get one course)


Admin-Routes

- POST /admin/signup
- POST /admin/signin
- POST /admin/course (create-course)
- PUT /admin/course/:id (update-course)
- DELETE /admin/course/:courseId (delete-course)
- GET /admin/courses (get all courses)
- GET /admin/mycourses (get all courses created by Me(admin))

global-Routes

- POST /refresh (For refreshToken to generate accessToken)
- POST /logout (global logout for both [users/admins])
- GET /search (search for all courses)


Payments

- POST /payment/create-checkout-session (creates payment session of stripe)
- POST /payment/verify (verifies if payment.status = paid, then add course._id to purchasedCourses[])

[ 🎯 Learning Outcomes ]

This project helped me learn, Revise and implement:

- RESTful API design
- JWT authentication system
- Middleware architecture in Express
- Secure password storage with bcrypt
- Redis based rate limiting
- Role-based authorization
- MongoDB schema design
- Scalable backend structure
- payment gateway integretion

{ 📌 Future Improvements ]
- Implement Docker deployment
- Add CI/CD pipeline

[ 👨‍💻 Author ]
- Naufil
- Full Stack Developer (MERN)

[ ⭐ If you found this project useful ]
- Give the repo a ⭐ on GitHub!
