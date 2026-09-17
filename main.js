const memoryStore = { theme: null, direction: null };

const safeStorage = {
  get(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (e) {
      return memoryStore[key] || null;
    }
  },
  set(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (e) {
      memoryStore[key] = value;
    }
  },
};

document.addEventListener("DOMContentLoaded", () => {
  const rtlBtn = document.getElementById("rtlToggle");
  const themeBtn = document.getElementById("themeToggle");
  const menuToggle = document.getElementById("menuToggle");
  const primaryMenu = document.getElementById("primaryMenu");
  const dropdowns = document.querySelectorAll(".dropdown");
  const headerLogo = document.getElementById("siteLogo");
  const footerLogo = document.getElementById("footerLogo");
  const footerYear = document.getElementById("footerYear");

  if (footerYear) footerYear.textContent = new Date().getFullYear();

  function updateLogoByTheme(isDark) {
    [headerLogo, footerLogo].forEach((logo) => {
      if (!logo) return;
      const lightLogo = logo.dataset.lightLogo;
      const darkLogo = logo.dataset.darkLogo;
      if (lightLogo && darkLogo) logo.src = isDark ? darkLogo : lightLogo;
    });
  }

  function setTheme(theme) {
    const isDark = theme === "dark";
    document.body.classList.toggle("dark", isDark);
    updateLogoByTheme(isDark);

    if (themeBtn) {
      themeBtn.innerHTML = isDark
        ? '<i data-lucide="sun-medium"></i>'
        : '<i data-lucide="moon-star"></i>';

      themeBtn.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode"
      );
      themeBtn.setAttribute("aria-pressed", String(isDark));
      if (window.lucide) lucide.createIcons();
    }
  }

  function setDirection(direction) {
    const isRTL = direction === "rtl";
    document.documentElement.setAttribute("dir", direction);

    if (rtlBtn) {
      rtlBtn.innerHTML = '<i data-lucide="arrow-right-left"></i>';
      rtlBtn.setAttribute(
        "aria-label",
        isRTL ? "Switch to left to right layout" : "Switch to right to left layout"
      );
      rtlBtn.setAttribute("aria-pressed", String(isRTL));
      if (window.lucide) lucide.createIcons();
    }
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
    document.querySelectorAll(".menu a, .login-btn, .mobile-login-item a").forEach((link) => {
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

    const currentPath = normalizeFile(window.location.pathname) || "index.html";
    const topLevelLinks = document.querySelectorAll(".menu > li > a");
    const dropdownLinks = document.querySelectorAll(".dropdown-menu a");
    const desktopLogin = document.querySelector(".login-btn");
    const mobileLogin = document.querySelector(".mobile-login-item a");

    const findMatch = (links, page) => {
      for (const link of links) {
        const hrefPage = normalizeFile(link.getAttribute("href"));
        const dataPage = normalizeFile(link.dataset.page);
        if (hrefPage === page || dataPage === page) return link;
      }
      return null;
    };

    if (currentPath === "login.html") {
      setActive(desktopLogin);
      setActive(mobileLogin);
      return;
    }

    if (currentPath === "index.html") {
      setActive(document.querySelector('.menu > li.dropdown > a[data-page="index.html"]'));
      return;
    }

    const matchedDropdown = findMatch(dropdownLinks, currentPath);
    if (matchedDropdown) {
      setActive(matchedDropdown);
      setActive(matchedDropdown.closest(".dropdown")?.querySelector(":scope > a"));
      return;
    }

    setActive(findMatch(topLevelLinks, currentPath));
  }

  function closeAllDropdowns() {
    dropdowns.forEach((dropdown) => {
      dropdown.classList.remove("open");
      const trigger = dropdown.querySelector(":scope > a");
      if (trigger) trigger.setAttribute("aria-expanded", "false");
    });
  }

  function closeMobileMenu() {
    if (primaryMenu && menuToggle) {
      primaryMenu.classList.remove("active");
      primaryMenu.setAttribute("aria-hidden", "true");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open menu");
      menuToggle.innerHTML = '<i data-lucide="menu"></i>';
      if (window.lucide) lucide.createIcons();
    }

    document.body.classList.remove("menu-open");
    closeAllDropdowns();
  }

  function openMobileMenu() {
    if (primaryMenu && menuToggle) {
      primaryMenu.classList.add("active");
      primaryMenu.setAttribute("aria-hidden", "false");
      menuToggle.setAttribute("aria-expanded", "true");
      menuToggle.setAttribute("aria-label", "Close menu");
      menuToggle.innerHTML = '<i data-lucide="x"></i>';
      if (window.lucide) lucide.createIcons();
    }

    document.body.classList.add("menu-open");
  }

  if (primaryMenu) primaryMenu.setAttribute("aria-hidden", "true");

  if (menuToggle && primaryMenu) {
    menuToggle.addEventListener("click", () => {
      primaryMenu.classList.contains("active") ? closeMobileMenu() : openMobileMenu();
    });
  }

  dropdowns.forEach((dropdown, index) => {
    const trigger = dropdown.querySelector(":scope > a");
    const submenu = dropdown.querySelector(".dropdown-menu");

    if (trigger && submenu) {
      if (!submenu.id) submenu.id = `dropdown-menu-${index + 1}`;

      trigger.setAttribute("aria-haspopup", "true");
      trigger.setAttribute("aria-expanded", "false");
      trigger.setAttribute("aria-controls", submenu.id);

      trigger.addEventListener("click", (e) => {
        if (window.innerWidth <= 1024) {
          e.preventDefault();
          const isOpen = dropdown.classList.contains("open");
          closeAllDropdowns();

          if (!isOpen) {
            dropdown.classList.add("open");
            trigger.setAttribute("aria-expanded", "true");
          }
        }
      });
    }
  });

  document.querySelectorAll(".menu a, .login-btn, .mobile-login-item a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 1024) {
        const insideDropdownMenu = link.closest(".dropdown-menu");
        const parentDropdown = link.closest(".dropdown");
        const isTopLevelDropdownTrigger =
          parentDropdown && parentDropdown.querySelector(":scope > a") === link;

        if (insideDropdownMenu || !isTopLevelDropdownTrigger) {
          closeMobileMenu();
        }
      }
    });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".nav")) {
      closeAllDropdowns();
      if (window.innerWidth <= 1024) closeMobileMenu();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMobileMenu();
  });

  setDirection(safeStorage.get("direction") || "ltr");

  if (rtlBtn) {
    rtlBtn.addEventListener("click", () => {
      const newDirection =
        document.documentElement.getAttribute("dir") === "rtl" ? "ltr" : "rtl";
      setDirection(newDirection);
      safeStorage.set("direction", newDirection);
    });
  }

  setTheme(
    safeStorage.get("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
  );

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const newTheme = document.body.classList.contains("dark") ? "light" : "dark";
      setTheme(newTheme);
      safeStorage.set("theme", newTheme);
    });
  }

  setActiveMenu();

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1024) {
      closeMobileMenu();
      if (primaryMenu) primaryMenu.removeAttribute("aria-hidden");
    } else if (primaryMenu && !primaryMenu.classList.contains("active")) {
      primaryMenu.setAttribute("aria-hidden", "true");
    }
  });

  if (window.lucide) lucide.createIcons();
});