/**
 * HTML Content Extractor
 * 
 * Utilitário para extrair e converter conteúdo de arquivos HTML
 * para o formato React usado no L2 EDUCA
 */

/**
 * Extrai fórmulas matemáticas do HTML
 * Suporta notações: $...$ (inline), $$...$$ (block), \(...\), \[...\]
 */
export function extractMathFormulas(htmlContent) {
  const formulas = {
    inline: [],
    block: []
  };

  // Padrões de busca para fórmulas
  const patterns = {
    dollarInline: /\$([^\$]+)\$/g,
    dollarBlock: /\$\$([^\$]+)\$\$/g,
    parenInline: /\\\((.+?)\\\)/g,
    bracketBlock: /\\\[(.+?)\\\]/gs
  };

  // Extrair fórmulas inline ($...$)
  let match;
  while ((match = patterns.dollarInline.exec(htmlContent)) !== null) {
    formulas.inline.push({
      original: match[0],
      formula: match[1].trim(),
      type: 'dollar'
    });
  }

  // Extrair fórmulas block ($$...$$)
  while ((match = patterns.dollarBlock.exec(htmlContent)) !== null) {
    formulas.block.push({
      original: match[0],
      formula: match[1].trim(),
      type: 'dollar'
    });
  }

  // Extrair fórmulas inline (\(...\))
  while ((match = patterns.parenInline.exec(htmlContent)) !== null) {
    formulas.inline.push({
      original: match[0],
      formula: match[1].trim(),
      type: 'paren'
    });
  }

  // Extrair fórmulas block (\[...\])
  while ((match = patterns.bracketBlock.exec(htmlContent)) !== null) {
    formulas.block.push({
      original: match[0],
      formula: match[1].trim(),
      type: 'bracket'
    });
  }

  return formulas;
}

/**
 * Extrai estrutura de seções do HTML
 * Identifica títulos (h1-h6) e organiza hierarquicamente
 */
export function extractSections(htmlContent) {
  const sections = [];
  const parser = new DOMParser();
  
  // Criar documento virtual (se no navegador)
  if (typeof DOMParser !== 'undefined') {
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');

    headings.forEach((heading, index) => {
      sections.push({
        id: `section-${index}`,
        level: parseInt(heading.tagName[1]),
        title: heading.textContent.trim(),
        content: getContentUntilNextHeading(heading)
      });
    });
  }

  return sections;
}

/**
 * Helper: Captura conteúdo até o próximo heading
 */
function getContentUntilNextHeading(element) {
  let content = '';
  let sibling = element.nextElementSibling;

  while (sibling && !/^H[1-6]$/.test(sibling.tagName)) {
    content += sibling.outerHTML || sibling.textContent;
    sibling = sibling.nextElementSibling;
  }

  return content;
}

/**
 * Converte HTML inline para JSX
 * Remove tags problemáticas e ajusta sintaxe
 */
export function htmlToJSX(htmlString) {
  let jsx = htmlString;

  // Ajustes de atributos HTML → JSX
  jsx = jsx.replace(/class=/g, 'className=');
  jsx = jsx.replace(/for=/g, 'htmlFor=');
  jsx = jsx.replace(/<!--.*?-->/gs, ''); // Remove comentários

  // Converter estilos inline
  jsx = jsx.replace(/style="([^"]*)"/g, (match, styleString) => {
    const styleObj = styleString.split(';')
      .filter(s => s.trim())
      .map(s => {
        const [key, value] = s.split(':').map(p => p.trim());
        const camelKey = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
        return `${camelKey}: '${value}'`;
      })
      .join(', ');
    return `style={{${styleObj}}}`;
  });

  // Fechar tags auto-fechantes
  jsx = jsx.replace(/<br>/g, '<br />');
  jsx = jsx.replace(/<hr>/g, '<hr />');
  jsx = jsx.replace(/<img([^>]*)>/g, '<img$1 />');

  return jsx;
}

/**
 * Identifica e extrai código de exemplos
 */
export function extractCodeBlocks(htmlContent) {
  const codeBlocks = [];
  
  // Padrões para identificar blocos de código
  const patterns = [
    /<pre><code[^>]*>(.*?)<\/code><\/pre>/gs,
    /<pre>(.*?)<\/pre>/gs,
    /<code>(.*?)<\/code>/g
  ];

  patterns.forEach((pattern, index) => {
    let match;
    while ((match = pattern.exec(htmlContent)) !== null) {
      codeBlocks.push({
        type: index === 2 ? 'inline' : 'block',
        code: match[1].trim(),
        language: extractLanguage(match[0])
      });
    }
  });

  return codeBlocks;
}

/**
 * Helper: Tenta identificar linguagem do código
 */
function extractLanguage(codeTag) {
  const langMatch = codeTag.match(/class="language-(\w+)"/);
  return langMatch ? langMatch[1] : 'text';
}

/**
 * Extrai metadados do documento HTML
 */
