document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ====================================================== */

    const navLinks = document.querySelectorAll(".vr-nav-link");
    const panels = document.querySelectorAll(".vr-panel");

    const profileBtn = document.getElementById("profileBtn");
    const profileDropdown = document.getElementById("profileDropdown");

    const notificationBtn =
        document.getElementById("notificationBtn");

    const themeToggle =
        document.getElementById("themeToggle");

    const rtlToggle =
        document.getElementById("rtlToggle");

    const mobileMenu =
        document.getElementById("vrMobileMenu");

    const sidebar =
        document.getElementById("vrSidebar");

    const sidebarClose =
        document.getElementById("vrSidebarClose");

    /* =====================================================
       LUCIDE ICONS
    ====================================================== */

    function refreshIcons() {
        if (window.lucide) {
            lucide.createIcons();
        }
    }

    /* =====================================================
       PANEL NAVIGATION
    ====================================================== */

    function openPanel(section) {
        navLinks.forEach(link => {
            link.classList.toggle(
                "active",
                link.dataset.section === section
            );
        });

        panels.forEach(panel => {
            panel.classList.toggle(
                "active",
                panel.dataset.panel === section
            );
        });

        /*
         * Sidebar intentionally does not close here.
         * It closes only through the X button.
         */
        refreshIcons();
    }

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            const section = link.dataset.section;

            if (section) {
                openPanel(section);
            }
        });
    });

    /* =====================================================
       QUICK ACTIONS
    ====================================================== */

    document
        .querySelectorAll("[data-open-panel]")
        .forEach(button => {
            button.addEventListener("click", () => {
                const section = button.dataset.openPanel;

                if (section) {
                    openPanel(section);
                }
            });
        });

    /* =====================================================
       PROFILE DROPDOWN
    ====================================================== */

    if (profileBtn) {
        profileBtn.addEventListener("click", event => {
            event.stopPropagation();

            if (profileDropdown) {
                profileDropdown.classList.toggle("show");
            }
        });
    }

    document.addEventListener("click", event => {
        if (
            profileDropdown &&
            !profileDropdown.contains(event.target) &&
            profileBtn &&
            !profileBtn.contains(event.target)
        ) {
            profileDropdown.classList.remove("show");
        }
    });

    document
        .querySelectorAll("[data-profile-action]")
        .forEach(button => {
            button.addEventListener("click", () => {
                const action = button.dataset.profileAction;

                if (profileDropdown) {
                    profileDropdown.classList.remove("show");
                }

                if (
                    action === "profile" ||
                    action === "settings"
                ) {
                    openPanel("profile");
                }

                if (action === "logout") {
                    showDashboardMessage(
                        "Logout action selected."
                    );
                }
            });
        });

    /* =====================================================
       NOTIFICATIONS
    ====================================================== */

    if (notificationBtn) {
        notificationBtn.addEventListener("click", () => {
            showDashboardMessage(
                "You have 3 notifications waiting."
            );
        });
    }

    /* =====================================================
       DARK MODE
    ====================================================== */
document.addEventListener("DOMContentLoaded", function () {

    const themeToggle = document.getElementById("themeToggle");

    if (!themeToggle) {
        console.log("Theme button not found!");
        return;
    }


    // ================================
    // UPDATE THEME ICON
    // ================================
    function updateThemeIcon() {

        const isDark =
            document.body.classList.contains("dark");

        themeToggle.innerHTML = isDark
            ? '<i data-lucide="sun"></i>'
            : '<i data-lucide="moon-star"></i>';

        // Refresh Lucide icons
        if (typeof lucide !== "undefined") {
            lucide.createIcons();
        }
    }


    // ================================
    // UPDATE LOGOS
    // ================================
    function updateDashboardLogos() {

        const isDark =
            document.body.classList.contains("dark");

        document
            .querySelectorAll("[data-light-logo]")
            .forEach(function (img) {

                const lightLogo =
                    img.getAttribute("data-light-logo");

                const darkLogo =
                    img.getAttribute("data-dark-logo");

                if (isDark && darkLogo) {
                    img.src = darkLogo;
                } 
                else if (!isDark && lightLogo) {
                    img.src = lightLogo;
                }
            });
    }


    // ================================
    // APPLY THEME
    // ================================
    function applyTheme(theme) {

        if (theme === "dark") {

            document.body.classList.add("dark");

        } else {

            document.body.classList.remove("dark");

        }


        // Save selected theme
        try {
            localStorage.setItem(
                "viberoomz-theme",
                theme
            );
        } catch (error) {
            console.log(error);
        }


        // Update everything
        updateThemeIcon();
        updateDashboardLogos();
    }


    // ================================
    // LOAD SAVED THEME
    // ================================
    let savedTheme = "light";

    try {

        const storedTheme =
            localStorage.getItem("viberoomz-theme");

        if (
            storedTheme === "dark" ||
            storedTheme === "light"
        ) {
            savedTheme = storedTheme;
        }

    } catch (error) {
        console.log(error);
    }


    // Apply saved theme
    applyTheme(savedTheme);


    // ================================
    // TOGGLE BUTTON
    // ================================
    themeToggle.addEventListener("click", function (event) {

        event.preventDefault();

        const isDark =
            document.body.classList.contains("dark");

        if (isDark) {

            // DARK → LIGHT
            applyTheme("light");

        } else {

            // LIGHT → DARK
            applyTheme("dark");

        }

    });

});
    /* =====================================================
       RTL
    ====================================================== */
