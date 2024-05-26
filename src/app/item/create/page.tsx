// "use client";

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';  // Updated import for useRouter in the new app directory
// import { createItem } from '../../api/item/route';
// import { ItemRequest } from '@/app/types/types';

// const CreateItem = () => {
//     const router = useRouter();
//     const [name, setName] = useState('');
//     const [image, setImage] = useState('');
//     const [description, setDescription] = useState('');

//     const handleSubmit = async (event: React.FormEvent) => {
//         event.preventDefault();
//         try {
//             const itemRequest: ItemRequest = {
//                 itemBuilder: {
//                     name,
//                     image
//                 },
//                 description
//             };
//             await createItem(itemRequest);
//             router.push('/item');
//         } catch (error) {
//             console.error('Error creating item:', error);
//         }
//     };

//     return (
//         <div className="container mx-auto p-4">
//             <h1 className="text-2xl mb-4">Create New Item</h1>
//             <form onSubmit={handleSubmit}>
//                 <div className="mb-4">
//                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
//                         Name
//                     </label>
//                     <input
//                         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                         id="name"
//                         type="text"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
//                         Image URL
//                     </label>
//                     <input
//                         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                         id="image"
//                         type="text"
//                         value={image}
//                         onChange={(e) => setImage(e.target.value)}
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
//                         Description
//                     </label>
//                     <textarea
//                         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                         id="description"
//                         value={description}
//                         onChange={(e) => setDescription(e.target.value)}
//                     ></textarea>
//                 </div>
//                 <button
//                     className="mt-3 px-4 py-2 border-2 border-blue text-blue rounded-xl hover:bg-blue hover:text-black duration-200"
//                     type="submit"
//                 >
//                     Create
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default CreateItem;
