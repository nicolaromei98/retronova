$(document).ready(function () {
  // Function to set the background color based on the collection
  function setBackgroundColor() {
    const collection = $('body').attr('data-collection');
    let color = '#070707'; // Default color

    switch(collection) {
      case 'Space Age Glam':
        color = '#FD8A46';
        break;
      case 'Atomic Allure':
        color = '#F3EDD8';
        break;
      case 'Quantum Glamour':
        color = '#A24EB5';
        break;
      case 'Stellar Elegance':
        color = '#008AA1';
        break;
    }

    $('.load_grid-item').css('background-color', color);
  }

  // Call the function on page load
  setBackgroundColor();

  // Hide the grid on page load
  gsap.to(".load_grid-item", {
    opacity: 0,
    duration: 0.001,
    stagger: { amount: 0.5, from: "random" },
    onComplete: () => {
      gsap.set(".load_grid", { display: "none" });
    }
  });

  // Function to handle page transitions
  function handlePageTransition(url) {
    gsap.set(".load_grid", { display: "grid" });
    gsap.fromTo(
      ".load_grid-item",
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.001,
        stagger: { amount: 0.5, from: "random" },
        onComplete: () => {
          window.location.href = url;
        }
      }
    );
  }

  // Attach event listener to all internal links
  $("a").on("click", function (e) {
    if (
      $(this).prop("hostname") === window.location.host &&
      $(this).attr("href").indexOf("#") === -1 &&
      $(this).attr("target") !== "_blank"
    ) {
      e.preventDefault();
      const destination = $(this).attr("href");
      handlePageTransition(destination);
    }
  });

  // Reload the page when navigating back using the back button
  window.onpageshow = function(event) {
    if (event.persisted) {
      window.location.reload();
    }
  }
});
