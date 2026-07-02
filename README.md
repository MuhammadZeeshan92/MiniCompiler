# Mini Compiler

A simple and educational implementation of a custom lexer and recursive descent parser in JavaScript (Node.js). This project demonstrates how source code is tokenized and transformed into an Abstract Syntax Tree (AST), and features a modern web-based IDE frontend.

## Features

- **Lexical Analysis (Lexer)**: Scans source code and converts it into a sequence of meaningful tokens (`NUMBER`, `IDENTIFIER`, `ASSIGN`, `PLUS`, `MINUS`, `MULTIPLY`, `DIVIDE`, `LPAREN`, `RPAREN`, `EOF`).
- **Syntax Analysis (Parser)**: Uses a recursive descent parser to process the tokens and build a structural Abstract Syntax Tree (AST).
- **Mathematical Expressions**: Supports operator precedence (e.g., multiplication and division before addition and subtraction) and parenthesis grouping.
- **Assignment Statements**: Capable of parsing variable assignments (e.g., `x = 5 + 3 * (2 - 1)`).
- **Interactive Web IDE**: A sleek, dark-themed UI to enter code and dynamically view generated tokens and AST representations without needing the CLI.
- **AST Visualization**: Provides a clear and formatted tree view of the parsed AST structure both in the terminal and on the web UI.

## Project Structure

- `lexer.js`: Contains the `Lexer` class responsible for breaking down the input string into a list of tokens.
- `parser.js`: Contains the `Parser` class that validates the sequence of tokens and constructs the AST.
- `ast.js`: Defines the structure of the AST nodes (`NumberNode`, `IdentifierNode`, `BinaryExpressionNode`, `AssignmentNode`).
- `token.js`: Defines the `Token` class and `TokenType` constants used by the lexer and parser.
- `main.js`: The CLI entry point that ties the lexer and parser together, executing them against sample input and printing the results.
- `server.js`: A native Node.js HTTP server that exposes the compiler as an API to the web frontend.
- `public/`: Directory containing the HTML, CSS, and JS files for the interactive IDE interface.
- `grammar.md`: Placeholder for defining the formal grammar of the language being parsed.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.

### Running the Web IDE (Recommended)

1. Clone the repository and navigate into the project directory:
   ```bash
   git clone https://github.com/MuhammadZeeshan92/MiniCompiler.git
   cd MiniCompiler
   ```
2. Install the project dependencies:
   ```bash
   npm i
   ```
3. Start the server:
   ```bash
   node server.js
   ```
4. Open your browser and navigate to `http://localhost:3000` to interact with the visual compiler interface.

### Running via CLI

You can also test the compiler by running `main.js`. By default, it parses the input defined in `main.js`:
```bash
node main.js
```

## Example Output

When running the compiler with a valid expression like `x = 5 + 3 * (2 - 1)`, the lexer generates the tokens and the parser constructs the following AST visualization:

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

If you provide an invalid input, the compiler will gracefully display descriptive syntax errors in the terminal or on the web IDE:
```text
===== PARSER OUTPUT =====
Syntax Error: Unexpected token PLUS
```

## License

ISC License.
