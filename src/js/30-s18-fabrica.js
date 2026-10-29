/* =====================================================================
   SLIDE 18 · Fábrica de produtos · dono: fabrica-jogos
   Os sete portões que um serviço atravessa para virar produto (proposta DTS), nesta ordem:
   dor que se repete → escopo fechado → método replicável → IA no método → dados que se acumulam →
   formato que o cliente compra → dono do produto → saída: piloto com clientes selecionados (prazo e preço calibrados ali).
   - Esteira no topo: os sete portões e o piloto; clique num portão para abri-lo; o mascote (capacete) vigia a saída.
   - Card Stack (engine.js · CardStack): um cartão por portão, com a pergunta, o que o produto precisa mostrar para passar,
     um exemplo do portfólio (link para a ficha) e o que acontece se não passa. Clicar ou arrastar o cartão do topo
     também avança (comportamento do CardStack).
   - Lateral: por que portões agora (três fatos do registro, ligados aos portões que reforçam: passar o cursor acende
     os portões na esteira), quem decide e a saída (piloto).
   Ganchos: ENTER["18"] (portão 1; entrando pelo ←, portão 7), STEP["18"] (→ abre o próximo portão; no 7º, segue
   para o slide 19; ← volta), PRINT (página do slide no portão 1 + página extra com a tabela dos sete portões).
   Sem números além dos estruturais (sete portões, posição de cada portão, códigos de produto); o 60% vem de FATOS.
   ===================================================================== */
