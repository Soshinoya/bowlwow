const isVisible = selector => {
    const elementTop = $(selector).offset().top
    const elementBottom = elementTop + $(selector).outerHeight()

    const viewportTop = $(window).scrollTop()
    const viewportBottom = viewportTop + $(window).height()

    return elementBottom > viewportTop && elementTop < viewportBottom
}