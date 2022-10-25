const { mod } = require("mathjs");
const { fileReader, fileWriterEncoded, fileWriterDecoded } = require("./file");
const { validateShiftCipher } = require("./validator");

const encodeAlgorithm = (alphabet, stringToEncode, keyValue) =>
  stringToEncode.reduce((newString, letter) => {
    newIndex = mod(alphabet.indexOf(letter) + keyValue, alphabet.length);
    return newString + alphabet[newIndex];
  }, "");

const decodeAlgorithm = (alphabet, stringToEncode, keyValue) =>
  stringToEncode.reduce((newString, letter) => {
    newIndex = mod(alphabet.indexOf(letter) - keyValue, alphabet.length);
    return newString + alphabet[newIndex];
  }, "");

const shiftCipherEncoder = (directoryName) => {
  let { alphabet, key, string } = fileReader(directoryName);

  validateShiftCipher(alphabet, string, key);

  keyValue = alphabet.indexOf(key);

  endcodedString = encodeAlgorithm(alphabet, string, keyValue);

  fileWriterEncoded(directoryName, endcodedString);
};

const shiftCipherDecoder = (directoryName) => {
  let { alphabet, key, string } = fileReader(directoryName);

  validateShiftCipher(alphabet, string, key);

  keyValue = alphabet.indexOf(key);

  decodedString = decodeAlgorithm(alphabet, string, keyValue);

  fileWriterDecoded(directoryName, decodedString);
};

exports.shiftCipherDecoder = shiftCipherDecoder;
exports.shiftCipherEncoder = shiftCipherEncoder;
