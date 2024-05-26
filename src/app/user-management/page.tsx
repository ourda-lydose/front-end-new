'use client'
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface User {
    id: number;
    username: string;
    email: string;
}

const UserManagementPage = () => {
    const [users] = useState<User[]>([
        { id: 1, username: 'user1', email: 'user1@example.com' },
        { id: 2, username: 'user2', email: 'user2@example.com' },
        { id: 3, username: 'user3', email: 'user3@example.com' },
    ]);

    const { isAuthenticated, logout } = useAuth();

    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [selectedRole, setSelectedRole] = useState<string>('');

    const handleModalOpen = (user: User) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedRole(event.target.value);
    };

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Kirim data ke server atau lakukan operasi yang diperlukan
        console.log(`Submitted role ${selectedRole} for user ${selectedUser?.id}`);
        setShowModal(false);
    };

    return (
        <div className="min-h-screen flex flex-col lg:flex-row">
            {/* Sidebar */}
            <aside className="w-full lg:w-64 bg-blue-800 text-white flex flex-col">
                <div className="h-16 flex items-center justify-center border-b border-gray-700">
                    <h1 className="text-xl font-bold">Admin Dashboard</h1>
                </div>
                <nav className="flex-1 p-4">
                    <ul>
                        <li className="mb-2">
                            <a href="#" className="block p-2 rounded hover:bg-gray-700">
                                User Management
                            </a>
                        </li>
                        <li className="mb-2">
                            <button onClick={logout} className="block p-2 rounded hover:bg-gray-700 w-full text-left">
                                Logout
                            </button>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 bg-gray-100">
                <div className="bg-white p-6 rounded-lg shadow-lg overflow-x-auto">
                    <h2 className="text-2xl font-bold mb-4">User Management</h2>
                    <table className="min-w-full bg-white text-black">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">ID</th>
                                <th className="py-2 px-4 border-b">Username</th>
                                <th className="py-2 px-4 border-b">Email</th>
                                <th className="py-2 px-4 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td className="py-2 px-4 border-b text-center">{user.id}</td>
                                    <td className="py-2 px-4 border-b text-center">{user.username}</td>
                                    <td className="py-2 px-4 border-b text-center">{user.email}</td>
                                    <td className="py-2 px-4 border-b text-center">
                                        <button onClick={() => handleModalOpen(user)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4 text-black">Assign Role</h2>
                        <form onSubmit={handleFormSubmit}>
                            <div className="mb-4">
                                <label htmlFor="role" className="block text-sm text-black font-medium text-gray-700">Select Role:</label>
                                <select id="role" name="role" value={selectedRole} onChange={handleRoleChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base text-black border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                                    <option value="">Select Role</option>
                                    <option value="ROLE_USER" className='text-black'>User</option>
                                    <option value="ROLE_ADMIN">Admin</option>
                                    <option value="ROLE_SUPERADMIN">Super Admin</option>
                                    <option value="ROLE_SUBSCRIBER">Subscriber</option>
                                </select>
                            </div>
                            <div className="flex justify-end">
                                <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus
                                :ring-blue-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2">
                                    Assign Role
                                </button>
                                <button onClick={() => setShowModal(false)} type="button" className="ml-2 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserManagementPage;
