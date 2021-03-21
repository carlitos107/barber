'use strict';

(function () {
  const loginBtn = document.querySelector('.user-menu__item > a');
  const modal = document.querySelector('.login-page');
  const closeBtn = document.querySelector('.login-page__close-btn');

  const closeModal = () => {
    modal.classList.add('login-page--closed');
    closeBtn.removeEventListener('click', onCloseBtnClick);
    document.removeEventListener('keyup', onEscBtnPress);
    document.querySelector('body').style.overflow = 'auto';
    loginBtn.addEventListener('click', onLoginBtnClick);
  }

  const onCloseBtnClick = (e) => {
    e.preventDefault();
    closeModal();
  }

  const onEscBtnPress = (e) => {
    e.preventDefault();

    if (e.keyCode === 27) {
      closeModal();
    }
  }

  const onLoginBtnClick = () => {
    document.querySelector('body').style.overflow = 'hidden';
    modal.classList.remove('login-page--closed');
    loginBtn.removeEventListener('click', onLoginBtnClick);
    closeBtn.addEventListener('click', onCloseBtnClick);
    document.addEventListener('keyup', onEscBtnPress);
  }

  loginBtn.addEventListener('click', onLoginBtnClick);
})();