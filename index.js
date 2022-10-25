const inquirer = require("inquirer");

const { functions } = require("./app/constants/functions");

let directory = __dirname + "/files";

let choice = { operation: "", cipher: "" };

inquirer
  .prompt([
    {
      type: "list",
      name: "operation",
      message: "Do u want to encode or decode?",
      choices: ["encode", "decode"],
    },
  ])
  .then((answers) => {
    choice.operation = answers.operation;
    inquirer
      .prompt([
        {
          type: "list",
          name: "cipher",
          message: "Which cipher would you like to use?",
          choices: [
            "affine",
            "Hill",
            "shift",
            "substitution",
            "transposition",
            "Vigenere",
          ],
        },
      ])
      .then((answers) => {
        choice.cipher = answers.cipher;
        try {
          switch (choice.operation) {
            case "encode":
              switch (choice.cipher) {
                case "affine":
                  functions.affine_encode(directory);
                  break;
                case "Hill":
                  functions.hill_encode(directory);
                  break;
                case "shift":
                  functions.shift_encode(directory);
                  break;
                case "substitution":
                  functions.substitution_encode(directory);
                  break;
                case "transposition":
                  functions.transposition_encode(directory);
                  break;
                case "Vigenere":
                  functions.vigenere_encode(directory);
                  break;
              }
              break;
            case "decode":
              switch (choice.cipher) {
                case "affine":
                  functions.affine_decode(directory);
                  break;
                case "Hill":
                  functions.hill_decode(directory);
                  break;
                case "shift":
                  functions.shift_decode(directory);
                  break;
                case "substitution":
                  functions.substitution_decode(directory);
                  break;
                case "transposition":
                  functions.transposition_decode(directory);
                  break;
                case "Vigenere":
                  functions.vigenere_decode(directory);
                  break;
              }
              break;
          }
          console.log("finished successfully");
        } catch (e) {
          console.error(e);
        }
      });
  });
