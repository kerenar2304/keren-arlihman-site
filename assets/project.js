(function(){var RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
  /* the name's letters rise one after another */
  [].forEach.call(document.querySelectorAll('.ph h1 span'),function(s,i){s.style.animationDelay=(.05+i*.05)+"s"});
  /* pictures rise in as they come into view */
  var rv=[].slice.call(document.querySelectorAll('.rv'));
  if(RM||!('IntersectionObserver' in window))rv.forEach(function(e){e.classList.add('on')});
  else{var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target)}})},{rootMargin:'0px 0px -10% 0px'});rv.forEach(function(e){io.observe(e)})}
  if(RM)return;
  /* the hero sinks slowly as the page leaves it; the table of screens drifts sideways with the scroll */
  var hi=document.querySelector('.ph img'),tb=document.querySelector('.tbl'),pl=tb&&tb.querySelector('.pl'),raf=0;
  function f(){raf=0;var y=scrollY;if(y<innerHeight*1.2)hi.style.transform='translateY('+(y*.07).toFixed(1)+'px)';
    if(pl){var r=tb.getBoundingClientRect(),p=(innerHeight-r.top)/(innerHeight+r.height);if(p>-.1&&p<1.1)pl.style.setProperty('--dx',((p-.5)*-20)+'vw')}}
  addEventListener('scroll',function(){if(!raf)raf=requestAnimationFrame(f)},{passive:true});f()})();
