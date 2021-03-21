'use strict';

(function () {
  const sliderAdvantages = document.querySelector('.advantages > .slider');
  const sliderReviews = document.querySelector('.reviews > .slider');

  const findIndexes = (iCurrent, arrLength) => {
    const iPrev = iCurrent > 0 ? iCurrent - 1 : (arrLength - 1);
    const iNext = iCurrent < (arrLength - 1) ? iCurrent + 1 : 0;

    return { current: iCurrent, prev: iPrev, next: iNext };
  }

  const changeToggle = (slider, currentIndex) => {
    const toggles = Array.from(slider.querySelectorAll('.slider__toggle'));
    slider.querySelector('.slider__toggle--current').classList.remove('slider__toggle--current');
    toggles[currentIndex].classList.add('slider__toggle--current');
  }

  const changeSlide = (slider, direction) => {
    const slides = Array.from(slider.querySelectorAll('.slider__item'));
    const iCurrent = slides.indexOf(slider.querySelector('.slider__item--current'));

    const indexesOld = findIndexes(iCurrent, slides.length);
    const indexesNew = findIndexes(indexesOld[direction], slides.length);

    slider.querySelector('.slider__item--current').classList.remove('slider__item--current');
    slider.querySelector('.slider__item--prev').classList.remove('slider__item--prev');
    slider.querySelector('.slider__item--next').classList.remove('slider__item--next');

    slides[indexesNew.current].classList.add('slider__item--current');
    slides[indexesNew.prev].classList.add('slider__item--prev');
    slides[indexesNew.next].classList.add('slider__item--next');

    changeToggle(slider, indexesNew.current);
  }

  const onSliderBtnClick = (e) => {
    const btn = e.target;

    if (btn.classList.contains('slider__btn--prev')) {
      changeSlide(sliderReviews, 'prev');
    }

    if (btn.classList.contains('slider__btn--next')) {
      changeSlide(sliderReviews, 'next');
    }
  }

  sliderReviews.addEventListener('click', onSliderBtnClick);

  sliderAdvantages.addEventListener('touchstart', (e) => {
    const originX = e.touches[0].clientX;
    const originY = e.touches[0].clientY;

    sliderAdvantages.addEventListener('touchmove', (e) => {
      const diffX = originX - e.touches[0].clientX;
      const diffY = originY - e.touches[0].clientY;

      if (Math.abs(diffY) < Math.abs(diffX) && Math.abs(diffX) > 50) {
        if (diffX > 0) {
          changeSlide(sliderAdvantages, 'next')
        } else {
          changeSlide(sliderAdvantages, 'prev')
        }
      }
    })
  })

  // setInterval(() => { changeSlide(sliderAdvantages, 'next') }, 5000);
  // setInterval(() => { changeSlide(sliderReviews, 'next') }, 5000);
})();
