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
    "a, button, .work-item, .dance-item, .slick-arrow"
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

// 黒猫のシルエットアニメーション - 削除
function createCatSilhouette() {
  // 削除 - 猫のシルエットを表示しない
}

// Slickスライダーの初期化
$(document).ready(function () {
  // Worksスライダー
  $(".works-slider").slick({
    dots: true,
    dotsClass: "slick-dots",
    appendDots: $(".works-slider"),
    infinite: true,
    speed: 200, // より速く反応するように変更
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    centerMode: true,
    centerPadding: "0px",
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "5px", // SPでは少し余白を設定
          arrows: true,
          speed: 100, // SPではアニメーション速度を早く
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "3px", // 小さいスマホでは少し余白を設定
          arrows: true,
          speed: 100, // SPではアニメーション速度を早く
        },
      },
    ],
  });

  // Danceスライダー
  $(".dance-slider").slick({
    dots: true,
    dotsClass: "slick-dots",
    appendDots: $(".dance-slider"),
    infinite: true,
    speed: 200, // より速く反応するように変更
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    centerMode: true,
    centerPadding: "0px",
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "5px", // SPでは少し余白を設定
          arrows: true,
          speed: 100, // SPではアニメーション速度を早く
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "3px", // 小さいスマホでは少し余白を設定
          arrows: true,
          speed: 100, // SPではアニメーション速度を早く
        },
      },
    ],
  });

  // ウィンドウサイズの変更を監視
  $(window).on("resize", function () {
    $(".works-slider, .dance-slider").slick("setPosition");
  });

  // SPサイズの場合は初期表示時にsetPositionを実行
  if (window.innerWidth <= 768) {
    setTimeout(function () {
      $(".works-slider, .dance-slider").slick("setPosition");
    }, 100);
  }
});

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

// 高度なスクロールアニメーション
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  // セクションごとに異なるアニメーションを適用
  const aboutSection = document.getElementById("about");
  if (aboutSection) {
    const profileImage = aboutSection.querySelector(".profile-image");
    const profileText = aboutSection.querySelector(".profile-text");

    if (profileImage) {
      profileImage.classList.add("slide-in-left");
      fadeObserver.observe(profileImage);
    }

    if (profileText) {
      profileText.classList.add("slide-in-right");
      fadeObserver.observe(profileText);
    }
  }

  // ワークスとダンスのセクションはスケールインで表示
  document.querySelectorAll("#works, #dance").forEach((section) => {
    const items = section.querySelectorAll(".work-item, .dance-item");
    items.forEach((item, index) => {
      item.classList.add("scale-in");
      item.style.transitionDelay = `${0.05 * index}s`; // 遅延を短くする
      fadeObserver.observe(item);
    });
  });

  // 通常のフェードイン
  document
    .querySelectorAll(".section:not(#about):not(#works):not(#dance)")
    .forEach((section) => {
      section.classList.add("fade-in");
      fadeObserver.observe(section);
    });
}

// 視差効果(パララックス)
function initParallax() {
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    // イントロセクションの背景に視差効果を適用
    document.getElementById("intro").style.backgroundPositionY = `${
      scrollY * 0.5
    }px`;

    // セクション見出しにも軽い視差効果
    document.querySelectorAll("h2").forEach((heading) => {
      const rect = heading.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const scrollSpeed = 0.05;
        heading.style.transform = `translateY(${
          (window.innerHeight / 2 - rect.top) * scrollSpeed
        }px)`;
      }
    });
  });
}

// 初期化関数
function init() {
  // DOM読み込み完了後に実行
  document.addEventListener("DOMContentLoaded", function () {
    // パーティクルJS用の要素を追加
    const particlesElement = document.createElement("div");
    particlesElement.id = "particles-js";
    document.body.prepend(particlesElement);

    initCustomCursor();
    // createCatSilhouette(); - 猫のシルエット生成を削除
    initScrollAnimations();
    initParallax();
    initTypingAnimation();

    // particles.jsが読み込まれていれば初期化
    if (typeof particlesJS !== "undefined") {
      initParticles();
    } else {
      // particles.jsを動的に読み込む
      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js";
      script.onload = initParticles;
      document.head.appendChild(script);
    }
  });
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

// Worksとdanceの詳細ページでモーダル処理を追加
function initDetailPageModals() {
  // 詳細ページのカードにクリックイベントを追加
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

// タイピングアニメーション
function initTypingAnimation() {
  const introTitle = document.querySelector("#intro h1");
  if (introTitle) {
    const text = introTitle.textContent;
    introTitle.textContent = "";
    introTitle.style.opacity = 1;

    let i = 0;
    const typeInterval = setInterval(() => {
      if (i < text.length) {
        introTitle.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(typeInterval);
        // タイピング完了後にグロー効果を追加
        introTitle.classList.add("glow-effect");
        // data-text属性を追加して疑似要素用のテキストを設定
        introTitle.setAttribute("data-text", text);
      }
    }, 100);
  }
}

// 初期化を実行
init();

// ページに応じた初期化
if (
  window.location.pathname.includes("works.html") ||
  window.location.pathname.includes("dance.html")
) {
  document.addEventListener("DOMContentLoaded", initDetailPageModals);
}
