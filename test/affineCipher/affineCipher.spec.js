const assert = require("assert");
const fs = require("fs");
const {
  testAffineCipherEncoder,
  testAffineCipherDecoder,
} = require("./testHelper");
const { fileNames } = require("../../app/constants/fileNames");
const { ALPHABET } = require("../../app/constants/alphabet");
const { gcd } = require("mathjs");

describe("Affine cipher:", () => {
  describe("Encoding:", () => {
    it("simple case", () => {
      assert.equal(testAffineCipherEncoder(1), "ELMMFVFYMW");
    });

    it("no alphabet file", () => {
      assert.equal(testAffineCipherEncoder(2), "МДЗГЙУЭЁЗД");
    });

    it("no input file", () => {
      assert.throws(() => testAffineCipherEncoder(15), /no input file$/);
    });

    it("no key file", () => {
      assert.throws(() => testAffineCipherEncoder(14), /no key file$/);
    });

    it("empty alphabet file", () => {
      assert.throws(() => testAffineCipherEncoder(3), /empty alphabet file$/);
    });

    it("not unique symbols at alphabet file", () => {
      assert.throws(
        () => testAffineCipherEncoder(4),
        /not unique symbols in alphabet file$/
      );
    });

    it("empty input file", () => {
      assert.throws(() => testAffineCipherEncoder(5), /empty input file$/);
    });

    it("not alphabet symbols in input file", () => {
      assert.throws(
        () => testAffineCipherEncoder(6),
        /not alphabet symbols in input file$/
      );
    });

    it("empty key file", () => {
      assert.throws(() => testAffineCipherEncoder(7), /key file is empty$/);
    });

    it("not 2 symbols at key file", () => {
      assert.throws(
        () => testAffineCipherEncoder(8),
        /key should be 2 symbols$/
      );
    });

    it("key № 1 is not from the alphabet", () => {
      assert.throws(
        () => testAffineCipherEncoder(9),
        /key № 1 is not from the alphabet$/
      );
    });

    it("key № 2 is not from the alphabet", () => {
      assert.throws(
        () => testAffineCipherEncoder(10),
        /key № 2 is not from the alphabet$/
      );
    });

    it("key № 1 and cardinality of the alphabet are not coprime", () => {
      assert.throws(
        () => testAffineCipherEncoder(11),
        /key № 1 and cardinality of the alphabet are not coprime$/
      );
    });
  });

  describe("Decoding:", () => {
    it("simple case", () => {
      assert.equal(testAffineCipherDecoder(12), "HELLO");
    });

    it("no alphabet file", () => {
      assert.equal(testAffineCipherDecoder(13), "ПРИВЕТ");
    });

    it("no input file", () => {
      assert.throws(() => testAffineCipherDecoder(15), /no input file$/);
    });

    it("no key file", () => {
      assert.throws(() => testAffineCipherDecoder(14), /no key file$/);
    });

    it("empty alphabet file", () => {
      assert.throws(() => testAffineCipherDecoder(3), /empty alphabet file$/);
    });

    it("not unique symbols at alphabet file", () => {
      assert.throws(
        () => testAffineCipherDecoder(4),
        /not unique symbols in alphabet file$/
      );
    });

    it("empty input file", () => {
      assert.throws(() => testAffineCipherDecoder(5), /empty input file$/);
    });

    it("not alphabet symbols in input file", () => {
      assert.throws(
        () => testAffineCipherDecoder(6),
        /not alphabet symbols in input file$/
      );
    });

    it("empty key file", () => {
      assert.throws(() => testAffineCipherDecoder(7), /key file is empty$/);
    });

    it("not 2 symbols at key file", () => {
      assert.throws(
        () => testAffineCipherDecoder(8),
        /key should be 2 symbols$/
      );
    });

    it("key № 1 is not from the alphabet", () => {
      assert.throws(
        () => testAffineCipherDecoder(9),
        /key № 1 is not from the alphabet$/
      );
    });

    it("key № 2 is not from the alphabet", () => {
      assert.throws(
        () => testAffineCipherDecoder(10),
        /key № 2 is not from the alphabet$/
      );
    });

    it("key № 1 and cardinality of the alphabet are not coprime", () => {
      assert.throws(
        () => testAffineCipherDecoder(11),
        /key № 1 and cardinality of the alphabet are not coprime$/
      );
    });
  });
  describe("Random dynamic tests:", () => {
    for (let i = 16; i < 46; i++) {
      it(`random test №${i - 15}`, () => {
        let directoryName = __dirname + `/tests/test${i}`;

        if (!fs.existsSync(directoryName)) fs.mkdirSync(directoryName);

        let input = "";
        for (let i = 0; i < Math.random() * 100; i++) {
          input += ALPHABET[Math.round(Math.random() * (ALPHABET.length - 1))];
        }
        fs.writeFileSync(`${directoryName}/${fileNames.input}`, input);

        let key1 = Math.round(Math.random() * (ALPHABET.length - 2) + 1);
        let key2 = Math.round(Math.random() * (ALPHABET.length - 1));
        fs.writeFileSync(
          `${directoryName}/${fileNames.key}`,
          ALPHABET[key1] + ALPHABET[key2]
        );

        if (gcd(key1, ALPHABET.length) != 1) {
          assert.throws(
            () => testAffineCipherEncoder(i),
            /key № 1 and cardinality of the alphabet are not coprime$/
          );
        } else {
          output = testAffineCipherEncoder(i);
          fs.writeFileSync(`${directoryName}/${fileNames.input}`, output);

          assert.equal(input, testAffineCipherDecoder(i));
        }
      });
    }
  });
});
