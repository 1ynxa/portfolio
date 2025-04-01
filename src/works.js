// カスタムカーソル
function initCustomCursor() {
  // スマホサイズの場合はカスタムカーソルを初期化しない
  if (window.innerWidth <= 768) {
    return;
  }

  const cursor = document.createElement("div");
  cursor.classList.add("cursor");
  document.body.appendChild(cursor);

  const cursorFollower = document.createElement("div");
  cursorFollower.classList.add("cursor-follower");
  document.body.appendChild(cursorFollower);

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";

    // 少し遅れて追従するため、setTimeout を使用
    setTimeout(() => {
      cursorFollower.style.left = e.clientX + "px";
      cursorFollower.style.top = e.clientY + "px";
    }, 50);
  });

  // リンクやボタンにホバーしたときのエフェクト
  const hoverElements = document.querySelectorAll(
    "a, button, .work-card, .dance-card, .filter-button"
  );

  hoverElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      cursor.classList.add("cursor-grow");
      cursorFollower.classList.add("cursor-follower-grow");
    });

    element.addEventListener("mouseleave", () => {
      cursor.classList.remove("cursor-grow");
      cursorFollower.classList.remove("cursor-follower-grow");
    });
  });

  // ウィンドウリサイズ時にカーソルを更新
  window.addEventListener("resize", () => {
    if (window.innerWidth <= 768) {
      if (document.body.contains(cursor)) {
        document.body.removeChild(cursor);
      }
      if (document.body.contains(cursorFollower)) {
        document.body.removeChild(cursorFollower);
      }
    } else {
      if (!document.body.contains(cursor)) {
        document.body.appendChild(cursor);
        document.body.appendChild(cursorFollower);
      }
    }
  });
}

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

// パーティクルアニメーション初期化
function initParticles() {
  if (typeof particlesJS !== "undefined") {
    particlesJS("particles-js", {
      particles: {
        number: {
          value: 30,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: "#4ecdc4",
        },
        shape: {
          type: "circle",
          stroke: {
            width: 0,
            color: "#000000",
          },
        },
        opacity: {
          value: 0.2,
          random: true,
          anim: {
            enable: true,
            speed: 0.5,
            opacity_min: 0.1,
            sync: false,
          },
        },
        size: {
          value: 2,
          random: true,
          anim: {
            enable: true,
            speed: 1,
            size_min: 0.1,
            sync: false,
          },
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#4ecdc4",
          opacity: 0.1,
          width: 1,
        },
        move: {
          enable: true,
          speed: 0.8,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200,
          },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "grab",
          },
          onclick: {
            enable: true,
            mode: "push",
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 0.3,
            },
          },
          push: {
            particles_nb: 2,
          },
        },
      },
      retina_detect: true,
    });
  }
}

// スクロールアニメーション
function initScrollAnimations() {
  // SPサイズでは詳細ページのアニメーションを無効化
  if (window.innerWidth <= 768) {
    document.querySelectorAll(".work-card, .dance-card").forEach((card) => {
      card.classList.add("visible");
      card.style.opacity = 1;
      card.style.transform = "translateY(0)";
      card.style.transition = "box-shadow 0.2s ease, border-top 0.2s ease";
    });
    return;
  }

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        // 少し遅延をつけてカードが順番に表示されるようにする
        if (
          entry.target.classList.contains("work-card") ||
          entry.target.classList.contains("dance-card")
        ) {
          const delay =
            Array.from(document.querySelectorAll(".visible")).indexOf(
              entry.target
            ) * 0.1;
          entry.target.style.transitionDelay = `${delay}s`;
        }
      }
    });
  }, observerOptions);

  document.querySelectorAll(".work-card, .dance-card").forEach((card) => {
    observer.observe(card);
  });

  // リサイズイベントの監視
  window.addEventListener("resize", function () {
    if (window.innerWidth <= 768) {
      document.querySelectorAll(".work-card, .dance-card").forEach((card) => {
        card.classList.add("visible");
        card.style.opacity = 1;
        card.style.transform = "translateY(0)";
        card.style.transition = "box-shadow 0.2s ease, border-top 0.2s ease";
      });
    }
  });
}

// モーダル表示機能
class Modal {
  constructor() {
    // モーダル要素がなければ作成
    if (!document.getElementById("workModal")) {
      const modalHTML = `
        <div class="modal" id="workModal">
          <div class="modal-content">
            <span class="close">&times;</span>
            <div class="modal-body"></div>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML("beforeend", modalHTML);
    }

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

    // ESCキーでモーダルを閉じる
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.modal.style.display === "flex") {
        this.close();
      }
    });
  }

  open(content) {
    this.modalBody.innerHTML = content;
    this.modal.style.display = "flex";
    document.body.style.overflow = "hidden";

    // フェードインアニメーション
    setTimeout(() => {
      this.modal.classList.add("show");
    }, 10);
  }

  close() {
    this.modal.classList.remove("show");

    // アニメーション完了後に非表示
    setTimeout(() => {
      this.modal.style.display = "none";
      document.body.style.overflow = "";
      this.modalBody.innerHTML = "";
    }, 300);
  }
}

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

// 詳細ページのカードをクリックでモーダル表示
function initCardModals() {
  const modal = new Modal();

  // 作品カードのクリックイベント
  document.querySelectorAll(".work-card").forEach((card) => {
    card.addEventListener("click", () => {
      const image = card.querySelector(".work-image img").src;
      const title = card.querySelector("h3").textContent;
      const subtitle = card.querySelector("p").textContent;
      const details = card.querySelector(".work-details").innerHTML;
      const description = card.querySelector(".work-description").textContent;

      const content = `
        <div class="modal-work-content">
          <img src="${image}" alt="${title}">
          <h2>${title}</h2>
          <p class="modal-subtitle">${subtitle}</p>
          <div class="work-details">${details}</div>
          <p class="work-description">${description}</p>
        </div>
      `;

      modal.open(content);
    });
  });

  // ダンスカードのクリックイベント
  document.querySelectorAll(".dance-card").forEach((card) => {
    card.addEventListener("click", () => {
      const iframe = card.querySelector(".youtube-embed iframe").outerHTML;
      const title = card.querySelector("h3").textContent;
      const role = card.querySelector(".dance-role").textContent;
      const details = card.querySelector(".dance-details").innerHTML;
      const description = card.querySelector(".dance-description").textContent;

      const content = `
        <div class="modal-dance-content">
          <div class="youtube-embed">
            ${iframe}
          </div>
          <h2>${title}</h2>
          <p class="dance-role">${role}</p>
          <div class="dance-details">${details}</div>
          <p class="dance-description">${description}</p>
        </div>
      `;

      modal.open(content);
    });
  });
}

// 初期化関数
function init() {
  // パーティクルJS用の要素を追加
  const particlesElement = document.createElement("div");
  particlesElement.id = "particles-js";
  document.body.prepend(particlesElement);

  // カスタムカーソルの初期化
  initCustomCursor();

  // カテゴリーフィルターの初期化（削除する）
  // initCategoryFilter();

  // スクロールアニメーションの初期化
  initScrollAnimations();

  // モーダル機能の初期化
  initCardModals();

  // particles.jsの初期化
  if (typeof particlesJS !== "undefined") {
    initParticles();
  } else {
    // particles.jsを動的に読み込む
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js";
    script.onload = initParticles;
    document.head.appendChild(script);
  }
}

// ページ読み込み完了時に初期化
document.addEventListener("DOMContentLoaded", init);
