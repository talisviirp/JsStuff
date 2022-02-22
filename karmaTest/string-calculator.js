const calculate = () => {
    const usrInput = document.getElementById('input-numbers');
    const resultElement = document.getElementById('result');
    const text = usrInput.value;
    const numbers = text.split(',').map(x => parseInt(x));
    const negatives = numbers.filter(x => x < 0);
    let result;

    if (negatives.length > 0) {
        result = `Negatives not allowed:${negatives.join(', ')}`;
    } else {
        result = numbers
            .filter(x => x <= 1000)
            .reduce((a, b) => a + b, 0);
    }

    resultElement.textContent = result;
}

function init() {
    const button = document.getElementById('add-btn');
    button.addEventListener('click', calculate);
}