import Semagram from "../components/Semagram";
import Search from "../components/Search";
import { Fragment, useState } from "react";
import data from "../public/data.json";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <>
      <div className="flex justify-center mb-1">
        <div className="m-3 p-3 text-6xl font-mono rounded bg-gray-200 ring-4 ring-gray-400 text-black/90">
          Semationary
        </div>
      </div>
      <Search setSearch={setSearchValue} />
      <div className="w-[calc(100%-1rem)] m-2 p-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4">
        {data
          .sort((a, b) => {
            if (a.word < b.word) return -1;
            if (a.word > b.word) return 1;
            return 0;
          })
          .map(wordData => {
            if (!searchValue)
              return (
                <Fragment key={wordData.word}>
                  <Semagram trans={wordData.word} url={`words/${wordData.word}.svg`} />
                </Fragment>
              );
            else if (
              wordData.word.includes(searchValue.toLowerCase()) ||
              wordData.synonyms.join(" ").includes(searchValue.toLowerCase())
            )
              return (
                <Fragment key={wordData.word}>
                  <Semagram trans={wordData.word} url={`words/${wordData.word}.svg`} />
                </Fragment>
              );
          })}
      </div>
    </>
  );
};

export default Home;
