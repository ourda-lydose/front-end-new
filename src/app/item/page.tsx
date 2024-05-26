"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAllItems, deleteItem } from '../api/item/route';
import { Item } from '@/app/types/types';
import LandingPagePNG from "@/images/landing-page-bg.png";
import Image from "next/image";
import {useRouter} from "next/navigation";

export default function ItemsPage() { // Renamed function to avoid name conflict with `Item` type
    const router = useRouter();
    const [items, setItems] = useState<Item[]>([]); // Explicitly type the state as Item[]

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        const data: Item[] = await getAllItems(); // Explicitly typing the data
        setItems(data);
    };

    const handleDelete = async (id: string) => { // Type the id parameter as string
        await deleteItem(id);
        fetchItems();
    };

    const handleAddNewItem = () => {
        router.push('/item/create');
    };

    const handleEditItem = (id: string) => {

        router.push(`/item/edit/${id}`);
    };

    return (
        <div className="pt-16 h-screen flex flex-col justify-start items-center w-screen">
            <h1 className="font-light text-7xl font-cormorant text-adpro-900">Items</h1>
            <ul className="w-full">
                {items.map(item => (
                    <div>
                        <main className="p-3 sm:p-5 flex gap-8 w-full md:w-4/5 lg:w-3/5 mx-auto sm:flex-row flex-row items-center sm:items-stretch">
                            <Image
                                src={LandingPagePNG}
                                alt={"landing-page"}
                                className="text-white w-full max-w-[300px] aspect-[4/5] object-cover rounded-lg shadow-lg"
                            />
                            <section className="flex-1 flex flex-col">
                                <h1 className="text-2xl sm:text-3xl font-semibold accent-adpro-800">{item.name}</h1>
                                <div className="my-3 flex-1 text-[18px] font-medium">
                                    <p className="max-w-prose text-gray">
                                        {item.description}
                                    </p>
                                </div>
                                <button
                                    className='text-[18px] gap-2 mt-3 border-[2px] rounded-xl border-adpro-700 text-adpro-700 px-9 py-[10px] hover:text-adpro-000 hover:bg-adpro-600 hover:border-adpro-600 ease-in-out duration-200'
                                    onClick={() => handleEditItem(item.id)}>Edit
                                </button>
                                <button
                                    className="text-[18px] gap-2 mt-3 border-[2px] rounded-xl border-adpro-700 text-adpro-700 px-9 py-[10px] hover:text-adpro-000 hover:bg-adpro-600 hover:border-adpro-600 ease-in-out duration-200"
                                    onClick={() => handleDelete(item.id)}>Delete
                                </button>
                            </section>
                        </main>
                    </div>
                ))}
            </ul>
            <button
                className="text-[18px] gap-2 mt-3 border-[2px] rounded-xl border-adpro-700 text-adpro-700 px-9 py-[10px] hover:text-adpro-000 hover:bg-adpro-600 hover:border-adpro-600 ease-in-out duration-200"
                onClick={handleAddNewItem} /* Handle navigation to create page */
            >Add New Item
            </button>
        </div>

    );
}
