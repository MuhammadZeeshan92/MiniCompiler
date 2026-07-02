const http = require('http');
const fs = require('fs');
const path = require('path');
const Lexer = require('./lexer');
const Parser = require('./parser');

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

const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript'
};

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/api/compile') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                const { code } = JSON.parse(body);
                const lexer = new Lexer(code);
                const tokens = lexer.tokenize();
                
                let tokenOutput = tokens.map(t => `${t.type} : ${t.value}`).join('\n');
                
                const parser = new Parser(tokens);
                const ast = parser.parse();
                
                const astOutput = formatAST(ast);
                
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    success: true,
                    tokens: tokenOutput,
                    ast: astOutput,
                    message: "Syntax is Valid - Parsing Completed Successfully!"
                }));
            } catch (error) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    success: false,
                    error: error.message
                }));
            }
        });
    } else {
        // Serve static files
        let filePath = req.url === '/' ? '/index.html' : req.url;
        let extname = path.extname(filePath);
        let contentType = MIME_TYPES[extname] || 'text/plain';

        fs.readFile(path.join(__dirname, 'public', filePath), (err, content) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end('404 Not Found');
                } else {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('500 Internal Server Error');
                }
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content, 'utf-8');
            }
        });
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
