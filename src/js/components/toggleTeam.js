import { debounce } from 'throttle-debounce';
import { IS_ACTIVE } from '../constants';

class Team {
  constructor(wrap) {
    this.wrap = wrap;
    // this.items = [...wrap.querySelectorAll(`.${Team.classNames.item}`)];
    // this.btns = [...wrap.querySelectorAll(`.${Team.classNames.btn}`)];
  }

  get items() {
    return [...this.wrap.querySelectorAll(`.${Team.classNames.item}`)];
  }

  get btns() {
    return [...this.wrap.querySelectorAll(`.${Team.classNames.btn}`)];
  }

  _setItemsPosition() {
    const { left } = this.items[0].getBoundingClientRect();

    this.items.forEach((item) => {
      const slide = item;
      slide.style.transform = 'translate(0, 0)';
      const currentLeft = slide.getBoundingClientRect().left;
      const leftOffest = currentLeft - left;
      slide.style.transform = `translate(-${leftOffest}px, 0)`;
    });
  }

  _toggleItem() {
    document.addEventListener('click', this.toggle.bind(this));
  }

  toggle(e) {
    this.btn = e.target.closest(`.${Team.classNames.btn}`);

    if (!this.btn) return;

    this.name = this.btn.dataset.member;
    this.item = this.wrap.querySelector(`.${Team.classNames.item}[data-member="${this.name}"]`);

    this.btns.forEach((btn) => btn.classList.remove(IS_ACTIVE));
    this.items.forEach((item) => item.classList.remove(IS_ACTIVE));

    this.btn.classList.add(IS_ACTIVE);
    this.item.classList.add(IS_ACTIVE);

    console.log(this);
  }

  init() {
    this._setItemsPosition();
    this.setPositions = debounce(300, this._setItemsPosition.bind(this));
    window.addEventListener('resize', this.setPositions);

    this._toggleItem();
  }
}

Team.classNames = {
  item: 'js-team-descr',
  btn: 'js-team-btn',
};

export default function toggleTeam() {
  const teamWrap = document.querySelector('.js-team');
  if (!teamWrap) return;

  const team = new Team(teamWrap);
  team.init();
}
