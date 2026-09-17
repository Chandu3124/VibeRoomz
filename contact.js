document.addEventListener("DOMContentLoaded", function(){

  const section = document.querySelector("#contactHero");

  if(!section) return;

  /* Lucide Icons */
  if(window.lucide){
    lucide.createIcons();
  }

  const visual = section.querySelector(".contact-hero-visual");
  const content = section.querySelector(".contact-hero-content");

  /* Entrance Animation */
  visual.style.opacity = "0";
  visual.style.transform = "translateX(-40px)";
  visual.style.transition =
    "opacity .8s ease, transform .8s cubic-bezier(.22,1,.36,1)";

  content.style.opacity = "0";
  content.style.transform = "translateX(40px)";
  content.style.transition =
    "opacity .8s ease .15s, transform .8s cubic-bezier(.22,1,.36,1) .15s";

  const observer = new IntersectionObserver(function(entries, obs){

    entries.forEach(function(entry){

      if(!entry.isIntersecting) return;

      visual.style.opacity = "1";
      visual.style.transform = "translateX(0)";

      content.style.opacity = "1";
      content.style.transform = "translateX(0)";

      obs.unobserve(entry.target);

    });

  },{
    threshold:.15
  });

  observer.observe(section);

  /* RTL Support */
  function applyRTL(){

    const isRTL = document.documentElement.dir === "rtl";

    section.style.direction = isRTL ? "rtl" : "ltr";

  }

  applyRTL();

  const directionObserver = new MutationObserver(function(){

    applyRTL();

  });

  directionObserver.observe(document.documentElement,{
    attributes:true,
    attributeFilter:["dir"]
  });

  /* Button Blur */
  const buttons = section.querySelectorAll(".contact-action");

  buttons.forEach(function(button){

    button.addEventListener("click",function(){
      button.blur();
    });

  });

  if(window.lucide){
    lucide.createIcons();
  }

});


document.addEventListener("DOMContentLoaded", function(){

  const section = document.querySelector("#contactInformation");
  if(!section) return;

  if(window.lucide){
    lucide.createIcons();
  }

  const heading = section.querySelector(".vibe-contact-info-heading");
  const rows = section.querySelectorAll(".vibe-contact-info-row");
  const footer = section.querySelector(".vibe-contact-left-footer");
  const quickCard = section.querySelector(".vibe-contact-quick");

  heading.style.opacity = "0";
  heading.style.transform = "translateY(22px)";
  heading.style.transition =
    "opacity .6s ease, transform .6s ease";

  rows.forEach(function(row,index){
    row.style.opacity = "0";
    row.style.transform = "translateX(-22px)";
    row.style.transition =
      "opacity .5s ease " + (index * .07) + "s, " +
      "transform .5s ease " + (index * .07) + "s";
  });

  footer.style.opacity = "0";
  footer.style.transform = "translateY(18px)";
  footer.style.transition =
    "opacity .55s ease .25s, transform .55s ease .25s";

  quickCard.style.opacity = "0";
  quickCard.style.transform = "translateX(22px)";
  quickCard.style.transition =
    "opacity .6s ease .15s, transform .6s ease .15s";

  const observer = new IntersectionObserver(function(entries, obs){

    entries.forEach(function(entry){

      if(!entry.isIntersecting) return;

      heading.style.opacity = "1";
      heading.style.transform = "translateY(0)";

      rows.forEach(function(row){
        row.style.opacity = "1";
        row.style.transform = "translateX(0)";
      });

      footer.style.opacity = "1";
      footer.style.transform = "translateY(0)";

      quickCard.style.opacity = "1";
      quickCard.style.transform = "translateX(0)";

      obs.unobserve(entry.target);
    });

  },{
    threshold:.12
  });

  observer.observe(section);

});


