const { mod, invmod } = require("mathjs");
const { fileReader, fileWriterEncoded, fileWriterDecoded } = require("./file");
const { validateAffineCipher } = require("./validator");

const encodeAlgorithm = (alphabet, stringToEncode, keyValue1, keyValue2) =>
  stringToEncode.reduce((newString, letter) => {
    newIndex = mod(
      alphabet.indexOf(letter) * keyValue1 + keyValue2,
      alphabet.length
    );
    return newString + alphabet[newIndex];
  }, "");

const decodeAlgorithm = (alphabet, stringToEncode, keyValue) =>
  stringToEncode.reduce((newString, letter) => {
    newIndex = mod(
      (alphabet.indexOf(letter) - keyValue2) *
        invmod(keyValue1, alphabet.length),
      alphabet.length
    );
    return newString + alphabet[newIndex];
  }, "");

const affineCipherEncoder = (directoryName) => {
  let { alphabet, key, string } = fileReader(directoryName);

  validateAffineCipher(alphabet, string, key);
  const [key1, key2] = key.split("");
  keyValue1 = alphabet.indexOf(key1);
  keyValue2 = alphabet.indexOf(key2);

  endcodedString = encodeAlgorithm(alphabet, string, keyValue1, keyValue2);

  fileWriterEncoded(directoryName, endcodedString);
};

const affineCipherDecoder = (directoryName) => {
  let { alphabet, key, string } = fileReader(directoryName);
  validateAffineCipher(alphabet, string, key);
  const [key1, key2] = key.split("");
  keyValue1 = alphabet.indexOf(key1);
  keyValue2 = alphabet.indexOf(key2);

  decodedString = decodeAlgorithm(alphabet, string, keyValue1, keyValue2);

  fileWriterDecoded(directoryName, decodedString);
};

exports.affineCipherEncoder = affineCipherEncoder;
exports.affineCipherDecoder = affineCipherDecoder;
