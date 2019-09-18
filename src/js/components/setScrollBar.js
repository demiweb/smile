import baron from 'baron';
import { isWebkit } from '../helpers';

class Scrollbar {
  constructor(container) {
    this.container = container;
  }

  init() {
    this.createElements();
    this.initPlugin();
  }

  createElements() {
    this.inner = document.createElement('div');
    this.track = document.createElement('div');
    this.bar = document.createElement('div');

    const { maxHeight } = window.getComputedStyle(this.container);
    const content = this.container.innerHTML;
    this.container.innerHTML = '';

    this.inner.className = Scrollbar.classNames.inner;
    this.inner.innerHTML = content;
    this.inner.style.maxHeight = maxHeight;
    this.track.className = Scrollbar.classNames.track;
    this.bar.className = Scrollbar.classNames.bar;

    this.track.appendChild(this.bar);
    this.container.appendChild(this.inner);
    this.container.appendChild(this.track);
  }

  initPlugin() {
    this.plugin = baron({
      root: this.container,
      scroller: this.inner,
      bar: this.bar,
      // barOnCls: 'is-init',
    });
  }
}

Scrollbar.classNames = {
  inner: 'scrollbar__inner',
  track: 'scrollbar__track',
  bar: 'scrollbar__bar',
};

export default function setScrollbar() {
  if (isWebkit) return;
  const containers = [...document.querySelectorAll('.js-scrollbar')];

  if (!containers.length) return;

  containers.forEach((container) => {
    const scrollbar = new Scrollbar(container);
    scrollbar.init();
  });
}
