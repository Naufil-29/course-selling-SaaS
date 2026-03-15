
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import SignUp from './components/Signup'
import SignIn from './components/Signin'
import HomePage from './pages/home'
import CoursesPage from './pages/courses'
import AdminPanel from './pages/adminPanel'
import ProtectedAdminRoute from './components/ProtectedAdminRoute'
import PaymentSuccess from './pages/paymentSuccess'
import PurchasedCourses from './pages/purchasedCourses'
import CourseDetailPage from './pages/CourseDetailPage'
import { Toaster } from "react-hot-toast"

function App() {
  return(
<BrowserRouter> 
    <Toaster position='top-center'/>
  <Routes> 
    <Route path="/" element={<HomePage/>}/>
    <Route path="/courses" element={<CoursesPage/>}/>
    <Route path="/admin" element={
      <ProtectedAdminRoute> 
        <AdminPanel/>
      </ProtectedAdminRoute>
      }/>
    <Route path="/payment-success" element={<PaymentSuccess/>}/>
    <Route path="/payment-cancel" element={
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800">Payment Cancelled ❌</h1>
      </div>
    } />
    <Route path="/purchased" element={<PurchasedCourses/>} />
    <Route path="/course/:courseId" element={<CourseDetailPage/>} />
  </Routes>
</BrowserRouter>
  )
}

export default App
