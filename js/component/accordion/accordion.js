(function (Drupal) {
	Drupal.behaviors.accordion = {
		attach: function (context) {
			// Add aria-labels if missing
			document.querySelectorAll('.accordion__trigger:not([aria-label])', context).forEach(function (trigger) {
				const accordionText = trigger.textContent.trim();
				trigger.setAttribute('aria-label', accordionText + ', Show this section');
			});

			// Click handler for accordion triggers
			context.querySelectorAll('.accordion__trigger').forEach(function (trigger) {
				if (!trigger.hasAttribute('data-accordion-initialized')) {
					trigger.setAttribute('data-accordion-initialized', 'true');
					trigger.addEventListener('click', function (e) {
						// Toggle aria-expanded
						const expanded = trigger.getAttribute('aria-expanded') === 'true';
						trigger.setAttribute('aria-expanded', (!expanded).toString());

						// Toggle aria-label
						const accordionText = trigger.textContent.trim();
						const showLabel = accordionText + ', Show this section';
						const hideLabel = accordionText + ', Hide this section';
						trigger.setAttribute('aria-label', expanded ? showLabel : hideLabel);

						// Toggle controlled panel
						const controlsId = trigger.getAttribute('aria-controls');
						if (controlsId) {
							const panel = document.getElementById(controlsId);
							if (panel) {
								const hidden = panel.getAttribute('aria-hidden') === 'true';
								panel.setAttribute('aria-hidden', (!hidden).toString());
								panel.style.display = hidden ? '' : 'none';
							}
						}

						// Handle group toggle state
						const group = trigger.closest('.accordion-group');
						if (group) {
							const groupToggle = group.querySelector('.accordion-group__toggle');
							if (groupToggle) {
								const triggers = group.querySelectorAll('.accordion__trigger');
								const expandedCount = Array.from(triggers).filter(t => t.getAttribute('aria-expanded') === 'true').length;
								const collapsedCount = Array.from(triggers).filter(t => t.getAttribute('aria-expanded') === 'false').length;

								if (expandedCount === 0) {
									groupToggle.setAttribute('aria-pressed', 'false');
									groupToggle.setAttribute('data-toggle-state', 'close');
									groupToggle.textContent = 'Open all';
								} else if (collapsedCount === 0) {
									groupToggle.setAttribute('aria-pressed', 'true');
									groupToggle.setAttribute('data-toggle-state', 'open');
									groupToggle.textContent = 'Close all';
								} else {
									groupToggle.setAttribute('aria-pressed', 'mixed');
								}
							}
						}
					});
				}
			});
		}
	};
})(Drupal);