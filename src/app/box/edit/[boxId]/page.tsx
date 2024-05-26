// "use client";
//
// import { useEffect, useState } from 'react';
// import { getSubscriptionBoxById, updateSubscriptionBox } from '@/app/api/box/route';
// import { useRouter, useParams } from "next/navigation";
// import { getItemById } from '@/app/api/item/route';
// import { Item, SubscriptionBox as DetailSubscriptionBox } from '@/app/types/types';
// import LandingPagePNG from "@/images/landing-page-bg.png";
// import Image from "next/image";
//
// interface SubscriptionBox extends DetailSubscriptionBox {
//     items: { itemId: string; name: string; quantity: number }[];
// }
//
// export default function EditSubscriptionBox({params,}: { params: { boxId: string }; }) {
//     const router = useRouter();
//     const [box, setBox] = useState<SubscriptionBox | null>(null);
//     const [items, setItems] = useState<{ itemId: string; name: string; quantity: number }[]>([]);
//
//     useEffect(() => {
//         if (params.boxId) {
//             fetchBox(params.boxId);
//         }
//     }, [params.boxId]);
//
//     const fetchBox = async (boxId: string) => {
//         const data: DetailSubscriptionBox = await getSubscriptionBoxById(boxId);
//
//         const items = await Promise.all(
//             data.itemInBoxList.map(async (itemInBox) => {
//                 const item = await getItemById(itemInBox.itemId);
//                 return { itemId: itemInBox.itemId, name: item.name, quantity: itemInBox.quantity };
//             })
//         );
//
//         setBox({ ...data, items });
//     };
//
//     const handleSubmit = async (event: React.FormEvent) => {
//         event.preventDefault();
//         try{
//             const updatedBox : SubscriptionBox = { ...box,  name} as SubscriptionBox;
//             //     id: params.boxId,
//             //     name: box.name,
//             //     image: box.image,
//             //     description: box.description,
//             //     price: box.price,
//             //     itemInBoxList: box.items.map(item => ({ itemId: item.itemId, quantity: item.quantity }))
//             // } as SubscriptionBox;
//             console.log('Updated Box Payload:', updatedBox);
//             await updateSubscriptionBox(params.boxId as string, updatedBox);
//             router.push('/box');
//         }catch (error) {
//             console.error('Error updating box:', error);
//         }
//     };
//
//     const handleChange = (field: string, value: string | number) => {
//         if (box) {
//             setBox({ ...box, [field]: value });
//         }
//     };
//
//     if (!box) return <div>Loading...</div>;
//
//     return (
//         <div className="pt-16 h-screen flex flex-col justify-start items-center w-screen">
//             <h1 className="font-light text-7xl font-cormorant text-adpro-900">Edit Box</h1>
//             <div className="w-full">
//                 <main className="p-3 sm:p-5 flex gap-8 w-full md:w-4/5 lg:w-3/5 mx-auto sm:flex-row flex-row items-center sm:items-stretch">
//                     <Image
//                         src={LandingPagePNG}
//                         alt={"landing-page"}
//                         className="text-white w-full max-w-[300px] aspect-[4/5] object-cover rounded-lg shadow-lg"
//                     />
//                     <section className="flex-1 flex flex-col">
//                         <input
//                             type="text"
//                             value={box.name}
//                             onChange={(e) => handleChange('box.name', setBoxName(e.target.value))}
//                             className="text-2xl sm:text-3xl font-semibold text-adpro-900"
//                         />
//                         <input
//                             type="number"
//                             value={box.price}
//                             onChange={(e) => handleChange('box.price', parseInt(e.target.value))}
//                             className="my-3 flex-1 text-2xl sm:text-2xl font-semibold text-adpro-blue-900"
//                         />
//                         <textarea
//                             value={box.description}
//                             onChange={(e) => handleChange('box.description', e.target.value)}
//                             className="my-3 flex-1 text-[18px] font-semibold text-adpro-dolly-300"
//                         />
//                         <div className="my-3 flex-1 text-[18px] font-semibold text-adpro-green-900">
//                             {box.items.map((item, index) => (
//                                 <p key={index} className="max-w-prose text-gray">
//                                     {item.quantity} piece(s) of {item.name}
//                                 </p>
//                             ))}
//                         </div>
//                         <button
//                             className='text-[18px] gap-2 mt-3 border-[2px] rounded-xl border-adpro-700 text-adpro-700 px-9 py-[10px] hover:text-adpro-000 hover:bg-adpro-600 hover:border-adpro-600 ease-in-out duration-200'
//                             onClick={handleSubmit}>Save
//                         </button>
//                     </section>
//                 </main>
//             </div>
//         </div>
//     );
// }

