$ ->

  #
  # Pop up part
  #

  popup           = $('.register-popup')
  popupContainer  = $('.popup-overlay')
  popupTrigger    = $('header > .top-info .enter-link')
  tabLinks        = popup.find('.tabs > .tab-link')
  authContent     = popup.find('.popup-content-auth')
  registerContent = popup.find('.popup-content-register')

  tabLinks.click (e) ->
    link = $ @

    unless link.hasClass 'active'
      popup.removeClass 'auth register'
      tabLinks.removeClass 'active'
      link.addClass 'active'
      if link.hasClass 'auth'
        popup.addClass 'auth'
        registerContent.hide()
        authContent.show()
      else
        popup.addClass 'register'
        registerContent.show()
        authContent.hide()

    false

  popupTrigger.click (e) ->
    popupContainer.show()

  popupContainer.click (e) ->
    elem = $ e.target
    if elem.hasClass 'popup-overlay'
      popupContainer.hide()


  #
  # Cities dropdown part
  #

  citiesTrigger = $('.top-info-content > .cities > .current-city')
  citiesList    = $('.top-info-content > .cities > .rest-cities')

  citiesTrigger.click (e) ->
    citiesList.toggle()
    false

  #
  # To top arrow part
  #

  toTopArrow = $("a.to-top-arrow")

  toTopArrow.scrollspy
    min: $('.main-page-content .new-goods').offset().top
    max: 999999

    onEnter: (element, position) ->
      toTopArrow.show()

    onLeave: (element, position) ->
      toTopArrow.hide()

  toTopArrow.click ->
    $(document).scrollTo(0, 200)

  #
  # Carusel part
  #

  caruselSlides             = $('.banner-container .full-banners > .single-banner')
  caruselSlidesContainer    = $('.banner-container .full-banners')
  caruselPreviews           = $('.banners-navigation .banners-preview > .single-banner-preview')
  caruselPreviewsContainer  = $('.banners-navigation .banners-preview')
  caruselNavigation         = $('.banner-container > .banners-navigation > .prev-banner, .banner-container > .banners-navigation > .next-banner')
  currentSlideIndex         = 0
  animInProgress            = false
  visiblePreviewCount       = 5
  animationSpeed            = 500

  caruselNavigation.click (e) ->
    e.preventDefault()

    arrow = $ @
    if arrow.hasClass 'next-banner'
      if currentSlideIndex < caruselSlides.length - 1
        animateToSlide currentSlideIndex + 1
      else
        animateToSlide 0
    else
      if currentSlideIndex > 0
        animateToSlide currentSlideIndex - 1
      else
        animateToSlide caruselSlides.length - 1

  caruselPreviewsContainer.on 'click', ".single-banner-preview", (e) ->
    e.preventDefault()

    preview = $ @
    newIndex = preview.data('index')
    animateToSlide newIndex


  animateToSlide = (newIndex) ->
    unless animInProgress

      animInProgress = true

      if newIndex isnt currentSlideIndex
        caruselPreviews = $('.banners-navigation .banners-preview > .single-banner-preview')
        currentSlide    = caruselSlides.filter("*[data-index=#{currentSlideIndex}]")
        targetSlide     = caruselSlides.filter("*[data-index=#{newIndex}]")
        currentPreview  = caruselPreviews.filter("*[data-index=#{currentSlideIndex}]")
        targetPreview   = caruselPreviews.filter("*[data-index=#{newIndex}]")
        tempTargetSlide = targetSlide.clone()
        slideWidth      = targetSlide.width()
        previewWidth    = targetPreview.width()
        previewCount    = caruselPreviews.length

        caruselPreviews.removeClass 'active'
        targetPreview.addClass 'active'

        animCallback = ->
          currentSlideIndex = newIndex
          tempTargetSlide.remove()
          caruselSlidesContainer.css { left: "-#{ slideWidth * newIndex }px" }
          animInProgress = false

        completePreviews = (direction = 'forward') ->
          # FIXME: only one direction now, should be bi-directional
          previewsLeftToDisplay = previewCount - targetPreview.index()

          neededPreviews = if previewsLeftToDisplay <= visiblePreviewCount
            visiblePreviewCount - previewsLeftToDisplay + 1
          else
            0
          if neededPreviews > 0
            newPreviews = caruselPreviews.slice(0, neededPreviews).clone()
            caruselPreviewsContainer.append newPreviews

          caruselPreviewsContainer.animate { left: "-#{ previewWidth * (neededPreviews)}px" }, animationSpeed, ->
            if neededPreviews > 0
              for i in [0..neededPreviews - 1]
                $(caruselPreviews[i]).remove()
              caruselPreviewsContainer.css { left: "0px" }

        if newIndex > currentSlideIndex
          tempTargetSlide.insertAfter currentSlide
          caruselSlidesContainer.animate { left: "-=#{ slideWidth }" }, animationSpeed, animCallback
          completePreviews('forward')
        else
          tempTargetSlide.insertBefore currentSlide
          caruselSlidesContainer.css { left: "-#{ slideWidth * (currentSlideIndex + 1) }px" }
          caruselSlidesContainer.animate { left: "+=#{ slideWidth }" }, animationSpeed, animCallback
          completePreviews('backward')
