$(function() {
  $('.fancybox').fancybox({
    type: 'image',
    openEffect: 'elastic',
    openSpeed: 100,

    overlay: {
      css: {
        'background': 'rgba(58, 42, 45, 0.95)'
      }
    },

    closeClick: true,
    closeEffect: 'elastic',
    closeSpeed: 100,

    helpers: {
      title: {
        type: 'inside'
      },
      overlay: {
        locked: false
      }
    }
  });
});
