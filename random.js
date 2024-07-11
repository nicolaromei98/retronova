document.addEventListener("DOMContentLoaded", function() {
    function getRandomChar() {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
        return chars[Math.floor(Math.random() * chars.length)];
    }

    function fx3(chars) {
        let t = 0;
        const totalChars = chars.length;

        function shuffleChar(char, i = 0) {
            if (i >= 9) {
                char.innerText = char.dataset.original;
                t++;
                if (t === totalChars) {
                    return; // All characters are back to original
                }
                return;
            }
            char.innerText = getRandomChar();
            setTimeout(() => shuffleChar(char, i + 1), 80);
        }

        chars.forEach(char => {
            char.dataset.original = char.innerText;
            setTimeout(() => shuffleChar(char), Math.random() * 2000);
        });
    }

    // Funzione per suddividere i caratteri in <span> con classe "char"
    function wrapCharsWithSpan(element) {
        const lines = element.innerText.split('\n');
        let wrappedText = '';

        lines.forEach((line, index) => {
            for (const char of line) {
                wrappedText += `<span class="char">${char}</span>`;
            }
            if (index < lines.length - 1) {
                wrappedText += '<br>';
            }
        });

        element.innerHTML = wrappedText;
    }

    // Seleziona tutti gli elementi con la classe "is-random"
    const elements = document.querySelectorAll('.is-random, .version-text, .is-cms-desc');
    elements.forEach(element => wrapCharsWithSpan(element));

    // Utilizziamo l'IntersectionObserver per rilevare quando gli elementi entrano nel viewport
    const sections = Array.from(document.querySelectorAll('.content__section'));

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.animated) {
                    entry.target.dataset.animated = true; // Mark as animated
                    const chars = entry.target.querySelectorAll('.char');
                    fx3(chars);
                }
            });
        }, { threshold: 0.5, root: null, rootMargin: '0px' });

        sections.forEach(section => observer.observe(section));
    }
});
