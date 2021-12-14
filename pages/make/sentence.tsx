import { getImageAddresses, returnPos, simplify } from "../../utils/sentence";
import { GetStaticPaths, GetStaticProps } from "next";
import type { NextPage } from "next";
// import mergeImages from "merge-images";

const Sentence: NextPage<{ sentence: string; addresses: string[]; noun: string; verb: string; object: string }> = ({
  sentence,
  addresses,
  noun,
  verb,
  object,
}) => {
  //   console.log(sentence, noun, verb, object);

  const classes = "right-[4vw] right-[8vw] right-[12vw] right-[16vw] right-[20vw] right-[24vw]";

  //   mergeImages(
  //     [
  //       { src: "/words/water.svg", x: 20, y: 100 },
  //       { src: "/words/walks.svg", x: 20, y: 100 },
  //       { src: "/words/sees.svg", x: 20, y: 100 },
  //     ],
  //     { width: 3000, height: 3000 }
  //   ).then(b64 => (document.querySelector("img").src = b64));

  return (
    <div className="flex flex-col h-[100vh] items-center justify-center">
      <div className="relative m-2 flex justify-center items-center">
        <div className="m-3 p-3 text-6xl text-center font-mono rounded bg-gray-200 ring-4 ring-gray-400 text-black/90">
          {sentence.toUpperCase()}
        </div>
      </div>

      <div className="m-2 flex w-3/4 bg-gray-200 ring-4 ring-gray-400 rounded justify-between items-center">
        <div className="w-full h-[75vh] flex flex-col justify-center items-center">
          <div className="relative flex w-full justify-center items-center">
            <canvas>
              {addresses.map((word, i) => (
                <img
                  className={`absolute max-w-[30vw] max-h-[65vh] my-[5%] py-[10%] object-contain`}
                  src={`/words/${word}.svg`}
                  alt={"Semagram of '" + word + "'"}
                />
              ))}
            </canvas>

            {/* <img
              className="absolute max-w-[30vw] max-h-[65vh] my-[5%] py-[10%] object-contain animate-[spin_10s_linear_infinite]"
              src={`/words/${noun}.svg`}
              alt={'Semagram of "' + noun + '"'}
            />
            <img
              className="absolute max-w-[30vw] max-h-[65vh] my-[5%] py-[10%] object-contain animate-[spin_10s_linear_infinite]"
              src={`/words/${verb}.svg`}
              alt={'Semagram of "' + verb + '"'}
            />
            {object && (
              <img
                className="absolute max-w-[30vw] max-h-[65vh] my-[5%] py-[10%] object-contain animate-[spin_10s_linear_infinite]"
                src={`/words/${object}.svg`}
                alt={'Semagram of "' + object + '"'}
              /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sentence;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const sentence = params?.sentence;
  if (typeof sentence !== "string")
    return {
      notFound: true,
    };

  const translate = simplify(sentence);
  if (!translate)
    return {
      notFound: true,
    };

  //   const { noun, verb, object } = returnPos(translate);

  //   return {
  //     props: {
  //       sentence: translate,
  //       noun,
  //       verb,
  //       object,
  //     },
  //   };

  const addresses = getImageAddresses(translate);
  return {
    props: {
      sentence: translate,
      addresses,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};
