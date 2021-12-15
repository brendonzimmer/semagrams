import { getImageAddresses, simplify } from "../utils/sentence";
import type { GetServerSideProps, NextPage } from "next";
import Manipulated from "../components/Manipulated";
import { useState } from "react";
import Link from "next/link";

const Sentence: NextPage<{ simplified: string; addresses: string[] }> = ({ simplified, addresses }) => {
  const [hide, setHide] = useState(false);

  // function getStyleInfo() {
  //   const transform: string[] = [];
  //   const size: { w: string; h: string }[] = [];
  //   const rotate: string[] = [];

  //   document
  //     .querySelectorAll(".react-draggable")
  //     .forEach(e => transform.push(e.getAttribute("style")!.split("transform: ")[1].split(";")[0]));

  //   document.querySelectorAll("#img").forEach((e, i) => {
  //     const { width, height, left, top } = e.getBoundingClientRect();
  //     const { left: bigLeft, top: bigTop } = document.querySelector("foreignObject")!.getBoundingClientRect();

  //     rotate.push(
  //       e.getAttribute("style")!.split("rotate(")[1].split("deg")[0] +
  //         " " +
  //         (left + width / 2 - bigLeft) +
  //         " " +
  //         (top + height / 2 - bigTop)
  //     );
  //   });

  //   document.querySelectorAll(".react-draggable").forEach(e =>
  //     size.push({
  //       w: e.getAttribute("style")!.split("width: ")[1].split(";")[0],
  //       h: e.getAttribute("style")!.split("height: ")[1].split(";")[0],
  //     })
  //   );

  //   console.log(transform, size, rotate);

  //   return { transform, size, rotate };
  // }

  // function saveSentence() {
  //   const { transform, size, rotate } = getStyleInfo();
  //   const wid = document.querySelector("foreignObject")!.getBoundingClientRect().width;
  //   let res = `<svg width="${wid}" height="500" style="height: 100%;" xmlns="http://www.w3.org/2000/svg">`;
  //   addresses.forEach((word, i) => {
  //     res += `<image href="../words/${word}.svg" transform="scale(1.12) rotate(${rotate[i]}) ${transform[i]
  //       .replaceAll("px", "")
  //       .replaceAll(",", "")}" style="width: ${size[i].w}; height: ${size[i].h};"/>`;
  //   });
  //   res += "</svg>";

  //   console.log(res);

  //   return (
  //     <svg width={wid} height="500" xmlns="http://www.w3.org/2000/svg">
  //       {addresses.map((word, i) => (
  //         <image
  //           key={word}
  //           href={`../words/${word}.svg`}
  //           transform={"scale(1.12) rotate(" + rotate[i] + ") " + transform[i].replaceAll("px", "").replaceAll(",", "")}
  //           style={{
  //             width: size[i].w,
  //             height: size[i].h,
  //           }}
  //         />
  //       ))}
  //     </svg>
  //   );
  // }

  return (
    <>
      <div className="flex flex-col h-[100vh] items-center justify-center">
        <div className="relative m-2 flex justify-center items-center">
          <Link passHref href={"/"}>
            <div className="z-10 cursor-pointer hidden lg:block lg:absolute lg:-left-16 text-5xl  bg-gray-200 rounded px-1 ring-4 ring-gray-400 text-black/90">
              ←
            </div>
          </Link>
          <div className="m-3 p-3 text-6xl text-center font-mono rounded bg-gray-200 ring-4 ring-gray-400 text-black/90">
            {simplified.toUpperCase()}
          </div>
        </div>
        <Link passHref href={"/"}>
          <div className="z-10 cursor-pointer lg:hidden text-5xl mb-3 bg-gray-200 rounded px-1 ring-4 ring-gray-400 text-black/90">
            ←
          </div>
        </Link>

        <div className="m-2 flex w-3/4 bg-gray-200 ring-4 ring-gray-400 rounded justify-between items-center">
          <div className="w-full h-[75vh] flex flex-col justify-center items-center">
            <div className="flex w-full justify-center items-center relative">
              <button
                className="select-none z-10 px-2 py-1 text-lg font-mono bg-gray-400 absolute top-0 right-0 rounded-bl"
                onClick={() => alert("This isn't working right now :/\nTry again when later.")}
              >
                Upload
              </button>
              <svg width={500} height={500} className="relative w-full h-[75vh]">
                <foreignObject width={500} height={500} className="w-full h-[75vh]">
                  <button
                    className="select-none px-2 py-1 text-lg font-mono bg-gray-400 rounded-br text-black/90"
                    onClick={() => setHide(!hide)}
                  >
                    {hide ? "Show Boxes" : "Hide Boxes"}
                  </button>
                  {addresses.map(word => (
                    <Manipulated key={word} word={word} hideBox={hide} />
                  ))}
                </foreignObject>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sentence;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const simplified = simplify(query.sentence as string);

  if (simplified) {
    const addresses = getImageAddresses(simplified);
    return { props: { simplified, addresses } };
  }

  return {
    props: {},
    redirect: {
      destination: "/",
    },
  };
};
