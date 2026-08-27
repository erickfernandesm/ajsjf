/* ==========================================================================
   AJS, ARQUIVO DE CONTEÚDO DO SITE
   --------------------------------------------------------------------------
   Este é o ÚNICO arquivo que você precisa editar para atualizar o site.
   Não é preciso saber programar: basta seguir os modelos abaixo, mantendo
   sempre as vírgulas, as chaves { } e as aspas " " no lugar.

   Itens marcados com   exemplo: true   aparecem no site com a etiqueta
   "EXEMPLO". Apague essa linha quando colocar o conteúdo de verdade.

   Depois de editar, salve o arquivo e recarregue a página no navegador.
   ========================================================================== */


/* --------------------------------------------------------------------------
   1. DADOS GERAIS DA ASSOCIAÇÃO
   -------------------------------------------------------------------------- */
const SITE = {
  nome: "Associação Juizforana de Skate",
  sigla: "AJS",
  cidade: "Juiz de Fora, MG",
  fundacao: "1999",
  instagram: "https://www.instagram.com/ajsjuizdefora/",
  instagramArroba: "@ajsjuizdefora",
  email: "contato@ajsjuizdefora.com.br",   // troque pelo e-mail oficial
  // Número de WhatsApp que recebe TODAS as mensagens do site.
  // Formato: 55 + DDD + número, só dígitos.
  whatsapp: "553299567825",
  whatsappVisivel: "(32) 9956-7825",
  endereco: "Praça Teotônio Vilella, Bairro Vitorino Braga",
  enderecoDetalhe: "Sede junto à Associação de Moradores do bairro Vitorino Braga, Juiz de Fora/MG."
};


/* --------------------------------------------------------------------------
   2. SKATISTAS ASSOCIADOS E SUAS VÍDEO PARTES
   --------------------------------------------------------------------------
   Para adicionar um skatista, copie um bloco { ... } inteiro, cole logo
   abaixo e troque as informações.

   id     -> nome curto, sem espaço e sem acento (vira o link da página)
   foto   -> foto do rosto que aparece no card, ex.:
             "assets/skatistas/joao.png"  (PNG recortado fica ótimo)
             Deixe "" para o site gerar um card com a inicial do nome.
   videos -> lista de vídeos do skatista. O campo "id" é só o CÓDIGO do
             vídeo do YouTube. Ex.: em
             https://www.youtube.com/watch?v=dQw4w9WgXcQ
             o código é   dQw4w9WgXcQ
             Deixe id: "" enquanto o vídeo não estiver pronto, ou apague
             a lista inteira ( videos: [] ) se ainda não houver nenhum.
   bio    -> descrição do skatista em HTML: use <p> para cada parágrafo.
   -------------------------------------------------------------------------- */