document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".vr-nav-link");
    const panels = document.querySelectorAll(".vr-panel");

    const profileBtn = document.getElementById("profileBtn");
    const profileDropdown =
        document.getElementById("profileDropdown");

    const notificationBtn =
        document.getElementById("notificationBtn");

    const themeToggle =
        document.getElementById("themeToggle");

    const mobileMenu =
        document.getElementById("vrMobileMenu");

    const sidebar =
        document.getElementById("vrSidebar");

    const sidebarClose =
        document.getElementById("vrSidebarClose");

    function refreshIcons() {
        if (
            window.lucide &&
            typeof window.lucide.createIcons === "function"
        ) {
            window.lucide.createIcons();
        }
    }

    /* =====================================================
       PANEL NAVIGATION
    ====================================================== */

    function openPanel(section) {
        navLinks.forEach(link => {
            link.classList.toggle(
                "active",
                link.dataset.section === section
            );
        });

        panels.forEach(panel => {
            panel.classList.toggle(
                "active",
                panel.dataset.panel === section
            );
        });

        refreshIcons();
    }

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            const section = link.dataset.section;

            if (section) {
                openPanel(section);
            }
        });
    });

    document
        .querySelectorAll("[data-open-panel]")
        .forEach(button => {
            button.addEventListener("click", () => {
                const section = button.dataset.openPanel;

                if (section) {
                    openPanel(section);
                }
            });
        });

    /* =====================================================
       PROFILE DROPDOWN
    ====================================================== */

    if (profileBtn) {
        profileBtn.addEventListener("click", event => {
            event.stopPropagation();

            if (profileDropdown) {
                profileDropdown.classList.toggle("show");
            }
        });
    }

    document.addEventListener("click", event => {
        if (
            profileDropdown &&
            !profileDropdown.contains(event.target) &&
            profileBtn &&
            !profileBtn.contains(event.target)
        ) {
            profileDropdown.classList.remove("show");
        }
    });

    document
        .querySelectorAll("[data-profile-action]")
        .forEach(button => {
            button.addEventListener("click", () => {
                const action = button.dataset.profileAction;

                if (profileDropdown) {
                    profileDropdown.classList.remove("show");
                }

                if (
                    action === "profile" ||
                    action === "settings"
                ) {
                    openPanel("profile");
                }

                if (action === "logout") {
                    showDashboardMessage(
                        "Logout action selected."
                    );
                }
            });
        });

    /* =====================================================
       NOTIFICATIONS
    ====================================================== */

    if (notificationBtn) {
        notificationBtn.addEventListener("click", () => {
            showDashboardMessage(
                "You have 3 notifications waiting."
            );
        });
    }

    /* =====================================================
       THEME SYNC WITH MAIN.JS
    ====================================================== */

    function updateThemeIcon() {
        if (!themeToggle) {
            return;
        }

        const isDark =
            document.body.classList.contains("dark");

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

        refreshIcons();
    }

    function updateDashboardLogos() {
        const isDark =
            document.body.classList.contains("dark");

        document
            .querySelectorAll("img[data-light-logo]")
            .forEach(img => {
                const lightLogo =
                    img.getAttribute("data-light-logo");

                const darkLogo =
                    img.getAttribute("data-dark-logo");

                if (isDark && darkLogo) {
                    img.src = darkLogo;
                } else if (lightLogo) {
                    img.src = lightLogo;
                }
            });
    }

    function syncTheme() {
        updateThemeIcon();
        updateDashboardLogos();
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            requestAnimationFrame(syncTheme);
        });
    }

    /* =====================================================
       RTL SYNC WITH MAIN.JS
    ====================================================== */

    function syncDirection() {
        const direction =
            document.documentElement.getAttribute("dir") || "ltr";

        const isRTL = direction === "rtl";

        const header =
            document.querySelector(".vr-dashboard-header");

        const headerActions =
            document.querySelector(".vr-header-actions");

        navLinks.forEach(link => {
            link.style.direction = direction;
            link.style.textAlign = isRTL ? "right" : "left";
        });

        if (header) {
            header.style.direction = direction;
        }

        if (headerActions) {
            headerActions.style.direction = direction;
        }

        if (profileDropdown) {
            profileDropdown.style.right =
                isRTL ? "auto" : "0";

            profileDropdown.style.left =
                isRTL ? "0" : "auto";
        }

        syncSidebarPosition();
    }

    function syncSidebarPosition() {
        if (!sidebar) {
            return;
        }

        const direction =
            document.documentElement.getAttribute("dir") || "ltr";

        const isRTL = direction === "rtl";
        const isMobile = window.innerWidth <= 1024;
        const isOpen =
            sidebar.classList.contains("mobile-open");

        if (!isMobile) {
            sidebar.style.left = isRTL ? "auto" : "18px";
            sidebar.style.right = isRTL ? "18px" : "auto";
            return;
        }

        if (isRTL) {
            sidebar.style.left = "auto";
            sidebar.style.right =
                isOpen ? "18px" : "-290px";
        } else {
            sidebar.style.right = "auto";
            sidebar.style.left =
                isOpen ? "18px" : "-290px";
        }
    }

    const directionObserver =
        new MutationObserver(() => {
            syncDirection();
        });

    directionObserver.observe(
        document.documentElement,
        {
            attributes: true,
            attributeFilter: ["dir"]
        }
    );

    /* =====================================================
       MOBILE SIDEBAR
    ====================================================== */

    function openMobileSidebar() {
        if (!sidebar) {
            return;
        }

        sidebar.classList.add("mobile-open");

        syncSidebarPosition();
        refreshIcons();
    }

    function closeMobileSidebar() {
        if (!sidebar) {
            return;
        }

        sidebar.classList.remove("mobile-open");

        syncSidebarPosition();
    }

    if (mobileMenu) {
        mobileMenu.addEventListener(
            "click",
            openMobileSidebar
        );
    }

    if (sidebarClose) {
        sidebarClose.addEventListener(
            "click",
            closeMobileSidebar
        );
    }

    window.addEventListener("resize", () => {
        syncDirection();
    });

    /* =====================================================
       TOAST MESSAGE
    ====================================================== */

    function showDashboardMessage(message) {
        const oldToast =
            document.querySelector(".vr-dashboard-toast");

        if (oldToast) {
            oldToast.remove();
        }

        const toast =
            document.createElement("div");

        toast.className =
            "vr-dashboard-toast";

        toast.textContent = message;

        toast.style.position = "fixed";
        toast.style.bottom = "22px";
        toast.style.right = "22px";
        toast.style.zIndex = "5000";
        toast.style.padding = "13px 18px";
        toast.style.borderRadius = "14px";
        toast.style.background = "var(--card-bg)";
        toast.style.color = "var(--text)";
        toast.style.border = "1px solid var(--primary)";
        toast.style.boxShadow =
            "0 10px 30px rgba(0, 0, 0, .15)";
        toast.style.fontSize = "20px";
        toast.style.fontWeight = "600";

        document.body.appendChild(toast);

        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 2500);
    }

    /* =====================================================
       INITIAL STATE
    ====================================================== */

    openPanel("dashboard");
    syncTheme();
    syncDirection();
    refreshIcons();
});
    /* =====================================================
       MOBILE SIDEBAR
    ====================================================== */

    function openMobileSidebar() {
        if (!sidebar) {
            return;
        }

        sidebar.classList.add("mobile-open");

        updateRTL();
        refreshIcons();
    }

    function closeMobileSidebar() {
        if (!sidebar) {
            return;
        }

        sidebar.classList.remove("mobile-open");

        updateRTL();
    }

    if (mobileMenu) {
        mobileMenu.addEventListener(
            "click",
            openMobileSidebar
        );
    }

    if (sidebarClose) {
        sidebarClose.addEventListener(
            "click",
            closeMobileSidebar
        );
    }

    window.addEventListener("resize", () => {
        updateRTL();
    });

    /* =====================================================
       TOAST MESSAGE
    ====================================================== */

    function showDashboardMessage(message) {
        const existingToast =
            document.querySelector(".vr-dashboard-toast");

        if (existingToast) {
            existingToast.remove();
        }

        const toast =
            document.createElement("div");

        toast.className =
            "vr-dashboard-toast";

        toast.textContent = message;

        toast.style.position = "fixed";
        toast.style.bottom = "22px";
        toast.style.right = "22px";
        toast.style.zIndex = "5000";
        toast.style.padding = "13px 18px";
        toast.style.borderRadius = "14px";
        toast.style.background = "var(--card-bg)";
        toast.style.color = "var(--text)";
        toast.style.border = "1px solid var(--primary)";
        toast.style.boxShadow =
            "0 10px 30px rgba(0, 0, 0, .15)";
        toast.style.fontSize = "20px";
        toast.style.fontWeight = "600";

        document.body.appendChild(toast);

        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 2500);
    }

    /* =====================================================
       INITIAL STATE
    ====================================================== */

    openPanel("dashboard");
    updateRTL();
    refreshIcons();
});