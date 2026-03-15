import api from "../utils/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function AdminPanel() {
  const [showSignup, setShowSignup] = useState(false);
  const [showSignin, setShowSignin] = useState(false);
  const [userInitial, setUserInitial] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    oldPrice: "",
    discount: "",
    image: "",
    video: "",
  });

  const [myCourses, setMyCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const firstChar = user.username[0].toUpperCase();
      setUserInitial(firstChar);
    }
  }, []);

  useEffect(() => {
    fetchMyCourses();
    fetchAllCourses();
  }, []);

  const fetchMyCourses = async () => {
    const res = await api.get("/admin/mycourses");
    const data = await res.data;
    setMyCourses(data.courses);
  };

  const fetchAllCourses = async () => {
    const res = await api.get("/admin/courses");
    const data = await res.data;
    setAllCourses(data.courses);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      price: "",
      oldPrice: "",
      discount: "",
      image: "",
      desc: "",
      video: "",
    });
  };

  const startEdit = (course) => {
    setIsEditing(true);
    setEditingCourseId(course._id);
    setFormData({
      title: course.title,
      price: course.price,
      oldPrice: course.oldPrice,
      discount: course.discount,
      image: course.image,
      video: course.video,
    });
  };

  const createCourse = async (e) => {
    e.preventDefault();
    const res = await api.post("/admin/course", formData);
    await res.data;
    resetForm();
    fetchMyCourses();
    fetchAllCourses();
  };

  const updateCourse = async (e) => {
    e.preventDefault();
    const res = await api.put(`/admin/course/${editingCourseId}`, formData);
    await res.data;
    setIsEditing(false);
    setEditingCourseId(null);
    resetForm();
    fetchMyCourses();
    fetchAllCourses();
  };

  const deleteCourse = async (id) => {
    await api.delete(`/admin/course/${id}`);
    fetchMyCourses();
  };

  return (
    <div className="min-h-screen bg-gray-100 overflow-x-hidden min-w-0">
      <div className="pt-16 md:pt-20 lg:pt-24">
        <Navbar
          openSignup={() => setShowSignup(true)}
          openSignin={() => setShowSignin(true)}
          userInitial={userInitial}
          setUserInitial={setUserInitial}
        />
      </div>

      <div className="p-4 sm:p-6 md:p-8 lg:p-10">
        {/* Create / Update form */}
        <div className="bg-white p-4 sm:p-6 md:p-8 lg:p-10 rounded-xl shadow-md mb-8 md:mb-10">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 md:mb-5">
            {isEditing ? "Edit Course" : "Create New Course"}
          </h2>

          <form
            onSubmit={isEditing ? updateCourse : createCourse}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5"
          >
            <input
              name="title"
              value={formData.title}
              placeholder="Title"
              onChange={handleChange}
              className="border p-3 rounded-xl border-gray-300 w-full text-base"
            />
            <input
              name="price"
              value={formData.price}
              placeholder="Price"
              onChange={handleChange}
              className="border p-3 rounded-xl border-gray-300 w-full text-base"
            />
            <input
              name="oldPrice"
              value={formData.oldPrice}
              placeholder="Old Price"
              onChange={handleChange}
              className="border p-3 rounded-xl border-gray-300 w-full text-base"
            />
            <input
              name="discount"
              value={formData.discount}
              placeholder="Discount %"
              onChange={handleChange}
              className="border p-3 rounded-xl border-gray-300 w-full text-base"
            />
            <input
              name="image"
              value={formData.image}
              placeholder="Image URL"
              onChange={handleChange}
              className="border p-3 rounded-xl border-gray-300 w-full md:col-span-2 text-base"
            />
            <input
              name="video"
              value={formData.video}
              placeholder="Video URL"
              onChange={handleChange}
              className="border p-3 rounded-xl border-gray-300 w-full md:col-span-2 text-base"
            />
            <textarea
              name="desc"
              placeholder="Enter course description"
              value={formData.desc}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-gray-300 md:col-span-2 min-h-[100px] text-base"
            />
            <button
              type="submit"
              className="bg-blue-900 text-white py-3 px-6 rounded-xl font-medium min-h-[44px] md:col-span-2"
            >
              {isEditing ? "Update Course" : "Create Course"}
            </button>
          </form>
        </div>

        {/* My Courses */}
        <div className="mb-10 md:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 md:mb-6">
            My Created Courses
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {myCourses.map((course) => (
              <div
                key={course._id}
                className="bg-white p-4 rounded-xl shadow overflow-hidden"
              >
                <img
                  src={course.image}
                  alt={course.title}
                  className="h-36 sm:h-40 w-full object-cover rounded-lg mb-3"
                />
                <h3 className="font-semibold mb-2 text-sm sm:text-base line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-blue-900 font-bold text-sm sm:text-base">
                  ₹{course.price}
                </p>
                <div className="flex gap-2 sm:gap-3 mt-4 flex-wrap">
                  <button
                    type="button"
                    onClick={() => startEdit(course)}
                    className="bg-yellow-400 px-3 py-2 rounded text-sm font-medium min-h-[44px]"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteCourse(course._id)}
                    className="bg-red-500 text-white px-3 py-2 rounded text-sm font-medium min-h-[44px]"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Courses */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold mb-4 md:mb-6">
            All Courses (View Only)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {allCourses.map((course) => (
              <div
                key={course._id}
                className="bg-white p-4 rounded-xl shadow overflow-hidden"
              >
                <img
                  src={course.image}
                  alt={course.title}
                  className="h-36 sm:h-40 w-full object-cover rounded-lg mb-3"
                />
                <h3 className="font-semibold mb-2 text-sm sm:text-base line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-blue-900 font-bold text-sm sm:text-base">
                  ₹{course.price}
                </p>
                <p className="text-gray-500 text-xs sm:text-sm mt-2">
                  View only
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
