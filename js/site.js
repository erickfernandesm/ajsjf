/* ==========================================================================
   AJS: motor do site
   Monta cabeçalho/rodapé, controla o menu e desenha as listagens a partir
   do arquivo dados/conteudo.js.
   ========================================================================== */

/* --- Atalhos ------------------------------------------------------------ */
const $  = (s, ctx = document) => ctx.querySelector(s);
const $$ = (s, ctx = document) => [...ctx.querySelectorAll(s)];

const MESES = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
const MESES_LONGO = ["janeiro", "fevereiro", "março", "abril", "maio", "junho",
                     "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];

/* Datas vêm como "2025-06-21". Quebramos na mão para não sofrer com fuso. */
function partesData(iso) {
  if (!iso) return null;
  const [a, m, d] = String(iso).split("-").map(Number);
  if (!a || !m || !d) return null;
  return { ano: a, mes: m, dia: d, obj: new Date(a, m - 1, d) };
}
function dataCurta(iso) {
  const p = partesData(iso);
  return p ? `${String(p.dia).padStart(2, "0")} ${MESES[p.mes - 1]} ${p.ano}` : "";
}
function dataLonga(iso) {
  const p = partesData(iso);
  return p ? `${p.dia} de ${MESES_LONGO[p.mes - 1]} de ${p.ano}` : "";
}
function ehFuturo(iso) {
  const p = partesData(iso);
  if (!p) return false;
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  return p.obj >= hoje;
}
function escapar(t) {
  return String(t ?? "").replace(/[&<>"']/g, c => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
  ));
}
function selo(item) {
  return item && item.exemplo ? '<span class="selo-exemplo">Exemplo</span>' : "";
}
function param(nome) {
  return new URLSearchParams(location.search).get(nome);
}

/* --- Ícones ------------------------------------------------------------- */
const ICO = {
  seta: '<svg class="seta" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.14v14l11-7-11-7z"/></svg>',
  local: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  relogio: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  tag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.6 13.4 12 22l-9-9V3h10l7.6 7.6a2 2 0 0 1 0 2.8z"/><circle cx="7.5" cy="7.5" r="1.5" fill="currentColor"/></svg>',
  calendario: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 11h18"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none"/></svg>',
  email: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><rect x="2.5" y="4.5" width="19" height="15" rx="2.5"/><path d="m3 7 9 6 9-6"/></svg>',
  whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 1.67c2.2 0 4.27.86 5.83 2.42a8.2 8.2 0 0 1 2.41 5.82c0 4.54-3.7 8.24-8.25 8.24a8.23 8.23 0 0 1-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.26-8.24zm-2.6 4.1c-.2 0-.5.07-.77.36-.26.29-1 .98-1 2.39s1.03 2.77 1.17 2.96c.14.2 2 3.05 4.85 4.27.68.29 1.2.46 1.61.6.68.21 1.3.18 1.79.11.54-.08 1.68-.69 1.92-1.35.24-.66.24-1.23.17-1.35-.07-.12-.26-.19-.55-.33-.29-.15-1.68-.83-1.94-.92-.26-.1-.45-.15-.64.14-.19.29-.73.92-.9 1.11-.16.2-.33.22-.61.08-.29-.15-1.21-.45-2.3-1.42-.85-.76-1.42-1.69-1.59-1.98-.16-.29-.01-.44.13-.59.13-.13.29-.34.43-.51.15-.17.19-.29.29-.48.1-.2.05-.37-.02-.51-.07-.15-.64-1.55-.88-2.12-.23-.55-.46-.48-.64-.49h-.54z"/></svg>',
  info: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 7.6v.4"/></svg>',
  mais: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>'
};

/* --- Navegação ---------------------------------------------------------- */
const MENU = [
  { href: "index.html",           txt: "Início" },
  { href: "sobre.html",           txt: "A AJS" },
  { href: "skatistas.html",       txt: "Skatistas" },
  { href: "equipe.html",          txt: "Equipe" },
  { href: "campeonatos.html",     txt: "Campeonatos" },
  { href: "blog.html",            txt: "Blog" },
  { href: "contato.html",         txt: "Contato" }
];

/* páginas filhas herdam o destaque do menu do "pai" */
const PAI = {
  "post.html": "blog.html",
  "skatista.html": "skatistas.html",
  "membro.html": "equipe.html",
  "estatuto.html": "sobre.html"
};

function paginaAtual() {
  const arq = location.pathname.split("/").pop() || "index.html";
  return PAI[arq] || arq;
}

function montarTopo() {
  const atual = paginaAtual();
  const links = MENU.map(i =>
    `<a href="${i.href}"${i.href === atual ? ' class="ativo" aria-current="page"' : ""}>${i.txt}</a>`
  ).join("");

  const linksMobile = MENU.map(i =>
    `<a href="${i.href}"${i.href === atual ? ' class="ativo"' : ""}>${i.txt}</a>`
  ).join("");

  const topo = document.createElement("header");
  topo.className = "topo";
  topo.innerHTML = `
    <div class="wrap topo-interno">
      <a href="index.html" class="marca" aria-label="${escapar(SITE.nome)}, página inicial">
        <img src="assets/logo.jpg" alt="">
        <span class="marca-txt">
          <span class="marca-sigla">AJS</span>
          <span class="marca-nome">Juiz de Fora · MG</span>
        </span>
      </a>
      <nav class="nav" aria-label="Menu principal">${links}</nav>
      <div class="topo-acoes">
        <a class="btn btn-primario" data-zap="Olá! Quero me associar à AJS." href="contato.html">Associe-se</a>
        <button class="hamburguer" aria-label="Abrir menu" aria-expanded="false" aria-controls="menu-mobile">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>`;

  const gaveta = document.createElement("nav");
  gaveta.className = "menu-mobile";
  gaveta.id = "menu-mobile";
  gaveta.setAttribute("aria-label", "Menu");
  gaveta.innerHTML = `
    ${linksMobile}
    <div class="rodape-menu">
      <a class="btn btn-primario" data-zap="Olá! Quero me associar à AJS." href="contato.html">
        Associe-se à AJS ${ICO.seta}
      </a>
      <div class="contato-menu">
        <a href="${escapar(SITE.instagram)}" target="_blank" rel="noopener">
          ${ICO.instagram} ${escapar(SITE.instagramArroba)}
        </a>
        <a href="${linkZap("Olá! Vim pelo site da AJS.")}" target="_blank" rel="noopener">
          ${ICO.whatsapp} ${escapar(SITE.whatsappVisivel || "WhatsApp")}
        </a>
      </div>
    </div>`;

  document.body.prepend(gaveta);
  document.body.prepend(topo);

  /* abre/fecha */
  const btn = $(".hamburguer", topo);
  btn.addEventListener("click", () => {
    const aberto = document.body.classList.toggle("menu-aberto");
    btn.setAttribute("aria-expanded", String(aberto));
    btn.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
  });
  $$("a", gaveta).forEach(a => a.addEventListener("click", () => {
    document.body.classList.remove("menu-aberto");
    btn.setAttribute("aria-expanded", "false");
  }));
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && document.body.classList.contains("menu-aberto")) btn.click();
  });

  /* fundo sólido ao rolar */
  const marcarScroll = () => topo.classList.toggle("solido", window.scrollY > 24);
  marcarScroll();
  addEventListener("scroll", marcarScroll, { passive: true });
}

