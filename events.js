document.addEventListener("DOMContentLoaded", function(){

  const section = document.querySelector("#eventsHero");

  if(!section) return;


  /* Lucide Icons */
  if(window.lucide){
    lucide.createIcons();
  }


  /* CTA arrow interaction */
  const button = section.querySelector(".events-hero-btn");

  if(button){

    button.addEventListener("mouseenter", function(){
      const arrow = button.querySelector("svg");

      if(arrow){
        arrow.style.transform = "translateX(5px)";
      }
    });

    button.addEventListener("mouseleave", function(){
      const arrow = button.querySelector("svg");

      if(arrow){
        arrow.style.transform = "translateX(0)";
      }
    });

  }


  /* Feature icon micro interaction */
  const features =
    section.querySelectorAll(".events-hero-feature");

  features.forEach(function(feature){

    feature.addEventListener("mouseenter", function(){

      const icon =
        feature.querySelector(".events-feature-icon");

      if(icon){
        icon.style.transform = "translateY(-3px)";
      }

    });

    feature.addEventListener("mouseleave", function(){

      const icon =
        feature.querySelector(".events-feature-icon");

      if(icon){
        icon.style.transform = "translateY(0)";
      }

    });

  });

});

document.addEventListener("DOMContentLoaded", function(){

  const section = document.querySelector("#upcomingEvents");

  if(!section) return;


  /* Lucide Icons */
  if(window.lucide){
    lucide.createIcons();
  }


  /* Event card reveal */
  const cards =
    section.querySelectorAll(".upcoming-event-card");

  cards.forEach(function(card, index){

    card.style.opacity = "0";
    card.style.transform = "translateY(25px)";

    card.style.transition =
      "opacity .55s ease " + (index * .1) + "s, " +
      "transform .55s ease " + (index * .1) + "s, " +
      "border-color .35s ease, " +
      "box-shadow .35s ease";

  });


  const observer =
    new IntersectionObserver(function(entries, observer){

      entries.forEach(function(entry){

        if(!entry.isIntersecting) return;

        cards.forEach(function(card){
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
        });

        observer.unobserve(entry.target);

      });

    },{
      threshold:.12
    });


  observer.observe(section);

});

document.addEventListener("DOMContentLoaded", function(){

  const section = document.querySelector("#themeNights");

  if(!section) return;


  /* Lucide */
  if(window.lucide){
    lucide.createIcons();
  }


  /* Reveal */
  const featured =
    section.querySelector(".theme-nights-featured");

  const cards =
    section.querySelectorAll(".theme-nights-card");


  featured.style.opacity = "0";
  featured.style.transform = "translateX(-30px)";
  featured.style.transition =
    "opacity .7s ease, transform .7s ease";


  cards.forEach(function(card,index){

    card.style.opacity = "0";
    card.style.transform = "translateY(25px)";

    card.style.transition =
      "opacity .55s ease " + (index * .1) + "s, " +
      "transform .55s ease " + (index * .1) + "s";

  });


  const observer =
    new IntersectionObserver(function(entries,observer){

      entries.forEach(function(entry){

        if(!entry.isIntersecting) return;

        featured.style.opacity = "1";
        featured.style.transform = "translateX(0)";

        cards.forEach(function(card){
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
        });

        observer.unobserve(entry.target);

      });

    },{
      threshold:.12
    });


  observer.observe(section);

});

