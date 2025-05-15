import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Цахим шалгалтын систем</h1>
        <p className="mb-6 text-gray-600">Системд нэвтрэх эсвэл бүртгүүлэх товчийг дарна уу.</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate("/team4/schools/current")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition"
          >
            Нэвтрэх
          </button>
          <button
            onClick={() => navigate("/team4/register")}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-6 py-2 rounded-lg transition"
          >
            Бүртгүүлэх
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default Home;
