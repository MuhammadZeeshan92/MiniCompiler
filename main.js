const Lexer = require("./lexer");
const Parser = require("./parser");
const SemanticAnalyzer = require("./semantic");

function formatAST(node, prefix = "", isTail = true) {
    let result = "";
    
    let nodeStr = "";
    if (node.type === "Program") {
        nodeStr = "Program";
    } else if (node.type === "Assignment") {
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

    if (node.type === "Program") {
        for (let i = 0; i < node.statements.length; i++) {
            result += formatAST(node.statements[i], childPrefix, i === node.statements.length - 1);
        }
    } else if (node.type === "Assignment") {
        result += formatAST(node.identifier, childPrefix, false);
        result += formatAST(node.expression, childPrefix, true);
    } else if (node.type === "BinaryExpression") {
        result += formatAST(node.left, childPrefix, false);
        result += formatAST(node.right, childPrefix, true);
    }

    return result;
}

const input = "x = 5; y = x + 3;";

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
    console.log("Syntax is Valid - Parsing Completed Successfully!");
    
    console.log("\n===== SEMANTIC ANALYSIS =====");
    const analyzer = new SemanticAnalyzer();
    analyzer.analyze(ast);
    console.log("Semantic Analysis Passed - Variables are used correctly!\n");

    console.log("===== AST TREE =====");
    console.log(formatAST(ast));

} catch (error) {

    console.error(error.message);

}