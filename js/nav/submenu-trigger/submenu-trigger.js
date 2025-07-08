(function (Drupal) {
	Drupal.behaviors.submenuTrigger = {
		attach(context) {
			// Click handler for submenu triggers
			context.querySelectorAll('.submenu-trigger').forEach(trigger => {
				if (!trigger.hasSubmenuListener) {
					trigger.addEventListener('click', function (e) {
						// Toggle aria-expanded
						const expanded = this.getAttribute('aria-expanded') === 'true';
						this.setAttribute('aria-expanded', !expanded);

						// Toggle aria-label
						let label = this.getAttribute('aria-label') || '';
						if (label.includes('Open the')) {
							this.setAttribute('aria-label', label.replace('Open the', 'Close the'));
						} else if (label.includes('Close the')) {
							this.setAttribute('aria-label', label.replace('Close the', 'Open the'));
						}

						// Toggle is-open class on parent li and close siblings
						const parentLi = this.closest('li');
						if (parentLi) {
							parentLi.classList.toggle('is-open');
							// Close siblings
							parentLi.parentElement.querySelectorAll(':scope > li').forEach(sibling => {
								if (sibling !== parentLi) {
									sibling.classList.remove('is-open');
									const siblingTrigger = sibling.querySelector('.submenu-trigger');
									if (siblingTrigger) {
										siblingTrigger.setAttribute('aria-expanded', 'false');
										let siblingLabel = siblingTrigger.getAttribute('aria-label') || '';
										if (siblingLabel.includes('Close the')) {
											siblingTrigger.setAttribute('aria-label', siblingLabel.replace('Close the', 'Open the'));
										}
									}
								}
							});
						}
					});
					trigger.hasSubmenuListener = true; // Prevent duplicate listeners
				}
			});

			// Resize handler for enabling/disabling triggers
			let resizeTimer;
			function resizeFunction() {
				document.querySelectorAll('.nav--main .submenu-trigger').forEach(trigger => {
					if (window.innerWidth > 1024) {
						trigger.setAttribute('disabled', true);
					} else {
						trigger.removeAttribute('disabled');
					}
				});
			}

			function debounceResize() {
				clearTimeout(resizeTimer);
				resizeTimer = setTimeout(resizeFunction, 250);
			}

			window.addEventListener('resize', debounceResize);
			window.addEventListener('load', resizeFunction);

			// Initial call
			resizeFunction();
		}
	};
})(Drupal);