import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const UserDetail = () => {
  const { user_id } = useParams();
  const [user, setUser] = useState(null);

  // Жишээ өгөгдөл
  const sampleUsers = [
    {
      id: "1",
      email: "admin@must.edu.mn",
      name: "Админ",
      lastname: "А",
      role: "Системийн админ",
    },
    {
      id: "2",
      email: "schoolstudent@must.edu.mn",
      name: "Оюутан",
      lastname: "С",
      role: "Сургуулийн оюутан",
    },
  ];

  useEffect(() => {
    const foundUser = sampleUsers.find((u) => u.id === user_id);
    setUser(foundUser);
  }, [user_id]);

  if (!user) {
    return <div className="p-4">Хэрэглэгчийн мэдээлэл олдсонгүй.</div>;
  }

  return (
    <div className="max-w-xl mx-auto mt-8 bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4">Хэрэглэгчийн дэлгэрэнгүй</h1>
      <div className="space-y-2">
        <p><span className="font-semibold">ID:</span> {user.id}</p>
        <p><span className="font-semibold">Нэр:</span> {user.name}</p>
        <p><span className="font-semibold">Эцэг эхийн нэр:</span> {user.lastname}</p>
        <p><span className="font-semibold">И-мэйл:</span> {user.email}</p>
        <p><span className="font-semibold">Хэрэглэгчийн төрөл:</span> {user.role}</p>
      </div>
    </div>
  );
};

export default UserDetail;
