// 'Team' Slider & 'Battles' Slider
// const teamMembersSlider = new Swiper('.team__cards > .swiper', {
//     slidesPerView: 1,
//     pagination: {
//         el: '.team__cards.swiper-pagination',
//         clickable: true,
//         renderBullet: (index, className) => '<span class="pagination-bullet ' + className + '">' + "</span>"
//     },
//     breakpoints: {
//         // when window width is >= 480px
//         480: {
//             slidesPerView: 'auto',
//             spaceBetween: 30,
//             pagination: false
//         },
//         // when window width is >= 768px
//         768: {
//             slidesPerView: 3,
//             spaceBetween: 80,
//             pagination: false
//         }
//     }
// })

// Добавляем верхний отступ контенту, равный высоте заднего фона
const promotionImgDog = document.querySelector('.promotion__image-dog')
const promotionContent = document.querySelector('.promotion__content')

if (window.matchMedia('(max-width: 768px)').matches) {
    promotionContent.style.paddingTop = `${promotionImgDog.getBoundingClientRect().height}px`
}