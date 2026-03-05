📚 Course Selling App

A full-stack course selling platform where admins can create and manage courses and users can browse and purchase them.
Built with a modern MERN-style backend architecture, secure authentication, and production-level practices like JWT auth, Redis rate limiting,
and middleware-based authorization.

🚀 Features


[ 👤 User Features ]
- User registration and login
- Secure authentication using JWT
- Browse available courses
-Purchase courses
- Access purchased courses


[ 🛠 Admin Features ]
- Admin authentication
- Create new courses
- Update existing courses
- Manage course content
- View users and purchases

[ 🔒 Security & Backend Practices ]
- JWT Authentication
- Role-based Authorization (Admin/User)
- Password hashing using bcrypt
- Redis-based Rate Limiting
- Secure API architecture
- Middleware-based request validation


[ 🧠 Tech Stack ]

[ Backend ]
- Node.js
- Express.js
- Database
- MongoDB
- Mongoose

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
- course-selling-app
- │
- ├── config
- │   └── db.js
- │
- ├── Middlewares
- │   ├── authMiddleware.js
- │   └── rateLimiters.js
- │
- ├── models
- │   ├── userModel.js
- │   ├── adminModel.js
- │   ├── courseModel.js
- │   └── purchaseModel.js
- │
- ├── routes
- │   ├── adminRoutes.js
- │   ├── userRoutes.js
- │   ├── globalRoutes.js
- │   └── paymentsRoutes.js
- │
- ├── utils
- │   └── redisClient.js
- │
- ├── server.js
- └── package.json


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
- git clone https://github.com/your-username/course-selling-app.git

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

Users

- POST /users/signup
- POST /users/login
- GET /users/courses

Admin

- POST /admin/signup
- POST /admin/login
- POST /admin/course
- PUT /admin/course/:id
- GET /admin/courses

Payments

- POST /payment/checkout
- POST /payment/verify

[ 🎯 Learning Outcomes ]

This project helped me learn and implement:

- RESTful API design
- JWT authentication system
- Middleware architecture in Express
- Secure password storage with bcrypt
- Redis based rate limiting
- Role-based authorization
- MongoDB schema design
- Scalable backend structure

{ 📌 Future Improvements ]
- Add frontend using React
- Integrate Stripe payments
- Add course video streaming
- Implement Docker deployment
- Add CI/CD pipeline

[ 👨‍💻 Author ]
- Naufil
- Full Stack Developer (MERN)

[ ⭐ If you found this project useful ]
- Give the repo a ⭐ on GitHub!
