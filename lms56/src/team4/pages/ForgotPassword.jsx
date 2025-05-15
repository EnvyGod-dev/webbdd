import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate(); // useNavigate ашиглах

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you'd normally send a request to backend
    console.log("Reset link sent to:", email);
    setSubmitted(true);

    // Redirect to login page after successful submission
    setTimeout(() => {
      navigate("/team4/login"); // Амжилттай бол login хуудсанд шилжих
    }, 2000); // 2 секундын дараа шилжих
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Нууц үг сэргээх</h2>
        {submitted ? (
          <p className="text-green-600 text-center">
            Таны имэйл рүү сэргээх холбоос илгээгдлээ.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                И-мэйл хаяг
              </label>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="your@email.com"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
            >
              Илгээх
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
