$ ->

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