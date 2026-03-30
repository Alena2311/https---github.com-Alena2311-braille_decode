import { readFileSync } from "fs";
import { brailleAlphabet } from "./brailleAlphabet.mjs";

const input = readFileSync("./input.txt", "utf-8");
const bitString = input.replace(/\s+/g, "");


function decodeBrailleToText(bits) {
  const chunks = bits.match(/.{6}/g);
  let result = "";
  let capitalizedFollows = false;
  let numberFollows = false;

  for (const chunk of chunks) {
    const character = brailleAlphabet[chunk];

    if (character === "CAP") {
      capitalizedFollows = true;
      continue;
    }

    if (character === "NUM") {
      numberFollows = true;
      continue;
    }

    if (character === " ") {
      numberFollows = false;
      result += " ";
      continue;
    }

    if (capitalizedFollows) {
      result += character.toUpperCase();
      capitalizedFollows = false;
    } else {
      result += character;
    }
  }

  return result;
}
const base64String = decodeBrailleToText(bitString);


const base64Characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
const base64Binary = base64String
  .split("")
  .map(character => base64Characters.indexOf(character).toString(2).padStart(6, "0"))
  .join("");

console.log(base64String);
console.log(base64Binary);