import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface FoodItem {
  id: number;
  image: string;
  categoryName: string;
  foodName: string;
  components: string;
  vat: string;
  status: string;
}

const FoodTable: React.FC = () => {
  const [foodData, setFoodData] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/foods');
        setFoodData(response.data);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <label htmlFor="recordsPerPage" className="mr-2">Display</label>
          <select id="recordsPerPage" className="p-2 border rounded">
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <span className="ml-2">records per page</span>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 bg-gray-200 border rounded">Copy</button>
          <button className="p-2 bg-gray-200 border rounded">CSV</button>
          <button className="p-2 bg-gray-200 border rounded">Excel</button>
          <button className="p-2 bg-gray-200 border rounded">PDF</button>
          <button className="p-2 bg-gray-200 border rounded">Print</button>
        </div>
        <input
          type="text"
          placeholder="Search"
          className="p-2 border rounded"
        />
      </div>
      <table className="min-w-full bg-white border rounded shadow-md">
        <thead>
          <tr>
            <th className="p-4 border-b">#</th>
            <th className="p-4 border-b">Image</th>
            <th className="p-4 border-b">Category Name</th>
            <th className="p-4 border-b">Food Name</th>
            <th className="p-4 border-b">Components</th>
            <th className="p-4 border-b">Vat</th>
            <th className="p-4 border-b">Status</th>
            <th className="p-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {foodData.map((food) => (
            <tr key={food.id}>
              <td className="p-4 border-b">{food.id}</td>
              <td className="p-4 border-b">
                <img src={food.image} alt="Food" className="w-16 h-16" />
              </td>
              <td className="p-4 border-b">{food.categoryName}</td>
              <td className="p-4 border-b">{food.foodName}</td>
              <td className="p-4 border-b">{food.components}</td>
              <td className="p-4 border-b">{food.vat}</td>
              <td className={`p-4 border-b ${food.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
                {food.status}
              </td>
              <td className="p-4 border-b">
                <button className="p-2 bg-blue-500 text-white rounded mr-2">
                  Edit
                </button>
                <button className="p-2 bg-red-500 text-white rounded">
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

export default FoodTable;
