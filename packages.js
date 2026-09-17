document.addEventListener("DOMContentLoaded", function () {

  /* =========================================
     LUCIDE
  ========================================= */

  function refreshIcons() {
    if (window.lucide) {
      lucide.createIcons();
    }
  }

  refreshIcons();


  /* =========================================
     HERO
  ========================================= */

  const hero =
    document.querySelector("#packagesLightHero");

  if (!hero) return;


  /* =========================================
     RTL STATE
  ========================================= */

  function getRTLState() {

    const storedRTL =
      localStorage.getItem("vibeAuthRTL");

    if (storedRTL !== null) {
      return storedRTL === "true";
    }

    return document.documentElement.dir === "rtl";
  }


  /* =========================================
     APPLY RTL
  ========================================= */

  function applyRTL(isRTL) {

    const direction =
      isRTL ? "rtl" : "ltr";

    document.documentElement.setAttribute(
      "dir",
      direction
    );

    document.body.setAttribute(
      "dir",
      direction
    );

    hero.setAttribute(
      "dir",
      direction
    );

    hero.classList.toggle(
      "packages-rtl",
      isRTL
    );

    refreshIcons();
  }


  applyRTL(getRTLState());


  /* =========================================
     RTL BUTTON
  ========================================= */

  const rtlButton =
    document.querySelector("#rtlToggle");

  if (rtlButton) {

    rtlButton.addEventListener(
      "click",
      function () {

        setTimeout(function () {

          const isRTL =
            document.documentElement.dir === "rtl";

          applyRTL(isRTL);

        }, 30);

      }
    );

  }


  /* =========================================
     WATCH RTL CHANGES
  ========================================= */

  const directionObserver =
    new MutationObserver(function () {

      const isRTL =
        document.documentElement.dir === "rtl";

      hero.setAttribute(
        "dir",
        isRTL ? "rtl" : "ltr"
      );

      hero.classList.toggle(
        "packages-rtl",
        isRTL
      );

    });


  directionObserver.observe(
    document.documentElement,
    {
      attributes: true,
      attributeFilter: ["dir"]
    }
  );


  /* =========================================
     STORAGE SYNC
  ========================================= */

  window.addEventListener(
    "storage",
    function (event) {

      if (event.key === "vibeAuthRTL") {

        applyRTL(
          event.newValue === "true"
        );

      }

    }
  );


  /* =========================================
     BUTTON BLUR
  ========================================= */

  const buttons =
    hero.querySelectorAll(
      ".packages-light-btn"
    );

  buttons.forEach(function (button) {

    button.addEventListener(
      "click",
      function () {
        button.blur();
      }
    );

  });


  refreshIcons();

});

document.addEventListener("DOMContentLoaded", function(){

  if(window.lucide){
    lucide.createIcons();
  }

  const section = document.querySelector("#packageCategories");

  if(!section) return;

  const featured = section.querySelector(".package-featured");
  const cards = section.querySelectorAll(".package-category-card");

  /* Featured entrance */

  if(featured){

    featured.style.opacity = "0";
    featured.style.transform = "translateX(-35px)";

    featured.style.transition =
      "opacity .7s ease, transform .7s ease";

  }


  /* Side cards entrance */

  cards.forEach(function(card,index){

    card.style.opacity = "0";
    card.style.transform = "translateX(35px)";

    card.style.transition =
      "opacity .55s ease " +
      (index * .12) +
      "s, transform .55s ease " +
      (index * .12) +
      "s, border-color .35s ease, " +
      "box-shadow .35s ease";

  });


  const observer = new IntersectionObserver(
    function(entries,observer){

      entries.forEach(function(entry){

        if(!entry.isIntersecting) return;

        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateX(0)";

        observer.unobserve(entry.target);

      });

    },
    {
      threshold:.12
    }
  );


  if(featured){
    observer.observe(featured);
  }

  cards.forEach(function(card){
    observer.observe(card);
  });

});


document.addEventListener("DOMContentLoaded", function(){

  if(window.lucide){
    lucide.createIcons();
  }

  const section = document.querySelector("#packageComparison");

  if(!section) return;


  /* PACKAGE SELECTION */

  const packages =
    section.querySelectorAll(".package-compare-package");

  packages.forEach(function(item){

    item.addEventListener("click", function(){

      packages.forEach(function(other){
        other.classList.remove("active");
      });

      item.classList.add("active");

    });

  });


  /* REVEAL */

  const board =
    section.querySelector(".package-comparison-board");

  const note =
    section.querySelector(".package-comparison-note");

  if(board){

    board.style.opacity = "0";
    board.style.transform = "translateY(30px)";

    board.style.transition =
      "opacity .7s ease, transform .7s ease";

  }

  if(note){

    note.style.opacity = "0";
    note.style.transform = "translateY(15px)";

    note.style.transition =
      "opacity .5s ease .25s, transform .5s ease .25s";

  }


  const observer = new IntersectionObserver(
    function(entries, observer){

      entries.forEach(function(entry){

        if(!entry.isIntersecting) return;

        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";

        observer.unobserve(entry.target);

      });

    },
    {
      threshold:0.12
    }
  );


  if(board){
    observer.observe(board);
  }

  if(note){
    observer.observe(note);
  }

});


document.addEventListener("DOMContentLoaded", function(){

  if(window.lucide){
    lucide.createIcons();
  }

  const section = document.querySelector("#includedBenefits");

  if(!section) return;

  const cards = section.querySelectorAll(".included-benefit-card");

  cards.forEach(function(card,index){

    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";

    card.style.transition =
      "opacity .55s ease " + (index * 0.1) + "s, " +
      "transform .55s ease " + (index * 0.1) + "s, " +
      "border-color .35s ease, " +
      "box-shadow .35s ease";

  });


  const observer = new IntersectionObserver(
    function(entries, observer){

      entries.forEach(function(entry){

        if(!entry.isIntersecting) return;

        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";

        observer.unobserve(entry.target);

      });

    },
    {
      threshold:0.12
    }
  );


  cards.forEach(function(card){
    observer.observe(card);
  });

});

