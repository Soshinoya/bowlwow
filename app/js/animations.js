gsap.registerPlugin(ScrollTrigger)

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
gsap.fromTo('.section-template__header-title', { y: '-200%', opacity: 0 }, { y: 0, opacity: 1, duration: 1 })



const packagesAnimalsTl = gsap.timeline({
    onComplete() { }
})
// packagesAnimalsTl.set('.packages__cat', { left: '-100%', bottom: 0 })

// packagesAnimalsTl.fromTo('.packages__dog', { left: '-100%' }, { left: 0, duration: .5 })

const catElement = document.querySelector('.packages__cat')

ScrollTrigger.create({
    trigger: ".packages",
    start: "top top",
    // endTrigger: ".third-section",
    end: "bottom top",
    pin: catElement,
    pinSpacing: false,
    left: '222px',
    duration: .5,
    delay: .5
})