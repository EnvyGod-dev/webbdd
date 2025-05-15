import { useState } from 'react';
import { Link } from 'react-router-dom';

const Users = () => {
  const [users] = useState([
    {
      id: 1,
      email: 'admin@must.edu.mn',
      name: 'Админ',
      role: 'Системийн админ',
      status: 'active',
    },
    {
      id: 2,
      email: 'schoolteacher@must.edu.mn',
      name: 'Багш',
      role: 'Сургуулийн багш',
      status: 'active',
    },
    {
      id: 3,
      email: 'schoolstudent@must.edu.mn',
      name: 'Оюутан',
      role: 'Сургуулийн оюутан',
      status: 'inactive',
    },
  ]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-700">Хэрэглэгчийн жагсаалт</h1>
          <Link
            to="/team4/users/create"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + Шинэ хэрэглэгч
          </Link>
        </div>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-blue-100 text-left">
              <th className="p-3 border">#</th>
              <th className="p-3 border">Имэйл</th>
              <th className="p-3 border">Нэр</th>
              <th className="p-3 border">Төрөл</th>
              <th className="p-3 border">Төлөв</th>
              <th className="p-3 border">Үйлдэл</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="p-3 border">{index + 1}</td>
                <td className="p-3 border">{user.email}</td>
                <td className="p-3 border">{user.name}</td>
                <td className="p-3 border">{user.role}</td>
                <td className={`p-3 border ${user.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
                  {user.status === 'active' ? 'Идэвхтэй' : 'Идэвхгүй'}
                </td>
                <td className="p-3 border">
                  <Link
                    to={`/users/${user.id}`}
                    className="text-blue-600 hover:underline mr-2"
                  >
                    Харах
                  </Link>
                  <Link
                    to={`/users/${user.id}/edit`}
                    className="text-yellow-600 hover:underline mr-2"
                  >
                    Засах
                  </Link>
                  <button className="text-red-600 hover:underline">Устгах</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
