(function (Drupal) {
	Drupal.behaviors.sidebarAccordion = {
		attach: function (context) {
			context.querySelectorAll('.sidebar-accordion__trigger').forEach(function (trigger) {
				// Prevent duplicate event bindings.
				if (trigger.hasAttribute('data-sidebar-accordion-processed')) {
					return;
				}
				trigger.setAttribute('data-sidebar-accordion-processed', 'true');

				trigger.addEventListener('click', function () {
					// Toggle aria-expanded on the trigger
					var expanded = trigger.getAttribute('aria-expanded') === 'true';
					trigger.setAttribute('aria-expanded', (!expanded).toString());

					// Toggle aria-hidden and slideToggle on the controlled element
					var controlsId = trigger.getAttribute('aria-controls');
					var controlled = document.getElementById(controlsId);
					if (controlled) {
						var hidden = controlled.getAttribute('aria-hidden') === 'true';
						controlled.setAttribute('aria-hidden', (!hidden).toString());
					}
				});
			});
		}
	};
})(Drupal);