import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Team6Layout = () => {
  return (
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto bg-white p-6">
          <Outlet />
        </main>
      </div>
  );
};

export default Team6Layout;
