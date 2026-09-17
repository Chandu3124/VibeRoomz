document.addEventListener("DOMContentLoaded", () => {

  const bookingPage =
    document.querySelector(".vr-booking-page");

  const themeToggle =
    document.getElementById("bookingThemeToggle");

  const rtlToggle =
    document.getElementById("bookingRtlToggle");

  const bookingLogo =
    document.getElementById("bookingLogo");

  const bookingForm =
    document.getElementById("bookingForm");

  const bookingDate =
    document.getElementById("bookingDate");


  /* =========================================
     LUCIDE
  ========================================= */

  function refreshIcons(){

    if(window.lucide){
      lucide.createIcons();
    }

  }

  refreshIcons();


  /* =========================================
     THEME
  ========================================= */

  let darkMode =
    localStorage.getItem("vibeAuthTheme") === "dark";


  function updateTheme(){

    document.body.classList.toggle(
      "dark",
      darkMode
    );

    themeToggle?.setAttribute(
      "aria-pressed",
      darkMode ? "true" : "false"
    );

    themeToggle?.setAttribute(
      "aria-label",
      darkMode
        ? "Switch to light mode"
        : "Switch to dark mode"
    );


    if(themeToggle){

      themeToggle.innerHTML = darkMode
        ? `<i data-lucide="sun"></i>`
        : `<i data-lucide="moon-star"></i>`;

    }


    updateLogo();
    refreshIcons();

  }


  function updateLogo(){

    if(!bookingLogo) return;

    const lightLogo =
      bookingLogo.dataset.lightLogo;

    const darkLogo =
      bookingLogo.dataset.darkLogo;


    bookingLogo.src =
      darkMode && darkLogo
        ? darkLogo
        : lightLogo;

  }


  themeToggle?.addEventListener(
    "click",
    () => {

      darkMode = !darkMode;

      localStorage.setItem(
        "vibeAuthTheme",
        darkMode ? "dark" : "light"
      );

      updateTheme();

    }
  );


  /* =========================================
     RTL
  ========================================= */

  let rtlEnabled =
    localStorage.getItem("vibeAuthRTL") === "true";


  function updateRTL(){

    if(!bookingPage) return;

    const direction =
      rtlEnabled ? "rtl" : "ltr";

    document.documentElement.dir =
      direction;

    document.body.dir =
      direction;

    bookingPage.dir =
      direction;

    rtlToggle?.setAttribute(
      "aria-pressed",
      rtlEnabled ? "true" : "false"
    );

  }


  rtlToggle?.addEventListener(
    "click",
    () => {

      rtlEnabled = !rtlEnabled;

      localStorage.setItem(
        "vibeAuthRTL",
        rtlEnabled ? "true" : "false"
      );

      updateRTL();

    }
  );


  /* =========================================
     MINIMUM DATE
  ========================================= */

  if(bookingDate){

    const today =
      new Date().toISOString().split("T")[0];

    bookingDate.min = today;

  }


  /* =========================================
     BOOKING SUBMIT
  ========================================= */

  bookingForm?.addEventListener(
    "submit",
    (event) => {

      event.preventDefault();


      const name =
        document.getElementById(
          "bookingName"
        )?.value.trim();

      const email =
        document.getElementById(
          "bookingEmail"
        )?.value.trim();

      const phone =
        document.getElementById(
          "bookingPhone"
        )?.value.trim();

      const room =
        document.getElementById(
          "bookingRoom"
        )?.value;

      const date =
        document.getElementById(
          "bookingDate"
        )?.value;

      const time =
        document.getElementById(
          "bookingTime"
        )?.value;

      const guests =
        document.getElementById(
          "bookingGuests"
        )?.value;


      if(
        !name ||
        !email ||
        !phone ||
        !room ||
        !date ||
        !time ||
        !guests
      ){

        alert(
          "Please complete all booking details."
        );

        return;

      }


      alert(
        "Booking details saved successfully!"
      );

    }
  );


  /* =========================================
     INITIALIZE
  ========================================= */

  updateTheme();
  updateRTL();
  refreshIcons();

});