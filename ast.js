class ProgramNode {
    constructor(statements) {
        this.type = "Program";
        this.statements = statements;
    }
}

class NumberNode {

    constructor(value) {

        this.type = "Number";

        this.value = value;

    }

}

class IdentifierNode {

    constructor(name) {

        this.type = "Identifier";

        this.name = name;

    }

}

class BinaryExpressionNode {

    constructor(operator, left, right) {

        this.type = "BinaryExpression";

        this.operator = operator;

        this.left = left;

        this.right = right;

    }

}

class AssignmentNode {

    constructor(identifier, expression) {

        this.type = "Assignment";

        this.identifier = identifier;

        this.expression = expression;

    }

}

module.exports = {

    ProgramNode,

    NumberNode,

    IdentifierNode,

    BinaryExpressionNode,

    AssignmentNode

};