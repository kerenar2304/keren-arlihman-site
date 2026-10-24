/* the site header, as on the home page: solid once the page scrolls, and the phone menu */
(function(){var h=document.getElementById('hdr'),m=document.getElementById('menu');if(!h)return;
  function s(){h.classList.toggle('solid',scrollY>40)}addEventListener('scroll',s,{passive:true});s();
  function setOpen(o){h.classList.toggle('open',o);m.setAttribute('aria-expanded',o);m.setAttribute('aria-label',o?'סגירת התפריט':'פתיחת התפריט');document.documentElement.style.overflow=o?'hidden':''}
  m.addEventListener('click',function(){setOpen(!h.classList.contains('open'))});
  h.querySelectorAll('.v-nav a,.v-cta').forEach(function(a){a.addEventListener('click',function(){setOpen(false)})});
  addEventListener('keydown',function(e){if(e.key==='Escape'&&h.classList.contains('open')){setOpen(false);m.focus()}})})();
