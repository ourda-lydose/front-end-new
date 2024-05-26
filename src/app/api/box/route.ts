import axios from 'axios';
import {SubscriptionBox, BoxRequest, Item} from '@/app/types/types';

const API_URL = 'http://localhost:8080/box';

export const getAllSubscriptionBoxes = async (): Promise<SubscriptionBox[]> => {
    try {
        const response = await axios.get<SubscriptionBox[]>(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching all subscription boxes:', error);
        throw error;
    }
};

export const getSubscriptionBoxById = async (id: string): Promise<SubscriptionBox> => {
    try {
        const response = await axios.get<SubscriptionBox>(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching subscription box with ID ${id}:`, error);
        throw error;
    }
};

export const createSubscriptionBox = async (boxRequest: BoxRequest): Promise<SubscriptionBox> => {
    try {
        const response = await axios.post<SubscriptionBox>(API_URL, boxRequest);
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
        const response = await axios.put<SubscriptionBox>(`${API_URL}/${id}`, box);
        return response.data;
    } catch (error) {
        console.error(`Error updating subscription box with ID ${id}:`, error);
        throw error;
    }
};

// export const updateItem = async (id: string, item: Item): Promise<Item> => {
//     try {
//         const response = await axios.put<Item>(`${API_URL}/${id}`, item);
//         return response.data;
//     } catch (error) {
//         console.error(`Error updating item with ID ${id}:`, error);
//         throw error;
//     }
// };

export const deleteSubscriptionBox = async (id: string): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error(`Error deleting subscription box with ID ${id}:`, error);
        throw error;
    }
};
