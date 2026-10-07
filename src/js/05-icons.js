/* =====================================================================
   ÍCONES DE LINHA COMPARTILHADOS (fx 02 · Icon Motion: desenham na entrada)
   Mesma iconografia da apresentação DTS Tech M&A. Use icoSvg(nome,atraso)
   e chame fixPaths(raiz) depois de inserir SVGs para ativar o desenho.
   ===================================================================== */
const ICONS={
doc:'<path d="M7 3h7l5 5v13H7z"/><polyline points="14 3 14 8 19 8"/><line x1="10" y1="13" x2="16" y2="13"/><line x1="10" y1="17" x2="16" y2="17"/>',
check:'<rect x="4" y="4" width="16" height="16" rx="3"/><polyline points="8.5 12 11 14.5 15.5 9.5"/>',
shield:'<path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z"/><polyline points="9 12 11 14 15 10"/>',
graph:'<circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="7" r="2.5"/><circle cx="12" cy="18" r="2.5"/><line x1="8.3" y1="7" x2="15.6" y2="7"/><line x1="7.3" y1="8.2" x2="10.8" y2="15.8"/><line x1="16.8" y1="9.2" x2="13.2" y2="15.8"/>',
code:'<polyline points="8 8 4 12 8 16"/><polyline points="16 8 20 12 16 16"/><line x1="13.5" y1="5" x2="10.5" y2="19"/>',
cloud:'<path d="M7 18h10a4 4 0 0 0 .5-8 6 6 0 0 0-11.4 1.5A3.3 3.3 0 0 0 7 18z"/>',
ai:'<rect x="6" y="6" width="12" height="12" rx="2"/><rect x="9.5" y="9.5" width="5" height="5" rx="1"/><line x1="9" y1="3" x2="9" y2="6"/><line x1="15" y1="3" x2="15" y2="6"/><line x1="9" y1="18" x2="9" y2="21"/><line x1="15" y1="18" x2="15" y2="21"/><line x1="3" y1="9" x2="6" y2="9"/><line x1="3" y1="15" x2="6" y2="15"/><line x1="18" y1="9" x2="21" y2="9"/><line x1="18" y1="15" x2="21" y2="15"/>',
people:'<circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><path d="M16 11a3 3 0 1 0 0-6"/><path d="M18 20c0-2.4-1.1-4.5-3-5.6"/>',
contract:'<path d="M6 3h9l4 4v14H6z"/><path d="M9 16c1.5-2 2.5-2 3.5 0s2 2 3 0"/><line x1="9" y1="9" x2="15" y2="9"/>',
chart:'<polyline points="3.5 17 9 11.5 13 15 20.5 7.5"/><polyline points="15 7.5 20.5 7.5 20.5 13"/>',
flag:'<line x1="5" y1="21" x2="5" y2="4"/><path d="M5 4h12l-2.5 4L17 12H5"/>',
search:'<circle cx="11" cy="11" r="6.5"/><line x1="16" y1="16" x2="21" y2="21"/>',
link:'<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
layers:'<polygon points="12 3 21 8 12 13 3 8"/><polyline points="3 12.5 12 17.5 21 12.5"/><polyline points="3 17 12 22 21 17"/>',
target:'<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1"/>',
gauge:'<path d="M4 17a8 8 0 1 1 16 0"/><line x1="12" y1="17" x2="16" y2="11"/>',
lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
db:'<ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6"/><path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3"/>',
route:'<circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="6" r="2.5"/><path d="M8.5 18H15a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h6.5"/>',
rocket:'<path d="M12 3c3 2 5 5.5 5 9.5L14.5 15h-5L7 12.5C7 8.5 9 5 12 3z"/><circle cx="12" cy="9.5" r="1.6"/><path d="M9.5 15L8 19l2.5-1.2M14.5 15l1.5 4-2.5-1.2"/>',
hand:'<path d="M3 12l4-4 4 3 3-2 7 5"/><path d="M7 8l-4 4 6 6 3-2 3 2 3-3"/>',
spark:'<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18"/>',
eye:'<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>',
split:'<path d="M12 21V12"/><path d="M12 12L5 5"/><path d="M12 12l7-7"/><polyline points="5 9 5 5 9 5"/><polyline points="15 5 19 5 19 9"/>',
calendar:'<rect x="3.5" y="5" width="17" height="15" rx="2"/><line x1="3.5" y1="9.5" x2="20.5" y2="9.5"/><line x1="8" y1="3" x2="8" y2="6.5"/><line x1="16" y1="3" x2="16" y2="6.5"/>',
book:'<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 19V5"/><line x1="9" y1="8" x2="15" y2="8"/>',
pulse:'<path d="M3 12h4l2-5 4 10 2-5h6"/>',
coin:'<circle cx="12" cy="12" r="8.5"/><path d="M14.5 9.5c-.5-1-1.5-1.5-2.5-1.5-1.4 0-2.5.8-2.5 2s1.1 1.7 2.5 2 2.5.8 2.5 2-1.1 2-2.5 2c-1 0-2-.5-2.5-1.5"/><line x1="12" y1="6" x2="12" y2="8"/><line x1="12" y1="16" x2="12" y2="18"/>'
};
function icoSvg(n,d){return `<svg class="ico" viewBox="0 0 24 24" style="--d:${d||0}" aria-hidden="true">${ICONS[n]||ICONS.spark}</svg>`}
function fixPaths(root){(root||document).querySelectorAll(".ico *").forEach(p=>p.setAttribute("pathLength","1"))}
/* posição de um elemento relativa a um contêiner, em coordenadas de layout (sem escala do palco) */
function rel(el,box){let x=0,y=0,n=el;while(n&&n!==box){x+=n.offsetLeft;y+=n.offsetTop;n=n.offsetParent}return{x,y,w:el.offsetWidth,h:el.offsetHeight,cx:x+el.offsetWidth/2,cy:y+el.offsetHeight/2}}
/* um ícone fixo por produto: o mesmo na one-page, nos cards do pilar e na ficha */
const PICO={"1.1":"check","1.2":"route","1.3":"people","1.4":"layers","1.5":"coin","1.6":"contract","1.7":"ai",
 "2.1":"hand","2.2":"calendar","2.3":"gauge","2.4":"flag","2.5":"spark","2.6":"rocket",
 "3.1":"search","3.2":"split","3.3":"pulse","3.4":"chart","3.5":"target",
 "4.1":"graph","4.2":"doc","4.3":"cloud","4.4":"shield","4.5":"lock","4.6":"eye"};
const picoSvg=(code,d)=>icoSvg(PICO[code]||"spark",d);
