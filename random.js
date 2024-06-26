        document.addEventListener("DOMContentLoaded", function() {
            function getRandomChar() {
                const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
                return chars[Math.floor(Math.random() * chars.length)];
            }

            function fx3(chars) {
                let isAnimating = false;
                if (isAnimating) return;
                isAnimating = true;

                chars.forEach(char => {
                    char.dataset.original = char.innerText;
                });

                chars.forEach((char, index) => {
                    (function shuffle(i) {
                        if (i >= 9) {
                            char.innerText = char.dataset.original;
                            if (index === chars.length - 1) {
                                isAnimating = false;
                            }
                            return;
                        }
                        char.innerText = getRandomChar();
                        setTimeout(() => shuffle(i + 1), 80);
                    })(0);
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
                        if (entry.intersectionRatio > 0.5) {
                            const chars = entry.target.querySelectorAll('.char');
                            fx3(chars);
                        }
                    });
                }, { threshold: 0.5 });
                
                sections.forEach(section => observer.observe(section));
            }
        });
