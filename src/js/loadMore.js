var loadMore = function($) {
	var perPage = 6; // количество элементов в каждом блоке
	
	$('.portfolio-preview').each(function(index, previewBlock){
		var items = $(previewBlock).find('.portfolio-item'); // все элементы в блоке
		items.slice(perPage, items.length).hide();
		$('.button-more').click(function() {
			var hiddenItems = $(previewBlock).find('.portfolio-item:hidden');
			hiddenItems.slice(0, perPage).show();
			if(hiddenItems.length <= perPage) {
				$(this).hide();
			}
		})
	})
}(jQuery);