function montarRodape() {
  const zap = SITE.whatsapp
    ? `<a href="${linkZap("Olá! Vim pelo site da AJS.")}" target="_blank" rel="noopener">WhatsApp ${escapar(SITE.whatsappVisivel || "")}</a>`
    : "";

  const rodape = document.createElement("footer");
  rodape.className = "rodape";
  rodape.innerHTML = `
    <div class="wrap">
      <div class="rodape-grade">
        <div>
          <div class="rodape-marca">
            <img src="assets/logo.jpg" alt="">
            <span>
              <span class="nome">AJS</span>
              <span class="sub">Desde ${escapar(SITE.fundacao)}</span>
            </span>
          </div>
          <p>${escapar(SITE.nome)}, uma sociedade civil sem fins lucrativos que incentiva,
             divulga e promove a prática do skate em Juiz de Fora e região.</p>
          <div class="social">
            <a href="${escapar(SITE.instagram)}" target="_blank" rel="noopener" aria-label="Instagram da AJS">${ICO.instagram}</a>
            <a href="mailto:${escapar(SITE.email)}" aria-label="E-mail da AJS">${ICO.email}</a>
          </div>
        </div>
        <div>
          <h4>Navegue</h4>
          <div class="rodape-links">
            ${MENU.map(i => `<a href="${i.href}">${i.txt}</a>`).join("")}
          </div>
        </div>
        <div>
          <h4>A associação</h4>
          <div class="rodape-links">
            <a href="sobre.html">Nossa história</a>
            <a href="estatuto.html">Estatuto</a>
            <a href="sobre.html#objetivos">Objetivos</a>
            <a href="contato.html#associar">Como se associar</a>
          </div>
        </div>
        <div>
          <h4>Onde estamos</h4>
          <p>${escapar(SITE.endereco)}<br>${escapar(SITE.cidade)}</p>
          <div class="rodape-links mt-m">
            <a href="mailto:${escapar(SITE.email)}">${escapar(SITE.email)}</a>
            <a href="${escapar(SITE.instagram)}" target="_blank" rel="noopener">${escapar(SITE.instagramArroba)}</a>
            ${zap}
          </div>
        </div>
      </div>
      <div class="rodape-base">
        <span>© <span id="ano"></span> ${escapar(SITE.nome)}</span>
        <span>Skate não é crime · Juiz de Fora, MG</span>
      </div>
    </div>`;
  document.body.appendChild(rodape);
  $("#ano", rodape).textContent = new Date().getFullYear();
}

