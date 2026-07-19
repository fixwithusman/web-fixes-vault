"use strict";

/* ============================================================
   CONTACT CONFIG
   ============================================================ */
const CONTACT = {
  phoneDisplay: "+1 (555) 123-4567",
  phoneHref: "tel:+15551234567",
};

/* ============================================================
   DATA LAYER
   ============================================================ */
const MENU_ITEMS = [
  {
    id: "truffle-fries",
    name: "Truffle Parmesan Fries",
    price: 9.5,
    description:
      "Hand-cut russet potatoes fried until golden, tossed in white truffle oil, aged parmesan and fresh parsley. Served with roasted-garlic aioli.",
    category: "Starters",
    imageSrc: "images/truffle-fries.png",
    badges: ["Best Seller", "Vegetarian"],
  },
  {
    id: "chicken-wings",
    name: "Firecracker Wings",
    price: 12.0,
    description:
      "Double-fried chicken wings glazed in a house buffalo-honey sauce with a smoked chili kick. Finished with sesame and served with blue-cheese dip.",
    category: "Starters",
    imageSrc: "images/chicken-wings.png",
    badges: ["Spicy"],
  },
  {
    id: "margherita-pizza",
    name: "Wood-Fired Margherita",
    price: 16.0,
    description:
      "72-hour fermented sourdough base, San Marzano tomato, fior di latte mozzarella and hand-torn basil, blistered in our 400°C wood-fired oven.",
    category: "Mains",
    imageSrc: "images/margherita-pizza.png",
    badges: ["Best Seller", "Vegetarian"],
  },
  {
    id: "beef-burger",
    name: "Saffron Signature Burger",
    price: 18.5,
    description:
      "Dry-aged beef patty, smoked cheddar, caramelised onion jam, butter lettuce and pickles in a toasted brioche bun. Comes with a side of fries.",
    category: "Mains",
    imageSrc: "images/beef-burger.png",
    badges: [],
  },
  {
    id: "lava-cake",
    name: "Molten Chocolate Cake",
    price: 10.0,
    description:
      "Warm dark-chocolate fondant with an oozing molten centre, dusted with cocoa and served with Madagascan vanilla-bean ice cream.",
    category: "Desserts",
    imageSrc: "images/lava-cake.png",
    badges: ["Best Seller"],
  },
  {
    id: "caramel-latte",
    name: "Iced Caramel Latte",
    price: 6.5,
    description:
      "Double-shot espresso over milk and house salted-caramel syrup, poured on ice and topped with lightly whipped cream and a caramel drizzle.",
    category: "Drinks",
    imageSrc: "images/caramel-latte.png",
    badges: ["New"],
  },
];

const BADGE_STYLES = {
  "Best Seller": "badge--seller",
  Spicy: "badge--spicy",
  New: "badge--new",
  Vegetarian: "badge--veg",
};

const THEME_KEY = "saffron-theme";
const ALL_CATEGORY = "All";

/* ============================================================
   STATE + DOM REFERENCES
   ============================================================ */
const state = {
  activeCategory: ALL_CATEGORY,
};

const dom = {
  themeToggle: document.getElementById("themeToggle"),
  categoryTrack: document.getElementById("categoryTrack"),
  menuGrid: document.getElementById("menuGrid"),
  emptyState: document.getElementById("emptyState"),
  activeCategoryTitle: document.getElementById("activeCategoryTitle"),
  itemCount: document.getElementById("itemCount"),
  modal: document.getElementById("itemModal"),
  modalClose: document.getElementById("modalClose"),
  modalImage: document.getElementById("modalImage"),
  modalName: document.getElementById("modalName"),
  modalPrice: document.getElementById("modalPrice"),
  modalDesc: document.getElementById("modalDesc"),
  modalBadges: document.getElementById("modalBadges"),
  modalRecos: document.getElementById("modalRecos"),
  modalShare: document.getElementById("modalShare"),
  leadForm: document.getElementById("leadForm"),
  formStatus: document.getElementById("formStatus"),
  toast: document.getElementById("toast"),
  year: document.getElementById("year"),
};

/* ============================================================
   UTILITIES
   ============================================================ */
const formatPrice = (value) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);

const getById = (id) => MENU_ITEMS.find((item) => item.id === id);

