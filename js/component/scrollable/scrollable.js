(function (Drupal) {
	Drupal.behaviors.scrollableTables = {
		attach: function (context, settings) {
			// Only process tables that haven't been processed yet.
			var tables = once('scrollable-table', '.content table', context);
			tables.forEach(function (table) {
				var scrollWrapper = document.createElement('div');
				scrollWrapper.classList.add('scrollable');
				var innerDiv = document.createElement('div');
				innerDiv.setAttribute('role', 'region');
				innerDiv.setAttribute('tabindex', '-1');
				scrollWrapper.appendChild(innerDiv);

				table.parentNode.insertBefore(scrollWrapper, table);
				innerDiv.appendChild(table);
				// Store a reference for later use if needed.
				table.dataset.scrollWrapper = true;
			});

			function scrollableCheck() {
				var scrollables = once.filter('scrollable-table', '.scrollable', context);
				scrollables.forEach(function (scrollable) {
					var innerDiv = scrollable.querySelector('div');
					var innerTable = innerDiv.querySelector('table');
					if (innerTable && !innerTable.classList.contains('sticky-header')) {
						var wrapperWidth = innerDiv.offsetWidth;
						var tableWidth = innerTable.offsetWidth;
						if (tableWidth > wrapperWidth) {
							scrollable.classList.add('has-scroll');
							innerDiv.setAttribute('tabindex', '0');
						} else {
							scrollable.classList.remove('has-scroll');
							innerDiv.setAttribute('tabindex', '-1');
						}
					}
				});
			}

			var resizeTimer;
			window.addEventListener('resize', function () {
				clearTimeout(resizeTimer);
				resizeTimer = setTimeout(scrollableCheck, 250);
			});

			// Initial check.
			scrollableCheck();
		}
	};
})(Drupal);
