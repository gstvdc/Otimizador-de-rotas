let grafo = [],
  pacotes = [],
  numVertices = 6,
  INF = 999999;

function gerarGrafo() {
  numVertices = parseInt(document.getElementById("numVertices").value) || 6;
  grafo = [];
  for (let i = 0; i < numVertices; i++) {
    grafo[i] = [];
    for (let j = 0; j < numVertices; j++) {
      if (i === j) grafo[i][j] = 0;
      else if (Math.random() < 0.6)
        grafo[i][j] = Math.floor(Math.random() * 20) + 1;
      else grafo[i][j] = INF;
    }
  }
  for (let i = 0; i < numVertices; i++)
    for (let j = i + 1; j < numVertices; j++) grafo[j][i] = grafo[i][j];
  renderizarMatrizGrafo();
}

function renderizarMatrizGrafo() {
  const c = document.getElementById("grafoMatrix");
  let h = `<div style="grid-template-columns: repeat(${
    numVertices + 1
  }, minmax(40px, 1fr))" class="grid gap-2">`;
  h += "<div></div>";
  for (let j = 0; j < numVertices; j++)
    h += `<div class="font-bold text-center text-sm">V${j}</div>`;
  for (let i = 0; i < numVertices; i++) {
    h += `<div class="font-bold text-center text-sm">V${i}</div>`;
    for (let j = 0; j < numVertices; j++) {
      const v = grafo[i][j];
      if (i === j) h += `<div class="text-center font-bold text-sm">0</div>`;
      else
        h += `<input type="number" value="${
          v === INF ? 99 : v
        }" onchange="atualizarGrafo(${i}, ${j}, this.value)" class="w-full px-1 py-1 border border-gray-300 rounded text-xs text-center">`;
    }
  }
  h += "</div>";
  c.innerHTML = h;
}

function atualizarGrafo(i, j, v) {
  grafo[i][j] = grafo[j][i] = parseInt(v);
  renderizarMatrizGrafo();
}

function adicionarPacote() {
  const p = parseInt(document.getElementById("pacPeso").value) || 0;
  const v = parseInt(document.getElementById("pacValor").value) || 0;
  const pz = parseInt(document.getElementById("pacPrazo").value) || 0;
  const d = parseInt(document.getElementById("pacDestino").value) || 0;
  if (p <= 0 || v <= 0 || pz <= 0 || d >= numVertices)
    return alert("Valores inválidos!");
  pacotes.push({ peso: p, valor: v, prazo: pz, destino: d });
  renderizarPacotes();
  document.getElementById("pacPeso").value =
    document.getElementById("pacValor").value =
    document.getElementById("pacPrazo").value =
    document.getElementById("pacDestino").value =
      "";
}

function removerPacote(i) {
  pacotes.splice(i, 1);
  renderizarPacotes();
}

function renderizarPacotes() {
  const t = document.getElementById("pacotesBody");
  t.innerHTML = pacotes
    .map(
      (p, i) =>
        `<tr class="hover:bg-gray-100"><td class="px-3 py-2 text-center">${
          i + 1
        }</td><td class="px-3 py-2 text-center">${
          p.peso
        }</td><td class="px-3 py-2 text-center">${
          p.valor
        }</td><td class="px-3 py-2 text-center">${
          p.prazo
        }</td><td class="px-3 py-2 text-center">V${
          p.destino
        }</td><td class="px-3 py-2 text-center"><button onclick="removerPacote(${i})" class="px-2 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700">X</button></td></tr>`
    )
    .join("");
}

function dijkstra(o, d) {
  const dist = new Array(numVertices).fill(INF),
    vis = new Array(numVertices).fill(false);
  dist[o] = 0;
  for (let i = 0; i < numVertices; i++) {
    let u = -1,
      m = INF;
    for (let j = 0; j < numVertices; j++)
      if (!vis[j] && dist[j] < m) {
        m = dist[j];
        u = j;
      }
    if (u === -1) break;
    vis[u] = true;
    for (let v = 0; v < numVertices; v++)
      if (!vis[v] && grafo[u][v] !== INF && dist[u] + grafo[u][v] < dist[v])
        dist[v] = dist[u] + grafo[u][v];
  }
  return dist[d];
}

function resolverMochila(it, cap) {
  const n = it.length,
    dp = Array(n + 1)
      .fill(null)
      .map(() => Array(cap + 1).fill(0));
  for (let i = 1; i <= n; i++)
    for (let w = 0; w <= cap; w++)
      dp[i][w] =
        it[i - 1].peso <= w
          ? Math.max(
              it[i - 1].valor + dp[i - 1][w - it[i - 1].peso],
              dp[i - 1][w]
            )
          : dp[i - 1][w];
  const sel = [];
  for (let i = n, w = cap; i > 0; i--)
    if (dp[i][w] !== dp[i - 1][w]) {
      sel.push(i - 1);
      w -= it[i - 1].peso;
    }
  return { valorTotal: dp[n][cap], selecionados: sel.reverse() };
}

function ordenarPorPrazo(it) {
  return it.sort((a, b) => a.prazo - b.prazo);
}

function executarAlgoritmos() {
  if (!pacotes.length) return alert("Adicione pacotes!");
  const cap = parseInt(document.getElementById("capacidade").value) || 10;
  const dep = parseInt(document.getElementById("deposito").value) || 0;
  const m = resolverMochila(pacotes, cap),
    esc = m.selecionados.map((i) => pacotes[i]);
  document.getElementById("resultado1").innerHTML =
    `<strong>Valor Total: ${m.valorTotal}</strong><div class="ml-4 mt-2">` +
    esc
      .map(
        (p, i) =>
          `P${i + 1}: w=${p.peso} v=${p.valor} pz=${p.prazo} d=V${p.destino}`
      )
      .join("<br>") +
    "</div>";
  const ord = ordenarPorPrazo([...esc]);
  document.getElementById("resultado2").innerHTML =
    `<div class="ml-4">` +
    ord.map((p, i) => `${i + 1}. V${p.destino} (${p.prazo}d)`).join("<br>") +
    "</div>";
  let h3 = "",
    tot = 0,
    pos = dep;
  ord.forEach((p, i) => {
    const c = dijkstra(pos, p.destino);
    tot += c;
    h3 += `${i + 1}. V${pos}→V${p.destino}: ${c === INF ? "✗" : c + "km"}<br>`;
    pos = p.destino;
  });
  document.getElementById("resultado3").innerHTML =
    h3 +
    `<div class="font-bold mt-2 text-lg">Total: ${
      tot === INF ? "✗" : tot + " km"
    }</div>`;
  document.getElementById("resultadosSection").style.display = "block";
  document
    .getElementById("resultadosSection")
    .scrollIntoView({ behavior: "smooth" });
}

window.addEventListener("load", gerarGrafo);
