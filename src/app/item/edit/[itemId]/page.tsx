"use client";

import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation"; // Update import statement
import { getItemById, updateItem } from '@/app/api/item/route';
import { Item } from '@/app/types/types';

export default function EditItem({params,}: { params: { itemId: string }; }){
    const router = useRouter();

    const [item, setItem] = useState<Item | null>(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (params.itemId) {
            fetchItem(params.itemId);
        }
    }, [params.itemId]);

    const fetchItem = async (itemId: string) => {
        try {
            const itemData: Item = await getItemById(itemId);
            setItem(itemData);
            setName(itemData.name);
            setDescription(itemData.description);
        } catch (error) {
            console.error('Error fetching item:', error);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const updatedItem: Item = { ...item, name, description } as Item;
            await updateItem(params.itemId as string, updatedItem);
            router.push('/item');
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl mb-4">Edit Item</h1>
            {item ? (
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                            Description
                        </label>
                        <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>
                    <button
                        className="mt-3 px-4 py-2 border-2 border-blue text-blue rounded-xl hover:bg-blue hover:text-black duration-200"
                        type="submit"
                    >
                        Save
                    </button>
                </form>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};
