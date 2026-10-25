/* the site header, as on the home page: solid once the page scrolls, and the phone menu */
(function(){var h=document.getElementById('hdr'),m=document.getElementById('menu');if(!h)return;
  function s(){h.classList.toggle('solid',scrollY>40)}addEventListener('scroll',s,{passive:true});s();
  function setOpen(o){h.classList.toggle('open',o);m.setAttribute('aria-expanded',o);m.setAttribute('aria-label',o?'סגירת התפריט':'פתיחת התפריט');document.documentElement.style.overflow=o?'hidden':''}
  m.addEventListener('click',function(){setOpen(!h.classList.contains('open'))});
  h.querySelectorAll('.v-nav a,.v-cta').forEach(function(a){a.addEventListener('click',function(){setOpen(false)})});
  addEventListener('keydown',function(e){if(e.key==='Escape'&&h.classList.contains('open')){setOpen(false);m.focus()}})})();
/* a project page starts loading as soon as its link is pointed at or touched, so opening it feels immediate */
(function(){var done={};function pf(h,as){if(done[h])return;done[h]=1;var l=document.createElement('link');l.rel='prefetch';l.href=h;if(as)l.as=as;document.head.appendChild(l)}
  function go(e){var a=e.target.closest&&e.target.closest('a[href^="project-"]');if(!a)return;pf(a.getAttribute('href'));pf('assets/project.css','style');pf('assets/project.js','script')}
  ['pointerover','touchstart','focusin'].forEach(function(t){addEventListener(t,go,{passive:true})})})();
/* the 3D letter swap, as on the home page: the menu's and the buttons' words split into letters (each a small cube);
   the words stay for screen readers in aria-label */
(function(){
  [].forEach.call(document.querySelectorAll('.v-nav a,.v-cta,.sb-btn,.pj-filter button'),function(b){
    [].slice.call(b.childNodes).forEach(function(n){if(n.nodeType!==3||!n.textContent.trim())return;
      var t=n.textContent.trim(),w=document.createElement('span');w.className='lsw';w.setAttribute('aria-hidden','true');
      t.split('').forEach(function(c,i){if(c===' '){w.appendChild(document.createTextNode(' '));return}var e=document.createElement('i');e.textContent=c;e.setAttribute('data-c',c);e.style.setProperty('--i',i);w.appendChild(e)});
      if(!b.getAttribute('aria-label'))b.setAttribute('aria-label',t);
      b.replaceChild(w,n);if(/\s$/.test(n.textContent))b.insertBefore(document.createTextNode(' '),w.nextSibling)})})
})();
