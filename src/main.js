// カスタムカーソル
function initCustomCursor() {
  // スマホの場合はカスタムカーソルを初期化しない
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
    "a, button, .work-item, .dance-item, .slick-arrow, .scroll-down-button"
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

// カルーセル設定
function initSliders() {
  const worksSlider = $(".works-slider");
  const danceSlider = $(".dance-slider");

  const sliderSettings = {
    infinite: true,
    speed: 200,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    dots: true,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    pauseOnFocus: true,
    waitForAnimate: false, // アニメーション待ちを無効化して滑らかに
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          centerPadding: "10px",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerPadding: "5px",
          speed: 100,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          centerPadding: "3px",
          speed: 100,
        },
      },
    ],
  };

  // スライダー初期化
  worksSlider.slick(sliderSettings);
  danceSlider.slick(sliderSettings);

  // 初期化後に全てのスライドを表示状態にする
  setTimeout(() => {
    $(".work-item, .dance-item").addClass("visible");

    // クローンスライドにもスタイルを適用
    $(".slick-cloned .work-item, .slick-cloned .dance-item").css({
      opacity: "1",
      transform: "translateY(0)",
    });
  }, 100);

  // リサイズ時のスライダー調整
  $(window).on("resize", function () {
    if (worksSlider.hasClass("slick-initialized")) {
      worksSlider.slick("setPosition");
    }
    if (danceSlider.hasClass("slick-initialized")) {
      danceSlider.slick("setPosition");
    }
  });

  // ループ時のスライド遷移をスムーズにする
  $(".slick-slider").on(
    "beforeChange",
    function (event, slick, currentSlide, nextSlide) {
      // 最初のスライドへループする時や最後のスライドへループする時を管理
      if (currentSlide === slick.slideCount - 1 && nextSlide === 0) {
        // 最後から最初へのループ
        $(".slick-slide").css("opacity", "1");
      } else if (currentSlide === 0 && nextSlide === slick.slideCount - 1) {
        // 最初から最後へのループ
        $(".slick-slide").css("opacity", "1");
      }
    }
  );
}

// TOPスクロールボタン実装
function initScrollToTop() {
  // スクロールボタン要素を作成
  const scrollBtn = document.createElement("div");
  scrollBtn.className = "scroll-to-top";
  document.body.appendChild(scrollBtn);

  // スクロールイベントでボタン表示を制御
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollBtn.classList.add("visible");
      // 少しスクロールしたらパルスアニメーションを開始
      if (window.scrollY > 700) {
        scrollBtn.classList.add("pulse");
      } else {
        scrollBtn.classList.remove("pulse");
      }
    } else {
      scrollBtn.classList.remove("visible");
      scrollBtn.classList.remove("pulse");
    }
  });

  // クリックイベントでトップにスクロール
  scrollBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// ハンバーガーメニューの動作を改善
function initHamburgerMenu() {
  const hamburger = document.querySelector(".hamburger-menu");
  const navLinks = document.querySelector(".nav-links");

  if (!hamburger) return;

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");

    // メニュー開閉時にbodyのスクロールを制御
    if (navLinks.classList.contains("active")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  });

  // メニューリンクをクリックしたらメニューを閉じる
  const menuLinks = navLinks.querySelectorAll("a");
  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
      document.body.style.overflow = "";
    });
  });
}

// 強化されたモーダル表示機能
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

// スクロールアニメーションの初期化
function initScrollAnimation() {
  const fadeElements = document.querySelectorAll(".fade-in");

  // スクロールダウンボタンのクリックイベント
  const scrollDownButton = document.querySelector(".scroll-down-button");
  if (scrollDownButton) {
    scrollDownButton.addEventListener("click", (e) => {
      e.preventDefault();
      const aboutSection = document.querySelector("#about");
      if (aboutSection) {
        aboutSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  }

  function checkScroll() {
    fadeElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      // 要素が画面内に入った時にvisibleクラスを追加
      if (elementTop < windowHeight * 0.85) {
        element.classList.add("visible");
      }
    });
  }

  // 初期チェック
  checkScroll();

  // スクロール時にチェック
  window.addEventListener("scroll", checkScroll);
}

// Portfolio文字のアニメーション初期化
function initPortfolioAnimation() {
  const title = document.querySelector(".glow-effect");
  if (!title) return;

  // 既存のテキストを取得
  const text = title.textContent;
  // 中身を一旦空にする
  title.textContent = "";

  // 一文字ずつspanで包む
  Array.from(text).forEach((char, index) => {
    const span = document.createElement("span");
    span.textContent = char;
    // 遅延を設定
    span.style.animationDelay = `${index * 0.1}s`;
    title.appendChild(span);
  });
}

// 初期化
$(document).ready(function () {
  // カスタムカーソル初期化
  initCustomCursor();

  // ハンバーガーメニュー初期化
  initHamburgerMenu();

  // スクロールトップボタン初期化
  initScrollToTop();

  // カルーセル初期化
  initSliders();

  // Portfolio文字のアニメーション初期化
  initPortfolioAnimation();

  // モバイルサイズでの初期位置設定
  if ($(window).width() <= 768) {
    setTimeout(() => {
      $(".slick-slider").slick("setPosition");
    }, 200);
  }

  // スクロールアニメーションの初期化
  initScrollAnimation();
});

// ページに応じた初期化
if (
  window.location.pathname.includes("works.html") ||
  window.location.pathname.includes("dance.html")
) {
  document.addEventListener("DOMContentLoaded", initDetailPageModals);
}
