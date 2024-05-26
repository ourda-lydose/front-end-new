"use client";

import { useEffect, useState } from 'react';
import { getAllSubscriptionBoxes, deleteSubscriptionBox } from '../api/box/route';
import LandingPagePNG from "@/images/landing-page-bg.png";
import Image from "next/image";
import {useRouter} from "next/navigation";
import { getItemById } from '../api/item/route';
import { Item, SubscriptionBox as DetailSubscriptionBox } from '@/app/types/types';

interface SubscriptionBox extends DetailSubscriptionBox {
    items: { name: string; quantity: number }[];
}

export default function SubscriptionPage() {
    const router = useRouter();
    const [boxes, setBoxes] = useState<SubscriptionBox[]>([]);

    useEffect(() => {
        fetchBoxes();
    }, []);

    const fetchBoxes = async () => {
        const data: DetailSubscriptionBox[] = await getAllSubscriptionBoxes();

        // Fetch items for each box
        const updatedBoxes = await Promise.all(
            data.map(async (box) => {
                const items = await Promise.all(
                    box.itemInBoxList.map(async (itemInBox) => {
                        const item = await getItemById(itemInBox.itemId);
                        return { name: item.name, quantity: itemInBox.quantity };
                    })
                );
                return { ...box, items };
            })
        );

        setBoxes(updatedBoxes);
    };

    const handleDelete = async (id: string) => {
        await deleteSubscriptionBox(id);
        fetchBoxes();
    };

    const handleAddNewBox = () => {
        router.push('/box/create');
    };

    const handleEditBox = (id: string) => {
        router.push(`/box/edit/${id}`);
    };

    return (
        <div className="pt-16 h-screen flex flex-col justify-start items-center w-screen">
            <h1 className="font-light text-7xl font-cormorant text-adpro-900">Boxes</h1>
            <ul className="w-full">
                {boxes.map((box) => (
                    <div key={box.id}>
                        <main className="p-3 sm:p-5 flex gap-8 w-full md:w-4/5 lg:w-3/5 mx-auto sm:flex-row flex-row items-center sm:items-stretch">
                            <Image
                                src={LandingPagePNG}
                                alt={"landing-page"}
                                className="text-white w-full max-w-[300px] aspect-[4/5] object-cover rounded-lg shadow-lg"
                            />
                            <section className="flex-1 flex flex-col">
                                <h1 className="text-2xl sm:text-3xl font-semibold text-adpro-900">{box.name}</h1>
                                <div className="my-3 flex-1 text-2xl sm:text-2xl font-semibold text-adpro-blue-900">
                                    <p className="max-w-prose">
                                        Rp {box.price},-
                                    </p>
                                </div>
                                <div className="my-3 flex-1 text-[18px] font-semibold text-adpro-green-900">
                                    {box.items.map((item, index) => (
                                        <p key={index} className="max-w-prose text-gray">
                                            {item.quantity} piece(s) of {item.name}
                                        </p>
                                    ))}
                                </div>
                                <div className="my-3 flex-1 text-[18px] font-semibold text-adpro-dolly-300">
                                    <p className="max-w-prose">
                                        {box.description}
                                    </p>
                                </div>
                                <button
                                    className='text-[18px] gap-2 mt-3 border-[2px] rounded-xl border-adpro-700 text-adpro-700 px-9 py-[10px] hover:text-adpro-000 hover:bg-adpro-600 hover:border-adpro-600 ease-in-out duration-200'
                                    onClick={() => handleEditBox(box.id)}>Edit
                                </button>
                                <button
                                    className='text-[18px] gap-2 mt-3 border-[2px] rounded-xl border-adpro-700 text-adpro-700 px-9 py-[10px] hover:text-adpro-000 hover:bg-adpro-600 hover:border-adpro-600 ease-in-out duration-200'
                                    onClick={() => handleDelete(box.id)}>Delete
                                </button>
                                <button
                                    className='text-[18px] gap-2 mt-3 border-[2px] rounded-xl border-adpro-700 text-adpro-700 px-9 py-[10px] hover:text-adpro-000 hover:bg-adpro-600 hover:border-adpro-600 ease-in-out duration-200'
                                    onClick={() => router.push(`/review/box/${box.id}`)}>Reviews
                                </button>
                            </section>
                        </main>
                    </div>
                ))}
            </ul>
            <button
                className="text-[18px] gap-2 mt-3 border-[2px] rounded-xl border-adpro-700 text-adpro-700 px-9 py-[10px] hover:text-adpro-000 hover:bg-adpro-600 hover:border-adpro-600 ease-in-out duration-200"
                onClick={handleAddNewBox}>Add New Box
            </button>
        </div>
    );
}
