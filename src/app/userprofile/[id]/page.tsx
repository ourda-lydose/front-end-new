"use client";

import {useParams, useRouter} from 'next/navigation';
import { useState, useEffect } from 'react';
import { UserProfile } from '../types';

const UserProfileDetailPage: React.FC = () => {
    const router = useRouter();
    const { id } = useParams<{ id: string }>();
    const [UserProfile, setUserProfile] = useState<UserProfile>();
    const [loading, setLoading] = useState(true);

    const baseURL = 'http://localhost:8080';

    useEffect(() => {
        const fetchUserProfile = async () => {
            setLoading(true);
            if (id) {
                try {
                    const response = await fetch(`${baseURL}/userprofile/${id}`);
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    const data = await response.json();
                    setUserProfile(data);
                    setLoading(false);
                } catch (error) {
                    console.error("There was a problem fetching the UserProfile:", error);
                }
            }
        };
        fetchUserProfile();
    }, [id]);

    const handleDeleteUserProfile = async () => {
        try {
            const response = await fetch(`${baseURL}/userprofile/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error("Failed to delete UserProfile");
            }
            router.push('/'); // Or wherever you want to navigate after deletion
        } catch (error) {
            console.error("There was a problem deleting the UserProfile:", error);
        }
    };

    const handleEditUserProfile = () => {
        router.push(`/userprofile/edit/${id}`); // Assuming the edit page path is '/edit/:id'
    };

    if (loading) {
        return <div className="bg-gray-100 min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (!UserProfile) {
        return <div className="bg-gray-100 min-h-screen flex items-center justify-center">User not found</div>;
    }

    return (
        <div className="bg-gray-100 min-h-screen py-8 flex items-center justify-center">
            <div className="container mx-auto px-4 bg-white p-6 rounded-lg shadow-md">
                <div className="flex flex-col lg:flex-row">
                    <div className="lg:w-2/3">
                        <h1 className="text-2xl text-black font-bold mb-4">{UserProfile.userName}</h1>
                        <p className="text-gray-700 mb-2"><span className="font-semibold">Email:</span> {UserProfile.email}</p>
                        <p className="text-gray-700 mb-2"><span className="font-semibold">Gender:</span> {UserProfile.gender}</p>
                        <p className="text-gray-700 mb-2"><span className="font-semibold">Phone Number:</span> {UserProfile.noTelp}</p>
                        <p className="text-gray-700 mb-2"><span className="font-semibold">Address:</span> {UserProfile.alamat}</p>
                        <p className="text-gray-700 mb-2"><span className="font-semibold">Bio:</span> {UserProfile.bio}</p>
                    </div>
                    <div className="flex justify-between items-center mt-4 lg:mt-0">
                        <button onClick={handleDeleteUserProfile} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                            Delete
                        </button>
                        <button onClick={handleEditUserProfile} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfileDetailPage;