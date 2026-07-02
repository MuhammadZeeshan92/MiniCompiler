// Types of tokens our language supports
const TokenType = {
  NUMBER: "NUMBER",
  IDENTIFIER: "IDENTIFIER",

  ASSIGN: "ASSIGN",
  SEMICOLON: "SEMICOLON",

  PLUS: "PLUS",
  MINUS: "MINUS",
  MULTIPLY: "MULTIPLY",
  DIVIDE: "DIVIDE",

  LPAREN: "LPAREN",
  RPAREN: "RPAREN",

  EOF: "EOF",
};

class Token {
  constructor(type, value) {
    this.type = type;
    this.value = value;
  }
}

module.exports = {
  Token,
  TokenType,
};