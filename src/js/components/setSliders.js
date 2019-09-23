import { tns } from 'tiny-slider/src/tiny-slider';
import { debounce } from 'throttle-debounce';
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

    this.currentOptions = this.options;
  }

  get teamDescOptions() {
    const slider = document.querySelector('.js-slider[data-slider="team"]');
    const { prev, next } = {
      prev: this.wrap.querySelector('.js-slider-prev'),
      next: this.wrap.querySelector('.js-slider-next'),
    };
    return {
      container: slider,
      nextButton: next,
      prevButton: prev,
      nav: false,
      onInit: setLazy,
      axis: 'vertical',
      items: 3,
      preventScrollOnTouch: 'force',
    };
  }

  get teamMobOptions() {
    const slider = document.querySelector('.js-slider[data-slider="team"]');
    const { prev, next } = {
      prev: this.wrap.querySelector('.js-slider-prev'),
      next: this.wrap.querySelector('.js-slider-next'),
    };
    return {
      container: slider,
      nextButton: false,
      prevButton: false,
      controls: false,
      nav: true,
      onInit: setLazy,
      items: 1,
      responsive: {
        768: {
          items: 2,
        },
      },
    };
  }


  setOptions() {
    if (this.name === 'team') {
      if (window.matchMedia('(min-width: 992px)').matches) {
        this.currentOptions = this.teamDescOptions;
      } else if (this.name === 'team') {
        this.currentOptions = this.teamMobOptions;
      } else {
        this.currentOptions = this.options;
      }
    }
  }

  resize() {
    this.tns.destroy();
    this.tns = null;

    this.setOptions();
    this.tns = tns(this.currentOptions);
  }

  _reinitTeamSlider() {
    this.onResize = debounce(300, this.resize.bind(this));
    window.addEventListener('resize', this.onResize);
  }

  init() {
    this._initSlider();

    if (this.name === 'team') {
      this._reinitTeamSlider();
    }
  }

  _initSlider() {
    this.setOptions();
    this.tns = tns(this.currentOptions);
  }
}

export default function setSliders() {
  const sliders = [...document.querySelectorAll('.js-slider')];
  if (!sliders.length) return;

  function getOptions({ nextButton, prevButton, container }) {
    return {
      items: {
        container,
        prevButton,
        nextButton,
        mouseDrag: true,
        nav: false,
        items: 1,
        onInit: setLazy,
        gutter: 30,
        responsive: {
          576: {
            items: 2,
          },
          992: {
            items: 3,
          },
        },
      },
      small: {
        container,
        prevButton,
        nextButton,
        mouseDrag: true,
        nav: false,
        items: 1,
        onInit: setLazy,
      },
    };
  }

  sliders.forEach((slider) => {
    const mySlider = new MySlider(slider, getOptions);
    mySlider.init();
  });
}
