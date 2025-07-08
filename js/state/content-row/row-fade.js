(function (Drupal) {
  Drupal.behaviors.rowFadeVisibility = {
    attach: function (context, settings) {
      // Only run once per element.
      const elements = once('row-fade-visibility', '[data-visible]', context);
      if (!elements.length) return;

      // Intersection Observer callback.
      const callback = (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.target.getAttribute('data-visible') !== 'visible') {
            entry.target.setAttribute('data-visible', 'visible');
          }
        });
      };

      // Observer options.
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      };

      // Create observer.
      const observer = new IntersectionObserver(callback, options);

      // Observe each element.
      elements.forEach(element => observer.observe(element));
    }
  };
})(Drupal);
