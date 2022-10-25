const { fileReader, fileWriterEncoded, fileWriterDecoded } = require("./file");
const {
  validateHillCipherEncoder,
  validateHillCipherDecoder,
} = require("./validator");
const { multiply, mod, invmod, det } = require("mathjs");

const encodeAlgorithm = (alphabet, stringToEncode, key) => {
  if (stringToEncode.length % 2 != 0) {
    stringToEncode.push(alphabet[0]);
  }

  let blocks = [];

  for (let i = 0; i < stringToEncode.length; i += 2) {
    blocks[i / 2] = [
      alphabet.indexOf(stringToEncode[i]),
      alphabet.indexOf(stringToEncode[i + 1]),
    ];
  }

  return blocks.reduce((str, block) => {
    let newVector = multiply(block, key);
    return (
      str +
      alphabet[mod(newVector[0], alphabet.length)] +
      alphabet[mod(newVector[1], alphabet.length)]
    );
  }, "");
};

const decodeAlgorithm = (alphabet, stringToEncode, key) => {
  m = alphabet.length;

  let detKey = det(key);
  detKey = invmod(detKey, m);

  [key[0][0], key[1][1]] = [key[1][1], key[0][0]];
  key[1][0] = -key[1][0];
  key[0][1] = -key[0][1];
  key = multiply(detKey, key);

  key[0][0] = mod(key[0][0], m);
  key[1][0] = mod(key[1][0], m);
  key[0][1] = mod(key[0][1], m);
  key[1][1] = mod(key[1][1], m);

  let blocks = [];

  for (let i = 0; i < stringToEncode.length; i += 2) {
    blocks[i / 2] = [
      alphabet.indexOf(stringToEncode[i]),
      alphabet.indexOf(stringToEncode[i + 1]),
    ];
  }

  let s = blocks.reduce((str, block) => {
    let newVector = multiply(block, key);
    return (
      str + alphabet[mod(newVector[0], m)] + alphabet[mod(newVector[1], m)]
    );
  }, "");
  return s;
};

const hillCipherEncoder = (directoryName) => {
  let { alphabet, key, string } = fileReader(directoryName);

  validateHillCipherEncoder(alphabet, string, key);

  key = key.split("");

  key = [
    [alphabet.indexOf(key[0]), alphabet.indexOf(key[1])],
    [alphabet.indexOf(key[2]), alphabet.indexOf(key[3])],
  ];

  endcodedString = encodeAlgorithm(alphabet, string, key);

  fileWriterEncoded(directoryName, endcodedString);
};

const hillCipherDecoder = (directoryName) => {
  let { alphabet, key, string } = fileReader(directoryName);

  validateHillCipherDecoder(alphabet, string, key);

  key = key.split("");

  key = [
    [alphabet.indexOf(key[0]), alphabet.indexOf(key[1])],
    [alphabet.indexOf(key[2]), alphabet.indexOf(key[3])],
  ];

  decodedString = decodeAlgorithm(alphabet, string, key);

  fileWriterDecoded(directoryName, decodedString);
};

exports.hillCipherEncoder = hillCipherEncoder;
exports.hillCipherDecoder = hillCipherDecoder;
