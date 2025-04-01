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

document.querySelectorAll(".work-card, .dance-card").forEach((card) => {
  card.classList.add("fade-in");
  observer.observe(card);
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