/* --- WhatsApp ----------------------------------------------------------- */
/* Todo botão com data-zap="mensagem" vira um link direto para o WhatsApp
   da AJS, já com o texto escrito. O número fica em dados/conteudo.js. */
function linkZap(mensagem) {
  const texto = encodeURIComponent(mensagem || "Olá! Vim pelo site da AJS.");
  return SITE.whatsapp
    ? `https://wa.me/${SITE.whatsapp}?text=${texto}`
    : `mailto:${SITE.email}?body=${texto}`;
}

function aplicarZap(ctx = document) {
  $$("[data-zap]", ctx).forEach(a => {
    a.href = linkZap(a.dataset.zap);
    a.target = "_blank";
    a.rel = "noopener";
  });
}

/* --- Tela de carregamento ----------------------------------------------- */
function esconderCarregando() {
  const tela = document.getElementById("carregando");
  if (!tela || tela.classList.contains("sumindo")) return;
  tela.classList.add("sumindo");
  setTimeout(() => tela.remove(), 600);
}
/* sai quando tudo carregar, com um tempo mínimo para a rodinha girar */
let prontoEm = Date.now() + 550;
addEventListener("load", () => setTimeout(esconderCarregando, Math.max(0, prontoEm - Date.now())));
/* rede lenta ou imagem que não carrega não podem travar o site */
setTimeout(esconderCarregando, 4000);

