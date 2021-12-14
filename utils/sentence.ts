import data from "../public/data.json";

// simplifies the sentence to known words
export function simplify(sentence: string) {
  if (sentence.split(" ").length < 2) return "";

  const words = sentence
    .toLowerCase()
    .split(" ")
    .filter(word => {
      for (const wordData of data) if (wordData.word === word || wordData.synonyms.includes(word)) return true;
    });

  if (words.length < 2) return "";

  return words.join(" ");
}

function findNoun(sentence: string) {
  const words = sentence.split(" ");

  for (const word of words)
    for (const wordData of data)
      if (wordData.pos.includes("noun") && (wordData.word === word || wordData.synonyms.includes(word))) return word;

  return "";
}

function findVerb(sentence: string) {
  const words = sentence.split(" ");
  for (const word of words)
    for (const wordData of data)
      if (wordData.pos.includes("verb") && (wordData.word === word || wordData.synonyms.includes(word))) return word;

  return "";
}

function findObject(sentence: string, exclude?: string[]) {
  const words = sentence.split(" ");
  for (const word of words) {
    if (exclude?.includes(word)) continue;

    for (const wordData of data)
      if (wordData.pos.includes("object") && (wordData.word === word || wordData.synonyms.includes(word))) return word;
  }

  return "";
}

export function returnPos(sentence: string) {
  let noun = findNoun(sentence);
  let verb = findVerb(sentence);
  let object = findObject(sentence, [noun, verb]);

  for (const wordData of data) if (wordData.word === noun || wordData.synonyms.includes(noun)) noun = wordData.word;

  for (const wordData of data) if (wordData.word === verb || wordData.synonyms.includes(verb)) verb = wordData.word;

  if (object)
    for (const wordData of data)
      if (wordData.word === object || wordData.synonyms.includes(object)) object = wordData.word;

  return {
    noun,
    verb,
    object,
  };
}

export function getImageAddresses(sentence: string) {
  const simplified = simplify(sentence).split(" ");

  const addresses = [];
  for (const word of simplified)
    for (const wordData of data)
      if (wordData.word === word || wordData.synonyms.includes(word)) addresses.push(wordData.word);

  return addresses;
}
