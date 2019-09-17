import { tns } from 'tiny-slider/src/tiny-slider';
import setLazy from './setLazy';

class MySlider {
  constructor(slider, getOptions) {
    this.slider = slider;
    this.name = slider.dataset.slider;
    this.wrap = slider.closest('.slider__wrap');
    this.prev = this.wrap.querySelector('.js-slider-prev');
    this.next = this.wrap.querySelector('.js-slider-next');
    this.slides = [...slider.querySelectorAll('.slide')];

    this.options = getOptions({
      container: this.slider,
      nextButton: this.next,
      prevButton: this.prev,
    })[this.name];
  }

  init() {
    this._initSlider();
  }

  _initSlider() {
    this.tns = tns(this.options);
  }
}

export default function setSliders() {
  const sliders = [...document.querySelectorAll('.js-slider')];
  if (!sliders.length) return;

  function getOptions({ nextButton, prevButton, container }) {
    return {
      team: {
        container,
        prevButton,
        nextButton,
        mouseDrag: true,
        axis: 'vertical',
        nav: false,
        items: 3,
        onInit: setLazy,
      },
    };
  }

  sliders.forEach((slider) => {
    const mySlider = new MySlider(slider, getOptions);
    mySlider.init();
  });
}