"use client";

import { useEffect, useState } from 'react';
import { Item, ItemInBox } from '@/app/types/types';
import { getSubscriptionBoxById, updateSubscriptionBox } from '@/app/api/box/route';
import { useRouter, useParams } from "next/navigation";
import { getAllItems } from '@/app/api/item/route';

const EditBoxPage = ({ params }: { params: { boxId: string } }) => {
    const router = useRouter();
    const [boxId, setBoxId] = useState('');
    const [boxName, setBoxName] = useState('');
    const [boxImage, setBoxImage] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [items, setItems] = useState<Item[]>([]);
    const [selectedItems, setSelectedItems] = useState<ItemInBox[]>([]);

    useEffect(() => {
        if (params.boxId) {
            fetchBox(params.boxId);
        }
        fetchItems();
    }, [params.boxId]);

    const fetchBox = async (boxId: string) => {
        const data = await getSubscriptionBoxById(boxId);
        setBoxId(data.id);
        setBoxName(data.name);
        setBoxImage(data.image);
        setDescription(data.description);
        setPrice(data.price);
        setSelectedItems(data.itemInBoxList);
    };

    const fetchItems = async () => {
        const data: Item[] = await getAllItems();
        setItems(data);
    };

    const handleItemQuantityChange = (itemId: string, quantity: number) => {
        setSelectedItems(prevItems => {
            const index = prevItems.findIndex(item => item.itemId === itemId);
            if (quantity > 0) {
                if (index === -1) {
                    return [...prevItems, { idItemInBox: '', itemId, quantity }];
                } else {
                    const updatedItems = [...prevItems];
                    updatedItems[index].quantity = quantity;
                    return updatedItems;
                }
            } else {
                if (index !== -1) {
                    const updatedItems = [...prevItems];
                    updatedItems.splice(index, 1);
                    return updatedItems;
                }
            }
            return prevItems;
        });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log('updatedBox test');
        const updatedBox = {
            name: boxName,
            image: boxImage,
            description,
            price,
            itemInBoxList: selectedItems.map(({ itemId, quantity }) => ({
                itemId,
                quantity
            })),
        };
        console.log('updatedBox', updatedBox);
        await updateSubscriptionBox(params.boxId as string, updatedBox);
        router.push('/box');
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl mb-4">Edit Box</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Box Name:
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            type="text"
                            value={boxName}
                            onChange={(e) => setBoxName(e.target.value)}
                        />
                    </label>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                        Box Image:
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="image"
                            type="text"
                            value={boxImage}
                            onChange={(e) => setBoxImage(e.target.value)}
                        />
                    </label>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        Description:
                        <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </label>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                        Price:
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="price"
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(parseFloat(e.target.value))}
                        />
                    </label>
                </div>
                <div className="mb-4">
                    <h2>Items in Box:</h2>
                    {items.map(item => (
                        <div key={item.id}>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={item.id}>
                                {item.name}
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id={item.id}
                                    type="number"
                                    value={selectedItems.find(selectedItem => selectedItem.itemId === item.id)?.quantity || 0}
                                    onChange={(e) => handleItemQuantityChange(item.id, parseInt(e.target.value))}
                                />
                            </label>
                        </div>
                    ))}
                </div>
                <button
                    className="mt-3 px-4 py-2 border-2 border-blue text-blue rounded-xl hover:bg-blue hover:text-black duration-200"
                    type="submit"
                >
                    Save
                </button>
            </form>
        </div>
    );
};

export default EditBoxPage;
