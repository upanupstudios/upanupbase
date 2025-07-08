(function (Drupal) {
	Drupal.behaviors.hiddenSidebar = {
		attach: function (context, settings) {
			var sidebar = context.querySelector('.sidebar');
			var regionSidebar = sidebar && sidebar.querySelector('.region-sidebar');
			if (!sidebar || !regionSidebar) {
				return;
			}

			var allChildren = regionSidebar.children;
			var nonMenuBlocks = regionSidebar.querySelectorAll(':scope > *:not(.block-menu)');

			// Check if sidebar is empty or only contains menu blocks
			if (
				allChildren.length === 0 ||
				(sidebar.classList.contains('sidebar--no-nav') && nonMenuBlocks.length === 0)
			) {
				sidebar.classList.add('sidebar--hidden');
				var content = context.querySelector('.content');
				if (content) {
					content.classList.add('content--fullwidth');
				}
			}
		}
	};
})(Drupal);