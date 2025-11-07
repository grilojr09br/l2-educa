# Loader 1
''''
import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="pl">
        <div className="pl__dot" />
        <div className="pl__dot" />
        <div className="pl__dot" />
        <div className="pl__dot" />
        <div className="pl__dot" />
        <div className="pl__dot" />
        <div className="pl__dot" />
        <div className="pl__dot" />
        <div className="pl__dot" />
        <div className="pl__dot" />
        <div className="pl__dot" />
        <div className="pl__dot" />
        <div className="pl__text">Loading…</div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .pl {
    box-shadow: 2em 0 2em rgba(0, 0, 0, 0.2) inset, -2em 0 2em rgba(255, 255, 255, 0.1) inset;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    transform: rotateX(30deg) rotateZ(45deg);
    width: 14em;
    height: 14em;
    color: white;
  }

  .pl, .pl__dot {
    border-radius: 50%;
  }

  .pl__dot {
    animation-name: shadow724;
    box-shadow: 0.1em 0.1em 0 0.1em black, 0.3em 0 0.3em rgba(0, 0, 0, 0.5);
    top: calc(50% - 0.75em);
    left: calc(50% - 0.75em);
    width: 1.5em;
    height: 1.5em;
  }

  .pl__dot, .pl__dot:before, .pl__dot:after {
    animation-duration: 2s;
    animation-iteration-count: infinite;
    position: absolute;
  }

  .pl__dot:before, .pl__dot:after {
    content: "";
    display: block;
    left: 0;
    width: inherit;
    transition: background-color var(--trans-dur);
  }

  .pl__dot:before {
    animation-name: pushInOut1724;
    background-color: var(--bg);
    border-radius: inherit;
    box-shadow: 0.05em 0 0.1em rgba(255, 255, 255, 0.2) inset;
    height: inherit;
    z-index: 1;
  }

  .pl__dot:after {
    animation-name: pushInOut2724;
    background-color: var(--primary1);
    border-radius: 0.75em;
    box-shadow: 0.1em 0.3em 0.2em rgba(255, 255, 255, 0.4) inset, 0 -0.4em 0.2em #2e3138 inset, 0 -1em 0.25em rgba(0, 0, 0, 0.3) inset;
    bottom: 0;
    clip-path: polygon(0 75%, 100% 75%, 100% 100%, 0 100%);
    height: 3em;
    transform: rotate(-45deg);
    transform-origin: 50% 2.25em;
  }

  .pl__dot:nth-child(1) {
    transform: rotate(0deg) translateX(5em) rotate(0deg);
    z-index: 5;
  }

  .pl__dot:nth-child(1), .pl__dot:nth-child(1):before, .pl__dot:nth-child(1):after {
    animation-delay: 0s;
  }

  .pl__dot:nth-child(2) {
    transform: rotate(-30deg) translateX(5em) rotate(30deg);
    z-index: 4;
  }

  .pl__dot:nth-child(2), .pl__dot:nth-child(2):before, .pl__dot:nth-child(2):after {
    animation-delay: -0.1666666667s;
  }

  .pl__dot:nth-child(3) {
    transform: rotate(-60deg) translateX(5em) rotate(60deg);
    z-index: 3;
  }

  .pl__dot:nth-child(3), .pl__dot:nth-child(3):before, .pl__dot:nth-child(3):after {
    animation-delay: -0.3333333333s;
  }

  .pl__dot:nth-child(4) {
    transform: rotate(-90deg) translateX(5em) rotate(90deg);
    z-index: 2;
  }

  .pl__dot:nth-child(4), .pl__dot:nth-child(4):before, .pl__dot:nth-child(4):after {
    animation-delay: -0.5s;
  }

  .pl__dot:nth-child(5) {
    transform: rotate(-120deg) translateX(5em) rotate(120deg);
    z-index: 1;
  }

  .pl__dot:nth-child(5), .pl__dot:nth-child(5):before, .pl__dot:nth-child(5):after {
    animation-delay: -0.6666666667s;
  }

  .pl__dot:nth-child(6) {
    transform: rotate(-150deg) translateX(5em) rotate(150deg);
    z-index: 1;
  }

  .pl__dot:nth-child(6), .pl__dot:nth-child(6):before, .pl__dot:nth-child(6):after {
    animation-delay: -0.8333333333s;
  }

  .pl__dot:nth-child(7) {
    transform: rotate(-180deg) translateX(5em) rotate(180deg);
    z-index: 2;
  }

  .pl__dot:nth-child(7), .pl__dot:nth-child(7):before, .pl__dot:nth-child(7):after {
    animation-delay: -1s;
  }

  .pl__dot:nth-child(8) {
    transform: rotate(-210deg) translateX(5em) rotate(210deg);
    z-index: 3;
  }

  .pl__dot:nth-child(8), .pl__dot:nth-child(8):before, .pl__dot:nth-child(8):after {
    animation-delay: -1.1666666667s;
  }

  .pl__dot:nth-child(9) {
    transform: rotate(-240deg) translateX(5em) rotate(240deg);
    z-index: 4;
  }

  .pl__dot:nth-child(9), .pl__dot:nth-child(9):before, .pl__dot:nth-child(9):after {
    animation-delay: -1.3333333333s;
  }

  .pl__dot:nth-child(10) {
    transform: rotate(-270deg) translateX(5em) rotate(270deg);
    z-index: 5;
  }

  .pl__dot:nth-child(10), .pl__dot:nth-child(10):before, .pl__dot:nth-child(10):after {
    animation-delay: -1.5s;
  }

  .pl__dot:nth-child(11) {
    transform: rotate(-300deg) translateX(5em) rotate(300deg);
    z-index: 6;
  }

  .pl__dot:nth-child(11), .pl__dot:nth-child(11):before, .pl__dot:nth-child(11):after {
    animation-delay: -1.6666666667s;
  }

  .pl__dot:nth-child(12) {
    transform: rotate(-330deg) translateX(5em) rotate(330deg);
    z-index: 6;
  }

  .pl__dot:nth-child(12), .pl__dot:nth-child(12):before, .pl__dot:nth-child(12):after {
    animation-delay: -1.8333333333s;
  }

  .pl__text {
    font-size: 0.75em;
    max-width: 5rem;
    position: relative;
    text-shadow: 0 0 0.1em var(--fg-t);
    transform: rotateZ(-45deg);
  }

  /* Animations */
  @keyframes shadow724 {
    from {
      animation-timing-function: ease-in;
      box-shadow: 0.1em 0.1em 0 0.1em black, 0.3em 0 0.3em rgba(0, 0, 0, 0.3);
    }

    25% {
      animation-timing-function: ease-out;
      box-shadow: 0.1em 0.1em 0 0.1em black, 0.8em 0 0.8em rgba(0, 0, 0, 0.5);
    }

    50%, to {
      box-shadow: 0.1em 0.1em 0 0.1em black, 0.3em 0 0.3em rgba(0, 0, 0, 0.3);
    }
  }

  @keyframes pushInOut1724 {
    from {
      animation-timing-function: ease-in;
      background-color: var(--bg);
      transform: translate(0, 0);
    }

    25% {
      animation-timing-function: ease-out;
      background-color: var(--primary2);
      transform: translate(-71%, -71%);
    }

    50%, to {
      background-color: var(--bg);
      transform: translate(0, 0);
    }
  }

  @keyframes pushInOut2724 {
    from {
      animation-timing-function: ease-in;
      background-color: var(--bg);
      clip-path: polygon(0 75%, 100% 75%, 100% 100%, 0 100%);
    }

    25% {
      animation-timing-function: ease-out;
      background-color: var(--primary1);
      clip-path: polygon(0 25%, 100% 25%, 100% 100%, 0 100%);
    }

    50%, to {
      background-color: var(--bg);
      clip-path: polygon(0 75%, 100% 75%, 100% 100%, 0 100%);
    }
  }`;

export default Loader;
'''

