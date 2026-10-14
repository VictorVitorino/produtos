/* ------------------------------------------------------------- início --- */
(function boot() {
  const run = () => {
    Cover.init();
    buildProcessPool();
    buildChaos();
    buildWaterfall();
    buildPattern();
    buildSystemPool();
    buildZones();
    buildMoney();
    buildGantt();
    buildField();
    buildRaci();
    buildCase();
    buildMeasure();
    buildInvest();
    buildRisk();
    buildAssumptions();
    buildDecision();
    Deck.init();
  };
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(run); else run();
})();