document.addEventListener("DOMContentLoaded", function(){

  const section = document.querySelector("#customPackage");

  if(!section) return;


  /* LUCIDE */

  function loadIcons(){
    if(window.lucide){
      lucide.createIcons();
    }
  }

  loadIcons();


  /* OPTIONS */

  const options = section.querySelectorAll("[data-option]");
  const count = section.querySelector("#customCount");


  function updateCount(){

    const selectedCount =
      section.querySelectorAll(".custom-option.active").length;

    count.textContent =
      selectedCount + " Selected";
  }


  options.forEach(function(option){

    option.addEventListener("click", function(){

      option.classList.toggle("active");

      updateCount();

      /*
        Re-create Lucide icons after state change
        so the check icon remains visible.
      */
      loadIcons();

    });

  });


  /* REVEAL ANIMATION */

  const summary =
    section.querySelector(".custom-package-summary");

  const optionCards =
    section.querySelectorAll(".custom-option");

  const footer =
    section.querySelector(".custom-package-footer");


  summary.style.opacity = "0";
  summary.style.transform = "translateX(-30px)";
  summary.style.transition =
    "opacity .7s ease, transform .7s ease";


  optionCards.forEach(function(card,index){

    card.style.opacity = "0";
    card.style.transform = "translateY(25px)";

    card.style.transition =
      "opacity .55s ease " +
      (index * .08) +
      "s, transform .55s ease " +
      (index * .08) +
      "s, border-color .3s ease, box-shadow .3s ease";

  });


  footer.style.opacity = "0";
  footer.style.transform = "translateY(20px)";
  footer.style.transition =
    "opacity .6s ease .35s, transform .6s ease .35s";


  /* INTERSECTION OBSERVER */

  const observer =
    new IntersectionObserver(
      function(entries, observer){

        entries.forEach(function(entry){

          if(!entry.isIntersecting) return;


          summary.style.opacity = "1";
          summary.style.transform = "translateX(0)";


          optionCards.forEach(function(card){

            card.style.opacity = "1";
            card.style.transform = "translateY(0)";

          });


          footer.style.opacity = "1";
          footer.style.transform = "translateY(0)";


          observer.unobserve(entry.target);

        });

      },
      {
        threshold:0.12
      }
    );


  observer.observe(section);

});


document.addEventListener("DOMContentLoaded", function(){

  const section = document.querySelector("#occasionMatch");

  if(!section) return;


  function refreshIcons(){
    if(window.lucide){
      lucide.createIcons();
    }
  }

  refreshIcons();


  const items = section.querySelectorAll(".occasion-item");

  const image = section.querySelector("#recommendationImage");
  const occasion = section.querySelector("#recommendationOccasion");
  const title = section.querySelector("#recommendationTitle");


  items.forEach(function(item){

    item.addEventListener("click", function(){

      items.forEach(function(other){
        other.classList.remove("active");
      });

      item.classList.add("active");


      const packageName =
        item.getAttribute("data-package");

      const titleText =
        item.getAttribute("data-title");

      const imageUrl =
        item.getAttribute("data-image");


      /* IMAGE FADE */
      image.style.opacity = "0";
      image.style.transform = "scale(1.04)";

      title.style.opacity = "0";
      occasion.style.opacity = "0";


      setTimeout(function(){

        image.src = imageUrl;

        image.alt = titleText;

        occasion.textContent =
          titleText.toUpperCase();

        title.textContent =
          packageName;


        image.onload = function(){

          image.style.opacity = "1";
          image.style.transform = "scale(1)";
        };


        occasion.style.opacity = "1";
        title.style.opacity = "1";


      },180);

    });

  });


  image.style.transition =
    "opacity .3s ease, transform .6s ease";

  occasion.style.transition =
    "opacity .25s ease";

  title.style.transition =
    "opacity .25s ease";


  /* REVEAL */
  const board =
    section.querySelector(".occasion-match-board");

  board.style.opacity = "0";
  board.style.transform = "translateY(30px)";

  board.style.transition =
    "opacity .7s ease, transform .7s ease";


  const observer =
    new IntersectionObserver(function(entries, observer){

      entries.forEach(function(entry){

        if(!entry.isIntersecting) return;

        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";

        observer.unobserve(entry.target);

      });

    },{
      threshold:.12
    });


  observer.observe(board);

});

document.addEventListener("DOMContentLoaded", function () {

  const section = document.querySelector("#partyCta");

  if (!section) return;


  /* =========================================
     LUCIDE ICONS
  ========================================= */

  if (window.lucide) {
    lucide.createIcons();
  }


  /* =========================================
     RTL SUPPORT
  ========================================= */

  function applyRTL() {

    const isRTL =
      document.documentElement.dir === "rtl";

    section.style.direction =
      isRTL ? "rtl" : "ltr";

  }


  applyRTL();


  /* Watch global RTL changes */

  const directionObserver =
    new MutationObserver(function () {

      applyRTL();

    });


  directionObserver.observe(
    document.documentElement,
    {
      attributes: true,
      attributeFilter: ["dir"]
    }
  );


  /* =========================================
     BUTTON
  ========================================= */

  const button =
    section.querySelector(".party-cta-btn");

  if (button) {

    button.addEventListener("click", function () {
      button.blur();
    });

  }


  if (window.lucide) {
    lucide.createIcons();
  }

});