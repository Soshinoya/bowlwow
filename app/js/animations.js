gsap.registerPlugin(ScrollTrigger)

ScrollTrigger.defaults({
    toggleActions: 'play pause resume reset',
})

// Анимация секции Promotion
const promotionMainTl = gsap.timeline()

promotionMainTl
    .set('.promotion__body', { x: '-10vw', opacity: 0 })
    .set('.promotion__download-button', { y: '10vh', opacity: 0 })
    .set('.promotion__image-bowl', { top: '-100%' })
    .set('.promotion__image-dog', { opacity: 0 })

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
    },
    defaults: {
        delay: .5,
        duration: 1.5,
    }
})

const promotionMatchMediaAfterPhone = gsap.matchMedia()

// Анимировать рамку, если окно больше 768px в ширину
promotionMatchMediaAfterPhone.add('(min-width: 768px)', () => {
    promotionFrameTl.fromTo('.promotion__line--left', {
        bottom: '100vh'
    }, {
        bottom: 0
    }).fromTo('.promotion__line--bottom', {
        right: '100vw'
    }, {
        right: 0
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
        // document.body.style.overflow = 'hidden'

        gsap.to(['.menu__left-logo', '.menu__left-language', '.menu__close'], { opacity: 1, delay: .5, duration: 1 })

        const animateItems = async () => {
            const menuItems = document.querySelectorAll('.menu-nav__item')

            for (let i = 0; i < menuItems.length; i++) {
                await menuNavItemsTl.to(menuItems[i], { x: 0, opacity: 1, duration: 0.12 })
            }
        }

        animateItems()
    } else {
        // document.body.style.overflow = 'auto'

        gsap.to(['.menu__left-logo', '.menu__left-language', '.menu__close'], { opacity: 0, duration: 1 })

        menuNavItemsTl.to('.menu-nav__item', { x: '100%', opacity: 0, duration: .12 })
    }
}

// Упаковки
gsap.fromTo('.packages__title', { y: '-200%', opacity: 0 }, { scrollTrigger: '.section-template__header-title', y: 0, opacity: 1, duration: 1 })

const packagesBody = document.querySelector('.packages__body')
const packagesCat = document.querySelector('.packages__cat')
const packagesDog = document.querySelector('.packages__dog')

packagesCat.style.height = `${packagesDog.getBoundingClientRect().height}px`

gsap.fromTo(packagesDog, {
    x: '-100vw'
}, {
    scrollTrigger: packagesDog,
    x: 0,
    duration: .5
})

gsap.fromTo(packagesCat, {
    x: '-100vw'
}, {
    scrollTrigger: packagesCat,
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