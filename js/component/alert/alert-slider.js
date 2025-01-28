import { toggleSlidesAttribute, updateCurrentSlideNumber, sliderStartingData } from "../../globals";

(function($) {
  const alertSlider = document.querySelector('.alerts-banner__slider-wrapper');
  if (!alertSlider) return;

  const alertsSlides = alertSlider.querySelectorAll('.alert');
  if (alertsSlides.length <= 1) return;

  const sliderWrapper = alertSlider.querySelector('.view-alerts-carousel');
  const sliderControlDiv = alertSlider.querySelector('.slider-controls');
  const prevButtonDiv = alertSlider.querySelector(
    '.slider-controls__button--prev',
  );
  const nextButtonDiv = alertSlider.querySelector(
    '.slider-controls__button--next',
  );

  const navButtonsObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'aria-hidden') {
        const target = mutation.target;
        if (target === prevButtonDiv || target === nextButtonDiv) {
          target.removeAttribute('aria-hidden');
        }
      }
    });
  });
  [prevButtonDiv, nextButtonDiv].forEach(button => {
    navButtonsObserver.observe(button, {
      attributes: true,
      attributeFilter: ['aria-hidden']
    });
  });

  sliderStartingData(sliderControlDiv, alertsSlides.length);

  const alertSwiper = new Swiper(sliderWrapper, {
    loop: true,
    autoHeight: true,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    // Navigation arrows
    navigation: {
      nextEl: nextButtonDiv,
      prevEl: prevButtonDiv,
    },
    // a11y
    a11y: {
      prevSlideMessage: 'Previous slide',
      nextSlideMessage: 'Next slide',
    },
    on: {
      afterInit: function () {
        toggleSlidesAttribute(alertSlider);
        prevButtonDiv.removeAttribute('aria-hidden');
        nextButtonDiv.removeAttribute('aria-hidden');
      },
      transitionEnd: function () {
        toggleSlidesAttribute(alertSlider);
        updateCurrentSlideNumber(sliderControlDiv, this);
      },
    },
  });
})(jQuery);