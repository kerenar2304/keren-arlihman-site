/* the opening loader: the K is drawn stroke by stroke (the stem down, the thin arm in from the top, the leg out,
   the short base line), then the name writes in and the line with the subtitle follows. Once per visit. */
(function(){
  var ss;try{ss=sessionStorage}catch(e){}
  if(ss&&ss.getItem('ka-loader'))return;
  if(document.prerendering)return;
  if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  try{ss&&ss.setItem('ka-loader','1')}catch(e){}
  var css='@font-face{font-family:"Sansation";src:url(assets/mk/fonts/Sansation-Light.ttf);font-weight:300}@font-face{font-family:"Sansation";src:url(assets/mk/fonts/Sansation-Regular.ttf);font-weight:400}'+'#ka-ld{position:fixed;inset:0;z-index:9999;display:grid;place-items:center;background:#0d0c11;color:#f2efe9;transition:opacity .7s ease,visibility .7s}'
  +'#ka-ld.out{opacity:0;visibility:hidden}'
  +'#ka-ld .lk{display:flex;align-items:center;gap:clamp(14px,2vw,26px);direction:ltr}'
  +'#ka-ld svg{width:clamp(54px,7vw,92px);height:auto;overflow:visible}'
  +'#ka-ld .m{fill:none;stroke:#fff;stroke-linecap:butt}'
  +'#ka-ld .m1{stroke-width:150;stroke-dasharray:800;stroke-dashoffset:800;animation:ka-d .5s cubic-bezier(.6,0,.3,1) .15s forwards}'
  +'#ka-ld .m2{stroke-width:70;stroke-dasharray:960;stroke-dashoffset:960;animation:ka-d .45s cubic-bezier(.6,0,.3,1) .62s forwards}'
  +'#ka-ld .m3{stroke-width:190;stroke-dasharray:850;stroke-dashoffset:850;animation:ka-d .5s cubic-bezier(.6,0,.3,1) 1.02s forwards}'
  +'#ka-ld .m4{stroke-width:50;stroke-dasharray:420;stroke-dashoffset:420;animation:ka-d .3s cubic-bezier(.6,0,.3,1) 1.48s forwards}'
  +'#ka-ld .nm{display:flex;flex-direction:column;gap:8px}'
  +'#ka-ld b{font:400 clamp(22px,3.2vw,40px)/1 "Sansation",Arial,sans-serif;letter-spacing:.04em;white-space:nowrap;clip-path:inset(0 100% 0 0);animation:ka-w .7s cubic-bezier(.6,0,.3,1) 1.75s forwards}'
  +'#ka-ld .ln{display:flex;align-items:center;gap:12px}'
  +'#ka-ld .ln i{flex:1;height:1px;background:currentColor;opacity:.75;transform:scaleX(0);transform-origin:left;animation:ka-l .5s cubic-bezier(.6,0,.3,1) 2.35s forwards}'
  +'#ka-ld small{font:300 clamp(10px,1.2vw,15px)/1 "Sansation",Arial,sans-serif;letter-spacing:.08em;white-space:nowrap;opacity:0;animation:ka-f .5s ease 2.6s forwards}'
  +'@keyframes ka-d{to{stroke-dashoffset:0}}@keyframes ka-w{to{clip-path:inset(0 0 0 0)}}@keyframes ka-l{to{transform:scaleX(1)}}@keyframes ka-f{to{opacity:.85}}';
  var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
  var d=document.createElement('div');d.id='ka-ld';d.setAttribute('aria-hidden','true');
  d.innerHTML='<div class="lk"><svg viewBox="560 240 880 1230">'
  +'<defs>'
  /* each stroke of the drawing is a mask line that runs over one part of the mark */
  +'<mask id="ka-k1" maskUnits="userSpaceOnUse" x="540" y="220" width="920" height="1270"><path class="m m1" d="M638 253V1040"/></mask>'
  +'<mask id="ka-k2" maskUnits="userSpaceOnUse" x="540" y="220" width="920" height="1270"><path class="m m2" d="M690 1046L1160 236"/></mask>'
  +'<mask id="ka-k3" maskUnits="userSpaceOnUse" x="540" y="220" width="920" height="1270"><path class="m m3" d="M950 762L1366 1474"/></mask>'
  +'<mask id="ka-k4" maskUnits="userSpaceOnUse" x="540" y="220" width="920" height="1270"><path class="m m4" d="M1125 1173H745"/></mask>'
  +'</defs><g fill="currentColor">'
  +'<path mask="url(#ka-k1)" d="M575 253H702V1039H575Z"/>'
  +'<path mask="url(#ka-k2)" d="M702 996L1133 253H1157L702 1039Z"/>'
  +'<path mask="url(#ka-k3)" d="M917 837L989 710L1425 1458H1278L1117 1183Z"/>'
  +'<path mask="url(#ka-k4)" d="M753 1163H1105L1117 1183H753Z"/>'
  +'</g></svg><span class="nm"><b>KEREN ARLIHMAN</b><span class="ln"><i></i><small>GRAPHIC &amp; WEB DESIGNER</small></span></span></div>';
  (document.body||document.documentElement).appendChild(d);
  var t0=Date.now(),loaded=document.readyState==='complete';
  function end(){d.classList.add('out');setTimeout(function(){d.remove()},800)}
  function maybe(){if(loaded&&Date.now()-t0>=3900)end()}
  addEventListener('load',function(){loaded=true;setTimeout(maybe,Math.max(0,3900-(Date.now()-t0)))});
  setTimeout(function(){loaded=true;maybe()},3900);
  setTimeout(end,6000);
})();
