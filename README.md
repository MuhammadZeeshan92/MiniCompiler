# Mini Compiler

A simple and educational implementation of a custom lexer and recursive descent parser in JavaScript (Node.js). This project demonstrates how source code is tokenized and transformed into an Abstract Syntax Tree (AST).

## Features

- **Lexical Analysis (Lexer)**: Scans source code and converts it into a sequence of meaningful tokens (`NUMBER`, `IDENTIFIER`, `ASSIGN`, `PLUS`, `MINUS`, `MULTIPLY`, `DIVIDE`, `LPAREN`, `RPAREN`, `EOF`).
- **Syntax Analysis (Parser)**: Uses a recursive descent parser to process the tokens and build a structural Abstract Syntax Tree (AST).
- **Mathematical Expressions**: Supports operator precedence (e.g., multiplication and division before addition and subtraction) and parenthesis grouping.
- **Assignment Statements**: Capable of parsing variable assignments (e.g., `x = 5 + 3 * (2 - 1)`).
- **AST Visualization**: Provides a clear and formatted tree view of the parsed AST structure in the console.

## Project Structure

- `lexer.js`: Contains the `Lexer` class responsible for breaking down the input string into a list of tokens.
- `parser.js`: Contains the `Parser` class that validates the sequence of tokens and constructs the AST.
- `ast.js`: Defines the structure of the AST nodes (`NumberNode`, `IdentifierNode`, `BinaryExpressionNode`, `AssignmentNode`).
- `token.js`: Defines the `Token` class and `TokenType` constants used by the lexer and parser.
- `main.js`: The main entry point that ties the lexer and parser together, executing them against sample input and printing the results.
- `grammar.md`: Placeholder for defining the formal grammar of the language being parsed.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.

### Running the Compiler

1. Clone the repository and navigate into the project directory:
   ```bash
   git clone https://github.com/MuhammadZeeshan92/MiniCompiler.git
   cd MiniCompiler
   ```
2. You can test the compiler by running `main.js`. By default, it parses the input defined in `main.js`:
   ```bash
   node main.js
   ```

## Example Output

When running `node main.js` with a valid expression like `x = 5 + 3 * (2 - 1)`, the lexer generates the tokens and the parser constructs the following AST visualization:

```text
===== LEXER OUTPUT =====
IDENTIFIER : x
ASSIGN : =
NUMBER : 5
PLUS : +
NUMBER : 3
MULTIPLY : *
LPAREN : (
NUMBER : 2
MINUS : -
NUMBER : 1
RPAREN : )
EOF : null

===== PARSER OUTPUT =====
Syntax is Valid - Parsing Completed Successfully!

===== AST TREE =====
├── Assignment (=)
│   ├── Identifier (x)
│   └── BinaryExpression (+)
│       ├── Number (5)
│       └── BinaryExpression (*)
│           ├── Number (3)
│           └── BinaryExpression (-)
│               ├── Number (2)
│               └── Number (1)
```

## Error Handling

If you provide an invalid input, the compiler will throw descriptive syntax errors:
```text
===== PARSER OUTPUT =====
Syntax Error: Unexpected token PLUS
```

## License

ISC License.
