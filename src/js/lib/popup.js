export default class Popup {
  constructor() {
    this.popups = [].slice.call(document.querySelectorAll(`.${Popup.classNames.target}`));
  }

  init() {
    this._detectTouch();
    this._closePopup();
    this._openPopup();
  }

  destroy() {
    this._destroy();
  }

  openPopup(e) {
    this.btn = e.target.closest(`.${Popup.classNames.open}`);
    if (!this.btn) return;
    if (e.target.closest(`.${Popup.classNames.btnInOpen}`)) return;

    e.preventDefault();
    this.name = this.btn.dataset.popupTarget;
    this.popup = document.querySelector(`.${Popup.classNames.target}[data-popup="${this.name}"]`);
    if (!this.popup) return;
    this.closeBtn = this.popup.querySelector(`.${Popup.classNames.close}`);

    const openedPopups = [].slice.call(document.querySelectorAll(`.${Popup.classNames.target}:not([data-popup="${this.name}"])`));

    openedPopups.forEach((popup) => {
      popup.classList.remove(Popup.classNames.active);
    });

    this.popup.classList.add(Popup.classNames.active);
    document.body.classList.add(Popup.classNames.noScroll);

    if (this.onOpen) {
      this.onOpen(this.btn, this.popup);
    }
  }

  closePopup(e) {
    if (e && e.type === 'keydown') {
      if (e.keyCode && e.keyCode === 27) {
        this.openPopups = this.popups.filter((popup) => {
          if (popup.classList.contains(Popup.classNames.active)) {
            return popup;
          }
          return null;
        });

        if (!this.openPopups.length) return;
        this.openPopups.forEach((popup) => {
          popup.classList.remove(Popup.classNames.active);
        });
        document.body.classList.remove(Popup.classNames.noScroll);

        if (this.onClose) {
          this.onClose();
        }
      }
    }

    if (e && e.type === 'click') {
      this.closeBtn = e.target.closest(`.${Popup.classNames.close}`);
      const popup = e.target.classList.contains(Popup.classNames.target) ? e.target : null;
      const close = this.closeBtn || popup;
      if (!close) return;

      e.preventDefault();
      this.popup = close.closest(`.${Popup.classNames.target}`);
      this.name = this.popup.dataset.popup;
      this.btn = document.querySelector(`.${Popup.classNames.open}[data-popup-target="${this.name}"]`);

      this.popup.classList.remove(Popup.classNames.active);
      document.body.classList.remove(Popup.classNames.noScroll);

      if (this.onClose) {
        this.onClose();
      }
    }
  }

  _detectTouch() {
    this.isTouch = 'ontouchstart' in window || navigator.maxTouchPoints;
    if (this.isTouch) {
      document.documentElement.classList.add(Popup.classNames.isTouch);
    }
  }

  _openPopup() {
    this.openPopupBinded = this.openPopup.bind(this);
    document.addEventListener('click', this.openPopupBinded);
  }

  _closePopup() {
    this.closePopupBinded = this.closePopup.bind(this);
    document.addEventListener('click', this.closePopupBinded);
    document.addEventListener('keydown', this.closePopupBinded);
  }

  _destroy() {
    document.removeEventListener('click', this.openPopupBinded);
    document.removeEventListener('click', this.closePopupBinded);

    this.popups.forEach((popup) => {
      popup.classList.remove(Popup.classNames.active);
    });
    document.body.classList.remove(Popup.classNames.noScroll);
  }
}

Popup.classNames = {
  open: 'js-popup-open',
  target: 'js-popup',
  close: 'js-popup-close',
  active: 'is-active',
  noScroll: 'no-scroll',
  isTouch: 'is-touch',
  btnInOpen: 'js-btn-in-popup-open',
};
