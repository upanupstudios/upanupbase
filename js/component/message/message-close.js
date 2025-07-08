(function (Drupal) {
  Drupal.behaviors.messageClose = {
    attach: function (context) {
      context.querySelectorAll('.messages__close').forEach(function (closeBtn) {
        // Avoid double-binding
        if (!closeBtn.hasAttribute('data-message-close-attached')) {
          closeBtn.setAttribute('data-message-close-attached', 'true');
          closeBtn.addEventListener('click', function () {
            var message = closeBtn.closest('.messages');
            if (message) {
              message.remove();
            }
          });
        }
      });
    }
  };
})(Drupal);