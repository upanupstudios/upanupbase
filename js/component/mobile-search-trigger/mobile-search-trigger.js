(function (Drupal) {
	Drupal.behaviors.mobileSearchTrigger = {
		attach(context) {
			// Cache selectors
			const triggers = context.querySelectorAll('.mobile-search-trigger');
			const searchForm = document.getElementById('search-form');

			// Helper to set trigger state
			function setTriggerState(trigger, expanded) {
				trigger.setAttribute('aria-expanded', expanded);
				trigger.setAttribute('aria-label', expanded ? 'Close the search form' : 'Open the search form');
				const child = trigger.firstElementChild;
				if (child) {
					child.textContent = expanded ? 'Close the search form' : 'Open the search form';
				}
			}

			// Click event for triggers
			triggers.forEach(trigger => {
				if (!trigger.hasAttribute('data-mobile-search-trigger-processed')) {
					trigger.setAttribute('data-mobile-search-trigger-processed', 'true');
					trigger.addEventListener('click', function () {
						const isExpanded = this.getAttribute('aria-expanded') === 'true';
						const controlsId = this.getAttribute('aria-controls');
						const controlledForm = document.getElementById(controlsId);

						setTriggerState(this, !isExpanded);

						if (controlledForm) {
							controlledForm.setAttribute('aria-hidden', isExpanded);
						}

						// Show/hide all search forms and focus input if expanded
						const expandedTriggers = context.querySelectorAll('.mobile-search-trigger[aria-expanded="true"]');
						const allSearchForms = context.querySelectorAll('.search-form');
						if (expandedTriggers.length) {
							allSearchForms.forEach(form => {
								form.setAttribute('aria-hidden', 'false');
								const input = form.querySelector('.form-item input');
								if (input) input.focus();
							});
						} else {
							allSearchForms.forEach(form => {
								form.setAttribute('aria-hidden', 'true');
							});
						}
					});
				}
			});

			// Responsive resize handler
			let resizeTimer;
			function resizeFunction() {
				const trigger = context.querySelector('.mobile-search-trigger');
				const isExpanded = trigger && trigger.getAttribute('aria-expanded') === 'true';

				if (window.innerWidth > 1024) {
					if (trigger) setTriggerState(trigger, false);
					if (searchForm) {
						searchForm.setAttribute('aria-hidden', 'false');
					}
				} else {
					if (searchForm) {
						searchForm.setAttribute('aria-hidden', (!isExpanded).toString());
					}
				}
			}

			window.removeEventListener('resize', Drupal.mobileSearchTriggerResizeHandler || (() => {}));
			window.removeEventListener('load', Drupal.mobileSearchTriggerResizeHandler || (() => {}));
			Drupal.mobileSearchTriggerResizeHandler = function () {
				clearTimeout(resizeTimer);
				resizeTimer = setTimeout(resizeFunction, 250);
			};
			window.addEventListener('resize', Drupal.mobileSearchTriggerResizeHandler);
			window.addEventListener('load', Drupal.mobileSearchTriggerResizeHandler);

			// Initial call
			resizeFunction();
		}
	};
})(Drupal);