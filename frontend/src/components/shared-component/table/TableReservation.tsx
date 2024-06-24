import React, { useState } from 'react';

interface TableReservationProps {
  onReservationSubmit: (count: number) => void;
}

const TableReservation: React.FC<TableReservationProps> = ({ onReservationSubmit }) => {
  const [personCount, setPersonCount] = useState(0);

  const tables = [
    { id: 1, table: 2, seat: 4, available: 4 },
    { id: 2, table: 3, seat: 2, available: 2 },
    { id: 3, table: 6, seat: 3, available: 3 },
    { id: 4, table: 7, seat: 8, available: 8 },
    { id: 5, table: 9, seat: 3, available: 3 },
    { id: 6, table: 'Right corner', seat: 9, available: 9 },
  ];

  const handleSubmit = () => {
    onReservationSubmit(personCount);
  };

  return (
    <div className="p-4">
      <div className="flex space-x-4 mb-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">First Floor</button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">VIP Floor</button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Second Floor</button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {tables.map((table) => (
          <div key={table.id} className="border p-4 rounded shadow-md">
            <div className="flex items-center mb-4">
              <input type="checkbox" className="mr-2" />
              <div>
                <p>Table {table.table}</p>
                <p>Seat {table.seat}</p>
                <p>Available {table.available}</p>
              </div>
              <img src="https://img.icons8.com/ios-filled/50/000000/table.png" alt="Table" className="ml-auto" />
            </div>
            <div className="mb-4">
              <table className="w-full text-left">
                <thead>
                  <tr>
                    <th>ORDER</th>
                    <th>TIME</th>
                    <th>PERSON</th>
                    <th>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={4} className="text-center">No Customer</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex items-center">
              <input
                type="number"
                value={personCount}
                onChange={(e) => setPersonCount(parseInt(e.target.value))}
                className="border p-2 flex-grow"
                placeholder="Person"
              />
              <button onClick={handleSubmit} className="bg-gray-500 text-white px-4 py-2 ml-2 rounded">
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableReservation;