// animar elementos al hacer scroll
export function initScrollReveal(){
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting)entry.target.classList.add('visible');
    });
  },{threshold:0.1});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
}
