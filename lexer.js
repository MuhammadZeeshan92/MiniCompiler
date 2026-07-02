const { Token, TokenType } = require("./token");

class Lexer {

    constructor(input) {

        this.input = input;
        this.position = 0;
        this.currentChar = input[0] || null;

    }

    advance() {

        this.position++;

        if (this.position < this.input.length) {

            this.currentChar = this.input[this.position];

        } else {

            this.currentChar = null;

        }

    }

    skipWhitespace() {

        while (this.currentChar !== null && /\s/.test(this.currentChar)) {

            this.advance();

        }

    }

    readNumber() {

        let number = "";

        while (this.currentChar !== null && /[0-9]/.test(this.currentChar)) {

            number += this.currentChar;

            this.advance();

        }

        return new Token(TokenType.NUMBER, Number(number));

    }

    readIdentifier() {

        let identifier = "";

        // First character
        if (this.currentChar !== null && /[a-zA-Z_]/.test(this.currentChar)) {

            identifier += this.currentChar;
            this.advance();

        }

        // Remaining characters
        while (
            this.currentChar !== null &&
            /[a-zA-Z0-9_]/.test(this.currentChar)
        ) {

            identifier += this.currentChar;
            this.advance();

        }

        return new Token(TokenType.IDENTIFIER, identifier);

    }

    tokenize() {
        const tokens = [];

        while (this.currentChar !== null) {

            // Ignore spaces
            if (/\s/.test(this.currentChar)) {
                this.skipWhitespace();
                continue;
            }

            // Numbers
            if (/[0-9]/.test(this.currentChar)) {
                tokens.push(this.readNumber());
                continue;
            }

            // Identifiers
            if (/[a-zA-Z_]/.test(this.currentChar)) {
                tokens.push(this.readIdentifier());
                continue;
            }

            // Operators and Symbols
            switch (this.currentChar) {
                case '=':
                    tokens.push(new Token(TokenType.ASSIGN, '='));
                    break;

                case '+':
                    tokens.push(new Token(TokenType.PLUS, '+'));
                    break;

                case '-':
                    tokens.push(new Token(TokenType.MINUS, '-'));
                    break;

                case '*':
                    tokens.push(new Token(TokenType.MULTIPLY, '*'));
                    break;

                case '/':
                    tokens.push(new Token(TokenType.DIVIDE, '/'));
                    break;

                case '(':
                    tokens.push(new Token(TokenType.LPAREN, '('));
                    break;

                case ')':
                    tokens.push(new Token(TokenType.RPAREN, ')'));
                    break;

                default:
                    throw new Error(`Unexpected character: ${this.currentChar}`);
            }

            this.advance();
        }

        // End Of File token
        tokens.push(new Token(TokenType.EOF, null));

        return tokens;
    }

}

module.exports = Lexer;