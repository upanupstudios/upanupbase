(function (Drupal) {
  Drupal.behaviors.accordionHeading = {
    attach: function (context) {
      // Utility to replace heading tag while preserving classes and content
      function replaceHeadingTag(element, newTag) {
        const newHeading = document.createElement(newTag);
        newHeading.className = element.className;
        newHeading.innerHTML = element.innerHTML;
        element.replaceWith(newHeading);
      }

      // Replace .accordion__heading <h3> with <h2> if no .content-row__title in parent .content-row
      document.querySelectorAll('.accordion__heading', context).forEach(function (heading) {
        const contentRow = heading.closest('.content-row');
        if (contentRow && !contentRow.querySelector('.content-row__title')) {
          if (heading.tagName.toLowerCase() !== 'h2') {
            replaceHeadingTag(heading, 'h2');
          }
        }
      });

      // Replace .accordion-block__heading <h2> with <h3> if parent .block has direct <h2>
      document.querySelectorAll('.accordion-block__heading', context).forEach(function (heading) {
        const block = heading.closest('.block');
        if (block && block.querySelector(':scope > h2')) {
          if (heading.tagName.toLowerCase() !== 'h3') {
            replaceHeadingTag(heading, 'h3');
          }
        }
      });
    }
  };
})(Drupal);