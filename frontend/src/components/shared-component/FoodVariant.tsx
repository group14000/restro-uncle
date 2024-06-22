import React from 'react';

const FoodVariant: React.FC = () => {
    const data = [
        { id: 1, variant: 'CHEESE BLOCK', name: 'LONGLIFE MILK' },
        { id: 2, variant: 'CHEESE BLOCK', name: 'SLICED CHEESE' },
        { id: 3, variant: 'CHEESE BLOCK', name: 'CHEESE BLOCK' },
        { id: 4, variant: 'CHEESE BLOCK', name: 'SHRIRACHA MAYO' },
        { id: 5, variant: 'CHEESE BLOCK', name: 'YOGURT' },
        { id: 6, variant: 'CHEESE BLOCK', name: 'Paneer' },
        { id: 7, variant: 'CHEESE BLOCK', name: 'White Butter' },
        { id: 8, variant: 'CHEESE BLOCK', name: 'LONG LIFE MILK' },
        { id: 9, variant: 'CHEESE BLOCK', name: 'WRAP' },
        { id: 10, variant: 'CHEESE BLOCK', name: 'CLOVES' },
        { id: 11, variant: 'CHEESE BLOCK', name: 'Classic Chips' },
    ];

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead>
                    <tr className="w-full bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">SL</th>
                        <th className="py-3 px-6 text-left">Food Variant</th>
                        <th className="py-3 px-6 text-left">Food Name</th>
                        <th className="py-3 px-6 text-left">Action</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                    {data.map((item, index) => (
                        <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="py-3 px-6 text-left">{index + 1}</td>
                            <td className="py-3 px-6 text-left">{item.variant}</td>
                            <td className="py-3 px-6 text-left">{item.name}</td>
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
    );
};

export default FoodVariant;
