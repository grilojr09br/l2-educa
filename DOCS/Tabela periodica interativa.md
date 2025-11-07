Quero criar uma tabela periodica seguindo as ideias abaixo, mas caso encontre uma forma melhor de incorporar os dados por exemplo usando bibliotecas de js, faça como achar melhor:



Tabela Periódica — Liquid Glass (Quadrados) v3

Uma tabela periódica interativa em arquivo único (standalone HTML), com visual liquid glass, blocos quadrados ao estilo clássico, glow de proximidade (reage ao mouse mesmo fora do tile), filtros, busca, setas de tendência didáticas e painel de detalhes. Inclui dados reais DEMO (Eletronegatividade de Pauling e raio covalente) e importação de CSV/JSON para completar ou trocar o dataset.



Status: v3 (estável)





✨ Principais recursos

Visual clássico com blocos quadrados (grupos 1–18 e períodos 1–7), linhas separadas de Lantanídeos e Actinídeos.

Liquid Glass sofisticado: bordas cromáticas, vidro translúcido e tint discreta por categoria (paleta didática).

Glow de proximidade: a borda fica iluminada conforme a distância do ponteiro mesmo quando o mouse está fora do bloco.

Visualizações:

Eletronegatividade (Pauling)

Raio covalente (pm)

Categorias químicas (tinta de cor)

Modo Tendência (estimado) como fallback

Setas de tendência ao redor da tabela (didático):

EN aumenta → e ↑

Raio aumenta ← e ↓

Filtros e busca (símbolo ou nome), lista tabular e painel de detalhes por elemento.

Importar dados: CSV/JSON com sym,en,radius para atualizar/expandir rapidamente.

Acessibilidade: navegação por setas do teclado, foco visível, Enter/Space abre detalhes, rótulos ARIA.

Performance: requestAnimationFrame para o glow; caching de bounding rects; estado persistente no localStorage.





📦 Como usar

Baixe o arquivo standalone.html (v3) e abra diretamente no navegador.

Use o seletor Visualização para alternar entre EN, Raio ou Categorias.

Em Dados, escolha Reais (DEMO) ou Tendência (estimado).

Para completar o dataset, clique em Importar CSV/JSON e selecione seu arquivo.

Funciona totalmente offline. Requer navegador moderno com backdrop-filter (há fallback visual simplificado se indisponível).





🧪 Dados e visualizações

Modos de dados

Reais (DEMO): Eletronegatividade de Pauling e raio covalente (Cordero 2008, aprox.) preenchidos até Kr (Z=36). Os demais elementos ficam como — até você importar dados.

Tendência (estimado): heatmap geométrico coerente com o padrão didático (EN ↑ para direita e para cima; Raio ↑ para esquerda e para baixo).

Legenda

Em Reais (DEMO), a barra mostra mín e máx numéricos calculados a partir dos valores presentes.

Em Tendência, a legenda exibe rótulos qualitativos (Baixa → Alta).

Importar CSV/JSON

CSV esperado (cabeçalho obrigatório):



sym,en,radius

H,2.20,31

He,,

Li,0.98,128

...

sym: símbolo do elemento (ex.: H, Fe, Og).

en: eletronegatividade de Pauling (número ou vazio).

radius: raio covalente em pm (número ou vazio).

JSON esperado:



[

{"sym":"H", "en":2.20, "radius":31},

{"sym":"He", "en":null, "radius":null},

{"sym":"Li", "en":0.98, "radius":128}

]

O import não altera o arquivo em disco; apenas substitui os valores em memória durante a sessão.

Completar o dataset embutido

Se preferir, você pode embutir o dataset completo diretamente no arquivo, substituindo as constantes REAL_EN e REAL_RADIUS (JS). Depois disso, altere o modo padrão para Reais no restoreState().





🎨 Visual, paleta e categorias

Paleta didática (ajuste moderno das cores tradicionais):

Alcalinos #ff6b6b, Alcalino‑terrosos #ffa94d, Transição #74c0fc, Pós‑transição #b197fc, Semimetal #ffd166, Não‑metal #6edc7f, Halogênio #f9c74f, Gás nobre #90caf9, Lantanídeo #94f2c0, Actinídeo #ff99c8.

Cada tile possui uma fita superior com a cor da categoria e uma tinta discreta (0.14–0.18) sob o vidro.

Você pode editar as variáveis CSS:

:root{

--size:72px; /* tamanho dos blocos */

--gap:8px; /* espaçamento da grade */

--cat-alkali:#ff6b6b; /* etc... */

}





🖱️ Glow de proximidade (como funciona)

O arquivo escuta mousemove no window e salva mouseX/mouseY em variáveis CSS (--mx, --my).

A cada frame, calcula‑se a menor distância do ponteiro ao retângulo do tile (0 se estiver sobre o tile):



