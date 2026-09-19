/* =========================================================
   VIBEROOMZ AUTH PAGE JS
   Shared theme + RTL with main.js and dashboard.js
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

    const authPage =
        document.querySelector(".vr-auth-page");

    const authLogo =
        document.getElementById("authLogo");

    const signupLogo =
        document.querySelector(".authSignupLogo");

    const html = document.documentElement;
    const body = document.body;

    /* =======================================================
       SHARED STORAGE KEYS
       These must match main.js
    ======================================================= */

    const THEME_KEY = "theme";
    const DIRECTION_KEY = "direction";

    function getStorage(key, fallback = null) {
        try {
            return localStorage.getItem(key) || fallback;
        } catch (error) {
            return fallback;
        }
    }

    function setStorage(key, value) {
        try {
            localStorage.setItem(key, value);
        } catch (error) {
            console.log("Storage error:", error);
        }
    }

    /* =======================================================
       LUCIDE ICONS
    ======================================================= */

    function refreshIcons() {
        if (
            window.lucide &&
            typeof window.lucide.createIcons === "function"
        ) {
            window.lucide.createIcons();
        }
    }

    /* =======================================================
       LOGIN / SIGNUP SWITCH
    ======================================================= */

    function openSignup() {
        if (loginCard) {
            loginCard.style.display = "none";
        }

        if (signupCard) {
            signupCard.style.display = "block";
        }

        refreshIcons();
    }

    function openLogin() {
        if (signupCard) {
            signupCard.style.display = "none";
        }

        if (loginCard) {
            loginCard.style.display = "block";
        }

        refreshIcons();
    }

    showSignup?.addEventListener("click", event => {
        event.preventDefault();
        openSignup();
    });

    showLogin?.addEventListener("click", event => {
        event.preventDefault();
        openLogin();
    });

    /* =======================================================
       PASSWORD VISIBILITY
    ======================================================= */

    function setupPasswordToggle(buttonId, inputId) {
        const button =
            document.getElementById(buttonId);

        const input =
            document.getElementById(inputId);

        if (!button || !input) {
            return;
        }

        button.addEventListener("click", () => {
            const isPassword =
                input.type === "password";

            input.type =
                isPassword ? "text" : "password";

            button.setAttribute(
                "aria-label",
                isPassword
                    ? "Hide password"
                    : "Show password"
            );

            button.setAttribute(
                "aria-pressed",
                String(isPassword)
            );

            button.innerHTML = isPassword
                ? '<i data-lucide="eye-off"></i>'
                : '<i data-lucide="eye"></i>';

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
       Shared with main.js and dashboard.js
    ======================================================= */

    function updateLogos(isDark) {
        [authLogo, signupLogo].forEach(logo => {
            if (!logo) {
                return;
            }

            const lightLogo =
                logo.dataset.lightLogo;

            const darkLogo =
                logo.dataset.darkLogo;

            if (isDark && darkLogo) {
                logo.src = darkLogo;
            } else if (!isDark && lightLogo) {
                logo.src = lightLogo;
            }
        });
    }

    function applyTheme(theme) {
        const isDark = theme === "dark";

        body.classList.toggle("dark", isDark);

        updateLogos(isDark);

        if (themeToggle) {
            themeToggle.innerHTML = isDark
                ? '<i data-lucide="sun-medium"></i>'
                : '<i data-lucide="moon-star"></i>';

            themeToggle.setAttribute(
                "aria-label",
                isDark
                    ? "Switch to light mode"
                    : "Switch to dark mode"
            );

            themeToggle.setAttribute(
                "aria-pressed",
                String(isDark)
            );
        }

        refreshIcons();
    }

    themeToggle?.addEventListener("click", () => {
        const currentTheme =
            body.classList.contains("dark")
                ? "dark"
                : "light";

        const newTheme =
            currentTheme === "dark"
                ? "light"
                : "dark";

        setStorage(THEME_KEY, newTheme);
        applyTheme(newTheme);

        /*
         * Custom event updates other scripts
         * in the same page immediately.
         */
        window.dispatchEvent(
            new CustomEvent("viberoomz-theme-change", {
                detail: {
                    theme: newTheme
                }
            })
        );
    });

    window.addEventListener(
        "viberoomz-theme-change",
        event => {
            const theme =
                event.detail?.theme || "light";

            applyTheme(theme);
        }
    );

    /* =======================================================
       RTL
       Shared with main.js and dashboard.js
    ======================================================= */

    function applyDirection(direction) {
        const isRTL = direction === "rtl";

        html.setAttribute(
            "dir",
            isRTL ? "rtl" : "ltr"
        );

        if (authPage) {
            authPage.setAttribute(
                "dir",
                isRTL ? "rtl" : "ltr"
            );
        }

        if (rtlToggle) {
            rtlToggle.innerHTML =
                '<i data-lucide="arrow-right-left"></i>';

            rtlToggle.setAttribute(
                "aria-label",
                isRTL
                    ? "Switch to left-to-right layout"
                    : "Switch to right-to-left layout"
            );

            rtlToggle.setAttribute(
                "aria-pressed",
                String(isRTL)
            );
        }

        refreshIcons();
    }

    rtlToggle?.addEventListener("click", () => {
        const currentDirection =
            html.getAttribute("dir") || "ltr";

        const newDirection =
            currentDirection === "rtl"
                ? "ltr"
                : "rtl";

        setStorage(DIRECTION_KEY, newDirection);
        applyDirection(newDirection);

        /*
         * Custom event updates other scripts
         * in the same page immediately.
         */
        window.dispatchEvent(
            new CustomEvent("viberoomz-direction-change", {
                detail: {
                    direction: newDirection
                }
            })
        );
    });

    window.addEventListener(
        "viberoomz-direction-change",
        event => {
            const direction =
                event.detail?.direction || "ltr";

            applyDirection(direction);
        }
    );

    /* =======================================================
       LOGIN FORM
    ======================================================= */

    loginForm?.addEventListener("submit", event => {
        event.preventDefault();

        const email =
            document
                .getElementById("loginEmail")
                ?.value
                .trim();

        const password =
            document
                .getElementById("loginPassword")
                ?.value
                .trim();

        if (!email || !password) {
            alert(
                "Please enter your email and password."
            );
            return;
        }

        alert("Login successful!");
    });

    /* =======================================================
       SIGNUP FORM
    ======================================================= */

    signupForm?.addEventListener("submit", event => {
        event.preventDefault();

        const password =
            document
                .getElementById("signupPassword")
                ?.value;

        const confirmPassword =
            document
                .getElementById("signupConfirmPassword")
                ?.value;

        if (!password || !confirmPassword) {
            alert("Please fill in all password fields.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        alert("Account created successfully!");
        openLogin();
    });

    /* =======================================================
       FORGOT PASSWORD
    ======================================================= */

    document
        .querySelector(".vr-forgot")
        ?.addEventListener("click", event => {
            event.preventDefault();

            alert(
                "Password reset instructions will be sent to your email."
            );
        });

    /* =======================================================
       SOCIAL BUTTONS
    ======================================================= */

    document
        .querySelectorAll(".vr-social-btn")
        .forEach(button => {
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
       SYNC WHEN ANOTHER PAGE/TAB CHANGES STORAGE
    ======================================================= */

    window.addEventListener("storage", event => {
        if (event.key === THEME_KEY) {
            applyTheme(event.newValue || "light");
        }

        if (event.key === DIRECTION_KEY) {
            applyDirection(event.newValue || "ltr");
        }
    });

    /* =======================================================
       INITIAL STATE
    ======================================================= */

    const savedTheme =
        getStorage(THEME_KEY) ||
        (window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches
            ? "dark"
            : "light");

    const savedDirection =
        getStorage(DIRECTION_KEY) || "ltr";

    applyTheme(savedTheme);
    applyDirection(savedDirection);
    openLogin();
    refreshIcons();
});