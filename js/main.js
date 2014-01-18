(function() {
  $(function() {
    var animInProgress, animateToSlide, animationSpeed, authContent, caruselNavigation, caruselPreviews, caruselPreviewsContainer, caruselSlides, caruselSlidesContainer, currentSlideIndex, popup, popupContainer, popupTrigger, registerContent, tabLinks, visiblePreviewCount;
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
    popupContainer.click(function(e) {
      var elem;
      elem = $(e.target);
      if (elem.hasClass('popup-overlay')) {
        return popupContainer.hide();
      }
    });
    caruselSlides = $('.banner-container .full-banners > .single-banner');
    caruselSlidesContainer = $('.banner-container .full-banners');
    caruselPreviews = $('.banners-navigation .banners-preview > .single-banner-preview');
    caruselPreviewsContainer = $('.banners-navigation .banners-preview');
    caruselNavigation = $('.banner-container > .banners-navigation > .prev-banner, .banner-container > .banners-navigation > .next-banner');
    currentSlideIndex = 0;
    animInProgress = false;
    visiblePreviewCount = 5;
    animationSpeed = 500;
    caruselNavigation.click(function(e) {
      var arrow;
      e.preventDefault();
      arrow = $(this);
      if (arrow.hasClass('next-banner')) {
        if (currentSlideIndex < caruselSlides.length - 1) {
          return animateToSlide(currentSlideIndex + 1);
        } else {
          return animateToSlide(0);
        }
      } else {
        if (currentSlideIndex > 0) {
          return animateToSlide(currentSlideIndex - 1);
        } else {
          return animateToSlide(caruselSlides.length - 1);
        }
      }
    });
    caruselPreviewsContainer.on('click', ".single-banner-preview", function(e) {
      var newIndex, preview;
      e.preventDefault();
      preview = $(this);
      newIndex = preview.data('index');
      return animateToSlide(newIndex);
    });
    return animateToSlide = function(newIndex) {
      var animCallback, completePreviews, currentPreview, currentSlide, previewCount, previewWidth, slideWidth, targetPreview, targetSlide, tempTargetSlide;
      if (!animInProgress) {
        animInProgress = true;
        if (newIndex !== currentSlideIndex) {
          caruselPreviews = $('.banners-navigation .banners-preview > .single-banner-preview');
          currentSlide = caruselSlides.filter("*[data-index=" + currentSlideIndex + "]");
          targetSlide = caruselSlides.filter("*[data-index=" + newIndex + "]");
          currentPreview = caruselPreviews.filter("*[data-index=" + currentSlideIndex + "]");
          targetPreview = caruselPreviews.filter("*[data-index=" + newIndex + "]");
          tempTargetSlide = targetSlide.clone();
          slideWidth = targetSlide.width();
          previewWidth = targetPreview.width();
          previewCount = caruselPreviews.length;
          caruselPreviews.removeClass('active');
          targetPreview.addClass('active');
          animCallback = function() {
            currentSlideIndex = newIndex;
            tempTargetSlide.remove();
            caruselSlidesContainer.css({
              left: "-" + (slideWidth * newIndex) + "px"
            });
            return animInProgress = false;
          };
          completePreviews = function() {
            var neededPreviews, newPreviews, previewsLeftToDisplay;
            previewsLeftToDisplay = previewCount - targetPreview.index();
            neededPreviews = previewsLeftToDisplay <= visiblePreviewCount ? visiblePreviewCount - previewsLeftToDisplay + 1 : 0;
            if (neededPreviews > 0) {
              newPreviews = caruselPreviews.slice(0, neededPreviews).clone();
              caruselPreviewsContainer.append(newPreviews);
            } else {
              newPreviews = [];
            }
            return caruselPreviewsContainer.animate({
              left: "-" + (previewWidth * neededPreviews) + "px"
            }, animationSpeed, function() {
              var i, _i, _ref;
              if (neededPreviews > 0) {
                for (i = _i = 0, _ref = neededPreviews - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
                  $(caruselPreviews[i]).remove();
                }
                return caruselPreviewsContainer.css({
                  left: "0px"
                });
              }
            });
          };
          if (newIndex > currentSlideIndex) {
            tempTargetSlide.insertAfter(currentSlide);
            caruselSlidesContainer.animate({
              left: "-=" + slideWidth
            }, animationSpeed, animCallback);
            return completePreviews();
          } else {
            tempTargetSlide.insertBefore(currentSlide);
            caruselSlidesContainer.css({
              left: "-" + (slideWidth * (currentSlideIndex + 1)) + "px"
            });
            caruselSlidesContainer.animate({
              left: "+=" + slideWidth
            }, animationSpeed, animCallback);
            return completePreviews();
          }
        }
      }
    };
  });

}).call(this);
