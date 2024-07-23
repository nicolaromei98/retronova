$(document).ready(function() {
    function t(t) {
        gsap.set(".load_grid", { display: "grid" });
        gsap.fromTo(".load_grid-item", { opacity: 0 }, {
            opacity: 1,
            duration: 0.001,
            stagger: { amount: 0.5, from: "random" },
            onComplete() {
                window.location.href = t;
            }
        });
    }
    
    function getCollectionColor(collection) {
        switch (collection) {
            case "Space Age Glam": return "#FD8A46";
            case "Atomic Allure": return "#F3EDD8";
            case "Quantum Glamour": return "#A24EB5";
            case "Stellar Elegance": return "#008AA1";
            default: return "#070707";
        }
    }
    
    (function setCollectionColor() {
        let collection = $("body").attr("data-collection");
        let color = getCollectionColor(collection);
        $(".load_grid-item").css("background-color", color);
    })();
    
    gsap.to(".load_grid-item", {
        opacity: 0,
        duration: 0.001,
        stagger: { amount: 0.7, from: "random" },
        onComplete() {
            gsap.set(".load_grid", { display: "none" });
        }
    });
    
    $("a").on("click", function(o) {
        if ($(this).prop("hostname") === window.location.host && $(this).attr("href").indexOf("#") === -1 && $(this).attr("target") !== "_blank") {
            o.preventDefault();
            let href = $(this).attr("href");
            t(href);
        }
    });
    
    $(document).on("click", ".next_collection", function(o) {
        o.preventDefault();
        let href = $(this).attr("href");
        gsap.to(".load_grid-item", {
            opacity: 0,
            duration: 0.001,
            stagger: { amount: 0.5, from: "random" },
            onComplete() {
                t(href);
            }
        });
    });
    
    window.onpageshow = function(t) {
        if (t.persisted || performance.getEntriesByType("navigation")[0].type === "back_forward") {
            window.location.reload();
        }
    };
    
    $(window).on("load", function() {
        if (performance.getEntriesByType("navigation")[0].type === "back_forward") {
            window.location.reload();
        }
    });

    // Integration with the second code
    let collections = ["Space Age Glam", "Atomic Allure", "Quantum Glamour", "Stellar Elegance"];
    let nextCollectionButton = document.querySelector("#next_collection");

    if (nextCollectionButton) {
        nextCollectionButton.addEventListener("click", function() {
            let currentCollection = document.querySelector("body").getAttribute("data-collection");
            let nextCollection = collections[(collections.indexOf(currentCollection) + 1) % collections.length];
            if (nextCollection) {
                let nextUrl = `/collections/${nextCollection.replace(/\s+/g, "-").toLowerCase()}`;
                gsap.to(".load_grid-item", {
                    opacity: 0,
                    duration: 0.001,
                    stagger: { amount: 0.5, from: "random" },
                    onComplete() {
                        t(nextUrl);
                    }
                });
            }
        });
    }
});
