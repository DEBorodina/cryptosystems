const { fileReader, fileWriterEncoded, fileWriterDecoded } = require("./file");
const {
  validateTranspositionCipherEncoder,
  validateTranspositionCipherDecoder,
} = require("./validator");

const encodeAlgorithm = (alphabet, stringToEncode, key) => {
  while (stringToEncode.length % key.length != 0) {
    stringToEncode.push(alphabet[0]);
  }

  let sortedKey = [...key];
  sortedKey.sort((a, b) => alphabet.indexOf(a) - alphabet.indexOf(b));

  let resultString = "";
  for (let i = 0; i < stringToEncode.length; i++) {
    resultString +=
      stringToEncode[
        key.indexOf(sortedKey[i % key.length]) +
          key.length * Math.floor(i / key.length)
      ];
  }

  return resultString;
};

const decodeAlgorithm = (alphabet, stringToEncode, key) => {
  let sortedKey = [...key];
  sortedKey.sort((a, b) => alphabet.indexOf(a) - alphabet.indexOf(b));

  let resultString = "";
  for (let i = 0; i < stringToEncode.length; i++) {
    resultString +=
      stringToEncode[
        sortedKey.indexOf(key[i % key.length]) +
          key.length * Math.floor(i / key.length)
      ];
  }

  return resultString;
};

const transpositionCipherEncoder = (directoryName) => {
  let { alphabet, key, string } = fileReader(directoryName);

  key = key.split("");

  validateTranspositionCipherEncoder(alphabet, string, key);

  endcodedString = encodeAlgorithm(alphabet, string, key);

  fileWriterEncoded(directoryName, endcodedString);
};

const transpositionCipherDecoder = (directoryName) => {
  let { alphabet, key, string } = fileReader(directoryName);

  key = key.split("");

  validateTranspositionCipherDecoder(alphabet, string, key);

  decodedString = decodeAlgorithm(alphabet, string, key);

  fileWriterDecoded(directoryName, decodedString);
};

exports.transpositionCipherEncoder = transpositionCipherEncoder;
exports.transpositionCipherDecoder = transpositionCipherDecoder;
