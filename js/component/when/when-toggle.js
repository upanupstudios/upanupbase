(function (Drupal) {
	Drupal.behaviors.whenToggle = {
		attach: function (context) {
			// Use once() to avoid duplicate event bindings.
			document.querySelectorAll('.when__toggle:not([data-when-toggle-processed])', context).forEach(function (toggleBtn) {
				toggleBtn.setAttribute('data-when-toggle-processed', 'true');
				toggleBtn.addEventListener('click', function () {
					var whenList = document.querySelector('.when > ul');
					if (whenList) {
						whenList.classList.toggle('when__collapsed');
						whenList.classList.toggle('when__expanded');
					}
					// Toggle aria-expanded attribute
					var expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
					toggleBtn.setAttribute('aria-expanded', (!expanded).toString());
					// Toggle button text
					toggleBtn.textContent = expanded ? 'View More' : 'View Less';
				});
			});
		}
	};
})(Drupal);