const SKATISTAS = [
  {
    id: "skatista-1",
    nome: "Nome do Skatista",
    apelido: "Apelido",
    bairro: "Bairro / pista de origem",
    modalidade: "Street",         // Street, Vertical, Bowl, Mini Rampa, Downhill...
    desde: "2010",

    // foto do rosto que aparece no card da listagem (PNG ou JPG)
    foto: "assets/skatistas/skatista-1.png",
    // foto maior usada na página do skatista (se vazio, usa a de cima)
    fotoGrande: "",

    resumo: "Uma frase curta que aparece no card da listagem, resumindo o estilo do skatista.",
    bio: "<p>Escreva aqui a história do skatista: como começou no skate, onde andava, quais pistas frequentava, campeonatos que disputou e o que marca o estilo dele nas ruas de Juiz de Fora.</p><p>Você pode escrever quantos parágrafos quiser, sempre entre &lt;p&gt; e &lt;/p&gt;.</p>",

    // quantos vídeos quiser: copie uma linha { ... } e cole abaixo
    videos: [
      { titulo: "Vídeo Parte", ano: "2025", id: "" },
      { titulo: "Linha na pista do Benfica", ano: "2024", id: "" }
    ],

    instagram: "",
    exemplo: true
  },
  {
    id: "skatista-2",
    nome: "Nome do Skatista 2",
    apelido: "",
    bairro: "Bairro / pista de origem",
    modalidade: "Bowl",
    desde: "2015",
    foto: "assets/skatistas/skatista-2.png",
    fotoGrande: "",
    resumo: "Troque este texto pela descrição do skatista.",
    bio: "<p>Conte aqui a trajetória deste skatista.</p>",
    videos: [{ titulo: "Vídeo Parte", ano: "2025", id: "" }],
    instagram: "",
    exemplo: true
  },
  {
    id: "skatista-3",
    nome: "Nome do Skatista 3",
    apelido: "",
    bairro: "Bairro / pista de origem",
    modalidade: "Street",
    desde: "2018",
    foto: "assets/skatistas/skatista-3.png",
    fotoGrande: "",
    resumo: "Troque este texto pela descrição do skatista.",
    bio: "<p>Conte aqui a trajetória deste skatista.</p>",
    videos: [{ titulo: "Vídeo Parte", ano: "2025", id: "" }],
    instagram: "",
    exemplo: true
  },
  {
    id: "skatista-4",
    nome: "Nome do Skatista 4",
    apelido: "",
    bairro: "Bairro / pista de origem",
    modalidade: "Mini Rampa",
    desde: "2020",
    foto: "assets/skatistas/skatista-4.png",
    fotoGrande: "",
    resumo: "Troque este texto pela descrição do skatista.",
    bio: "<p>Conte aqui a trajetória deste skatista.</p>",
    videos: [{ titulo: "Vídeo Parte", ano: "2025", id: "" }],
    instagram: "",
    exemplo: true
  },
  {
    id: "skatista-5",
    nome: "Nome do Skatista 5",
    apelido: "",
    bairro: "Bairro / pista de origem",
    modalidade: "Street",
    desde: "2012",
    foto: "assets/skatistas/skatista-5.png",
    fotoGrande: "",
    resumo: "Troque este texto pela descrição do skatista.",
    bio: "<p>Conte aqui a trajetória deste skatista.</p>",
    videos: [{ titulo: "Vídeo Parte", ano: "2025", id: "" }],
    instagram: "",
    exemplo: true
  },
  {
    id: "skatista-6",
    nome: "Nome do Skatista 6",
    apelido: "",
    bairro: "Bairro / pista de origem",
    modalidade: "Vertical",
    desde: "2005",
    foto: "assets/skatistas/skatista-6.png",
    fotoGrande: "",
    resumo: "Troque este texto pela descrição do skatista.",
    bio: "<p>Conte aqui a trajetória deste skatista.</p>",
    videos: [{ titulo: "Vídeo Parte", ano: "2025", id: "" }],
    instagram: "",
    exemplo: true
  }
];


/* --------------------------------------------------------------------------
   3. EQUIPE (DIRETORIA E CONSELHO FISCAL)
   --------------------------------------------------------------------------
   Funciona igual à lista de skatistas: a pessoa aparece com a foto na página
   "Equipe" e, ao clicar, abre o perfil dela com a história e os vídeos.

   cargo -> Presidente, Vice-presidente, Primeiro Secretário, Segundo
            Secretário, Primeiro Tesoureiro, Segundo Tesoureiro, Conselho
            Fiscal, Departamento Feminino, Departamento Cultural...
   foto  -> foto do rosto que aparece no card da equipe.
   fotos -> galeria que aparece na página da pessoa. Coloque quantos
            caminhos de imagem quiser, um por linha, entre aspas.
   -------------------------------------------------------------------------- */
