document.addEventListener("DOMContentLoaded", () => {

  const stage = document.getElementById("home1MusicStage");

  if (!stage) return;

  const cards = stage.querySelectorAll(".home1-music-card");
  const dots = stage.querySelectorAll(".home1-stage-dot");
  const rings = stage.querySelectorAll(".home1-stage-ring");

  let animationFrame;
  let time = 0;


  function animateHero(){

    time += 0.018;


    /* Floating music cards */

    cards.forEach((card, index) => {

      const speed = 0.75 + index * 0.1;

      const y =
        Math.sin(time * speed + index) * 7;

      const x =
        Math.cos(time * speed + index) * 4;

      const rotate =
        Math.sin(time * 0.6 + index) * 1.2;

      card.style.transform =
        `translate3d(${x}px, ${y}px, 0) rotate(${rotate}deg)`;

    });


    /* Floating dots */

    dots.forEach((dot, index) => {

      const x =
        Math.cos(time * (0.8 + index * 0.15) + index) * 8;

      const y =
        Math.sin(time * (0.9 + index * 0.12) + index) * 8;

      dot.style.transform =
        `translate3d(${x}px, ${y}px, 0)`;

    });


    /* Slowly rotate background rings */

    rings.forEach((ring, index) => {

      const rotation =
        time * (index % 2 === 0 ? 2 : -1.5);

      ring.style.transform =
        `rotate(${rotation}deg)`;

    });


    animationFrame =
      requestAnimationFrame(animateHero);

  }


  animateHero();


  /* Pause when browser tab is hidden */

  document.addEventListener("visibilitychange", () => {

    if(document.hidden){

      cancelAnimationFrame(animationFrame);

    }else{

      cancelAnimationFrame(animationFrame);

      animateHero();

    }

  });


  /* Lucide icons */

  if(window.lucide){
    lucide.createIcons();
  }

});

document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) {
    lucide.createIcons();
  }
});