document.addEventListener("DOMContentLoaded", function(){

  const section =
    document.querySelector("#djLiveEntertainment");

  if(!section) return;


  /* Lucide icons */
  function refreshIcons(){
    if(window.lucide){
      lucide.createIcons();
    }
  }

  refreshIcons();


  /* Reveal elements */
  const heading =
    section.querySelector(".dj-live-heading");

  const content =
    section.querySelector(".dj-live-content");

  const visual =
    section.querySelector(".dj-live-visual");

  const highlights =
    section.querySelectorAll(".dj-live-highlight");

  const strip =
    section.querySelector(".dj-live-event-strip");


  heading.style.opacity="0";
  heading.style.transform="translateY(30px)";
  heading.style.transition=
    "opacity .7s ease, transform .7s ease";


  content.style.opacity="0";
  content.style.transform="translateX(-35px)";
  content.style.transition=
    "opacity .75s ease, transform .75s ease";


  visual.style.opacity="0";
  visual.style.transform="translateX(35px) scale(.97)";
  visual.style.transition=
    "opacity .8s ease, transform .8s ease";


  highlights.forEach(function(item,index){

    item.style.opacity="0";
    item.style.transform="translateY(20px)";

    item.style.transition=
      "opacity .5s ease " + (index*.08) + "s, " +
      "transform .5s ease " + (index*.08) + "s, " +
      "border-color .3s ease, " +
      "box-shadow .3s ease";

  });


  strip.style.opacity="0";
  strip.style.transform="translateY(20px)";
  strip.style.transition=
    "opacity .6s ease .35s, transform .6s ease .35s";


  /* Scroll reveal */
  const observer =
    new IntersectionObserver(function(entries,observer){

      entries.forEach(function(entry){

        if(!entry.isIntersecting) return;

        heading.style.opacity="1";
        heading.style.transform="translateY(0)";

        content.style.opacity="1";
        content.style.transform="translateX(0)";

        visual.style.opacity="1";
        visual.style.transform=
          "translateX(0) scale(1)";

        highlights.forEach(function(item){
          item.style.opacity="1";
          item.style.transform="translateY(0)";
        });

        strip.style.opacity="1";
        strip.style.transform="translateY(0)";

        observer.unobserve(entry.target);

      });

    },{
      threshold:.12
    });


  observer.observe(section);


  /* Visual hover interaction */
  const visualImage =
    section.querySelector(".dj-live-visual > img");

  if(visual && visualImage){

    visual.addEventListener("mousemove",function(e){

      const rect =
        visual.getBoundingClientRect();

      const x =
        (e.clientX - rect.left) / rect.width - .5;

      const y =
        (e.clientY - rect.top) / rect.height - .5;

      visualImage.style.transform =
        "scale(1.06) translate(" +
        (x * 7) + "px," +
        (y * 7) + "px)";

    });


    visual.addEventListener("mouseleave",function(){

      visualImage.style.transform="scale(1)";

    });

  }

});

document.addEventListener("DOMContentLoaded", function(){

  const section = document.querySelector("#partyGuides");
  if(!section) return;

  if(window.lucide){
    lucide.createIcons();
  }

  const guideData = {

    birthday:{
      label:"BEST FOR BIRTHDAY CELEBRATIONS",
      title:"Make Their Birthday <strong>Extra Special</strong>",
      description:"Create a celebration that feels personal, exciting and effortless. From choosing the right room to adding the perfect finishing touches, this guide helps you plan it all.",
      group:"6–12 Guests",
      time:"1–2 Hours",
      vibe:"Fun & Festive",
      points:[
        "Choose a room matching your guest count",
        "Add birthday decorations and cake setup",
        "Prepare a playlist with the birthday person's favourites"
      ],
      tip:"Pro tip: Add a personalized decoration package to make the room feel special."
    },

    corporate:{
      label:"BEST FOR CORPORATE GATHERINGS",
      title:"Bring Your Team <strong>Together</strong>",
      description:"Turn a regular team outing into a memorable experience with the right room, activities and entertainment for everyone.",
      group:"10–20 Guests",
      time:"2–3 Hours",
      vibe:"Social & Professional",
      points:[
        "Choose a spacious room with comfortable seating",
        "Plan a mix of karaoke, games and team activities",
        "Add food and beverage options for the group"
      ],
      tip:"Pro tip: Keep the schedule flexible so everyone gets time to participate."
    },

    group:{
      label:"BEST FOR GROUP CELEBRATIONS",
      title:"More People. <strong>More Memories.</strong>",
      description:"Planning for a larger group? Focus on space, entertainment and easy sharing so everyone can enjoy the celebration together.",
      group:"12–25 Guests",
      time:"3–4 Hours",
      vibe:"High Energy",
      points:[
        "Select a room based on your maximum group size",
        "Create a shared playlist everyone can enjoy",
        "Pre-select food and party add-ons to save time"
      ],
      tip:"Pro tip: Booking your room and add-ons together makes group planning easier."
    },

    karaoke:{
      label:"BEST FOR KARAOKE LOVERS",
      title:"Get Everyone <strong>On The Mic</strong>",
      description:"A great karaoke party needs the right songs, the right room and an atmosphere where everyone feels comfortable joining in.",
      group:"4–15 Guests",
      time:"2–3 Hours",
      vibe:"Loud & Fun",
      points:[
        "Pick a room with the right audio setup",
        "Prepare a balanced playlist of crowd favourites",
        "Start with easy group songs to get everyone involved"
      ],
      tip:"Pro tip: Create a shared song list before the party so nobody spends time choosing songs."
    },

    theme:{
      label:"BEST FOR THEMED CELEBRATIONS",
      title:"Create A Party With <strong>Personality</strong>",
      description:"Give your celebration a visual identity with a simple theme, matching decorations, music and room setup.",
      group:"6–20 Guests",
      time:"2–4 Hours",
      vibe:"Creative & Unique",
      points:[
        "Pick one clear theme and colour direction",
        "Match decorations with music and lighting",
        "Add one standout element guests will remember"
      ],
      tip:"Pro tip: One strong theme looks better than mixing too many different ideas."
    }

  };

  const tabs = section.querySelectorAll(".party-guide-tab");

  const label = section.querySelector("#guideLabel");
  const title = section.querySelector("#guideTitle");
  const description = section.querySelector("#guideDescription");
  const group = section.querySelector("#guideGroup");
  const time = section.querySelector("#guideTime");
  const vibe = section.querySelector("#guideVibe");
  const points = section.querySelector("#guidePoints");
  const tip = section.querySelector("#guideTip");
  const index = section.querySelector("#guideIndex");

  const guideOrder = [
    "birthday",
    "corporate",
    "group",
    "karaoke",
    "theme"
  ];

  function refreshIcons(){
    if(window.lucide){
      lucide.createIcons();
    }
  }

  function changeGuide(key){

    const data = guideData[key];
    if(!data) return;

    const number = guideOrder.indexOf(key) + 1;

    label.textContent = data.label;
    title.innerHTML = data.title;
    description.textContent = data.description;
    group.textContent = data.group;
    time.textContent = data.time;
    vibe.textContent = data.vibe;
    tip.textContent = data.tip;
    index.textContent =
      String(number).padStart(2,"0") + " / 05";

    points.innerHTML = data.points.map(function(point){
      return `
        <div>
          <i data-lucide="check"></i>
          <span>${point}</span>
        </div>
      `;
    }).join("");

    tabs.forEach(function(tab){
      tab.classList.toggle(
        "active",
        tab.dataset.guide === key
      );
    });

    const result = section.querySelector(".party-guides-result");

    result.style.opacity = "0";
    result.style.transform = "translateY(12px)";

    requestAnimationFrame(function(){
      result.style.transition =
        "opacity .35s ease, transform .35s ease";
      result.style.opacity = "1";
      result.style.transform = "translateY(0)";
    });

    refreshIcons();
  }

  tabs.forEach(function(tab){
    tab.addEventListener("click", function(){
      changeGuide(tab.dataset.guide);
    });
  });

  const observer = new IntersectionObserver(
    function(entries, observer){
      entries.forEach(function(entry){
        if(!entry.isIntersecting) return;

        section.classList.add("is-visible");
        observer.unobserve(section);
      });
    },
    {threshold:.15}
  );

  observer.observe(section);

});

