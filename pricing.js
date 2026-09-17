document.addEventListener("DOMContentLoaded", function(){

  const section = document.querySelector("#pricingHero");

  if(!section) return;

  if(window.lucide){
    lucide.createIcons();
  }

  const card = section.querySelector(".pricing-rate-card");

  if(card){

    card.addEventListener("mousemove", function(e){

      if(window.innerWidth <= 600) return;

      const rect = card.getBoundingClientRect();

      const x =
        (e.clientX - rect.left) / rect.width - 0.5;

      const y =
        (e.clientY - rect.top) / rect.height - 0.5;

      card.style.transform =
        `rotate(0deg) translate(${x * 8}px, ${y * 8}px)`;
    });

    card.addEventListener("mouseleave", function(){

      if(window.innerWidth <= 600){
        card.style.transform = "rotate(0deg)";
        return;
      }

      card.style.transform = "rotate(-3deg)";
    });

  }

});

document.addEventListener("DOMContentLoaded", function(){

  const section = document.querySelector("#hourlyRates");

  if(!section) return;


  /* Lucide Icons */
  if(window.lucide){
    lucide.createIcons();
  }


  const heading =
    section.querySelector(".hourly-sale-heading");

  const cards =
    section.querySelectorAll(".hourly-sale-card");

  const note =
    section.querySelector(".hourly-sale-note");


  /* Initial animation */

  heading.style.opacity = "0";
  heading.style.transform = "translateY(25px)";
  heading.style.transition =
    "opacity .7s ease, transform .7s ease";


  cards.forEach(function(card,index){

    card.style.opacity = "0";
    card.style.transform = "translateY(35px)";

    card.style.transition =
      "opacity .65s ease " + (index * .12) + "s, " +
      "transform .65s ease " + (index * .12) + "s, " +
      "border-color .3s ease, " +
      "box-shadow .3s ease";
  });


  note.style.opacity = "0";
  note.style.transform = "translateY(18px)";
  note.style.transition =
    "opacity .6s ease .45s, transform .6s ease .45s";


  /* Scroll reveal */

  const observer = new IntersectionObserver(function(entries,observer){

    entries.forEach(function(entry){

      if(!entry.isIntersecting) return;

      heading.style.opacity = "1";
      heading.style.transform = "translateY(0)";

      cards.forEach(function(card){
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      });

      note.style.opacity = "1";
      note.style.transform = "translateY(0)";

      observer.unobserve(entry.target);
    });

  },{
    threshold:.12
  });

  observer.observe(section);


  /* Card image movement on hover */

  cards.forEach(function(card){

    const image =
      card.querySelector(".hourly-sale-image img");

    card.addEventListener("mousemove",function(e){

      if(window.innerWidth <= 900) return;

      const rect = card.getBoundingClientRect();

      const x =
        (e.clientX - rect.left) / rect.width - .5;

      const y =
        (e.clientY - rect.top) / rect.height - .5;

      image.style.transform =
        `scale(1.07) translate(${x * 4}px, ${y * 4}px)`;
    });


    card.addEventListener("mouseleave",function(){

      image.style.transform = "scale(1)";
    });

  });

});

document.addEventListener("DOMContentLoaded", function(){

  const section =
    document.querySelector("#membershipTiers");

  if(!section) return;


  /* Lucide Icons */

  if(window.lucide){
    lucide.createIcons();
  }


  const heading =
    section.querySelector(".membership-tiers-heading");

  const cards =
    section.querySelectorAll(".membership-tier-card");


  /* Initial animation */

  heading.style.opacity = "0";
  heading.style.transform = "translateY(25px)";

  heading.style.transition =
    "opacity .7s ease, transform .7s ease";


  cards.forEach(function(card,index){

    card.style.opacity = "0";
    card.style.transform =
      index === 1
        ? "translateY(25px)"
        : "translateY(40px)";

    card.style.transition =
      "opacity .65s ease " + (index * .12) + "s, " +
      "transform .65s ease " + (index * .12) + "s, " +
      "border-color .3s ease, " +
      "box-shadow .3s ease";
  });


  /* Reveal */

  const observer =
    new IntersectionObserver(function(entries,observer){

      entries.forEach(function(entry){

        if(!entry.isIntersecting) return;

        heading.style.opacity = "1";
        heading.style.transform = "translateY(0)";

        cards.forEach(function(card,index){

          card.style.opacity = "1";

          card.style.transform =
            window.innerWidth > 950 && index === 1
              ? "translateY(-12px)"
              : "translateY(0)";
        });

        observer.unobserve(entry.target);
      });

    },{
      threshold:.12
    });


  observer.observe(section);


  /* Desktop featured card interaction */

  const featured =
    section.querySelector(".membership-tier-featured");

  if(featured){

    featured.addEventListener("mousemove",function(e){

      if(window.innerWidth <= 950) return;

      const rect =
        featured.getBoundingClientRect();

      const x =
        (e.clientX - rect.left) /
        rect.width - .5;

      const y =
        (e.clientY - rect.top) /
        rect.height - .5;

      featured.style.transform =
        `translateY(-14px) rotateY(${x * 2}deg) rotateX(${y * -1.5}deg)`;
    });


    featured.addEventListener("mouseleave",function(){

      if(window.innerWidth <= 950){
        featured.style.transform = "";
        return;
      }

      featured.style.transform =
        "translateY(-12px)";
    });
  }

});