# Loader 2
''''
import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <span className="loader" />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .loader {
    display: block;
    width: 84px;
    height: 84px;
    position: relative;
  }

  .loader:before , .loader:after {
    content: "";
    position: absolute;
    left: 50%;
    bottom: 0;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: #FFF;
    transform: translate(-50% , -100%)  scale(0);
    animation: push_401 2s infinite linear;
  }

  .loader:after {
    animation-delay: 1s;
  }

  @keyframes push_401 {
    0% , 50% {
      transform: translate(-50% , 0%)  scale(1)
    }

    100% {
      transform: translate(-50%, -100%) scale(0)
    }
  }`;

export default Loader;
''''
# Loader 3 (type of gradient that will make the site luxuorious, acid look)
''''
import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="loader-wrapper">
        <span className="loader-letter">G</span>
        <span className="loader-letter">e</span>
        <span className="loader-letter">n</span>
        <span className="loader-letter">e</span>
        <span className="loader-letter">r</span>
        <span className="loader-letter">a</span>
        <span className="loader-letter">t</span>
        <span className="loader-letter">i</span>
        <span className="loader-letter">n</span>
        <span className="loader-letter">g</span>
        <div className="loader" />
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .loader-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 180px;
    height: 180px;
    font-family: "Inter", sans-serif;
    font-size: 1.2em;
    font-weight: 300;
    color: white;
    border-radius: 50%;
    background-color: transparent;
    user-select: none;
  }

  .loader {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    background-color: transparent;
    animation: loader-rotate 2s linear infinite;
    z-index: 0;
  }

  @keyframes loader-rotate {
    0% {
      transform: rotate(90deg);
      box-shadow:
        0 10px 20px 0 #fff inset,
        0 20px 30px 0 #ad5fff inset,
        0 60px 60px 0 #471eec inset;
    }
    50% {
      transform: rotate(270deg);
      box-shadow:
        0 10px 20px 0 #fff inset,
        0 20px 10px 0 #d60a47 inset,
        0 40px 60px 0 #311e80 inset;
    }
    100% {
      transform: rotate(450deg);
      box-shadow:
        0 10px 20px 0 #fff inset,
        0 20px 30px 0 #ad5fff inset,
        0 60px 60px 0 #471eec inset;
    }
  }

  .loader-letter {
    display: inline-block;
    opacity: 0.4;
    transform: translateY(0);
    animation: loader-letter-anim 2s infinite;
    z-index: 1;
    border-radius: 50ch;
    border: none;
  }

  .loader-letter:nth-child(1) {
    animation-delay: 0s;
  }
  .loader-letter:nth-child(2) {
    animation-delay: 0.1s;
  }
  .loader-letter:nth-child(3) {
    animation-delay: 0.2s;
  }
  .loader-letter:nth-child(4) {
    animation-delay: 0.3s;
  }
  .loader-letter:nth-child(5) {
    animation-delay: 0.4s;
  }
  .loader-letter:nth-child(6) {
    animation-delay: 0.5s;
  }
  .loader-letter:nth-child(7) {
    animation-delay: 0.6s;
  }
  .loader-letter:nth-child(8) {
    animation-delay: 0.7s;
  }
  .loader-letter:nth-child(9) {
    animation-delay: 0.8s;
  }
  .loader-letter:nth-child(10) {
    animation-delay: 0.9s;
  }

  @keyframes loader-letter-anim {
    0%,
    100% {
      opacity: 0.4;
      transform: translateY(0);
    }
    20% {
      opacity: 1;
      transform: scale(1.15);
    }
    40% {
      opacity: 0.7;
      transform: translateY(0);
    }
  }`;

export default Loader;
''''
# Loader 4 (show values of the L2 educational system)
''''
import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="card">
        <div className="loader">
          <p>loading</p>
          <div className="words">
            <span className="word">buttons</span>
            <span className="word">forms</span>
            <span className="word">switches</span>
            <span className="word">cards</span>
            <span className="word">buttons</span>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .card {
    /* color used to softly clip top and bottom of the .words container */
    --bg-color: #111;
    background-color: var(--bg-color);
    padding: 1rem 2rem;
    border-radius: 1.25rem;
  }
  .loader {
    color: rgb(124, 124, 124);
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    font-size: 25px;
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
    height: 40px;
    padding: 10px 10px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    border-radius: 8px;
  }

  .words {
    overflow: hidden;
    position: relative;
  }
  .words::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      var(--bg-color) 10%,
      transparent 30%,
      transparent 70%,
      var(--bg-color) 90%
    );
    z-index: 20;
  }

  .word {
    display: block;
    height: 100%;
    padding-left: 6px;
    color: #956afa;
    animation: spin_4991 4s infinite;
  }

  @keyframes spin_4991 {
    10% {
      -webkit-transform: translateY(-102%);
      transform: translateY(-102%);
    }

    25% {
      -webkit-transform: translateY(-100%);
      transform: translateY(-100%);
    }

    35% {
      -webkit-transform: translateY(-202%);
      transform: translateY(-202%);
    }

    50% {
      -webkit-transform: translateY(-200%);
      transform: translateY(-200%);
    }

    60% {
      -webkit-transform: translateY(-302%);
      transform: translateY(-302%);
    }

    75% {
      -webkit-transform: translateY(-300%);
      transform: translateY(-300%);
    }

    85% {
      -webkit-transform: translateY(-402%);
      transform: translateY(-402%);
    }

    100% {
      -webkit-transform: translateY(-400%);
      transform: translateY(-400%);
    }
  }`;

export default Loader;
''''

