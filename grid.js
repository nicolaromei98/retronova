$(document).ready(function() {
    function animateIn() {
        gsap.set(".load_grid", { display: "grid" });
        gsap.fromTo(".load_grid-item", { opacity: 0 }, {
            opacity: 1,
            duration: 0.001,
            stagger: { amount: 0.5, from: "random" }
        });
    }

    function animateOut() {
        return new Promise((resolve) => {
            gsap.to(".load_grid-item", {
                opacity: 0,
                duration: 0.001,
                stagger: { amount: 0.7, from: "random" },
                onComplete: () => {
                    gsap.set(".load_grid", { display: "none" });
                    resolve();
                }
            });
        });
    }

    async function handleNavigation(event, url) {
        event.preventDefault();
        await animateOut();
        window.location.href = url;
    }

    !function setCollectionColor() {
        let collection = $("body").attr("data-collection");
        let color = "#070707";
        switch (collection) {
            case "Space Age Glam":
                color = "#FD8A46";
                break;
            case "Atomic Allure":
                color = "#F3EDD8";
                break;
            case "Quantum Glamour":
                color = "#A24EB5";
                break;
            case "Stellar Elegance":
                color = "#008AA1";
        }
        $(".load_grid-item").css("background-color", color);
    }();

    $("a").on("click", function(event) {
        if ($(this).prop("hostname") === window.location.host && $(this).attr("href").indexOf("#") === -1 && $(this).attr("target") !== "_blank") {
            let url = $(this).attr("href");
            handleNavigation(event, url);
        }
    });

    $(document).on("click", ".next_collection", function(event) {
        let url = $(this).attr("href");
        handleNavigation(event, url);
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

    // Call animateIn on page load
    animateIn();
});
