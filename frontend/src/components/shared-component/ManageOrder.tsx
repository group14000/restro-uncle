import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';

interface GroupItem {
    id: number;
    foodName: string;
    category: string;
}

interface CartItem extends GroupItem {
    quantity: number;
}

const ManageOrder: React.FC = () => {
    const [items, setItems] = useState<GroupItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [cart, setCart] = useState<CartItem[]>([]);
    const beepRef = useRef<HTMLAudioElement>(null);

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

    const handleAddToCart = (item: GroupItem) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
            if (existingItem) {
                return prevCart.map(cartItem =>
                    cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
                );
            } else {
                return [...prevCart, { ...item, quantity: 1 }];
            }
        });
        if (beepRef.current) {
            beepRef.current.play();
        }
    };

    const handleIncreaseQuantity = (item: CartItem) => {
        setCart(prevCart =>
            prevCart.map(cartItem =>
                cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
            )
        );
    };

    const handleDecreaseQuantity = (item: CartItem) => {
        setCart(prevCart =>
            prevCart.map(cartItem =>
                cartItem.id === item.id && cartItem.quantity > 1
                    ? { ...cartItem, quantity: cartItem.quantity - 1 }
                    : cartItem
            )
        );
    };

    const handleRemoveFromCart = (item: CartItem) => {
        setCart(prevCart => prevCart.filter(cartItem => cartItem.id !== item.id));
    };

    if (loading) {
        return <div className="text-center p-4">Loading...</div>;
    }

    if (error) {
        return <div className="text-center p-4 text-red-500">{error}</div>;
    }

    const categories = Array.from(new Set(items.map(item => item.category)));

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Manage Order</h2>
            <div className="mb-4">
                <label htmlFor="category-select" className="block text-sm font-medium text-gray-700 mb-2">
                    Select Category:
                </label>
                <select
                    id="category-select"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="All">All</option>
                    {categories.map(category => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {items
                    .filter(item => selectedCategory === 'All' || item.category === selectedCategory)
                    .map((item) => (
                        <div
                            key={item.id}
                            className="p-4 border border-gray-200 rounded-md shadow-md cursor-pointer hover:bg-gray-100 transition duration-300"
                            onClick={() => handleAddToCart(item)}
                        >
                            <div className="flex items-center">
                                <img src="https://restro-unlce.upgradu.in/assets/img/icons/default.jpg" alt="Food Icon" className="w-16 h-16 mr-4"/>
                                <p className="text-lg text-blue-500">{item.foodName}</p>
                            </div>
                        </div>
                    ))}
            </div>
            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Cart</h2>
                {cart.length === 0 ? (
                    <p className="text-gray-500">Your cart is empty</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {cart.map((item, index) => (
                            <div
                                key={index}
                                className="p-4 border border-gray-200 rounded-md shadow-md"
                            >
                                <div className="flex items-center">
                                    <img src="https://restro-unlce.upgradu.in/assets/img/icons/default.jpg" alt="Food Icon" className="w-16 h-16 mr-4"/>
                                    <div className="flex flex-col">
                                        <p className="text-lg">{item.foodName}</p>
                                        <div className="flex items-center mt-2">
                                            <button
                                                className="px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm text-gray-700 mr-2"
                                                onClick={() => handleDecreaseQuantity(item)}
                                            >
                                                <FaMinus />
                                            </button>
                                            <span className="text-lg mx-2">{item.quantity}</span>
                                            <button
                                                className="px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm text-gray-700"
                                                onClick={() => handleIncreaseQuantity(item)}
                                            >
                                                <FaPlus />
                                            </button>
                                        </div>
                                        <button
                                            className="mt-2 px-2 py-1 border border-red-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 text-sm text-red-700 flex items-center"
                                            onClick={() => handleRemoveFromCart(item)}
                                        >
                                            <FaTrash className="mr-1" /> Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <audio ref={beepRef} src="/beep.wav" preload="auto"></audio>
        </div>
    );
};

export default ManageOrder;
