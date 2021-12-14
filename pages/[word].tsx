import { NextPage, GetStaticProps, GetStaticPaths } from "next";
import data from "../public/data.json";
import Link from "next/link";

const Word: NextPage<{ wordData: { word: string; pos: string; synonyms: string[] } }> = ({ wordData }) => {
  return (
    <div className="flex flex-col h-[100vh] items-center justify-center">
      <div className="relative m-2 flex justify-center items-center">
        <Link passHref href={"/"}>
          <div className="z-10 cursor-pointer hidden lg:block lg:absolute lg:-left-16 text-5xl  bg-gray-200 rounded px-1 ring-4 ring-gray-400 text-black/90">
            ←
          </div>
        </Link>
        <div className="m-3 p-3 text-6xl text-center font-mono rounded bg-gray-200 ring-4 ring-gray-400 text-black/90">
          {wordData.word.toUpperCase()}
        </div>
      </div>
      <Link passHref href={"/"}>
        <div className="z-10 cursor-pointer lg:hidden text-5xl mb-3 bg-gray-200 rounded px-1 ring-4 ring-gray-400 text-black/90">
          ←
        </div>
      </Link>

      <div className="m-2 flex w-3/4 bg-gray-200 ring-4 ring-gray-400 rounded justify-between items-center">
        <div className="w-full max-h-[75vh] flex flex-col justify-center items-center">
          <img
            src={`words/${wordData.word}.svg`}
            alt={'Semagram of "' + wordData.word + '"'}
            className={`max-w-[30vw] max-h-[65vh] my-[5%] py-[10%] object-contain animate-[spin_10s_linear_infinite]`}
            draggable="false"
          />
        </div>
      </div>

      {wordData.synonyms && (
        <div className="z-10 m-3 p-1 flex text-2xl font-mono rounded bg-gray-200 ring-4 ring-gray-400 text-black/90 font-bold items-center">
          SIMILAR:&nbsp;
          <div className="font-normal text-xl">{wordData.synonyms.join(", ").toUpperCase()}</div>
        </div>
      )}
    </div>
  );
};

export default Word;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const word = params?.word;

  if (typeof word !== "string" || word.includes(" "))
    return {
      notFound: true,
    };

  for (const item of data) {
    if (item.word === word) {
      return {
        props: {
          wordData: item,
        },
      };
    }
  }

  return {
    notFound: true,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = data.map(wordData => {
    return {
      params: {
        word: wordData.word,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};
