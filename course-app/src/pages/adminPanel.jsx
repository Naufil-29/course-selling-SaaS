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
    video: ""
  });

  const [myCourses, setMyCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]);

  const token = localStorage.getItem("accessToken");

  // ================= USER INITIAL =================
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const firstChar = user.username[0].toUpperCase();
      setUserInitial(firstChar);
    }
  }, []);

  // ================= FETCH COURSES =================
  useEffect(() => {
    fetchMyCourses();
    fetchAllCourses();
  }, []);

  const fetchMyCourses = async () => {
    const res = await api.get("https://course-selling-saas.onrender.com/admin/mycourses");
    const data = await res.data;
    setMyCourses(data.courses);
  };

  const fetchAllCourses = async () => {
    const res = await api.get("https://course-selling-saas.onrender.com/admin/courses");
    const data = await res.data;
    setAllCourses(data.courses);
  };

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ================= RESET FORM =================
  const resetForm = () => {
    setFormData({
      title: "",
      price: "",
      oldPrice: "",
      discount: "",
      image: "",
      desc: "",
      video: ""
    });
  };

  // ================= START EDIT =================
  const startEdit = (course) => {
    setIsEditing(true);
    setEditingCourseId(course._id);

    setFormData({
      title: course.title,
      price: course.price,
      oldPrice: course.oldPrice,
      discount: course.discount,
      image: course.image,
      video: course.video
    });
  };

  // ================= CREATE COURSE =================
  const createCourse = async (e) => {
    e.preventDefault();

    const res = await api.post("/admin/course", formData);

    await res.data;

    resetForm();
    fetchMyCourses();
    fetchAllCourses();
  };

  // ================= UPDATE COURSE =================
  const updateCourse = async (e) => {
    e.preventDefault();
    console.log(`${editingCourseId}`)
    const res = await api.put(`/admin/course/${editingCourseId}`, formData);

    await res.data;

    setIsEditing(false);
    setEditingCourseId(null);
    resetForm();
    fetchMyCourses();
    fetchAllCourses();
  };

  // ================= DELETE COURSE =================
  const deleteCourse = async (id) => {
    await api.delete(`/admin/course/${id}`);

    fetchMyCourses();
  };

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="pt-30">
        <Navbar
          openSignup={() => setShowSignup(true)}
          openSignin={() => setShowSignin(true)}
          userInitial={userInitial}
          setUserInitial={setUserInitial}
        />
      </div>

      <div className="p-10">

        {/* ================= CREATE / UPDATE ================= */}
        <div className="bg-white p-10 rounded-xl shadow-md mb-10">
          <h2 className="text-2xl font-semibold mb-5">
            {isEditing ? "Edit Course" : "Create New Course"}
          </h2>

          <form
            onSubmit={isEditing ? updateCourse : createCourse}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            <input
              name="title"
              value={formData.title}
              placeholder="Title"
              onChange={handleChange}
              className="border p-3 rounded-xl border-gray-300"
            />

            <input
              name="price"
              value={formData.price}
              placeholder="Price"
              onChange={handleChange}
              className="border p-3 rounded-xl border-gray-300"
            />

            <input
              name="oldPrice"
              value={formData.oldPrice}
              placeholder="Old Price"
              onChange={handleChange}
              className="border p-3 rounded-xl border-gray-300"
            />

            <input
              name="discount"
              value={formData.discount}
              placeholder="Discount %"
              onChange={handleChange}
              className="border p-3 rounded-xl border-gray-300"
            />

            <input
              name="image"
              value={formData.image}
              placeholder="Image URL"
              onChange={handleChange}
              className="border p-3 rounded-xl border-gray-300 md:col-span-2"
            />

             <input
              name="video"
              value={formData.video}
              placeholder="Video URL"
              onChange={handleChange}
              className="border p-3 rounded-xl border-gray-300 md:col-span-2"
              />

            <textarea
              name="desc"
              placeholder="Enter course description"
              value={formData.desc}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-gray-300 md:col-span-2"
            />

            <button
              type="submit"
              className="bg-blue-900 text-white py-3 rounded-xl"
            >
              {isEditing ? "Update Course" : "Create Course"}
            </button>
          </form>
        </div>

        {/* ================= MY COURSES ================= */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">
            My Created Courses
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {myCourses.map((course) => (
              <div
                key={course._id}
                className="bg-white p-4 rounded-xl shadow"
              >
                <img
                  src={course.image}
                  alt={course.title}
                  className="h-40 w-full object-cover rounded mb-3"
                />

               

                <h3 className="font-semibold mb-2">
                  {course.title}
                </h3>

                <p className="text-blue-900 font-bold">
                  ₹{course.price}
                </p>

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => startEdit(course)}
                    className="bg-yellow-400 px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteCourse(course._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= ALL COURSES ================= */}
        <div>
          <h2 className="text-2xl font-bold mb-6">
            All Courses (View Only)
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {allCourses.map((course) => (
              <div
                key={course._id}
                className="bg-white p-4 rounded-xl shadow"
              >
                <img
                  src={course.image}
                  alt={course.title}
                  className="h-40 w-full object-cover rounded mb-3"
                />

                <h3 className="font-semibold mb-2">
                  {course.title}
                </h3>

                <p className="text-blue-900 font-bold">
                  ₹{course.price}
                </p>

                <p className="text-gray-500 text-sm mt-2">
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