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
                            isAnimating = false;
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
                const text = element.innerText;
                let wrappedText = '';
                for (const char of text) {
                    wrappedText += `<span class="char">${char}</span>`;
                }
                element.innerHTML = wrappedText;
            }

            // Seleziona tutti gli elementi con la classe "is-random"
            const elements = document.querySelectorAll('.is-random, .version-text');
            elements.forEach(element => wrapCharsWithSpan(element));

            // Utilizziamo l'IntersectionObserver per rilevare quando gli elementi entrano nel viewport
            const sections = Array.from(document.querySelectorAll('.content__section'));

            if ('IntersectionObserver' in window) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const chars = entry.target.querySelectorAll('.char');
                            fx3(chars);
                        }
                    });
                }, { threshold: 0.5 });
                
                sections.forEach(section => observer.observe(section));
            }
        });
