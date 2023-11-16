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

// Секция 'Palette'
const paletteColors = document.querySelectorAll('.palette__colors')
const paletteContainer = document.querySelector('.palette__wrapper > .container')

paletteColors.forEach(palette => {
    // Если палитра меньше или равна 3-ём цветам, добавляем активный класс
    const colors = palette.querySelectorAll('.palette__colors-item')
    if (colors.length > 3) {
        palette.addEventListener('click', async e => {
            if (e.target.classList.contains('palette__colors-item')) {
                e.target.classList.toggle('palette__colors-item--active')
                // await copyToClipboard(window.getComputedStyle(e.target, null).getPropertyValue('background-color') )
                // setTimeout(() => {
                //     colors.forEach(color => color.classList.remove('palette__colors-item--active'))
                // }, 2000)
            }
        })
    } else {
        palette.addEventListener('click', async e => {
            if (e.target.classList.contains('pallete__colors-item')) {
                // await copyToClipboard(window.getComputedStyle(e.target, null).getPropertyValue('background-color') )
            }
        })
        colors.forEach(color => color.classList.add('palette__colors-item--active'))
    }
})

// Выход палитры за пределы контейнера, на маленьких устройствах
const setPaletteOffset = () => {
    if (window.matchMedia('(max-width: 1120px)').matches && window.matchMedia('(min-width: 768px)').matches) {
        paletteColors.forEach(palette => palette.style.marginLeft = `-${paletteContainer.getBoundingClientRect().left + 50}px`)
    } else if (window.matchMedia('(max-width: 767px)').matches) {
        paletteColors.forEach(palette => palette.style.marginLeft = `-${paletteContainer.getBoundingClientRect().left + 20}px`)
    }
}

window.addEventListener('resize', setPaletteOffset)
setPaletteOffset()