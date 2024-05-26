// "use client";

// import { useEffect, useState } from 'react';
// import { Item, ItemInBox } from '@/app/types/types';
// import { getSubscriptionBoxById, updateSubscriptionBox } from '@/app/api/box/route';
// import { useRouter, useParams } from "next/navigation";
// import { getAllItems } from '@/app/api/item/route';

// const EditBoxPage = ({ params }: { params: { boxId: string } }) => {
//     const router = useRouter();
//     const [boxId, setBoxId] = useState('');
//     const [boxName, setBoxName] = useState('');
//     const [boxImage, setBoxImage] = useState('');
//     const [description, setDescription] = useState('');
//     const [price, setPrice] = useState(0);
//     const [items, setItems] = useState<Item[]>([]);
//     const [selectedItems, setSelectedItems] = useState<ItemInBox[]>([]);

//     useEffect(() => {
//         if (params.boxId) {
//             fetchBox(params.boxId);
//         }
//         fetchItems();
//     }, [params.boxId]);

//     const fetchBox = async (boxId: string) => {
//         const data = await getSubscriptionBoxById(boxId);
//         setBoxId(data.id);
//         setBoxName(data.name);
//         setBoxImage(data.image);
//         setDescription(data.description);
//         setPrice(data.price);
//         setSelectedItems(data.itemInBoxList);
//     };

//     const fetchItems = async () => {
//         const data: Item[] = await getAllItems();
//         setItems(data);
//     };

//     const handleItemQuantityChange = (itemId: string, quantity: number) => {
//         setSelectedItems(prevItems => {
//             const index = prevItems.findIndex(item => item.itemId === itemId);
//             if (quantity > 0) {
//                 if (index === -1) {
//                     return [...prevItems, { idItemInBox: '', itemId, quantity }];
//                 } else {
//                     const updatedItems = [...prevItems];
//                     updatedItems[index].quantity = quantity;
//                     return updatedItems;
//                 }
//             } else {
//                 if (index !== -1) {
//                     const updatedItems = [...prevItems];
//                     updatedItems.splice(index, 1);
//                     return updatedItems;
//                 }
//             }
//             return prevItems;
//         });
//     };

//     const handleSubmit = async (event: React.FormEvent) => {
//         event.preventDefault();
//         console.log('updatedBox test');
//         const updatedBox = {
//             name: boxName,
//             image: boxImage,
//             description,
//             price,
//             itemInBoxList: selectedItems.map(({ itemId, quantity }) => ({
//                 itemId,
//                 quantity
//             })),
//         };
//         console.log('updatedBox', updatedBox);
//         await updateSubscriptionBox(params.boxId as string, updatedBox);
//         router.push('/box');
//     };

//     return (
//         <div className="container mx-auto p-4">
//             <h1 className="text-2xl mb-4">Edit Box</h1>
//             <form onSubmit={handleSubmit}>
//                 <div className="mb-4">
//                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
//                         Box Name:
//                         <input
//                             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                             id="name"
//                             type="text"
//                             value={boxName}
//                             onChange={(e) => setBoxName(e.target.value)}
//                             disabled
//                         />
//                     </label>
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
//                         Box Image:
//                         <input
//                             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                             id="image"
//                             type="text"
//                             value={boxImage}
//                             onChange={(e) => setBoxImage(e.target.value)}
//                             disabled
//                         />
//                     </label>
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
//                         Description:
//                         <textarea
//                             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                             id="description"
//                             value={description}
//                             onChange={(e) => setDescription(e.target.value)}
//                         ></textarea>
//                     </label>
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
//                         Price:
//                         <input
//                             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                             id="price"
//                             type="number"
//                             value={price}
//                             onChange={(e) => setPrice(parseFloat(e.target.value))}
//                         />
//                     </label>
//                 </div>
//                 <div className="mb-4">
//                     <h2>Items in Box:</h2>
//                     {items.map(item => (
//                         <div key={item.id}>
//                             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={item.id}>
//                                 {item.name}
//                                 <input
//                                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                                     id={item.id}
//                                     type="number"
//                                     value={selectedItems.find(selectedItem => selectedItem.itemId === item.id)?.quantity || 0}
//                                     onChange={(e) => handleItemQuantityChange(item.id, parseInt(e.target.value))}
//                                 />
//                             </label>
//                         </div>
//                     ))}
//                 </div>
//                 <button
//                     className="mt-3 px-4 py-2 border-2 border-blue text-blue rounded-xl hover:bg-blue hover:text-black duration-200"
//                     type="submit"
//                 >
//                     Save
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default EditBoxPage;
