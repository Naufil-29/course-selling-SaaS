import { stripe } from "../config/stripe.js";
import { CourseModel, UserModel } from "../Models/models.js";

export const createChekcoutSession = async (req, res) => { 
    try{ 
      const { courseId } = req.body;
      const userId = req.userId

      const course = await CourseModel.findById(courseId);

      if(!course){ 
        return res.status(404).json({Msg: "course not found"})
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: [ 
            { 
                price_data:{ 
                    currency: "inr",
                    product_data: { 
                        name: course.title
                    },
                    unit_amount: course.price * 100, //paise
                },
                quantity: 1
            },

        ],
        success_url: "https://coursera-oanq.onrender.com/payment-success?session_id={CHECKOUT_SESSION_ID}",
        cancel_url: "https://coursera-oanq.onrender.com/payment-cancel",
        metadata: { 
            userId: userId,
            courseId: courseId.toString(),
        },
      });
      res.json({url: session.url})
    }
    catch(e){ 
     console.log("error-creating-session", e);
     res.status(500).json({ message: "Payment session failed" })
    }
};


export const verifyPayment = async (req, res) => {
    try {
        const { sessionId } = req.body;

        if (!sessionId) {
            return res.status(400).json({ Msg: "session_id is required" });
        }

        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (session.payment_status !== "paid") {
            // Return 200 with pending so frontend can retry (Stripe may still be processing)
            return res.status(200).json({
                success: false,
                pending: true,
                Msg: "Payment is still processing. Please wait a moment and refresh.",
            });
        }

        const { userId, courseId } = session.metadata;
        if (!userId || !courseId) {
            return res.status(400).json({ Msg: "Invalid session metadata" });
        }

        const course = await CourseModel.findById(courseId);
        if (!course) {
            return res.status(404).json({ Msg: "Course not found" });
        }

        await UserModel.findByIdAndUpdate(userId, {
            $addToSet: { purchasedCourses: courseId },
        });

        res.json({ message: "Course added successfully", course, success: true });
    } catch (e) {
        console.log("verifying-payment-error", e);
        return res.status(500).json({ Msg: "Error verifying payment" });
    }
};