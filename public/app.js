document.addEventListener('DOMContentLoaded', () => {
    const compileBtn = document.getElementById('compileBtn');
    const codeEditor = document.getElementById('codeEditor');
    const terminal = document.getElementById('terminal');
    const statusIndicator = document.getElementById('statusIndicator');

    // Add simple tab support in textarea
    codeEditor.addEventListener('keydown', function(e) {
        if (e.key == 'Tab') {
            e.preventDefault();
            var start = this.selectionStart;
            var end = this.selectionEnd;
            this.value = this.value.substring(0, start) +
                "    " + this.value.substring(end);
            this.selectionStart =
                this.selectionEnd = start + 4;
        }
    });

    compileBtn.addEventListener('click', async () => {
        const code = codeEditor.value.trim();
        
        if (!code) {
            terminal.innerHTML = `<div class="terminal-error">Error: Please enter some code to compile.</div>`;
            return;
        }

        compileBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="spin"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg> Compiling...`;
        compileBtn.disabled = true;
        
        try {
            const response = await fetch('/api/compile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ code })
            });
            
            const data = await response.json();
            
            terminal.innerHTML = '';
            
            if (data.success) {
                statusIndicator.textContent = 'Compiled';
                statusIndicator.className = 'status-indicator success';
                
                terminal.innerHTML = `
                    <div class="terminal-section">
                        <div class="terminal-title">===== LEXER OUTPUT =====</div>
                        <div class="terminal-content">${data.tokens}</div>
                    </div>
                    <div class="terminal-section">
                        <div class="terminal-title">===== PARSER OUTPUT =====</div>
                        <div class="terminal-success">${data.message}</div>
                    </div>
                    <div class="terminal-section">
                        <div class="terminal-title">===== AST TREE =====</div>
                        <div class="terminal-content">${data.ast}</div>
                    </div>
                `;
            } else {
                const isSemantic = data.error.includes('Semantic Error');
                statusIndicator.textContent = isSemantic ? 'Semantic Error' : 'Syntax Error';
                statusIndicator.className = 'status-indicator error';
                
                terminal.innerHTML = `
                    <div class="terminal-section">
                        <div class="terminal-title">===== ${isSemantic ? 'SEMANTIC ANALYSIS' : 'PARSER OUTPUT'} =====</div>
                        <div class="terminal-error">${data.error}</div>
                    </div>
                `;
            }
        } catch (error) {
            statusIndicator.textContent = 'Server Error';
            statusIndicator.className = 'status-indicator error';
            
            terminal.innerHTML = `
                <div class="terminal-section">
                    <div class="terminal-error">Connection to compiler server failed.</div>
                    <div class="terminal-content">Make sure the Node.js server is running (node server.js).</div>
                </div>
            `;
        } finally {
            compileBtn.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                Compile Code
            `;
            compileBtn.disabled = false;
        }
    });
});
