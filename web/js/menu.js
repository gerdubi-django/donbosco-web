// inicializar menu movil
export function initMenu(){
  const toggle=document.querySelector('.nav__toggle');
  const list=document.querySelector('.nav__list');
  toggle.addEventListener('click',()=>list.classList.toggle('nav__list--open'));
  list.querySelectorAll('a').forEach(link=>
    link.addEventListener('click',()=>list.classList.remove('nav__list--open'))
  );
}
