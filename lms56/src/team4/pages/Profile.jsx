import { useState, useEffect } from "react";

const Profile = () => {
  const storedUser = JSON.parse(localStorage.getItem("user")) || {};

  const [profileData, setProfileData] = useState({
    email: storedUser.email || "",
    firstName: storedUser.firstName || "",
    lastName: storedUser.lastName || "",
    registerNumber: storedUser.registerNumber || "",
    phone: storedUser.phone || "",
    gender: storedUser.gender || "male",
    school: storedUser.school || "",
    role: storedUser.role || "",
    picture: storedUser.picture || ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(profileData));
    alert("Мэдээлэл амжилттай хадгалагдлаа!");
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6">Өөрийн мэдээлэл</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2 text-center">
          {profileData.picture && (
            <img
              src={profileData.picture}
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto mb-4 border"
            />
          )}
        </div>
        <div className="md:col-span-2">
          <label className="block mb-1 font-medium">Зургийн URL</label>
          <input
            type="text"
            name="picture"
            value={profileData.picture}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Имэйл</label>
          <input
            type="email"
            name="email"
            value={profileData.email}
            onChange={handleChange}
            disabled
            className="w-full border border-gray-300 px-4 py-2 rounded-md bg-gray-100"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Утасны дугаар</label>
          <input
            type="text"
            name="phone"
            value={profileData.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Овог</label>
          <input
            type="text"
            name="lastName"
            value={profileData.lastName}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Нэр</label>
          <input
            type="text"
            name="firstName"
            value={profileData.firstName}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Регистр</label>
          <input
            type="text"
            name="registerNumber"
            value={profileData.registerNumber}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Хүйс</label>
          <select
            name="gender"
            value={profileData.gender}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
          >
            <option value="male">Эр</option>
            <option value="female">Эм</option>
            <option value="other">Бусад</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">Сургууль</label>
          <input
            type="text"
            name="school"
            value={profileData.school}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Эрх</label>
          <input
            type="text"
            name="role"
            value={profileData.role}
            disabled
            className="w-full border border-gray-300 px-4 py-2 rounded-md bg-gray-100"
          />
        </div>
        <div className="col-span-1 md:col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Хадгалах
          </button>
          <button
  type="button"
  onClick={() => window.location.href = "/team4/profile/view"}
  className="w-full mt-2 text-blue-600 underline"
>
  Мэдээллээ харах
</button>

          
        </div>
      </form>
    </div>
  );
};

export default Profile;