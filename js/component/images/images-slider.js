import { toggleSlidesAttribute, updateCurrentSlideNumber, sliderStartingData } from "../../globals";

(function($) {

  const imagesSliders = document.querySelectorAll('.images-slider');
  if (!imagesSliders.length) return;

  imagesSliders.forEach((imagesSlider) => {
    const imagesSlides = imagesSlider.querySelectorAll(
      '.images-slider__slide',
    );
    if (imagesSlides.length <= 1) return;

    const sliderWrapper = imagesSlider.querySelector(
      '.images-slider__slider',
    );
    const sliderControlDiv =
      imagesSlider.querySelector('.slider-controls');
    const prevButtonDiv = imagesSlider.querySelector(
      '.slider-controls__button--prev',
    );
    const nextButtonDiv = imagesSlider.querySelector(
      '.slider-controls__button--next',
    );

    sliderStartingData(sliderControlDiv, imagesSlides.length);

    const imageSwiper = new Swiper(sliderWrapper, {
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
          toggleSlidesAttribute(imagesSlider);
        },
        slideChangeTransitionEnd: function () {
          toggleSlidesAttribute(imagesSlider);
          updateCurrentSlideNumber(sliderControlDiv, this);
        },
      },
    });
  });

})(jQuery);