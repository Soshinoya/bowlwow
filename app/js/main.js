// Добавляем верхний отступ контенту, равный высоте заднего фона
const promotionImgDog = document.querySelector('.promotion__image-dog')
const promotionContent = document.querySelector('.promotion__content')

if (window.matchMedia('(max-width: 768px)').matches) {
    promotionContent.style.paddingTop = `${promotionImgDog.getBoundingClientRect().height - 75 - 47 - 45}px`
}

// 'Photostyle' Slider
const photostyleSliderConfig = new Swiper('.photostyle__slider > .swiper', {
    spaceBetween: 20,
    navigation: {
        nextEl: '.photostyle__slider-button--next',
        prevEl: '.photostyle__slider-button--prev'
    },
    breakpoints: {
        // when window width is >= 320px
        320: {
            slidesPerView: 'auto',
        },
        // when window width is >= 480px
        480: {
            slidesPerView: 2,
        },
        // when window width is >= 768px
        768: {
            slidesPerView: 'auto',
        }
    }
})

// Выход слайдера за пределы контейнера
const photostyleContainer = document.querySelector('.photostyle > .container')
const photostyleSliderElem = document.querySelector('.photostyle__slider')

const setPhotostyleSliderOffset = () => photostyleSliderElem.style.marginRight = `-${photostyleContainer.getBoundingClientRect().left + 20}px`

window.addEventListener('resize', setPhotostyleSliderOffset)
setPhotostyleSliderOffset()