document.addEventListener("DOMContentLoaded", function(){

  const section = document.querySelector("#vibeLocation");
  if(!section) return;

  if(window.lucide){
    lucide.createIcons();
  }

  /* -------------------------------
     MAP CONTROLS
  -------------------------------- */

  const map = section.querySelector(".vibe-location-map");
  const grid = section.querySelector(".vibe-location-map-grid");

  let zoom = 1;

  const zoomIn = section.querySelector(
    '[aria-label="Zoom in"]'
  );

  const zoomOut = section.querySelector(
    '[aria-label="Zoom out"]'
  );

  const locateBtn = section.querySelector(
    '[aria-label="Current location"]'
  );

  function updateMap(){
    grid.style.transform =
      "rotate(-8deg) scale(" + zoom + ")";
  }

  zoomIn.addEventListener("click", function(){
    zoom = Math.min(1.5, zoom + .1);
    updateMap();
  });

  zoomOut.addEventListener("click", function(){
    zoom = Math.max(.9, zoom - .1);
    updateMap();
  });

  locateBtn.addEventListener("click", function(){

    map.animate(
      [
        { transform:"scale(1)" },
        { transform:"scale(1.015)" },
        { transform:"scale(1)" }
      ],
      {
        duration:450,
        easing:"ease-out"
      }
    );

  });

  /* -------------------------------
     REVEAL ANIMATION
  -------------------------------- */

  const heading = section.querySelector(
    ".vibe-location-heading"
  );

  const mapCard = section.querySelector(
    ".vibe-location-map"
  );

  const details = section.querySelector(
    ".vibe-location-details"
  );

  heading.style.opacity = "0";
  heading.style.transform = "translateY(22px)";
  heading.style.transition =
    "opacity .6s ease, transform .6s ease";

  mapCard.style.opacity = "0";
  mapCard.style.transform = "translateX(-28px)";
  mapCard.style.transition =
    "opacity .7s ease .1s, transform .7s ease .1s";

  details.style.opacity = "0";
  details.style.transform = "translateX(28px)";
  details.style.transition =
    "opacity .7s ease .18s, transform .7s ease .18s";

  const observer = new IntersectionObserver(
    function(entries, obs){

      entries.forEach(function(entry){

        if(!entry.isIntersecting) return;

        heading.style.opacity = "1";
        heading.style.transform = "translateY(0)";

        mapCard.style.opacity = "1";
        mapCard.style.transform = "translateX(0)";

        details.style.opacity = "1";
        details.style.transform = "translateX(0)";

        obs.unobserve(entry.target);
      });

    },
    {
      threshold:.12
    }
  );

  observer.observe(section);

  /* -------------------------------
     SUBTLE MAP MOVEMENT
  -------------------------------- */

  map.addEventListener("mousemove", function(e){

    if(window.innerWidth < 900) return;

    const rect = map.getBoundingClientRect();

    const x =
      (e.clientX - rect.left) /
      rect.width - .5;

    const y =
      (e.clientY - rect.top) /
      rect.height - .5;

    grid.style.transform =
      "translate(" +
      (x * 8) + "px," +
      (y * 8) + "px) " +
      "rotate(-8deg) scale(" +
      zoom +
      ")";
  });

  map.addEventListener("mouseleave", function(){
    grid.style.transform =
      "rotate(-8deg) scale(" + zoom + ")";
  });

});


document.addEventListener("DOMContentLoaded", function(){

  const section = document.querySelector("#operatingHours");
  if(!section) return;

  if(window.lucide){
    lucide.createIcons();
  }

  const heading = section.querySelector(
    ".vibe-hours-timeline-heading"
  );

  const days = section.querySelectorAll(
    ".vibe-hours-day"
  );

  const booking = section.querySelector(
    ".vibe-hours-booking-strip"
  );

  const side = section.querySelector(
    ".vibe-hours-side"
  );

  heading.style.opacity = "0";
  heading.style.transform = "translateY(22px)";
  heading.style.transition =
    "opacity .6s ease, transform .6s ease";

  days.forEach(function(day,index){
    day.style.opacity = "0";
    day.style.transform = "translateX(-22px)";
    day.style.transition =
      "opacity .5s ease " + (index * .08) + "s, " +
      "transform .5s ease " + (index * .08) + "s, " +
      "border-color .3s ease, box-shadow .3s ease";
  });

  booking.style.opacity = "0";
  booking.style.transform = "translateY(18px)";
  booking.style.transition =
    "opacity .55s ease .3s, transform .55s ease .3s";

  side.style.opacity = "0";
  side.style.transform = "translateX(25px)";
  side.style.transition =
    "opacity .7s ease .15s, transform .7s ease .15s";


  const observer = new IntersectionObserver(function(entries,obs){

    entries.forEach(function(entry){

      if(!entry.isIntersecting) return;

      heading.style.opacity = "1";
      heading.style.transform = "translateY(0)";

      days.forEach(function(day){
        day.style.opacity = "1";
        day.style.transform = "translateX(0)";
      });

      booking.style.opacity = "1";
      booking.style.transform = "translateY(0)";

      side.style.opacity = "1";
      side.style.transform = "translateX(0)";

      obs.unobserve(entry.target);
    });

  },{
    threshold:.12
  });

  observer.observe(section);

});

