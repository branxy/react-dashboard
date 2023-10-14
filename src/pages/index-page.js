import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";

export default function IndexPage() {
  return (
    <>
      <Navbar />
      <div className="content-wrapper">
        <Outlet />
      </div>
    </>
  );
}
