(function (Drupal) {
	let resizeTimer;

	function resizeFunction() {
		document.querySelectorAll('.calendar-view-day__row.is-multi').forEach(function (el) {
			// Fix multiday event responsiveness
			const eventMarginTop = el.style.marginTop;
			const eventHash = el.getAttribute('data-calendar-view-hash');
			if (eventMarginTop) {
				// Match alignment of first in row
				const tr = el.closest('tr');
				if (tr) {
					const eventItem = tr.querySelector(`[data-calendar-view-hash="${eventHash}"]`);
					if (eventItem) {
						const newOffsetTop = eventItem.offsetTop;
						el.style.marginTop = newOffsetTop + 'px';
					}
				}
			}
		});
	}

	function debounceResize() {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(resizeFunction, 50);
	}

	Drupal.behaviors.calendarMultiDayFix = {
		attach: function (context, settings) {
			// Only attach once per page load.
			if (!context.__calendarMultiDayFixAttached) {
				context.__calendarMultiDayFixAttached = true;
				window.addEventListener('load', debounceResize);
				window.addEventListener('resize', debounceResize);
			}
		}
	};
})(Drupal);
