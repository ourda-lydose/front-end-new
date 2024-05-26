"use client"

import { useEffect, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

export interface ReviewProps {
    reviewId: number;
    boxId: string;
    userId: number;
    rating: number;
    reviewText: string;
    statusString: string;
    lastModified: Date;
}

const ReviewPage = ({ params }: { params: { boxId: string } }) => {
    const [reviews, setReviews] = useState<ReviewProps[]>([]);
    const [selectedRating, setSelectedRating] = useState<number>(0);
    const [usernames, setUsernames] = useState<string[]>([]);
    const [newReviewText, setNewReviewText] = useState<string>("");
    const [newReviewRating, setNewReviewRating] = useState<number>(1);
    const [editReviewId, setEditReviewId] = useState<number | null>(null);
    const [editReviewText, setEditReviewText] = useState<string>("");
    const [editReviewRating, setEditReviewRating] = useState<number>(1);

    const isAdmin = true;
    const userId = 1;

    useEffect(() => {
        const fetchReviews = async () => {
            let url = `${process.env.NEXT_PUBLIC_REVIEW_SERVICE_URL}/box/${params.boxId}`;
            if (selectedRating !== 0) {
                url += `?rating=${selectedRating}`;
            }
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            setReviews(data.filter((review: ReviewProps) => review.statusString === "APPROVED" || review.userId === userId));
        };

        fetchReviews();
    }, [params, selectedRating]);

    const handleChipClick = (rating: number) => {
        setSelectedRating(selectedRating === rating ? 0 : rating);
    };

    const calculateAverageRating = () => {
        const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
        const averageRating = Math.floor(totalRating / reviews.length);
        return averageRating;
    };

    const handleSubmitReview = async () => {
        const newReview = {
            boxId: params.boxId,
            userId: userId,
            rating: newReviewRating,
            reviewText: newReviewText,
        };

        const response = await fetch(`${process.env.NEXT_PUBLIC_REVIEW_SERVICE_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newReview)
        });

        if (response.ok) {
            setNewReviewText("");
            setNewReviewRating(1);
            const updatedReviews = await response.json();
            setReviews(updatedReviews);
        } else {
            console.error("Failed to submit review");
        }
    };

    const handleUpdateReview = async () => {
        const updatedReview = {
            boxId: params.boxId,
            userId: userId,
            rating: editReviewRating,
            reviewText: editReviewText
        };
    
        console.log("Updated Review Payload:", JSON.stringify(updatedReview));
    
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_REVIEW_SERVICE_URL}/${editReviewId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-userid': isAdmin ? "-1" : String(userId) 
                },
                body: JSON.stringify(updatedReview)
            });
    
            console.log("Response:", response);
    
            if (response.ok) {
                setEditReviewId(null);
                const data = await response.json();
                setReviews(reviews.map(review => review.reviewId === editReviewId ? data : review));
            } else {
                console.error("Failed to update review. Status:", response.status, response.statusText);
            }
        } catch (error) {
            console.error("Error while updating review:", error);
        }
    };
    

    const handleDeleteReview = async (reviewId: number) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_REVIEW_SERVICE_URL}/${reviewId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            const updatedReviews = reviews.filter(review => review.reviewId !== reviewId);
            setReviews(updatedReviews);
        } else {
            console.error("Failed to delete review");
        }
    };

    const handleEditReview = (review: ReviewProps) => {
        setEditReviewId(review.reviewId);
        setEditReviewText(review.reviewText);
        setEditReviewRating(review.rating);
    };

    return (
        <div className="w-screen h-full flex px-[80px] py-[60px] bg-adpro-000 flex-col gap-3">
            <text className="font-semibold text-3xl">Reviews</text>
            <div className="border-[1px] border-adpro-100 rounded-md"></div>

            <div className="flex flex-row py-5 gap-5">
                <div className="flex flex-col items-center">
                    <text className="font-semibold text-4xl">4.0</text>

                    <div className="flex flex-row py-1 pt-4 gap-[1px]">
                        {[1, 2, 3, 4, 5].map((rating) => (
                            <div key={rating}>
                                {rating <= calculateAverageRating() ? <FaStar size={20}/> :  <FaRegStar size={20}/>}
                            </div>
                        ))}
                    </div>

                    <text className="text-sm text-adpro-500 mt-1">{reviews.length} rating(s)</text>
                </div>

                <div className="border-[1px] border-adpro-100 rounded-md"></div>
                <div></div>
            </div>

            <div className="flex flex-row py-5 gap-5">
                {['All', 'Rating 1', 'Rating 2', 'Rating 3', 'Rating 4', 'Rating 5'].map((text, index) => (
                    <div key={index} className={`cursor-pointer ${selectedRating === index ? 'bg-adpro-blue-800 text-adpro-000' : 'bg-adpro-100 text-black'} rounded-full px-5 py-[6px] text-[14px]`} onClick={() => handleChipClick(index)}>
                        {text}
                    </div>
                ))}
            </div>

            <div className="border-adpro-100 rounded-md py-4">
                {reviews.map((review) => (
                    <div key={review.reviewId} className="flex flex-col">
                        <div className="flex flex-row justify-between">
                            <text className="font-semibold">{usernames[review.userId] || 'Fetching username...'}</text>

                            <div className="flex flex-row gap-1 text-adpro-blue-800">
                                {[1, 2, 3, 4, 5].map((rating) => (
                                    <div key={rating}>
                                        {rating <= review.rating ? <FaStar size={20} /> : <FaRegStar size={20} />}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-3">
    {review.reviewId === editReviewId ? (
        // Edit review form
        <>
            <textarea
                value={editReviewText}
                onChange={(e) => setEditReviewText(e.target.value)}
                className="border-[1px] border-adpro-100 rounded-md w-full h-32 p-2"
            />
            <div className="flex flex-row py-2 gap-3">
                <label className="text-sm">Rating:</label>
                <input
                    type="number"
                    value={editReviewRating}
                    onChange={(e) => setEditReviewRating(Number(e.target.value))}
                    min={1}
                    max={5}
                    className="border-[1px] border-adpro-100 rounded-md w-16 p-2"
                />
            </div>
            <button
                onClick={handleUpdateReview}
                className="bg-adpro-blue-800 text-white rounded-md px-5 py-2"
            >
                Update Review
            </button>
            <button
                onClick={() => setEditReviewId(null)}
                className="bg-gray-500 text-white rounded-md px-5 py-2 ml-2"
            >
                Cancel
            </button>
        </>
    ) : (
        // Display review text
        <>
            <p>{review.reviewText}</p>
            {(review.userId === userId || isAdmin) && (
                <div className="flex flex-row gap-3 mt-2">
                    <div>
                        <p>Status: {review.statusString}</p>
                    </div>
                    <button
                        onClick={() => handleEditReview(review)}
                        className="bg-yellow-500 text-white rounded-md px-5 py-2"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => handleDeleteReview(review.reviewId)}
                        className="bg-red-500 text-white rounded-md px-5 py-2"
                    >
                        Delete
                    </button>
                </div>
            )}
        </>
    )}
</div>
<div className="border-[1px] border-adpro-100 rounded-md mt-3"></div>
                    </div>
                ))}
            </div>

            <div>
                <textarea
                    value={newReviewText}
                    onChange={(e) => setNewReviewText(e.target.value)}
                    className="border-[1px] border-adpro-100 rounded-md w-full h-32 p-2"
                    placeholder="Write your review here..."
                />
                <div className="flex flex-row py-2 gap-3">
                    <label className="text-sm">Rating:</label>
                    <input
                        type="number"
                        value={newReviewRating}
                        onChange={(e) => setNewReviewRating(Number(e.target.value))}
                        min={1}
                        max={5}
                        className="border-[1px] border-adpro-100 rounded-md w-16 p-2"
                    />
                </div>
                <button
                    onClick={handleSubmitReview}
                    className="bg-adpro-blue-800 text-white rounded-md px-5 py-2"
                >
                    Submit Review
                </button>
            </div>
        </div>
    )
}

export default ReviewPage;
