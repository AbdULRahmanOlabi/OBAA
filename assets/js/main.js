(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select("#header");
    let offset = header.offsetHeight;

    if (!header.classList.contains("header-scrolled")) {
      offset -= 16;
    }

    let elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos - offset,
      behavior: "smooth",
    });
  };

  /**
   * Header fixed top on scroll
   */
  let selectHeader = select("#header");
  if (selectHeader) {
    let headerOffset = selectHeader.offsetTop;
    let nextElement = selectHeader.nextElementSibling;
    const headerFixed = () => {
      if (headerOffset - window.scrollY <= 0) {
        selectHeader.classList.add("fixed-top");
        nextElement.classList.add("scrolled-offset");
      } else {
        selectHeader.classList.remove("fixed-top");
        nextElement.classList.remove("scrolled-offset");
      }
    };
    window.addEventListener("load", headerFixed);
    onscroll(document, headerFixed);
  }

  /**
   * Back to top button
   */
  let backtotop = select(".back-to-top");
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add("active");
      } else {
        backtotop.classList.remove("active");
      }
    };
    window.addEventListener("load", toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  /**
   * Mobile nav toggle - EN
   */
  on("click", ".mobile-nav-toggle", function (e) {
    select("#navbar").classList.toggle("navbar-mobile");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  /**
   * Mobile nav dropdowns activate - EN
   */
  on(
    "click",
    ".navbar .dropdown > a",
    function (e) {
      if (select("#navbar").classList.contains("navbar-mobile")) {
        e.preventDefault();
        this.nextElementSibling.classList.toggle("dropdown-active");
      }
    },
    true
  );

    /**
   * Mobile nav toggle - AR
   */
    on("click", ".mobile-nav-toggle-ar", function (e) {
      select("#navbar-ar").classList.toggle("navbar-mobile-ar");
      this.classList.toggle("bi-list");
      this.classList.toggle("bi-x");
    });
  
    /**
     * Mobile nav dropdowns activate - AR
     */
    on(
      "click",
      ".navbar-ar .dropdown > a",
      function (e) {
        if (select("#navbar-ar").classList.contains("navbar-mobile-ar")) {
          e.preventDefault();
          this.nextElementSibling.classList.toggle("dropdown-active");
        }
      },
      true
    );

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on(
    "click",
    ".scrollto",
    function (e) {
      if (select(this.hash)) {
        e.preventDefault();

        let navbar = select("#navbar");
        if (navbar.classList.contains("navbar-mobile")) {
          navbar.classList.remove("navbar-mobile");
          let navbarToggle = select(".mobile-nav-toggle");
          navbarToggle.classList.toggle("bi-list");
          navbarToggle.classList.toggle("bi-x");
        }
        scrollto(this.hash);
      }
    },
    true
  );

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener("load", () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash);
      }
    }
  });

  /**
   * Hero carousel indicators
   */
  let heroCarouselIndicators = select("#hero-carousel-indicators");
  let heroCarouselItems = select("#heroCarousel .carousel-item", true);

  heroCarouselItems.forEach((item, index) => {
    index === 0
      ? (heroCarouselIndicators.innerHTML +=
          "<li data-bs-target='#heroCarousel' data-bs-slide-to='" +
          index +
          "' class='active'></li>")
      : (heroCarouselIndicators.innerHTML +=
          "<li data-bs-target='#heroCarousel' data-bs-slide-to='" +
          index +
          "'></li>");
  });

  /**
   * Clients Slider
   */
  new Swiper(".clients-slider", {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: "auto",
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 40,
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 60,
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 80,
      },
      992: {
        slidesPerView: 6,
        spaceBetween: 120,
      },
    },
  });

  /**
   * Skills animation
   */
  let skilsContent = select(".skills-content");
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: "80%",
      handler: function (direction) {
        let progress = select(".progress .progress-bar", true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute("aria-valuenow") + "%";
        });
      },
    });
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener("load", () => {
    let portfolioContainer = select(".portfolio-container");
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: ".portfolio-item",
        layoutMode: "fitRows",
      });

      let portfolioFilters = select("#portfolio-flters li", true);

      on(
        "click",
        "#portfolio-flters li",
        function (e) {
          e.preventDefault();
          portfolioFilters.forEach(function (el) {
            el.classList.remove("filter-active");
          });
          this.classList.add("filter-active");

          portfolioIsotope.arrange({
            filter: this.getAttribute("data-filter"),
          });
        },
        true
      );
    }
  });

  /**
   * Initiate portfolio lightbox
   */
  const portfolioLightbox = GLightbox({
    selector: ".portfolio-lightbox",
  });

  /**
   * Portfolio details slider
   */
  new Swiper(".portfolio-details-slider", {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();
})();

document.addEventListener("DOMContentLoaded", function () {
  var MalesDivAR = document.getElementById("MalesDivAR");
  MalesDivAR.addEventListener("click", function () {
    window.location.href = "Male-AR";
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var FemalesDivAR = document.getElementById("FemalesDivAR");
  FemalesDivAR.addEventListener("click", function () {
    window.location.href = "Female-AR";
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var FirstCycleDivAR = document.getElementById("FirstCycleDivAR");
  FirstCycleDivAR.addEventListener("click", function () {
    window.location.href = "FirstCycle-AR";
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var MalesDiv = document.getElementById("MalesDiv");
  MalesDiv.addEventListener("click", function () {
    window.location.href = "Male";
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var FemalesDiv = document.getElementById("FemalesDiv");
  FemalesDiv.addEventListener("click", function () {
    window.location.href = "Female";
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var FirstCycleDiv = document.getElementById("FirstCycleDiv");
  FirstCycleDiv.addEventListener("click", function () {
    window.location.href = "FirstCycle";
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var EnglishDiv = document.getElementById("EnglishDiv");
  EnglishDiv.addEventListener("click", function () {
    window.location.href = "English";
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var EnglishDivAR = document.getElementById("EnglishDivAR");
  EnglishDivAR.addEventListener("click", function () {
    window.location.href = "English-AR";
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var FrenchDiv = document.getElementById("FrenchDiv");
  FrenchDiv.addEventListener("click", function () {
    window.location.href = "French";
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var FrenchDivAR = document.getElementById("FrenchDivAR");
  FrenchDivAR.addEventListener("click", function () {
    window.location.href = "French-AR";
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var ActivityDiv = document.getElementById("ActivityDiv");
  ActivityDiv.addEventListener("click", function () {
    window.location.href = "Activity";
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var ActivityDivAR = document.getElementById("ActivityDivAR");
  ActivityDivAR.addEventListener("click", function () {
    window.location.href = "Activity-AR";
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var LibraryDiv = document.getElementById("LibraryDiv");
  LibraryDiv.addEventListener("click", function () {
    window.location.href = "Library";
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var LibraryDivAR = document.getElementById("LibraryDivAR");
  LibraryDivAR.addEventListener("click", function () {
    window.location.href = "Library-AR";
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var InformaticsDiv = document.getElementById("InformaticsDiv");
  InformaticsDiv.addEventListener("click", function () {
    window.location.href = "Informatics";
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var InformaticsDivAR = document.getElementById("InformaticsDivAR");
  InformaticsDivAR.addEventListener("click", function () {
    window.location.href = "Informatics-AR";
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var LaboratoryDiv = document.getElementById("LaboratoryDiv");
  LaboratoryDiv.addEventListener("click", function () {
    window.location.href = "Laboratories";
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var LaboratoryDivAR = document.getElementById("LaboratoryDivAR");
  LaboratoryDivAR.addEventListener("click", function () {
    window.location.href = "Laboratories-AR";
  });
});


