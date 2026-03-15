import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 2000;

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState(null);
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(false);
  const navigate = useNavigate();

  const verify = useCallback(async (retryCount = 0) => {
    if (!sessionId) {
      setError("No payment session found. If you just paid, try opening Purchased from the menu.");
      setLoading(false);
      return;
    }

    try {
      const res = await api.post("/payment/verify-payment", { sessionId });

      if (res.data.success === false && res.data.pending) {
        if (retryCount < MAX_RETRIES) {
          setPending(true);
          setTimeout(() => verify(retryCount + 1), RETRY_DELAY_MS);
          return;
        }
        setError("Payment is still processing. Check your Purchased courses in a minute.");
        setPending(false);
        setLoading(false);
        return;
      }

      setCourse(res.data.course);
      setError(null);
    } catch (e) {
      console.log("error-in-sending-verify-req", e);
      const msg = e.response?.data?.Msg || e.message || "Could not verify payment.";
      if (retryCount < MAX_RETRIES && e.response?.status !== 400 && e.response?.status !== 404) {
        setPending(true);
        setTimeout(() => verify(retryCount + 1), RETRY_DELAY_MS);
        return;
      }
      setError(msg);
    } finally {
      setLoading(false);
      setPending(false);
    }
  }, [sessionId]);

  useEffect(() => {
    verify();
  }, [verify]);

  if (loading && !pending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-900 text-white text-lg sm:text-xl md:text-2xl px-4">
        Processing your payment...
      </div>
    );
  }

  if (pending) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-blue-900 text-white text-base sm:text-lg md:text-xl px-4">
        <p className="text-center">Payment confirmed. Verifying and unlocking your course...</p>
        <div className="w-10 h-10 border-2 border-white border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-blue-900 text-white flex flex-col items-center justify-center py-12 px-4 sm:py-16 gap-6">
        <h1 className="text-xl sm:text-2xl font-bold text-center">Payment verification</h1>
        <p className="text-center text-blue-200 max-w-md text-sm sm:text-base">{error}</p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-xs sm:max-w-none sm:w-auto">
          <button
            type="button"
            className="px-6 py-3 rounded-xl bg-white text-blue-900 font-semibold min-h-[44px]"
            onClick={() => navigate("/purchased")}
          >
            My Purchased Courses
          </button>
          <button
            type="button"
            className="px-6 py-3 rounded-xl border border-white min-h-[44px]"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-900 text-white flex flex-col items-center py-10 sm:py-14 md:py-16 px-4 overflow-x-hidden min-w-0">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4 text-center">
        🎉 Payment Successful!
      </h1>

      <p className="text-base sm:text-lg text-blue-200 mb-8 md:mb-10 text-center max-w-lg">
        Congratulations! You have successfully purchased{" "}
        <span className="font-semibold text-white">{course?.title}</span>
      </p>

      <div className="p-4 sm:p-5 bg-white text-black rounded-xl md:rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transition duration-300">
        <img
          src={course?.image}
          alt={course?.title}
          className="w-full h-48 sm:h-56 object-cover rounded-xl md:rounded-2xl"
        />
        <div className="p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold mb-2">{course?.title}</h2>
          <p className="text-gray-600 text-sm sm:text-base mb-3 md:mb-4 line-clamp-2">{course?.desc}</p>
          <p className="font-semibold text-base sm:text-lg mb-4">₹ {course?.price}</p>
          <button
            type="button"
            onClick={() => navigate(`/course/${course._id}`)}
            className="w-full bg-blue-900 text-white py-2.5 sm:py-3 rounded-lg hover:bg-blue-800 transition min-h-[44px] font-medium"
          >
            Start Learning 🚀
          </button>
        </div>
      </div>
      <button
        type="button"
        className="mt-12 sm:mt-16 md:mt-20 px-8 sm:px-12 md:px-20 py-3 rounded-xl md:rounded-2xl text-base sm:text-lg md:text-xl font-bold bg-red-600 min-h-[44px]"
        onClick={() => (window.location.href = "/courses")}
      >
        Back To Courses
      </button>
    </div>
  );
};
