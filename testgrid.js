// Primo Codice (GSAP)
$(document).ready(function() {
    function transitionTo(url) {
        gsap.set(".load_grid", { display: "grid" });
        gsap.fromTo(".load_grid-item", 
            { opacity: 0 }, 
            { opacity: 1, duration: 0.001, stagger: { amount: 0.5, from: "random" }, onComplete: function() { window.location.href = url; } }
        );
    }

    !function setBackgroundColor() {
        let collectionName = $("body").attr("data-collection");
        let color = "#070707";
        switch (collectionName) {
            case "Space Age Glam": color = "#FD8A46"; break;
            case "Atomic Allure": color = "#F3EDD8"; break;
            case "Quantum Glamour": color = "#A24EB5"; break;
            case "Stellar Elegance": color = "#008AA1";
        }
        $(".load_grid-item").css("background-color", color);
    }();

    gsap.to(".load_grid-item", {
        opacity: 0,
        duration: 0.001,
        stagger: { amount: 0.7, from: "random" },
        onComplete: function() { gsap.set(".load_grid", { display: "none" }); }
    });

    $("a").on("click", function(e) {
        if ($(this).prop("hostname") === window.location.host && $(this).attr("href").indexOf("#") === -1 && $(this).attr("target") !== "_blank") {
            e.preventDefault();
            let url = $(this).attr("href");
            transitionTo(url);
        }
    });

    $(document).on("click", ".next_collection", function(e) {
        e.preventDefault();
        let url = $(this).attr("href");
        gsap.to(".load_grid-item", {
            opacity: 0,
            duration: 0.001,
            stagger: { amount: 0.5, from: "random" },
            onComplete: function() {
                transitionTo(url);
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

// Secondo Codice (Navigazione tra Collezioni)
document.addEventListener("DOMContentLoaded", function() {
    let collections = ["Space Age Glam", "Atomic Allure", "Quantum Glamour", "Stellar Elegance"];
    let nextCollectionButton = document.querySelector("#next_collection");

    function getCurrentCollection() {
        let collectionElement = document.querySelector(".data-collection");
        return collectionElement ? collectionElement.getAttribute("data-collection") : null;
    }

    function getNextCollection(currentCollection) {
        let index = collections.indexOf(currentCollection);
        return index !== -1 ? collections[(index + 1) % collections.length] : null;
    }

    if (nextCollectionButton) {
        nextCollectionButton.addEventListener("click", function(e) {
            e.preventDefault();
            let currentCollection = getCurrentCollection();
            let nextCollection = getNextCollection(currentCollection);
            if (nextCollection) {
                let nextUrl = `/collections/${nextCollection.replace(/\s+/g, "-").toLowerCase()}`;
                gsap.to(".load_grid-item", {
                    opacity: 0,
                    duration: 0.001,
                    stagger: { amount: 0.5, from: "random" },
                    onComplete: function() {
                        window.location.href = nextUrl;
                    }
                });
            }
        });
    }
});
