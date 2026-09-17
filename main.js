const memoryStore = {
  theme: null,
  direction: null
};

const safeStorage = {
  get(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (error) {
      return memoryStore[key] || null;
    }
  },

  set(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (error) {
      memoryStore[key] = value;
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const html = document.documentElement;
  const body = document.body;

  const rtlButton = document.getElementById("rtlToggle");
  const themeButton = document.getElementById("themeToggle");
  const menuButton = document.getElementById("menuToggle");
  const primaryMenu = document.getElementById("primaryMenu");

  const headerLogo = document.getElementById("siteLogo");
  const footerLogo = document.getElementById("footerLogo");
  const footerYear = document.getElementById("footerYear");

  const dropdowns = document.querySelectorAll(".dropdown");
  const mobileBreakpoint = 1024;

  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }

  function refreshIcons() {
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  }

  function updateLogo(isDark) {
    [headerLogo, footerLogo].forEach((logo) => {
      if (!logo) return;

      const lightLogo = logo.dataset.lightLogo;
      const darkLogo = logo.dataset.darkLogo;

      if (lightLogo && darkLogo) {
        logo.src = isDark ? darkLogo : lightLogo;
      }
    });
  }

  function setTheme(theme) {
    const isDark = theme === "dark";

    body.classList.toggle("dark", isDark);
    updateLogo(isDark);

    if (themeButton) {
      themeButton.innerHTML = isDark
        ? '<i data-lucide="sun-medium"></i>'
        : '<i data-lucide="moon-star"></i>';

      themeButton.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode"
      );

      themeButton.setAttribute("aria-pressed", String(isDark));
    }

    refreshIcons();
  }

  function setDirection(direction) {
    const isRTL = direction === "rtl";

    html.setAttribute("dir", isRTL ? "rtl" : "ltr");

    if (rtlButton) {
      rtlButton.innerHTML = '<i data-lucide="arrow-right-left"></i>';

      rtlButton.setAttribute(
        "aria-label",
        isRTL
          ? "Switch to left-to-right layout"
          : "Switch to right-to-left layout"
      );

      rtlButton.setAttribute("aria-pressed", String(isRTL));
    }

    refreshIcons();
  }

  function normalizeFile(path) {
    return (path || "")
      .split("?")[0]
      .split("#")[0]
      .split("/")
      .pop()
      .toLowerCase();
  }

  function clearActiveStates() {
    document
      .querySelectorAll(".menu a, .login-btn, .mobile-login-item a")
      .forEach((link) => {
        link.classList.remove("active");
        link.removeAttribute("aria-current");
      });
  }

  function setActive(link) {
    if (!link) return;

    link.classList.add("active");
    link.setAttribute("aria-current", "page");
  }

  function setActiveMenu() {
    clearActiveStates();

    const currentPage =
      normalizeFile(window.location.pathname) || "index.html";

    const topLevelLinks = document.querySelectorAll(".menu > li > a");
    const dropdownLinks = document.querySelectorAll(".dropdown-menu a");

    const desktopLogin = document.querySelector(".desktop-login");
    const mobileLogin = document.querySelector(".mobile-login-item a");

    const findMatch = (links) => {
      for (const link of links) {
        const hrefPage = normalizeFile(link.getAttribute("href"));
        const dataPage = normalizeFile(link.dataset.page);

        if (hrefPage === currentPage || dataPage === currentPage) {
          return link;
        }
      }

      return null;
    };

    if (currentPage === "login.html") {
      setActive(desktopLogin);
      setActive(mobileLogin);
      return;
    }

    const matchedDropdownLink = findMatch(dropdownLinks);

    if (matchedDropdownLink) {
      setActive(matchedDropdownLink);

      const parentDropdown = matchedDropdownLink.closest(".dropdown");
      const parentTrigger = parentDropdown?.querySelector(":scope > a");

      setActive(parentTrigger);
      return;
    }

    setActive(findMatch(topLevelLinks));
  }

  function closeAllDropdowns() {
    dropdowns.forEach((dropdown) => {
      dropdown.classList.remove("open");

      const trigger = dropdown.querySelector(":scope > a");

      if (trigger) {
        trigger.setAttribute("aria-expanded", "false");
      }
    });
  }

  function closeMenu() {
    if (!primaryMenu || !menuButton) return;

    primaryMenu.classList.remove("active");
    primaryMenu.setAttribute("aria-hidden", "true");

    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open menu");
    menuButton.innerHTML = '<i data-lucide="menu"></i>';

    body.classList.remove("menu-open");

    closeAllDropdowns();
    refreshIcons();
  }

  function openMenu() {
    if (!primaryMenu || !menuButton) return;

    primaryMenu.classList.add("active");
    primaryMenu.setAttribute("aria-hidden", "false");

    menuButton.setAttribute("aria-expanded", "true");
    menuButton.setAttribute("aria-label", "Close menu");
    menuButton.innerHTML = '<i data-lucide="x"></i>';

    body.classList.add("menu-open");

    refreshIcons();
  }

  function toggleMenu(event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (!primaryMenu) return;

    const isOpen = primaryMenu.classList.contains("active");

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  if (primaryMenu) {
    primaryMenu.setAttribute(
      "aria-hidden",
      window.innerWidth <= mobileBreakpoint ? "true" : "false"
    );
  }

  if (menuButton) {
    menuButton.addEventListener("click", toggleMenu);
  }

  dropdowns.forEach((dropdown, index) => {
    const trigger = dropdown.querySelector(":scope > a");
    const submenu = dropdown.querySelector(".dropdown-menu");

    if (!trigger || !submenu) return;

    if (!submenu.id) {
      submenu.id = `dropdown-menu-${index + 1}`;
    }

    trigger.setAttribute("aria-haspopup", "true");
    trigger.setAttribute("aria-expanded", "false");
    trigger.setAttribute("aria-controls", submenu.id);

    trigger.addEventListener("click", (event) => {
      if (window.innerWidth > mobileBreakpoint) return;

      event.preventDefault();
      event.stopPropagation();

      const isOpen = dropdown.classList.contains("open");

      closeAllDropdowns();

      if (!isOpen) {
        dropdown.classList.add("open");
        trigger.setAttribute("aria-expanded", "true");
      }
    });
  });

  document
    .querySelectorAll(".menu a, .desktop-login, .mobile-login-item a")
    .forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth > mobileBreakpoint) return;

        const isDropdownTrigger =
          link.closest(".dropdown")?.querySelector(":scope > a") === link;

        if (!isDropdownTrigger) {
          closeMenu();
        }
      });
    });

  document.addEventListener("click", (event) => {
    const clickedInsideHeader = event.target.closest(".header");

    if (!clickedInsideHeader) {
      closeAllDropdowns();

      if (window.innerWidth <= mobileBreakpoint) {
        closeMenu();
      }
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  if (rtlButton) {
    rtlButton.addEventListener("click", () => {
      const currentDirection = html.getAttribute("dir") || "ltr";
      const newDirection = currentDirection === "rtl" ? "ltr" : "rtl";

      setDirection(newDirection);
      safeStorage.set("direction", newDirection);
    });
  }

  if (themeButton) {
    themeButton.addEventListener("click", () => {
      const newTheme = body.classList.contains("dark") ? "light" : "dark";

      setTheme(newTheme);
      safeStorage.set("theme", newTheme);
    });
  }

  const savedDirection = safeStorage.get("direction") || "ltr";

  const savedTheme =
    safeStorage.get("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");

  setDirection(savedDirection);
  setTheme(savedTheme);
  setActiveMenu();

  window.addEventListener("resize", () => {
    if (window.innerWidth > mobileBreakpoint) {
      closeMenu();

      if (primaryMenu) {
        primaryMenu.setAttribute("aria-hidden", "false");
      }
    } else if (
      primaryMenu &&
      !primaryMenu.classList.contains("active")
    ) {
      primaryMenu.setAttribute("aria-hidden", "true");
    }
  });

  refreshIcons();
});