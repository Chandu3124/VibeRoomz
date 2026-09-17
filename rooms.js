document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     LUCIDE
  ====================================================== */

  function refreshIcons() {
    if (window.lucide) {
      lucide.createIcons();
    }
  }

  refreshIcons();


  /* =====================================================
     HERO ANIMATION
  ====================================================== */

  const hero = document.querySelector(".room-hero");
  const heroBg = document.querySelector(".room-hero-bg");

  if (hero) {

    const heroItems = [
      hero.querySelector(".room-section-tag"),
      hero.querySelector("h1"),
      hero.querySelector(".room-hero-content > p"),
      hero.querySelector(".room-hero-actions"),
      hero.querySelector(".room-hero-features")
    ].filter(Boolean);

    heroItems.forEach((item, index) => {

      item.style.opacity = "0";
      item.style.transform = "translateY(25px)";

      item.style.transition =
        `opacity .7s ease ${index * .12}s,
         transform .7s ease ${index * .12}s`;

    });

    requestAnimationFrame(() => {

      heroItems.forEach(item => {

        item.style.opacity = "1";
        item.style.transform = "translateY(0)";

      });

    });


    /* subtle image movement */

    if (heroBg) {

      hero.addEventListener("mousemove", event => {

        if (window.innerWidth <= 900) return;

        const rect = hero.getBoundingClientRect();

        const x =
          (event.clientX - rect.left) /
          rect.width - .5;

        const y =
          (event.clientY - rect.top) /
          rect.height - .5;

        heroBg.style.transform =
          `scale(1.04)
           translate(${x * -8}px, ${y * -6}px)`;

      });

      hero.addEventListener("mouseleave", () => {

        heroBg.style.transform = "scale(1.03)";

      });

    }

  }


  /* =====================================================
     FILTER ELEMENTS
  ====================================================== */

  const guestCapacity =
    document.getElementById("guestCapacity");

  const roomTheme =
    document.getElementById("roomTheme");

  const soundSystem =
    document.getElementById("soundSystem");

  const lightingOption =
    document.getElementById("lightingOption");

  const priceRange =
    document.getElementById("priceRange");

  const priceValue =
    document.getElementById("priceValue");

  const filterStatus =
    document.getElementById("filterStatus");

  const applyButton =
    document.getElementById("applyRoomFilters");

  const clearButton =
    document.getElementById("clearFilters");

  const availabilityButtons =
    document.querySelectorAll(".availability-chip");

  const roomCards =
    document.querySelectorAll(".room-card");

  let selectedAvailability = "";


  /* =====================================================
     PRICE
  ====================================================== */

  function updatePrice() {

    if (!priceRange || !priceValue) return;

    const value =
      Number(priceRange.value);

    priceValue.textContent =
      "Up to ₹" +
      value.toLocaleString("en-IN");

    updateStatus();

  }


  /* =====================================================
     STATUS
  ====================================================== */

  function updateStatus() {

    if (!filterStatus) return;

    let count = 0;

    if (guestCapacity?.value) count++;
    if (roomTheme?.value) count++;
    if (soundSystem?.value) count++;
    if (lightingOption?.value) count++;

    if (
      priceRange &&
      Number(priceRange.value) !== 3000
    ) {
      count++;
    }

    if (selectedAvailability) {
      count++;
    }

    if (count === 0) {

      filterStatus.innerHTML = `
        <i data-lucide="circle-check"></i>
        <span>Ready to find your room</span>
      `;

    } else {

      filterStatus.innerHTML = `
        <i data-lucide="sliders-horizontal"></i>
        <span>
          ${count}
          preference${count > 1 ? "s" : ""}
          selected
        </span>
      `;

    }

    refreshIcons();

  }


  /* =====================================================
     SELECT EVENTS
  ====================================================== */

  [
    guestCapacity,
    roomTheme,
    soundSystem,
    lightingOption
  ].forEach(select => {

    select?.addEventListener(
      "change",
      updateStatus
    );

  });


  /* =====================================================
     PRICE EVENT
  ====================================================== */

  priceRange?.addEventListener(
    "input",
    updatePrice
  );


  /* =====================================================
     AVAILABILITY
  ====================================================== */

  availabilityButtons.forEach(button => {

    button.addEventListener("click", () => {

      availabilityButtons.forEach(item => {
        item.classList.remove("active");
      });

      button.classList.add("active");

      selectedAvailability =
        button.dataset.value || "";

      updateStatus();

    });

  });


  /* =====================================================
     CLEAR FILTERS
  ====================================================== */

  clearButton?.addEventListener("click", () => {

    if (guestCapacity) {
      guestCapacity.value = "";
    }

    if (roomTheme) {
      roomTheme.value = "";
    }

    if (soundSystem) {
      soundSystem.value = "";
    }

    if (lightingOption) {
      lightingOption.value = "";
    }

    if (priceRange) {
      priceRange.value = 3000;
    }

    if (priceValue) {
      priceValue.textContent = "Up to ₹3,000";
    }

    selectedAvailability = "";

    availabilityButtons.forEach((button, index) => {

      button.classList.toggle(
        "active",
        index === 0
      );

    });

    roomCards.forEach(card => {

      card.style.display = "";

    });

    updateStatus();

  });


  /* =====================================================
     APPLY FILTERS
  ====================================================== */

  applyButton?.addEventListener("click", () => {

    const selectedGuest =
      guestCapacity?.value || "";

    const selectedTheme =
      roomTheme?.value || "";

    const selectedSound =
      soundSystem?.value || "";

    const selectedLighting =
      lightingOption?.value || "";

    const selectedPrice =
      Number(priceRange?.value || 3000);


    let visibleCount = 0;


    roomCards.forEach(card => {

      const cardCapacity =
        card.dataset.capacity || "";

      const cardTheme =
        card.dataset.theme || "";

      const cardSound =
        card.dataset.sound || "";

      const cardLighting =
        card.dataset.lighting || "";

      const cardPrice =
        Number(card.dataset.price || 0);


      let matches = true;


      if (
        selectedGuest &&
        cardCapacity !== selectedGuest
      ) {
        matches = false;
      }


      if (
        selectedTheme &&
        cardTheme !== selectedTheme
      ) {
        matches = false;
      }


      if (
        selectedSound &&
        cardSound !== selectedSound
      ) {
        matches = false;
      }


      if (
        selectedLighting &&
        cardLighting !== selectedLighting
      ) {
        matches = false;
      }


      if (cardPrice > selectedPrice) {
        matches = false;
      }


      if (matches) {

        card.style.display = "";
        visibleCount++;

      } else {

        card.style.display = "none";

      }

    });


    const allRoomsSection =
      document.querySelector(".all-rooms-section");

    if (allRoomsSection) {

      allRoomsSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    }


    const existingMessage =
      document.querySelector(".room-filter-result");

    existingMessage?.remove();


    const message =
      document.createElement("div");

    message.className =
      "room-filter-result";

    message.innerHTML = `
      <i data-lucide="search-check"></i>
      <span>
        ${visibleCount}
        room${visibleCount !== 1 ? "s" : ""}
        match your selected preferences.
      </span>
    `;


    const grid =
      document.querySelector(".all-rooms-grid");

    if (grid) {
      grid.parentNode.insertBefore(
        message,
        grid
      );
    }

    refreshIcons();

  });


  /* =====================================================
     ROOM CARD REVEAL
  ====================================================== */

  if (roomCards.length) {

    const observer =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            entry.target.classList.add(
              "room-card-visible"
            );

            observer.unobserve(
              entry.target
            );

          });

        },
        {
          threshold:0.12
        }
      );


    roomCards.forEach((card, index) => {

      card.style.opacity = "0";
      card.style.transform = "translateY(25px)";
      card.style.transition =
        `opacity .55s ease ${index * .08}s,
         transform .55s ease ${index * .08}s,
         box-shadow .35s ease,
         border-color .35s ease`;

      observer.observe(card);

    });

  }


  /* =====================================================
     COMPARISON REVEAL
  ====================================================== */

  const compareTable =
    document.querySelector(".compare-table");

  if (compareTable) {

    compareTable.style.opacity = "0";
    compareTable.style.transform =
      "translateY(25px)";

    compareTable.style.transition =
      "opacity .65s ease, transform .65s ease";


    const compareObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            entry.target.style.opacity = "1";
            entry.target.style.transform =
              "translateY(0)";

            compareObserver.unobserve(
              entry.target
            );

          });

        },
        {
          threshold:.12
        }
      );


    compareObserver.observe(compareTable);

  }


  /* =====================================================
     AMBIENCE REVEAL
  ====================================================== */

  const ambienceRooms =
    document.querySelectorAll(".ambience-room");

  if (ambienceRooms.length) {

    const ambienceObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            entry.target.style.opacity = "1";
            entry.target.style.transform =
              "translateY(0)";

            ambienceObserver.unobserve(
              entry.target
            );

          });

        },
        {
          threshold:.12
        }
      );


    ambienceRooms.forEach((room, index) => {

      room.style.opacity = "0";
      room.style.transform =
        "translateY(30px)";

      room.style.transition =
        `opacity .6s ease ${index * .1}s,
         transform .6s ease ${index * .1}s,
         border-color .35s ease,
         box-shadow .35s ease`;

      ambienceObserver.observe(room);

    });

  }


  /* =====================================================
     BEFORE BOOK INTERACTION
  ====================================================== */

  const beforeItems =
    document.querySelectorAll(
      ".before-book-item"
    );

  beforeItems.forEach(item => {

    item.addEventListener("click", () => {

      beforeItems.forEach(other => {
        other.classList.remove("active");
      });

      item.classList.add("active");

    });

  });


  /* =====================================================
     BEFORE BOOK ANIMATION
  ====================================================== */

  const beforeVisual =
    document.querySelector(
      ".before-book-visual"
    );

  if (beforeVisual) {

    beforeVisual.style.opacity = "0";
    beforeVisual.style.transform =
      "translateX(-35px)";

    beforeVisual.style.transition =
      "opacity .7s ease, transform .7s ease";

  }


  beforeItems.forEach((item, index) => {

    item.style.opacity = "0";
    item.style.transform =
      "translateX(35px)";

    item.style.transition =
      `opacity .55s ease ${index * .08}s,
       transform .55s ease ${index * .08}s,
       border-color .3s ease,
       box-shadow .3s ease`;

  });


  const beforeObserver =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (!entry.isIntersecting) return;

          entry.target.style.opacity = "1";
          entry.target.style.transform =
            "translateX(0)";

          beforeObserver.unobserve(
            entry.target
          );

        });

      },
      {
        threshold:.12
      }
    );


  if (beforeVisual) {
    beforeObserver.observe(beforeVisual);
  }

  beforeItems.forEach(item => {
    beforeObserver.observe(item);
  });


  /* =====================================================
     CTA REVEAL
  ====================================================== */

  const cta =
    document.querySelector(
      ".simple-vibe-cta-card"
    );

  if (cta) {

    cta.style.opacity = "0";
    cta.style.transform =
      "translateY(25px)";

    cta.style.transition =
      "opacity .7s ease, transform .7s ease";


    const ctaObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            entry.target.style.opacity = "1";
            entry.target.style.transform =
              "translateY(0)";

            ctaObserver.unobserve(
              entry.target
            );

          });

        },
        {
          threshold:.15
        }
      );


    ctaObserver.observe(cta);

  }


  /* =====================================================
     FILTER RESULT STYLE
  ====================================================== */

  const resultStyle =
    document.createElement("style");

  resultStyle.textContent = `
    .room-filter-result{
      display:flex;
      align-items:center;
      justify-content:center;
      gap:8px;
      margin-bottom:18px;
      padding:13px 18px;
      border:1px solid rgba(255,90,0,.25);
      border-radius:8px;
      color:var(--secondary);
      background:rgba(255,90,0,.05);
      font-size:15px;
      font-weight:700;
    }

    .room-filter-result svg{
      width:18px;
      height:18px;
      color:var(--primary);
    }

    .room-card-visible{
      opacity:1 !important;
      transform:translateY(0) !important;
    }

    @media(max-width:768px){
      .room-filter-result{
        text-align:center;
      }
    }
  `;

  document.head.appendChild(resultStyle);


  /* =====================================================
     INITIAL
  ====================================================== */

  updatePrice();
  refreshIcons();

});