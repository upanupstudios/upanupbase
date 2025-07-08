(function (Drupal) {
	Drupal.behaviors.alertBanner = {
		attach: function (context) {
			if (!('sessionStorage' in window && typeof sessionStorage === 'object')) {
				return;
			}

			var banner = context.querySelector('.alerts-banner');
			if (!banner) return;

			var sliderWrapper = banner.querySelector('.alerts-banner__slider-wrapper');
			var trigger = banner.querySelector('.alerts-banner__trigger');
			var viewsRows = banner.querySelectorAll('.views-row');
			var hasMultipleRows = viewsRows.length > 1;

			function setBannerState(expanded) {
				if (expanded) {
					sessionStorage['alerts'] = 'expanded';
					sliderWrapper.setAttribute('aria-hidden', 'false');
					trigger.setAttribute('title', 'Close the Alerts slider');
					trigger.setAttribute('aria-expanded', 'true');
					trigger.textContent = 'Close';
				} else {
					sessionStorage['alerts'] = 'closed';
					sliderWrapper.setAttribute('aria-hidden', 'true');
					trigger.setAttribute('title', 'Open the Alerts slider');
					trigger.setAttribute('aria-expanded', 'false');
					trigger.textContent = 'Open';
				}
			}

			// Initial state
			var expanded = sessionStorage['alerts'] !== 'closed';
			setBannerState(expanded);

			// Click handler
			if (trigger && sliderWrapper) {
				trigger.addEventListener('click', function () {
					var isExpanded = trigger.getAttribute('aria-expanded') === 'true';
					setBannerState(!isExpanded);
				});
			}

			// Swiper wrapper height fix
			if (hasMultipleRows) {
				var interval = setInterval(function () {
					var swiperWrapper = banner.querySelector('.swiper-wrapper');
					if (swiperWrapper) {
						clearInterval(interval);
						swiperWrapper.style.height = 'auto';
					}
				}, 500);
			}
		}
	};
})(Drupal);