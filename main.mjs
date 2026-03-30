import { readFileSync } from "fs";
import { brailleAlphabet, brailleNumbers } from "./brailleAlphabet.mjs";

const input = readFileSync("./input.txt", "utf-8");
const bitString = input.replace(/\s+/g, "");


function decodeBrailleToText(bits) {
  const chunks = bits.match(/.{6}/g);
  let result = "";
  let capitalizedFollows = false;
  let numberFollows = false;

  for (const chunk of chunks) {
    const character = brailleAlphabet[chunk];

    if (character === undefined) {
      console.log("Unknown chunk:", chunk);
      continue;
    }

    if (character === "CAP") {
      capitalizedFollows = true;
      continue;
    }

    if (character === "NUM") {
      numberFollows = true;
      continue;
    }

    if (character === "DEC") {
      continue;
    }

    if (character === " ") {
      numberFollows = false;
      result += " ";
      continue;
    }

    if (numberFollows) {
      result += brailleNumbers[character] ?? character;
    } else if (capitalizedFollows) {
      result += character.toUpperCase();
      capitalizedFollows = false;
    } else {
      result += character;
    }
  }

  return result;
}
const base64String = decodeBrailleToText(bitString);


// const characterFrequency = {};
// for (const character of plainText) {
//   characterFrequency[character] = (characterFrequency[character] || 0) + 1;
// }
// const mostCommon = Object.entries(characterFrequency)
//   .sort((a, b) => b[1] - a[1])[0][0];


console.log(base64String);

