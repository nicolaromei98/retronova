<canvas id="webgl-canvas"></canvas>

<script>
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

    // Funzione per applicare l'effetto WebGL
    const applyWebGLEffect = image => {
        const canvas = document.getElementById('webgl-canvas');
        const gl = canvas.getContext('webgl');

        if (!gl) {
            console.error("Unable to initialize WebGL. Your browser or machine may not support it.");
            return;
        }

        // Impostazioni del canvas
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);

        // Shader di esempio per l'effetto WebGL
        const vertexShaderSource = `
            attribute vec4 aVertexPosition;
            attribute vec2 aTextureCoord;
            varying highp vec2 vTextureCoord;
            void main(void) {
                gl_Position = aVertexPosition;
                vTextureCoord = aTextureCoord;
            }
        `;
        const fragmentShaderSource = `
            varying highp vec2 vTextureCoord;
            uniform sampler2D uSampler;
            void main(void) {
                gl_FragColor = texture2D(uSampler, vTextureCoord);
            }
        `;

        const loadShader = (gl, type, source) => {
            const shader = gl.createShader(type);
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
                gl.deleteShader(shader);
                return null;
            }
            return shader;
        };

        const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
        const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

        const shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);

        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
            console.error('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
            return;
        }

        gl.useProgram(shaderProgram);

        const vertexPosition = gl.getAttribLocation(shaderProgram, 'aVertexPosition');
        const textureCoord = gl.getAttribLocation(shaderProgram, 'aTextureCoord');
        const uSampler = gl.getUniformLocation(shaderProgram, 'uSampler');

        const positions = [
            -1.0,  1.0,
            -1.0, -1.0,
             1.0,  1.0,
             1.0, -1.0,
        ];

        const textureCoordinates = [
            0.0,  0.0,
            0.0,  1.0,
            1.0,  0.0,
            1.0,  1.0,
        ];

        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

        const textureCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);

        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.vertexAttribPointer(vertexPosition, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(vertexPosition);

        gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
        gl.vertexAttribPointer(textureCoord, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(textureCoord);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.uniform1i(uSampler, 0);

        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    // Show the slider
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
            // Apply WebGL effect
            applyWebGLEffect(image);
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

    // Hide the slider
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

    // Preload images then remove loader (loading class) from body
    preloadImages('.intro-grid__img').then(() => {
        console.log("Images preloaded");
        document.body.classList.remove('loading');
    });
});
</script>