# NOW FOR BUTTONS/CARDS AND GRADIENT ANIMATION

## Liquid glass core
''''
O Conceito Fundamental: Vidro Fosco, Não Transparente
A primeira coisa a entender é que o efeito não é simplesmente "vidro transparente" (como uma janela limpa). É "vidro fosco" ou "jateado".

O objetivo não é ver claramente o que está atrás, mas sim permitir que a luz e a cor do que está atrás passem para o elemento da frente. Isso cria uma sensação de hierarquia e contexto: a interface "sabe" onde ela está no ambiente de trabalho.

1. Como a Transparência é Usada (O Contexto)
A transparência, neste caso, é chamada de translucidez. O elemento (como uma barra lateral, um menu ou um modal) não é 100% opaco, mas também não é 100% transparente. Ele tem um nível de opacidade base, mas sua principal função é servir como uma "tela" para o efeito de distorção.

Função Principal: Criar contexto e profundidade.

Como Funciona: Um elemento da interface, como a barra lateral do Finder, permite que as cores do seu papel de parede "sangrem" para dentro dela. Se o seu papel de parede é azul e roxo, a barra lateral terá um tom sutilmente azulado e arroxeado.

O Efeito "Líquido": O termo "líquido" que você usou é perfeito. Quando você arrasta uma janela com esse efeito pela tela, as cores de fundo (o papel de parede, outras janelas) "fluem" por trás dela em tempo real. A distorção se move, dando a sensação de que você está arrastando uma placa de vidro sobre uma pintura.

2. Como a Distorção Funciona (A Legibilidade)
Esta é a parte mais crucial do efeito. Se fosse apenas translúcido, seria um desastre de legibilidade. Imagine texto branco em uma barra lateral sobrepondo-se a um documento de texto preto e branco atrás dela. Seria ilegível.

A "distorção" resolve isso.

Função Principal: Abstrair o fundo para torná-lo uma textura suave, garantindo que o conteúdo sobre o vidro (texto, ícones) seja perfeitamente legível.

Como Funciona (Tecnicamente): O sistema aplica um filtro de desfoque (blur) de alto raio (como um Gaussian Blur ou um filtro mais otimizado) em tudo o que está atrás do elemento.

O Processo:

O sistema "captura" a imagem da área exata atrás da janela.

Aplica-se um desfoque pesado a essa imagem capturada.

Essa imagem desfocada é usada como o fundo do elemento da interface.

Isso significa que você não vê mais detalhes nítidos do fundo—apenas manchas suaves de cor e luz. O texto do documento atrás da barra lateral se torna uma mancha cinza; o rosto em uma foto se torna um tom de pele suave. O resultado é um fundo texturizado e bonito que não compete visualmente com o conteúdo da frente.

3. Como o Contraste é Criado (A Mágica da "Vibrancy")
Esta é a parte mais engenhosa do design da Apple e o que realmente o diferencia. Como o sistema garante que o texto (geralmente branco) seja sempre legível, não importa o que esteja atrás?

O nome disso é Vibrancy (Vibratilidade). O contraste é dinâmico e adaptativo.

Função Principal: Garantir legibilidade constante e fazer a interface parecer "viva" e responsiva à luz.

Como Funciona:

Adaptação de Brilho: O sistema analisa a claridade média do fundo desfocado.

Cenário 1: Fundo Claro. Se você arrastar a janela sobre uma parte clara do papel de parede (como neve ou um céu diurno), o "vidro" sutilmente se torna um pouco mais escuro e menos transparente. Isso garante que o texto branco tenha contraste.

Cenário 2: Fundo Escuro. Se você arrastar a janela sobre uma parte escura (uma foto noturna), o "vidro" se torna um pouco mais claro.

Adaptação de Saturação (O "Vibrancy"): O desfoque, por natureza, pode "enlamear" as cores (misturar cores complementares cria cinza). Para combater isso, o efeito "Vibrancy" aumenta a saturação das cores que passam pelo desfoque. Isso impede que a interface pareça morta ou acinzentada, mantendo-a "vibrante".

Contraste de Texto e Ícones: O texto e os ícones sobre o vidro não são apenas de uma cor sólida (como branco puro #FFFFFF). Eles usam um modo de mesclagem especial. O sistema faz com que o texto e os ícones "invertam" sutilmente o brilho do que está imediatamente atrás deles. Isso significa que o texto se torna ligeiramente mais escuro sobre áreas claras do vidro e mais brilhante sobre áreas escuras, maximizando o contraste local em nível de pixel.

Bordas e Sombras: Para "descolar" o vidro do fundo e definir sua forma, a Apple usa linhas de borda (strokes) de 1 pixel quase imperceptíveis ou sombras internas/externas muito suaves. Isso dá ao "vidro" uma "borda" física, completando a ilusão.

Resumo Intrínseco
O "visual liquid glass" da Apple não é um único efeito, mas uma interação sinérgica de quatro camadas:

Translucidez (Base): Permite que a luz e a cor do fundo entrem.

Desfoque (Distorção): Abstrai o fundo para garantir legibilidade.

Saturação (Vibrancy): Impede que as cores fiquem "enlameadas" e mantém a interface viva.

Adaptação de Contraste (Vibrancy): Ajusta dinamicamente o brilho do vidro e do texto para garantir que o conteúdo esteja sempre legível, não importa o fundo.

O resultado é uma interface que parece leve, contextual, profundamente integrada ao ambiente do usuário e, acima de tudo, perfeitamente funcional e legível.
-
Ou caso tente um design mais ousado:
Para uma UI com transparência muito alta e uma distorção "ácida" e estilizada funcionar, você precisa abandonar a ideia de que a interface deve ser "calma". Ela será intencionalmente "ruidosa". A legibilidade não virá de um fundo suave (como no design da Apple), mas sim de um contraste extremo e de uma separação de camadas muito deliberada.

Aqui está como essa UI deveria ser estruturada:

1. O Paradigma de Três Camadas (A Estrutura)
Você não pode simplesmente colocar texto em cima de um vidro altamente transparente e distorcido. Seria um caos ilegível. A solução é uma hierarquia de três camadas:

Camada 1: O Fundo (O Contexto)

É o que está atrás da sua aplicação (o papel de parede, outras janelas).

Ele será altamente visível, então o usuário sempre verá o que está atrás.

Camada 2: O "Vidro Ácido" (A Textura)

Esta é a sua camada base de UI. Ela tem alta transparência (ex: 70-80% transparente, oposto dos 10-20% da Apple).

É aqui que vive a distorção estilizada.

Sua única função é texturizar a janela e separá-la do fundo, mas não garantir a legibilidade do conteúdo.

Camada 3: As "Ilhas de Conteúdo" (A Legibilidade)

Esta é a camada mais importante. São "placas" ou "ilhas" 100% opacas (ou quase opacas) que flutuam sobre o "Vidro Ácido".

Todo o conteúdo legível (texto, ícones principais, botões) vive apenas nessas ilhas.

Imagine uma janela de vidro distorcido (Camada 2) com pedaços de papel preto fosco (Camada 3) colados nela. O texto vai no papel, não no vidro.

2. A Distorção "Ácida" (A Estética)
A distorção "planejada" e "ácida" não seria um simples Gaussian Blur. Seria um shader complexo. Em vez de suavizar, ela iria decompor a imagem do fundo.

Refração (Distorção de Lente): Em vez de desfocar, o vidro age como uma lente irregular. As linhas retas do fundo (como a borda de outra janela) pareceriam curvadas ou quebradas ao passar pelo seu "vidro".

Aberração Cromática: Este é o efeito "ácido" chave. A distorção "separa" os canais de cor (Vermelho, Verde, Azul) da imagem de fundo. O resultado são franjas de cor neon (ciano, magenta, amarelo) nas bordas de alto contraste do fundo.

Ruído (Noise/Grain): A distorção não seria limpa; ela adicionaria uma camada de granulação ou ruído estático, dando uma textura "digital" ou "analógica" (como uma fita VHS).

Baixo Nível de Desfoque: Um desfoque muito leve poderia ser usado, apenas para evitar que o fundo fique perfeitamente nítido, mas o foco principal seria a refração e a aberração.

3. O Contraste "Planejado" (A Usabilidade)
Como o fundo é caótico (Camada 2), o conteúdo (Camada 3) deve ser o oposto: hiper-minimalista e de contraste extremo.

Tipografia e Cor:

Monocromático: O texto e os ícones nas "Ilhas de Conteúdo" devem ser quase que exclusivamente preto puro ou branco puro (dependendo da cor da ilha).

Sem Tons Médios: Evite cinzas. O contraste deve ser absoluto para se destacar contra o fundo "ácido".

Tipografia "Bruta": Fontes monoespaçadas (como Roboto Mono ou Fira Code) ou sans-serif geométricas e grossas (heavy) funcionam bem. Elas sinalizam "informação" contra um fundo "artístico".

Zonas de Foco (O "Planejamento"):

A distorção não deve ser uniforme. Ela deve ser planejada para guiar o olho.

Zonas de Efeito (Margens): As bordas da janela (o "chrome" da UI) teriam a distorção "ácida" mais forte e visível.

Zonas de Calmaria (Centro): As "Ilhas de Conteúdo" centrais, onde o usuário está lendo ou trabalhando, seriam 100% opacas, bloqueando completamente a distorção. A legibilidade aqui é soberana.

Feedback Interativo (A Reação):

O design "ácido" permite microinterações fantásticas.

Hover (Passar o Mouse): Quando você passa o mouse sobre um botão na "Ilha de Conteúdo", a distorção no "Vidro Ácido" ao redor do botão pode se intensificar, vibrar ou mudar de cor (aumentar a aberração cromática).

Foco da Janela: Quando a janela está ativa, a distorção "ácida" pulsa suavemente. Quando está inativa, a distorção diminui ou congela.

# Pear button
''''
import React from 'react';
import styled from 'styled-components';

