(function ($) {
  "use strict";

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);
  };
  spinner();

  // Initiate the wowjs only when the WOW library is available
  if (typeof WOW !== "undefined") {
    new WOW().init();
  }

  // Sticky Navbar
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".sticky-top").addClass("bg-white shadow-sm").css("top", "0px");
      $('.navbar-brand img').attr('src', 'img/logo-dark.png');
    } else {
      $(".sticky-top").removeClass("bg-white shadow-sm").css("top", "-150px");
      $('.navbar-brand img').attr('src', 'img/logo.png');
    }
  });

// Login Modal

const modalForm = document.getElementById("getStartedForm");
const modalEmailInput = document.getElementById("email");
const modalErrorText = modalEmailInput ? modalEmailInput.nextElementSibling : null;

if (modalForm && modalEmailInput && modalErrorText) {
  modalForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let valid = true;

    const email = modalEmailInput.value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(email)) {
      modalErrorText.textContent = "Enter a valid email";
      modalEmailInput.classList.add("is-invalid");
      valid = false;
    } else {
      modalErrorText.textContent = "";
      modalEmailInput.classList.remove("is-invalid");
    }

    if (valid) {
      alert("Welcome! We will contact you soon.");
      modalForm.reset();

      // close modal
      const modal = bootstrap.Modal.getInstance(document.getElementById("getStartedModal"));
      if (modal) {
        modal.hide();
      }
    }
  });
}


  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  function enableLightbox(images, groupPrefix) {
    images.forEach((img, index) => {
      if (!img || !img.getAttribute("src") || img.closest("a[data-lightbox]")) {
        return;
      }

      const link = document.createElement("a");
      link.href = img.getAttribute("src");
      link.setAttribute("data-lightbox", `${groupPrefix}-${index + 1}`);
      link.setAttribute("data-title", img.getAttribute("alt") || "Tamam screenshot");
      link.className = "d-block lightbox-trigger";

      img.parentNode.insertBefore(link, img);
      link.appendChild(img);
    });
  }

  enableLightbox(
    document.querySelectorAll(".service-detail__image"),
    "attendance-service"
  );

  enableLightbox(
    document.querySelectorAll("#payroll-services .why-choose-pillar img"),
    "payroll-service"
  );

  if (window.lightbox) {
    lightbox.option({
      resizeDuration: 200,
      fadeDuration: 200,
      alwaysShowNavOnTouchDevices: true,
      wrapAround: true
    });
  }

  // Reveals

  const reveals = document.querySelectorAll(
    ".service-detail, .how-step, .pricing-future, .price-card, .why-choose-pillar, cta-card");

  function revealOnScroll() {
    const windowHeight = window.innerHeight;

    reveals.forEach((el) => {
      const elementTop = el.getBoundingClientRect().top;

      if (elementTop < windowHeight - 100) {
        el.classList.add("active");
        el.classList.add("reveal");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();

  //   Hero Counter

  const counters = document.querySelectorAll(".counter");

  const runCounter = (counter) => {
    const target = +counter.getAttribute("data-target");
    let count = 0;

    const update = () => {
      const increment = target / 100;

      if (count < target) {
        count += increment;
        counter.innerText = Math.floor(count).toLocaleString();
        requestAnimationFrame(update);
      } else {
        counter.innerText = target.toLocaleString();
      }
    };

    update();
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        runCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  });

  counters.forEach((counter) => observer.observe(counter));

// Newsletter

  const form = document.querySelector(".newsletter-form");
  const input = document.querySelector(".newsletter-input");
  const errorText = document.querySelector(".newsletter-error");
  const suggestionsBox = document.querySelector(".email-suggestions");

  if (form && input && errorText && suggestionsBox) {
    /* ===== Email Regex ===== */
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    /* ===== Common Domains ===== */
    const domains = [
      "gmail.com",
      "yahoo.com",
      "outlook.com",
      "hotmail.com"
    ];

    /* ===== Validate Email ===== */
    function validateEmail() {
      const value = input.value.trim();

      if (value === "") {
        showError("Email is required");
        return false;
      }

      if (!emailRegex.test(value)) {
        showError("Please enter a valid email");
        return false;
      }

      showSuccess();
      return true;
    }

    function showError(message) {
      input.classList.add("error");
      input.classList.remove("success");
      errorText.innerText = message;
    }

    function showSuccess() {
      input.classList.remove("error");
      input.classList.add("success");
      errorText.innerText = "";
    }

    /* ===== Suggestions Logic ===== */
    input.addEventListener("input", () => {
      const value = input.value;
      suggestionsBox.innerHTML = "";

      if (!value.includes("@")) {
        suggestionsBox.style.display = "none";
        return;
      }

      const [name, domainPart] = value.split("@");

      if (!name) return;

      const filtered = domains.filter(d => d.startsWith(domainPart || ""));

      if (filtered.length === 0) {
        suggestionsBox.style.display = "none";
        return;
      }

      filtered.forEach(domain => {
        const suggestion = document.createElement("div");
        suggestion.innerText = `${name}@${domain}`;

        suggestion.addEventListener("click", () => {
          input.value = suggestion.innerText;
          suggestionsBox.style.display = "none";
          validateEmail();
        });

        suggestionsBox.appendChild(suggestion);
      });

      suggestionsBox.style.display = "block";
    });

    /* Hide suggestions on click outside */
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".newsletter-field")) {
        suggestionsBox.style.display = "none";
      }
    });

    /* ===== Form Submit ===== */
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      if (validateEmail()) {
        const btn = form.querySelector(".newsletter-btn");

        btn.innerText = "Subscribed ✓";
        btn.style.background = "#22c55e";

        setTimeout(() => {
          btn.innerText = "Subscribe";
          btn.style.background = "#135829";
          form.reset();
          input.classList.remove("success");
        }, 2000);
      }
    });

    input.addEventListener("blur", validateEmail);
  }

  // Contact
  const contactForm = document.getElementById("contactForm");
  const emailInput = document.getElementById("email");

  if (contactForm && emailInput) {
    const contacterrorText = emailInput.nextElementSibling;

    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      let isValid = true;

      const emailValue = emailInput.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(emailValue)) {
        if (contacterrorText) {
          contacterrorText.textContent = "Please enter a valid email address";
        }
        emailInput.classList.add("is-invalid");
        isValid = false;
      } else {
        if (contacterrorText) {
          contacterrorText.textContent = "";
        }
        emailInput.classList.remove("is-invalid");
      }

      if (isValid) {
        alert("Message sent successfully 🚀");
        contactForm.reset();
      }
    });
  }


})(jQuery);
