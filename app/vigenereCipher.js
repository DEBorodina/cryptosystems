const { mod } = require("mathjs");
const { fileReader, fileWriterEncoded, fileWriterDecoded } = require("./file");
const { validateVigenereCipher } = require("./validator");

const encodeAlgorithm = (alphabet, stringToEncode, key) => {
  let resultString = "";
  for (let i = 0; i < stringToEncode.length; i++) {
    resultString +=
      alphabet[
        mod(
          alphabet.indexOf(stringToEncode[i]) +
            alphabet.indexOf(key[i % key.length]),
          alphabet.length
        )
      ];
  }
  return resultString;
};

const decodeAlgorithm = (alphabet, stringToEncode, key) => {
  let resultString = "";
  for (let i = 0; i < stringToEncode.length; i++) {
    resultString +=
      alphabet[
        mod(
          alphabet.indexOf(stringToEncode[i]) -
            alphabet.indexOf(key[i % key.length]),
          alphabet.length
        )
      ];
  }
  return resultString;
};

const vigenereCipherEncoder = (directoryName) => {
  let { alphabet, key, string } = fileReader(directoryName);

  key = key.split("");

  validateVigenereCipher(alphabet, string, key);

  endcodedString = encodeAlgorithm(alphabet, string, key);

  fileWriterEncoded(directoryName, endcodedString);
};

const vigenereCipherDecoder = (directoryName) => {
  let { alphabet, key, string } = fileReader(directoryName);

  key = key.split("");

  validateVigenereCipher(alphabet, string, key);

  decodedString = decodeAlgorithm(alphabet, string, key);

  fileWriterDecoded(directoryName, decodedString);
};

exports.vigenereCipherEncoder = vigenereCipherEncoder;
exports.vigenereCipherDecoder = vigenereCipherDecoder;