const Button = () => {
  return (
    <StyledWrapper>
      <button className="button">
        <div className="wrap">
          <p>
            <span>✧</span>
            <span>✦</span>
            Pearl Button
          </p>
        </div>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .button {
    --white: #ffe7ff;
    --bg: #080808;
    --radius: 100px;
    outline: none;
    cursor: pointer;
    border: 0;
    position: relative;
    border-radius: var(--radius);
    background-color: var(--bg);
    transition: all 0.2s ease;
    box-shadow:
      inset 0 0.3rem 0.9rem rgba(255, 255, 255, 0.3),
      inset 0 -0.1rem 0.3rem rgba(0, 0, 0, 0.7),
      inset 0 -0.4rem 0.9rem rgba(255, 255, 255, 0.5),
      0 3rem 3rem rgba(0, 0, 0, 0.3),
      0 1rem 1rem -0.6rem rgba(0, 0, 0, 0.8);
  }
  .button .wrap {
    font-size: 25px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.7);
    padding: 32px 45px;
    border-radius: inherit;
    position: relative;
    overflow: hidden;
  }
  .button .wrap p span:nth-child(2) {
    display: none;
  }
  .button:hover .wrap p span:nth-child(1) {
    display: none;
  }
  .button:hover .wrap p span:nth-child(2) {
    display: inline-block;
  }
  .button .wrap p {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 0;
    transition: all 0.2s ease;
    transform: translateY(2%);
    mask-image: linear-gradient(to bottom, white 40%, transparent);
  }
  .button .wrap::before,
  .button .wrap::after {
    content: "";
    position: absolute;
    transition: all 0.3s ease;
  }
  .button .wrap::before {
    left: -15%;
    right: -15%;
    bottom: 25%;
    top: -100%;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.12);
  }
  .button .wrap::after {
    left: 6%;
    right: 6%;
    top: 12%;
    bottom: 40%;
    border-radius: 22px 22px 0 0;
    box-shadow: inset 0 10px 8px -10px rgba(255, 255, 255, 0.8);
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.3) 0%,
      rgba(0, 0, 0, 0) 50%,
      rgba(0, 0, 0, 0) 100%
    );
  }
  .button:hover {
    box-shadow:
      inset 0 0.3rem 0.5rem rgba(255, 255, 255, 0.4),
      inset 0 -0.1rem 0.3rem rgba(0, 0, 0, 0.7),
      inset 0 -0.4rem 0.9rem rgba(255, 255, 255, 0.7),
      0 3rem 3rem rgba(0, 0, 0, 0.3),
      0 1rem 1rem -0.6rem rgba(0, 0, 0, 0.8);
  }
  .button:hover .wrap::before {
    transform: translateY(-5%);
  }
  .button:hover .wrap::after {
    opacity: 0.4;
    transform: translateY(5%);
  }
  .button:hover .wrap p {
    transform: translateY(-4%);
  }
  .button:active {
    transform: translateY(4px);
    box-shadow:
      inset 0 0.3rem 0.5rem rgba(255, 255, 255, 0.5),
      inset 0 -0.1rem 0.3rem rgba(0, 0, 0, 0.8),
      inset 0 -0.4rem 0.9rem rgba(255, 255, 255, 0.4),
      0 3rem 3rem rgba(0, 0, 0, 0.3),
      0 1rem 1rem -0.6rem rgba(0, 0, 0, 0.8);
  }`;

export default Button;
''''

# GLOW AND BUTTON
''''
import React from 'react';
import styled from 'styled-components';

const Button = () => {
  return (
    <StyledWrapper>
      <button className="shadow__btn">
        uiverse
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .shadow__btn {
    padding: 10px 20px;
    border: none;
    font-size: 17px;
    color: #fff;
    border-radius: 7px;
    letter-spacing: 4px;
    font-weight: 700;
    text-transform: uppercase;
    transition: 0.5s;
    transition-property: box-shadow;
  }

  .shadow__btn {
    background: rgb(0,140,255);
    box-shadow: 0 0 25px rgb(0,140,255);
  }

  .shadow__btn:hover {
    box-shadow: 0 0 5px rgb(0,140,255),
                0 0 25px rgb(0,140,255),
                0 0 50px rgb(0,140,255),
                0 0 100px rgb(0,140,255);
  }`;

