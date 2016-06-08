var loadMore = function($) {
  var itemsToKeepVisible = 6;

  $('.portfolio-preview').each(function(index, previewBlock) {
    var items = $(previewBlock).find('.portfolio-item');
    items.slice(itemsToKeepVisible, items.length).hide();
  });

  $('.button-more-link').click(function() {
    var sectionIndex = $(this).data('id');
    $('.portfolio-preview-' + sectionIndex).find('.portfolio-item').slideDown();
  })
}(jQuery);