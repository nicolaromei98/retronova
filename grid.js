$(document).ready(function() {
    function animateOut() {
        return new Promise((resolve) => {
            gsap.to(".load_grid-item", {
                opacity: 0,
                duration: 0.5,
                stagger: { amount: 0.5, from: "random" },
                onComplete() {
                    resolve();
                }
            });
        });
    }

    function animateIn() {
        gsap.fromTo(".load_grid-item", { opacity: 0 }, {
            opacity: 1,
            duration: 0.5,
            stagger: { amount: 0.5, from: "random" }
        });
    }

    function loadCollection(url) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: url,
                success: function(data) {
                    const newContent = $(data).find('.collection-content').html();
                    $('.collection-content').html(newContent);
                    resolve();
                },
                error: function() {
                    reject('Failed to load collection.');
                }
            });
        });
    }

    async function navigateTo(url) {
        await animateOut();
        await loadCollection(url);
        animateIn();
    }

    $("a").on("click", function(event) {
        if ($(this).prop("hostname") === window.location.host && $(this).attr("href").indexOf("#") === -1 && $(this).attr("target") !== "_blank") {
            event.preventDefault();
            let url = $(this).attr("href");
            navigateTo(url);
        }
    });

    $(document).on("click", ".next_collection", function(event) {
        event.preventDefault();
        let url = $(this).attr("href");
        navigateTo(url);
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
