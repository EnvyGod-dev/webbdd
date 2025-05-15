import { useParams } from "react-router-dom";
import { useState } from "react";

const EditUser = () => {
  const { user_id } = useParams();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Энд edit хийх logic бичигдэх боломжтой
    console.log("Updated user:", formData);
    alert("Амжилттай хадгалагдлаа!");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6">Хэрэглэгч засах (ID: {user_id})</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Имэйл</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Нэр</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Эрх</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
            required
          >
            <option value="">-- Сонгох --</option>
            <option value="admin">Админ</option>
            <option value="school_admin">Сургуулийн админ</option>
            <option value="teacher">Багш</option>
            <option value="student">Оюутан</option>
            <option value="user">Хэрэглэгч</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          Хадгалах
        </button>
      </form>
    </div>
  );
};

export default EditUser;
