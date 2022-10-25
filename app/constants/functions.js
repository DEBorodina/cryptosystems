const { affineCipherDecoder, affineCipherEncoder } = require("../affineCipher");
const { shiftCipherDecoder, shiftCipherEncoder } = require("../shiftCipher");
const { hillCipherEncoder, hillCipherDecoder } = require("../hillCipher");
const {
  substitutionCipherEncoder,
  substitutionCipherDecoder,
} = require("../substitutionCipher");
const {
  transpositionCipherEncoder,
  transpositionCipherDecoder,
} = require("../transpositionCipher");
const {
  vigenereCipherEncoder,
  vigenereCipherDecoder,
} = require("../vigenereCipher");

functions = {
  shift_encode: shiftCipherEncoder,
  shift_decode: shiftCipherDecoder,

  affine_encode: affineCipherEncoder,
  affine_decode: affineCipherDecoder,

  hill_encode: hillCipherEncoder,
  hill_decode: hillCipherDecoder,

  substitution_encode: substitutionCipherEncoder,
  substitution_decode: substitutionCipherDecoder,

  transition_encode: transpositionCipherEncoder,
  transition_decode: transpositionCipherDecoder,

  vigenere_encode: vigenereCipherEncoder,
  vigenere_decode: vigenereCipherDecoder,
};

exports.functions = functions;
