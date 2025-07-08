export function toggleSlidesAttribute(slider) {
  const activeSlides = slider.querySelectorAll('.swiper-slide.swiper-slide-active');
  const nonActiveSlides = slider.querySelectorAll('.swiper-slide:not(.swiper-slide-active)');

  activeSlides.forEach(activeSlide => {
    const slideLinks = activeSlide.querySelectorAll('a');
    slideLinks.forEach(slideLink => {
      slideLink.removeAttribute('tabindex');
    });
    activeSlide.removeAttribute('tabindex');
    activeSlide.removeAttribute('aria-hidden');
  });

  nonActiveSlides.forEach(nonActiveSlide => {
    const slideLinks = nonActiveSlide.querySelectorAll('a');
    slideLinks.forEach(slideLink => {
      slideLink.setAttribute('tabindex', -1);
    });
    nonActiveSlide.setAttribute('tabindex', -1);
    nonActiveSlide.setAttribute('aria-hidden', 'true');
  });
}

export function updateCurrentSlideNumber(sliderControl, swiper) {
  const currentAlertDiv = sliderControl.querySelector('.slider-controls__index .current');
  if (currentAlertDiv) {
    currentAlertDiv.innerHTML = (swiper && typeof swiper.realIndex === 'number') ? swiper.realIndex + 1 : 1;
  }
}

export function sliderStartingData(sliderControl, totalSlide) {
  const totalAlertDiv = sliderControl.querySelector('.slider-controls__index .total');
  if (totalAlertDiv) {
    totalAlertDiv.innerHTML = totalSlide;
  }
  sliderControl.classList.remove('slider-controls--hidden');
}
