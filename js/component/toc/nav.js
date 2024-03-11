(function ($, Drupal)
{
	Drupal.behaviors.toc_nav = {
		attach: function (context, settings)
		{
			const tocElements = document.querySelectorAll('.toc');
			if(!tocElements.length) return;
			if (tocElements.length > 1) {
				for (let i = 1; i < tocElements.length; i++) {
					tocElements[i].parentNode.removeChild(tocElements[i]);
				}
			}
			
			const tocArray = [];
			$('.content-row:has(.toc)').nextAll().each(function(){
				$(this).find('h2:not([data-toc-id-set="true"]):not(.visually-hidden):not(.accordion h2)').each(function(){
					$(this).attr('data-toc-id-set', 'true');
					let id = $(this).attr('id');
					if (!id) {
						id = $(this).text().trim().toLowerCase().replace(/\s+/g, '-');
						$(this).attr('id', id);
					}
					if (tocArray.some(pair => pair.id === id)) {
						let count = 1;
						let newID = `${id}-${count}`;
						while (tocArray.some(pair => pair.id === newID)) {
							count++;
							newID = `${id}-${count}`;
						}
						id = newID;
						$(this).attr('id', id);
					}
					tocArray.push({ id: id, text: $(this).text().trim() });
				});
			});
			console.log(tocArray.length)
			const tocList = $('.toc__list');
			tocArray.forEach(pair => {
				tocList.append('<li class="toc__list-item"><a href="#'+pair.id+'">'+pair.text+'</a></li>')
			});

		}
	};
}(jQuery, Drupal));