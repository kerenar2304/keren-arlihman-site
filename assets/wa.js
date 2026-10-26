/* the floating WhatsApp button, bottom right on every page: it comes in after a moment and steps aside while the
   contact section (which has its own WhatsApp button) is on screen */
(function(){
  var href='https://wa.me/972547419393?text=%D7%94%D7%99%D7%99%20%D7%A7%D7%A8%D7%9F%2C%20%D7%94%D7%92%D7%A2%D7%AA%D7%99%20%D7%9E%D7%94%D7%90%D7%AA%D7%A8.%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%93%D7%91%D7%A8%20%D7%A2%D7%9C%20%D7%9E%D7%99%D7%AA%D7%95%D7%92%20%D7%95%D7%90%D7%AA%D7%A8%20%D7%9C%D7%A2%D7%A1%D7%A7%20%D7%A9%D7%9C%D7%99.';
  var css='#wa-fab{position:fixed;right:max(18px,env(safe-area-inset-right));bottom:max(18px,env(safe-area-inset-bottom));z-index:900;width:56px;height:56px;border-radius:50%;display:grid;place-items:center;'
  +'background:#25D366;color:#fff;box-shadow:0 10px 26px -8px rgba(0,0,0,.55),0 0 0 1px rgba(255,255,255,.08) inset;opacity:0;transform:translateY(14px) scale(.9);pointer-events:none;'
  +'transition:opacity .45s ease,transform .45s cubic-bezier(.22,.61,.36,1),box-shadow .3s}'
  +'#wa-fab.on{opacity:1;transform:none;pointer-events:auto}'
  +'#wa-fab:hover{transform:translateY(-2px) scale(1.05);box-shadow:0 14px 30px -8px rgba(37,211,102,.55)}'
  +'#wa-fab:focus-visible{outline:2px solid #C0A8FB;outline-offset:3px}'
  +'#wa-fab svg{width:30px;height:30px}'
  +'@media (max-width:760px){#wa-fab{width:52px;height:52px}#wa-fab svg{width:28px;height:28px}}'
  +'@media (prefers-reduced-motion:reduce){#wa-fab{transition:none}}';
  var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
  var a=document.createElement('a');a.id='wa-fab';a.href=href;a.target='_blank';a.rel='noopener';
  a.setAttribute('aria-label','שליחת הודעת וואטסאפ לקרן (נפתח בחלון חדש)');
  a.innerHTML='<svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16.04 3C9 3 3.3 8.66 3.3 15.65c0 2.24.6 4.43 1.73 6.36L3.2 29l7.17-1.87a12.8 12.8 0 0 0 5.67 1.33h.01c7.03 0 12.74-5.66 12.74-12.65C28.79 8.66 23.08 3 16.04 3Zm0 23.29h-.01c-1.9 0-3.77-.51-5.4-1.47l-.39-.23-4.25 1.11 1.13-4.12-.25-.42a10.4 10.4 0 0 1-1.6-5.5c0-5.8 4.75-10.52 10.6-10.52 5.84 0 10.59 4.72 10.59 10.53 0 5.8-4.75 10.52-10.42 10.62Zm5.8-7.88c-.32-.16-1.89-.93-2.18-1.03-.29-.11-.5-.16-.72.16-.21.32-.82 1.03-1 1.24-.19.21-.37.24-.69.08-.32-.16-1.34-.49-2.56-1.57-.95-.84-1.59-1.88-1.77-2.2-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.18.21-.32.32-.53.1-.21.05-.4-.03-.56-.08-.16-.72-1.72-.98-2.36-.26-.62-.53-.53-.72-.54h-.61c-.21 0-.56.08-.85.4-.29.32-1.11 1.08-1.11 2.64 0 1.56 1.14 3.07 1.3 3.28.16.21 2.24 3.4 5.43 4.77.76.33 1.35.52 1.81.67.76.24 1.45.2 2 .12.61-.09 1.89-.77 2.15-1.51.27-.74.27-1.38.19-1.51-.08-.13-.29-.21-.61-.37Z"/></svg>';
  (document.body||document.documentElement).appendChild(a);
  /* it waits for the loader, and hides where the page already offers WhatsApp */
  var ct=document.getElementById('contact'),inCt=false;
  function upd(){var ld=document.getElementById('ka-ld');var ok=!(ld&&!ld.classList.contains('out'))&&!inCt;a.classList.toggle('on',ok)}
  if(ct&&'IntersectionObserver' in window)new IntersectionObserver(function(es){inCt=es[0].isIntersecting;upd()},{threshold:.25}).observe(ct);
  addEventListener('ka-loader-done',function(){setTimeout(upd,400)});
  setTimeout(upd,1200);
})();
