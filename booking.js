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

    const html = document.documentElement;
    const body = document.body;

    const THEME_KEY = "theme";
    const DIRECTION_KEY = "direction";

    /* =========================================
       STORAGE
    ========================================= */

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

            /*
             * Updates other scripts on the same page.
             */
            window.dispatchEvent(
                new CustomEvent("viberoomz-storage-change", {
                    detail: {
                        key,
                        value
                    }
                })
            );
        } catch (error) {
            console.log("Storage error:", error);
        }
    }

    /* =========================================
       LUCIDE
    ========================================= */

    function refreshIcons() {
        if (
            window.lucide &&
            typeof window.lucide.createIcons === "function"
        ) {
            window.lucide.createIcons();
        }
    }

    /* =========================================
       THEME
    ========================================= */

    function updateLogo(isDark) {
        if (!bookingLogo) {
            return;
        }

        const lightLogo =
            bookingLogo.dataset.lightLogo;

        const darkLogo =
            bookingLogo.dataset.darkLogo;

        if (isDark && darkLogo) {
            bookingLogo.src = darkLogo;
        } else if (!isDark && lightLogo) {
            bookingLogo.src = lightLogo;
        }
    }

    function updateTheme(theme) {
        const isDark = theme === "dark";

        body.classList.toggle("dark", isDark);

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

        updateLogo(isDark);
        refreshIcons();
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const currentTheme =
                body.classList.contains("dark")
                    ? "dark"
                    : "light";

            const newTheme =
                currentTheme === "dark"
                    ? "light"
                    : "dark";

            setStorage(THEME_KEY, newTheme);
            updateTheme(newTheme);
        });
    }

    /* =========================================
       RTL
    ========================================= */

    function updateRTL(direction) {
        const isRTL = direction === "rtl";

        html.setAttribute(
            "dir",
            isRTL ? "rtl" : "ltr"
        );

        body.setAttribute(
            "dir",
            isRTL ? "rtl" : "ltr"
        );

        if (bookingPage) {
            bookingPage.setAttribute(
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

    if (rtlToggle) {
        rtlToggle.addEventListener("click", () => {
            const currentDirection =
                html.getAttribute("dir") || "ltr";

            const newDirection =
                currentDirection === "rtl"
                    ? "ltr"
                    : "rtl";

            setStorage(DIRECTION_KEY, newDirection);
            updateRTL(newDirection);
        });
    }

    /* =========================================
       SAME-PAGE SYNC
    ========================================= */

    window.addEventListener(
        "viberoomz-storage-change",
        event => {
            const key = event.detail?.key;
            const value = event.detail?.value;

            if (key === THEME_KEY) {
                updateTheme(value || "light");
            }

            if (key === DIRECTION_KEY) {
                updateRTL(value || "ltr");
            }
        }
    );

    /* =========================================
       OTHER TAB / PAGE SYNC
    ========================================= */

    window.addEventListener("storage", event => {
        if (event.key === THEME_KEY) {
            updateTheme(event.newValue || "light");
        }

        if (event.key === DIRECTION_KEY) {
            updateRTL(event.newValue || "ltr");
        }
    });

    /* =========================================
       MINIMUM DATE
    ========================================= */

    if (bookingDate) {
        const today =
            new Date().toISOString().split("T")[0];

        bookingDate.min = today;
    }

    /* =========================================
       BOOKING SUBMIT
    ========================================= */

    bookingForm?.addEventListener("submit", event => {
        event.preventDefault();

        const name =
            document
                .getElementById("bookingName")
                ?.value
                .trim();

        const email =
            document
                .getElementById("bookingEmail")
                ?.value
                .trim();

        const phone =
            document
                .getElementById("bookingPhone")
                ?.value
                .trim();

        const room =
            document.getElementById("bookingRoom")?.value;

        const date =
            document.getElementById("bookingDate")?.value;

        const time =
            document.getElementById("bookingTime")?.value;

        const guests =
            document.getElementById("bookingGuests")?.value;

        if (
            !name ||
            !email ||
            !phone ||
            !room ||
            !date ||
            !time ||
            !guests
        ) {
            alert(
                "Please complete all booking details."
            );
            return;
        }

        alert(
            "Booking details saved successfully!"
        );
    });

    /* =========================================
       INITIALIZE
    ========================================= */

    const savedTheme =
        getStorage(THEME_KEY) ||
        (window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches
            ? "dark"
            : "light");

    const savedDirection =
        getStorage(DIRECTION_KEY) || "ltr";

    updateTheme(savedTheme);
    updateRTL(savedDirection);
    refreshIcons();
});