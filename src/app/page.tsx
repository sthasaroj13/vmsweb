import Image from "next/image";
import NavBar from "../component/NavBar";
import DashPage from "../app/Admin/DashPage";
export default function Home() {
  return (
    <>
      <main>
        <NavBar />
        <DashPage />
      </main>
    </>
  );
}
