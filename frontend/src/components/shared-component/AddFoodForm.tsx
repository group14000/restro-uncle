import React, { useState } from 'react';
import axios from 'axios';

const AddFoodForm: React.FC = () => {
    const [foodData, setFoodData] = useState<{
        category: string;
        kitchen: string;
        foodName: string;
        components: string;
        notes: string;
        description: string;
        image: File | null;
        vat: string;
        offer: boolean;
        special: boolean;
        customQuantity: boolean;
        cookingTime: string;
        menuType: {
            nonVeg: boolean;
            veg: boolean;
            party: boolean;
            coffee: boolean;
            dinner: boolean;
            lunch: boolean;
            breakfast: boolean;
        };
        status: string;
    }>({
        category: '',
        kitchen: '',
        foodName: '',
        components: '',
        notes: '',
        description: '',
        image: null,
        vat: '',
        offer: false,
        special: false,
        customQuantity: false,
        cookingTime: '',
        menuType: {
            nonVeg: false,
            veg: false,
            party: false,
            coffee: false,
            dinner: false,
            lunch: false,
            breakfast: false,
        },
        status: 'active',
    });

    type MenuTypeKey = keyof typeof foodData.menuType;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            const { checked } = e.target as HTMLInputElement;
            if (name in foodData.menuType) {
                setFoodData((prevState) => ({
                    ...prevState,
                    menuType: {
                        ...prevState.menuType,
                        [name as MenuTypeKey]: checked,
                    },
                }));
            } else {
                setFoodData((prevState) => ({
                    ...prevState,
                    [name]: checked,
                }));
            }
        } else {
            setFoodData((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setFoodData((prevState) => ({
                ...prevState,
                image: files[0],
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('category', foodData.category);
        formData.append('kitchen', foodData.kitchen);
        formData.append('foodName', foodData.foodName);
        formData.append('components', foodData.components);
        formData.append('notes', foodData.notes);
        formData.append('description', foodData.description);
        if (foodData.image) {
            formData.append('image', foodData.image);
        }
        formData.append('vat', foodData.vat);
        formData.append('offer', JSON.stringify(foodData.offer));
        formData.append('special', JSON.stringify(foodData.special));
        formData.append('customQuantity', JSON.stringify(foodData.customQuantity));
        formData.append('cookingTime', foodData.cookingTime);
        Object.keys(foodData.menuType).forEach((key) => {
            formData.append(`menuType[${key}]`, JSON.stringify(foodData.menuType[key as MenuTypeKey]));
        });
        formData.append('status', foodData.status);

        try {
            const response = await axios.post('http://localhost:3000/api/add-food', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error adding food item:', error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4">Add Food</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-700">Category</label>
                            <select
                                name="category"
                                className="w-full p-2 border rounded"
                                value={foodData.category}
                                onChange={handleInputChange}
                            >
                                <option value="">Select option</option>
                                <option value="wrapsAndSandwiches">Wraps and Sandwiches</option>
                                <option value="mumbaiChowpattyChaat">Mumbai Chowpatty Chaat Items</option>
                                <option value="chips">CHIPS</option>
                                <option value="dairy">DAIRY</option>
                                <option value="wrap">WRAP</option>
                                <option value="dry">DRY</option>
                                <option value="fridge">FRIDGE</option>
                                <option value="maharashtrianSnacks">Maharashtrian Snacks</option>
                                <option value="mumbaiStreetFood">Mumbai Street Food</option>
                                <option value="meals">Meals</option>
                                <option value="curries">Curries</option>
                                <option value="bread">Bread</option>
                                <option value="milkshakesAndFaloodas">Milkshakes & Faloodas</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700">Select Kitchen</label>
                            <select
                                name="kitchen"
                                className="w-full p-2 border rounded"
                                value={foodData.kitchen}
                                onChange={handleInputChange}
                            >
                                <option value="">Select option</option>
                                <option value="kitchen1">Kitchen 1</option>
                                <option value="kitchen2">Kitchen 2</option>
                                <option value="kitchen3">Kitchen 3</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700">Food Name *</label>
                            <input
                                name="foodName"
                                type="text"
                                className="w-full p-2 border rounded"
                                value={foodData.foodName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Components</label>
                            <input
                                name="components"
                                type="text"
                                className="w-full p-2 border rounded"
                                value={foodData.components}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Notes</label>
                            <input
                                name="notes"
                                type="text"
                                className="w-full p-2 border rounded"
                                value={foodData.notes}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Description</label>
                            <textarea
                                name="description"
                                className="w-full p-2 border rounded"
                                value={foodData.description}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Image</label>
                            <input
                                name="image"
                                type="file"
                                className="w-full p-2 border rounded"
                                onChange={handleFileChange}
                            />
                            {foodData.image && (
                                <img
                                    src={URL.createObjectURL(foodData.image)}
                                    alt="Preview"
                                    className="mt-2"
                                />
                            )}
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-700">Vat</label>
                            <input
                                name="vat"
                                type="text"
                                className="w-full p-2 border rounded"
                                value={foodData.vat}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Offer</label>
                            <input
                                name="offer"
                                type="checkbox"
                                checked={foodData.offer}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Special</label>
                            <input
                                name="special"
                                type="checkbox"
                                checked={foodData.special}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Custom Quantity</label>
                            <input
                                name="customQuantity"
                                type="checkbox"
                                checked={foodData.customQuantity}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Cooking Time</label>
                            <input
                                name="cookingTime"
                                type="time"
                                className="w-full p-2 border rounded"
                                value={foodData.cookingTime}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Menu Type</label>
                            <div className="flex flex-wrap gap-2">
                                {[
                                    'nonVeg',
                                    'veg',
                                    'party',
                                    'coffee',
                                    'dinner',
                                    'lunch',
                                    'breakfast',
                                ].map((type) => (
                                    <label
                                        key={type}
                                        className="flex items-center space-x-2"
                                    >
                                        <input
                                            name={type}
                                            type="checkbox"
                                            checked={foodData.menuType[type as MenuTypeKey]}
                                            onChange={handleInputChange}
                                        />
                                        <span>
                                            {type.charAt(0).toUpperCase() +
                                                type.slice(1)}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-700">Status</label>
                            <select
                                name="status"
                                className="w-full p-2 border rounded"
                                value={foodData.status}
                                onChange={handleInputChange}
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex justify-end space-x-4">
                    <button
                        type="reset"
                        className="bg-gray-200 text-gray-700 p-2 rounded"
                    >
                        Reset
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white p-2 rounded"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddFoodForm;
