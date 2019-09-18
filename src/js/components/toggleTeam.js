import { debounce } from 'throttle-debounce';

class Team {
  constructor(wrap) {
    this.wrap = wrap;
    this.items = [...wrap.querySelectorAll('.js-team-descr')];
    this.btns = [...wrap.querySelectorAll('.js-team-btn')];
  }

  _setItemsPosition() {
    const { left } = this.items[0].getBoundingClientRect();

    this.items.forEach((item) => {
      const slide = item;
      slide.style.transform = 'translate(0, 0)';
      const currTranslate = window.getComputedStyle(slide);
      const currentLeft = slide.getBoundingClientRect().left;
      const leftOffest = currentLeft - left;
      slide.style.transform = `translate(-${leftOffest}px, 0)`;
    });
  }

  init() {
    this._setItemsPosition();
    this.setPositions = debounce(300, this._setItemsPosition.bind(this));
    window.addEventListener('resize', this.setPositions);
  }
}

export default function toggleTeam() {
  const teamWrap = document.querySelector('.js-team');
  if (!teamWrap) return;

  const team = new Team(teamWrap);
  team.init();
}
