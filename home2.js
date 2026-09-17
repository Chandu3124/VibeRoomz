document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     LUCIDE ICONS
  ===================================================== */

  function refreshIcons() {
    if (window.lucide) {
      lucide.createIcons();
    }
  }

  refreshIcons();


  /* =====================================================
     SET MINIMUM DATE FOR SEARCH
  ===================================================== */

  const searchDate = document.getElementById("searchDate");

  if (searchDate) {

    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    searchDate.min = `${year}-${month}-${day}`;

  }


  /* =====================================================
     QUICK ROOM SEARCH
  ===================================================== */

  const searchButton = document.getElementById("searchRoomsBtn");

  if (searchButton) {

    searchButton.addEventListener("click", () => {

      const date =
        document.getElementById("searchDate")?.value;

      const time =
        document.getElementById("searchTime")?.value;

      const guests =
        document.getElementById("guestCount")?.value;

      const capacity =
        document.getElementById("roomCapacity")?.value;


      if (!date || !time || !guests) {

        alert(
          "Please select date, time and number of guests."
        );

        return;

      }


      const params = new URLSearchParams({
        date,
        time,
        guests,
        capacity: capacity || ""
      });


      window.location.href =
        `rooms.html?${params.toString()}`;

    });

  }


  /* =====================================================
     REVIEW SLIDER
  ===================================================== */

  const reviewSlides =
    document.querySelectorAll(".review-slide");

  const reviewDots =
    document.querySelectorAll(".review-dot");

  const reviewPrev =
    document.getElementById("reviewPrev");

  const reviewNext =
    document.getElementById("reviewNext");

  let currentReview = 0;


  function showReview(index) {

    if (!reviewSlides.length) {
      return;
    }


    if (index < 0) {
      index = reviewSlides.length - 1;
    }


    if (index >= reviewSlides.length) {
      index = 0;
    }


    currentReview = index;


    reviewSlides.forEach((slide, i) => {

      slide.classList.toggle(
        "active",
        i === currentReview
      );

    });


    reviewDots.forEach((dot, i) => {

      dot.classList.toggle(
        "active",
        i === currentReview
      );

    });

  }


  /* =====================================================
     PREVIOUS REVIEW
  ===================================================== */

  if (reviewPrev) {

    reviewPrev.addEventListener("click", () => {

      showReview(currentReview - 1);

    });

  }


  /* =====================================================
     NEXT REVIEW
  ===================================================== */

  if (reviewNext) {

    reviewNext.addEventListener("click", () => {

      showReview(currentReview + 1);

    });

  }


  /* =====================================================
     REVIEW DOTS
  ===================================================== */

  reviewDots.forEach((dot) => {

    dot.addEventListener("click", () => {

      const slideIndex =
        Number(dot.dataset.slide);


      if (!Number.isNaN(slideIndex)) {

        showReview(slideIndex);

      }

    });

  });


  /* =====================================================
     AUTO REVIEW SLIDER
  ===================================================== */

  if (reviewSlides.length > 1) {

    setInterval(() => {

      showReview(currentReview + 1);

    }, 5000);

  }


  /* =====================================================
     BUTTON ICON REFRESH
  ===================================================== */

  document
    .querySelectorAll(
      ".vibe-btn, .vibe-cta-btn, .trending-room-btn, .btn-promo"
    )
    .forEach((button) => {

      button.addEventListener("mouseenter", () => {
        refreshIcons();
      });

    });


  /* =====================================================
     FINAL ICON REFRESH
  ===================================================== */

  refreshIcons();

});