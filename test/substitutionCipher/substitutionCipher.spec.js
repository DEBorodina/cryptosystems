const assert = require("assert");
const fs = require("fs");
const {
  testSubstitutionCipherEncoder,
  testSubstitutionCipherDecoder,
} = require("./testHelper");
const { fileNames } = require("../../app/constants/fileNames");
const { ALPHABET } = require("../../app/constants/alphabet");
const { gcd } = require("mathjs");

describe("Substitution cipher:", () => {
  describe("Encoding:", () => {
    it("simple case", () => {
      assert.equal(testSubstitutionCipherEncoder(1), "QTKKWAWHKE");
    });

    it("no alphabet file", () => {
      assert.equal(testSubstitutionCipherEncoder(2), "ЪЮУЬВДЯОУЮ");
    });

    it("no input file", () => {
      assert.throws(() => testSubstitutionCipherEncoder(13), /no input file$/);
    });

    it("no key file", () => {
      assert.throws(() => testSubstitutionCipherEncoder(14), /no key file$/);
    });

    it("empty alphabet file", () => {
      assert.throws(
        () => testSubstitutionCipherEncoder(3),
        /empty alphabet file$/
      );
    });

    it("not unique symbols at alphabet file", () => {
      assert.throws(
        () => testSubstitutionCipherEncoder(4),
        /not unique symbols in alphabet file$/
      );
    });

    it("empty input file", () => {
      assert.throws(
        () => testSubstitutionCipherEncoder(5),
        /empty input file$/
      );
    });

    it("not alphabet symbols in input file", () => {
      assert.throws(
        () => testSubstitutionCipherEncoder(6),
        /not alphabet symbols in input file$/
      );
    });

    it("empty key file", () => {
      assert.throws(
        () => testSubstitutionCipherEncoder(7),
        /key file is empty$/
      );
    });

    it("key is not the sane length with alphabet", () => {
      assert.throws(
        () => testSubstitutionCipherEncoder(8),
        /key should be the same length as the alphabet$/
      );
    });

    it("key contains letters not from the alphabet", () => {
      assert.throws(
        () => testSubstitutionCipherEncoder(9),
        /key should contain only letters from the alphabet$/
      );
    });

    it("key doesn't contain all letters from the alphabet", () => {
      assert.throws(
        () => testSubstitutionCipherEncoder(10),
        /key should contain all letters from the alphabet$/
      );
    });
  });

  describe("Decoding:", () => {
    it("simple case", () => {
      assert.equal(testSubstitutionCipherDecoder(11), "HELLO");
    });

    it("no alphabet file", () => {
      assert.equal(testSubstitutionCipherDecoder(12), "ПРИВЕТ");
    });

    it("no input file", () => {
      assert.throws(() => testSubstitutionCipherEncoder(13), /no input file$/);
    });

    it("no key file", () => {
      assert.throws(() => testSubstitutionCipherEncoder(14), /no key file$/);
    });

    it("empty alphabet file", () => {
      assert.throws(
        () => testSubstitutionCipherDecoder(3),
        /empty alphabet file$/
      );
    });

    it("not unique symbols at alphabet file", () => {
      assert.throws(
        () => testSubstitutionCipherDecoder(4),
        /not unique symbols in alphabet file$/
      );
    });

    it("empty input file", () => {
      assert.throws(
        () => testSubstitutionCipherDecoder(5),
        /empty input file$/
      );
    });

    it("not alphabet symbols in input file", () => {
      assert.throws(
        () => testSubstitutionCipherDecoder(6),
        /not alphabet symbols in input file$/
      );
    });

    it("empty key file", () => {
      assert.throws(
        () => testSubstitutionCipherDecoder(7),
        /key file is empty$/
      );
    });

    it("key is not the sane length with alphabet", () => {
      assert.throws(
        () => testSubstitutionCipherDecoder(8),
        /key should be the same length as the alphabet$/
      );
    });

    it("key contains letters not from the alphabet", () => {
      assert.throws(
        () => testSubstitutionCipherDecoder(9),
        /key should contain only letters from the alphabet$/
      );
    });

    it("key doesn't contain all letters from the alphabet", () => {
      assert.throws(
        () => testSubstitutionCipherDecoder(10),
        /key should contain all letters from the alphabet$/
      );
    });
  });
  describe("Random dynamic tests:", () => {
    for (let i = 15; i < 45; i++) {
      it(`random test №${i - 14}`, () => {
        let directoryName = __dirname + `/tests/test${i}`;

        if (!fs.existsSync(directoryName)) fs.mkdirSync(directoryName);

        let input = "";
        for (let i = 0; i < Math.random() * 100; i++) {
          input += ALPHABET[Math.round(Math.random() * (ALPHABET.length - 1))];
        }
        fs.writeFileSync(`${directoryName}/${fileNames.input}`, input);

        let key = [...ALPHABET];
        key.sort(() => Math.random() - 0.5);
        fs.writeFileSync(`${directoryName}/${fileNames.key}`, key.join(""));

        output = testSubstitutionCipherEncoder(i);
        fs.writeFileSync(`${directoryName}/${fileNames.input}`, output);

        assert.equal(input, testSubstitutionCipherDecoder(i));
      });
    }
  });
});
