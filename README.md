# Site da AJS — Associação Juizforana de Skate

Site institucional da AJS: história da associação, estatuto, skatistas associados,
equipe, campeonatos e blog.

É um site **estático** (HTML, CSS e JavaScript puros). Não precisa instalar nada,
não tem banco de dados e não tem custo de servidor: dá para hospedar de graça no
GitHub Pages, Netlify ou Vercel.

---

## Como atualizar o conteúdo

**Você só precisa mexer em um arquivo: [`dados/conteudo.js`](dados/conteudo.js).**

Ele está todo comentado em português e dividido em seções numeradas:

| Seção | O que controla |
|---|---|
| 1. Dados gerais | Nome, cidade, WhatsApp, Instagram, e-mail e endereço da AJS |
| 2. Skatistas | Os skatistas associados e as vídeo partes de cada um |
| 3. Equipe | Diretoria e conselho fiscal, com a galeria de fotos de cada pessoa |
| 4. Blog | As matérias publicadas |
| 5. Campeonatos | Agenda, inscrições e resultados |
| 6. Pistas | Pistas e picos de Juiz de Fora |

Depois de editar, **salve o arquivo e recarregue a página** no navegador.

### Regras de ouro para não quebrar nada

- Todo texto fica **entre aspas**: `nome: "João da Silva"`
- Cada item termina com **vírgula**, menos o último da lista
- Para adicionar alguém, **copie um bloco `{ ... }` inteiro** e cole logo abaixo
- Para remover alguém, **apague o bloco `{ ... }` inteiro**, incluindo a vírgula
- Onde estiver escrito `exemplo: true`, é conteúdo de demonstração.
  **Apague essa linha** quando puser o conteúdo de verdade — ela é o que faz aparecer
  a etiqueta "exemplo" no site.

---

## Tarefas do dia a dia

### Adicionar um skatista

Na seção 2 do arquivo de conteúdo:

```js
{
  id: "joao-silva",                        // sem espaço e sem acento: vira o link
  nome: "João Silva",
  apelido: "Joãozinho",
  bairro: "Benfica",
  modalidade: "Street",
  desde: "2014",
  foto: "assets/skatistas/joao-silva.png", // foto do rosto
  fotoGrande: "",                          // opcional: foto maior no perfil
  resumo: "Frase curta que aparece no card.",
  bio: "<p>Primeiro parágrafo.</p><p>Segundo parágrafo.</p>",
  videos: [
    { titulo: "Vídeo Parte", ano: "2025", id: "dQw4w9WgXcQ" }
  ],
  instagram: ""
}
```

**Onde acho o código do vídeo?** No endereço do YouTube:
`https://www.youtube.com/watch?v=`**`dQw4w9WgXcQ`** — é só a parte depois do `v=`.
Enquanto o vídeo não existir, deixe `id: ""` e o site mostra "vídeos em breve".

### Adicionar alguém na equipe

Igual ao skatista, mas na seção 3 e com `cargo` no lugar da modalidade. A equipe usa
**galeria de fotos** no lugar dos vídeos:

```js
fotos: [
  "assets/equipe/maria-1.jpg",
  "assets/equipe/maria-2.jpg"
]
```

### Publicar um post no blog

Na seção 4. O texto vai entre **crases** (`` ` ``), não entre aspas, e aceita HTML:

```js
{
  slug: "campeonato-de-setembro",
  titulo: "Como foi a etapa de setembro",
  data: "2025-09-21",                      // sempre ANO-MES-DIA
  autor: "AJS",
  categoria: "Eventos",
  capa: "assets/blog/etapa-setembro.jpg",  // ou "" para não usar capa
  resumo: "Uma ou duas frases que aparecem no card.",
  conteudo: `
    <p>Primeiro parágrafo.</p>
    <h3>Um subtítulo</h3>
    <p>Outro parágrafo.</p>
  `
}
```

### Anunciar um campeonato

Na seção 5. O campo `status` define como o evento aparece:

- `"inscricoes"` — inscrições abertas (selo verde)
- `"confirmado"` — data marcada, inscrições ainda não abertas
- `"realizado"` — já aconteceu, sai da agenda e entra no histórico

Depois do evento, mude o `status` para `"realizado"` e preencha os `resultados`.

---

## Imagens

Coloque os arquivos nas pastas de `assets/` e use o caminho no arquivo de conteúdo:

| Pasta | Para quê | Formato sugerido |
|---|---|---|
| `assets/skatistas/` | Rosto dos skatistas | PNG recortado ou JPG, 800×1000 px |
| `assets/equipe/` | Rosto e galeria da equipe | JPG, 800×1000 px |
| `assets/blog/` | Capas das matérias | JPG, 1600×900 px |
| `assets/campeonatos/` | Cartazes dos eventos | JPG |

Nomes de arquivo **sem espaço e sem acento**: `joao-silva.png`, não `João Silva.png`.

Se a foto ficar vazia (`foto: ""`), o site gera sozinho um card com a inicial do nome —
nada quebra.

---

## Contato e CTAs

Todos os botões de chamada do site ("Associe-se", "Quero apoiar", "Enviar meu vídeo"...)
abrem o **WhatsApp da AJS** com uma mensagem já escrita.

O número fica em um lugar só, na seção 1 de `dados/conteudo.js`:

```js
whatsapp: "553299567825",        // 55 + DDD + número, só dígitos
whatsappVisivel: "(32) 9956-7825",
```

> ⚠️ **Confira este número.** Ele foi cadastrado exatamente como informado.
> Se for celular com 9 dígitos, o correto é `5532999567825`.

---

## Como ver o site no computador

Basta abrir o arquivo `index.html` com um duplo clique — funciona direto no navegador,
sem servidor.

Se preferir rodar um servidor local (recomendado para testar como fica publicado):

```bash
python -m http.server 8000
```

E abrir <http://localhost:8000>.

---

## Estrutura dos arquivos

```
index.html            Página inicial
sobre.html            História, objetivos, órgãos de direção e pistas
estatuto.html         Estatuto completo, em capítulos
skatistas.html        Lista dos skatistas associados
skatista.html         Perfil de um skatista (foto, texto e vídeos)
equipe.html           Diretoria e conselho fiscal
membro.html           Perfil de alguém da equipe (foto, texto e galeria)
campeonatos.html      Agenda, como participar e histórico
blog.html             Lista das matérias
post.html             Uma matéria
contato.html          Canais de contato e como se associar

css/estilo.css        Todo o visual do site
js/site.js            Menu, rodapé e montagem das listagens
dados/conteudo.js     >>> O ARQUIVO QUE VOCÊ EDITA <<<
assets/               Imagens
```

As páginas `skatista.html`, `membro.html` e `post.html` são **modelos**: elas mostram
uma pessoa ou matéria diferente conforme o endereço, por exemplo
`skatista.html?id=joao-silva`. Não é preciso criar um arquivo por skatista.

---

## Publicando na internet

O jeito mais simples é o **GitHub Pages**: no repositório, vá em
`Settings → Pages`, escolha a branch `main` e a pasta `/ (root)`. Em alguns minutos
o site fica no ar.
