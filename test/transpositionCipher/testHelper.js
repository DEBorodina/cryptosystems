const fs = require("fs");
const {
  transpositionCipherDecoder,
  transpositionCipherEncoder,
} = require("../../app/transpositionCipher");
const { fileNames } = require("../../app/constants/fileNames");
const { ALPHABET } = require("../../app/constants/alphabet");
const { gcd } = require("mathjs");

const testTranspositionCipherEncoder = (test) => {
  let directoryName = __dirname + `/tests/test${test}`;
  transpositionCipherEncoder(directoryName);
  return (encodedString = fs.readFileSync(
    directoryName + "/" + fileNames.encrypt,
    "utf8"
  ));
};

const testTranspositionCipherDecoder = (test) => {
  let directoryName = __dirname + `/tests/test${test}`;
  transpositionCipherDecoder(directoryName);
  return (decodedString = fs.readFileSync(
    directoryName + "/" + fileNames.decrypt,
    "utf8"
  ));
};

exports.testTranspositionCipherEncoder = testTranspositionCipherEncoder;
exports.testTranspositionCipherDecoder = testTranspositionCipherDecoder;
