// inicializar modulos
import {initMenu} from './menu.js';
import {initScrollReveal} from './scroll.js';
import {initHover} from './hover.js';
document.addEventListener('DOMContentLoaded',()=>{
  initMenu();
  initScrollReveal();
  initHover();
});
