const fs = require("fs");
const {
  vigenereCipherDecoder,
  vigenereCipherEncoder,
} = require("../../app/vigenereCipher");
const { fileNames } = require("../../app/constants/fileNames");

const testVigenereCipherEncoder = (test) => {
  let directoryName = __dirname + `/tests/test${test}`;
  vigenereCipherEncoder(directoryName);
  return (encodedString = fs.readFileSync(
    directoryName + "/" + fileNames.encrypt,
    "utf8"
  ));
};

const testVigenereCipherDecoder = (test) => {
  let directoryName = __dirname + `/tests/test${test}`;
  vigenereCipherDecoder(directoryName);
  return (decodedString = fs.readFileSync(
    directoryName + "/" + fileNames.decrypt,
    "utf8"
  ));
};

exports.testVigenereCipherEncoder = testVigenereCipherEncoder;
exports.testVigenereCipherDecoder = testVigenereCipherDecoder;
