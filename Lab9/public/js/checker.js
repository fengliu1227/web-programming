(function() {
    const staticForm = document.getElementById('static-form');
    if (staticForm) {
        const inputNumberElement = document.getElementById('numberForCheck');
        const errorContainer = document.getElementById('error-container');
        const errorTextElement = errorContainer.getElementsByClassName(
            'text-goes-here'
        )[0];
        const resultContainer = document.getElementById('result-container');
        // const resultTextElement = resultContainer.getElementsByClassName(
        //     'text-goes-here'
        // )[0];
        staticForm.addEventListener('submit', (event) => {
            event.preventDefault();

            try {
                errorContainer.classList.add('hidden');
                resultContainer.classList.add('hidden');

                const inputNumberValue = inputNumberElement.value;
                const parsedInputNumberValue = parseInt(inputNumberValue);

                const result = fibonacci(parsedInputNumberValue);
                const prime = isPrime(result);

                var nodeLi = document.createElement('LI');
                if (prime) {
                    nodeLi.classList.add('is-prime');
                    var text = document.createTextNode(`The Fibonacci of ${parsedInputNumberValue} is ${result}`);
                    nodeLi.appendChild(text);
                } else {
                    nodeLi.classList.add('not-prime');
                    var text = document.createTextNode(`The Fibonacci of ${parsedInputNumberValue} is ${result}`);
                    nodeLi.appendChild(text);
                }
                resultContainer.appendChild(nodeLi);
                resultContainer.classList.remove('hidden');
                errorTextElement.textContent = null;
                document.getElementById('static-form').reset();
            } catch (e) {
                const message = typeof e === 'string' ? e : e.message;
                errorTextElement.textContent = message;
                errorContainer.classList.remove('hidden');
            }
        });
    }
})();

function fibonacci(n) {
    if (n <= 0) return 0;
    if (n <= 2) return 1;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

function isPrime(n) {
    if (n <= 1) {
        return false;
    } else if (n === 2) {
        return true;
    } else {
        for (var x = 2; x <= Math.sqrt(n); x++) {
            if (n % x === 0) {
                return false;
            }
        }
        return true;
    }
}