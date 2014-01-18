(function() {
  $(function() {
    var authContent, popup, popupContainer, popupTrigger, registerContent, tabLinks;
    popup = $('.register-popup');
    popupContainer = $('.popup-overlay');
    popupTrigger = $('header > .top-info .enter-link');
    tabLinks = popup.find('.tabs > .tab-link');
    authContent = popup.find('.popup-content-auth');
    registerContent = popup.find('.popup-content-register');
    tabLinks.click(function(e) {
      var link;
      link = $(this);
      if (!link.hasClass('active')) {
        popup.removeClass('auth register');
        tabLinks.removeClass('active');
        link.addClass('active');
        if (link.hasClass('auth')) {
          popup.addClass('auth');
          registerContent.hide();
          authContent.show();
        } else {
          popup.addClass('register');
          registerContent.show();
          authContent.hide();
        }
      }
      return false;
    });
    popupTrigger.click(function(e) {
      return popupContainer.show();
    });
    return popupContainer.click(function(e) {
      var elem;
      elem = $(e.target);
      if (elem.hasClass('popup-overlay')) {
        return popupContainer.hide();
      }
    });
  });

}).call(this);
