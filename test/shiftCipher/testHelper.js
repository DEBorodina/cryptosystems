const fs = require("fs");
const {
  shiftCipherDecoder,
  shiftCipherEncoder,
} = require("../../app/shiftCipher");
const { fileNames } = require("../../app/constants/fileNames");

const testShiftCipherEncoder = (test) => {
  let directoryName = __dirname + `/tests/test${test}`;
  shiftCipherEncoder(directoryName);
  return (encodedString = fs.readFileSync(
    directoryName + "/" + fileNames.encrypt,
    "utf8"
  ));
};

const testShiftCipherDecoder = (test) => {
  let directoryName = __dirname + `/tests/test${test}`;
  shiftCipherDecoder(directoryName);
  return (encodedString = fs.readFileSync(
    directoryName + "/" + fileNames.decrypt,
    "utf8"
  ));
};

exports.testShiftCipherEncoder = testShiftCipherEncoder;
exports.testShiftCipherDecoder = testShiftCipherDecoder;