document.addEventListener("DOMContentLoaded", function(){

  const section = document.querySelector("#privateBookingInquiry");
  if(!section) return;

  if(window.lucide){
    lucide.createIcons();
  }

  const heading = section.querySelector(
    ".vibe-private-heading"
  );

  const showcase = section.querySelector(
    ".vibe-private-showcase"
  );

  const formCard = section.querySelector(
    ".vibe-private-form-card"
  );

  const form = section.querySelector(
    "#privateInquiryForm"
  );

  const success = section.querySelector(
    "#privateInquirySuccess"
  );


  /* REVEAL */

  heading.style.opacity = "0";
  heading.style.transform = "translateY(22px)";
  heading.style.transition =
    "opacity .6s ease, transform .6s ease";

  showcase.style.opacity = "0";
  showcase.style.transform = "translateX(-25px)";
  showcase.style.transition =
    "opacity .7s ease, transform .7s ease";

  formCard.style.opacity = "0";
  formCard.style.transform = "translateX(25px)";
  formCard.style.transition =
    "opacity .7s ease .1s, transform .7s ease .1s";


  const observer = new IntersectionObserver(
    function(entries, obs){

      entries.forEach(function(entry){

        if(!entry.isIntersecting) return;

        heading.style.opacity = "1";
        heading.style.transform = "translateY(0)";

        showcase.style.opacity = "1";
        showcase.style.transform = "translateX(0)";

        formCard.style.opacity = "1";
        formCard.style.transform = "translateX(0)";

        obs.unobserve(entry.target);

      });

    },
    { threshold:.12 }
  );

  observer.observe(section);


  /* FORM */

  form.addEventListener("submit", function(e){

    e.preventDefault();

    success.classList.add("show");

    if(window.lucide){
      lucide.createIcons();
    }

    setTimeout(function(){
      success.classList.remove("show");
    },5000);

  });

});

document.addEventListener("DOMContentLoaded", function(){

  const section = document.querySelector("#eventCta");

  if(!section) return;

  /* Lucide Icons */
  if(window.lucide){
    lucide.createIcons();
  }

  const card = section.querySelector(".event-cta-card");
  const content = section.querySelector(".event-cta-content");
  const button = section.querySelector(".event-cta-btn");

  if(!card || !content || !button) return;


  /* Entrance Animation */
  card.style.opacity = "0";
  card.style.transform = "translateY(30px)";
  card.style.transition =
    "opacity .7s ease, transform .7s ease";


  const observer = new IntersectionObserver(
    function(entries){

      entries.forEach(function(entry){

        if(!entry.isIntersecting) return;

        card.style.opacity = "1";
        card.style.transform = "translateY(0)";

        observer.unobserve(entry.target);

      });

    },
    {
      threshold:0.15
    }
  );

  observer.observe(section);


  /* Button Interaction */
  button.addEventListener("mouseenter", function(){

    content.style.transform = "translateX(3px)";
    content.style.transition = "transform .3s ease";

  });


  button.addEventListener("mouseleave", function(){

    content.style.transform = "translateX(0)";

  });


  /* RTL Support */
  function applyRTL(){

    const isRTL =
      document.documentElement.dir === "rtl";

    section.style.direction =
      isRTL ? "rtl" : "ltr";

  }

  applyRTL();


  const directionObserver =
    new MutationObserver(function(){

      applyRTL();

    });

  directionObserver.observe(
    document.documentElement,
    {
      attributes:true,
      attributeFilter:["dir"]
    }
  );


  /* Prevent focus animation after click */
  button.addEventListener("click", function(){
    button.blur();
  });


  /* Refresh Icons */
  if(window.lucide){
    lucide.createIcons();
  }

});