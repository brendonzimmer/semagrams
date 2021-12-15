import { Fragment, useEffect, useRef, useState } from "react";
// import Composite from "../components/Composite";
import Semagram from "../components/Semagram";
// import combo from "../public/combo.json";
import Search from "../components/Search";
import data from "../public/data.json";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const words = useRef<HTMLDivElement>(null);
  // const combos = useRef<HTMLDivElement>(null);
  // const combosText = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (words.current) {
  //     if (words.current.innerHTML.length === 0) words.current.classList.add("hidden");
  //     else words.current.classList.remove("hidden");
  //   }
  //   if (combos.current && combosText.current && words.current) {
  //     if (combos.current.innerHTML.length === 0)
  //       combosText.current.classList.add("hidden"),
  //         combos.current.classList.remove("mb-2", "pb-2"),
  //         words.current.classList.add("mb-2", "pb-2");
  //     else combosText.current.classList.remove("hidden");
  //   }
  // }, [searchValue]);

  return (
    <>
      <div className="flex justify-center mb-1">
        <div className="m-3 p-3 text-6xl font-mono rounded bg-gray-200 ring-4 ring-gray-400 text-black/90">
          Semationary
        </div>
        <a
          target="_blank"
          href="https://drive.google.com/file/d/120dSaicuzpBaSuhwK19mMpMxaFkYrhoZ/view?usp=sharing"
          rel="noopener noreferrer"
        >
          <div className="absolute top-0 right-0 text-center font-mono w-32 cursor-pointer text-2xl m-3 bg-gray-200 rounded p-1 ring-4 ring-gray-400 text-black/90">
            ESSAY
          </div>
        </a>
      </div>
      <Search setSearch={setSearchValue} />
      {/* Words */}
      <div
        ref={words}
        className="w-[calc(100%-1rem)] mx-2 mt-2 px-2 pt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4"
      >
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
                  <Semagram title={wordData.word} url={`words/${wordData.word}.svg`} />
                </Fragment>
              );
            else if (
              wordData.word.includes(searchValue.toLowerCase()) ||
              wordData.synonyms.join(" ").includes(searchValue.toLowerCase())
            )
              return (
                <Fragment key={wordData.word}>
                  <Semagram title={wordData.word} url={`words/${wordData.word}.svg`} />
                </Fragment>
              );
          })}
      </div>
      {/* Combos */}
      {/* <div
        ref={combosText}
        className="text-center font-semibold m-4 px-2 py-1.5 text-2xl font-mono text-black/90 rounded bg-gray-200 ring-4 ring-gray-400"
      >
        SENTENCES (USER CREATED)
      </div>
      <div
        ref={combos}
        className="w-[calc(100%-1rem)] mx-2 px-2 mb-2 pb-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4"
      >
        {combo
          .sort((a, b) => {
            if (a.title < b.title) return -1;
            if (a.title > b.title) return 1;
            return 0;
          })
          .map(e => {
            if (!searchValue)
              return (
                <Fragment key={e.title}>
                  <Composite {...e} />
                </Fragment>
              );
            else if (e.title.includes(searchValue.toLowerCase()))
              return (
                <Fragment key={e.title}>
                  <Composite {...e} />
                </Fragment>
              );
          })}
      </div> */}
    </>
  );
};

export default Home;