const EQUIPE = [
  {
    id: "presidente",
    nome: "Nome do Presidente",
    cargo: "Presidente",
    desde: "2024",
    foto: "assets/equipe/presidente.png",
    fotoGrande: "",
    resumo: "Uma frase curta sobre a pessoa, que aparece no card da equipe.",
    bio: "<p>Conte aqui a história desta pessoa: há quanto tempo anda de skate, como chegou à AJS, o que faz na associação e quais projetos toca.</p>",
    fotos: [
      "assets/equipe/presidente-1.jpg",
      "assets/equipe/presidente-2.jpg"
    ],
    instagram: "",
    exemplo: true
  },
  {
    id: "vice-presidente",
    nome: "Nome do Vice",
    cargo: "Vice-presidente",
    desde: "2024",
    foto: "assets/equipe/vice-presidente.png",
    fotoGrande: "",
    resumo: "Troque este texto pela descrição da pessoa.",
    bio: "<p>Conte aqui a história desta pessoa.</p>",
    fotos: [],
    instagram: "",
    exemplo: true
  },
  {
    id: "primeiro-secretario",
    nome: "Nome do Primeiro Secretário",
    cargo: "Primeiro Secretário",
    desde: "2024",
    foto: "assets/equipe/primeiro-secretario.png",
    fotoGrande: "",
    resumo: "Troque este texto pela descrição da pessoa.",
    bio: "<p>Conte aqui a história desta pessoa.</p>",
    fotos: [],
    instagram: "",
    exemplo: true
  },
  {
    id: "segundo-secretario",
    nome: "Nome do Segundo Secretário",
    cargo: "Segundo Secretário",
    desde: "2024",
    foto: "assets/equipe/segundo-secretario.png",
    fotoGrande: "",
    resumo: "Troque este texto pela descrição da pessoa.",
    bio: "<p>Conte aqui a história desta pessoa.</p>",
    fotos: [],
    instagram: "",
    exemplo: true
  },
  {
    id: "primeiro-tesoureiro",
    nome: "Nome do Primeiro Tesoureiro",
    cargo: "Primeiro Tesoureiro",
    desde: "2024",
    foto: "assets/equipe/primeiro-tesoureiro.png",
    fotoGrande: "",
    resumo: "Troque este texto pela descrição da pessoa.",
    bio: "<p>Conte aqui a história desta pessoa.</p>",
    fotos: [],
    instagram: "",
    exemplo: true
  },
  {
    id: "segundo-tesoureiro",
    nome: "Nome do Segundo Tesoureiro",
    cargo: "Segundo Tesoureiro",
    desde: "2024",
    foto: "assets/equipe/segundo-tesoureiro.png",
    fotoGrande: "",
    resumo: "Troque este texto pela descrição da pessoa.",
    bio: "<p>Conte aqui a história desta pessoa.</p>",
    fotos: [],
    instagram: "",
    exemplo: true
  }
];


/* --------------------------------------------------------------------------
   4. BLOG
   --------------------------------------------------------------------------
   slug     -> endereço do post, sem espaço e sem acento
   data     -> sempre no formato ANO-MES-DIA, ex.: "2025-06-21"
   capa     -> "assets/blog/arquivo.jpg" ou "" para usar o fundo padrão
   conteudo -> texto do post em HTML: <p>, <h3>, <ul><li>, <blockquote>
               (fica entre crases ` ... `, não entre aspas)
   -------------------------------------------------------------------------- */
