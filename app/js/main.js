
const promotionImgDog = document.querySelector('.promotion__image-dog')
const promotionContent = document.querySelector('.promotion__content')
const header = document.querySelector('.promotion-header')

// Добавляем верхний отступ контенту, равный высоте header
const compStyles = window.getComputedStyle(promotionContent)
promotionContent.style.paddingTop = `${header.getBoundingClientRect().height + parseInt(window.getComputedStyle(header).getPropertyValue('padding-top')) + parseInt(compStyles.getPropertyValue('padding-top'))}px`

// Добавляем верхний отступ контенту, равный высоте заднего фона
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
const paletteWrapper = document.querySelector('.palette__wrapper')
const paletteColors = document.querySelectorAll('.palette__colors')
const paletteContainer = document.querySelector('.palette > .container')

// При клике на тип цвета, он копируется в буфер
paletteWrapper.addEventListener('click', async e => {
    if (e.target.hasAttribute('data-color-value')) {
        await copyToClipboard(e.target.getAttribute('data-color-value'))
        e.target.classList.add('palette__colors-item__info-color--active')
        setTimeout(() => {
            e.target.classList.remove('palette__colors-item__info-color--active')
        }, 2000)
    }
})

paletteColors.forEach(list => {
    if (window.matchMedia('(max-width: 991px) and (min-width: 768px)').matches) {
        list.style.marginLeft = `-${paletteContainer.getBoundingClientRect().left + 50}px`
    } else if (window.matchMedia('(min-width: 992px)').matches) {
        return
    } else {
        list.style.marginLeft = `-${paletteContainer.getBoundingClientRect().left + 20}px`
    }
})

// Выбираем элементы
const paletteColorsItems = document.querySelectorAll('.palette__colors-item')

paletteColors.forEach(paletteColor => {
    paletteColor.addEventListener('mouseover', e => {
        if (e.target.closest('.palette__colors-item')) {
            e.target.closest('.palette__colors').classList.add('palette__colors-hover--onitem')
        } else {
            e.target.closest('.palette__colors').classList.remove('palette__colors-hover--onitem')
        }
    })
    paletteColor.addEventListener('mouseleave', e => {
        e.target.classList.remove('palette__colors-hover--onitem')
    })
})

const packagesImageLeftClass = window.matchMedia('(max-width: 991px)').matches ? '.packages__image--left__tablet' : '.packages__image--left__desktop'
const packages = document.querySelector('.packages')
const packagesImageHeight = document.querySelector(packagesImageLeftClass).getBoundingClientRect().height
const packagesImageMiniHeight = document.querySelector('.packages__image--mini').getBoundingClientRect().height

document.querySelector(packagesImageLeftClass).style.height = `${(window.matchMedia('(max-width: 830px)').matches ? 500 : 0) + packagesImageHeight}px`
document.querySelector('.packages__image--right').style.height = `${(window.matchMedia('(max-width: 830px)').matches ? 500 : 0) + packagesImageHeight}px`
document.querySelector('.packages__image--mini').style.height = `${packagesImageMiniHeight}px`

jarallax(document.querySelector(packagesImageLeftClass), {
    speed: 0.6,
    imgPosition: 'top'
})

jarallax(document.querySelector('.packages__image--right'), {
    speed: 0.8,
    imgPosition: 'top',
    imgSize: 'contain'
})

const scroll = new SmoothScroll('a[href*="#"]', {
    speed: 500,
    speedAsDuration: true
})