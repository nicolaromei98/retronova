<script>
// Definisci la classe TextSplitter direttamente nel tuo script
class TextSplitter {
  constructor(element, options) {
    this.element = element;
    this.options = options;
    this.split();
  }

  split() {
    const text = this.element.textContent;
    const chars = text.split('').map(char => {
      const span = document.createElement('span');
      span.textContent = char;
      return span;
    });

    this.element.innerHTML = '';
    chars.forEach(char => this.element.appendChild(char));
  }

  getChars() {
    return Array.from(this.element.querySelectorAll('span'));
  }
}

// Definisci la classe TextAnimator
const lettersAndSymbols = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '!', '@', '#', '$', '%', '^', '&', '*', '-', '_', '+', '=', ';', ':', '<', '>', ','];

class TextAnimator {
  constructor(textElement) {
    if (!textElement || !(textElement instanceof HTMLElement)) {
      throw new Error('Invalid text element provided.');
    }

    this.textElement = textElement;
    this.splitText();
  }

  splitText() {
    this.splitter = new TextSplitter(this.textElement, {
      splitTypeTypes: 'words, chars'
    });

    this.originalChars = this.splitter.getChars().map(char => char.innerHTML);
  }

  animate() {
    this.reset();

    const chars = this.splitter.getChars();

    chars.forEach((char, position) => {
      let initialHTML = char.innerHTML;
      let repeatCount = 0;

      gsap.fromTo(char, {
        opacity: 0
      },
      {
        duration: 0.03,
        onStart: () => {
          gsap.set(char, { '--opa': 1 });
        },
        onComplete: () => {
          gsap.set(char, {innerHTML: initialHTML, delay: 0.03})
        },
        repeat: 3,
        onRepeat: () => {
          repeatCount++;
          if (repeatCount === 1) {
            gsap.set(char, { '--opa': 0 });
          }
        },
        repeatRefresh: true,
        repeatDelay: 0.04,
        delay: (position+1)*0.07,
        innerHTML: () => lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)],
        opacity: 1
      });
    });
  }

  reset() {
    const chars = this.splitter.getChars();
    chars.forEach((char, index) => {
      gsap.killTweensOf(char);
      char.innerHTML = this.originalChars[index];
    });
  }
}

// Funzione di inizializzazione per l'effetto hover
const init = () => {
  document.querySelectorAll('.list__item').forEach(item => {
    const cols = Array.from(item.querySelectorAll('.hover-effect'));
    const animators = cols.map(col => new TextAnimator(col));

    item.addEventListener('mouseenter', () => {
      animators.forEach(animator => animator.animate());
    });
  });

  document.querySelectorAll('.text-shuffle').forEach(item => {
    const animator = new TextAnimator(item);
    item.addEventListener('mouseenter', () => {
      animator.animate();
    });
  });
};

// Avvia l'animazione una volta che il documento è caricato
document.addEventListener('DOMContentLoaded', () => {
  const textElement = document.querySelector('.text-shuffle');
  if (textElement) {
    const animator = new TextAnimator(textElement);
    animator.animate();
  }

  init();
});
</script>
