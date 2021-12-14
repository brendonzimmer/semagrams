import { useState } from "react";
import { NextPage } from "next";
import { Rnd } from "react-rnd";

const Manipulated: NextPage<{ word: string; hideBox: boolean }> = ({ word, hideBox }) => {
  const [deg, setDeg] = useState(0);
  if (!word) return <div>Loading</div>;

  return (
    <>
      <div
        draggable
        onClick={() => setDeg(0)}
        onDrag={e => {
          if (e.clientX < e.currentTarget.getBoundingClientRect().left) setDeg(deg - 0.2);
          else setDeg(deg + 0.2);
        }}
        className="w-10 h-10 rounded-full bg-black/20 m-2"
      ></div>
      <Rnd
        lockAspectRatio={true}
        maxWidth={"500"}
        className={!hideBox ? "ring-2 ring-green-600" : ""}
        minWidth={"200"}
        default={{
          x: 0,
          y: 0,
          width: 500,
          height: 500,
        }}
      >
        <img
          className="select-none"
          style={{ transform: `rotate(${deg}deg)` }}
          src={`/words/${word}.svg`}
          draggable={false}
          id="img"
          alt={'Semagram of "' + word + '"'}
        />
      </Rnd>
    </>
  );
};

export default Manipulated;
