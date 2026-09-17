/* =========================================================
   VIBEROOMZ AUTH PAGE JS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     ELEMENTS
     ======================================================= */

  const loginCard = document.getElementById("loginCard");
  const signupCard = document.getElementById("signupCard");

  const showSignup = document.getElementById("showSignup");
  const showLogin = document.getElementById("showLogin");

  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");

  const rtlToggle = document.getElementById("authRtlToggle");
  const themeToggle = document.getElementById("authThemeToggle");

  const authPage = document.querySelector(".vr-auth-page");

  const authLogo = document.getElementById("authLogo");
  const signupLogo = document.querySelector(".authSignupLogo");


  /* =======================================================
     LUCIDE
     ======================================================= */

  function refreshIcons(){

    if(window.lucide){
      lucide.createIcons();
    }

  }


  refreshIcons();


  /* =======================================================
     LOGIN / SIGNUP SWITCH
     ======================================================= */

  function openSignup(){

    loginCard.style.display = "none";
    signupCard.style.display = "block";

    refreshIcons();

  }


  function openLogin(){

    signupCard.style.display = "none";
    loginCard.style.display = "block";

    refreshIcons();

  }


  showSignup?.addEventListener("click", openSignup);

  showLogin?.addEventListener("click", openLogin);


  /* =======================================================
     PASSWORD VISIBILITY
     ======================================================= */

  function setupPasswordToggle(buttonId, inputId){

    const button = document.getElementById(buttonId);
    const input = document.getElementById(inputId);

    if(!button || !input) return;


    button.addEventListener("click", () => {

      const isPassword = input.type === "password";

      input.type = isPassword ? "text" : "password";

      button.setAttribute(
        "aria-label",
        isPassword ? "Hide password" : "Show password"
      );


      button.innerHTML = isPassword
        ? `<i data-lucide="eye-off"></i>`
        : `<i data-lucide="eye"></i>`;


      refreshIcons();

    });

  }


  setupPasswordToggle(
    "loginPasswordToggle",
    "loginPassword"
  );


  setupPasswordToggle(
    "signupPasswordToggle",
    "signupPassword"
  );


  setupPasswordToggle(
    "signupConfirmPasswordToggle",
    "signupConfirmPassword"
  );


  /* =======================================================
     THEME
     ======================================================= */

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


    updateLogos();

    refreshIcons();

  }


  function updateLogos(){

    if(!authLogo) return;


    const lightLogo =
      authLogo.dataset.lightLogo;


    const darkLogo =
      authLogo.dataset.darkLogo;


    if(darkMode){

      if(darkLogo){
        authLogo.src = darkLogo;
      }

    }else{

      if(lightLogo){
        authLogo.src = lightLogo;
      }

    }


    if(signupLogo){

      const lightSignupLogo =
        signupLogo.dataset.lightLogo;

      const darkSignupLogo =
        signupLogo.dataset.darkLogo;


      if(darkMode){

        if(darkSignupLogo){
          signupLogo.src = darkSignupLogo;
        }

      }else{

        if(lightSignupLogo){
          signupLogo.src = lightSignupLogo;
        }

      }

    }

  }


  themeToggle?.addEventListener("click", () => {

    darkMode = !darkMode;

    localStorage.setItem(
      "vibeAuthTheme",
      darkMode ? "dark" : "light"
    );

    updateTheme();

  });


  /* =======================================================
     RTL
     ======================================================= */

  let rtlEnabled =
    localStorage.getItem("vibeAuthRTL") === "true";


  function updateRTL(){

    if(!authPage) return;


    if(rtlEnabled){

      document.documentElement.dir = "rtl";

      authPage.dir = "rtl";

      rtlToggle?.setAttribute(
        "aria-pressed",
        "true"
      );

    }else{

      document.documentElement.dir = "ltr";

      authPage.dir = "ltr";

      rtlToggle?.setAttribute(
        "aria-pressed",
        "false"
      );

    }

  }


  rtlToggle?.addEventListener("click", () => {

    rtlEnabled = !rtlEnabled;

    localStorage.setItem(
      "vibeAuthRTL",
      rtlEnabled ? "true" : "false"
    );

    updateRTL();

  });


  /* =======================================================
     LOGIN FORM
     ======================================================= */

  loginForm?.addEventListener("submit", (event) => {

    event.preventDefault();


    const email =
      document.getElementById("loginEmail")?.value.trim();

    const password =
      document.getElementById("loginPassword")?.value.trim();


    if(!email || !password){

      alert("Please enter your email and password.");

      return;

    }


    alert("Login successful!");

  });


  /* =======================================================
     SIGNUP FORM
     ======================================================= */

  signupForm?.addEventListener("submit", (event) => {

    event.preventDefault();


    const password =
      document.getElementById("signupPassword")?.value;

    const confirmPassword =
      document.getElementById("signupConfirmPassword")?.value;


    if(password !== confirmPassword){

      alert("Passwords do not match.");

      return;

    }


    alert("Account created successfully!");

    openLogin();

  });


  /* =======================================================
     FORGOT PASSWORD
     ======================================================= */

  document.querySelector(".vr-forgot")?.addEventListener(
    "click",
    (event) => {

      event.preventDefault();

      alert(
        "Password reset instructions will be sent to your email."
      );

    }
  );


  /* =======================================================
     SOCIAL BUTTONS
     ======================================================= */

  document.querySelectorAll(".vr-social-btn").forEach(button => {

    button.addEventListener("click", () => {

      const provider =
        button.innerText.includes("Apple")
          ? "Apple"
          : "Google";


      alert(
        `Continue with ${provider} authentication.`
      );

    });

  });


  /* =======================================================
     INITIAL STATE
     ======================================================= */

  updateTheme();

  updateRTL();

  openLogin();

  refreshIcons();

});