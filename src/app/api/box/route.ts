import axios from 'axios';
import {SubscriptionBox, BoxRequest, Item} from '@/app/types/types';
import dotenv from 'dotenv';

dotenv.config();

const BOX_URL = process.env.BOX_URL || 'https://subscription-box-agscsr3gdq-ew.a.run.app/box';

// const API_URL = 'http://localhost:8080/box';

export const getAllSubscriptionBoxes = async (): Promise<SubscriptionBox[]> => {
    try {
        const response = await axios.get<SubscriptionBox[]>(BOX_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching all subscription boxes:', error);
        throw error;
    }
};

export const getSubscriptionBoxById = async (id: string): Promise<SubscriptionBox> => {
    try {
        const response = await axios.get<SubscriptionBox>(`${BOX_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching subscription box with ID ${id}:`, error);
        throw error;
    }
};

export const createSubscriptionBox = async (boxRequest: BoxRequest): Promise<SubscriptionBox> => {
    try {
        const response = await axios.post<SubscriptionBox>(BOX_URL, boxRequest);
        return response.data;
    } catch (error) {
        console.error('Error creating subscription box:', error);
        throw error;
    }
};

export const updateSubscriptionBox = async (id: string, box: {
    // itemInBoxList: { itemId: string; quantity: number }[];
    // price: number;
    // description: string
}): Promise<SubscriptionBox> => {
    try {
        const response = await axios.put<SubscriptionBox>(`${BOX_URL}/${id}`, box);
        return response.data;
    } catch (error) {
        console.error(`Error updating subscription box with ID ${id}:`, error);
        throw error;
    }
};

export const deleteSubscriptionBox = async (id: string): Promise<void> => {
    try {
        await axios.delete(`${BOX_URL}/${id}`);
    } catch (error) {
        console.error(`Error deleting subscription box with ID ${id}:`, error);
        throw error;
    }
};
