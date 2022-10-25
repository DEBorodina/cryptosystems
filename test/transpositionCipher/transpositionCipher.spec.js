const assert = require("assert");
const fs = require("fs");
const {
  testTranspositionCipherEncoder,
  testTranspositionCipherDecoder,
} = require("./testHelper");
const { fileNames } = require("../../app/constants/fileNames");
const { ALPHABET } = require("../../app/constants/alphabet");
const { gcd } = require("mathjs");

describe("Transposition cipher:", () => {
  describe("Encoding:", () => {
    it("simple case", () => {
      assert.equal(testTranspositionCipherEncoder(1), "ICPEHR");
    });

    it("no alphabet file", () => {
      assert.equal(testTranspositionCipherEncoder(2), "НЯВДЕРОЕЙУТИОРКВ");
    });

    it("no input file", () => {
      assert.throws(() => testTranspositionCipherEncoder(15), /no input file$/);
    });

    it("no key file", () => {
      assert.throws(() => testTranspositionCipherEncoder(16), /no key file$/);
    });

    it("empty alphabet file", () => {
      assert.throws(
        () => testTranspositionCipherEncoder(3),
        /empty alphabet file$/
      );
    });

    it("not unique symbols at alphabet file", () => {
      assert.throws(
        () => testTranspositionCipherEncoder(4),
        /not unique symbols in alphabet file$/
      );
    });

    it("empty input file", () => {
      assert.throws(
        () => testTranspositionCipherEncoder(5),
        /empty input file$/
      );
    });

    it("not alphabet symbols in input file", () => {
      assert.throws(
        () => testTranspositionCipherEncoder(6),
        /not alphabet symbols in input file$/
      );
    });

    it("empty key file", () => {
      assert.throws(
        () => testTranspositionCipherEncoder(7),
        /key file is empty$/
      );
    });

    it("key is longer than alphabet", () => {
      assert.throws(
        () => testTranspositionCipherEncoder(8),
        /key shouldn't be longer than alphabet$/
      );
    });

    it("not unique symbols in key file", () => {
      assert.throws(
        () => testTranspositionCipherEncoder(9),
        /not unique symbols in key file$/
      );
    });

    it("key contains letters not from the alphabet", () => {
      assert.throws(
        () => testTranspositionCipherEncoder(10),
        /keys should be from alphabet$/
      );
    });
    it("input length is not devided by key value", () => {
      assert.equal(testTranspositionCipherEncoder(11), "TOONDTSRUTOTICVAAAAR");
    });
  });
  describe("Decoding:", () => {
    it("simple case", () => {
      assert.equal(testTranspositionCipherDecoder(12), "НЕДОВЕРЯЙВИКТОРУ");
    });

    it("no alphabet file", () => {
      assert.equal(testTranspositionCipherDecoder(13), "ИРПТЕВРИМ");
    });

    it("no input file", () => {
      assert.throws(() => testTranspositionCipherEncoder(15), /no input file$/);
    });

    it("no key file", () => {
      assert.throws(() => testTranspositionCipherEncoder(16), /no key file$/);
    });

    it("empty alphabet file", () => {
      assert.throws(
        () => testTranspositionCipherDecoder(3),
        /empty alphabet file$/
      );
    });

    it("not unique symbols at alphabet file", () => {
      assert.throws(
        () => testTranspositionCipherDecoder(4),
        /not unique symbols in alphabet file$/
      );
    });

    it("empty input file", () => {
      assert.throws(
        () => testTranspositionCipherDecoder(5),
        /empty input file$/
      );
    });

    it("not alphabet symbols in input file", () => {
      assert.throws(
        () => testTranspositionCipherDecoder(6),
        /not alphabet symbols in input file$/
      );
    });

    it("empty key file", () => {
      assert.throws(
        () => testTranspositionCipherDecoder(7),
        /key file is empty$/
      );
    });

    it("key is longer than alphabet", () => {
      assert.throws(
        () => testTranspositionCipherDecoder(8),
        /key shouldn't be longer than alphabet$/
      );
    });

    it("not unique symbols in key file", () => {
      assert.throws(
        () => testTranspositionCipherDecoder(9),
        /not unique symbols in key file$/
      );
    });

    it("key contains letters not from the alphabet", () => {
      assert.throws(
        () => testTranspositionCipherDecoder(10),
        /keys should be from alphabet$/
      );
    });
    it("input length is not devided by key value", () => {
      assert.throws(
        () => testTranspositionCipherDecoder(14),
        /invalid string length$/
      );
    });
  });

  describe("Random dynamic tests:", () => {
    for (let i = 17; i < 47; i++) {
      it(`random test №${i - 16}`, () => {
        let directoryName = __dirname + `/tests/test${i}`;

        if (!fs.existsSync(directoryName)) fs.mkdirSync(directoryName);

        let input = "";
        for (let i = 0; i < Math.random() * 100; i++) {
          input += ALPHABET[Math.round(Math.random() * (ALPHABET.length - 1))];
        }
        fs.writeFileSync(`${directoryName}/${fileNames.input}`, input);

        let key = "";
        for (let i = 0; i < Math.random() * 20; i++) {
          key += ALPHABET[Math.round(Math.random() * (ALPHABET.length - 1))];
        }

        fs.writeFileSync(`${directoryName}/${fileNames.key}`, key);

        if (key.length != new Set(key.split("")).size) {
          assert.throws(
            () => testTranspositionCipherEncoder(i),
            /not unique symbols in key file$/
          );
        } else {
          output = testTranspositionCipherEncoder(i);
          fs.writeFileSync(`${directoryName}/${fileNames.input}`, output);
          assert.equal(
            input,
            testTranspositionCipherDecoder(i).slice(0, input.length)
          );
        }
      });
    }
  });
});
