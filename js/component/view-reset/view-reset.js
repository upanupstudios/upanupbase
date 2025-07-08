(function (Drupal) {
	Drupal.behaviors.viewResetScroll = {
		attach: function (context, settings) {
			// Delegate event to reset buttons.
			context.querySelectorAll('.content-row .view input[id*="edit-reset"]:not([data-view-reset-processed])').forEach(function (btn) {
				btn.setAttribute('data-view-reset-processed', 'true');
				btn.addEventListener('click', function (e) {
					e.preventDefault();
					const view = btn.closest('.view');
					if (view) {
						const viewPosition = Math.floor(view.getBoundingClientRect().top + window.pageYOffset);
						setTimeout(function () {
							window.location = window.location.href.split('?')[0] + '?pos=' + viewPosition;
						});
					}
				});
			});

			// Scroll to position if ?pos= is present.
			if (window.location.search.indexOf('pos=') > -1) {
				const params = new URLSearchParams(window.location.search);
				const pos = parseInt(params.get('pos'), 10);
				if (!isNaN(pos)) {
					window.scrollTo({ top: pos, behavior: 'auto' });
				}
			}
		}
	};
})(Drupal);