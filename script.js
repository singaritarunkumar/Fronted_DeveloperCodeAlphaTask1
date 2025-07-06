const display = document.getElementById('display');
const buttons = document.querySelectorAll('button[data-value]');
const equals = document.getElementById('equals');
const clear = document.getElementById('clear');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.getAttribute('data-value');
    if (display.innerText === '0' && value !== '.') {
      display.innerText = value;
    } else {
      display.innerText += value;
    }
  });
});

equals.addEventListener('click', () => {
  try {
    display.innerText = eval(display.innerText);
  } catch {
    display.innerText = 'Error';
  }
});

clear.addEventListener('click', () => {
  display.innerText = '0';
});

// BONUS: Keyboard support
document.addEventListener('keydown', (e) => {
  const key = e.key;
  if ('0123456789.+-*/'.includes(key)) {
    if (display.innerText === '0' && key !== '.') {
      display.innerText = key;
    } else {
      display.innerText += key;
    }
  } else if (key === 'Enter') {
    try {
      display.innerText = eval(display.innerText);
    } catch {
      display.innerText = 'Error';
    }
  } else if (key === 'Backspace') {
    display.innerText = display.innerText.slice(0, -1) || '0';
  } else if (key === 'Escape') {
    display.innerText = '0';
  }
});
