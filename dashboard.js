document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       LUCIDE ICONS
       ===================================================== */

    function refreshIcons() {
        if (window.lucide) {
            lucide.createIcons();
        }
    }

    refreshIcons();

    /* =====================================================
       SIDEBAR / PANELS
       ===================================================== */

    const navLinks = document.querySelectorAll(".vr-nav-link");
    const panels = document.querySelectorAll(".vr-panel");

    function openPanel(section) {
        navLinks.forEach(link => {
            if (link.dataset.section === section) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });

        panels.forEach(panel => {
            if (panel.dataset.panel === section) {
                panel.classList.add("active");
            } else {
                panel.classList.remove("active");
            }
        });

        closeMobileSidebar();
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
       ===================================================== */

    document.querySelectorAll("[data-open-panel]").forEach(button => {
        button.addEventListener("click", () => {
            const section = button.dataset.openPanel;
            if (section) {
                openPanel(section);
            }
        });
    });

    /* =====================================================
       PROFILE DROPDOWN
       ===================================================== */

    const profileBtn = document.getElementById("profileBtn");
    const profileDropdown = document.getElementById("profileDropdown");

    if (profileBtn) {
        profileBtn.addEventListener("click", (event) => {
            event.stopPropagation();
            if (profileDropdown) {
                profileDropdown.classList.toggle("show");
            }
        });
    }

    document.addEventListener("click", (event) => {
        if (profileDropdown && !profileDropdown.contains(event.target) && profileBtn && !profileBtn.contains(event.target)) {
            profileDropdown.classList.remove("show");
        }
    });

    document.querySelectorAll("[data-profile-action]").forEach(button => {
        button.addEventListener("click", () => {
            const action = button.dataset.profileAction;
            
            if (profileDropdown) {
                profileDropdown.classList.remove("show");
            }

            if (action === "profile" || action === "settings") {
                openPanel("profile");
            } else if (action === "logout") {
                showDashboardMessage("Logout action selected.");
            }
        });
    });

    /* =====================================================
       NOTIFICATION
       ===================================================== */

    const notificationBtn = document.getElementById("notificationBtn");

    if (notificationBtn) {
        notificationBtn.addEventListener("click", () => {
            showDashboardMessage("You have 3 notifications waiting.");
        });
    }

    /* =====================================================
       DARK MODE
       ===================================================== */
const themeToggle = document.getElementById("themeToggle");

/* =====================================================
REFRESH LUCIDE ICONS
===================================================== */

function refreshIcons() {
if (window.lucide) {
lucide.createIcons();
}
}

/* =====================================================
THEME ICON
===================================================== */

function updateThemeIcon() {

```
if (!themeToggle) return;

const isDark = document.body.classList.contains("dark");

themeToggle.innerHTML = isDark
    ? '<i data-lucide="sun"></i>'
    : '<i data-lucide="moon-star"></i>';

refreshIcons();
```

}

/* =====================================================
LOGO SWITCH
===================================================== */

function updateDashboardLogos() {

```
const isDark = document.body.classList.contains("dark");

document
    .querySelectorAll(".vr-dashboard img[data-light-logo]")
    .forEach(img => {

        const lightLogo = img.dataset.lightLogo;
        const darkLogo = img.dataset.darkLogo;

        if (isDark && darkLogo) {
            img.src = darkLogo;
        } else if (lightLogo) {
            img.src = lightLogo;
        }

    });
```

}

/* =====================================================
APPLY THEME
===================================================== */

function applyTheme(theme) {

```
if (theme === "dark") {
    document.body.classList.add("dark");
} else {
    document.body.classList.remove("dark");
}

try {
    localStorage.setItem("viberoomz-theme", theme);
} catch (error) {
    console.log("LocalStorage error");
}

updateThemeIcon();
updateDashboardLogos();
```

}

/* =====================================================
THEME TOGGLE
===================================================== */

if (themeToggle) {

```
themeToggle.addEventListener("click", function () {

    const isDark = document.body.classList.contains("dark");

    // Dark mode lo unte Light mode ki
    // Light mode lo unte Dark mode ki
    if (isDark) {
        applyTheme("light");
    } else {
        applyTheme("dark");
    }

});
```

}

/* =====================================================
LOAD SAVED THEME
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

```
let savedTheme = "light";

try {
    savedTheme = localStorage.getItem("viberoomz-theme") || "light";
} catch (error) {
    console.log("LocalStorage error");
}

applyTheme(savedTheme);
```

});

    /* =====================================================
       RTL
       ===================================================== */

    const rtlToggle = document.getElementById("rtlToggle");
    let rtlEnabled = false;

    try {
        const savedRTL = localStorage.getItem("viberoomz-rtl");
        rtlEnabled = (savedRTL === "true");
    } catch (error) {
        console.log("LocalStorage error");
    }

    function updateRTL() {
        const sidebar = document.getElementById("vrSidebar");
        const area = document.querySelector(".vr-dashboard-area");
        const header = document.querySelector(".vr-dashboard-header");
        const profileDropdown = document.getElementById("profileDropdown");
        const headerActions = document.querySelector(".vr-header-actions");
        const navLinks = document.querySelectorAll(".vr-nav-link");
        const isMobile = window.innerWidth <= 900;

        if (rtlEnabled) {
            document.documentElement.setAttribute("dir", "rtl");
        } else {
            document.documentElement.setAttribute("dir", "ltr");
        }

        if (rtlToggle) {
            rtlToggle.setAttribute("aria-pressed", rtlEnabled ? "true" : "false");
        }

        if (sidebar) {
            if (rtlEnabled) {
                sidebar.style.left = "auto";
                if (isMobile) {
                    sidebar.style.right = sidebar.classList.contains("mobile-open") ? "18px" : "-290px";
                } else {
                    sidebar.style.right = "18px";
                }
            } else {
                sidebar.style.right = "auto";
                if (isMobile) {
                    sidebar.style.left = sidebar.classList.contains("mobile-open") ? "18px" : "-290px";
                } else {
                    sidebar.style.left = "18px";
                }
            }
        }

        if (area) {
            if (isMobile) {
                area.style.marginLeft = "0";
                area.style.marginRight = "0";
            } else if (rtlEnabled) {
                area.style.marginLeft = "0";
                area.style.marginRight = "calc(var(--vr-sidebar-width) + 36px)";
            } else {
                area.style.marginRight = "0";
                area.style.marginLeft = "calc(var(--vr-sidebar-width) + 36px)";
            }
        }

        if (header) {
            if (rtlEnabled) {
                header.style.direction = "rtl";
            } else {
                header.style.direction = "ltr";
            }
        }

        if (headerActions) {
            if (rtlEnabled) {
                headerActions.style.direction = "rtl";
            } else {
                headerActions.style.direction = "ltr";
            }
        }

        if (profileDropdown) {
            if (rtlEnabled) {
                profileDropdown.style.right = "auto";
                profileDropdown.style.left = "0";
            } else {
                profileDropdown.style.right = "0";
                profileDropdown.style.left = "auto";
            }
        }

        navLinks.forEach(link => {
            if (rtlEnabled) {
                link.style.textAlign = "right";
                link.style.direction = "rtl";
            } else {
                link.style.textAlign = "left";
                link.style.direction = "ltr";
            }
        });
    }

    if (rtlToggle) {
        rtlToggle.addEventListener("click", () => {
            rtlEnabled = !rtlEnabled;

            try {
                localStorage.setItem("viberoomz-rtl", rtlEnabled ? "true" : "false");
            } catch (error) {
                console.log("LocalStorage error");
            }

            updateRTL();
        });
    }

    /* =====================================================
       MOBILE SIDEBAR
       ===================================================== */

    const mobileMenu = document.getElementById("vrMobileMenu");
    const sidebar = document.getElementById("vrSidebar");

    function openMobileSidebar() {
        if (sidebar) {
            sidebar.classList.add("mobile-open");
            updateRTL();
        }
    }

    function closeMobileSidebar() {
        if (sidebar) {
            sidebar.classList.remove("mobile-open");
            updateRTL();
        }
    }

    if (mobileMenu) {
        mobileMenu.addEventListener("click", openMobileSidebar);
    }

    /* =====================================================
       RESIZE
       ===================================================== */

    window.addEventListener("resize", () => {
        updateRTL();
    });

    /* =====================================================
       SIMPLE MESSAGE (TOAST)
       ===================================================== */

    function showDashboardMessage(message) {
        const old = document.querySelector(".vr-dashboard-toast");
        if (old) {
            old.remove();
        }

        const toast = document.createElement("div");
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
        toast.style.boxShadow = "0 10px 30px rgba(0,0,0,.15)";
        toast.style.fontSize = "20px";
        toast.style.fontWeight = "600";

        document.body.appendChild(toast);

        setTimeout(() => {
            if (toast && toast.parentNode) {
                toast.remove();
            }
        }, 2500);
    }

    /* =====================================================
       DEFAULT PANEL
       ===================================================== */

    openPanel("dashboard");
    updateRTL();
    refreshIcons();
});