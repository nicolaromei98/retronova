console.log("Script loaded");

// Funzione per il pre-caricamento delle immagini
const preloadImages = (selector = '.intro-grid__img') => {
    console.log("Preloading images");
    return new Promise((resolve) => {
        imagesLoaded(document.querySelectorAll(selector), { background: true }, resolve);
    });
};

document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded and parsed");

    // Grid
    const introGridWrap = document.querySelector('.intro-grid-wrap');
    console.log("introGridWrap:", introGridWrap);
    const introGrid = introGridWrap.querySelector('.intro-grid--images');
    console.log("introGrid:", introGrid);

    // The grid images
    const gridImages = [...(introGrid ? introGrid.querySelectorAll('.intro-grid__img') : [])];
    console.log("gridImages:", gridImages);

    // The grid labels
    const gridLabels = [...document.querySelectorAll('.intro-grid--labels > .intro-grid__label')];
    console.log("gridLabels:", gridLabels);

    // The grid title
    const gridTitle = {
        main: document.querySelector('.intro-title__main'),
        sub: null // No sub-title in this case
    };
    console.log("gridTitle:", gridTitle);

    // The slider title
    const sliderTitle = {
        el: document.querySelector('.slider-title'),
        main: document.querySelector('.slider-title__main'),
        desc: document.querySelector('.slider-title__desc'),
    };
    console.log("sliderTitle:", sliderTitle);

    // Controls element
    const controls = document.querySelector('.controls');
    console.log("controls:", controls);
    // Controls close link element (updated from button to a)
    const closeCtrl = controls ? controls.querySelector('a.close') : null;
    console.log("closeCtrl:", closeCtrl);

    // Clicked image's index value
    let current = -1;
    // Check if the animation is in progress
    let isAnimating = false;
    // grid || slider
    let mode = 'grid';

    // Funzione per ripristinare lo stato iniziale degli elementi
    const resetState = () => {
        console.log("Resetting state");
        gsap.set([sliderTitle.main, sliderTitle.desc], {
            clearProps: 'all',
        });
        gsap.set(sliderTitle.el, {
            opacity: 0,
        });
        gsap.set(sliderTitle.main, {
            y: "100%",
            display: "none",
        });
        gsap.set(sliderTitle.desc, {
            display: "none",
            opacity: 0,
            marginBottom: "-100%",
        });
    };

    // Funzione per mostrare lo slider
    const showSlider = image => {
        console.log("showSlider called");
        if (isAnimating || mode === 'slider') return;
        isAnimating = true;
        mode = 'slider';

        const DURATION = 1;
        const EASE = 'power4.inOut';

        current = gridImages.indexOf(image);
        console.log("current index:", current);

        gsap.timeline({
            defaults: {
                duration: DURATION,
                ease: EASE
            },
            onComplete: () => {
                isAnimating = false;
                console.log("Animation complete, isAnimating:", isAnimating);
                // Aggiungi l'evento mousemove all'immagine corrente
                document.addEventListener('mousemove', handleMouseMove);
            }
        })
        .addLabel('start', 0)
        .to([gridTitle.main].filter(el => el), {
            yPercent: -100,
            onStart: () => console.log("Animating gridTitle")
        }, 'start')
        .to(gridLabels.filter(el => el), {
            yPercent: -100,
            onStart: () => console.log("Animating gridLabels")
        }, 'start')
        .to(image, {filter: 'brightness(100%) hue-rotate(0deg)'}, 'start')
        .add(() => {
            console.log("Flip animation starting");
            // Save current state of all images
            const flipstate = Flip.getState(gridImages);
            console.log("flipstate:", flipstate);
            // Change layout
            if (window.innerWidth <= 991) {
                introGrid.classList.add('intro-grid--slider');
                const imageRect = image.getBoundingClientRect();
                const centerY = window.innerHeight / 2 - (imageRect.top + imageRect.height / 2);
                gsap.set(introGrid, {
                    y: centerY
                });
            } else {
                introGrid.classList.add('intro-grid--scatter');
                image.classList.add('intro-grid__img--current');
                gsap.set(introGrid, {
                    x: window.innerWidth / 2 - (image.getBoundingClientRect()['left'] + image.offsetWidth / 2),
                    y: window.innerHeight / 2 - (image.getBoundingClientRect()['top'] + image.offsetHeight / 2)
                });
            }
            // Animate all
            Flip.from(flipstate, {
                duration: DURATION,
                ease: EASE,
                absolute: true,
                stagger: {
                    each: 0.02,
                    from: current
                },
                simple: true,
                prune: true,
                onComplete: () => console.log("Flip animation complete")
            });
        }, 'start')
        .set(sliderTitle.el, {
            opacity: 1,
            onComplete: () => console.log("sliderTitle set to visible")
        }, 'start')
        .to(sliderTitle.main, {
            y: "-100%",
            display: "block",
            onComplete: () => console.log("sliderTitle main animation complete")
        }, 'start')
        .to(sliderTitle.desc, {
            display: "block",
            opacity: 1,
            marginBottom: "0",
            onComplete: () => console.log("sliderTitle desc animation complete")
        }, 'start')
        .add(() => {
            controls.classList.add('controls--open');
            console.log("controls opened");
        }, 'start')
        .fromTo(closeCtrl, {
            scale: 0
        }, {
            opacity: 1,
            scale: 1,
            onComplete: () => console.log("closeCtrl animation complete")
        }, 'start');
    };

    // Funzione per nascondere lo slider
    const hideSlider = () => {
        console.log("hideSlider called");
        if (isAnimating || mode === 'grid') return;
        isAnimating = true;
        mode = 'grid';

        const DURATION = 1;
        const EASE = 'power4.inOut';

        gsap.timeline({
            defaults: {
                duration: DURATION,
                ease: EASE
            },
            onComplete: () => {
                isAnimating = false;
                console.log("Animation complete, isAnimating:", isAnimating);
                resetState();  // Reset state after animation completes
                // Rimuovi l'evento mousemove
                document.removeEventListener('mousemove', handleMouseMove);
            }
        })
        .to(closeCtrl, {
            opacity: 0,
            scale: 0,
            onStart: () => console.log("Hiding closeCtrl")
        }, 'start')
        .add(() => {
            controls.classList.remove('controls--open');
            console.log("controls closed");
        }, 'start')
        .to([sliderTitle.main, sliderTitle.desc].filter(el => el), {
            y: "100%",
            opacity: 0,
            display: "none",
            onComplete: () => gsap.set(sliderTitle.el, {opacity: 0})
        }, 'start')
        .add(() => {
            // Save current state of all images
            const flipstate = Flip.getState(gridImages, {props: 'filter'});
            console.log("flipstate:", flipstate);
            // Change layout
            if (window.innerWidth <= 991) {
                introGrid.classList.remove('intro-grid--slider');
                gsap.set(introGrid, {
                    y: 0
                });
            } else {
                introGrid.classList.remove('intro-grid--scatter');
                gridImages[current].classList.remove('intro-grid__img--current');
                gsap.set(gridImages[current], {filter: 'brightness(100%) hue-rotate(0deg)'});
                gsap.set(introGrid, {
                    x: 0,
                    y: 0
                });
            }
            // Animate all
            Flip.from(flipstate, {
                duration: DURATION,
                ease: EASE,
                absolute: true,
                stagger: {
                    each: 0.02,
                    from: current
                },
                simple: true,
                prune: true,
                onComplete: () => console.log("Flip animation complete")
            });
        }, 'start')
        .to([gridLabels, [gridTitle.main]].flat().filter(el => el), {
            yPercent: 0,
            onStart: () => console.log("Showing gridLabels and gridTitle")
        }, 'start');
    };

    // Funzione per gestire il movimento del mouse
    const handleMouseMove = (event) => {
        const currentImage = document.querySelector('.intro-grid__img--current');
        if (!currentImage) return;

        const rect = currentImage.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        const maxTranslate = 2; // massimo spostamento in vw

        const translateX = ((mouseX / rect.width) * 2 - 1) * maxTranslate;
        const translateY = ((mouseY / rect.height) * 2 - 1) * maxTranslate;

        gsap.to(currentImage, {
            x: `${translateX}vw`,
            y: `${translateY}vw`,
            duration: 0.3,
            ease: 'power4.out'
        });
    };

    // Grid images click event
    gridImages.forEach(image => {
        console.log("Adding event listeners to images");
        image.addEventListener('click', () => showSlider(image));

        image.addEventListener('mouseenter', () => {
            if (mode === 'slider') return;
            gsap.fromTo(image, {
                filter: 'brightness(100%) hue-rotate(0deg)'
            }, {
                duration: 1, 
                ease: 'power4', 
                filter: 'brightness(200%) hue-rotate(130deg)'
            });
        });

        image.addEventListener('mouseleave', () => {
            if (mode === 'slider') return;
            gsap.to(image, {
                duration: 1, 
                ease: 'power4', 
                filter: 'brightness(100%) hue-rotate(0deg)'
            });
        });

        if (closeCtrl) {
            closeCtrl.addEventListener('click', (event) => {
                event.preventDefault();
                hideSlider();
            });
        }
    });

    // Event listener for Esc key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            console.log("Esc key pressed");
            hideSlider();
        }
    });

    // Preload images then remove loader (loading class) from body
    preloadImages('.intro-grid__img').then(() => {
        console.log("Images preloaded");
        document.body.classList.remove('loading');
    });
});

