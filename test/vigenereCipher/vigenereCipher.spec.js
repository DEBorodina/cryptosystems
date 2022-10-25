const assert = require("assert");
const fs = require("fs");
const {
  testVigenereCipherEncoder,
  testVigenereCipherDecoder,
} = require("./testHelper");
const { fileNames } = require("../../app/constants/fileNames");
const { ALPHABET } = require("../../app/constants/alphabet");
const { gcd } = require("mathjs");

describe("Vigenere cipher:", () => {
  describe("Encoding:", () => {
    it("simple case", () => {
      assert.equal(testVigenereCipherEncoder(1), "CMRPBAFVGL");
    });

    it("no alphabet file", () => {
      assert.equal(testVigenereCipherEncoder(2), "ЦЩЗПДЩНУИМЩКЦ");
    });

    it("no input file", () => {
      assert.throws(() => testVigenereCipherEncoder(11), /no input file$/);
    });

    it("no key file", () => {
      assert.throws(() => testVigenereCipherEncoder(12), /no key file$/);
    });

    it("empty alphabet file", () => {
      assert.throws(() => testVigenereCipherEncoder(3), /empty alphabet file$/);
    });

    it("not unique symbols at alphabet file", () => {
      assert.throws(
        () => testVigenereCipherEncoder(4),
        /not unique symbols in alphabet file$/
      );
    });

    it("empty input file", () => {
      assert.throws(() => testVigenereCipherEncoder(5), /empty input file$/);
    });

    it("not alphabet symbols in input file", () => {
      assert.throws(
        () => testVigenereCipherEncoder(6),
        /not alphabet symbols in input file$/
      );
    });

    it("empty key file", () => {
      assert.throws(() => testVigenereCipherEncoder(7), /key file is empty$/);
    });

    it("key contains symbols not from the alphabet", () => {
      assert.throws(
        () => testVigenereCipherEncoder(8),
        /key contains symbols not from the alphabet$/
      );
    });
  });

  describe("Decoding:", () => {
    it("simple case", () => {
      assert.equal(testVigenereCipherDecoder(9), "HELLOWORLD");
    });

    it("no alphabet file", () => {
      assert.equal(testVigenereCipherDecoder(10), "НЕДОВЕРЯЙВИКТОРУ");
    });

    it("no input file", () => {
      assert.throws(() => testVigenereCipherDecoder(11), /no input file$/);
    });

    it("no key file", () => {
      assert.throws(() => testVigenereCipherDecoder(12), /no key file$/);
    });

    it("empty alphabet file", () => {
      assert.throws(() => testVigenereCipherDecoder(3), /empty alphabet file$/);
    });

    it("not unique symbols at alphabet file", () => {
      assert.throws(
        () => testVigenereCipherDecoder(4),
        /not unique symbols in alphabet file$/
      );
    });

    it("empty input file", () => {
      assert.throws(() => testVigenereCipherDecoder(5), /empty input file$/);
    });

    it("not alphabet symbols in input file", () => {
      assert.throws(
        () => testVigenereCipherDecoder(6),
        /not alphabet symbols in input file$/
      );
    });

    it("empty key file", () => {
      assert.throws(() => testVigenereCipherDecoder(7), /key file is empty$/);
    });

    it("key contains symbols not from the alphabet", () => {
      assert.throws(
        () => testVigenereCipherDecoder(8),
        /key contains symbols not from the alphabet$/
      );
    });
  });
  describe("Random dynamic tests:", () => {
    for (let i = 13; i < 43; i++) {
      it(`random test №${i - 12}`, () => {
        let directoryName = __dirname + `/tests/test${i}`;

        if (!fs.existsSync(directoryName)) fs.mkdirSync(directoryName);

        let input = "";
        for (let i = 0; i < Math.random() * 100; i++) {
          input += ALPHABET[Math.round(Math.random() * (ALPHABET.length - 1))];
        }
        fs.writeFileSync(`${directoryName}/${fileNames.input}`, input);

        let key = "";
        for (let i = 0; i < Math.random() * 100; i++) {
          key += ALPHABET[Math.round(Math.random() * (ALPHABET.length - 1))];
        }
        fs.writeFileSync(`${directoryName}/${fileNames.key}`, key);

        output = testVigenereCipherEncoder(i);
        fs.writeFileSync(`${directoryName}/${fileNames.input}`, output);

        assert.equal(input, testVigenereCipherDecoder(i));
      });
    }
  });
});
