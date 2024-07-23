$(document).ready(function() {
    function t(url) {
        gsap.set(".load_grid", { display: "grid" });
        gsap.fromTo(".load_grid-item", { opacity: 0 }, {
            opacity: 1,
            duration: 0.001,
            stagger: { amount: 0.5, from: "random" },
            onComplete: function() {
                window.location.href = url;
            }
        });
    }

    !function updateBackgroundColor() {
        let collection = $("body").attr("data-collection");
        let backgroundColor = "#070707";

        switch (collection) {
            case "Space Age Glam":
                backgroundColor = "#FD8A46";
                break;
            case "Atomic Allure":
                backgroundColor = "#F3EDD8";
                break;
            case "Quantum Glamour":
                backgroundColor = "#A24EB5";
                break;
            case "Stellar Elegance":
                backgroundColor = "#008AA1";
                break;
        }

        $(".load_grid-item").css("background-color", backgroundColor);
    }();

    gsap.to(".load_grid-item", {
        opacity: 0,
        duration: 0.001,
        stagger: { amount: 0.7, from: "random" },
        onComplete: function() {
            gsap.set(".load_grid", { display: "none" });
        }
    });

    $("a").on("click", function(event) {
        if ($(this).prop("hostname") === window.location.host && $(this).attr("href").indexOf("#") === -1 && $(this).attr("target") !== "_blank") {
            event.preventDefault();
            let href = $(this).attr("href");
            gsap.to(".load_grid-item", {
                opacity: 0,
                duration: 0.001,
                stagger: { amount: 0.5, from: "random" },
                onComplete: function() {
                    t(href);
                }
            });
        }
    });

    $(document).on("click", ".next_collection", function(event) {
        event.preventDefault();
        let href = $(this).attr("href");
        gsap.to(".load_grid-item", {
            opacity: 0,
            duration: 0.001,
            stagger: { amount: 0.5, from: "random" },
            onComplete: function() {
                t(href);
            }
        });
    });

    window.onpageshow = function(event) {
        if (event.persisted || performance.getEntriesByType("navigation")[0].type === "back_forward") {
            window.location.reload();
        }
    };

    $(window).on("load", function() {
        if (performance.getEntriesByType("navigation")[0].type === "back_forward") {
            window.location.reload();
        }
    });
});
