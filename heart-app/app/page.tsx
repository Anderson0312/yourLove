

import HeartButton from "@/components/HeartButton";
import Image from "next/image";

export default function Home() {
  return (
    <div className="m-auto flex flex-col items-center justify-center h-screen">
        <HeartButton/>
        <h1 className="text-xl font-bold mt-3">Click ↑ </h1>
    </div>
  );
}
