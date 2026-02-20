const menuToggle = document.getElementById("menuToggle");
const siteNav = document.getElementById("siteNav");
const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
const sections = Array.from(document.querySelectorAll("main section[id]"));
const themeToggle = document.getElementById("themeToggle");
const themeToggleText = document.getElementById("themeToggleText");

const THEME_KEY = "upfinances-theme";

function getStoredTheme() {
  try {
    return localStorage.getItem(THEME_KEY);
  } catch {
    return null;
  }
}

function setStoredTheme(theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // No-op when localStorage is unavailable.
  }
}

function applyTheme(theme) {
  const normalizedTheme = theme === "dark" ? "dark" : "light";
  const isDark = normalizedTheme === "dark";

  document.body.setAttribute("data-theme", normalizedTheme);

  if (themeToggle) {
    themeToggle.classList.toggle("is-dark", isDark);
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute(
      "aria-label",
      isDark ? "Alternar para tema claro" : "Alternar para tema escuro"
    );
  }

  if (themeToggleText) {
    themeToggleText.textContent = isDark ? "Dark" : "Light";
  }
}

const savedTheme = getStoredTheme();
const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
applyTheme(savedTheme || (prefersDark ? "dark" : "light"));

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const currentTheme = document.body.getAttribute("data-theme");
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    setStoredTheme(nextTheme);
  });
}

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    menuToggle.classList.toggle("open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("open");
      menuToggle.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const targetSelector = anchor.getAttribute("href");
    if (!targetSelector) return;

    const target = document.querySelector(targetSelector);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const revealElements = Array.from(document.querySelectorAll("[data-reveal]"));
revealElements.forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index * 45, 270)}ms`;
});

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

revealElements.forEach((element) => revealObserver.observe(element));

function setActiveNavLink() {
  const offset = window.scrollY + 140;
  let activeId = sections[0]?.id || "";

  sections.forEach((section) => {
    if (offset >= section.offsetTop) {
      activeId = section.id;
    }
  });

  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${activeId}`;
    link.classList.toggle("active", isActive);
  });
}

window.addEventListener("scroll", setActiveNavLink, { passive: true });
setActiveNavLink();

const counters = Array.from(document.querySelectorAll("[data-count]"));

function animateCounter(element) {
  const target = Number(element.dataset.count || 0);
  const prefix = element.dataset.prefix || "";
  const suffix = element.dataset.suffix || "";
  const duration = 1400;
  let startTime;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;

    const progress = Math.min((timestamp - startTime) / duration, 1);
    const currentValue = Math.floor(target * progress);
    element.textContent = `${prefix}${currentValue.toLocaleString("pt-BR")}${suffix}`;

    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      element.textContent = `${prefix}${target.toLocaleString("pt-BR")}${suffix}`;
    }
  }

  window.requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.72 }
);

counters.forEach((counter) => counterObserver.observe(counter));

const planData = {
  free: {
    subtitle: "Plano para iniciar sua organização financeira com os recursos essenciais.",
    cta: "Começar no Free",
    features: [
      "Cadastro e autenticação completa.",
      "Dashboard com saldo, entradas e saídas.",
      "Registro de transações com filtros.",
      "Limite mensal de transações para controle."
    ]
  },
  basic: {
    subtitle: "Plano para acelerar sua rotina com mais automação e profundidade de análise.",
    cta: "Assinatura Basic",
    features: [
      "Tudo do Free, com maior capacidade operacional.",
      "Exclusão em lote e gestão avançada de transações.",
      "Relatórios financeiros exportáveis em PDF.",
      "Controle de regras de assinatura e acesso por plano."
    ]
  }
};

const planButtons = Array.from(document.querySelectorAll(".switch-btn"));
const planSubtitle = document.getElementById("planSubtitle");
const planFeatures = document.getElementById("planFeatures");
const planCta = document.getElementById("planCta");

function renderPlan(planName) {
  const plan = planData[planName];
  if (!plan || !planSubtitle || !planFeatures || !planCta) return;

  planSubtitle.textContent = plan.subtitle;
  planFeatures.innerHTML = plan.features.map((item) => `<li>${item}</li>`).join("");
  planCta.textContent = plan.cta;

  planButtons.forEach((button) => {
    const isActive = button.dataset.plan === planName;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });
}

planButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const planName = button.dataset.plan || "free";
    renderPlan(planName);
  });
});

renderPlan("free");

const billingToggle = document.getElementById("billingToggle");
const prices = Array.from(document.querySelectorAll(".price"));
const periods = Array.from(document.querySelectorAll(".period"));

function updateBilling() {
  if (!billingToggle) return;
  const yearly = billingToggle.checked;

  prices.forEach((price) => {
    const value = yearly ? price.dataset.yearly : price.dataset.monthly;
    const parsed = Number(value || 0);
    price.textContent = parsed.toLocaleString("pt-BR");
  });

  periods.forEach((period) => {
    period.textContent = yearly ? period.dataset.yearly || "/ano" : period.dataset.monthly || "/mês";
  });
}

if (billingToggle) {
  billingToggle.addEventListener("change", updateBilling);
  updateBilling();
}

const faqItems = Array.from(document.querySelectorAll(".faq-item"));

faqItems.forEach((item) => {
  const button = item.querySelector(".faq-question");
  if (!button) return;

  button.addEventListener("click", () => {
    const willOpen = !item.classList.contains("open");

    faqItems.forEach((faqItem) => {
      faqItem.classList.remove("open");
      const faqButton = faqItem.querySelector(".faq-question");
      if (faqButton) faqButton.setAttribute("aria-expanded", "false");
    });

    if (willOpen) {
      item.classList.add("open");
      button.setAttribute("aria-expanded", "true");
    }
  });
});

const yearElement = document.getElementById("year");
if (yearElement) {
  yearElement.textContent = String(new Date().getFullYear());
}
