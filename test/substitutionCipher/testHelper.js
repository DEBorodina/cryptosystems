const fs = require("fs");
const {
  substitutionCipherDecoder,
  substitutionCipherEncoder,
} = require("../../app/substitutionCipher");
const { fileNames } = require("../../app/constants/fileNames");
const { ALPHABET } = require("../../app/constants/alphabet");
const { gcd } = require("mathjs");

const testSubstitutionCipherEncoder = (test) => {
  let directoryName = __dirname + `/tests/test${test}`;
  substitutionCipherEncoder(directoryName);
  return (encodedString = fs.readFileSync(
    directoryName + "/" + fileNames.encrypt,
    "utf8"
  ));
};

const testSubstitutionCipherDecoder = (test) => {
  let directoryName = __dirname + `/tests/test${test}`;
  substitutionCipherDecoder(directoryName);
  return (decodedString = fs.readFileSync(
    directoryName + "/" + fileNames.decrypt,
    "utf8"
  ));
};

exports.testSubstitutionCipherEncoder = testSubstitutionCipherEncoder;
exports.testSubstitutionCipherDecoder = testSubstitutionCipherDecoder;
