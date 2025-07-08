import { toggleSlidesAttribute, updateCurrentSlideNumber, sliderStartingData } from "../../globals";

(function (Drupal) {
  Drupal.behaviors.imagesSlider = {
    attach(context) {
      const imagesSliders = context.querySelectorAll('.images-slider:not([data-images-slider-processed])');
      if (!imagesSliders.length) return;

      imagesSliders.forEach((imagesSlider) => {
        imagesSlider.setAttribute('data-images-slider-processed', 'true');

        const imagesSlides = imagesSlider.querySelectorAll('.images-slider__slide');
        if (imagesSlides.length <= 1) return;

        const sliderWrapper = imagesSlider.querySelector('.images-slider__slider');
        const sliderControlDiv = imagesSlider.querySelector('.slider-controls');
        const prevButtonDiv = imagesSlider.querySelector('.slider-controls__button--prev');
        const nextButtonDiv = imagesSlider.querySelector('.slider-controls__button--next');

        // MutationObserver to remove aria-hidden from nav buttons
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

        sliderStartingData(sliderControlDiv, imagesSlides.length);

        // Initialize Swiper
        // Assumes Swiper is globally available
        const imageSwiper = new Swiper(sliderWrapper, {
          loop: true,
          autoHeight: true,
          effect: 'fade',
          fadeEffect: {
            crossFade: true
          },
          navigation: {
            nextEl: nextButtonDiv,
            prevEl: prevButtonDiv,
          },
          a11y: {
            prevSlideMessage: 'Previous slide',
            nextSlideMessage: 'Next slide',
          },
          on: {
            afterInit: function () {
              toggleSlidesAttribute(imagesSlider);
              prevButtonDiv.removeAttribute('aria-hidden');
              nextButtonDiv.removeAttribute('aria-hidden');
            },
            transitionEnd: function () {
              toggleSlidesAttribute(imagesSlider);
              updateCurrentSlideNumber(sliderControlDiv, this);
            },
          },
        });
      });
    }
  };
})(Drupal);
