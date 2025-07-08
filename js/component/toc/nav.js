(function (Drupal, once) {
	Drupal.behaviors.tocNav = {
		attach(context) {
			// Only run once per page load
			const tocElements = once('toc-init', '.toc', context);
			if (!tocElements.length) return;

			// Remove duplicate .toc elements, keep only the first
			if (tocElements.length > 1) {
				for (let i = 1; i < tocElements.length; i++) {
					tocElements[i].parentNode.removeChild(tocElements[i]);
				}
			}

			// Find the .content-row that contains the .toc
			const tocRow = tocElements[0].closest('.content-row');
			if (!tocRow) return;

			// Collect all following siblings after tocRow
			let sibling = tocRow.nextElementSibling;
			const tocArray = [];
			while (sibling) {
				// Find all h2s that are not visually hidden, not inside .accordion, and not already processed
				const headings = sibling.querySelectorAll('h2:not([data-toc-id-set="true"]):not(.visually-hidden):not(.accordion h2)');
				headings.forEach((heading) => {
					heading.setAttribute('data-toc-id-set', 'true');
					let id = heading.id;
					if (!id) {
						id = heading.textContent.trim().toLowerCase().replace(/\s+/g, '-');
						heading.id = id;
					}
					// Ensure unique id
					if (tocArray.some(pair => pair.id === id)) {
						let count = 1;
						let newID = `${id}-${count}`;
						while (tocArray.some(pair => pair.id === newID)) {
							count++;
							newID = `${id}-${count}`;
						}
						id = newID;
						heading.id = id;
					}
					tocArray.push({ id, text: heading.textContent.trim() });
				});
				sibling = sibling.nextElementSibling;
			}

			// Populate the .toc__list
			const tocList = tocElements[0].querySelector('.toc__list');
			if (tocList) {
				tocArray.forEach(pair => {
					const li = document.createElement('li');
					li.className = 'toc__list-item';
					const a = document.createElement('a');
					a.href = `#${pair.id}`;
					a.textContent = pair.text;
					li.appendChild(a);
					tocList.appendChild(li);
				});
			}
		}
	};
})(Drupal, once);