// Регистрируем плагин ScrollToPlugin
gsap.registerPlugin(ScrollToPlugin)

// Обработчик события прокрутки колесика мыши
const autoScroll = (event, scrollDuration, scrollOffset, sections) => {
    const sectionCount = sections.length

    const delta = Math.sign(event.deltaY)

    if (delta > 0) {
        scrollToNextSection()
    } else if (delta < 0) {
        scrollToPrevSection()
    }

    // Функция для скролла к следующей секции
    function scrollToNextSection() {
        const currentSection = Array.from(sections).findIndex(section => {
            const rect = section.getBoundingClientRect()
            return rect.top >= 0 && rect.bottom > window.innerHeight / 2
        })

        if (currentSection < sectionCount - 1) {
            gsap.to(window, {
                duration: scrollDuration,
                scrollTo: {
                    y: `#section${currentSection + 2}`,
                    offsetY: scrollOffset,
                },
            })
        }
    }

    // Функция для скролла к предыдущей секции
    function scrollToPrevSection() {
        const currentSection = Array.from(sections).findIndex(section => {
            const rect = section.getBoundingClientRect()
            return rect.top >= 0 && rect.bottom > window.innerHeight / 2
        })

        if (currentSection > 0) {
            gsap.to(window, {
                duration: scrollDuration,
                scrollTo: {
                    y: `#section${currentSection}`,
                    offsetY: scrollOffset,
                },
            })
        }
    }
}