const getCategories = () => {
  const unique = [];
  MENU_ITEMS.forEach((item) => {
    if (!unique.includes(item.category)) unique.push(item.category);
  });
  return [ALL_CATEGORY, ...unique];
};

const getVisibleItems = () =>
  state.activeCategory === ALL_CATEGORY
    ? MENU_ITEMS
    : MENU_ITEMS.filter((item) => item.category === state.activeCategory);

let toastTimer;
const showToast = (message) => {
  dom.toast.textContent = message;
  dom.toast.hidden = false;
  requestAnimationFrame(() => dom.toast.classList.add("is-visible"));
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    dom.toast.classList.remove("is-visible");
    setTimeout(() => (dom.toast.hidden = true), 200);
  }, 2400);
};

const buildBadges = (badges = []) =>
  badges
    .map((label) => {
      const cls = BADGE_STYLES[label] || "";
      return `<span class="badge ${cls}">${label}</span>`;
    })
    .join("");

/* ============================================================
   RENDER: CATEGORY NAV
   ============================================================ */
function renderCategories() {
  const fragment = document.createDocumentFragment();

  getCategories().forEach((category) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "chip";
    chip.role = "tab";
    chip.textContent = category;
    chip.dataset.category = category;
    chip.setAttribute("aria-selected", String(category === state.activeCategory));
    chip.addEventListener("click", () => setCategory(category, chip));
    fragment.appendChild(chip);
  });

  dom.categoryTrack.replaceChildren(fragment);
}

function setCategory(category, chipEl) {
  state.activeCategory = category;

  dom.categoryTrack.querySelectorAll(".chip").forEach((chip) => {
    chip.setAttribute("aria-selected", String(chip.dataset.category === category));
  });

  if (chipEl) {
    chipEl.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }

  renderMenu();
}

/* ============================================================
   RENDER: MENU GRID
   ============================================================ */
function renderMenu() {
  const items = getVisibleItems();

  dom.activeCategoryTitle.textContent =
    state.activeCategory === ALL_CATEGORY ? "Full Menu" : state.activeCategory;
  dom.itemCount.textContent = `${items.length} ${items.length === 1 ? "dish" : "dishes"}`;

  if (items.length === 0) {
    dom.menuGrid.replaceChildren();
    dom.emptyState.hidden = false;
    return;
  }

  dom.emptyState.hidden = true;
  const fragment = document.createDocumentFragment();

  items.forEach((item, index) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "card";
    card.style.animationDelay = `${index * 45}ms`;
    card.setAttribute("aria-label", `View details for ${item.name}`);
    card.dataset.id = item.id;

    card.innerHTML = `
      <div class="card__media">
        ${item.badges && item.badges.length ? `<div class="card__badges">${buildBadges(item.badges)}</div>` : ""}
        <img class="card__img" src="${item.imageSrc}" alt="${item.name}" loading="lazy" />
      </div>
      <div class="card__body">
        <div class="card__row">
          <h3 class="card__name">${item.name}</h3>
          <span class="card__price">${formatPrice(item.price)}</span>
        </div>
        <p class="card__desc">${item.description}</p>
      </div>
    `;

    card.addEventListener("click", () => openModal(item.id));
    fragment.appendChild(card);
  });

  dom.menuGrid.replaceChildren(fragment);
}

/* ============================================================
   MODAL CONTROLLER
   ============================================================ */
function openModal(id) {
  const item = getById(id);
  if (!item) return;

  dom.modalImage.src = item.imageSrc;
  dom.modalImage.alt = item.name;
  dom.modalName.textContent = item.name;
  dom.modalPrice.textContent = formatPrice(item.price);
  dom.modalDesc.textContent = item.description;
  dom.modalBadges.innerHTML = buildBadges(item.badges);

  renderRecommendations(item);
  dom.modalShare.dataset.id = item.id;

  if (typeof dom.modal.showModal === "function") {
    dom.modal.showModal();
  } else {
    dom.modal.setAttribute("open", "");
  }
}