/* --- Animação de entrada ------------------------------------------------ */
function iniciarReveal() {
  const alvos = $$(".reveal");
  if (!alvos.length) return;
  if (!("IntersectionObserver" in window)) {
    alvos.forEach(a => a.classList.add("visivel"));
    return;
  }
  const obs = new IntersectionObserver((entradas) => {
    entradas.forEach((e, i) => {
      if (!e.isIntersecting) return;
      setTimeout(() => e.target.classList.add("visivel"), Math.min(i * 70, 350));
      obs.unobserve(e.target);
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -40px" });
  alvos.forEach(a => obs.observe(a));
}

/* --- Sanfona (estatuto / perguntas) ------------------------------------- */
function iniciarSanfona() {
  $$(".sanfona-btn").forEach(btn => {
    const item = btn.closest(".sanfona-item");
    btn.setAttribute("aria-expanded", "false");
    btn.addEventListener("click", () => {
      const abrir = !item.classList.contains("aberto");
      item.classList.toggle("aberto", abrir);
      btn.setAttribute("aria-expanded", String(abrir));
    });
  });
}

/* --- Faixa rolante ------------------------------------------------------ */
function iniciarFaixa() {
  $$(".faixa-trilho").forEach(trilho => {
    trilho.innerHTML += trilho.innerHTML;   // duplica para o loop ficar contínuo
  });
}

/* ==========================================================================
   COMPONENTES DE CONTEÚDO
   ========================================================================== */

/* imagem ou placeholder com a inicial do nome */
function midia(src, alt, nomeParaInicial) {
  if (src) return `<img src="${escapar(src)}" alt="${escapar(alt)}" loading="lazy">`;
  const inicial = (nomeParaInicial || "?").trim().charAt(0);
  return `<div class="inicial" aria-hidden="true">${escapar(inicial)}</div>`;
}

function videosDe(s) {
  return (s.videos || []).filter(v => v && (v.id || v.titulo));
}
function videosProntos(s) {
  return videosDe(s).filter(v => v.id);
}

function cardPessoa(s, pagina) {
  const ehEquipe = !!s.cargo;
  const total = ehEquipe ? (s.fotos || []).length : videosProntos(s).length;
  const rotulo = ehEquipe
    ? (total > 1 ? `${total} fotos` : total === 1 ? "1 foto" : "Fotos em breve")
    : (total > 1 ? `${total} vídeos` : total === 1 ? "1 vídeo" : "Vídeos em breve");
  const prontos = total;
  const legenda = s.cargo
    ? escapar(s.cargo)
    : `${escapar(s.modalidade || "Skate")}${s.bairro ? " · " + escapar(s.bairro) : ""}`;
  return `
    <a class="card card-skatista reveal" href="${pagina}?id=${encodeURIComponent(s.id)}">
      <div class="card-midia">
        ${midia(s.foto, s.nome, s.nome)}
        <div class="faixa-video">
          <div class="nome">${escapar(s.nome)}</div>
          <div class="sub">${legenda}</div>
        </div>
        <span class="play${prontos ? "" : " sem-video"}" aria-hidden="true">${ICO.play}</span>
      </div>
      <div class="card-corpo">
        <div class="card-meta">
          <span>${rotulo}</span>
          ${selo(s)}
        </div>
        <p>${escapar(s.resumo || "")}</p>
        <div class="card-rodape"><span class="link-seta">Ver perfil</span></div>
      </div>
    </a>`;
}

const cardSkatista = s => cardPessoa(s, "skatista.html");
const cardMembro   = s => cardPessoa(s, "membro.html");

function linhaSkatista(s, i) {
  return `
    <a class="linha-nome reveal" href="skatista.html?id=${encodeURIComponent(s.id)}">
      <span class="idx">${String(i + 1).padStart(2, "0")}</span>
      <span>
        <span class="nome">${escapar(s.nome)}</span>
        ${s.apelido ? `<span class="mono" style="margin-left:10px;color:var(--texto-suave)">"${escapar(s.apelido)}"</span>` : ""}
        ${selo(s)}
      </span>
      <span class="tag modalidade-col">${escapar(s.modalidade || "Skate")}</span>
      <span class="seta-linha">${ICO.seta}</span>
    </a>`;
}

function cardPost(p, destaque = false) {
  const capa = `<div class="card-midia">${midia(p.capa, p.titulo, p.titulo)}</div>`;
  return `
    <a class="card reveal${destaque ? " post-destaque" : ""}" href="post.html?post=${encodeURIComponent(p.slug)}">
      ${capa}
      <div class="card-corpo">
        <div class="card-meta">
          <span class="tag">${escapar(p.categoria || "Notícias")}</span>
          <span>${dataCurta(p.data)}</span>
          ${selo(p)}
        </div>
        <h3>${escapar(p.titulo)}</h3>
        <p>${escapar(p.resumo || "")}</p>
        <div class="card-rodape"><span class="link-seta">Ler matéria</span></div>
      </div>
    </a>`;
}

function statusEvento(c) {
  if (c.status === "realizado") return '<span class="tag tag-cinza">Realizado</span>';
  if (c.status === "inscricoes") return '<span class="tag tag-verde">Inscrições abertas</span>';
  return '<span class="tag tag-cheia">Data confirmada</span>';
}

function cardEvento(c) {
  const p = partesData(c.data);
  const passado = c.status === "realizado";
  const podio = (c.resultados && c.resultados.length)
    ? `<div class="podio">${c.resultados.map(r => `
        <div class="podio-linha">
          <span class="pos">${escapar(r.categoria)}</span>
          <span>${r.podio.map(escapar).join(" &nbsp;·&nbsp; ")}</span>
        </div>`).join("")}</div>`
    : "";

  const acao = passado ? "" : `
    <div class="evento-acao">
      ${c.inscricaoLink
        ? `<a class="btn btn-primario" href="${escapar(c.inscricaoLink)}" target="_blank" rel="noopener">Inscrever-se ${ICO.seta}</a>`
        : `<a class="btn btn-fantasma" data-zap="Olá! Quero saber mais sobre o campeonato: ${c.nome}." href="contato.html">Saber mais ${ICO.seta}</a>`}
    </div>`;

  return `
    <article class="card-evento reveal${passado ? " passado" : ""}">
      <div class="data-bloco">
        <span class="dia">${p ? String(p.dia).padStart(2, "0") : "--"}</span>
        <span class="mes">${p ? MESES[p.mes - 1] : ""}</span>
        <span class="ano">${p ? p.ano : ""}</span>
      </div>
      <div>
        <div class="card-meta" style="margin-bottom:12px">
          ${statusEvento(c)}
          ${c.etapa ? `<span>${escapar(c.etapa)}</span>` : ""}
          ${selo(c)}
        </div>
        <h3>${escapar(c.nome)}</h3>
        <div class="evento-info">
          ${c.local ? `<span>${ICO.local} ${escapar(c.local)}${c.endereco ? ", " + escapar(c.endereco) : ""}</span>` : ""}
          ${c.horario ? `<span>${ICO.relogio} ${escapar(c.horario)}</span>` : ""}
          ${c.modalidade ? `<span>${ICO.tag} ${escapar(c.modalidade)}</span>` : ""}
        </div>
        ${c.resumo ? `<p style="margin-top:14px;color:var(--texto-suave);font-size:.95rem">${escapar(c.resumo)}</p>` : ""}
        ${c.categorias && c.categorias.length
          ? `<div class="filtros" style="margin:16px 0 0">${c.categorias.map(x => `<span class="tag">${escapar(x)}</span>`).join("")}</div>`
          : ""}
        ${!passado && c.inscricaoAte
          ? `<p class="mono" style="margin-top:14px;color:var(--coral)">Inscrições até ${dataCurta(c.inscricaoAte)}${c.inscricaoValor ? " · " + escapar(c.inscricaoValor) : ""}</p>`
          : ""}
        ${podio}
      </div>
      ${acao}
    </article>`;
}

function vazio(titulo, texto) {
  return `<div class="vazio"><h3>${escapar(titulo)}</h3><p>${escapar(texto)}</p></div>`;
}

/* ==========================================================================
   PÁGINAS
   ========================================================================== */

function paginaInicio() {
  const posts = [...POSTS].sort((a, b) => (b.data || "").localeCompare(a.data || ""));
  const alvoPosts = $("#home-posts");
  if (alvoPosts) {
    alvoPosts.innerHTML = posts.slice(0, 3).map(p => cardPost(p)).join("")
      || vazio("Nada publicado ainda", "As novidades da AJS aparecem aqui.");
  }

  const alvoSk = $("#home-skatistas");
  if (alvoSk) {
    alvoSk.innerHTML = SKATISTAS.slice(0, 4).map(cardSkatista).join("")
      || vazio("Nenhuma vídeo parte ainda", "Em breve as vídeo partes dos skatistas de Juiz de Fora.");
  }

  const alvoCamp = $("#home-campeonatos");
  if (alvoCamp) {
    const proximos = CAMPEONATOS
      .filter(c => c.status !== "realizado")
      .sort((a, b) => (a.data || "").localeCompare(b.data || ""));
    alvoCamp.innerHTML = proximos.slice(0, 2).map(cardEvento).join("")
      || vazio("Sem campeonatos marcados", "Assim que a próxima etapa for confirmada, ela aparece aqui.");
  }
}

function paginaSkatistas() {
  const grade = $("#lista-skatistas");
  const indice = $("#indice-skatistas");
  const contador = $("#contador-skatistas");

  if (!SKATISTAS.length) {
    if (grade) grade.outerHTML = vazio("Nenhum skatista cadastrado",
      "Adicione os skatistas no arquivo dados/conteudo.js para eles aparecerem aqui.");
    return;
  }

  if (grade) grade.innerHTML = SKATISTAS.map(cardSkatista).join("");
  if (indice) indice.innerHTML = SKATISTAS.map(linhaSkatista).join("");
  if (contador) contador.textContent = String(SKATISTAS.length).padStart(2, "0");

  /* filtro por modalidade */
  const barra = $("#filtros-modalidade");
  if (!barra) return;
  const modalidades = [...new Set(SKATISTAS.map(s => s.modalidade).filter(Boolean))];
  barra.innerHTML = `<button class="filtro ativo" data-f="todos">Todos</button>` +
    modalidades.map(m => `<button class="filtro" data-f="${escapar(m)}">${escapar(m)}</button>`).join("");

  barra.addEventListener("click", e => {
    const btn = e.target.closest(".filtro");
    if (!btn) return;
    $$(".filtro", barra).forEach(b => b.classList.toggle("ativo", b === btn));
    const f = btn.dataset.f;
    const lista = f === "todos" ? SKATISTAS : SKATISTAS.filter(s => s.modalidade === f);
    grade.innerHTML = lista.map(cardSkatista).join("")
      || vazio("Nada nesta modalidade", "Escolha outro filtro.");
    if (indice) indice.innerHTML = lista.map(linhaSkatista).join("");
    $$(".reveal", grade).forEach(el => el.classList.add("visivel"));
    if (indice) $$(".reveal", indice).forEach(el => el.classList.add("visivel"));
  });
}

function perfilPessoa(lista, opcoes) {
  const id = param("id");
  const s = lista.find(x => x.id === id) || lista[0];
  const alvo = $("#perfil");
  if (!alvo) return;

  if (!s) {
    alvo.innerHTML = vazio("Perfil não encontrado", opcoes.vazio);
    return;
  }

  document.title = `${s.nome} | ${opcoes.tituloAba}`;
  const tituloTopo = $("#perfil-titulo");
  if (tituloTopo) tituloTopo.textContent = s.nome;

  const subTopo = $("#perfil-sub");
  if (subTopo) {
    const linha = s.cargo
      ? `${escapar(s.cargo)}${s.desde ? " · na AJS desde " + escapar(s.desde) : ""}`
      : `${escapar(s.modalidade || "Skate")}${s.bairro ? " · " + escapar(s.bairro) : ""}`;
    subTopo.innerHTML = `${linha} ${selo(s)}`;
  }

  alvo.innerHTML = `
    <div class="perfil-topo">
      <div class="perfil-foto reveal">
        ${midia(s.fotoGrande || s.foto, s.nome, s.nome)}
      </div>

      <div class="reveal">
        <h2 class="titulo-secao" style="font-size:clamp(1.7rem,3.6vw,2.6rem)">
          ${escapar(s.apelido ? `${s.nome} "${s.apelido}"` : s.nome)}
        </h2>
        <div class="texto-longo mt-m" style="color:var(--texto-suave)">${s.bio || "<p>Texto em breve.</p>"}</div>
        ${s.instagram ? `<a class="btn btn-fantasma mt-g" href="${escapar(s.instagram)}" target="_blank" rel="noopener">Instagram ${ICO.seta}</a>` : ""}
      </div>
    </div>`;

  if (s.cargo) montarGaleria(s); else montarVideos(s);
}

/* galeria de fotos da equipe */
function montarGaleria(s) {
  const caixa = $("#perfil-fotos");
  if (!caixa) return;

  const fotos = (s.fotos || []).filter(Boolean);
  if (!fotos.length) {
    caixa.innerHTML = `
      <div class="player reveal">
        <div class="player-vazio">
          <strong>Fotos em breve</strong>
          <p>As fotos de ${escapar(s.nome)} ainda não foram publicadas.</p>
        </div>
      </div>`;
    return;
  }

  caixa.innerHTML = `
    <div class="galeria">
      ${fotos.map((f, i) => `
        <button class="galeria-item reveal" data-foto="${escapar(f)}" aria-label="Ampliar foto ${i + 1}">
          <img src="${escapar(f)}" alt="${escapar(s.nome)}, foto ${i + 1}" loading="lazy">
        </button>`).join("")}
    </div>`;

  caixa.addEventListener("click", e => {
    const item = e.target.closest(".galeria-item");
    if (item) abrirFoto(item.dataset.foto);
  });
}

/* visualizador de foto ampliada */
function abrirFoto(src) {
  const lupa = document.createElement("div");
  lupa.className = "lupa";
  lupa.innerHTML = `
    <button class="lupa-fechar" aria-label="Fechar">&times;</button>
    <img src="${escapar(src)}" alt="">`;
  document.body.appendChild(lupa);
  requestAnimationFrame(() => lupa.classList.add("aberta"));

  const fechar = () => {
    lupa.classList.remove("aberta");
    setTimeout(() => lupa.remove(), 300);
    document.removeEventListener("keydown", aoTeclar);
  };
  const aoTeclar = e => { if (e.key === "Escape") fechar(); };

  lupa.addEventListener("click", fechar);
  document.addEventListener("keydown", aoTeclar);
}

/* galeria de vídeos do perfil */
function montarVideos(s) {
  const caixa = $("#perfil-videos");
  if (!caixa) return;

  const prontos = videosProntos(s);
  const previstos = videosDe(s);

  if (!prontos.length) {
    caixa.innerHTML = `
      <div class="player reveal">
        <div class="player-vazio">
          <strong>Vídeos em breve</strong>
          <p>Os vídeos de ${escapar(s.nome)} ainda não foram publicados.${previstos.length ? " Já estão previstos: " + previstos.map(v => escapar(v.titulo)).join(", ") + "." : ""}</p>
        </div>
      </div>`;
    return;
  }

  const chips = prontos.length > 1
    ? `<div class="filtros" id="chips-video">
         ${prontos.map((v, i) => `
           <button class="filtro${i === 0 ? " ativo" : ""}" data-v="${escapar(v.id)}" data-t="${escapar(v.titulo || "Vídeo")}">
             ${escapar(v.titulo || "Vídeo")}${v.ano ? " · " + escapar(v.ano) : ""}
           </button>`).join("")}
       </div>`
    : "";

  const primeiro = prontos[0];
  caixa.innerHTML = `
    ${chips}
    <div class="player reveal">
      <iframe id="player-video"
        src="https://www.youtube-nocookie.com/embed/${escapar(primeiro.id)}?rel=0"
        title="${escapar(primeiro.titulo || ("Vídeo de " + s.nome))}"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen loading="lazy"></iframe>
    </div>
    <p class="legenda-video" id="legenda-video">
      ${escapar(primeiro.titulo || "Vídeo")}${primeiro.ano ? " · " + escapar(primeiro.ano) : ""}
    </p>`;

  const barra = $("#chips-video");
  if (!barra) return;
  barra.addEventListener("click", e => {
    const btn = e.target.closest(".filtro");
    if (!btn) return;
    $$(".filtro", barra).forEach(b => b.classList.toggle("ativo", b === btn));
    const frame = $("#player-video");
    frame.src = `https://www.youtube-nocookie.com/embed/${btn.dataset.v}?rel=0&autoplay=1`;
    frame.title = btn.dataset.t;
    const legenda = $("#legenda-video");
    if (legenda) legenda.textContent = btn.textContent.trim();
  });
}

function paginaSkatista() {
  perfilPessoa(SKATISTAS, { tituloAba: "Skatistas da AJS", vazio: "Volte para a lista de skatistas." });
}

function paginaMembro() {
  perfilPessoa(EQUIPE, { tituloAba: "Equipe da AJS", vazio: "Volte para a página da equipe." });
}

function paginaEquipe() {
  const grade = $("#lista-equipe");
  if (!grade) return;
  grade.innerHTML = EQUIPE.length
    ? EQUIPE.map(cardMembro).join("")
    : vazio("Equipe ainda não cadastrada", "Adicione as pessoas no arquivo dados/conteudo.js.");
}

function outrosPerfis(fonte, card) {
  const outros = $("#outros-skatistas");
  if (!outros) return;
  const atual = param("id");
  const lista = fonte.filter(x => x.id !== atual).slice(0, 4);
  outros.innerHTML = lista.map(card).join("");
  if (!lista.length) outros.closest("section").classList.add("esconde");
}

function paginaBlog() {
  const grade = $("#lista-posts");
  const destaqueAlvo = $("#post-destaque");
  if (!grade) return;

  const posts = [...POSTS].sort((a, b) => (b.data || "").localeCompare(a.data || ""));
  if (!posts.length) {
    grade.innerHTML = vazio("Nenhum post publicado", "Adicione posts em dados/conteudo.js.");
    return;
  }

  const [primeiro, ...resto] = posts;
  if (destaqueAlvo) destaqueAlvo.innerHTML = cardPost(primeiro, true);
  const demais = destaqueAlvo ? resto : posts;

  const desenhar = lista => {
    grade.innerHTML = lista.length
      ? lista.map(p => cardPost(p)).join("")
      : vazio("Nada nesta categoria", "Escolha outra categoria.");
    $$(".reveal", grade).forEach(el => el.classList.add("visivel"));
  };
  desenhar(demais);

  const barra = $("#filtros-categoria");
  if (!barra) return;
  const cats = [...new Set(posts.map(p => p.categoria).filter(Boolean))];
  barra.innerHTML = `<button class="filtro ativo" data-f="todos">Tudo</button>` +
    cats.map(c => `<button class="filtro" data-f="${escapar(c)}">${escapar(c)}</button>`).join("");
  barra.addEventListener("click", e => {
    const btn = e.target.closest(".filtro");
    if (!btn) return;
    $$(".filtro", barra).forEach(b => b.classList.toggle("ativo", b === btn));
    const f = btn.dataset.f;
    desenhar(f === "todos" ? demais : posts.filter(p => p.categoria === f));
  });
}

function paginaPost() {
  const slug = param("post");
  const p = POSTS.find(x => x.slug === slug);
  const alvo = $("#post");
  if (!alvo) return;

  if (!p) {
    alvo.innerHTML = vazio("Post não encontrado", "Ele pode ter sido removido. Veja os outros no blog.");
    return;
  }

  document.title = `${p.titulo} | Blog AJS`;
  const t = $("#post-titulo"); if (t) t.textContent = p.titulo;
  const m = $("#post-meta");
  if (m) m.innerHTML = `<span class="tag">${escapar(p.categoria || "Notícias")}</span>
                        <span>${dataLonga(p.data)}</span>
                        <span>· por ${escapar(p.autor || "AJS")}</span> ${selo(p)}`;

  alvo.innerHTML = `
    ${p.capa ? `<div class="moldura reveal" style="aspect-ratio:16/8;margin-bottom:clamp(30px,5vw,56px)">
                  <img src="${escapar(p.capa)}" alt="${escapar(p.titulo)}"></div>` : ""}
    <div class="artigo reveal">
      ${p.resumo ? `<p class="lead" style="margin-bottom:1.8em">${escapar(p.resumo)}</p>` : ""}
      ${p.conteudo || ""}
    </div>`;

  const relacionados = $("#post-relacionados");
  if (relacionados) {
    const lista = POSTS.filter(x => x.slug !== p.slug)
      .sort((a, b) => (b.data || "").localeCompare(a.data || "")).slice(0, 3);
    relacionados.innerHTML = lista.map(x => cardPost(x)).join("");
    if (!lista.length) relacionados.closest("section")?.classList.add("esconde");
  }
}

function paginaCampeonatos() {
  const prox = $("#lista-proximos");
  const hist = $("#lista-realizados");

  if (prox) {
    const lista = CAMPEONATOS.filter(c => c.status !== "realizado")
      .sort((a, b) => (a.data || "").localeCompare(b.data || ""));
    prox.innerHTML = lista.map(cardEvento).join("")
      || vazio("Nenhum campeonato marcado no momento",
               "Assim que a AJS confirmar a próxima etapa, ela é publicada aqui e no Instagram.");
  }
  if (hist) {
    const lista = CAMPEONATOS.filter(c => c.status === "realizado")
      .sort((a, b) => (b.data || "").localeCompare(a.data || ""));
    hist.innerHTML = lista.map(cardEvento).join("")
      || vazio("Sem edições anteriores registradas", "O histórico dos campeonatos aparece aqui.");
  }
}

function paginaSobre() {
  const alvo = $("#lista-pistas");
  if (!alvo) return;
  if (!PISTAS || !PISTAS.length) {
    alvo.closest("section")?.classList.add("esconde");
    return;
  }
  alvo.innerHTML = PISTAS.map(p => `
    <article class="card reveal">
      <div class="card-corpo">
        <div class="card-meta">${selo(p)}</div>
        <h3>${escapar(p.nome)}</h3>
        <p class="mono" style="color:var(--coral)">${escapar(p.bairro || "")}</p>
        <p>${escapar(p.descricao || "")}</p>
        ${p.mapa ? `<div class="card-rodape"><a class="btn btn-fantasma" href="${escapar(p.mapa)}" target="_blank" rel="noopener">Ver no mapa ${ICO.seta}</a></div>` : ""}
      </div>
    </article>`).join("");
}

function paginaContato() {
  const insta = $("#link-instagram");
  if (insta) insta.href = SITE.instagram;

  const canais = $("#canais");
  if (!canais) return;

  const itens = [
    {
      titulo: "WhatsApp",
      texto: "O caminho mais rápido. Respondemos dúvidas sobre campeonatos, escolinha, associação e parcerias.",
      valor: SITE.whatsappVisivel || "Chamar no WhatsApp",
      href: linkZap("Olá! Vim pelo site da AJS."),
      externo: true
    },
    {
      titulo: "Instagram",
      texto: "É por lá que anunciamos ponto de encontro dos rolês, datas de campeonato e as novidades do dia a dia.",
      valor: SITE.instagramArroba,
      href: SITE.instagram,
      externo: true
    },
    {
      titulo: "Onde estamos",
      texto: SITE.enderecoDetalhe,
      valor: SITE.endereco,
      href: "",
      externo: false
    }
  ];

  canais.innerHTML = itens.map(i => {
    const corpo = `
      <div class="card-corpo">
        <h3>${escapar(i.titulo)}</h3>
        <p>${escapar(i.texto)}</p>
        <div class="card-rodape">
          <span class="link-seta">${escapar(i.valor)}</span>
        </div>
      </div>`;
    return i.href
      ? `<a class="card reveal" href="${escapar(i.href)}"${i.externo ? ' target="_blank" rel="noopener"' : ""}>${corpo}</a>`
      : `<article class="card reveal">${corpo}</article>`;
  }).join("");
}

/* ==========================================================================
   INÍCIO
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  montarTopo();

  const rotas = {
    inicio: paginaInicio,
    skatistas: paginaSkatistas,
    skatista: () => { paginaSkatista(); outrosPerfis(SKATISTAS, cardSkatista); },
    equipe: paginaEquipe,
    membro: () => { paginaMembro(); outrosPerfis(EQUIPE, cardMembro); },
    blog: paginaBlog,
    post: paginaPost,
    campeonatos: paginaCampeonatos,
    sobre: paginaSobre,
    contato: paginaContato
  };
  const rota = rotas[document.body.dataset.pagina];
  if (rota) {
    try { rota(); } catch (err) { console.error("Erro ao montar a página:", err); }
  }

  montarRodape();
  aplicarZap();
  iniciarSanfona();
  iniciarFaixa();
  iniciarReveal();
});
