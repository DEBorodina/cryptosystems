const assert = require("assert");
const fs = require("fs");
const {
  testShiftCipherEncoder,
  testShiftCipherDecoder,
} = require("./testHelper");
const { fileNames } = require("../../app/constants/fileNames");
const { ALPHABET } = require("../../app/constants/alphabet");

describe("Shift cipher:", () => {
  describe("Encoding:", () => {
    it("simple case", () => {
      assert.equal(testShiftCipherEncoder(1), "WTAADLDGAS");
    });
    it("no alphabet file", () => {
      assert.equal(testShiftCipherEncoder(2), "ЖЗАЪЭЙЧДАЗ");
    });
    it("no input file", () => {
      assert.throws(() => testShiftCipherEncoder(19), /no input file$/);
    });
    it("no key file", () => {
      assert.throws(() => testShiftCipherEncoder(20), /no key file$/);
    });
    it("empty alphabet file", () => {
      assert.throws(() => testShiftCipherEncoder(3), /empty alphabet file$/);
    });
    it("not unique symbols at alphabet file", () => {
      assert.throws(
        () => testShiftCipherEncoder(4),
        /not unique symbols in alphabet file$/
      );
    });
    it("empty input file", () => {
      assert.throws(() => testShiftCipherEncoder(5), /empty input file$/);
    });
    it("not alphabet symbols in input file", () => {
      assert.throws(
        () => testShiftCipherEncoder(6),
        /not alphabet symbols in input file$/
      );
    });
    it("empty key file", () => {
      assert.throws(() => testShiftCipherEncoder(7), /key file is empty$/);
    });
    it("shift cipher key is more than one symbol", () => {
      assert.throws(
        () => testShiftCipherEncoder(8),
        /key should be one symbol$/
      );
    });
    it("shift cipher key is not from the alphabet", () => {
      assert.throws(
        () => testShiftCipherEncoder(9),
        /key is not from the alphabet$/
      );
    });
  });

  describe("Decoding:", () => {
    it("simple case", () => {
      assert.equal(testShiftCipherDecoder(10), "HELLOWORLD");
    });
    it("no alphabet file", () => {
      assert.equal(testShiftCipherDecoder(11), "ПРИВЕТ МИР");
    });
    it("no input file", () => {
      assert.throws(() => testShiftCipherDecoder(19), /no input file$/);
    });
    it("no key file", () => {
      assert.throws(() => testShiftCipherDecoder(20), /no key file$/);
    });
    it("empty alphabet file", () => {
      assert.throws(() => testShiftCipherDecoder(12), /empty alphabet file$/);
    });
    it("not unique symbols at alphabet file", () => {
      assert.throws(
        () => testShiftCipherDecoder(13),
        /not unique symbols in alphabet file$/
      );
    });
    it("empty input file", () => {
      assert.throws(() => testShiftCipherDecoder(14), /empty input file$/);
    });
    it("not alphabet symbols in input file", () => {
      assert.throws(
        () => testShiftCipherDecoder(15),
        /not alphabet symbols in input file$/
      );
    });
    it("empty key file", () => {
      assert.throws(() => testShiftCipherDecoder(16), /key file is empty$/);
    });
    it("shift cipher key is more than one symbol", () => {
      assert.throws(
        () => testShiftCipherDecoder(17),
        /key should be one symbol$/
      );
    });
    it("shift cipher key is not from the alphabet", () => {
      assert.throws(
        () => testShiftCipherDecoder(18),
        /key is not from the alphabet$/
      );
    });
  });

  describe("Random dynamic tests:", () => {
    for (let i = 21; i < 51; i++) {
      it(`random test № ${i - 20}`, () => {
        let directoryName = __dirname + `/tests/test${i}`;

        if (!fs.existsSync(directoryName)) fs.mkdirSync(directoryName);

        let input = "";
        for (let i = 0; i < Math.random() * 100; i++) {
          input += ALPHABET[Math.round(Math.random() * (ALPHABET.length - 1))];
        }
        fs.writeFileSync(`${directoryName}/${fileNames.input}`, input);

        let key = ALPHABET[Math.round(Math.random() * (ALPHABET.length - 1))];
        fs.writeFileSync(`${directoryName}/${fileNames.key}`, key);

        output = testShiftCipherEncoder(i);
        fs.writeFileSync(`${directoryName}/${fileNames.input}`, output);

        assert.equal(input, testShiftCipherDecoder(i));
      });
    }
  });
});
