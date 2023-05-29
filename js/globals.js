export function rem(multiplier) {
  const fontSize = parseInt(
    window.getComputedStyle(document.getElementsByTagName('html')[0])[
      'fontSize'],
  );
  return multiplier ? parseInt(fontSize * multiplier) : fontSize;
}
  
export function inView(elem) {
  const distance = elem.getBoundingClientRect();
  return (
    distance.top <= window.innerHeight
  );
}

export function toggleSlidesAttribute(slider) {
  const activeSlides = slider.querySelectorAll(
    '.swiper-slide.swiper-slide-active',
  );
  const nonActiveSlides = slider.querySelectorAll(
    '.swiper-slide:not(.swiper-slide-active)',
  );

  activeSlides.forEach((activeSlide) => {
    const slideLinks = activeSlide.querySelectorAll('a');
    slideLinks.forEach((slideLink) => slideLink.removeAttribute('tabindex'));
    activeSlide.removeAttribute('tabindex');
  });
  nonActiveSlides.forEach((nonActiveSlides) => {
    const slideLinks = nonActiveSlides.querySelectorAll('a');
    slideLinks.forEach((slideLink) => slideLink.setAttribute('tabindex', -1));
    nonActiveSlides.setAttribute('tabindex', -1);
  });
}
export function updateCurrentSlideNumber(sliderControl, swiper) {
  const currentAlertDiv = sliderControl.querySelector(
    '.slider-controls__index .current',
  );

  currentAlertDiv.innerHTML = swiper?.realIndex ? swiper?.realIndex + 1 : 1;
}
export function sliderStartingData(sliderControl, totalSlide) {
  const totalAlertDiv = sliderControl.querySelector(
    '.slider-controls__index .total',
  );

  totalAlertDiv.innerHTML = totalSlide;
  sliderControl.classList.remove('slider-controls--hidden');
}