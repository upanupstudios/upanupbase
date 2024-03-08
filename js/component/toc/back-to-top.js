(function ($, Drupal)
{
	Drupal.behaviors.toc_b2t = {
		attach: function (context, settings)
		{
			const toc = document.querySelector('.toc[id]');
			const b2t = document.querySelectorAll('.toc__b2t');
			if (toc && !b2t.length) {
				var link = document.createElement('a');
				link.classList.add('toc__b2t');
				link.href = '#' + toc.id;
				link.textContent = 'Back to top';
				document.querySelector('#main-content').appendChild(link);
			}
		}
	};
}(jQuery, Drupal));