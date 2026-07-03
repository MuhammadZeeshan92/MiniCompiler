class SemanticAnalyzer {
    constructor() {
        this.symbolTable = new Set();
    }

    analyze(ast) {
        this.visit(ast);
    }

    visit(node) {
        if (!node) return;

        switch (node.type) {
            case 'Program':
                node.statements.forEach(stmt => this.visit(stmt));
                break;
            case 'Assignment':
                // Check the right hand side expression first
                this.visit(node.expression);
                // Then define the identifier on the left hand side
                this.symbolTable.add(node.identifier.name);
                break;
            case 'BinaryExpression':
                this.visit(node.left);
                this.visit(node.right);
                break;
            case 'Identifier':
                if (!this.symbolTable.has(node.name)) {
                    throw new Error(`Semantic Error: Variable '${node.name}' is used before being defined.`);
                }
                break;
            case 'Number':
                // Numbers are always valid
                break;
            default:
                throw new Error(`Semantic Error: Unknown node type '${node.type}'.`);
        }
    }
}

module.exports = SemanticAnalyzer;
