import 'core-js/features/symbol';
import 'core-js/features/array/from';
import 'core-js/features/promise';
import 'intersection-observer';
import './lib/polyfill';

import sayHello from './lib/sayHello';
import setHTMLClassNames from './components/setHTMLClassNames';
import setLazy from './components/setLazy';
import setSliders from './components/setSliders';
import setScrollBar from './components/setScrollBar';
import toggleMenu from './components/toggleMenu';
import toggleTeam from './components/toggleTeam';
import toggleMobDropdown from './components/toggleMobDropdown';
import setTextareaHeight from './components/setTextareaHeight';
import setAccordion from './components/setAccordion';

document.addEventListener('DOMContentLoaded', () => {
  sayHello();
  setHTMLClassNames();
  setLazy();
  setSliders();
  setScrollBar();
  toggleMenu();
  toggleTeam();
  toggleMobDropdown();
  setTextareaHeight();
  setAccordion();
});