const POSTS = [
  {
    slug: "historia-da-ajs",
    titulo: "AJS: mais de 20 anos de promoção do skate em Juiz de Fora",
    data: "2025-01-15",
    autor: "AJS",
    categoria: "História",
    capa: "assets/header.jpg",
    resumo: "Da rua da Escola Normal à audiência pública com 500 skatistas na Câmara Municipal: como nasceu a Associação Juizforana de Skate.",
    conteudo: `
      <p>Nos anos 90, os skatistas de Juiz de Fora não tinham um local específico para praticar o esporte e utilizavam uma rua, que era o estacionamento da Escola Normal. Nesse local eram construídos obstáculos de madeira, que constantemente eram apreendidos pela polícia, que alegava não ser aquele um local adequado para a prática do esporte.</p>

      <p>No início de 1999 o então vereador Gabriel Rocha (Biel) apoiou a luta e começou a conscientizar os skatistas da necessidade de se constituir uma entidade representativa junto ao poder público. Os skatistas da época começaram a articular a ideia de criar uma associação, realizando uma reunião onde costumavam praticar o esporte; esta foi conduzida pelos mais experientes e devidamente registrada em ata, sendo fundada a associação.</p>

      <h3>500 skatistas na Câmara Municipal</h3>
      <p>Com o apoio do vereador Biel, foi marcada uma audiência pública na Câmara Municipal, onde foram convidadas autoridades municipais, representantes da Polícia Militar e da Secretaria de Esportes, com o intuito principal de mostrar que a prática do skate precisava de locais adequados. No evento na Câmara compareceram cerca de 500 skatistas, com seus skates na mão, que conseguiram convencer os vereadores sobre a necessidade da construção de pistas para a prática do esporte e de políticas públicas em prol do mesmo.</p>

      <h3>Raízes no Vitorino Braga</h3>
      <p>A AJS está localizada no mesmo local da Associação dos Moradores do bairro Vitorino Braga (Praça Teotônio Vilella). Ela sempre procurou realizar atividades juntamente com os moradores do bairro. Com a Prefeitura de Juiz de Fora, entre 2007 e início de 2009, a Associação participou do projeto chamado <strong>"JF nos trilhos da paz"</strong>, no qual eram oferecidas diversas oficinas para as comunidades carentes como Vila Ideal, Santa Cecília e Barreira do Triunfo. Entre as atividades estavam teatro, dança, música e o skate.</p>

      <h3>Bom de Escola, Skate Rola</h3>
      <p>Ao longo dos anos, a AJS vem promovendo eventos, demonstrações e campeonatos do circuito juizforano, além de trabalhos com crianças e adolescentes como a Escolinha de Skate no bairro Benfica (projeto <strong>Bom de Escola, Skate Rola</strong>), desenvolvido pelo então presidente da associação Vinicius da Silva Oliveira.</p>

      <p>A Associação Juizforana de Skate continua sua luta na busca por melhorias nas condições das pistas e pelo reconhecimento e valorização do esporte junto à sociedade juizforana.</p>
    `
  },
  {
    slug: "historia-do-skate",
    titulo: "Do sidewalk surf ao switchstance: uma breve história do skate",
    data: "2025-02-10",
    autor: "AJS",
    categoria: "Cultura",
    capa: "",
    resumo: "Como o skate saiu das ruas secas da Califórnia dos anos 60 e virou um dos esportes mais praticados do mundo, com o Brasil no topo.",
    conteudo: `
      <p>No início da década de 1960, os surfistas da Califórnia queriam fazer das pranchas um divertimento também nas ruas, em uma época de marés baixas e seca na região. Inicialmente, a nova "maneira de surfar" foi chamada de <em>sidewalk surf</em>. Em 1965 surgiram os primeiros campeonatos, mas o skate só ficou mais reconhecido uma década depois.</p>

      <h3>A roda que mudou tudo</h3>
      <p>Em 1971, o norte-americano Frank Naswortly inventou as rodinhas de uretano, que revolucionaram o esporte: elas eram mais aderentes e silenciosas. Um skate passou a pesar por volta de 2,5 kg. Novos terrenos foram sendo desbravados, como os reservatórios de água e piscinas vazias, e ao mesmo tempo surgiram os skateparks, áreas especificamente construídas para a prática do skate.</p>

      <h3>O skate chega ao Brasil</h3>
      <p>No Brasil, o primeiro campeonato de skate aconteceu no Clube Federal (RJ) no final de 1974. Em outubro de 1975 foi realizado na Quinta da Boa Vista (RJ) o primeiro grande campeonato. Em dezembro do mesmo ano foi inaugurada, em Nova Iguaçu, a primeira pista de skate da América Latina. Outras tantas foram construídas, mais e melhores campeonatos vieram, e o Brasil é hoje apontado como a segunda grande potência mundial do esporte, com profissionais de ponta como Sandro Dias, Lincoln Ueda, Bob Burnquist, Cristiano Mateus, Rodil de Araujo, Carlos de Andrade e Rodrigo Teixeira, para citar apenas alguns.</p>

      <h3>O Ollie</h3>
      <p>Em 1979, Alan Gelfand inventou o Ollie-Air, manobra com a qual os skatistas ultrapassam obstáculos elevados. A partir disso, o skate nunca mais foi o mesmo. Essa manobra possibilitou uma abordagem inacreditavelmente infinita por parte dos skatistas. Não se pratica street skate sem o domínio do Ollie.</p>

      <h3>Mullen, Hawk e a revolução brasileira</h3>
      <p>Na década de 1980, um dos revolucionários do esporte, principalmente na modalidade freestyle, foi <strong>Rodney Mullen</strong>: grande parte das manobras atuais deriva das criadas por ele. Outro revolucionário, na modalidade vertical, foi <strong>Tony Hawk</strong>, que inovou a maneira como os skatistas abordam o half-pipe, sempre procurando ultrapassar os limites de criatividade e dificuldade de execução das manobras.</p>

      <p>Nos anos 90, o brasileiro <strong>Bob Burnquist</strong> elaborou a última grande revolução do skate: o switchstance vertical, a técnica de andar com a base trocada. A partir daí, o skate passou a não ter mais "lado": as manobras realizadas com o pé direito na frente agora também são feitas com o pé esquerdo na frente, o que quadruplicou o número de variações possíveis. Em 1995, Digo Menezes conquistou o primeiro título mundial de vertical para o Brasil.</p>

      <h3>Organização e presente</h3>
      <p>Em março de 1999 foi fundada em Curitiba a <strong>CBSk, Confederação Brasileira de Skate</strong>, entidade que regulamenta as normas e políticas voltadas ao desenvolvimento do skate no território brasileiro. Também nessa época foi fundada em São Paulo a Associação Brasileira de Skate Feminino, cujo primeiro circuito ocorreu em 2005. Em 2008, a Mega Rampa chegou ao Brasil, a primeira vez no Hemisfério Sul, montada no Sambódromo do Anhembi pelo arquiteto e skatista dos anos 80 George Rotatori.</p>

      <p>Tipicamente urbano, o skate se encontra em franco desenvolvimento, com muitas pistas sendo construídas no mundo todo e uma enorme variedade de manobras e terrenos: escadas, calçadas, meios-fios, bancos, hidrantes, rampas de madeira e piscinas abandonadas. Hoje o skate competitivo se divide basicamente em street e vertical, mas seguem amplamente praticadas modalidades como downhill slide, speed, mini rampa e pool riding.</p>

      <blockquote>O skate é um esporte sem limitações, mas para aprender é necessário dedicação. O skate é mais que um esporte. É um estilo de vida.</blockquote>
    `
  },
  {
    slug: "go-skateboarding-day",
    titulo: "Go Skateboarding Day: por que 21 de junho é o dia do skatista",
    data: "2025-06-21",
    autor: "AJS",
    categoria: "Eventos",
    capa: "assets/header.jpg",
    resumo: "Todo 21 de junho o mundo inteiro sai às ruas de skate. Em Juiz de Fora, a AJS organiza a concentração e o rolê pela cidade.",
    conteudo: `
      <p>O <strong>Go Skateboarding Day</strong> é celebrado em <strong>21 de junho</strong>, data criada em 2004 pela indústria do skate para transformar um dia comum em uma celebração mundial do esporte. A proposta é simples e direta: largar tudo, pegar o skate e andar.</p>

      <h3>O GSD em Juiz de Fora</h3>
      <p>Em Juiz de Fora, a AJS organiza a concentração dos skatistas e o rolê pelas ruas da cidade. O evento é aberto, gratuito e para todas as idades e níveis, de quem anda há vinte anos a quem subiu no shape pela primeira vez naquela semana.</p>

      <p>Mais do que um passeio, o GSD é uma demonstração pública de que o skate ocupa a cidade. É no dia em que centenas de skatistas se reúnem no centro que a sociedade e o poder público enxergam o tamanho da comunidade, a mesma lógica da audiência pública de 1999, quando 500 skatistas com os skates na mão convenceram a Câmara Municipal da necessidade de pistas.</p>

      <h3>Como participar</h3>
      <ul>
        <li>Chegue no horário e local da concentração divulgados nas nossas redes;</li>
        <li>Leve seu skate, água e, se puder, capacete;</li>
        <li>Respeite o trânsito, os pedestres e a cidade, o rolê é nosso cartão de visitas;</li>
        <li>Chame a molecada: o GSD é a melhor porta de entrada para o skate.</li>
      </ul>

      <p>Acompanhe o nosso Instagram para saber o ponto de encontro da próxima edição.</p>
    `
  },
  {
    slug: "modelo-de-post",
    titulo: "Este é um post de exemplo, use como modelo",
    data: "2025-03-01",
    autor: "Nome do autor",
    categoria: "Avisos",
    capa: "",
    resumo: "Copie este bloco no arquivo dados/conteudo.js para publicar uma nova notícia no blog da AJS.",
    conteudo: `
      <p>Este post existe apenas para mostrar como o blog funciona. Para criar um post novo, abra o arquivo <strong>dados/conteudo.js</strong>, copie um bloco inteiro de post e cole logo abaixo, trocando as informações.</p>
      <h3>Um subtítulo</h3>
      <p>Use &lt;p&gt; para parágrafos, &lt;h3&gt; para subtítulos e &lt;ul&gt;&lt;li&gt; para listas.</p>
      <p>Quando não precisar mais deste exemplo, é só apagar o bloco inteiro.</p>
    `,
    exemplo: true
  }
];


