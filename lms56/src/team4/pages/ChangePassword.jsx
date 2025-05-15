import { useState } from "react";

const ChangePassword = () => {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) {
      setError("Шинэ нууц үг баталгаажуулалт таарахгүй байна.");
      return;
    }

    // Here, you would typically send the passwords to backend for validation and update
    console.log("Нууц үг солигдож байна:", form);
    setSuccess("Нууц үг амжилттай солигдлоо!");
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Нууц үг солих</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Хуучин нууц үг</label>
          <input
            type="password"
            name="currentPassword"
            value={form.currentPassword}
            onChange={handleChange}
            className="w-full mt-1 border border-gray-300 px-4 py-2 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Шинэ нууц үг</label>
          <input
            type="password"
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
            className="w-full mt-1 border border-gray-300 px-4 py-2 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Шинэ нууц үг (дахин)</label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full mt-1 border border-gray-300 px-4 py-2 rounded-md"
            required
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">{success}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Нууц үг солих
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
