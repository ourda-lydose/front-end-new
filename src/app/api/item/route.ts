// import axios from 'axios';
// import {Item, ItemRequest} from '@/app/types/types';
// import dotenv from 'dotenv';

// dotenv.config();

// const ITEM_URL = process.env.ITEM_URL || 'https://subscription-box-agscsr3gdq-ew.a.run.app/item';

// // const API_URL = 'http://localhost:8080/item';

// export const getAllItems = async (): Promise<Item[]> => {
//     try {
//         const response = await axios.get<Item[]>(ITEM_URL);
//         return response.data;

//     } catch (error) {
//         console.error('Error fetching all items:', error);
//         throw error;
//     }
// };

// export const getItemById = async (id: string): Promise<Item> => {
//     try {
//         const response = await axios.get<Item>(`${ITEM_URL}/${id}`);
//         return response.data;
//     } catch (error) {
//         console.error(`Error fetching item with ID ${id}:`, error);
//         throw error;
//     }
// };

// export const createItem = async (itemRequest: ItemRequest): Promise<Item> => {
//     try {
//         const response = await axios.post<Item>(ITEM_URL, itemRequest);
//         return response.data;
//     } catch (error) {
//         console.error('Error creating item:', error);
//         throw error;
//     }
// };

// export const updateItem = async (id: string, item: Item): Promise<Item> => {
//     try {
//         const response = await axios.put<Item>(`${ITEM_URL}/${id}`, item);
//         return response.data;
//     } catch (error) {
//         console.error(`Error updating item with ID ${id}:`, error);
//         throw error;
//     }
// };

// export const deleteItem = async (id: string): Promise<void> => {
//     try {
//         await axios.delete(`${ITEM_URL}/${id}`);
//     } catch (error) {
//         console.error(`Error deleting item with ID ${id}:`, error);
//         throw error;
//     }
// };