function renderRecommendations(currentItem) {
  const recos = MENU_ITEMS.filter(
    (item) => item.category === currentItem.category && item.id !== currentItem.id
  ).slice(0, 3);

  const pool = recos.length
    ? recos
    : MENU_ITEMS.filter((item) => item.id !== currentItem.id).slice(0, 3);

  const fragment = document.createDocumentFragment();

  pool.forEach((item) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "reco";
    btn.innerHTML = `
      <img class="reco__img" src="${item.imageSrc}" alt="${item.name}" loading="lazy" />
      <span class="reco__name">${item.name}</span>
      <span class="reco__price">${formatPrice(item.price)}</span>
    `;
    btn.addEventListener("click", () => openModal(item.id));
    li.appendChild(btn);
    fragment.appendChild(li);
  });

  dom.modalRecos.replaceChildren(fragment);
}

function closeModal() {
  if (typeof dom.modal.close === "function" && dom.modal.open) {
    dom.modal.close();
  } else {
    dom.modal.removeAttribute("open");
  }
}

async function shareItem(id) {
  const item = getById(id);
  if (!item) return;

  const shareData = {
    title: `${item.name} — Saffron & Sage`,
    text: `${item.name} (${formatPrice(item.price)}) — ${item.description}`,
    url: `${window.location.origin}${window.location.pathname}#${item.id}`,
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
      showToast("Dish link copied to clipboard");
    } else {
      showToast("Sharing is not supported on this device");
    }
  } catch (error) {
    if (error && error.name !== "AbortError") {
      showToast("Could not share right now");
    }
  }
}

/* ============================================================
   THEME SWITCHER
   ============================================================ */
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  dom.themeToggle.setAttribute("aria-pressed", String(theme === "dark"));

  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", theme === "dark" ? "#0f1115" : "#fffdf8");
}

function initTheme() {
  let stored;
  try {
    stored = localStorage.getItem(THEME_KEY);
  } catch (error) {
    stored = null;
  }

  const prefersDark =
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = stored || (prefersDark ? "dark" : "light");
  applyTheme(theme);
}

function toggleTheme() {
  const next =
    document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
  applyTheme(next);
  try {
    localStorage.setItem(THEME_KEY, next);
  } catch (error) {
    /* storage unavailable — keep in-memory theme only */
  }
}

/* ============================================================
   FEEDBACK FORM
   ============================================================ */
function handleFormSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;

  if (!form.checkValidity()) {
    dom.formStatus.style.color = "var(--primary)";
    dom.formStatus.textContent = "Please add your name and a valid email.";
    form.reportValidity();
    return;
  }

  dom.formStatus.style.color = "var(--accent)";
  dom.formStatus.textContent = "Thanks! We'll be in touch soon.";
  form.reset();
  showToast("Feedback received — thank you!");
}

/* ============================================================
   INITIALISATION
   ============================================================ */
function canPlaceCalls() {
  return (
    typeof window.matchMedia === "function" &&
    window.matchMedia("(pointer: coarse)").matches
  );
}

async function handleCallClick(event) {
  if (canPlaceCalls()) {
    showToast(`Calling ${CONTACT.phoneDisplay}…`);
    return;
  }

  event.preventDefault();

  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(CONTACT.phoneDisplay);
      showToast(`Number copied: ${CONTACT.phoneDisplay}`);
      return;
    } catch (error) {
      /* fall through to plain display */
    }
  }

  showToast(`Call us at ${CONTACT.phoneDisplay}`);
}

function bindEvents() {
  dom.themeToggle.addEventListener("click", toggleTheme);
  dom.modalClose.addEventListener("click", closeModal);
  dom.modalShare.addEventListener("click", (event) => shareItem(event.currentTarget.dataset.id));
  dom.leadForm.addEventListener("submit", handleFormSubmit);

  document.querySelectorAll('a[href^="tel:"]').forEach((link) => {
    link.addEventListener("click", handleCallClick);
  });

  dom.modal.addEventListener("click", (event) => {
    if (event.target === dom.modal) closeModal();
  });

  dom.modal.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeModal();
  });
}

function init() {
  dom.year.textContent = new Date().getFullYear();
  initTheme();
  renderCategories();
  renderMenu();
  bindEvents();

  const deepLinkId = window.location.hash.replace("#", "");
  if (deepLinkId && getById(deepLinkId)) {
    openModal(deepLinkId);
  }
}

document.addEventListener("DOMContentLoaded", init);
