/* =====================================================================
   SLIDE 20 · Roadmap e decisões · dono: roadmap · fechamento do deck
   Trilha de tabuleiro (fx Timeline Motion do Guia DTS, adaptado): os cartões das quatro ondas vêm de TL_LAUNCH
   (src/data/20-timelines.js); embaixo deles, uma trilha em SVG com casas, uma estação numerada por onda, a saída
   ("Hoje") e a chegada (bandeira). Ao entrar, as ondas acendem em sequência: o mascote (pose bandeira) anda pela
   trilha, as casas por onde ele passa acendem e o fio de progresso avança; no fim, ele diz a fala do slide.
   → acende a próxima onda (interrompe a reprodução); ← volta. Clicar num cartão ou numa estação vai direto à onda.
   As cartas de decisão ("O chamado") acendem, ao passar o cursor, as ondas que cada decisão destrava.
   Ganchos: ENTER["20"] (reproduz a trilha; entrando pelo ← ou com movimento reduzido, mostra tudo aceso),
   STEP["20"] (ondas), PRINT (estado final estático: as quatro ondas acesas, o mascote na última estação e a fala).
   Sem números além dos estruturais (quatro ondas, números das ondas, códigos de produto); os das janelas vêm de FATOS.
   ===================================================================== */
(function(){const sec=SL("20");if(!sec)return;
  const WV=(typeof TL_LAUNCH!=="undefined"&&Array.isArray(TL_LAUNCH))?TL_LAUNCH:[];
  const waves=$("s20Waves"),trail=$("s20Trail"),svg=$("s20Svg"),pawn=$("s20Pawn"),fala=$("s20Fala"),msBox=$("s20Ms"),playBtn=$("s20Play");
  if(!WV.length||!waves||!trail||!svg||!pawn)return;
  const N=WV.length,LAST=N-1;
  const at=s=>String(s==null?"":s).replace(/&(?!amp;)/g,"&amp;").replace(/"/g,"&quot;");
  const isCode=x=>/^[1-4]\.[1-7]$/.test(String(x));
  const lk=x=>typeof codeLink==="function"?codeLink(x):x;
  /* produto que entra na onda: código + nome inteiro (abre a ficha) */
  const pr=c=>{const p=typeof PBY==="function"?PBY(c):null;
    return p?`<a class="s20-pr ${p.st}" href="#p=${p.id}" data-pd="${p.id}" data-tv="${at(p.code+" · "+p.name)}" data-tl="Clique para abrir a ficha."><i>${p.code}</i><span>${p.name}</span></a>`
            :`<span class="s20-it"><i aria-hidden="true"></i>${c}</span>`};

  /* ---------- cartões das ondas ---------- */
  const cards=WV.map((w,k)=>{const c=H("div",{class:"s20-w","data-k":k,style:`--k:${k}`,role:"button",tabindex:"0","aria-label":`Onda ${w.n}: ${w.s}`},waves);
    c.innerHTML=`<span class="s20-we"><b>Onda ${w.n}</b> · ${w.q}</span>
      <b class="s20-wt">${w.s}</b>
      <p class="s20-wp">${w.t}</p>
      <div class="s20-wi">${(w.it||[]).map(x=>isCode(x)?pr(x):`<span class="s20-it"><i aria-hidden="true"></i><span>${lk(x)}</span></span>`).join("")}</div>
      <div class="s20-wg"><p><b>${k<LAST?"Avança quando":"Chega quando"}</b> ${lk(w.av)}</p></div>`;
    const pick=e=>{if(e.target.closest("a[data-pd]"))return;e.stopPropagation();stopAuto();set(k)};
    c.addEventListener("click",pick);c.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();pick(e)}});
    return c});
  /* indicador de cada onda, embaixo da estação */
  const ms=WV.map(w=>H("span",{class:"s20-m"},msBox,w.m||""));
  /* códigos de produto nos textos fixos viram link para a ficha */
  sec.querySelectorAll(".s20-jo,.s20-dx p,.s20-nx span").forEach(el=>{el.innerHTML=lk(el.innerHTML)});

  /* ---------- trilha (desenhada quando o slide tem medida; sem medida, usa a geometria do grid) ---------- */
  let G=null;const PW=88,PH=PW*312/320;
  function geo(){const Wd=trail.offsetWidth||1542,Hh=trail.offsetHeight||130,gap=16;
    const xs=cards.map((c,k)=>c.offsetWidth?c.offsetLeft+c.offsetWidth/2:((Wd-gap*(N-1))/N)*(k+.5)+gap*k);
    return{Wd,Hh,xs,y:Hh-40}}
  function build(){const g=geo();if(G&&G.Wd===g.Wd&&G.Hh===g.Hh&&G.xs.every((x,k)=>Math.abs(x-g.xs[k])<1))return G;
    const {Wd,Hh,xs,y}=g,x0=36,x1=Wd-30,pts=[[x0,y],...xs.map(x=>[x,y]),[x1,y]];
    let d=`M${x0} ${y}`;for(let i=0;i<pts.length-1;i++){const [ax,ay]=pts[i],[bx,by]=pts[i+1],dx=bx-ax,s=(i%2?1:-1)*10;
      d+=` C${(ax+dx/3).toFixed(1)} ${ay+s} ${(ax+2*dx/3).toFixed(1)} ${by+s} ${bx.toFixed(1)} ${by}`}
    svg.setAttribute("viewBox",`0 0 ${Wd} ${Hh}`);svg.innerHTML=`<defs><linearGradient id="s20Grad" x1="0" x2="1"><stop offset="0" stop-color="#5E8AB4"/><stop offset=".7" stop-color="#9DBBD9"/><stop offset="1" stop-color="#F9A64A"/></linearGradient></defs>`;
    /* fio tracejado de cada cartão até a sua estação */
    const cn=xs.map(x=>S("line",{class:"s20-cn",x1:x.toFixed(1),y1:-9,x2:x.toFixed(1),y2:y-19},svg));
    const bed=S("path",{class:"s20-bed",d},svg);S("path",{class:"s20-edge",d},svg);
    const L=bed.getTotalLength();
    /* comprimento da trilha em cada estação (x cresce com o comprimento) */
    const lenAt=x=>{let lo=0,hi=L;for(let it=0;it<30;it++){const m=(lo+hi)/2;if(bed.getPointAtLength(m).x<x)lo=m;else hi=m}return(lo+hi)/2};
    const SL_=xs.map(lenAt);
    const prog=S("path",{class:"s20-prog",d,"stroke-dasharray":`${L} ${L}`,"stroke-dashoffset":L},svg);
    /* casas: a cada 25 px, fora das estações, da saída e da chegada */
    const tg=S("g",null,svg),tiles=[];
    for(let l=34;l<L-30;l+=25){if(SL_.some(s=>Math.abs(s-l)<24))continue;const p=bed.getPointAtLength(l),q=bed.getPointAtLength(Math.min(L,l+1));
      const a=Math.atan2(q.y-p.y,q.x-p.x)*180/Math.PI;tiles.push([l,S("rect",{class:"s20-t",x:-7,y:-7,width:14,height:14,rx:3,transform:`translate(${p.x.toFixed(1)} ${p.y.toFixed(1)}) rotate(${a.toFixed(1)})`},tg)])}
    /* saída e chegada */
    const go=S("g",{class:"s20-go",transform:`translate(${x0} ${y})`},svg);S("rect",{x:-24,y:-12,width:48,height:24,rx:12},go);T(go,0,0,"HOJE");
    const fin=S("g",{class:"s20-fin",transform:`translate(${x1} ${y})`},svg);
    [[-9,-9,"ck"],[0,-9,"ck2"],[-9,0,"ck2"],[0,0,"ck"]].forEach(([cx,cy,c])=>S("rect",{class:c,x:cx,y:cy,width:9,height:9},fin));
    S("line",{class:"pole",x1:9,y1:9,x2:9,y2:-38},fin);S("path",{class:"flag",d:"M9 -38 L30 -31 L9 -24 Z"},fin);
    /* ponta luminosa do progresso (embaixo das estações, para não cobrir o número) */
    const tip=S("circle",{class:"s20-tip",r:5,cx:x0,cy:y},svg);
    /* estações numeradas (clicáveis) */
    const st=xs.map((x,k)=>{const gk=S("g",{class:"s20-st",transform:`translate(${x.toFixed(1)} ${y})`},svg);S("circle",{class:"s20-rg",r:17},gk);S("circle",{r:17},gk);T(gk,0,1,String(WV[k].n));
      gk.addEventListener("click",e=>{e.stopPropagation();stopAuto();set(k)});return gk});
    /* indicadores embaixo das estações */
    ms.forEach((m,k)=>{m.style.left=xs[k].toFixed(1)+"px"});
    G={Wd,Hh,xs,y,x0,bed,L,SL:SL_,prog,tiles,st,cn,tip,pos:0};place(G.pos);return G}

  /* posição do mascote na trilha: ele para um pouco antes da estação, para o número continuar à vista */
  const OFF=66;
  const target=k=>k<0?0:Math.max(0,G.SL[k]-OFF);
  function place(l){if(!G)return;G.pos=l;const p=G.bed.getPointAtLength(l);
    pawn.style.transform=`translate(${(p.x-PW/2).toFixed(1)}px,${(p.y-PH+3).toFixed(1)}px)`;
    const lit=Math.max(l,cur>=0?G.SL[cur]:0);
    G.tiles.forEach(([tl,r])=>r.classList.toggle("on",tl<=lit+2));
    G.prog.setAttribute("stroke-dashoffset",(G.L-lit).toFixed(1));
    const q=G.bed.getPointAtLength(lit);G.tip.setAttribute("cx",q.x.toFixed(1));G.tip.setAttribute("cy",q.y.toFixed(1));G.tip.style.opacity=lit>0?1:0}
  /* fala: à esquerda do mascote, na altura da cabeça (não cobre as estações nem os cartões) */
  function placeFala(){if(!G||!fala)return;const p=G.bed.getPointAtLength(G.pos),w=fala.offsetWidth||270,h=fala.offsetHeight||38;
    fala.style.left=Math.max(0,p.x-PW/2-12-w).toFixed(1)+"px";fala.style.top=Math.max(0,p.y-PH+4).toFixed(1)+"px";void h}

  /* ---------- estado ---------- */
  let cur=-1,raf=0,auto=0;
  function paint(){cards.forEach((c,k)=>{c.classList.toggle("on",k===cur);c.classList.toggle("done",k<cur);c.classList.toggle("off",k>cur&&cur>=0);c.setAttribute("aria-current",k===cur?"step":"false")});
    if(G){G.st.forEach((g,k)=>{g.classList.toggle("on",k===cur);g.classList.toggle("done",k<cur)});G.cn.forEach((l,k)=>l.classList.toggle("lit",k===cur))}
    ms.forEach((m,k)=>m.classList.toggle("lit",k<=cur));
    if(fala)fala.classList.toggle("on",cur===LAST)}
  function set(k,instant){build();k=clamp(k,-1,LAST);cur=k;paint();cancelAnimationFrame(raf);pawn.classList.remove("walk");
    const to=target(k),from=G.pos;
    if(instant||REDMO||Math.abs(to-from)<1){place(to);placeFala();return}
    const t0=performance.now(),dur=clamp(Math.abs(to-from)*2.4,450,1500);pawn.classList.add("walk");
    const step=now=>{const u=Math.min(1,(now-t0)/dur);place(from+(to-from)*ease.inOut(u));
      if(u<1)raf=requestAnimationFrame(step);else{pawn.classList.remove("walk");placeFala()}};
    raf=requestAnimationFrame(step)}
  function stopAuto(){clearTimeout(auto);auto=0}
  function play(){stopAuto();set(-1,true);let k=-1;const tick=()=>{k++;if(k>LAST){auto=0;return}set(k);auto=setTimeout(tick,k===0?1500:1700)};auto=setTimeout(tick,650)}
  if(playBtn)playBtn.addEventListener("click",e=>{e.stopPropagation();play()});

  /* cartas de decisão: passar o cursor (ou focar) acende as ondas que a decisão destrava */
  const hl=(ks,on)=>ks.forEach(k=>cards[k]&&cards[k].classList.toggle("hl",on));
  sec.querySelectorAll(".s20-dc[data-w],.s20-j[data-w]").forEach(el=>{const ks=el.dataset.w.split(",").map(Number).filter(n=>n>=0&&n<N);
    ["mouseenter","focus"].forEach(ev=>el.addEventListener(ev,()=>hl(ks,true)));["mouseleave","blur"].forEach(ev=>el.addEventListener(ev,()=>hl(ks,false)))});

  /* ---------- ganchos ---------- */
  ENTER["20"]=()=>{stopAuto();build();if(goLast||REDMO)set(LAST,true);else play()};
  STEP["20"]=d=>{stopAuto();if(d>0){if(cur<LAST){set(cur+1);return true}return false}if(cur>0){set(cur-1);return true}return false};
  addEventListener("resize",()=>{if(G&&sec.classList.contains("active")){G=null;build();place(target(cur));placeFala()}});
  /* impressão: tudo aceso, mascote na última estação, fala visível (a página já mostra toda a informação) */
  PRINT.push(()=>{stopAuto();cancelAnimationFrame(raf);set(LAST,true)});
})();
