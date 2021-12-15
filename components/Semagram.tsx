import type { NextPage } from "next";
import Link from "next/link";

const Semagram: NextPage<{ title: string; url: string }> = ({ title, url }) => {
  return (
    <div className="flex flex-col bg-gray-200 ring-4 ring-gray-400 rounded justify-between">
      <div className="bg-gray-300 font-mono rounded-t w-full p-2 text-2xl text-black/90">
        <Link href={"/" + title}>{title.toUpperCase()}</Link>
      </div>
      <div className="h-full flex flex-col justify-center">
        <img
          src={url}
          alt={'Semagram of "' + title + '"'}
          className={`max-h-60 p-4 object-contain`}
          draggable="false"
        />
      </div>
    </div>
  );
};

export default Semagram;
