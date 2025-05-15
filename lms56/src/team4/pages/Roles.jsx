import { useState } from 'react';

const Roles = () => {
  const [roles, setRoles] = useState([
    { id: 1, name: 'Системийн админ', description: 'Бүх эрхтэй хэрэглэгч' },
    { id: 2, name: 'Сургуулийн админ', description: 'Сургуулийн хэрэглэгчдийг удирдана' },
    { id: 3, name: 'Сургуулийн багш', description: 'Шалгалт үүсгэх эрхтэй' },
    { id: 4, name: 'Сургуулийн оюутан', description: 'Шалгалтад оролцоно' },
  ]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-700">Хэрэглэгчийн төрөл удирдах</h1>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-blue-100">
              <th className="p-3 border">#</th>
              <th className="p-3 border">Төрлийн нэр</th>
              <th className="p-3 border">Тайлбар</th>
              <th className="p-3 border">Үйлдэл</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role, index) => (
              <tr key={role.id} className="text-center hover:bg-gray-50">
                <td className="p-3 border">{index + 1}</td>
                <td className="p-3 border">{role.name}</td>
                <td className="p-3 border">{role.description}</td>
                <td className="p-3 border">
                  <button className="text-blue-600 hover:underline mr-3">Засах</button>
                  <button className="text-red-600 hover:underline">Устгах</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Шинэ хэрэглэгчийн төрөл нэмэх</h2>
          <form className="space-y-3">
            <input
              type="text"
              placeholder="Төрлийн нэр"
              className="w-full border rounded-lg p-3"
            />
            <textarea
              placeholder="Тайлбар"
              className="w-full border rounded-lg p-3"
            ></textarea>
            <button
              type="submit"
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
            >
              Нэмэх
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Roles;
