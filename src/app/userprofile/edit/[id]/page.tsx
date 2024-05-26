"use client";

import {useParams, useRouter} from 'next/navigation';
import { useEffect, useState } from "react";
import { UserProfile } from '@/app/userprofile/types';
import UserProfileForm from "@/app/components/UserProfileForm";

const EditUserProfilePage: React.FC = () => {
    const router = useRouter();
    const { id } = useParams<{ id: string }>();
    const [userprofile, setUserProfile] = useState<UserProfile>();
    const [loading, setLoading] = useState(true);

    const baseURL = 'http://localhost:8080';

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await fetch(`${baseURL}/userprofile/${id}`);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setUserProfile(data);
                setLoading(false);
            } catch (error) {
                console.error("There was a problem fetching the Profile:", error);
            }
        };
        if (id) {
            fetchUserProfile();
        }
    }, [id]);

    const handleUpdateUserProfile = async (formData: UserProfile) => {
        try {
            const response = await fetch(`${baseURL}/userprofile/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error("Failed to update UserProfile");
            }
            router.push(`/userprofile/${id}`);
        } catch (error) {
            console.error("There was a problem updating the Profile:", error);
        }
    };

    if (loading) {
        return <div className="bg-gray-100 min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (!userprofile) {
        return <div className="bg-gray-100 min-h-screen flex items-center justify-center">User not found</div>;
    }

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col items-center py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-2xl font-semibold mb-4 text-black">Edit Profile</h1>
                <UserProfileForm initialData={userprofile} onSubmit={handleUpdateUserProfile} />
            </div>
        </div>
    );
}

export default EditUserProfilePage;