(function(){const sec=SL("18"),track=$("s18Track"),scene=$("s18Scene");if(!sec||!track||!scene)return;
  /* k: rótulo da esteira (palavra do subtítulo) · kk: complemento · t: nome do portão · ic: ícone (05-icons.js)
     q: a pergunta do portão · p: o que o produto precisa mostrar · ex: [código, exemplo no portfólio] · no: se não passa */
  const G=[
    {k:"Dor",kk:"que se repete",t:"Dor que se repete",ic:"target",
     q:"A mesma dor aparece em vários clientes, com o mesmo comprador?",
     p:["A dor se repete em clientes do mesmo perfil; não é um caso isolado","Há um comprador claro, que assina e responde pelo resultado","O gatilho é reconhecível: orçamento, troca de liderança, transação ou prazo legal"],
     ex:["2.4","Projeto de ERP, sistema ou transformação em crise: a dor se repete e quem compra é sempre o CEO, o CFO ou o conselho."],
     no:"Segue como serviço sob medida: não ganha ficha nem kit."},
    {k:"Escopo",kk:"fechado",t:"Escopo fechado",ic:"doc",
     q:"O que entra, o que fica de fora e em que decisão o trabalho termina?",
     p:["Entregáveis e critério de pronto escritos","O que não está incluído também escrito","O trabalho termina numa decisão do cliente, não num relatório"],
     ex:["1.1","Termina numa lista curta de decisões, com valor em reais e dono, e não num relatório de maturidade."],
     no:"Volta para o desenho: escopo aberto vira hora vendida."},
    {k:"Método",kk:"replicável",t:"Método replicável",ic:"route",
     q:"Outra equipe entrega o mesmo resultado em outro cliente?",
     p:["Etapas, roteiros, modelos e pedido de dados padronizados","Critério de qualidade em cada etapa, revisado por um sênior antes da entrega","Um kit que um consultor novo aprende a usar"],
     ex:["3.1","Une a diligência de quem compra e de quem vende num só método, em níveis com escopo e preço fechados."],
     no:"O método ainda mora na cabeça de quem entrega: escrever antes de vender."},
    {k:"IA",kk:"no método",t:"IA no método",ic:"ai",
     q:"Em que etapa a IA tira trabalho repetitivo ou enxerga o que a equipe não veria?",
     p:["Cada etapa diz o que a IA faz e o que fica com a equipe","Revisão humana: um sênior assina cada achado","Cada achado cita a evidência, no ambiente seguro do cliente e dentro da LGPD"],
     ex:["1.5","A IA lê contratos e extrai renovação, reajuste, multa e cláusula cambial; Finanças valida cada economia."],
     no:"Sem papel claro para a IA, o ganho de produtividade vira desconto pedido pelo cliente."},
    {k:"Dados",kk:"que se acumulam",t:"Dados que se acumulam",ic:"db",
     q:"O que cada projeto deixa para o próximo cliente?",
     p:["Base de comparação anonimizada, com permissão de cada cliente","A mesma taxonomia em todos os projetos","Regra de atualização da base a cada entrega"],
     ex:["3.5","Cada investida acompanhada melhora a comparação entre as empresas do mesmo fundo."],
     no:"Cada projeto recomeça do zero, e o produto não melhora com o uso."},
    {k:"Formato",kk:"que o cliente compra",t:"Formato que o cliente compra",ic:"contract",
     q:"Como o cliente compra: diagnóstico fechado, programa com marcos ou assinatura?",
     p:["Formato e modelo comercial escritos na ficha","Preço ligado à entrega ou ao resultado, não às horas","Prazo e preço calibrados no piloto, não no papel"],
     ex:["1.7","Escritório operado pela A&amp;M, vendido por assinatura em níveis de serviço."],
     no:"Sem formato claro, a proposta volta a ser hora estimada."},
    {k:"Dono",kk:"do produto",t:"Dono do produto",ic:"people",
     q:"Quem responde pela ficha, pela qualidade e pela evolução do produto?",
     p:["Um dono por produto, com equipe treinada no método","Resultados do produto acompanhados pelo comitê de portfólio","Revisão periódica: escalar, ajustar ou aposentar"],
     ex:["1.3","Três ofertas de liderança viram um só produto, com um dono para o método, a bancada de executivos e o preço."],
     no:"Produto sem dono envelhece: o método se perde e a ficha para no tempo."}];
  const N=G.length;
  /* sem palavra sozinha na última linha: espaço não separável antes da última palavra */
  const cola=t=>String(t==null?"":t).replace(/ (\S+)$/,"\u00a0$1");
  G.forEach(g=>{g.q=cola(g.q);g.p=g.p.map(cola);g.ex[1]=cola(g.ex[1]);g.no=cola(g.no)});
  const at=s=>String(s==null?"":s).replace(/&(?!amp;)/g,"&amp;").replace(/"/g,"&quot;");
  const ic=(n,d)=>typeof icoSvg==="function"?icoSvg(n,d):"";
  const CHK='<svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="6 12.5 10 16.5 18 8"/></svg>';
  const plk=c=>{const p=PBY(c);return p?`<a href="#p=${p.id}" data-pd="${p.id}" class="plink sm ${p.st}" data-tv="${at(p.code+" · "+p.name)}" data-tl="Clique para abrir a ficha.">${p.code} ${p.name}</a>`:`<b>${c}</b>`};
  const pnm=c=>{const p=PBY(c);return p?`${p.code} ${p.name}`:c};

  /* ---------- esteira: sete portões e a saída (piloto) ---------- */
  const rail=H("div",{class:"s18-rail"});track.prepend(rail);
  const nodes=[],lns=[];
  G.forEach((g,i)=>{if(i)lns.push(H("i",{class:"s18-ln","aria-hidden":"true"},rail));
    const b=H("button",{class:"s18-g",type:"button","data-k":i,"aria-label":`Portão ${i+1}: ${g.t}`},rail);
    b.innerHTML=`<span class="s18-n"><b>${i+1}</b>${CHK}</span><span class="s18-gt"><b>${g.k}</b><i>${g.kk}</i></span>`;
    b.addEventListener("click",e=>{e.stopPropagation();goTo(i)});nodes.push(b)});
  lns.push(H("i",{class:"s18-ln s18-lnp","aria-hidden":"true"},rail));
  const pil=H("div",{class:"s18-pil"},rail);
  pil.innerHTML=`<span class="s18-pic">${ic("rocket",8)}</span><span class="s18-gt"><b>Piloto</b><i>prazo e preço calibrados</i></span>`;

  /* ---------- pilha de cartões (um por portão) ---------- */
  const cardHTML=(g,i)=>`<div class="s18-cd dk">
      <span class="s18-cq" aria-hidden="true">${i+1}</span>
      <div class="s18-ck"><span class="s18-cic">${ic(g.ic,i)}</span><span class="s18-ckt">Portão ${i+1} de ${N}</span></div>
      <b class="s18-ct">${g.t}</b>
      <p class="s18-cp">${g.q}</p>
      <div class="s18-cc">
        <div class="s18-crit"><span class="s18-cl">Para passar, o produto mostra</span><ul>${g.p.map(x=>`<li>${x}</li>`).join("")}</ul></div>
        <div class="s18-ex"><span class="s18-cl">No portfólio</span>${plk(g.ex[0])}<p>${g.ex[1]}</p></div>
      </div>
      <div class="s18-no"><span class="s18-cl">Se não passa</span><p>${g.no}</p></div>
    </div>`;
  let cur=0,tmr=0;
  function sync(){nodes.forEach((n,j)=>{n.classList.toggle("done",j<cur);n.classList.toggle("cur",j===cur);n.setAttribute("aria-current",j===cur?"step":"false")});
    lns.forEach((l,j)=>l.classList.toggle("on",j<cur||(j===N-1&&cur===N-1)));pil.classList.toggle("on",cur===N-1)}
  const cs=CardStack(scene,G.map(cardHTML),null,k=>{cur=k;sync()});
  if(typeof fixPaths==="function"){fixPaths(scene);fixPaths(track)}
  const els=()=>[...scene.querySelectorAll(".cs-card")];
  /* abre o portão k: para a frente, o cartão do topo sai voando (como no CardStack); para trás, o anterior volta pela esquerda */
  function goTo(k,instant){k=clamp(k,0,N-1);clearTimeout(tmr);const from=cur,E=els();
    if(k===from){cs.to(k);return}
    if(!instant&&!REDMO&&k===from+1&&E[from]){const el=E[from];el.style.transition="transform .32s ease-in,opacity .32s";el.style.transform="translate(112%,-20px) rotate(12deg)";el.style.opacity=0;
      cur=k;sync();tmr=setTimeout(()=>{el.style.transition="";cs.to(k)},320);return}
    if(!instant&&!REDMO&&k===from-1&&E[k]){const el=E[k];el.style.transition="none";el.style.transform="translate(-112%,-20px) rotate(-12deg)";el.style.opacity=0;void el.offsetWidth;el.style.transition=""}
    cs.to(k)}

  /* fatos da lateral: passar o cursor acende os portões que o fato reforça */
  sec.querySelectorAll(".s18-f[data-g]").forEach(f=>{const ks=f.dataset.g.split(",").map(Number);
    f.addEventListener("mouseenter",()=>ks.forEach(k=>nodes[k]&&nodes[k].classList.add("hl")));
    f.addEventListener("mouseleave",()=>ks.forEach(k=>nodes[k]&&nodes[k].classList.remove("hl")))});

  /* ---------- ganchos ---------- */
  ENTER["18"]=()=>{clearTimeout(tmr);els().forEach(e=>{e.style.transition=""});cs.to(goLast?N-1:0)};
  STEP["18"]=d=>{if(d>0){if(cur<N-1){goTo(cur+1);return true}return false}if(cur>0){goTo(cur-1);return true}return false};
  /* impressão: a página do slide abre no portão 1; uma página extra traz os sete portões em tabela */
  PRINT.push(()=>{clearTimeout(tmr);els().forEach(e=>{e.style.transition=""});cs.to(0);
    if(stage.querySelector(".s18-print"))return;
    const c=sec.cloneNode(true);c.classList.remove("active","entering","back");c.classList.add("pane-print","s18-print","play");
    c.querySelectorAll("[id]").forEach(e=>e.removeAttribute("id"));
    const sub=c.querySelector(".sub");if(sub)sub.textContent="Os sete portões em detalhe: a pergunta, o que o produto precisa mostrar, um exemplo do portfólio e o que acontece se não passa";
    const tb=H("table",{class:"tbl s18-tb"});
    tb.innerHTML=`<thead><tr><th>Portão</th><th>A pergunta</th><th>Para passar, o produto mostra</th><th>No portfólio</th><th>Se não passa</th></tr></thead><tbody>${G.map((g,i)=>`<tr>
      <td class="s18-tg"><span class="s18-tn">${i+1}</span><b>${g.t}</b></td><td>${g.q}</td><td>${g.p.join(" · ")}</td><td><b>${pnm(g.ex[0])}</b> · ${g.ex[1]}</td><td>${g.no}</td></tr>`).join("")}
      <tr class="s18-tp"><td class="s18-tg"><span class="s18-tn">→</span><b>Piloto</b></td><td colspan="4">Com clientes selecionados: prazo e preço de cada produto saem daqui, não de estimativa. O dono leva o produto portão a portão; o comitê de portfólio da DTS aprova, devolve com ajuste ou arquiva e, depois do piloto, decide escalar, ajustar ou aposentar.</td></tr></tbody>`;
    const w=H("div",{class:"s18-pw"});w.appendChild(tb);
    const tr=c.querySelector(".s18-track");if(tr)tr.remove();const sw=c.querySelector(".sowhat");if(sw)sw.remove();
    const m=c.querySelector(".s18-main");if(m)m.replaceWith(w);sec.after(c)});
})();
