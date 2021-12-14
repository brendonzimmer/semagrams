import { create, all } from "mathjs";

const math = create(all);

export function getValues(word: string) {
  // if word contains a space return error description
  if (word.indexOf(" ") > -1)
    return {
      error: "Invalid input. Please enter a single word.",
    };

  // take each letter of the word, convert to ascii, and push it to an array
  const result = word
    .toLowerCase()
    .split("")
    .map(letter => letter.charCodeAt(0) - 96);

  // if letter is greater than next letter, subtract them and add them to the result
  let unique = 0;
  for (let i = 0; i < word.length; i++)
    if (word.charCodeAt(i) > word.charCodeAt(i + 1)) unique += word.charCodeAt(i) - word.charCodeAt(i + 1);

  const total = result.reduce((acc, curr) => acc + curr, 0);

  return {
    result,
    total,
    unique,
  };
}

// enum Funcs {
//   Add = 0,
//   Subtract = 1,
//   Multiply = 2,
//   Divide = 3,
//   Modulo = 4,
//   Power = 5,
//   Sin = 6,
//   Cos = 7,
//   Tan = 8,
//   Ln = 10,
//   Exp = 11,
//   Square = 14,
//   Cube = 15,
//   CbRt = 13,
//   Sqrt = 17,
// }
export function createFunction(x: string, y: string, c: number) {
  const deriv = {
    x: math.derivative(x, "t", { simplify: true }),
    y: math.derivative(y, "t", { simplify: true }),
  };

  let t = 0;
  while (Number((math.evaluate(deriv.x.toString(), { t, c }) as number).toFixed(3)) !== 0) {
    console.log(math.evaluate(deriv.x.toString(), { t: (t += 0.0001), c }));
    if (t > Math.PI) break;
  }
  console.log(t);
}
