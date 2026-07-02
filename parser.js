const { TokenType } = require("./token");
const { NumberNode, IdentifierNode, BinaryExpressionNode, AssignmentNode } = require("./ast");

class Parser {

    constructor(tokens) {
        this.tokens = tokens;
        this.position = 0;
        this.currentToken = this.tokens[this.position];
    }

    advance() {
        this.position++;

        if (this.position < this.tokens.length) {
            this.currentToken = this.tokens[this.position];
        } else {
            this.currentToken = null;
        }
    }

    eat(expectedType) {
        if (this.currentToken.type === expectedType) {
            this.advance();
        } else {
            throw new Error(
                `Syntax Error: Expected ${expectedType}, but found ${this.currentToken.type}`
            );
        }
    }

    factor() {
        const token = this.currentToken;

        if (token.type === TokenType.NUMBER) {
            this.eat(TokenType.NUMBER);
            return new NumberNode(token.value);
        } else if (token.type === TokenType.IDENTIFIER) {
            this.eat(TokenType.IDENTIFIER);
            return new IdentifierNode(token.value);
        } else if (token.type === TokenType.LPAREN) {
            this.eat(TokenType.LPAREN);
            const node = this.expression();
            this.eat(TokenType.RPAREN);
            return node;
        } else {
            throw new Error(`Syntax Error: Unexpected token ${token.type}`);
        }
    }

    term() {
        let node = this.factor();

        while (
            this.currentToken.type === TokenType.MULTIPLY ||
            this.currentToken.type === TokenType.DIVIDE
        ) {
            const token = this.currentToken;
            if (token.type === TokenType.MULTIPLY) {
                this.eat(TokenType.MULTIPLY);
            } else {
                this.eat(TokenType.DIVIDE);
            }
            node = new BinaryExpressionNode(token.value, node, this.factor());
        }

        return node;
    }

    expression() {
        let node = this.term();

        while (
            this.currentToken.type === TokenType.PLUS ||
            this.currentToken.type === TokenType.MINUS
        ) {
            const token = this.currentToken;
            if (token.type === TokenType.PLUS) {
                this.eat(TokenType.PLUS);
            } else {
                this.eat(TokenType.MINUS);
            }
            node = new BinaryExpressionNode(token.value, node, this.term());
        }

        return node;
    }

    statement() {
        const idToken = this.currentToken;
        this.eat(TokenType.IDENTIFIER);
        const identifierNode = new IdentifierNode(idToken.value);

        this.eat(TokenType.ASSIGN);
        const exprNode = this.expression();

        return new AssignmentNode(identifierNode, exprNode);
    }

    parse() {
        const node = this.statement();
        this.eat(TokenType.EOF);
        return node;
    }
}

module.exports = Parser;