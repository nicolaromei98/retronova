document.addEventListener('DOMContentLoaded', function() {
    function setBackgroundColor() {
        let a = $("body").attr("data-collection");
        let o = "#070707";
        switch(a) {
            case "Space Age Glam":
                o = "#FD8A46";
                break;
            case "Atomic Allure":
                o = "#F3EDD8";
                break;
            case "Quantum Glamour":
                o = "#A24EB5";
                break;
            case "Stellar Elegance":
                o = "#008AA1";
        }
        $(".load_grid-item").css("background-color", o);
    }

    function pageEnter() {
        gsap.fromTo(".load_grid-item", {
            opacity: 0
        }, {
            opacity: 1,
            duration: 0.001,
            stagger: {
                amount: 0.5,
                from: "random"
            },
            onComplete() {
                gsap.set(".load_grid", { display: "none" });
            }
        });
    }

    function pageLeave(callback) {
        gsap.set(".load_grid", { display: "grid" });
        gsap.to(".load_grid-item", {
            opacity: 0,
            duration: 0.001,
            stagger: {
                amount: 0.5,
                from: "random"
            },
            onComplete: callback
        });
    }

    // Initialize Barba.js
    barba.init({
        transitions: [{
            name: 'custom-transition',
            leave(data) {
                return new Promise(resolve => {
                    pageLeave(resolve);
                });
            },
            enter(data) {
                setBackgroundColor();
                pageEnter();
            },
            once(data) {
                setBackgroundColor();
                pageEnter();
            }
        }]
    });

    // Handle link clicks with Barba.js
    $("a").on("click", function(t) {
        if($(this).prop("hostname") === window.location.host && $(this).attr("href").indexOf("#") === -1 && $(this).attr("target") !== "_blank") {
            t.preventDefault();
            var href = $(this).attr("href");
            barba.go(href);
        }
    });

    // Reload the page when navigating back to it
    window.onpageshow = function(event) {
        if(event.persisted) {
            window.location.reload();
        }
    };
});