export default Button;
''''
# SUPER GLOW AND BUTTON NEON
''''
import React from 'react';
import styled from 'styled-components';

const Button = () => {
  return (
    <StyledWrapper>
      <button> Button
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  button {
   --glow-color: rgb(217, 176, 255);
   --glow-spread-color: rgba(191, 123, 255, 0.781);
   --enhanced-glow-color: rgb(231, 206, 255);
   --btn-color: rgb(100, 61, 136);
   border: .25em solid var(--glow-color);
   padding: 1em 3em;
   color: var(--glow-color);
   font-size: 15px;
   font-weight: bold;
   background-color: var(--btn-color);
   border-radius: 1em;
   outline: none;
   box-shadow: 0 0 1em .25em var(--glow-color),
          0 0 4em 1em var(--glow-spread-color),
          inset 0 0 .75em .25em var(--glow-color);
   text-shadow: 0 0 .5em var(--glow-color);
   position: relative;
   transition: all 0.3s;
  }

  button::after {
   pointer-events: none;
   content: "";
   position: absolute;
   top: 120%;
   left: 0;
   height: 100%;
   width: 100%;
   background-color: var(--glow-spread-color);
   filter: blur(2em);
   opacity: .7;
   transform: perspective(1.5em) rotateX(35deg) scale(1, .6);
  }

  button:hover {
   color: var(--btn-color);
   background-color: var(--glow-color);
   box-shadow: 0 0 1em .25em var(--glow-color),
          0 0 4em 2em var(--glow-spread-color),
          inset 0 0 .75em .25em var(--glow-color);
  }

  button:active {
   box-shadow: 0 0 0.6em .25em var(--glow-color),
          0 0 2.5em 2em var(--glow-spread-color),
          inset 0 0 .5em .25em var(--glow-color);
  }`;

export default Button;
''''
# THE BUTTON WITH PERFECT GRADIENT COMPOSITION AND ANIMATION
''''
import React from 'react';
import styled from 'styled-components';

const Button = () => {
  return (
    <StyledWrapper>
      <button className="uiverse">
        <div className="wrapper">
          <span>UIVERSE</span>
          <div className="circle circle-12" />
          <div className="circle circle-11" />
          <div className="circle circle-10" />
          <div className="circle circle-9" />
          <div className="circle circle-8" />
          <div className="circle circle-7" />
          <div className="circle circle-6" />
          <div className="circle circle-5" />
          <div className="circle circle-4" />
          <div className="circle circle-3" />
          <div className="circle circle-2" />
          <div className="circle circle-1" />
        </div>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .uiverse {
    --duration: 7s;
    --easing: linear;
    --c-color-1: rgba(26, 163, 255, .7);
   /* Changed color */
    --c-color-2: #1aff1a;
   /* Changed color */
    --c-color-3: #ff1a75;
   /* Changed color */
    --c-color-4: rgba(26, 232, 255, .7);
   /* Changed color */
    --c-shadow: rgba(87, 223, 255, .5);
   /* Changed color */
    --c-shadow-inset-top: rgba(52, 223, 255, .9);
   /* Changed color */
    --c-shadow-inset-bottom: rgba(215, 250, 255, .8);
   /* Changed color */
    --c-radial-inner: #15d2ff;
   /* Changed color */
    --c-radial-outer: #72faff;
   /* Changed color */
    --c-color: #fff;
    -webkit-tap-highlight-color: transparent;
    -webkit-appearance: none;
    outline: none;
    position: relative;
    cursor: pointer;
    border: none;
    display: table;
    border-radius: 24px;
    padding: 0;
    margin: 0;
    text-align: center;
    font-weight: 600;
    font-size: 16px;
    letter-spacing: 0.02em;
    line-height: 1.5;
    color: var(--c-color);
    background: radial-gradient(circle, var(--c-radial-inner), var(--c-radial-outer) 80%);
    box-shadow: 0 0 14px var(--c-shadow);
  }

  .uiverse:before {
    content: '';
    pointer-events: none;
    position: absolute;
    z-index: 3;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    border-radius: 24px;
    box-shadow: inset 0 3px 12px var(--c-shadow-inset-top), inset 0 -3px 4px var(--c-shadow-inset-bottom);
  }

  .uiverse .wrapper {
    -webkit-mask-image: -webkit-radial-gradient(white, black);
    overflow: hidden;
    border-radius: 24px;
    min-width: 132px;
    padding: 12px 0;
  }

  .uiverse .wrapper span {
    display: inline-block;
    position: relative;
    z-index: 1;
  }

  .uiverse .wrapper .circle {
    position: absolute;
    left: 0;
    top: 0;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    filter: blur(var(--blur, 8px));
    background: var(--background, transparent);
    transform: translate(var(--x, 0), var(--y, 0)) translateZ(0);
    animation: var(--animation, none) var(--duration) var(--easing) infinite;
  }

  .uiverse .wrapper .circle.circle-1, .uiverse .wrapper .circle.circle-9, .uiverse .wrapper .circle.circle-10 {
    --background: var(--c-color-4);
  }

  .uiverse .wrapper .circle.circle-3, .uiverse .wrapper .circle.circle-4 {
    --background: var(--c-color-2);
    --blur: 14px;
  }

  .uiverse .wrapper .circle.circle-5, .uiverse .wrapper .circle.circle-6 {
    --background: var(--c-color-3);
    --blur: 16px;
  }

  .uiverse .wrapper .circle.circle-2, .uiverse .wrapper .circle.circle-7, .uiverse .wrapper .circle.circle-8, .uiverse .wrapper .circle.circle-11, .uiverse .wrapper .circle.circle-12 {
    --background: var(--c-color-1);
    --blur: 12px;
  }

  .uiverse .wrapper .circle.circle-1 {
    --x: 0;
    --y: -40px;
    --animation: circle-1;
  }

  .uiverse .wrapper .circle.circle-2 {
    --x: 92px;
    --y: 8px;
    --animation: circle-2;
  }

  .uiverse .wrapper .circle.circle-3 {
    --x: -12px;
    --y: -12px;
    --animation: circle-3;
  }

  .uiverse .wrapper .circle.circle-4 {
    --x: 80px;
    --y: -12px;
    --animation: circle-4;
  }

  .uiverse .wrapper .circle.circle-5 {
    --x: 12px;
    --y: -4px;
    --animation: circle-5;
  }

  .uiverse .wrapper .circle.circle-6 {
    --x: 56px;
    --y: 16px;
    --animation: circle-6;
  }

  .uiverse .wrapper .circle.circle-7 {
    --x: 8px;
    --y: 28px;
    --animation: circle-7;
  }

  .uiverse .wrapper .circle.circle-8 {
    --x: 28px;
    --y: -4px;
    --animation: circle-8;
  }

  .uiverse .wrapper .circle.circle-9 {
    --x: 20px;
    --y: -12px;
    --animation: circle-9;
  }

  .uiverse .wrapper .circle.circle-10 {
    --x: 64px;
    --y: 16px;
    --animation: circle-10;
  }

  .uiverse .wrapper .circle.circle-11 {
    --x: 4px;
    --y: 4px;
    --animation: circle-11;
  }

  .uiverse .wrapper .circle.circle-12 {
    --blur: 14px;
    --x: 52px;
    --y: 4px;
    --animation: circle-12;
  }

  @keyframes circle-1 {
    33% {
      transform: translate(0px, 16px) translateZ(0);
    }

    66% {
      transform: translate(12px, 64px) translateZ(0);
    }
  }

  @keyframes circle-2 {
    33% {
      transform: translate(80px, -10px) translateZ(0);
    }

    66% {
      transform: translate(72px, -48px) translateZ(0);
    }
  }

  @keyframes circle-3 {
    33% {
      transform: translate(20px, 12px) translateZ(0);
    }

    66% {
      transform: translate(12px, 4px) translateZ(0);
    }
  }

  @keyframes circle-4 {
    33% {
      transform: translate(76px, -12px) translateZ(0);
    }

    66% {
      transform: translate(112px, -8px) translateZ(0);
    }
  }

  @keyframes circle-5 {
    33% {
      transform: translate(84px, 28px) translateZ(0);
    }

    66% {
      transform: translate(40px, -32px) translateZ(0);
    }
  }

  @keyframes circle-6 {
    33% {
      transform: translate(28px, -16px) translateZ(0);
    }

    66% {
      transform: translate(76px, -56px) translateZ(0);
    }
  }

  @keyframes circle-7 {
    33% {
      transform: translate(8px, 28px) translateZ(0);
    }

    66% {
      transform: translate(20px, -60px) translateZ(0);
    }
  }

  @keyframes circle-8 {
    33% {
      transform: translate(32px, -4px) translateZ(0);
    }

    66% {
      transform: translate(56px, -20px) translateZ(0);
    }
  }

  @keyframes circle-9 {
    33% {
      transform: translate(20px, -12px) translateZ(0);
    }

    66% {
      transform: translate(80px, -8px) translateZ(0);
    }
  }

  @keyframes circle-10 {
    33% {
      transform: translate(68px, 20px) translateZ(0);
    }

    66% {
      transform: translate(100px, 28px) translateZ(0);
    }
  }

  @keyframes circle-11 {
    33% {
      transform: translate(4px, 4px) translateZ(0);
    }

    66% {
      transform: translate(68px, 20px) translateZ(0);
    }
  }

  @keyframes circle-12 {
    33% {
      transform: translate(56px, 0px) translateZ(0);
    }

    66% {
      transform: translate(60px, -32px) translateZ(0);
    }
  }`;

export default Button;
''''


# ACID LIQUID GLASS GUIDE

Para uma UI com transparência muito alta e uma distorção "ácida" e estilizada funcionar, você precisa abandonar a ideia de que a interface deve ser "calma". Ela será intencionalmente "ruidosa". A legibilidade não virá de um fundo suave (como no design da Apple), mas sim de um contraste extremo e de uma separação de camadas muito deliberada.

Aqui está como essa UI deveria ser estruturada:

1. O Paradigma de Três Camadas (A Estrutura)
Você não pode simplesmente colocar texto em cima de um vidro altamente transparente e distorcido. Seria um caos ilegível. A solução é uma hierarquia de três camadas:

Camada 1: O Fundo (O Contexto)

É o que está atrás da sua aplicação (o papel de parede, outras janelas).

Ele será altamente visível, então o usuário sempre verá o que está atrás.

Camada 2: O "Vidro Ácido" (A Textura)

Esta é a sua camada base de UI. Ela tem alta transparência (ex: 70-80% transparente, oposto dos 10-20% da Apple).

É aqui que vive a distorção estilizada.

Sua única função é texturizar a janela e separá-la do fundo, mas não garantir a legibilidade do conteúdo.

Camada 3: As "Ilhas de Conteúdo" (A Legibilidade)

Esta é a camada mais importante. São "placas" ou "ilhas" 100% opacas (ou quase opacas) que flutuam sobre o "Vidro Ácido".

Todo o conteúdo legível (texto, ícones principais, botões) vive apenas nessas ilhas.

Imagine uma janela de vidro distorcido (Camada 2) com pedaços de papel preto fosco (Camada 3) colados nela. O texto vai no papel, não no vidro.

2. A Distorção "Ácida" (A Estética)
A distorção "planejada" e "ácida" não seria um simples Gaussian Blur. Seria um shader complexo. Em vez de suavizar, ela iria decompor a imagem do fundo.

Refração (Distorção de Lente): Em vez de desfocar, o vidro age como uma lente irregular. As linhas retas do fundo (como a borda de outra janela) pareceriam curvadas ou quebradas ao passar pelo seu "vidro".

Aberração Cromática: Este é o efeito "ácido" chave. A distorção "separa" os canais de cor (Vermelho, Verde, Azul) da imagem de fundo. O resultado são franjas de cor neon (ciano, magenta, amarelo) nas bordas de alto contraste do fundo.

Ruído (Noise/Grain): A distorção não seria limpa; ela adicionaria uma camada de granulação ou ruído estático, dando uma textura "digital" ou "analógica" (como uma fita VHS).

Baixo Nível de Desfoque: Um desfoque muito leve poderia ser usado, apenas para evitar que o fundo fique perfeitamente nítido, mas o foco principal seria a refração e a aberração.

3. O Contraste "Planejado" (A Usabilidade)
Como o fundo é caótico (Camada 2), o conteúdo (Camada 3) deve ser o oposto: hiper-minimalista e de contraste extremo.

Tipografia e Cor:

Monocromático: O texto e os ícones nas "Ilhas de Conteúdo" devem ser quase que exclusivamente preto puro ou branco puro (dependendo da cor da ilha).

Sem Tons Médios: Evite cinzas. O contraste deve ser absoluto para se destacar contra o fundo "ácido".

Tipografia "Bruta": Fontes monoespaçadas (como Roboto Mono ou Fira Code) ou sans-serif geométricas e grossas (heavy) funcionam bem. Elas sinalizam "informação" contra um fundo "artístico".

Zonas de Foco (O "Planejamento"):

A distorção não deve ser uniforme. Ela deve ser planejada para guiar o olho.

Zonas de Efeito (Margens): As bordas da janela (o "chrome" da UI) teriam a distorção "ácida" mais forte e visível.

Zonas de Calmaria (Centro): As "Ilhas de Conteúdo" centrais, onde o usuário está lendo ou trabalhando, seriam 100% opacas, bloqueando completamente a distorção. A legibilidade aqui é soberana.

Feedback Interativo (A Reação):

O design "ácido" permite microinterações fantásticas.

Hover (Passar o Mouse): Quando você passa o mouse sobre um botão na "Ilha de Conteúdo", a distorção no "Vidro Ácido" ao redor do botão pode se intensificar, vibrar ou mudar de cor (aumentar a aberração cromática).

Foco da Janela: Quando a janela está ativa, a distorção "ácida" pulsa suavemente. Quando está inativa, a distorção diminui ou congela.