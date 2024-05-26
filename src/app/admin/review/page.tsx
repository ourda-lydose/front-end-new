"use client"

import React, { useEffect, useState } from "react";

export interface ReviewProps {
    reviewId: number;
    boxId: string;
    userId: number;
    rating: number;
    reviewText: string;
    statusString: string;
    lastModified: Date;
}

const AdminReviewPage: React.FC = () => {
    const [reviews, setReviews] = useState<ReviewProps[]>([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_REVIEW_SERVICE_URL}`);
                if (response.ok) {
                    const data = await response.json();
                    setReviews(data.filter((review: ReviewProps) => review.statusString === "PENDING"));
                } else {
                    console.error("Failed to fetch reviews");
                }
            } catch (error) {
                console.error("Error while fetching reviews:", error);
            }
        };

        fetchReviews();
    }, []);

    const handleEditReview = (reviewId: number) => {
        // Find the review to edit
        const reviewToEdit = reviews.find((review) => review.reviewId === reviewId);
        if (!reviewToEdit) {
            console.error("Review not found");
            return;
        }

        // Prompt the user to edit the review text and rating
        const editedReviewText = prompt("Enter the new review text:", reviewToEdit.reviewText);
        if (editedReviewText === null) {
            // If the user cancels, do nothing
            return;
        }
        const editedRatingString = prompt("Enter the new rating (1-5):", String(reviewToEdit.rating));
        if (editedRatingString === null) {
            // If the user cancels, do nothing
            return;
        }
        const editedRating = parseInt(editedRatingString);
        if (isNaN(editedRating) || editedRating < 1 || editedRating > 5) {
            console.error("Invalid rating");
            return;
        }

        // Update the review with the new values
        const updatedReviews = reviews.map((review) => {
            if (review.reviewId === reviewId) {
                return {
                    ...review,
                    reviewText: editedReviewText,
                    rating: editedRating,
                };
            }
            return review;
        });
        setReviews(updatedReviews);
    };

    const handleDeleteReview = async (reviewId: number) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_REVIEW_SERVICE_URL}/${reviewId}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                console.log("Review deleted successfully");
                // Update state or re-fetch reviews if needed
                const updatedReviews = reviews.filter((review) => review.reviewId !== reviewId);
                setReviews(updatedReviews);
            } else {
                console.error("Failed to delete review");
            }
        } catch (error) {
            console.error("Error while deleting review:", error);
        }
    };

    const handleAcceptReview = async (reviewId: number) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_REVIEW_SERVICE_URL}/${reviewId}/accept`, {
                method: 'POST'
            });
            if (response.ok) {
                console.log("Review accepted successfully");
                // Update state or re-fetch reviews if needed
            } else {
                console.error("Failed to accept review");
            }
        } catch (error) {
            console.error("Error while accepting review:", error);
        }
    };

    const handleRejectReview = async (reviewId: number) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_REVIEW_SERVICE_URL}/${reviewId}/reject`, {
                method: 'POST'
            });
            if (response.ok) {
                console.log("Review rejected successfully");
                // Update state or re-fetch reviews if needed
            } else {
                console.error("Failed to reject review");
            }
        } catch (error) {
            console.error("Error while rejecting review:", error);
        }
    };

    console.log(reviews)

    return (
        <div className="flex flex-col">
            <text className="text-2xl font-semibold">All pending review</text>
            {reviews.map((review) => (
                <div key={review.reviewId} className="bg-gray-100 rounded-md p-4">
                    <p>Review ID: {review.reviewId}</p>
                    <p>Box ID: {review.boxId}</p>
                    <p>User ID: {review.userId}</p>
                    <p>Rating: {review.rating}</p>
                    <p>Review Text: {review.reviewText}</p>
                    <p>Status String: {review.statusString}</p>
                    <p>Last Modified: {review.lastModified.toString()}</p>
                    <div className="flex gap-2 mt-4">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => handleEditReview(review.reviewId)}>Edit</button>
                        <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={() => handleDeleteReview(review.reviewId)}>Delete</button>
                        <button className="bg-green-500 text-white px-4 py-2 rounded-md" onClick={() => handleAcceptReview(review.reviewId)}>Accept</button>
                        <button className="bg-yellow-500 text-white px-4 py-2 rounded-md" onClick={() => handleRejectReview(review.reviewId)}>Reject</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AdminReviewPage;
