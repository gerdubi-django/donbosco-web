// aplicar hover con teclado
export function initHover(){
  document.querySelectorAll('.card,.payment-card').forEach(card=>{
    card.addEventListener('focus',()=>card.classList.add('is-hover'));
    card.addEventListener('blur',()=>card.classList.remove('is-hover'));
  });
}
