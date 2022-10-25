const assert = require("assert");
const fs = require("fs");
const {
  testHillCipherEncoder,
  testHillCipherDecoder,
} = require("./testHelper");
const { fileNames } = require("../../app/constants/fileNames");
const { ALPHABET } = require("../../app/constants/alphabet");
const { gcd, mod, det } = require("mathjs");

describe("Hill cipher:", () => {
  describe("Encoding:", () => {
    it("simple case", () => {
      assert.equal(testHillCipherEncoder(1), "МЩЯМОР");
    });

    it("odd length of input", () => {
      assert.equal(testHillCipherEncoder(14), "ХЬЪДУИАЬШВЫЧВГЬПЬЗУХШБЖЬЬЧ");
    });

    it("no alphabet file", () => {
      assert.equal(testHillCipherEncoder(2), "ЁЕКАБГЬРЮЦ");
    });

    it("no input file", () => {
      assert.throws(() => testHillCipherEncoder(15), /no input file$/);
    });

    it("no key file", () => {
      assert.throws(() => testHillCipherEncoder(16), /no key file$/);
    });

    it("empty alphabet file", () => {
      assert.throws(() => testHillCipherEncoder(3), /empty alphabet file$/);
    });

    it("not unique symbols at alphabet file", () => {
      assert.throws(
        () => testHillCipherEncoder(4),
        /not unique symbols in alphabet file$/
      );
    });

    it("empty input file", () => {
      assert.throws(() => testHillCipherEncoder(5), /empty input file$/);
    });

    it("not alphabet symbols in input file", () => {
      assert.throws(
        () => testHillCipherEncoder(6),
        /not alphabet symbols in input file$/
      );
    });

    it("empty key file", () => {
      assert.throws(() => testHillCipherEncoder(7), /key file is empty$/);
    });

    it("not 4 symbols at key file", () => {
      assert.throws(() => testHillCipherEncoder(8), /key should be 4 symbols$/);
    });

    it("key is not from the alphabet", () => {
      assert.throws(
        () => testHillCipherEncoder(9),
        /keys should be from alphabet$/
      );
    });

    it("determinate of the key isn't coprime with the alphabet length", () => {
      assert.throws(
        () => testHillCipherEncoder(10),
        /determinate of the key should be coprime with the alphabet length$/
      );
    });
  });

  describe("Decoding:", () => {
    it("simple case", () => {
      assert.equal(testHillCipherDecoder(11), "HELLOWORLD");
    });

    it("no alphabet file", () => {
      assert.equal(testHillCipherDecoder(12), "ПРИВЕТ МИР");
    });

    it("no input file", () => {
      assert.throws(() => testHillCipherDecoder(15), /no input file$/);
    });

    it("no key file", () => {
      assert.throws(() => testHillCipherDecoder(16), /no key file$/);
    });

    it("empty alphabet file", () => {
      assert.throws(() => testHillCipherDecoder(3), /empty alphabet file$/);
    });

    it("not unique symbols at alphabet file", () => {
      assert.throws(
        () => testHillCipherDecoder(4),
        /not unique symbols in alphabet file$/
      );
    });

    it("empty input file", () => {
      assert.throws(() => testHillCipherDecoder(5), /empty input file$/);
    });

    it("not alphabet symbols in input file", () => {
      assert.throws(
        () => testHillCipherDecoder(6),
        /not alphabet symbols in input file$/
      );
    });

    it("empty key file", () => {
      assert.throws(() => testHillCipherDecoder(7), /key file is empty$/);
    });

    it("not 4 symbols at key file", () => {
      assert.throws(() => testHillCipherDecoder(8), /key should be 4 symbols$/);
    });

    it("key is not from the alphabet", () => {
      assert.throws(
        () => testHillCipherDecoder(9),
        /keys should be from alphabet$/
      );
    });

    it("determinate of the key isn't coprime with the alphabet length", () => {
      assert.throws(
        () => testHillCipherDecoder(10),
        /determinate of the key should be coprime with the alphabet length$/
      );
    });

    it("string encoded by hill cipher is of odd length", () => {
      assert.throws(
        () => testHillCipherDecoder(13),
        /string encoded by hill cipher can't be of odd length$/
      );
    });
  });

  describe("Random dynamic tests:", () => {
    for (let i = 17; i < 47; i++) {
      it(`random test №${i - 16}`, () => {
        let directoryName = __dirname + `/tests/test${i}`;

        if (!fs.existsSync(directoryName)) fs.mkdirSync(directoryName);

        let input = "";
        for (let i = 0; i < Math.random() * 100 + 1; i++) {
          input += ALPHABET[Math.round(Math.random() * (ALPHABET.length - 1))];
        }
        fs.writeFileSync(`${directoryName}/${fileNames.input}`, input);

        let key1 = Math.round(Math.random() * (ALPHABET.length - 1));
        let key2 = Math.round(Math.random() * (ALPHABET.length - 1));
        let key3 = Math.round(Math.random() * (ALPHABET.length - 1));
        let key4 = Math.round(Math.random() * (ALPHABET.length - 1));

        let key = [
          [key1, key2],
          [key3, key4],
        ];

        fs.writeFileSync(
          `${directoryName}/${fileNames.key}`,
          ALPHABET[key1] + ALPHABET[key2] + ALPHABET[key3] + ALPHABET[key4]
        );
        if (gcd(det(key), ALPHABET.length) !== 1) {
          assert.throws(
            () => testHillCipherEncoder(i),
            /determinate of the key should be coprime with the alphabet length$/
          );
        } else {
          output = testHillCipherEncoder(i);
          fs.writeFileSync(`${directoryName}/${fileNames.input}`, output);
          if (input.length % 2 === 0) {
            assert.equal(input, testHillCipherDecoder(i));
          } else {
            assert.equal(input + ALPHABET[0], testHillCipherDecoder(i));
          }
        }
      });
    }
  });
});
