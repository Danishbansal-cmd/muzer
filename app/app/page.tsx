import Image from "next/image";
import { AppBar } from "./components/Appbar";

export default function Home() {
  return (
    <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      {/* learn context api */}
      <AppBar />
    </main>
  );
}