/* --------------------------------------------------------------------------
   5. CAMPEONATOS E EVENTOS
   --------------------------------------------------------------------------
   status -> "inscricoes"  (inscrições abertas)
             "confirmado"  (data marcada, inscrições ainda não abertas)
             "realizado"   (já aconteceu, aparece no histórico)
   data   -> formato ANO-MES-DIA
   -------------------------------------------------------------------------- */
const CAMPEONATOS = [
  {
    id: "campeonato-1",
    nome: "Nome do Campeonato",
    etapa: "1ª Etapa do Circuito Juizforano de Skate",
    data: "2025-09-20",
    horario: "09h às 18h",
    local: "Nome da pista",
    endereco: "Bairro, Juiz de Fora/MG",
    modalidade: "Street",
    status: "inscricoes",
    inscricaoAte: "2025-09-15",
    inscricaoValor: "Gratuita",
    inscricaoLink: "",
    categorias: ["Iniciante", "Amador", "Profissional", "Feminino", "Mirim", "Master"],
    premiacao: "Premiação em dinheiro e produtos para os três primeiros de cada categoria.",
    resumo: "Descreva aqui o campeonato: formato das baterias, quem pode participar e o que esperar do dia.",
    cartaz: "",
    resultados: [],
    exemplo: true
  },
  {
    id: "campeonato-2",
    nome: "Nome do Campeonato",
    etapa: "2ª Etapa do Circuito Juizforano de Skate",
    data: "2025-11-08",
    horario: "10h às 17h",
    local: "Nome da pista",
    endereco: "Bairro, Juiz de Fora/MG",
    modalidade: "Bowl",
    status: "confirmado",
    inscricaoAte: "",
    inscricaoValor: "A definir",
    inscricaoLink: "",
    categorias: ["Amador", "Profissional", "Feminino"],
    premiacao: "A definir.",
    resumo: "Descreva aqui o campeonato.",
    cartaz: "",
    resultados: [],
    exemplo: true
  },
  {
    id: "campeonato-3",
    nome: "Nome do Campeonato Realizado",
    etapa: "Edição anterior",
    data: "2025-04-12",
    horario: "09h às 18h",
    local: "Nome da pista",
    endereco: "Bairro, Juiz de Fora/MG",
    modalidade: "Street",
    status: "realizado",
    inscricaoAte: "",
    inscricaoValor: "",
    inscricaoLink: "",
    categorias: ["Amador", "Profissional"],
    premiacao: "",
    resumo: "Resumo de como foi o evento.",
    cartaz: "",
    resultados: [
      { categoria: "Profissional", podio: ["1º Nome do skatista", "2º Nome do skatista", "3º Nome do skatista"] },
      { categoria: "Amador", podio: ["1º Nome do skatista", "2º Nome do skatista", "3º Nome do skatista"] }
    ],
    exemplo: true
  }
];


/* --------------------------------------------------------------------------
   6. PISTAS DE SKATE DE JUIZ DE FORA
   --------------------------------------------------------------------------
   Preencha com as pistas e picos da cidade. Deixe a lista vazia ( [] ) se
   preferir não exibir esta seção.
   -------------------------------------------------------------------------- */
const PISTAS = [
  {
    nome: "Nome da pista",
    bairro: "Bairro",
    descricao: "Obstáculos, piso e horário de funcionamento.",
    mapa: "",
    exemplo: true
  },
  {
    nome: "Nome da pista",
    bairro: "Bairro",
    descricao: "Obstáculos, piso e horário de funcionamento.",
    mapa: "",
    exemplo: true
  },
  {
    nome: "Nome da pista",
    bairro: "Bairro",
    descricao: "Obstáculos, piso e horário de funcionamento.",
    mapa: "",
    exemplo: true
  }
];
