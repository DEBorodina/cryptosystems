const fs = require("fs");
const {
  affineCipherDecoder,
  affineCipherEncoder,
} = require("../../app/affineCipher");
const { fileNames } = require("../../app/constants/fileNames");
const { ALPHABET } = require("../../app/constants/alphabet");
const { gcd } = require("mathjs");

const testAffineCipherEncoder = (test) => {
  let directoryName = __dirname + `/tests/test${test}`;
  affineCipherEncoder(directoryName);
  return (encodedString = fs.readFileSync(
    directoryName + "/" + fileNames.encrypt,
    "utf8"
  ));
};

const testAffineCipherDecoder = (test) => {
  let directoryName = __dirname + `/tests/test${test}`;
  affineCipherDecoder(directoryName);
  return (decodedString = fs.readFileSync(
    directoryName + "/" + fileNames.decrypt,
    "utf8"
  ));
};

exports.testAffineCipherEncoder = testAffineCipherEncoder;
exports.testAffineCipherDecoder = testAffineCipherDecoder;
