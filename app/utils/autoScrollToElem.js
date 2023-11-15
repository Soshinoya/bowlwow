const autoScrollToElem = selector => {
    let delay = false

    $(document).on('mousewheel DOMMouseScroll', function (event) {
        if (delay) return

        delay = true
        setTimeout(() => { delay = false }, 200)

        const wd = event.originalEvent.wheelDelta || -event.originalEvent.detail

        const elems = document.querySelectorAll(selector)

        let i;

        if (wd < 0) {
            for (i = 0; i < elems.length; i++) {
                const t = elems[i].getClientRects()[0].top
                if (t >= 40) break
            }
        }
        else {
            for (i = elems.length - 1; i >= 0; i--) {
                const t = elems[i].getClientRects()[0].top
                if (t < -20) break
            }
        }

        $(selector).each(function () {
            console.clear()
            console.log(isVisible(selector))
            if (isVisible(selector) && i >= 0 && i < elems.length) {
                $('html,body').animate({
                    scrollTop: elems[i].offsetTop
                })
            }
        })
    })
}