export function extractMetadata(htmlContent) {
  const metadata = {
    title: '',
    description: '',
    subject: '',
    keywords: []
  };

  // Extrair título
  const titleMatch = htmlContent.match(/<title>(.*?)<\/title>/i);
  if (titleMatch) {
    metadata.title = titleMatch[1].trim();
  }

  // Extrair meta description
  const descMatch = htmlContent.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
  if (descMatch) {
    metadata.description = descMatch[1].trim();
  }

  // Extrair keywords
  const keywordsMatch = htmlContent.match(/<meta\s+name="keywords"\s+content="([^"]*)"/i);
  if (keywordsMatch) {
    metadata.keywords = keywordsMatch[1].split(',').map(k => k.trim());
  }

  // Tentar identificar disciplina
  const subjectPatterns = {
    'Matemática': /matemática|math|geometria|álgebra|cálculo/i,
    'Física': /física|physics|mecânica|termodinâmica|eletricidade/i,
    'Química': /química|chemistry|orgânica|inorgânica|reações/i,
    'Biologia': /biologia|biology|celular|genética|ecologia/i,
    'História': /história|history|idade média|renascimento/i,
    'Filosofia': /filosofia|philosophy|helenística|maquiavel/i,
    'Português': /português|linguagem|gramática|pronomes/i,
    'Geografia': /geografia|geography/i,
    'Sociologia': /sociologia|sociology/i,
    'Literatura': /literatura|literature|literário/i,
    'Inglês': /inglês|english/i,
    'Artes': /artes|arts|artístico/i
  };

  for (const [subject, pattern] of Object.entries(subjectPatterns)) {
    if (pattern.test(htmlContent)) {
      metadata.subject = subject;
      break;
    }
  }

  return metadata;
}

/**
 * Extrai imagens e seus atributos
 */
export function extractImages(htmlContent) {
  const images = [];
  const imgPattern = /<img[^>]+src="([^"]*)"[^>]*>/g;
  let match;

  while ((match = imgPattern.exec(htmlContent)) !== null) {
    const imgTag = match[0];
    const src = match[1];
    
    // Extrair alt e outros atributos
    const altMatch = imgTag.match(/alt="([^"]*)"/);
    const widthMatch = imgTag.match(/width="([^"]*)"/);
    const heightMatch = imgTag.match(/height="([^"]*)"/);

    images.push({
      src,
      alt: altMatch ? altMatch[1] : '',
      width: widthMatch ? widthMatch[1] : null,
      height: heightMatch ? heightMatch[1] : null,
      needsConversion: src.startsWith('data:') || src.includes('base64')
    });
  }

  return images;
}

/**
 * Remove CSS/JS scripts do HTML para limpar conteúdo
 */
export function cleanHTML(htmlContent) {
  let clean = htmlContent;

  // Remover scripts
  clean = clean.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  
  // Remover styles inline
  clean = clean.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
  
  // Remover comentários
  clean = clean.replace(/<!--.*?-->/gs, '');

  return clean;
}

/**
 * Gera template de componente React a partir do HTML extraído
 */
export function generateReactComponent(data) {
  const { title, sections, formulas, metadata } = data;
  
  const componentName = title
    .replace(/[^a-zA-Z0-9]/g, '')
    .replace(/^./, str => str.toUpperCase());

  return `import React from 'react';
import NavigationBar from '../components/NavigationBar';
import GlassCard from '../components/GlassCard';
import ScrollReveal from '../components/ScrollReveal';
import Footer from '../components/Footer';
import MathFormula from '../components/MathFormula';
import './${componentName}.css';

const ${componentName} = () => {
  const sections = ${JSON.stringify(sections, null, 2)};

  return (
    <div className="${componentName.toLowerCase()}-page">
      <NavigationBar />

      {/* Breadcrumb */}
      <div className="breadcrumb">
        <button onClick={() => window.history.back()} className="breadcrumb-link">
          <span className="material-icons">arrow_back</span>
          Voltar
        </button>
      </div>

      {/* Hero Section */}
      <div className="hero-section">
        <ScrollReveal>
          <h1 className="page-title">${title}</h1>
          ${metadata.description ? `<p className="page-subtitle">${metadata.description}</p>` : ''}
        </ScrollReveal>
      </div>

      {/* Content Sections */}
      <div className="content-container">
        {sections.map((section, index) => (
          <ScrollReveal key={section.id} delay={index * 100}>
            <GlassCard>
              <h2 className="section-title">{section.title}</h2>
              <div className="section-content" dangerouslySetInnerHTML={{ __html: section.content }} />
            </GlassCard>
          </ScrollReveal>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default ${componentName};
`;
}

/**
 * Função principal de extração
 * Orquestra todas as funções de extração
 */
export async function extractContent(htmlFilePath) {
  try {
    // Em ambiente Node.js, usar fs para ler arquivo
    // Em navegador, usar fetch
    let htmlContent;
    
    if (typeof window === 'undefined') {
      // Node.js
      const fs = await import('fs');
      htmlContent = fs.readFileSync(htmlFilePath, 'utf-8');
    } else {
      // Browser
      const response = await fetch(htmlFilePath);
      htmlContent = await response.text();
    }

    // Limpar HTML
    const cleanedHTML = cleanHTML(htmlContent);

    // Extrair todos os componentes
    const extracted = {
      metadata: extractMetadata(htmlContent),
      sections: extractSections(cleanedHTML),
      formulas: extractMathFormulas(cleanedHTML),
      codeBlocks: extractCodeBlocks(cleanedHTML),
      images: extractImages(cleanedHTML),
      rawHTML: cleanedHTML
    };

    return extracted;
  } catch (error) {
    console.error('Erro ao extrair conteúdo:', error);
    throw error;
  }
}

/**
 * Exportar todas as funções
 */
export default {
  extractContent,
  extractMathFormulas,
  extractSections,
  extractCodeBlocks,
  extractImages,
  extractMetadata,
  htmlToJSX,
  cleanHTML,
  generateReactComponent
};

