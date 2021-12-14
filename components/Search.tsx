import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { simplify } from "../utils/sentence";
import type { NextPage } from "next";
import Link from "next/link";

const Search: NextPage<{ setSearch: Dispatch<SetStateAction<string>> }> = ({ setSearch }) => {
  const [sentence, setSentence] = useState<string>("");
  const [allowSubmit, setAllowSubmit] = useState<boolean>(false);
  useEffect(() => {
    if (allowSubmit && !simplify(sentence)) setAllowSubmit(false);
    if (!allowSubmit && simplify(sentence)) setAllowSubmit(true);
  }, [sentence, allowSubmit]);

  return (
    <div className="mx-4 font-mono text-black/90 ring-4 rounded ring-gray-400">
      <input
        type="search"
        placeholder="Search..."
        className="w-full md:w-4/12 focus:placeholder-black/20 peer lg:focus:w-7/12 bg-gray-200 lg:duration-100 focus:ring-transparent border-0 border-b-2 md:border-b-0 md:border-r-2 border-gray-400 focus:border-gray-400 rounded-t md:rounded-r-none md:rounded-l"
        onChange={e => setSearch(e.target.value)}
      />
      <input
        type="text"
        placeholder="Build a sentence..."
        className="w-3/4 md:w-[calc(6.5%*100/12)] focus:placeholder-black/20 lg:peer-focus:w-[calc(3.5%*100/12)] bg-gray-200 lg:duration-100 focus:ring-transparent border-0 border-r-2 border-gray-400 focus:border-gray-400 rounded-bl md:rounded-none"
        onChange={e => setSentence(e.target.value)}
      />
      <Link passHref href={{ pathname: "/make", query: { sentence } }}>
        <button
          disabled={!allowSubmit}
          className={`relative w-1/4 md:w-[calc(1.5%*100/12)] py-2 bg-gray-200 text-gray-500 rounded-br md:rounded-r ${
            allowSubmit ? "active:bg-gray-300" : "cursor-not-allowed"
          }`}
        >
          Create
          {sentence && (
            <div className="cursor-default no absolute top-2 -left-20">
              {allowSubmit ? <div className="text-green-600">Valid</div> : <div className="text-red-500">Invalid</div>}
            </div>
          )}
        </button>
      </Link>
    </div>
  );
};

export default Search;
