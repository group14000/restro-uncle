import axios from 'axios';
import React, { useEffect, useState } from 'react'

interface GroupItem {
    id: number;
    foodName: string;
    status: string;
    cookingTime: string;
}

const FoodAvailability: React.FC = () => {
    const [items, setItems] = useState<GroupItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/group-items-list');
                setItems(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch data');
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    if (loading) {
        return <div className="text-center p-4">Loading...</div>;
    }

    if (error) {
        return <div className="text-center p-4 text-red-500">{error}</div>;
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead>
                    <tr className="w-full bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">SL</th>
                        <th className="py-3 px-6 text-left">Food Name</th>
                        <th className="py-3 px-6 text-left">Available Day</th>
                        <th className="py-3 px-6 text-left">Available Time</th>
                        <th className="py-3 px-6 text-left">Action</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                    {items.map((item, index) => (
                        <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="py-3 px-6 text-left">{index + 1}</td>
                            <td className="py-3 px-6 text-left">{item.foodName}</td>
                            <td className="py-3 px-6 text-left">{item.status}</td>
                            <td className="py-3 px-6 text-left">{item.cookingTime}</td>
                            <td className="py-3 px-6 text-left">
                                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2">
                                    Edit
                                </button>
                                <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default FoodAvailability
