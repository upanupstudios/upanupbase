(function (Drupal) {
	Drupal.behaviors.tocB2T = {
		attach(context) {
			// Ensure this runs only once per page load
			if (!context || context !== document) return;

			const toc = document.querySelector('.toc[id]');
			const b2t = document.querySelector('.toc__b2t');
			if (toc && !b2t) {
				const link = document.createElement('a');
				link.className = 'toc__b2t';
				link.href = `#${toc.id}`;
				link.textContent = 'Back to top';
				const mainContent = document.getElementById('main-content');
				if (mainContent) {
					mainContent.appendChild(link);
				}
			}
		}
	};
})(Drupal);