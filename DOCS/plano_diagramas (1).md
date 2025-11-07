## Plano conciso para melhores diagramas e uso didático

- Objetivo
  - Diagramas claros, fiéis (símbolos padrão), responsivos e anotados (polos, correntes, nós).
  - Exercícios guiados com resolução sequencial e explicação do raciocínio.

- Padrões de símbolos
  - Bateria: placas longa/curta com +/− visíveis.
  - Resistor: ziguezague; rótulos R1, R2, etc.; nós marcados por pontos.
  - Setas de corrente i, i1, i2; tensões U com indicativo de subida/queda.

- Abordagem técnica
  - SVG puro (sem dependências) com funções utilitárias: linha, resistor, bateria, nó, seta, rótulo.
  - ViewBox responsivo; redraw on resize; cores conforme tema claro/escuro.

- Interações
  - Atualização dinâmica dos valores nos rótulos (ε, r_i, R, R1, R2, i, U).
  - Alternância de cenários: série simples, paralelo simples, duas malhas (esqueleto visual).

- Exercícios e resolução sequencial
  - Série simples (ε, r_i, R):
    1) Modelo R_total = r_i + R; 2) i = ε/R_total; 3) U = ε − r_i·i; 4) Potências P_T, P_U, P_D.
  - Paralelo simples (ε, R1, R2):
    1) 1/R_p = 1/R1 + 1/R2; 2) i_T = ε/R_p; 3) i1 = ε/R1, i2 = ε/R2; 4) Validação i_T = i1 + i2.
  - Duas malhas (Kirchhoff):
    1) Definição de sentidos; 2) Lei dos Nós; 3) Leis das Malhas; 4) Resolução do sistema; 5) Interpretação de sinais.

- Acessibilidade
  - ARIA labels para diagramas; descrições textuais; foco visível; alto contraste.

- QA
  - Conferir escalas, posições e legibilidade em mobile; valores extremos; consistência de unidades.