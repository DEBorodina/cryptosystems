const { fileReader, fileWriterEncoded, fileWriterDecoded } = require("./file");
const { validateSubstitutionCipher } = require("./validator");

const encodeAlgorithm = (alphabet, stringToEncode, key) =>
  stringToEncode.reduce((newString, letter) => {
    return newString + key[alphabet.indexOf(letter)];
  }, "");

const decodeAlgorithm = (alphabet, stringToEncode, key) =>
  stringToEncode.reduce((newString, letter) => {
    return newString + alphabet[key.indexOf(letter)];
  }, "");

const substitutionCipherEncoder = (directoryName) => {
  let { alphabet, key, string } = fileReader(directoryName);

  key = key.split("");

  validateSubstitutionCipher(alphabet, string, key);

  endcodedString = encodeAlgorithm(alphabet, string, key);

  fileWriterEncoded(directoryName, endcodedString);
};

const substitutionCipherDecoder = (directoryName) => {
  let { alphabet, key, string } = fileReader(directoryName);

  key = key.split("");

  validateSubstitutionCipher(alphabet, string, key);

  decodedString = decodeAlgorithm(alphabet, string, key);

  fileWriterDecoded(directoryName, decodedString);
};

exports.substitutionCipherEncoder = substitutionCipherEncoder;
exports.substitutionCipherDecoder = substitutionCipherDecoder;
