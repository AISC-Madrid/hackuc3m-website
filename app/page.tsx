import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans">
        <Image
          src="/underConstruction.gif"
          alt="Under Construction"
          width={200}
          height={100}
          priority
        />
    </div>
  );
}
