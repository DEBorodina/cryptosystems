const fs = require("fs");
const {
  hillCipherDecoder,
  hillCipherEncoder,
} = require("../../app/hillCipher");
const { fileNames } = require("../../app/constants/fileNames");
const { ALPHABET } = require("../../app/constants/alphabet");
const { gcd } = require("mathjs");

const testHillCipherEncoder = (test) => {
  let directoryName = __dirname + `/tests/test${test}`;
  hillCipherEncoder(directoryName);
  return (encodedString = fs.readFileSync(
    directoryName + "/" + fileNames.encrypt,
    "utf8"
  ));
};

const testHillCipherDecoder = (test) => {
  let directoryName = __dirname + `/tests/test${test}`;
  hillCipherDecoder(directoryName);
  return (decodedString = fs.readFileSync(
    directoryName + "/" + fileNames.decrypt,
    "utf8"
  ));
};

exports.testHillCipherEncoder = testHillCipherEncoder;
exports.testHillCipherDecoder = testHillCipherDecoder;
