function observeVisibility() {
  // Callback function for the Intersection Observer
  const callback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.target.getAttribute('data-visible') !== 'visible') {
        entry.target.setAttribute('data-visible', 'visible');
      }
    });
  };

  // Options for the Intersection Observer
  const options = {
    root: null, // Use the viewport as the root
    rootMargin: '0px',
    threshold: 0.1 // Trigger the callback when at least 10% of the element is visible
  };

  // Create the Intersection Observer
  const observer = new IntersectionObserver(callback, options);

  // Target all elements with the data-visible attribute
  const elements = document.querySelectorAll('[data-visible]');
  if(!elements.length) return;

  // Observe each element
  elements.forEach(element => observer.observe(element));
}

observeVisibility();
