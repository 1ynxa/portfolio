// スムーズスクロール
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// ナビゲーションバーの表示/非表示
let lastScrollTop = 0;
const nav = document.querySelector(".main-nav");

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop && scrollTop > 100) {
    // 下スクロール時
    nav.style.transform = "translateY(-100%)";
  } else {
    // 上スクロール時
    nav.style.transform = "translateY(0)";
  }

  lastScrollTop = scrollTop;
});

// カルーセル機能
class Carousel {
  constructor(container) {
    this.container = container;
    this.track = container.querySelector(".carousel-track");
    this.items = container.querySelectorAll(".work-item, .dance-item");
    this.prevButton = container.querySelector(".carousel-button.prev");
    this.nextButton = container.querySelector(".carousel-button.next");
    this.currentIndex = 0;
    this.itemsPerView = this.getItemsPerView();

    this.init();
  }

  getItemsPerView() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
  }

  init() {
    this.updateButtons();
    this.addEventListeners();
    window.addEventListener("resize", () => {
      this.itemsPerView = this.getItemsPerView();
      this.updateButtons();
    });
  }

  addEventListeners() {
    this.prevButton.addEventListener("click", () => this.prev());
    this.nextButton.addEventListener("click", () => this.next());
  }

  updateButtons() {
    this.prevButton.style.display = this.currentIndex === 0 ? "none" : "flex";
    this.nextButton.style.display =
      this.currentIndex >= this.items.length - this.itemsPerView
        ? "none"
        : "flex";
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateCarousel();
    }
  }

  next() {
    if (this.currentIndex < this.items.length - this.itemsPerView) {
      this.currentIndex++;
      this.updateCarousel();
    }
  }

  updateCarousel() {
    const itemWidth = 100 / this.itemsPerView;
    this.track.style.transform = `translateX(-${
      this.currentIndex * itemWidth
    }%)`;
    this.updateButtons();
  }
}

// カルーセルの初期化
document.querySelectorAll(".carousel-container").forEach((container) => {
  new Carousel(container);
});

// モーダル表示機能
class Modal {
  constructor() {
    this.modal = document.getElementById("workModal");
    this.closeButton = this.modal.querySelector(".close");
    this.modalBody = this.modal.querySelector(".modal-body");

    this.init();
  }

  init() {
    this.closeButton.addEventListener("click", () => this.close());
    this.modal.addEventListener("click", (e) => {
      if (e.target === this.modal) this.close();
    });
  }

  open(content) {
    this.modalBody.innerHTML = content;
    this.modal.style.display = "flex";
    document.body.style.overflow = "hidden";
  }

  close() {
    this.modal.style.display = "none";
    document.body.style.overflow = "";
    this.modalBody.innerHTML = "";
  }
}

const modal = new Modal();

// 作品アイテムのクリックイベント
document.querySelectorAll(".work-item").forEach((item) => {
  item.addEventListener("click", () => {
    const image = item.querySelector(".work-img").src;
    const title = item.querySelector("h3").textContent;
    const description = item.querySelector("p").textContent;
    const details = item.querySelector(".work-details").innerHTML;

    const content = `
      <div class="modal-work-content">
        <img src="${image}" alt="${title}">
        <h2>${title}</h2>
        <p>${description}</p>
        <div class="work-details">${details}</div>
      </div>
    `;

    modal.open(content);
  });
});

// ダンスアイテムのクリックイベント
document.querySelectorAll(".dance-item").forEach((item) => {
  item.addEventListener("click", () => {
    const iframe = item.querySelector(".youtube-embed iframe").outerHTML;
    const title = item.querySelector("h3").textContent;
    const description = item.querySelector("p").textContent;
    const details = item.querySelector(".dance-details").innerHTML;

    const content = `
      <div class="modal-dance-content">
        <div class="youtube-embed">
          ${iframe}
        </div>
        <h2>${title}</h2>
        <p>${description}</p>
        <div class="dance-details">${details}</div>
      </div>
    `;

    modal.open(content);
  });
});

// スクロールアニメーション
const observerOptions = {
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

document.querySelectorAll(".section").forEach((section) => {
  section.classList.add("fade-in");
  observer.observe(section);
});

// ハンバーガーメニュー
const hamburgerMenu = document.querySelector(".hamburger-menu");
const navLinks = document.querySelector(".nav-links");

hamburgerMenu.addEventListener("click", () => {
  hamburgerMenu.classList.toggle("active");
  navLinks.classList.toggle("active");
});

// メニューリンクをクリックしたらメニューを閉じる
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburgerMenu.classList.remove("active");
    navLinks.classList.remove("active");
  });
});
