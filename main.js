const Lexer = require("./lexer");
const Parser = require("./parser");

function formatAST(node, prefix = "", isTail = true) {
    let result = "";
    
    let nodeStr = "";
    if (node.type === "Assignment") {
        nodeStr = "Assignment (=)";
    } else if (node.type === "BinaryExpression") {
        nodeStr = `BinaryExpression (${node.operator})`;
    } else if (node.type === "Identifier") {
        nodeStr = `Identifier (${node.name})`;
    } else if (node.type === "Number") {
        nodeStr = `Number (${node.value})`;
    }

    result += prefix + (isTail ? "└── " : "├── ") + nodeStr + "\n";
    
    let childPrefix = prefix + (isTail ? "    " : "│   ");

    if (node.type === "Assignment") {
        result += formatAST(node.identifier, childPrefix, false);
        result += formatAST(node.expression, childPrefix, true);
    } else if (node.type === "BinaryExpression") {
        result += formatAST(node.left, childPrefix, false);
        result += formatAST(node.right, childPrefix, true);
    }

    return result;
}

const input = "x = +n2 ";

try {

    const lexer = new Lexer(input);
    const tokens = lexer.tokenize();

    console.log("===== LEXER OUTPUT =====");

    tokens.forEach(token => {
        console.log(`${token.type} : ${token.value}`);
    });

    console.log("\n===== PARSER OUTPUT =====");

    const parser = new Parser(tokens);

    const ast = parser.parse();
    console.log("Syntax is Valid - Parsing Completed Successfully!\n");
    console.log("===== AST TREE =====");
    console.log(formatAST(ast));

} catch (error) {

    console.error(error.message);

}