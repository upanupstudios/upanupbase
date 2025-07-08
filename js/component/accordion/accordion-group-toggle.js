(function (Drupal) {
	Drupal.behaviors.accordionGroupToggle = {
		attach: function (context) {
			context.querySelectorAll('.accordion-group__toggle:not([data-accordion-toggle-initialized])').forEach(function (toggleBtn) {
				toggleBtn.setAttribute('data-accordion-toggle-initialized', 'true');

				toggleBtn.addEventListener('click', function () {
					// Toggle state
					const isClosed = toggleBtn.getAttribute('data-toggle-state') === 'close';
					const newState = isClosed ? 'open' : 'close';
					toggleBtn.setAttribute('data-toggle-state', newState);

					// Toggle aria-pressed
					toggleBtn.setAttribute('aria-pressed', isClosed ? 'true' : 'false');

					// Toggle button text
					toggleBtn.textContent = isClosed ? 'Close all' : 'Open all';

					// Find the accordion group
					const accordionGroup = toggleBtn.closest('.accordion-group');
					if (!accordionGroup) return;

					accordionGroup.querySelectorAll('.accordion').forEach(function (accordion) {
						const trigger = accordion.querySelector('.accordion__trigger');
						const content = accordion.querySelector('.accordion__content');
						if (!trigger || !content) return;

						if (isClosed) {
							trigger.setAttribute('aria-expanded', 'true');
							const label = trigger.getAttribute('aria-label');
							if (label) {
								trigger.setAttribute('aria-label', label.replace(', Show this section', ', Hide this section'));
							}
							content.setAttribute('aria-hidden', 'false');
							content.style.display = '';
						} else {
							trigger.setAttribute('aria-expanded', 'false');
							const label = trigger.getAttribute('aria-label');
							if (label) {
								trigger.setAttribute('aria-label', label.replace(', Hide this section', ', Show this section'));
							}
							content.setAttribute('aria-hidden', 'true');
							content.style.display = 'none';
						}
					});
				});
			});
		}
	};
})(Drupal);