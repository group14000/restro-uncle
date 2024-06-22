import React, { useState } from 'react';
import axios from 'axios';

interface MenuType {
    nonVeg: boolean;
    veg: boolean;
    party: boolean;
    coffee: boolean;
    dinner: boolean;
    lunch: boolean;
    breakfast: boolean;
}

interface Variant {
    name: string;
    variantName: string;
    price: string;
    quantity: string;
}

interface FormData {
    category: string;
    foodName: string;
    components: string;
    notes: string;
    description: string;
    vat: string;
    offer: boolean;
    special: boolean;
    cookingTime: string;
    status: string;  // Add the status field
    menuType: MenuType;
    variants: Variant[];
}

const AddGroupItem: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        category: '',
        foodName: '',
        components: '',
        notes: '',
        description: '',
        vat: '',
        offer: false,
        special: false,
        cookingTime: '',
        status: '',  // Initialize the status field
        menuType: {
            nonVeg: false,
            veg: false,
            party: false,
            coffee: false,
            dinner: false,
            lunch: false,
            breakfast: false,
        },
        variants: [
            { name: '', variantName: '', price: '', quantity: '' }
        ]
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const { checked } = e.target as HTMLInputElement;
            if (name in formData.menuType) {
                setFormData((prevState) => ({
                    ...prevState,
                    menuType: {
                        ...prevState.menuType,
                        [name]: checked,
                    },
                }));
            } else {
                setFormData((prevState) => ({
                    ...prevState,
                    [name]: checked,
                }));
            }
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleVariantChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const newVariants = [...formData.variants];
        newVariants[index] = {
            ...newVariants[index],
            [name]: value,
        };
        setFormData({
            ...formData,
            variants: newVariants
        });
    };

    const addVariant = () => {
        setFormData((prevState) => ({
            ...prevState,
            variants: [...prevState.variants, { name: '', variantName: '', price: '', quantity: '' }]
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/group-items', formData);
            console.log('Group item added successfully', response.data);
        } catch (error) {
            console.error('Error adding group item', error);
        }
    };

    return (
        <div className="p-8 bg-white shadow-md rounded-md">
            <h2 className="text-xl font-bold mb-4">Add Group Item</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <div className="md:col-span-1 lg:col-span-1">
                        <label className="block text-sm font-medium text-gray-700">Category</label>
                        <select name="category" value={formData.category} onChange={handleChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            <option>Select option</option>
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
                    <div className="md:col-span-1 lg:col-span-1">
                        <label className="block text-sm font-medium text-gray-700">Food Name *</label>
                        <input
                            name="foodName"
                            type="text"
                            value={formData.foodName}
                            onChange={handleChange}
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Food Name"
                        />
                    </div>
                    <div className="md:col-span-1 lg:col-span-1">
                        <label className="block text-sm font-medium text-gray-700">Components</label>
                        <input
                            name="components"
                            type="text"
                            value={formData.components}
                            onChange={handleChange}
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Components"
                        />
                    </div>
                    <div className="md:col-span-1 lg:col-span-1">
                        <label className="block text-sm font-medium text-gray-700">Notes</label>
                        <input
                            name="notes"
                            type="text"
                            value={formData.notes}
                            onChange={handleChange}
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Notes"
                        />
                    </div>
                    <div className="md:col-span-1 lg:col-span-1">
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <input
                            name="description"
                            type="text"
                            value={formData.description}
                            onChange={handleChange}
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Description"
                        />
                    </div>
                    <div className="md:col-span-1 lg:col-span-1">
                        <label className="block text-sm font-medium text-gray-700">Image</label>
                        <input
                            type="file"
                            className="mt-1 block w-full text-sm text-gray-500"
                        // Handle file upload if needed
                        />
                    </div>
                    <div className="md:col-span-1 lg:col-span-1">
                        <label className="block text-sm font-medium text-gray-700">Vat %</label>
                        <input
                            name="vat"
                            type="text"
                            value={formData.vat}
                            onChange={handleChange}
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="0%"
                        />
                    </div>
                    <div className="md:col-span-1 lg:col-span-1 flex items-center">
                        <input
                            name="offer"
                            type="checkbox"
                            checked={formData.offer}
                            onChange={handleChange}
                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                        <label className="ml-2 block text-sm font-medium text-gray-700">Offer</label>
                        <input
                            name="special"
                            type="checkbox"
                            checked={formData.special}
                            onChange={handleChange}
                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded ml-4"
                        />
                        <label className="ml-2 block text-sm font-medium text-gray-700">Special</label>
                    </div>
                    <div className="md:col-span-1 lg:col-span-1">
                        <label className="block text-sm font-medium text-gray-700">Cooking Time</label>
                        <input
                            name="cookingTime"
                            type="text"
                            value={formData.cookingTime}
                            onChange={handleChange}
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Cooking Time"
                        />
                    </div>
                    <div className="md:col-span-1 lg:col-span-1">
                        <label className="block text-sm font-medium text-gray-700">Status</label>
                        <input
                            name="status"
                            type="text"
                            value={formData.status}
                            onChange={handleChange}
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Status"
                        />
                    </div>
                    <div className="md:col-span-2 lg:col-span-3">
                        <label className="block text-sm font-medium text-gray-700">Menu Type</label>
                        <div className="mt-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                            {Object.keys(formData.menuType).map((key) => (
                                <div key={key} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={key}
                                        name={key}
                                        checked={formData.menuType[key as keyof MenuType]}
                                        onChange={(e) => {
                                            const { name, checked } = e.target;
                                            setFormData((prevState) => ({
                                                ...prevState,
                                                menuType: {
                                                    ...prevState.menuType,
                                                    [name]: checked,
                                                },
                                            }));
                                        }}
                                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                    />
                                    <label htmlFor={key} className="ml-2 block text-sm font-medium text-gray-700 capitalize">{key}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="md:col-span-2 lg:col-span-3">
                        <label className="block text-sm font-medium text-gray-700">Variants</label>
                        {formData.variants.map((variant, index) => (
                            <div key={index} className="mt-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <input
                                    name="name"
                                    type="text"
                                    value={variant.name}
                                    onChange={(e) => handleVariantChange(index, e)}
                                    className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Variant Name"
                                />
                                <input
                                    name="variantName"
                                    type="text"
                                    value={variant.variantName}
                                    onChange={(e) => handleVariantChange(index, e)}
                                    className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Variant"
                                />
                                <input
                                    name="price"
                                    type="text"
                                    value={variant.price}
                                    onChange={(e) => handleVariantChange(index, e)}
                                    className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Price"
                                />
                                <input
                                    name="quantity"
                                    type="text"
                                    value={variant.quantity}
                                    onChange={(e) => handleVariantChange(index, e)}
                                    className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Quantity"
                                />
                            </div>
                        ))}
                        <button type="button" onClick={addVariant} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Add Variant
                        </button>
                    </div>
                </div>
                <div className="mt-6">
                    <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Add Group Item
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddGroupItem;
