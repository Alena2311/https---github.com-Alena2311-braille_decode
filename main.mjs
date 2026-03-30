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
      numberFollows = false;  // <-- added here
    } else if (capitalizedFollows) {
      result += character.toUpperCase();
      capitalizedFollows = false;
    } else {
      result += character;
    }
  }

  return result;
}
function decodeBase64(str) {
  const base64Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  const binary = str
    .replace(/=+$/, "")
    .split("")
    .map(c => base64Chars.indexOf(c).toString(2).padStart(6, "0"))
    .join("");

  const bytes = binary.match(/.{8}/g);

  return bytes
    .map(byte => String.fromCharCode(parseInt(byte, 2)))
    .join("");
}

const base64String = decodeBrailleToText(bitString);
const plainText = decodeBase64(base64String);
console.log(plainText);

const characterFrequency = {};
for (const character of plainText) {
  if (character >= "a" && character <= "z") {
    characterFrequency[character] = (characterFrequency[character] || 0) + 1;
  }
}

const mostCommon = Object.entries(characterFrequency)
  .sort((a, b) => b[1] - a[1])[0][0];

console.log("Most common letter:", mostCommon);