document.addEventListener("DOMContentLoaded", function(){

  const section = document.querySelector("#addonPricing");
  if(!section) return;

  if(window.lucide){
    lucide.createIcons();
  }

  const heading = section.querySelector(".addon-pricing-heading");
  const cards = section.querySelectorAll(".addon-card");

  heading.style.opacity = "0";
  heading.style.transform = "translateY(25px)";
  heading.style.transition = "opacity .7s ease, transform .7s ease";

  cards.forEach(function(card,index){
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition =
      "opacity .6s ease " + (index * .08) + "s, " +
      "transform .6s ease " + (index * .08) + "s, " +
      "border-color .35s ease, box-shadow .35s ease";
  });

  const observer = new IntersectionObserver(function(entries,observer){

    entries.forEach(function(entry){

      if(!entry.isIntersecting) return;

      heading.style.opacity = "1";
      heading.style.transform = "translateY(0)";

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

  const section = document.querySelector("#pricingFaq");
  if(!section) return;

  if(window.lucide){
    lucide.createIcons();
  }

  /* FAQ accordion */
  const items = section.querySelectorAll(".pricing-faq-item");

  items.forEach(function(item){

    const button = item.querySelector(".pricing-faq-question");

    button.addEventListener("click", function(){

      const alreadyOpen = item.classList.contains("active");

      items.forEach(function(otherItem){
        otherItem.classList.remove("active");
      });

      if(!alreadyOpen){
        item.classList.add("active");
      }

    });

  });

  /* Reveal animation */
  const heading = section.querySelector(".pricing-faq-heading");
  const content = section.querySelector(".pricing-faq-content");
  const visual = section.querySelector(".pricing-faq-visual");

  heading.style.opacity = "0";
  heading.style.transform = "translateY(25px)";
  heading.style.transition =
    "opacity .65s ease, transform .65s ease";

  content.style.opacity = "0";
  content.style.transform = "translateX(-25px)";
  content.style.transition =
    "opacity .7s ease .1s, transform .7s ease .1s";

  visual.style.opacity = "0";
  visual.style.transform = "translateX(25px)";
  visual.style.transition =
    "opacity .7s ease .2s, transform .7s ease .2s";

  const observer = new IntersectionObserver(function(entries,observer){

    entries.forEach(function(entry){

      if(!entry.isIntersecting) return;

      heading.style.opacity = "1";
      heading.style.transform = "translateY(0)";

      content.style.opacity = "1";
      content.style.transform = "translateX(0)";

      visual.style.opacity = "1";
      visual.style.transform = "translateX(0)";

      observer.unobserve(entry.target);

    });

  },{
    threshold:.12
  });

  observer.observe(section);

});

document.addEventListener("DOMContentLoaded", function(){

  const section = document.querySelector("#pricingCta");

  if(!section) return;

  if(window.lucide){
    lucide.createIcons();
  }

  const card = section.querySelector(".pricing-cta-card");
  const icon = section.querySelector(".pricing-cta-icon");
  const content = section.querySelector(".pricing-cta-content");
  const action = section.querySelector(".pricing-cta-action");

  if(!card || !icon || !content || !action) return;

  card.style.opacity = "0";
  card.style.transform = "translateY(25px)";
  card.style.transition =
    "opacity .7s ease, transform .7s ease";

  icon.style.opacity = "0";
  icon.style.transform = "translateX(-20px)";
  icon.style.transition =
    "opacity .6s ease .15s, transform .6s ease .15s";

  content.style.opacity = "0";
  content.style.transform = "translateX(-15px)";
  content.style.transition =
    "opacity .6s ease .25s, transform .6s ease .25s";

  action.style.opacity = "0";
  action.style.transform = "translateX(20px)";
  action.style.transition =
    "opacity .6s ease .35s, transform .6s ease .35s";

  const observer = new IntersectionObserver(function(entries, observer){

    entries.forEach(function(entry){

      if(!entry.isIntersecting) return;

      card.style.opacity = "1";
      card.style.transform = "translateY(0)";

      icon.style.opacity = "1";
      icon.style.transform = "translateX(0)";

      content.style.opacity = "1";
      content.style.transform = "translateX(0)";

      action.style.opacity = "1";
      action.style.transform = "translateX(0)";

      observer.unobserve(entry.target);

    });

  },{
    threshold:.15
  });

  observer.observe(section);

  const button = section.querySelector(".pricing-cta-btn");

  if(button){
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

});