document.addEventListener("DOMContentLoaded", function(){

  const section = document.querySelector("#eventWall");
  if(!section) return;

  const events = {

    "2026-09-18":{
      title:"Neon DJ Night",
      type:"DJ NIGHT",
      typeKey:"dj",
      theme:"Neon",
      time:"8:00 PM",
      capacity:"Up to 40",
      availability:"Good availability",
      availabilityKey:"available",
      image:"https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&q=90",
      description:"Turn up the energy with live DJ mixes, neon lights, powerful sound and an unforgettable party atmosphere.",
      tip:"Perfect for groups looking for a high-energy night."
    },

    "2026-09-21":{
      title:"Karaoke Showdown",
      type:"KARAOKE NIGHT",
      typeKey:"karaoke",
      theme:"Neon",
      time:"7:00 PM",
      capacity:"Up to 25",
      availability:"Limited availability",
      availabilityKey:"limited",
      image:"https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1400&q=90",
      description:"Grab the mic and battle it out with your friends in a fun karaoke competition packed with music and energy.",
      tip:"Ideal for friend groups who love singing and friendly competition."
    },

    "2026-09-27":{
      title:"Retro 90s Party",
      type:"THEME PARTY",
      typeKey:"theme",
      theme:"Retro",
      time:"9:00 PM",
      capacity:"Up to 35",
      availability:"Good availability",
      availabilityKey:"available",
      image:"https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&q=90",
      description:"Step back into the 90s with throwback music, nostalgic vibes, colourful lights and classic party moments.",
      tip:"The perfect pick for anyone who loves old-school music and retro vibes."
    },

    "2026-10-03":{
      title:"Bollywood Beats",
      type:"THEME PARTY",
      typeKey:"theme",
      theme:"Bollywood",
      time:"8:30 PM",
      capacity:"Up to 40",
      availability:"Good availability",
      availabilityKey:"available",
      image:"https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1400&q=90",
      description:"Dance, sing and celebrate with energetic Bollywood tracks, colourful lights and a vibrant party atmosphere.",
      tip:"Great choice for groups who want music, dancing and a lively atmosphere."
    }

  };


  let selectedEvent = "2026-09-18";


  const image =
    section.querySelector("#wallEventImage");

  const dateMonth =
    section.querySelector("#wallDateMonth");

  const dateNumber =
    section.querySelector("#wallDateNumber");

  const imageType =
    section.querySelector("#wallEventType");

  const imageTitle =
    section.querySelector("#wallEventTitle");

  const detailTitle =
    section.querySelector("#wallDetailTitle");

  const description =
    section.querySelector("#wallDescription");

  const time =
    section.querySelector("#wallTime");

  const capacity =
    section.querySelector("#wallCapacity");

  const theme =
    section.querySelector("#wallTheme");

  const availability =
    section.querySelector("#wallAvailability");

  const tip =
    section.querySelector("#wallTip");


  function refreshIcons(){

    if(window.lucide){
      lucide.createIcons();
    }

  }


  function showEvent(key){

    const event = events[key];

    if(!event) return;

    selectedEvent = key;


    /* IMAGE TRANSITION */

    image.style.opacity = "0";
    image.style.transform = "scale(1.04)";

    setTimeout(function(){

      image.src = event.image;

      image.onload = function(){

        image.style.opacity = "1";
        image.style.transform = "scale(1.07)";

      };

    },180);


    const date =
      new Date(
        Number(key.slice(0,4)),
        Number(key.slice(5,7))-1,
        Number(key.slice(8,10))
      );


    dateMonth.textContent =
      date.toLocaleDateString(
        "en-US",
        {month:"short"}
      ).toUpperCase();

    dateNumber.textContent =
      key.slice(8,10);

    imageType.textContent =
      event.type;

    imageTitle.textContent =
      event.title;

    detailTitle.textContent =
      event.title;

    description.textContent =
      event.description;

    time.textContent =
      event.time;

    capacity.textContent =
      event.capacity;

    theme.textContent =
      event.theme;

    availability.textContent =
      event.availability;

    tip.textContent =
      event.tip;


    /* ACTIVE MINI CARD */

    section
      .querySelectorAll(".event-wall-mini-card")
      .forEach(function(card){

        card.classList.toggle(
          "active",
          card.dataset.event === key
        );

      });


    refreshIcons();

  }


  /* MINI EVENT CARDS */

  section
    .querySelectorAll(".event-wall-mini-card")
    .forEach(function(card){

      card.addEventListener("click",function(){

        if(events[card.dataset.event]){
          showEvent(card.dataset.event);
        }

      });

    });


  /* FILTERS */

  section
    .querySelectorAll(".event-wall-filter")
    .forEach(function(filter){

      filter.addEventListener("click",function(){

        section
          .querySelectorAll(".event-wall-filter")
          .forEach(function(item){
            item.classList.remove("active");
          });

        filter.classList.add("active");

        const value =
          filter.dataset.filter;

        let firstMatch = null;

        Object.keys(events).some(function(key){

          const event = events[key];

          if(value === "all"){
            firstMatch = key;
            return true;
          }

          if(value === "available" &&
             event.availabilityKey === "available"){
            firstMatch = key;
            return true;
          }

          if(event.typeKey === value){
            firstMatch = key;
            return true;
          }

          return false;

        });

        if(firstMatch){
          showEvent(firstMatch);
        }

      });

    });


  /* INITIAL */

  showEvent(selectedEvent);
  refreshIcons();


  /* REVEAL */

  const observer =
    new IntersectionObserver(
      function(entries,observer){

        entries.forEach(function(entry){

          if(!entry.isIntersecting) return;

          section.classList.add("is-visible");

          observer.unobserve(section);

        });

      },
      {threshold:.12}
    );

  observer.observe(section);


  /* MOUSE PARALLAX */

  const imageWrap =
    section.querySelector(".event-wall-image-wrap");

  imageWrap.addEventListener("mousemove",function(e){

    const rect =
      imageWrap.getBoundingClientRect();

    const x =
      (e.clientX - rect.left) / rect.width - .5;

    const y =
      (e.clientY - rect.top) / rect.height - .5;

    image.style.transform =
      `scale(1.07) translate(${x * 10}px,${y * 10}px)`;

  });

  imageWrap.addEventListener("mouseleave",function(){

    image.style.transform =
      "scale(1.05)";

  });

});

document.addEventListener("DOMContentLoaded", function(){

  const section = document.querySelector("#eventCta");

  if(!section) return;

  if(window.lucide){
    lucide.createIcons();
  }

  const card = section.querySelector(".event-cta-card");

  if(!card) return;

  card.style.opacity = "0";
  card.style.transform = "translateY(30px)";
  card.style.transition = "opacity .7s ease, transform .7s ease";

  const observer = new IntersectionObserver(function(entries){

    entries.forEach(function(entry){

      if(!entry.isIntersecting) return;

      card.style.opacity = "1";
      card.style.transform = "translateY(0)";

      observer.unobserve(entry.target);

    });

  },{
    threshold:0.15
  });

  observer.observe(section);

  const button = section.querySelector(".event-cta-btn");

  if(button){
    button.addEventListener("mouseenter", function(){
      button.blur();
    });

    button.addEventListener("click", function(){
      button.blur();
    });
  }

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

  if(window.lucide){
    lucide.createIcons();
  }

});