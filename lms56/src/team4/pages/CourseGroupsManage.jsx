import React, { useState } from "react";

const CourseGroupsManage = () => {
  const [groups, setGroups] = useState([
    { id: 1, name: "1-р бүлэг" },
    { id: 2, name: "2-р бүлэг" },
  ]);
  const [newGroupName, setNewGroupName] = useState("");

  const handleAddGroup = () => {
    if (newGroupName.trim()) {
      const newGroup = {
        id: groups.length + 1,
        name: newGroupName,
      };
      setGroups([...groups, newGroup]);
      setNewGroupName("");
    }
  };

  const handleDeleteGroup = (id) => {
    if (confirm("Бүлгийг устгах уу?")) {
      setGroups(groups.filter((group) => group.id !== id));
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">
        Хичээлийн бүлэг удирдах
      </h1>

      <div className="mb-6 flex gap-2 items-center">
        <input
          type="text"
          placeholder="Шинэ бүлгийн нэр"
          value={newGroupName}
          onChange={(e) => setNewGroupName(e.target.value)}
          className="border px-4 py-2 rounded w-full"
        />
        <button
          onClick={handleAddGroup}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Нэмэх
        </button>
      </div>

      <div className="bg-white rounded shadow p-4">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Бүлгийн нэр</th>
              <th className="px-4 py-2">Үйлдэл</th>
            </tr>
          </thead>
          <tbody>
            {groups.map((group, index) => (
              <tr key={group.id} className="border-t">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{group.name}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDeleteGroup(group.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Устгах
                  </button>
                </td>
              </tr>
            ))}
            {groups.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center py-4 text-gray-500">
                  Бүлэг олдсонгүй.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CourseGroupsManage;
