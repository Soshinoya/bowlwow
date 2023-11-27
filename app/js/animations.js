gsap.registerPlugin(ScrollTrigger)

ScrollTrigger.defaults({
    toggleActions: 'play complete resume reset',
})

window.addEventListener('DOMContentLoaded', () => {
    // Анимация секции Promotion
    const promotionMainTl = gsap.timeline()

    promotionMainTl
        .set('.promotion__body', { x: '-10vw', opacity: 0 })
        .set('.promotion__download-button', { y: '10vh', opacity: 0 })
        .set('.promotion__image-bowl', { top: '-100%' })
        .set('.promotion__image-dog', { opacity: 0 })
        .set('.promotion__content-arrow', { opacity: 0 })
        .set('.promotion-header__burger-link', { opacity: 0 });

    document.querySelector('.promotion__wrapper').style.opacity = 1

    const promotionFrameTl = gsap.timeline({
        onComplete() {
            promotionMainTl
                .to('.promotion__body', { x: 0, opacity: 1, duration: 1 })
                .to('.promotion__download-button', { y: 0, opacity: 1, duration: 1 }, '-=1')
                .to('.promotion__image-bowl', {
                    top: window.matchMedia('(max-width: 768px)').matches
                        ? window.matchMedia('(max-width: 380px)').matches
                            ? -115
                            : -260
                        : -130,
                    duration: 1
                }, '-=1')
                .to('.promotion__image-dog', { opacity: 1, duration: 1 }, '-=1')
                .to('.promotion-header__burger-link', { opacity: 1, duration: 1 })
                .to('.promotion__content-arrow', { opacity: 1, duration: 1 }, '-=1')
                .to('.promotion__content-arrow', {
                    keyframes: {
                        "0%": { y: 22 },
                        "50%": { y: 42 },
                        "100%": { y: 22 }
                    }, duration: 2, repeat: -1
                })
        },
        defaults: {
            delay: .5,
            duration: 1.5,
        }
    })

    const promotionMatchMediaAfterPhone = gsap.matchMedia()

    // Анимируем рамку, если окно больше 768px в ширину
    promotionMatchMediaAfterPhone.add('(min-width: 768px)', () => {
        promotionFrameTl.fromTo('.promotion__line--left', {
            bottom: '100vh'
        }, {
            bottom: 0
        }).fromTo('.promotion__line--bottom', {
            right: '100vw'
        }, {
            right: 50
        }, '-=2').fromTo('.promotion__line--right', {
            top: '100vh'
        }, {
            top: 0
        }, '-=2')
    })

    // Анимация бургер меню
    const menuNavItemsTl = gsap.timeline({ delay: 0.5 })

    const toggleMenu = () => {
        const burgerMenu = document.querySelector('.menu')
        burgerMenu.classList.toggle('menu--active')
        if (burgerMenu.classList.contains('menu--active')) {
            document.body.style.overflow = 'hidden'

            gsap.to(['.menu__left-logo', '.menu__left-language', '.menu__close'], { opacity: 1, delay: .5, duration: 1 })

            const animateItems = async () => {
                const menuItems = document.querySelectorAll('.menu-nav__item')

                for (let i = 0; i < menuItems.length; i++) {
                    await menuNavItemsTl.to(menuItems[i], { x: 0, opacity: 1, duration: 0.12 })
                }
            }

            animateItems()
        } else {
            document.body.style.overflow = 'auto'

            gsap.to(['.menu__left-logo', '.menu__left-language', '.menu__close'], { opacity: 0, duration: 1 })

            menuNavItemsTl.to('.menu-nav__item', { x: '100%', opacity: 0, duration: .12 })
        }
    }

    [
        document.querySelector('.promotion-header__burger-link'),
        document.querySelector('.menu-nav__item'),
        document.querySelector('.menu__close')
    ].forEach(elem => elem.addEventListener('click', toggleMenu))

    document.querySelectorAll('.menu-nav__item').forEach(elem => elem.addEventListener('click', toggleMenu))

    // Упаковки
    gsap.fromTo('.packages__title', { y: '200%', opacity: 0 }, { scrollTrigger: '.section-template__header-title', y: 0, opacity: 1, duration: 1 })

    const packagesBody = document.querySelector('.packages__body')
    const packagesCat = document.querySelector('.packages__cat')
    const packagesDog = document.querySelector('.packages__dog')

    packagesCat.style.height = `${packagesDog.getBoundingClientRect().height}px`

    gsap.fromTo(packagesDog, {
        x: '-100vw'
    }, {
        scrollTrigger: {
            trigger: '.packages',
            start: window.matchMedia('(max-width: 991px)').matches ? 'top 40%' : 'top 15%'
        },
        x: 0,
        duration: .5
    })

    gsap.fromTo(packagesCat, {
        x: '-100vw'
    }, {
        scrollTrigger: {
            trigger: '.packages',
            start: window.matchMedia('(max-width: 991px)').matches ? 'top 40%' : 'top 15%'
        },
        x: '0',
        delay: .5,
        duration: .5
    })

    gsap.timeline({
        scrollTrigger: {
            trigger: packagesDog,
            start: `-${innerHeight - packagesDog.getBoundingClientRect().height - 50}px top`,
            end: `${packagesBody.getBoundingClientRect().height + 50}px bottom`,
            pin: true
        }
    })

    gsap.timeline({
        scrollTrigger: {
            trigger: packagesCat,
            start: `-${innerHeight - packagesCat.getBoundingClientRect().height - 50}px top`,
            end: `${packagesBody.getBoundingClientRect().height + 50}px bottom`,
            pin: true
        }
    })

    // Анимация выцветания рамки
    gsap.to('.screen__line--sixth', {
        scrollTrigger: {
            trigger: '.packages',
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: .5
        },
        autoAlpha: 0
    })

    // Секция 'logotype'
    const logotypeWrapper = document.querySelector('.logotype__wrapper')

    const logotypeFirst = logotypeWrapper.querySelector('.logotype')

    logotypeWrapper.style.height = `${logotypeFirst.getBoundingClientRect().height * 5}px`

    const logotypeFirstPaddingBottom = parseInt(window.getComputedStyle(logotypeFirst, null).getPropertyValue('padding-bottom'))

    gsap.fromTo('.logotype__title', { y: '200%', opacity: 0 }, { scrollTrigger: '.logotype__title', y: 0, opacity: 1, duration: 1 })

    const framesClasses = [
        { target: '.screen__line--fifth', trigger: '.logotype' },
        { target: '.screen__line--fourth', trigger: '.logotype--second' },
        { target: '.screen__line--third', trigger: '.logotype--third' },
        { target: '.screen__line--second', trigger: '.logotype--fourth' },
        { target: '.screen__line--first', trigger: '.logotype--fifth' }
    ]

    framesClasses.forEach((selector, i, arr) => gsap.to(selector.target, {
        scrollTrigger: {
            trigger: selector.trigger,
            start: 'bottom bottom',
            end: 'bottom top',
            scrub: .5
        },
        autoAlpha: 0
    }))

    // Сменя логотипов
    gsap.to('.logotype__logo--fourth', {
        scrollTrigger: {
            trigger: '.logotype--second',
            start: 'bottom bottom',
            end: 'bottom top',
        },
        autoAlpha: 0
    })

    gsap.to('.logotype__logo--third', {
        scrollTrigger: {
            trigger: '.logotype--third',
            start: 'bottom bottom',
            end: 'bottom top',
        },
        autoAlpha: 0
    })

    gsap.to('.logotype__logo--second', {
        scrollTrigger: {
            trigger: '.logotype--fourth',
            start: 'bottom bottom',
            end: 'bottom top',
        },
        autoAlpha: 0
    })

    // Закрепляем секцию 'logotype'
    gsap.timeline({
        scrollTrigger: {
            trigger: '.logotype',
            start: 'bottom bottom',
            end: `${logotypeWrapper.getBoundingClientRect().height - (logotypeFirstPaddingBottom * 2) + 50}px bottom`,
            pin: true
        }
    })

    // Появление текстовый блоков, кнопки и логотипа
    gsap.fromTo('.logotype__logo-wrapper', { y: '100%', opacity: 0 }, { y: 0, opacity: 1, duration: .5, scrollTrigger: '.logotype__logo-wrapper' })
    gsap.fromTo('.logotype__text--first', { y: '100%', opacity: 0 }, { y: 0, opacity: 1, duration: .3, scrollTrigger: '.logotype__text--first' })
    gsap.fromTo('.logotype__text--second', { y: '100%', opacity: 0 }, { y: 0, opacity: 1, duration: .3, delay: 0.3, scrollTrigger: '.logotype__text--second' })
    gsap.fromTo('.logotype__download-button', { y: '100%', opacity: 0 }, { y: 0, opacity: 1, duration: .3, delay: 0.6, scrollTrigger: '.logotype__download-button' })

    // Секция 'Palette'
    const paletteColorsBrandQ = gsap.utils.selector('#palette')
    const paletteColorsCatQ = gsap.utils.selector('#palette-cat')
    const paletteColorsDogQ = gsap.utils.selector('#palette-dog')

    gsap.fromTo(paletteColorsBrandQ('.palette__colors-item'), {
        x: '100vw'
    }, {
        x: 0,
        stagger: 0.1,
        scrollTrigger: '#palette',
        duration: .5
    })

    gsap.fromTo(paletteColorsCatQ('.palette__colors-item'), {
        x: '100vw'
    }, {
        x: 0,
        stagger: 0.1,
        scrollTrigger: '#palette-cat',
        duration: .5
    })

    gsap.fromTo(paletteColorsDogQ('.palette__colors-item'), {
        x: '100vw'
    }, {
        x: 0,
        stagger: 0.1,
        scrollTrigger: '#palette-dog',
        duration: .5
    })

    gsap.fromTo('.palette__title', { y: '50%', opacity: 0 }, { scrollTrigger: '.palette', y: 0, opacity: 1, duration: 1 })
    gsap.fromTo('.palette__main-title', { opacity: 0 }, { opacity: 1, duration: 1.5, scrollTrigger: '.palette' })
    gsap.fromTo('.palette__footer-text', { y: '100%', opacity: 0 }, { y: 0, opacity: 1, duration: .5, scrollTrigger: '.palette' })

    // Горизонтальный скролл
    let paletteSections = gsap.utils.toArray(".palette")
    gsap.to(paletteSections, {
        xPercent: -100 * (paletteSections.length - 1),
        ease: "none",
        scrollTrigger: {
            trigger: '.palette__wrapper',
            pin: true,
            scrub: 1,
            snap: 1 / (paletteSections.length - 1),
            end: window.matchMedia('(max-width: 991px)').matches ? "+=1500" : "+=4000"
        }
    })

    // Шрифты
    gsap.fromTo('.fonts__title', { y: '200%', opacity: 0 }, { scrollTrigger: '.fonts__title', y: 0, opacity: 1, duration: .5 });
    gsap.fromTo('.fonts-field__title', { opacity: 0 }, { opacity: 1, duration: 1, scrollTrigger: '.fonts' })
    gsap.fromTo('.fonts-field__description', { y: '100%', opacity: 0 }, { y: 0, opacity: 1, duration: .5, delay: .5, scrollTrigger: '.fonts' })

    // Фотостиль
    gsap.fromTo('.photostyle__title', { y: '200%', opacity: 0 }, { scrollTrigger: '.photostyle__title', y: 0, opacity: 1, duration: .5 });
    gsap.fromTo('.photostyle__text--first', { y: '100%', opacity: 0 }, { y: 0, opacity: 1, duration: .5, scrollTrigger: '.photostyle__text--first' })
    gsap.fromTo('.photostyle__text--second', { y: '100%', opacity: 0 }, { y: 0, opacity: 1, duration: .5, delay: .5, scrollTrigger: '.photostyle__text--second' })
    gsap.fromTo('.photostyle__slider > .swiper', { y: '100%', opacity: 0 }, { y: 0, opacity: 1, duration: .5, delay: .5, scrollTrigger: '.photostyle' })

    // Материалы
    gsap.fromTo('.materials__title', { y: '200%', opacity: 0 }, { scrollTrigger: '.materials__title', y: 0, opacity: 1, duration: 1 });
    gsap.fromTo('.materials__links-inner', { y: '100%', opacity: 0 }, { y: 0, opacity: 1, duration: .5, delay: .5, scrollTrigger: '.materials__links-inner' })

    const photostyleRect = document.querySelector('.photostyle').getBoundingClientRect()

    window.onscroll = () => window.scrollY >= photostyleRect.top && window.scrollY <= (photostyleRect.top + photostyleRect.height) ? document.querySelector('.promotion-header').classList.add('promotion-header--active') : document.querySelector('.promotion-header').classList.remove('promotion-header--active')
})