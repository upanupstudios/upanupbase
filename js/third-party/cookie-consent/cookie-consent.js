(function (Drupal) {
	let resizeTimer;

	function resizeFunction() {
		const banner = document.querySelector('.cc_banner-wrapper');
		if (banner) {
			document.body.style.paddingBottom = banner.offsetHeight + 'px';
		}
		document.querySelectorAll('.cc_btn_accept_all').forEach(function(btn) {
			btn.addEventListener('click', function() {
				document.body.style.paddingBottom = 0;
			}, { once: true });
		});
	}

	function debouncedResize() {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(resizeFunction, 250);
	}

	Drupal.behaviors.cookieConsentPadding = {
		attach: function (context, settings) {
			window.addEventListener('load', debouncedResize, { once: true });
			window.addEventListener('resize', debouncedResize);
			// Initial call in case banner is already present.
			resizeFunction();
		}
	};
})(Drupal);