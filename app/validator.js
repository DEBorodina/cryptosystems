const { gcd, det } = require("mathjs");
0;
const checkAlphabet = (alphabet) => {
  if (alphabet.length === 0) throw "empty alphabet file";
  if (alphabet.length != new Set(alphabet).size)
    throw "not unique symbols in alphabet file";
};

const checkString = (alphabet, string) => {
  if (string.length === 0) throw "empty input file";
  string.forEach((letter) => {
    if (alphabet.indexOf(letter) === -1)
      throw "not alphabet symbols in input file";
  });
};

const checkStringHillCipherDecode = (alphabet, string) => {
  checkString(alphabet, string);
  if (string.length % 2 !== 0)
    throw "string encoded by hill cipher can't be of odd length";
};

const checkStringTranspositionCipherDecoder = (alphabet, string, key) => {
  checkString(alphabet, string);
  if (string.length % key.length != 0) throw "invalid string length";
};

const checkKeyShiftCipher = (alphabet, key) => {
  if (!key) throw "key file is empty";
  if (key.length > 1) throw "key should be one symbol";
  if (!alphabet.includes(key)) throw "key is not from the alphabet";
};

const checkKeyVigenereCipher = (alphabet, key) => {
  if (key.length === 0) throw "key file is empty";
  key.forEach((k) => {
    if (!alphabet.includes(k)) {
      throw "key contains symbols not from the alphabet";
    }
  });
};

const checkKeyAffineCipher = (alphabet, key) => {
  if (!key) throw "key file is empty";
  if (key.length != 2) throw "key should be 2 symbols";
  const [key1, key2] = key.split("");
  if (!alphabet.includes(key1)) throw "key № 1 is not from the alphabet";
  if (!alphabet.includes(key2)) throw "key № 2 is not from the alphabet";
  if (gcd(alphabet.indexOf(key1), alphabet.length) != 1)
    throw "key № 1 and cardinality of the alphabet are not coprime";
};

const checkKeySubstitutionCipher = (alphabet, key) => {
  if (key.length === 0) throw "key file is empty";
  if (key.length != alphabet.length)
    throw "key should be the same length as the alphabet";
  key.forEach((letter) => {
    if (!alphabet.includes(letter))
      throw "key should contain only letters from the alphabet";
  });
  alphabet.forEach((letter) => {
    if (!key.includes(letter))
      throw "key should contain all letters from the alphabet";
  });
};

const checkKeyHillCipher = (alphabet, key) => {
  if (!key) throw "key file is empty";

  if (key.length != 4) throw "key should be 4 symbols";

  key = key.split("");
  key.forEach((letter) => {
    if (!alphabet.includes(letter)) throw "keys should be from alphabet";
  });
  key = [
    [alphabet.indexOf(key[0]), alphabet.indexOf(key[1])],
    [alphabet.indexOf(key[2]), alphabet.indexOf(key[3])],
  ];

  if (gcd(det(key), alphabet.length) !== 1)
    throw "determinate of the key should be coprime with the alphabet length";
};

const checkKeyTranspositionCipher = (alphabet, key) => {
  if (key.length === 0) throw "key file is empty";

  if (key.length > alphabet.length)
    throw "key shouldn't be longer than alphabet";

  if (key.length != new Set(key).size) throw "not unique symbols in key file";

  key.forEach((letter) => {
    if (!alphabet.includes(letter)) throw "keys should be from alphabet";
  });
};

const validateTranspositionCipherEncoder = (alphabet, string, key) => {
  checkAlphabet(alphabet);
  checkString(alphabet, string);
  checkKeyTranspositionCipher(alphabet, key);
};

const validateTranspositionCipherDecoder = (alphabet, string, key) => {
  checkAlphabet(alphabet);
  checkKeyTranspositionCipher(alphabet, key);
  checkStringTranspositionCipherDecoder(alphabet, string, key);
};

const validateSubstitutionCipher = (alphabet, string, key) => {
  checkAlphabet(alphabet);
  checkString(alphabet, string);
  checkKeySubstitutionCipher(alphabet, key);
};

const validateShiftCipher = (alphabet, string, key) => {
  checkAlphabet(alphabet);
  checkString(alphabet, string);
  checkKeyShiftCipher(alphabet, key);
};

const validateVigenereCipher = (alphabet, string, key) => {
  checkAlphabet(alphabet);
  checkString(alphabet, string);
  checkKeyVigenereCipher(alphabet, key);
};

const validateAffineCipher = (alphabet, string, key) => {
  checkAlphabet(alphabet);
  checkString(alphabet, string);
  checkKeyAffineCipher(alphabet, key);
};

const validateHillCipherEncoder = (alphabet, string, key) => {
  checkAlphabet(alphabet);
  checkString(alphabet, string);
  checkKeyHillCipher(alphabet, key);
};

const validateHillCipherDecoder = (alphabet, string, key) => {
  checkAlphabet(alphabet);
  checkStringHillCipherDecode(alphabet, string);
  checkKeyHillCipher(alphabet, key);
};

exports.validateShiftCipher = validateShiftCipher;
exports.validateAffineCipher = validateAffineCipher;
exports.validateSubstitutionCipher = validateSubstitutionCipher;
exports.validateHillCipherEncoder = validateHillCipherEncoder;
exports.validateHillCipherDecoder = validateHillCipherDecoder;
exports.validateTranspositionCipherDecoder = validateTranspositionCipherDecoder;
exports.validateTranspositionCipherEncoder = validateTranspositionCipherEncoder;
exports.validateVigenereCipher = validateVigenereCipher;
