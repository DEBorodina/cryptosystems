const fs = require("fs");

const { ALPHABET } = require("./constants/alphabet");
const { fileNames } = require("./constants/fileNames");

const fileReader = (directoryName) => {
  let task = {};

  if (!fs.existsSync(directoryName + "/" + fileNames.input))
    throw "no input file";

  if (!fs.existsSync(directoryName + "/" + fileNames.key)) throw "no key file";

  if (fs.existsSync(directoryName + "/" + fileNames.alphabet)) {
    task.alphabet = fs
      .readFileSync(directoryName + "/" + fileNames.alphabet, "utf8")
      .split("");
  } else {
    task.alphabet = ALPHABET;
  }

  task.string = fs
    .readFileSync(directoryName + "/" + fileNames.input, "utf8")
    .split("");

  task.key = fs.readFileSync(directoryName + "/" + fileNames.key, "utf8");
  return task;
};

const fileWriterEncoded = (directoryName, endcodedString) => {
  fs.writeFileSync(directoryName + "/" + fileNames.encrypt, endcodedString);
};

const fileWriterDecoded = (directoryName, decodedString) => {
  fs.writeFileSync(directoryName + "/" + fileNames.decrypt, decodedString);
};

exports.fileReader = fileReader;
exports.fileWriterDecoded = fileWriterDecoded;
exports.fileWriterEncoded = fileWriterEncoded;
