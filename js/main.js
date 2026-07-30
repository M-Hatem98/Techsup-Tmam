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
      alert("Your demo request has been received. Our team will contact you shortly.");
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

  // Pricing tabs
  const pricingCards = document.querySelectorAll("[data-plan-index]");
  const productTabs = document.querySelectorAll("[data-pricing-product]");
  const periodTabs = document.querySelectorAll("[data-pricing-period]");

  const pricingPlans = {
    attendance: [
      {
        title: "Attendance Essentials",
        description: "For small teams that need simple attendance control",
        prices: { monthly: "19", quarterly: "54", semi: "102", yearly: "190" },
        features: [
          "Up to 50 employees",
          "Daily attendance tracking",
          "Leave and approval workflow",
          "Basic reports and exports"
        ],
        action: "Get Started"
      },
      {
        title: "Attendance Plus",
        description: "For growing teams that need stronger attendance control",
        badge: "Most Popular",
        prices: { monthly: "17", quarterly: "52", semi: "100", yearly: "180" },
        features: [
          "Up to 100 employees",
          "Attendance analytics and policy controls",
          "Shift scheduling and location rules",
          "Priority support and onboarding"
        ],
        action: "Choose Plan"
      },
      {
        title: "Attendance Enterprise",
        description: "Tailored for multi-branch attendance operations",
        prices: { monthly: "Custom", quarterly: "Custom", semi: "Custom", yearly: "Custom" },
        features: [
          "Unlimited employees",
          "Advanced attendance automation",
          "Dedicated implementation and account support",
          "Custom integrations and reporting"
        ],
        action: "Contact Sales"
      }
    ],
    payroll: [
      {
        title: "Payroll Starter",
        description: "For teams moving salary records into one workspace",
        prices: { monthly: "25", quarterly: "71", semi: "135", yearly: "250" },
        features: [
          "Up to 50 employees",
          "Payroll records and salary components",
          "Payslip generation",
          "Payroll exports"
        ],
        action: "Get Started"
      },
      {
        title: "Payroll Professional",
        description: "For finance teams with recurring payroll operations",
        badge: "Most Popular",
        prices: { monthly: "23", quarterly: "70", semi: "132", yearly: "240" },
        features: [
          "Up to 150 employees",
          "Loans and contract salary components",
          "Approval-ready payroll records",
          "Priority payroll support"
        ],
        action: "Choose Plan"
      },
      {
        title: "Payroll Enterprise",
        description: "For complex payroll policies and organization structures",
        prices: { monthly: "Custom", quarterly: "Custom", semi: "Custom", yearly: "Custom" },
        features: [
          "Unlimited employees",
          "Advanced payroll policies",
          "Dedicated implementation and account support",
          "Custom finance exports and integrations"
        ],
        action: "Contact Sales"
      }
    ],
    bundle: [
      {
        title: "Attendance & Payroll Basic",
        description: "For teams that want attendance and payroll connected",
        prices: { monthly: "39", quarterly: "111", semi: "211", yearly: "390" },
        features: [
          "Up to 50 employees",
          "Attendance tracking and leave workflow",
          "Payroll records and payslips",
          "Basic reports and exports"
        ],
        action: "Get Started"
      },
      {
        title: "Attendance & Payroll Growth",
        description: "For growing companies that want people and pay in one place",
        badge: "Best Value",
        prices: { monthly: "37", quarterly: "109", semi: "205", yearly: "370" },
        features: [
          "Up to 150 employees",
          "Attendance analytics and policy controls",
          "Payroll records, payslips, and exports",
          "Priority support and onboarding"
        ],
        action: "Choose Plan"
      },
      {
        title: "Attendance & Payroll Enterprise",
        description: "Tailored for multi-branch and finance-led organizations",
        prices: { monthly: "Custom", quarterly: "Custom", semi: "Custom", yearly: "Custom" },
        features: [
          "Unlimited employees",
          "Advanced attendance and payroll automation",
          "Dedicated implementation and account support",
          "Custom integrations and reporting"
        ],
        action: "Contact Sales"
      }
    ]
  };

  const periodLabels = {
    monthly: "/user",
    quarterly: "/user",
    semi: "/user",
    yearly: "/user"
  };

  const setActiveTab = (tabs, activeTab) => {
    tabs.forEach((tab) => {
      tab.classList.toggle("active", tab === activeTab);
    });
  };

  const renderPrice = (price, period) => {
    if (price === "Custom") {
      return "Custom";
    }

    return `<img src="img/Saudi_Riyal_Symbol.png" alt="Saudi_Riyal_Symbol" width="20px"> ${price}<span>${periodLabels[period]}</span>`;
  };

  const updatePricing = () => {
    if (!pricingCards.length) {
      return;
    }

    const activeProductTab = document.querySelector("[data-pricing-product].active");
    const activePeriodTab = document.querySelector("[data-pricing-period].active");

    if (!activeProductTab || !activePeriodTab) {
      return;
    }

    const activeProduct = activeProductTab.dataset.pricingProduct;
    const activePeriod = activePeriodTab.dataset.pricingPeriod;

    pricingCards.forEach((card) => {
      const plan = pricingPlans[activeProduct][Number(card.dataset.planIndex)];
      const badge = card.querySelector("[data-plan-badge]");

      card.querySelector("[data-plan-title]").textContent = plan.title;
      card.querySelector("[data-plan-description]").textContent = plan.description;
      card.querySelector("[data-plan-price]").innerHTML = renderPrice(plan.prices[activePeriod], activePeriod);
      card.querySelector("[data-plan-features]").innerHTML = plan.features
        .map((feature) => `<li><i class="fas fa-check"></i> ${feature}</li>`)
        .join("");
      card.querySelector("[data-plan-action]").textContent = plan.action;

      if (badge) {
        badge.textContent = plan.badge || "";
        badge.style.display = plan.badge ? "inline-block" : "none";
      }
    });
  };

  productTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      setActiveTab(productTabs, tab);
      updatePricing();
    });
  });

  periodTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      setActiveTab(periodTabs, tab);
      updatePricing();
    });
  });

  updatePricing();

  // Pricing checkout page
  const checkoutPlans = document.querySelectorAll("[data-checkout-plan]");
  const checkoutPeriodTabs = document.querySelectorAll("[data-checkout-period]");
  const usersInput = document.querySelector("[data-pricing-users]");

  const checkoutPeriods = {
    monthly: { label: "Monthly", months: 1, discount: 0 },
    quarterly: { label: "Quarterly", months: 3, discount: 0.05 },
    semi: { label: "Semi", months: 6, discount: 0.1 },
    yearly: { label: "Yearly", months: 12, discount: 0.15 }
  };

  const formatSar = (value) => {
    const formattedValue = value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

    return `<img src="img/Saudi_Riyal_Symbol.png" alt="Saudi Riyal" width="20px"> ${formattedValue}`;
  };

  const getSelectedCheckoutPlan = () => {
    return document.querySelector("[data-checkout-plan].selected") || checkoutPlans[0];
  };

  const updateCheckoutSummary = () => {
    if (!checkoutPlans.length || !usersInput) {
      return;
    }

    const selectedPlan = getSelectedCheckoutPlan();
    const selectedPeriodTab = document.querySelector("[data-checkout-period].active");
    const periodKey = selectedPeriodTab ? selectedPeriodTab.dataset.checkoutPeriod : "monthly";
    const period = checkoutPeriods[periodKey];
    const users = Math.max(1, Number(usersInput.value) || 1);
    const monthlyPrice = Number(selectedPlan.dataset.planPrice);
    const subtotal = monthlyPrice * users * period.months;
    const discount = subtotal * period.discount;
    const afterDiscount = subtotal - discount;
    const vat = afterDiscount * 0.15;
    const total = afterDiscount + vat;

    usersInput.value = users;

    document.querySelector("[data-summary-package]").textContent = selectedPlan.dataset.planName;
    document.querySelector("[data-summary-users]").textContent = users;
    document.querySelector("[data-summary-period]").textContent = period.label;
    document.querySelector("[data-summary-subtotal]").textContent = formatSar(subtotal);
    document.querySelector("[data-summary-discount]").textContent = formatSar(discount);
    document.querySelector("[data-summary-vat]").textContent = formatSar(vat);
    document.querySelector("[data-summary-total]").textContent = formatSar(total);
  };

  checkoutPlans.forEach((plan) => {
    plan.addEventListener("click", () => {
      checkoutPlans.forEach((item) => {
        item.classList.remove("selected");
        const button = item.querySelector(".price-btn");
        if (button) {
          button.classList.remove("primary-btn");
        }
      });

      plan.classList.add("selected");
      const button = plan.querySelector(".price-btn");
      if (button) {
        button.classList.add("primary-btn");
      }

      updateCheckoutSummary();
    });
  });

  checkoutPeriodTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      setActiveTab(checkoutPeriodTabs, tab);
      updateCheckoutSummary();
    });
  });

  document.querySelectorAll("[data-users-step]").forEach((button) => {
    button.addEventListener("click", () => {
      if (!usersInput) {
        return;
      }

      const nextUsers = (Number(usersInput.value) || 1) + Number(button.dataset.usersStep);
      usersInput.value = Math.max(1, nextUsers);
      updateCheckoutSummary();
    });
  });

  if (usersInput) {
    usersInput.addEventListener("input", updateCheckoutSummary);
    usersInput.addEventListener("blur", updateCheckoutSummary);
  }

  updateCheckoutSummary();

  if (window.lightbox) {
    lightbox.option({
      resizeDuration: 200,
      fadeDuration: 200,
      alwaysShowNavOnTouchDevices: true,
      wrapAround: true
    });
  }

  const compareFilters = document.querySelectorAll(
    ".pricing-comparison__filters button[data-compare-system], " +
    ".pricing-comparison__filters button[data-compare-period], " +
    ".pricing-comparison__filters button[data-compare-band], " +
    "button[data-compare-payment]"
  );
  const comparePriceCells = document.querySelectorAll("[data-compare-cell]");
  const comparePriceCards = document.querySelectorAll("[data-compare-price]");
  const compareCards = document.querySelectorAll("[data-compare-plan]");
  const compareSummary = document.querySelector(".summary-card");
  const compareSummaryLines = {
    package: compareSummary ? compareSummary.querySelector("[data-summary-field=package] strong") : null,
    employees: compareSummary ? compareSummary.querySelector("[data-summary-field=employees] strong") : null,
    billing: compareSummary ? compareSummary.querySelector("[data-summary-field=billing] strong") : null,
    base: compareSummary ? compareSummary.querySelector("[data-summary-field=base] strong") : null,
    discount: compareSummary ? compareSummary.querySelector("[data-summary-field=discount] strong") : null,
    vat: compareSummary ? compareSummary.querySelector("[data-summary-field=vat] strong") : null,
    total: compareSummary ? compareSummary.querySelector("[data-summary-field=total] strong") : null
  };

  const comparePlans = {
    attendance: { label: "Attendance", icon: "fas fa-users" },
    payroll: { label: "Payroll", icon: "fas fa-file-invoice-dollar" },
    bundle: { label: "Complete Package", icon: "fas fa-check-circle" }
  };

  const comparePlanPrices = {
    attendance: {
      monthly: { "5-50": "19", "51-200": "17", "201+": "Custom" },
      quarterly: { "5-50": "54", "51-200": "52", "201+": "Custom" },
      semi: { "5-50": "102", "51-200": "100", "201+": "Custom" },
      yearly: { "5-50": "190", "51-200": "180", "201+": "Custom" }
    },
    payroll: {
      monthly: { "5-50": "25", "51-200": "23", "201+": "Custom" },
      quarterly: { "5-50": "71", "51-200": "70", "201+": "Custom" },
      semi: { "5-50": "135", "51-200": "132", "201+": "Custom" },
      yearly: { "5-50": "250", "51-200": "240", "201+": "Custom" }
    },
    bundle: {
      monthly: { "5-50": "39", "51-200": "37", "201+": "Custom" },
      quarterly: { "5-50": "111", "51-200": "109", "201+": "Custom" },
      semi: { "5-50": "211", "51-200": "205", "201+": "Custom" },
      yearly: { "5-50": "390", "51-200": "370", "201+": "Custom" }
    }
  };

  const compareBandSizes = {
    "5-50": 30,
    "51-200": 125,
    "201+": 220
  };

  const getCompareActive = (type) => {
    const active = document.querySelector(`[data-compare-${type}].active`);
    return active ? active.dataset[`compare${type.charAt(0).toUpperCase() + type.slice(1)}`] : null;
  };

  const updateComparePriceCells = () => {
    const selectedPeriod = getCompareActive("period") || "yearly";

    comparePriceCells.forEach((cell) => {
      const plan = cell.dataset.compareCell;
      const band = cell.dataset.compareBand;
      const planPrices = comparePlanPrices[plan]?.[selectedPeriod];
      if (!planPrices) {
        cell.innerHTML = "Custom pricing";
        return;
      }

      const price = planPrices[band];
      if (price === "Custom") {
        cell.innerHTML = "Custom pricing";
      } else {
        cell.innerHTML = `<img src="img/Saudi_Riyal_Symbol.png" alt="Saudi Riyal" width="16px"> ${price}`;
      }
    });
  };

  const updateComparePriceCards = () => {
    const selectedPeriod = getCompareActive("period") || "yearly";
    const periodLabel = selectedPeriod === "monthly"
      ? "/user/month"
      : selectedPeriod === "quarterly"
      ? "/user/quarter"
      : selectedPeriod === "semi"
      ? "/user/6 months"
      : "/user/year";

    comparePriceCards.forEach((card) => {
      const plan = card.dataset.comparePrice;
      const planPrices = comparePlanPrices[plan]?.[selectedPeriod];
      if (!planPrices) return;

      const price = planPrices[getCompareActive("band") || "51-200"];
      const valueEl = card.querySelector(".compare-price-value");
      const suffixEl = card.querySelector("small");

      if (price === "Custom") {
        if (valueEl) valueEl.textContent = "Custom";
        if (suffixEl) suffixEl.textContent = "";
      } else {
        if (valueEl) valueEl.textContent = price;
        if (suffixEl) suffixEl.textContent = periodLabel;
      }
    });
  };

  const updateCompareCards = () => {
    const selectedSystem = getCompareActive("system") || "attendance";
    compareCards.forEach((card) => {
      card.classList.toggle("compare-card--active", card.dataset.comparePlan === selectedSystem);
    });
  };

  const updateCompareSummary = () => {
    const selectedSystem = getCompareActive("system") || "attendance";
    const selectedPeriod = getCompareActive("period") || "yearly";
    const selectedBand = getCompareActive("band") || "51-200";
    const selectedPayment = getCompareActive("payment") || "yearly";

    if (!compareSummary) return;

    const planLabel = comparePlans[selectedSystem]?.label || "Complete Package";
    const periodLabel = selectedPayment === "semi" ? "6 months" : selectedPayment.charAt(0).toUpperCase() + selectedPayment.slice(1);
    const employeesLabel = selectedBand === "201+" ? "201+ employees" : `${selectedBand.replace("-", "–")} employees`;
    const basePrice = comparePlanPrices[selectedSystem]?.[selectedPeriod]?.[selectedBand] || "Custom";
    const discountRate = selectedPayment === "yearly" ? 0.15 : selectedPayment === "semi" ? 0.10 : 0;
    const priceValue = basePrice === "Custom" ? 0 : Number(basePrice);
    const employeeCount = compareBandSizes[selectedBand] || 75;
    const subtotal = priceValue * employeeCount;
    const discount = subtotal * discountRate;
    const afterDiscount = subtotal - discount;
    const vat = afterDiscount * 0.15;
    const total = afterDiscount + vat;

    const format = (value) => `<img src="img/Saudi_Riyal_Symbol.png" alt="Saudi Riyal" width="16px"> ${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    if (compareSummaryLines.package) compareSummaryLines.package.textContent = planLabel;
    if (compareSummaryLines.employees) compareSummaryLines.employees.textContent = employeesLabel;
    if (compareSummaryLines.billing) compareSummaryLines.billing.textContent = periodLabel;
    if (compareSummaryLines.base) compareSummaryLines.base.innerHTML = priceValue ? format(subtotal) : "Custom pricing";
    if (compareSummaryLines.discount) compareSummaryLines.discount.innerHTML = priceValue ? `- ${format(discount)}` : "-";
    if (compareSummaryLines.vat) compareSummaryLines.vat.innerHTML = priceValue ? format(vat) : "-";
    if (compareSummaryLines.total) compareSummaryLines.total.innerHTML = priceValue ? format(total) : "Custom pricing";

    const discountLabelText = discountRate > 0 ? `Discount ${Math.round(discountRate * 100)}%` : "Discount";
    const vatLabelText = `VAT 15%`;
    const discountLabel = compareSummary ? compareSummary.querySelector("[data-summary-label=discount]") : null;
    const vatLabel = compareSummary ? compareSummary.querySelector("[data-summary-label=vat]") : null;
    if (discountLabel) discountLabel.textContent = discountLabelText;
    if (vatLabel) vatLabel.textContent = vatLabelText;
  };

  const updateCompareSection = () => {
    updateComparePriceCells();
    updateComparePriceCards();
    updateCompareCards();
    updateCompareSummary();
  };

  compareFilters.forEach((filter) => {
    filter.addEventListener("click", () => {
      const groupType = Array.from(filter.attributes)
        .map((attr) => attr.name)
        .find((name) => name.startsWith("data-compare-"));
      if (!groupType) return;

      const filterType = groupType.replace("data-compare-", "");
      const filterValue = filter.dataset[`compare${filterType.charAt(0).toUpperCase() + filterType.slice(1)}`];
      const filterGroup = document.querySelectorAll(`[data-compare-${filterType}]`);

      filterGroup.forEach((btn) => {
        const isActive = btn.dataset[`compare${filterType.charAt(0).toUpperCase() + filterType.slice(1)}`] === filterValue;
        btn.classList.toggle("active", isActive);
        if (btn.hasAttribute("aria-pressed")) {
          btn.setAttribute("aria-pressed", isActive ? "true" : "false");
        }
      });

      updateCompareSection();
    });
  });

  updateCompareSection();

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
