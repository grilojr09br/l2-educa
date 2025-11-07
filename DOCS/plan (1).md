## Plano Didático — Circuitos Elétricos (PT-BR)

### 1) Público-alvo e objetivos de aprendizagem
- **Público-alvo**: Estudantes do Ensino Médio (ou cursos introdutórios de Física).
- **Pré-requisitos**: Álgebra básica, operações com frações, noções de função linear.
- **Objetivos**:
  - Reconhecer e modelar geradores e receptores elétricos.
  - Aplicar a Lei de Ohm em resistores e em associações série/paralelo.
  - Identificar nós, ramos e malhas em circuitos.
  - Resolver circuitos simples com as Leis de Kirchhoff.
  - Interpretar potência total/útil/dissipada e ler gráficos U × i.

### 2) Estrutura macro e tempo sugerido (45–60 min)
- Abertura e objetivos (3–5 min)
- Geradores (7–8 min) + calculadora interativa
- Receptores (5–6 min) + calculadora interativa
- Resistores e Lei de Ohm (5–7 min)
- Associações série/paralelo (8–10 min) + construtor de R_eq
- Nós, ramos e malhas (4–5 min)
- Leis de Kirchhoff (7–10 min) + exemplo guiado
- Exercícios e checagem rápida (5–8 min)
- Conclusão e próximos passos (2–3 min)

### 3) Design e UX
- **Visual**: tema claro/escuro; tipografia de sistema; cartões, sombras suaves, cores com alto contraste.
- **Layout**: navegação lateral fixa; cabeçalho com título, alternador de tema e botão "Voltar ao topo".
- **Responsividade**: colunas colapsam em cartões empilhados no mobile.
- **Acessibilidade**: foco visível, ARIA labels/roles, contraste AA, navegação por teclado, skip-link.

### 4) Interatividade e recursos
- **Calculadora de Gerador**: entradas (ε, r_i, R). Saídas: i, U, P_T, P_U, P_D. Passo-a-passo.
- **Calculadora de Receptor**: entradas (ε', r', i). Saídas: U e potências.
- **Construtor de R_eq**: modo série ou paralelo; lista dinâmica de R; `R_eq` em tempo real.
- **Exemplo Kirchhoff**: resolução guiada (mostrar/ocultar passos).
- **Questionários curtos**: 3–5 itens com feedback imediato.

### 5) Sequência didática por seção
1. **Objetivos**
   - Curto elenco do que será aprendido. Engajamento inicial.
2. **Geradores**
   - Conceitos: `U = ε − r_i · i`. Potências: `P_T`, `P_U`, `P_D`. Caso `U = 0` ⇒ `i_cc = ε/r_i`.
   - Atividade: calcular com valores escolhidos pelo estudante.
3. **Receptores**
   - Conceitos: `U = ε' + r' · i`; potências análogas.
   - Atividade: explorar variação de `i` e impacto em `U`.
4. **Resistores e Lei de Ohm**
   - `U = R · i`. Efeito Joule. Gráfico U × i.
5. **Associações**
   - Série: mesma corrente; somam tensões. `R_eq = ΣR`.
   - Paralelo: mesma tensão; correntes se dividem. `1/R_eq = Σ(1/R)`.
   - Atividade: adicionar/remover resistores e comparar `R_eq`.
6. **Circuitos e nós**
   - Nós e ramos. Identificação visual.
7. **Leis de Kirchhoff**
   - Lei dos Nós: `Σ i_entram = Σ i_saiem`.
   - Lei das Malhas: `Σ V = 0`. Convenções de sinais.
   - Exemplo guiado com revelação gradual.
8. **Exercícios**
   - 3–4 problemas com verificação automática.
9. **Conclusão**
   - Recapitulação e dicas finais.

### 6) Avaliação formativa e gamificação
- Indicadores: acerto em quizzes, uso das calculadoras, entendimento das convenções de sinal.
- Feedback imediato com cores/ícones e explicações curtas.

### 7) Boas práticas pedagógicas
- Analogias hidráulicas e representações visuais.
- Passos numerados nas resoluções.
- Exemplos com valores realistas.

### 8) Tratamento de erros (UX + técnica)
- Validação de entrada: números reais positivos, limites seguros; mensagens claras.
- Prevenção de NaN/Infinity; substituição por defaults; highlight do campo inválido.
- Função `safeCompute(fn)` com `try/catch` e toast não-obstrutivo.
- Persistência de tema com `localStorage` protegida por `try/catch`.
- Fallback sem JS: conteúdo textual ainda acessível.

### 9) Checklist de QA
- Navegação por teclado entre seções.
- Contraste e foco visível.
- Mobile: inputs grandes e legíveis.
- Fórmulas e unidades consistentes.
- Teste de casos limite (R muito alto/baixo, r_i = 0, i = 0).

### 10) Entregáveis
- `Circuitos_eletricos_interativo.html` autossuficiente, bonito, responsivo e acessível.
- Interatividade conforme itens acima e tratamento robusto de erros.