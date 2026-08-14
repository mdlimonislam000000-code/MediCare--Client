"use client";
import React, { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import {
  FiStar,
  FiMessageSquare,
  FiCheckCircle,
  FiTrash2,
} from "react-icons/fi";
import toast from "react-hot-toast";

const FeedbackReviews = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const userId = user?.id || user?._id;
  const userName = user?.name || "Patient";

  const [completedAppointments, setCompletedAppointments] = useState([]);
  const [reviews, setReviews] = useState([]);


  const [activeDoctorId, setActiveDoctorId] = useState(null);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0); 
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:5000/api/bookings/user/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          const items = Array.isArray(data) ? data : data.result || [];
          setCompletedAppointments(items);
        })
        .catch((err) => console.error("Error fetching appointments:", err));

      fetchReviews();
    }
  }, [userId]);

  const fetchReviews = async () => {
    try {

      const {data:tokenData} = await authClient.token()

      const res = await fetch("http://localhost:5000/api/reviews",{
        method: "GET",
        headers: {
          authorization: `Bearer ${tokenData?.token}`
        }});
      const data = await res.json();
      if (Array.isArray(data)) setReviews(data);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  };


  const handleAddReview = async (doctorId) => {
    if (!comment) {
      toast.error("Please write something for the review.");
      return;
    }

    try {
      setLoading(true);
      const reviewData = {
        doctorId,
        patientId: userId,
        patientName: userName,
        rating: Number(rating),
        comment,
      };

      const {data:tokenData} = await authClient.token()

      const res = await fetch("http://localhost:5000/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json",
          authorization: `Bearer ${tokenData?.token}`
         },
        body: JSON.stringify(reviewData),
      });

      if (res.ok) {
        toast.success("Review added successfully!");
        setComment("");
        setRating(5);
        setActiveDoctorId(null);
        fetchReviews();
      } else {
        const data = await res.json();
        toast.error(data.message || "Failed to add review");
      }
    } catch (err) {
      console.error("Error adding review:", err);
    } finally {
      setLoading(false);
    }
  };

  
  const handleDeleteReview = async (reviewId) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        const { data: tokenData } = await authClient.token();
        const res = await fetch(
          `http://localhost:5000/api/reviews/${reviewId}`,
          {
            method: "DELETE",
            headers: {
              authorization: `Bearer ${tokenData?.token}`
            }
          },
          
        );
        if (res.ok) {
          setReviews(reviews.filter((rev) => rev._id !== reviewId));
        }
      } catch (err) {
        console.error("Error deleting review:", err);
      }
    }
  };

  if (isPending) {
    return <div className="p-8 text-center text-zinc-400">Loading...</div>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto text-zinc-100">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Welcome, {userName}</h1>
        <p className="text-sm text-zinc-400 mt-1">
          Manage your completed appointments and doctor reviews here.
        </p>
      </div>

      <div className="space-y-6">
        {completedAppointments.length > 0 ? (
          completedAppointments.map((item) => {
            const doctorId = item.doctorId;
            const existingReview = reviews.find(
              (r) => r.doctorId === doctorId && r.patientId === userId,
            );

            return (
              <div
                key={item._id}
                className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl shadow-xl space-y-4"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full flex items-center gap-1.5 w-max mb-2">
                      <FiCheckCircle /> Completed
                    </span>
                    <h3 className="text-lg font-bold">Dr. {item.doctorName}</h3>
                    <p className="text-sm text-zinc-400">
                      Appointment Date: {item.date }
                    </p>
                  </div>
                </div>

                {existingReview ? (
                  <div className="bg-zinc-800/50 p-4 rounded-xl border border-zinc-700/50 flex justify-between items-center">
                    <div>
                      <div className="flex items-center gap-1 text-amber-400 mb-1">
                        {[...Array(existingReview.rating)].map((_, i) => (
                          <FiStar key={i} className="fill-amber-400" />
                        ))}
                      </div>
                      <p className="text-sm text-zinc-300">
                        "{existingReview.comment}"
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteReview(existingReview._id)}
                      className="p-2 bg-rose-500/10 text-rose-400 rounded-lg hover:bg-rose-500/20 transition-all"
                      title="Delete Review"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                ) : (
                  <div>
                    {activeDoctorId === doctorId ? (
                      <div className="bg-zinc-800/40 p-4 rounded-xl border border-zinc-700 space-y-4">

                        <div className="flex flex-col gap-1.5">
                          <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                            Select Rating ({rating} / 5)
                          </span>
                          <div className="flex items-center gap-1.5">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                type="button"
                                key={star}
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                                className="focus:outline-none transition-transform hover:scale-110"
                              >
                                <FiStar
                                  className={`w-6 h-6 ${
                                    (hoverRating || rating) >= star
                                      ? "text-amber-400 fill-amber-400"
                                      : "text-zinc-600"
                                  }`}
                                />
                              </button>
                            ))}
                          </div>
                        </div>


                        <textarea
                          rows="3"
                          placeholder="Write your feedback about the doctor..."
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-3 text-sm text-zinc-100 focus:outline-none focus:border-indigo-500"
                        />


                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={() => {
                              setActiveDoctorId(null);
                              setRating(5);
                              setComment("");
                            }}
                            className="px-4 py-2 bg-zinc-800 text-zinc-400 rounded-xl text-sm font-medium hover:bg-zinc-700"
                          >
                            Cancel
                          </button>
                          <button
                            disabled={loading}
                            onClick={() => handleAddReview(doctorId)}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-500 transition-all"
                          >
                            {loading ? "Submitting..." : "Submit Review"}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setActiveDoctorId(doctorId);
                          setRating(5);
                          setComment("");
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-xl text-sm font-medium hover:bg-indigo-500/20 transition-all"
                      >
                        <FiMessageSquare /> Add Review
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-zinc-500 text-center py-10">
            No completed appointments found to review.
          </p>
        )}
      </div>
    </div>
  );
};

export default FeedbackReviews;