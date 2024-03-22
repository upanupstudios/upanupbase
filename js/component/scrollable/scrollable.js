document.addEventListener('DOMContentLoaded', function() {
	var tables = document.querySelectorAll('.content table');
	tables.forEach(function(table) {
		var scrollWrapper = document.createElement('div');
		scrollWrapper.classList.add('scrollable');
		scrollWrapper.innerHTML = '<div tabindex="-1" role="region"></div>';
		table.parentNode.insertBefore(scrollWrapper, table);
		scrollWrapper.querySelector('div').appendChild(table);
		table.dataset.scrollWrapper = scrollWrapper;
	});
	
	var resizeTimer;
	function resizeFunction() {
		var scrollables = document.querySelectorAll('.scrollable');
		scrollables.forEach(function(scrollable) {
			var innerTable = scrollable.querySelector('div > table');
			if (innerTable && !innerTable.classList.contains('sticky-header')) {
				var wrapperWidth = scrollable.querySelector('div').offsetWidth;
				
				var tableWidth = innerTable.offsetWidth;
				if (tableWidth > wrapperWidth) {
					scrollable.classList.add('has-scroll');
					scrollable.querySelector('div').setAttribute("tabindex", "0");
				} else {
					scrollable.classList.remove('has-scroll');
					scrollable.querySelector('div').setAttribute("tabindex", "-1");
				}
			}
		});
	}
	
	window.addEventListener('resize', function() {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(resizeFunction, 250);
	});
	
	resizeFunction();
});
