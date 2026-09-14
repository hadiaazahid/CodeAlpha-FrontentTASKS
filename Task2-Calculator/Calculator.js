const screen = document.getElementById('screen');
const buttons = document.querySelectorAll('.btn');



function performCalculation(){
    try {
        let expression = screen.value;

        expression = expression.replace(/√\(/g, 'Math.sqrt(');
        expression = expression.replace(/×/g, '*').replace(/÷/g, '/');


        let openBrackets = (expression.match(/\(/g) || []).length;
        let closeBrackets = (expression.match(/\)/g) || []).length;
        
        if (openBrackets > closeBrackets) {
            expression += ')'.repeat(openBrackets - closeBrackets);
        }

        let result = eval(expression);
        screen.value = result;
    } catch (error) {
        screen.value = 'Error';
    }
}



buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonText = button.textContent;

        if (button.classList.contains('ac') || buttonText === 'AC') {
            screen.value = '0';
        }
        else if (buttonText === 'DE') {
            if (screen.value.length > 1) {
                screen.value = screen.value.slice(0, -1);
            } else {
                screen.value = '0';
            }
        }
        else if (button.classList.contains('sqrt') || buttonText === '√') {
            if (screen.value === '0') {
                screen.value = '√(';
            } else {
                screen.value += '√(';
            }
        }
        else if (buttonText === '=') {
            performCalculation();
        }
        else {
            if (screen.value === '0' || screen.value === 'Error') {
                screen.value = buttonText;
            } else {
                screen.value += buttonText;
            }
        }
    });
});



const themeToggleBtn = document.getElementById('theme-toggle-btn');

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        
        if (document.body.classList.contains('light-mode')) {
            themeToggleBtn.textContent = '🌙 Dark Mode';
        } else {
            themeToggleBtn.textContent = '☀️ Light Mode';
        }
    });
}



const fullscreenBtn = document.getElementById('fullscreen-btn');

if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {

            document.documentElement.requestFullscreen().catch(err => {
                console.log(`Error attempting to enable fullscreen: ${err.message}`);
            });
            fullscreenBtn.textContent = '⛶ Exit Fullscreen';
        } else {
          
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
            fullscreenBtn.textContent = '⛶ Fullscreen';
        }
    });
}



document.addEventListener('keydown', (e) => {
    const key = e.key;

    
    if (!isNaN(key) || key === '.') {
        if (screen.value === '0' || screen.value === 'Error') {
            screen.value = key;
        } else {
            screen.value += key;
        }
    }
    

    else if (key === '+' || key === '-' || key === '*' || key === '/') {
        screen.value += key;
    }
  

    else if (key === 'Enter') {
        e.preventDefault();
        performCalculation();
    }
    

    else if (key === 'Backspace') {
        if (screen.value.length > 1) {
            screen.value = screen.value.slice(0, -1);
        } else {
            screen.value = '0';
        }
    }
    

    else if (key === 'Escape') {
        screen.value = '0';
    }
});


