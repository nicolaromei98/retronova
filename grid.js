$(document).ready(function() {
    function animateOutAndRedirect(url) {
        console.log('Starting animation out...');
        gsap.set(".load_grid", { display: "grid" });
        return gsap.to(".load_grid-item", {
            opacity: 0,
            duration: 0.5, // Aumentiamo la durata per vedere meglio l'animazione
            stagger: { amount: 0.5, from: "random" }
        }).then(() => {
            console.log('Animation complete, redirecting...');
            window.location.href = url;
        });
    }

    function updateBackgroundColor() {
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
    }

    updateBackgroundColor();

    $("a").on("click", function(event) {
        if ($(this).prop("hostname") === window.location.host && $(this).attr("href").indexOf("#") === -1 && $(this).attr("target") !== "_blank") {
            event.preventDefault();
            let href = $(this).attr("href");
            console.log('Link clicked, starting animation for: ', href);
            animateOutAndRedirect(href);
        }
    });

    $(document).on("click", ".next_collection", function(event) {
        event.preventDefault();
        let href = $(this).attr("href");
        console.log('Next collection clicked, starting animation for: ', href);
        animateOutAndRedirect(href);
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