const dx = mouseX < rect.left ? rect.left - mouseX : mouseX > rect.right ? mouseX - rect.right : 0;

const dy = mouseY < rect.top ? rect.top - mouseY : mouseY > rect.bottom? mouseY - rect.bottom: 0;

const dist = Math.hypot(dx, dy);

const RANGE = 220; // px

const prox = Math.max(0, Math.min(1, 1 - dist/RANGE));

tile.style.setProperty('--prox', prox);

A borda usa um radial-gradient centrado em (--mx,--my) e modulado por var(--prox) para intensificar o halo próximo ao ponteiro, mesmo quando o mouse está fora do tile.

Ajuste o alcance alterando RANGE no JS.





🧱 Estrutura do arquivo (standalone)

<head>

<style>/* Tema, grid clássico, tiles, glow, legendas, drawer, lista */</style>

</head>

<body>

<!-- Topbar: controles (visualização, dados, busca, lista, import) -->

<!-- Groups + Grid + Legend + Arrows + Braces Ln/Act + List -->

<!-- Drawer de detalhes -->

<script>

// MiniDB (mini biblioteca de dados)

// Dados base (símbolos, nomes, mapas Z), layout e categorias

// Dados Reais (DEMO): REAL_EN, REAL_RADIUS

// Renderização da grade e eventos

// Controles (visualização, dados, filtros, busca, lista)

// Import CSV/JSON

// Drawer de detalhes

// Setas de tendência

// Glow de proximidade (mousemove + rAF)

// Acessibilidade (setas do teclado)

</script>

</body>

MiniDB (biblioteca interna)

Utilitário simples para filtrar, mapear e ordenar linhas em memória:



class MiniDB{

constructor(rows){ this.rows = rows || [] }

filter(fn){ return new MiniDB(this.rows.filter(fn)) }

map(fn){ return new MiniDB(this.rows.map(fn)) }

sortBy(key, dir='asc'){ /* ... */ }

groupBy(key){ /* ... */ }

find(fn){ return this.rows.find(fn) }

toArray(){ return [...this.rows] }

indexBy(key){ /* ... */ }

}

Usada para manipular ELEMENTS e futuros datasets (p.ex. energias de ionização, massas, etc.).





🔧 Personalização rápida

Tamanho dos blocos: --size: 72px → 80px ou 64px.

Intensidade do glow: aumente a opacidade dos gradientes na pseudo‑borda (.tile::after) ou reduza filter: blur(8px).

Alcance do glow: altere RANGE (padrão 220) em applyProximity().

Paleta: troque as variáveis --cat-* para o esquema de cores preferido (ou color‑blind friendly).

Visualização padrão: no restoreState(), defina dataMode.value = 'real' e setViz('en').





♿ Acessibilidade

Foco navegável nos tiles; setas de teclado para mover o foco (18 colunas).

Enter/Space abre o drawer do elemento focado.

aria-label em cada tile ("Símbolo Nome").





⚙️ Compatibilidade

Chromium/Firefox/Safari modernos. Há -webkit-backdrop-filter para Safari.

Se backdrop-filter não estiver disponível, o efeito de vidro degrada para um fundo translúcido simples, mantendo legibilidade.





🚧 Roadmap sugerido







🤝 Contribuição

Sugerir melhorias de UX/visual ou enviar seu CSV/JSON com dados revisados.

Se desejar modularizar, separar o CSS/JS em arquivos externos e criar testes mínimos para importação de dados.





📚 Referências (para dados reais)

Eletronegatividade (Pauling)

Raios covalentes: Cordero et al., Covalent radii revisited (2008)

No arquivo v3 os valores reais são DEMO até Kr; substitua/importe seus dados de preferência (NIST, CRC Handbook, etc.).





📝 Licença

Escolha a que preferir para o seu projeto. Sugestão: MIT.



MIT License — © Seu Nome

Permissão é concedida, gratuitamente, a qualquer pessoa que obtenha uma cópia deste software e arquivos de documentação associados (o "Software"), para negociar o Software sem restrição, incluindo, sem limitação, os direitos de usar, copiar, modificar, fundir, publicar, distribuir, sublicenciar e/ou vender cópias do Software, e permitir pessoas a quem o Software é fornecido a fazê-lo, sob as seguintes condições: (…)





💬 Suporte


Embutir o dataset completo diretamente no HTML (sem import).

Incluir novas visualizações e sliders de filtros numéricos.

adicione mais visualizações (ponto de fusão, massa atômica, energia de ionização) e filtros por faixa

precisamos de um efeito hover mais bem trabalhado, que ilumine somente as bordas dos elementos, de acordo com a cor da familia, e precisamode um efeito de liquid glass mais evidente, com grande transparencia e difração de luz, sendo cada bloco do liquid glass levemente puxado para a cor da familia do elemento