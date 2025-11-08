import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { useChatbot } from '../contexts/ChatbotContext';
import { useNavigation } from '../contexts/NavigationContext';
import { useNotification } from '../contexts/NotificationContext';
import { SUBJECTS_CONFIG } from '../config/subjectsConfig';
import {
  fixMalformedTokens,
  stripTokens,
  extractTokens,
  parseNavigateToken,
  parseTopicToken,
  parseFollowUpToken,
  validateFollowUp
} from '../utils/chatbotTokens';
import { 
  isValidRoute, 
  validateRouteDetailed,
  validateNavigateToken 
} from '../utils/routeValidator';
import { ChunkAccumulator, cleanAIResponse } from '../utils/streamOptimizer';
import { useAIStreamingState } from '../hooks/useAIStreamingState';
import EnterpriseThinkingIndicator from './EnterpriseThinkingIndicator';
import './AIChatWidget.css';

// Icons (high-quality SVG components)
const SparkleIcon = ({ className = "h-6 w-6" }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    style={{ imageRendering: 'crisp-edges' }}
  >
    <path 
      fillRule="evenodd" 
      clipRule="evenodd"
      d="M9 1.5l1.25 4.5a3 3 0 002.25 2.25l4.5 1.25-4.5 1.25a3 3 0 00-2.25 2.25L9 18l-1.25-4.5a3 3 0 00-2.25-2.25L1 10l4.5-1.25a3 3 0 002.25-2.25L9 1.5zM19 3l.75 2.25a2.25 2.25 0 001.5 1.5L24 7.5l-2.75.75a2.25 2.25 0 00-1.5 1.5L19 12l-.75-2.25a2.25 2.25 0 00-1.5-1.5L14 7.5l2.75-.75a2.25 2.25 0 001.5-1.5L19 3z"
    />
  </svg>
);

const TrashIcon = ({ className = "h-5 w-5" }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ imageRendering: 'crisp-edges' }}
  >
    <path d="M3 6h18" />
    <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6" />
    <path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" />
    <path d="M10 11v6" />
    <path d="M14 11v6" />
  </svg>
);

const SendIcon = ({ className = "h-5 w-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
);

const XIcon = ({ className = "h-6 w-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const ArrowRightIcon = ({ className = "h-5 w-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
  </svg>
);

// Material Icons mapper
const getMaterialIconSvg = (iconName) => {
  const icons = {
    functions: <svg className="inline-block w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"/></svg>,
    quiz: <svg className="inline-block w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/></svg>,
    book: <svg className="inline-block w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/></svg>,
    arrow_forward: <svg className="inline-block w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>,
    play_arrow: <svg className="inline-block w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>,
    science: <svg className="inline-block w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M13 11.33L18 18H6l5-6.67V6h2m2-2H9v7.5L4 18v2h16v-2l-5-6.5V4z"/></svg>,
    calculate: <svg className="inline-block w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5.97 4.06L14.09 6l1.41 1.41L16.91 6l1.06 1.06-1.41 1.41 1.41 1.41-1.06 1.06-1.41-1.4-1.41 1.41-1.06-1.06 1.41-1.41-1.41-1.42zm-6.78.66h5v1.5h-5v-1.5zM11.5 16h-5v-1.5h5V16zm6.5 1.25h-1.75V19h-1.5v-1.75H13v-1.5h1.75V14h1.5v1.75H18v1.5z"/></svg>,
    analytics: <svg className="inline-block w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>
  };
  return icons[iconName] || icons.arrow_forward;
};

// Initial suggestions based on context
const getInitialSuggestions = (currentSubject, currentTopic) => {
  if (currentTopic) {
    return [
      `Me explique ${currentTopic.title || currentTopic.name} de forma simples`,
      `Quais são os pontos mais importantes para o ENEM sobre este tópico?`
    ];
  }
  
  if (currentSubject) {
    return [
      `Quais tópicos de ${currentSubject.name} são essenciais para o ENEM?`,
      `Por onde devo começar a estudar ${currentSubject.name}?`
    ];
  }
  
  return [
    'Qual matéria devo priorizar para o ENEM?',
    'Como organizar meu tempo de estudo de forma eficiente?'
  ];
};

export function AIChatWidget() {
  const {
    messages,
    setMessages,
    isOpen,
    openChat,
    closeChat,
    clearCurrentChat,
    clearAllChats,
    currentContext,
    apiConfig,
    getConversation,
    isApiConfigured,
    isTransitioning,
    hasHistory
  } = useChatbot();
  
  const { navigateWithTransition, currentSubject, currentTopic } = useNavigation();
  const { showNotification } = useNotification();
  
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [followUp, setFollowUp] = useState('');
  const [showInitialSuggestions, setShowInitialSuggestions] = useState(true);
  const [showClearMenu, setShowClearMenu] = useState(false);
  const [completedMessageId, setCompletedMessageId] = useState(null);
  const [streamingContent, setStreamingContent] = useState(''); // For smooth streaming
  const [isStreamingActive, setIsStreamingActive] = useState(false);
  
  // ENTERPRISE-LEVEL AI State Management
  const lastMessage = messages[messages.length - 1];
  const aiStreamState = useAIStreamingState(loading, messages, lastMessage);
  
  const logRef = useRef(null);
  const savedScrollPosition = useRef(0);
  const lastMessageCountRef = useRef(messages.length);
  const hasScrolledForCurrentStream = useRef(false);
  const wasStreamingRef = useRef(false);
  
  // Key rotation state for seamless failover
  const keyStateRef = useRef(apiConfig.apiKeys.map(k => ({ key: k, cooldownUntil: 0, invalid: false })));
  const lastKeyIndexRef = useRef(0);
  
  const KEY_RATE_LIMIT_COOLDOWN_MS = 65 * 60 * 1000; // 65 minutes
  const KEY_TEMP_FAILURE_COOLDOWN_MS = 60 * 1000; // 60 seconds
  
  // Update key pool when config changes
  useEffect(() => {
    keyStateRef.current = apiConfig.apiKeys.map(k => ({ key: k, cooldownUntil: 0, invalid: false }));
  }, [apiConfig.apiKeys]);
  
  // Get initial suggestions based on context
  const initialSuggestions = useMemo(
    () => getInitialSuggestions(currentSubject, currentTopic),
    [currentSubject, currentTopic]
  );
  
  // Handle smooth close animation
  const handleClose = () => {
    if (logRef.current) {
      savedScrollPosition.current = logRef.current.scrollTop;
    }
    setIsClosing(true);
    setTimeout(() => {
      closeChat();
      setIsClosing(false);
      setShowInitialSuggestions(true);
    }, 300);
  };
  
  // Handle mobile back button
  useEffect(() => {
    const handleBackButton = (e) => {
      if (isOpen && !isClosing) {
        e.preventDefault();
        handleClose();
        window.history.pushState(null, '', window.location.href);
      }
    };
    
    if (isOpen) {
      window.history.pushState(null, '', window.location.href);
      window.addEventListener('popstate', handleBackButton);
    }
    
    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, [isOpen, isClosing]);
  
  // Prevent background scroll when chat is open on mobile
  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    
    if (isOpen && isMobile) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);
  
  // Auto-scroll behavior
  useEffect(() => {
    if (isOpen && logRef.current && savedScrollPosition.current > 0) {
      setTimeout(() => {
        if (logRef.current) {
          logRef.current.scrollTop = savedScrollPosition.current;
        }
      }, 50);
    }
  }, [isOpen]);
  
  // Detect streaming completion for premium flash effect
  useEffect(() => {
    const lastMsg = messages[messages.length - 1];
    const isCurrentlyStreaming = loading && lastMsg?.role === 'assistant';
    
    // If was streaming and now stopped, trigger completion effect
    if (wasStreamingRef.current && !isCurrentlyStreaming && lastMsg?.role === 'assistant') {
      setCompletedMessageId(messages.length - 1);
      
      // Remove completed class after animation
      setTimeout(() => {
        setCompletedMessageId(null);
      }, 1000);
    }
    
    wasStreamingRef.current = isCurrentlyStreaming;
  }, [loading, messages]);
  
  useEffect(() => {
    if (!logRef.current) return;
    
    const isNewMessage = messages.length > lastMessageCountRef.current;
    const lastMsg = messages[messages.length - 1];
    const isStreaming = loading;
    const isAssistantStreaming = isStreaming && lastMsg?.role === 'assistant';
    
    if (isNewMessage) {
      hasScrolledForCurrentStream.current = false;
    }
    
    if (isOpen && isAssistantStreaming && !hasScrolledForCurrentStream.current) {
      logRef.current.scrollTo({
        top: logRef.current.scrollHeight,
        behavior: 'smooth'
      });
      hasScrolledForCurrentStream.current = true;
      savedScrollPosition.current = logRef.current.scrollHeight;
    }
    
    if (isOpen && isNewMessage && !isStreaming) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
      savedScrollPosition.current = logRef.current.scrollHeight;
    }
    
    lastMessageCountRef.current = messages.length;
  }, [messages, isOpen, loading]);
  
  // Extract and validate follow-up from last assistant message
  useEffect(() => {
    const last = messages[messages.length - 1];
    if (last && last.role === 'assistant' && typeof last.content === 'string') {
      const corrected = fixMalformedTokens(last.content);
      const fuMatch = corrected.match(/\[\[FOLLOW_UP:(.+?)\]\]/);
      if (fuMatch) {
        const rawText = fuMatch[1].trim();
        
        // Validate follow-up
        const validation = validateFollowUp(rawText);
        
        if (validation.valid) {
          setFollowUp(rawText);
        } else {
          console.warn(`❌ Invalid follow-up rejected: "${rawText}"`);
          console.warn(`   Reason: ${validation.reason}`);
          setFollowUp('');
        }
      } else {
        setFollowUp('');
      }
    }
  }, [messages]);
  
  // Pick next available API key
  const pickNextKeyIndex = () => {
    const now = Date.now();
    const meta = keyStateRef.current;
    const n = meta.length;
    for (let offset = 0; offset < n; offset++) {
      const idx = (lastKeyIndexRef.current + offset) % n;
      const m = meta[idx];
      if (!m) continue;
      if (m.invalid) continue;
      if (m.cooldownUntil && m.cooldownUntil > now) continue;
      return idx;
    }
    return -1;
  };
  
  const markKeyStatus = (idx, status) => {
    const meta = keyStateRef.current;
    if (!meta[idx]) return;
    if (status === 'invalid') meta[idx].invalid = true;
    if (typeof status === 'number') meta[idx].cooldownUntil = Date.now() + status;
  };
  
  // Render rich text with markdown and token buttons
  const renderRich = (text) => {
    const corrected = fixMalformedTokens(text);
    const tokens = extractTokens(corrected);
    
    // Remove tokens from text for display
    let displayText = stripTokens(corrected);
    
    // Process markdown
    const escapeHtml = (s) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    
    const processMarkdown = (txt) => {
      let result = escapeHtml(txt);
      // Handle code blocks (backticks)
      result = result.replace(/```(.+?)```/g, '<code class="chat-code-block">$1</code>');
      result = result.replace(/`(.+?)`/g, '<code class="chat-code-inline">$1</code>');
      // Handle bold and italic (with proper closing)
      result = result.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      result = result.replace(/\*(.+?)\*/g, '<em>$1</em>');
      // Clean up unpaired ** (asterisks without closing pair)
      result = result.replace(/\*\*/g, ''); // Remove any remaining **
      result = result.replace(/(?<!\S)\*(?!\S)/g, ''); // Remove standalone *
      return result;
    };
    
    const lines = displayText.split(/\n/);
    let html = '';
    let listOpen = false;
    
    const flushList = () => {
      if (listOpen) {
        html += '</ul>';
        listOpen = false;
      }
    };
    
    for (const raw of lines) {
      // Check for headings (## or ###)
      const h3Match = raw.match(/^###\s+(.+)/);
      const h2Match = raw.match(/^##\s+(.+)/);
      const listMatch = raw.match(/^\s*[-*•]\s+(.+)/);
      
      if (h3Match) {
        flushList();
        html += `<h3 class="chat-heading-3">${processMarkdown(h3Match[1])}</h3>`;
      } else if (h2Match) {
        flushList();
        html += `<h2 class="chat-heading-2">${processMarkdown(h2Match[1])}</h2>`;
      } else if (listMatch) {
        if (!listOpen) {
          html += '<ul class="chat-list">';
          listOpen = true;
        }
        html += `<li>${processMarkdown(listMatch[1])}</li>`;
      } else {
        flushList();
        const processed = processMarkdown(raw);
        if (processed.trim().length) {
          html += `<p>${processed}</p>`;
        } else {
          html += '<br />';
        }
      }
    }
    flushList();
    
    return { html, tokens };
  };
  
  // ============================================
  // LAYERED ROUTE VALIDATION SYSTEM
  // ============================================
  
  /**
   * Handle NAVIGATE button click with strict validation
   * Blocks invalid routes and shows user notification
   */
  const handleNavigate = (path, color = 'purple') => {
    console.log('🔍 Validating navigation to:', path);
    
    // Layer 1: Basic validation
    if (!path || typeof path !== 'string') {
      console.error('❌ BLOCKED: Invalid path type');
      showNotification('Erro: Link inválido detectado', 'error');
      return;
    }
    
    // Layer 2: Route existence validation
    const validation = validateRouteDetailed(path);
    
    if (!validation.isValid) {
      console.error('❌ BLOCKED: Route does not exist');
      console.error('📋 Attempted path:', path);
      console.error('💡 Error:', validation.error);
      
      if (validation.suggestions && validation.suggestions.length > 0) {
        console.log('💡 Did you mean:', validation.suggestions);
        showNotification(
          `Página "${path}" não encontrada. A IA pode ter sugerido um link incorreto.`,
          'error'
        );
      } else {
        showNotification(
          'Página não encontrada. A IA sugeriu um link inválido.',
          'error'
        );
      }
      
      // DO NOT navigate to invalid routes
      return;
    }
    
    // Layer 3: Navigation approved
    console.log('✅ APPROVED: Navigating to', path);
    navigateWithTransition(path, color);
    handleClose();
  };
  
  // Toggle clear menu
  const toggleClearMenu = () => {
    setShowClearMenu(prev => !prev);
  };
  
  // Handle clear current chat
  const handleClearCurrent = () => {
    clearCurrentChat();
    setShowClearMenu(false);
    setFollowUp('');
    setShowInitialSuggestions(true);
  };
  
  // Handle clear all chats
  const handleClearAll = () => {
    if (window.confirm('Tem certeza que deseja limpar TODAS as conversas de todos os tópicos?')) {
      clearAllChats();
      setShowClearMenu(false);
      setFollowUp('');
      setShowInitialSuggestions(true);
    }
  };
  
  // Close clear menu when clicking outside
  useEffect(() => {
    if (!showClearMenu) return;
    
    const handleClickOutside = (e) => {
      if (!e.target.closest('.ai-chat-clear-button') && !e.target.closest('.ai-chat-clear-menu')) {
        setShowClearMenu(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showClearMenu]);
  
  // Send message to AI
  const send = async (customQuery) => {
    const query = (customQuery || input).trim();
    if (!query || loading) return;
    
    // Prompt injection detection
    const injectionPatterns = [
      /\[\[.*?ignore.*?\]\]/i,
      /\[\[.*?system.*?prompt.*?\]\]/i,
      /ignore\s+(previous|earlier|all|above|prior)\s+(instructions?|prompts?|rules?)/i,
      /(you\s+are\s+now|now\s+you\s+are|você\s+agora\s+é)/i,
      /forget\s+(everything|all|previous)/i,
      /(esqueça|ignore)\s+(tudo|todas?|as\s+instruções)/i
    ];
    
    const isInjectionAttempt = injectionPatterns.some(pattern => pattern.test(query));
    
    setInput('');
    setShowInitialSuggestions(false);
    setMessages(m => [...m, { role: 'user', content: query }]);
    setFollowUp('');
    
    if (isInjectionAttempt) {
      setMessages(m => [
        ...m,
        {
          role: 'assistant',
          content: 'Sou seu assistente de estudos da L2 EDUCA. Como posso ajudar com seus estudos?\n\n[[FOLLOW_UP:Quero saber mais sobre as matérias disponíveis]]'
        }
      ]);
      return;
    }
    
    if (!isApiConfigured) {
      setMessages(m => [
        ...m,
        {
          role: 'assistant',
          content: '😊 Desculpe, o assistente está temporariamente indisponível.\n\nEstamos trabalhando para voltar logo! Por enquanto, você pode:\n\n📚 Explorar os conteúdos disponíveis no menu\n✏️ Resolver exercícios das matérias\n📖 Estudar os conceitos de cada tópico\n\nObrigado pela compreensão! 💙'
        }
      ]);
      return;
    }
    
    setLoading(true);
    
    const streamWithAvailableKey = async () => {
      const conversation = getConversation();
      conversation.push({ role: 'user', content: query });
      
      // Backend is only for authentication, NOT for chat
      // Chat goes directly to OpenRouter for better reliability
      if (false && apiConfig.backendUrl) {
        try {
          const response = await fetch(`${apiConfig.backendUrl}/api/chat/complete`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'text/event-stream' },
            body: JSON.stringify({ messages: conversation, stream: true })
          });
          
          if (response && response.status === 503) {
            try { await response.text(); } catch {}
          } else if (response && response.ok && response.body) {
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let full = '';
            let started = false;
            
            while (true) {
              const { value, done } = await reader.read();
              if (done) break;
              const chunk = decoder.decode(value, { stream: true });
              const lines = chunk.split('\n').filter(ln => ln.trim().startsWith('data:'));
              
              for (const ln of lines) {
                if (ln.includes('[DONE]')) continue;
                try {
                  const json = JSON.parse(ln.replace('data: ', ''));
                  const delta = json.choices?.[0]?.delta?.content || json.content || '';
                  if (delta) {
                    full += delta;
                    if (!started) {
                      started = true;
                      setMessages(m => [...m, { role: 'assistant', content: '' }]);
                    }
                    // Clean control tokens during streaming
                    const displayContent = full
                      .replace(/\[\]</g, '')
                      .replace(/\|\s*begin_of_sentence\s*\|\s*>/g, '')
                      .replace(/<\|.*?\|>/g, '')
                      .replace(/\[INST\].*?\[\/INST\]/g, '')
                      .replace(/<<SYS>>.*?<</g, '')
                      .replace(/\[\s*\]$/g, '')
                      // Remove think tags and reasoning artifacts
                      .replace(/<think>[\s\S]*?<\/think>/gi, '')
                      .replace(/<\/think>/gi, '')
                      .replace(/<think>/gi, '')
                      .replace(/\[think\][\s\S]*?\[\/think\]/gi, '')
                      // Remove @ prefix from URLs
                      .replace(/@(https?:\/\/)/g, '$1')
                      .replace(/@\//g, '/')
                      .trim();
                    
                    setMessages(m => {
                      const copy = [...m];
                      copy[copy.length - 1] = { role: 'assistant', content: displayContent };
                      return copy;
                    });
                  }
                } catch {}
              }
            }
            
            if (started) {
              // Clean up control tokens and finish
              const cleanContent = full
                .replace(/\[\]</g, '')
                .replace(/\|\s*begin_of_sentence\s*\|\s*>/g, '')
                .replace(/<\|.*?\|>/g, '')
                .replace(/\[INST\].*?\[\/INST\]/g, '')
                .replace(/<<SYS>>.*?<</g, '')
                .replace(/\[\s*\]$/g, '')
                // Remove think tags and reasoning artifacts
                .replace(/<think>[\s\S]*?<\/think>/gi, '')
                .replace(/<\/think>/gi, '')
                .replace(/<think>/gi, '')
                .replace(/\[think\][\s\S]*?\[\/think\]/gi, '')
                // Remove @ prefix from URLs
                .replace(/@(https?:\/\/)/g, '$1')
                .replace(/@\//g, '/')
                .trim();
              
              setMessages(m => {
                const copy = [...m];
                if (copy.length && copy[copy.length - 1].role === 'assistant') {
                  copy[copy.length - 1] = { role: 'assistant', content: cleanContent };
                }
                return copy;
              });
              return;
            }
          }
        } catch (err) {
          console.warn('Backend proxy failed, falling back to client keys:', err);
        }
      }
      
      // Fallback to client-side OpenRouter
      const sleep = (ms) => new Promise(r => setTimeout(r, ms));
      let safety = 0;
      
      while (true) {
        const keyIndex = pickNextKeyIndex();
        if (keyIndex === -1) {
          if (safety++ < 20) {
            await sleep(1500);
            continue;
          }
          throw new Error('no-available-keys');
        }
        
        const apiKey = apiConfig.apiKeys[keyIndex];
        
        try {
          const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${apiKey}`,
              'Content-Type': 'application/json',
              Accept: 'text/event-stream',
              'HTTP-Referer': `${window.location.protocol}//${window.location.host}`,
              'X-Title': 'L2 EDUCA | Assistente Educacional'
            },
            body: JSON.stringify({
              model: apiConfig.model,
              messages: conversation,
              stream: true
            })
          });
          
          if (!response.ok || !response.body) {
            const status = response.status;
            if (status === 401 || status === 403) markKeyStatus(keyIndex, KEY_TEMP_FAILURE_COOLDOWN_MS * 5);
            else if (status === 429) markKeyStatus(keyIndex, KEY_RATE_LIMIT_COOLDOWN_MS);
            else if ([500, 502, 503, 504].includes(status)) markKeyStatus(keyIndex, KEY_TEMP_FAILURE_COOLDOWN_MS);
            else markKeyStatus(keyIndex, KEY_TEMP_FAILURE_COOLDOWN_MS);
            lastKeyIndexRef.current = (keyIndex + 1) % apiConfig.apiKeys.length;
            continue;
          }
          
          lastKeyIndexRef.current = keyIndex;
          const reader = response.body.getReader();
          const decoder = new TextDecoder();
          let full = '';
          let started = false;
          
          while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split('\n').filter(ln => ln.trim().startsWith('data:'));
            
            for (const ln of lines) {
              if (ln.includes('[DONE]')) continue;
              try {
                const json = JSON.parse(ln.replace('data: ', ''));
                const delta = json.choices?.[0]?.delta?.content || '';
                if (delta) {
                  full += delta;
                  if (!started) {
                    started = true;
                    setMessages(m => [...m, { role: 'assistant', content: '' }]);
                  }
                  // Clean control tokens during streaming
                  const displayContent = full
                    .replace(/\[\]</g, '')
                    .replace(/\|\s*begin_of_sentence\s*\|\s*>/g, '')
                    .replace(/<\|.*?\|>/g, '')
                    .replace(/\[INST\].*?\[\/INST\]/g, '')
                    .replace(/<<SYS>>.*?<</g, '')
                    .replace(/\[\s*\]$/g, '')
                    // Remove think tags and reasoning artifacts
                    .replace(/<think>[\s\S]*?<\/think>/gi, '')
                    .replace(/<\/think>/gi, '')
                    .replace(/<think>/gi, '')
                    .replace(/\[think\][\s\S]*?\[\/think\]/gi, '')
                    // Remove @ prefix from URLs
                    .replace(/@(https?:\/\/)/g, '$1')
                    .replace(/@\//g, '/')
                    .trim();
                  
                  setMessages(m => {
                    const copy = [...m];
                    copy[copy.length - 1] = { role: 'assistant', content: displayContent };
                    return copy;
                  });
                }
              } catch {}
            }
          }
          
          // Clean up control tokens and finish
          const cleanContent = full
            .replace(/\[\]</g, '')
            .replace(/\|\s*begin_of_sentence\s*\|\s*>/g, '')
            .replace(/<\|.*?\|>/g, '')
            .replace(/\[INST\].*?\[\/INST\]/g, '')
            .replace(/<<SYS>>.*?<</g, '')
            .replace(/\[\s*\]$/g, '')
            // Remove think tags and reasoning artifacts
            .replace(/<think>[\s\S]*?<\/think>/gi, '')
            .replace(/<\/think>/gi, '')
            .replace(/<think>/gi, '')
            .replace(/\[think\][\s\S]*?\[\/think\]/gi, '')
            // Remove @ prefix from URLs
            .replace(/@(https?:\/\/)/g, '$1')
            .replace(/@\//g, '/')
            .trim();
          
          setMessages(m => {
            const copy = [...m];
            if (copy.length && copy[copy.length - 1].role === 'assistant') {
              copy[copy.length - 1] = { role: 'assistant', content: cleanContent };
            }
            return copy;
          });
          return;
        } catch (e) {
          markKeyStatus(keyIndex, KEY_TEMP_FAILURE_COOLDOWN_MS);
          lastKeyIndexRef.current = (keyIndex + 1) % apiConfig.apiKeys.length;
          continue;
        }
      }
    };
    
    try {
      await streamWithAvailableKey();
    } catch (e) {
      // Only log errors in development
      if (import.meta.env.DEV) {
        console.error('API error:', e);
      }
      
      // Friendly error message for production
      const errorMessage = '😊 Desculpe o incômodo!\n\nO servidor está em manutenção no momento. Por favor, tente novamente em alguns instantes.\n\nEnquanto isso, aproveite para explorar nossos conteúdos de estudo! 📚\n\nObrigado pela paciência! 💙';
      
      setMessages(m => [
        ...m,
        { role: 'assistant', content: errorMessage }
      ]);
    }
    
    setLoading(false);
  };
  
  return (
    <>
      {/* Launcher Button */}
      <div 
        className="ai-chat-launcher" 
        style={{ bottom: 'calc(1rem + var(--sticky-buybar-space, 0px))' }}
      >
        {!isOpen && (
          <button 
            onClick={openChat}
            aria-label="Abrir assistente de estudos"
            className="ai-chat-launcher-button"
          >
            <div className="ai-chat-launcher-bg"></div>
            <div className="ai-chat-launcher-gloss"></div>
            <div className="ai-chat-launcher-glow"></div>
            <div className="ai-chat-launcher-shadow"></div>
            <div className="ai-chat-launcher-icon">
              <SparkleIcon />
              <span className="ai-chat-launcher-pulse"></span>
            </div>
          </button>
        )}
      </div>
      
      {/* Chat Window */}
      {(isOpen || isClosing) && (
        <div className={`ai-chat-window ${isClosing ? 'closing' : ''}`}>
          <div className="ai-chat-glass-bg"></div>
          <div className="ai-chat-noise"></div>
          
          <div className="ai-chat-container">
            {/* Header */}
            <div className="ai-chat-header">
              <div className="ai-chat-header-bg"></div>
              <div className="ai-chat-header-content">
                <div className="ai-chat-status">
                  <div className="ai-chat-status-dot"></div>
                  <div className="ai-chat-status-pulse"></div>
                </div>
                <div className="ai-chat-title">Assistente de Estudos</div>
              </div>
              <div className="ai-chat-header-actions">
                <button 
                  aria-label="Limpar conversa"
                  onClick={toggleClearMenu}
                  className="ai-chat-clear-button"
                >
                  <TrashIcon />
                </button>
                {showClearMenu && (
                  <div className="ai-chat-clear-menu">
                    <button onClick={handleClearCurrent} className="ai-chat-clear-menu-item">
                      <span className="ai-chat-clear-menu-icon">🗑️</span>
                      <span className="ai-chat-clear-menu-text">Limpar conversa atual</span>
                    </button>
                    <div className="ai-chat-clear-menu-divider"></div>
                    <button onClick={handleClearAll} className="ai-chat-clear-menu-item ai-chat-clear-menu-item-danger">
                      <span className="ai-chat-clear-menu-icon">🔥</span>
                      <span className="ai-chat-clear-menu-text">Limpar todas as conversas</span>
                    </button>
                  </div>
                )}
                <button 
                  aria-label="Fechar"
                  onClick={handleClose}
                  className="ai-chat-close-button"
                >
                  <XIcon />
                </button>
              </div>
            </div>
            
            {/* Messages Area */}
            <div className="ai-chat-messages-wrapper">
              <div ref={logRef} className="ai-chat-messages-scroll">
                <div className="ai-chat-messages-content">
                  <div className="ai-chat-messages-list">
                    {messages.map((m, i) => {
                      const { html: richHtml, tokens } = m.role === 'assistant' 
                        ? renderRich(m.content)
                        : { html: '', tokens: [] };
                      
                      // Check if this message is currently streaming
                      const isStreaming = loading && 
                                         i === messages.length - 1 && 
                                         m.role === 'assistant';
                      
                      // Check if this message just completed streaming
                      const isCompleted = i === completedMessageId;
                      
                      // No more cursor - we use ThinkingIndicator now
                      let displayHtml = richHtml;
                      
                      return (
                        <React.Fragment key={i}>
                          <div className={`ai-chat-message ${m.role === 'user' ? 'user' : 'assistant'} ${isStreaming ? 'streaming' : ''} ${isCompleted ? 'completed' : ''}`}>
                            <div className="ai-chat-message-bubble">
                              <div className="ai-chat-message-gloss"></div>
                              <div className="ai-chat-message-content">
                                {m.role === 'assistant' ? (
                                  <>
                                    {/* ENTERPRISE THINKING INDICATOR - Multiple fallback layers */}
                                    {i === messages.length - 1 && aiStreamState.shouldShowThinking ? (
                                      <div className="enterprise-thinking-container">
                                        {/* Primary: Full featured indicator */}
                                        <EnterpriseThinkingIndicator 
                                          mode="primary"
                                          debug={false}
                                          onRenderError={(error) => console.error('ThinkingIndicator error:', error)}
                                        />
                                        
                                        {/* Diagnostic info (dev only) */}
                                        {import.meta.env.DEV && (
                                          <div style={{ fontSize: '10px', opacity: 0.5, marginTop: '4px' }}>
                                            State: {aiStreamState.aiState} | 
                                            Loading: {loading ? 'YES' : 'NO'} | 
                                            Content: {m.content.length} chars
                                          </div>
                                        )}
                                      </div>
                                    ) : (
                                      <div dangerouslySetInnerHTML={{ __html: displayHtml }} />
                                    )}
                                  </>
                                ) : (
                                  m.content
                                )}
                              </div>
                            </div>
                          </div>
                          
                          {/* Render token buttons */}
                          {m.role === 'assistant' && tokens && tokens.length > 0 && (
                            <div className="ai-chat-tokens">
                              {tokens.map((token, idx) => {
                                if (token.type === 'NAVIGATE') {
                                  const nav = parseNavigateToken(token.content);
                                  return (
                                    <button
                                      key={idx}
                                      onClick={() => handleNavigate(nav.path)}
                                      className="ai-chat-token-navigate"
                                    >
                                      <div className="ai-chat-token-bg"></div>
                                      <div className="ai-chat-token-gloss"></div>
                                      <div className="ai-chat-token-content">
                                        <span className="ai-chat-token-icon">{getMaterialIconSvg(nav.icon)}</span>
                                        <span className="ai-chat-token-label">{nav.label}</span>
                                      </div>
                                    </button>
                                  );
                                }
                                
                                if (token.type === 'TOPIC') {
                                  const topic = parseTopicToken(token.content);
                                  if (!topic) return null;
                                  return (
                                    <button
                                      key={idx}
                                      onClick={() => handleNavigate(topic.path)}
                                      className="ai-chat-token-topic"
                                      style={{ background: topic.gradient }}
                                    >
                                      <div className="ai-chat-token-gloss"></div>
                                      <div className="ai-chat-token-content">
                                        <span className="ai-chat-token-icon">{getMaterialIconSvg(topic.icon)}</span>
                                        <div className="ai-chat-token-topic-info">
                                          <div className="ai-chat-token-topic-title">{topic.title}</div>
                                          <div className="ai-chat-token-topic-meta">
                                            {topic.difficulty && <span>{topic.difficulty}</span>}
                                            {topic.duration && <span> • {topic.duration}</span>}
                                          </div>
                                        </div>
                                      </div>
                                    </button>
                                  );
                                }
                                
                                return null;
                              })}
                            </div>
                          )}
                        </React.Fragment>
                      );
                    })}
                    
                    {/* Typing indicator */}
                    {loading && messages.length > 0 && messages[messages.length - 1]?.role === 'user' && (
                      <div className="ai-chat-message assistant">
                        <div className="ai-chat-typing-indicator">
                          <div className="ai-chat-typing-dot"></div>
                          <div className="ai-chat-typing-dot"></div>
                          <div className="ai-chat-typing-dot"></div>
                        </div>
                      </div>
                    )}
                    
                    {/* Initial suggestions */}
                    {showInitialSuggestions && messages.length === 1 && !loading && (
                      <div className="ai-chat-suggestions">
                        {initialSuggestions.map((suggestion, idx) => (
                          <button
                            key={idx}
                            onClick={() => send(suggestion)}
                            className="ai-chat-suggestion"
                          >
                            <div className="ai-chat-suggestion-bg"></div>
                            <div className="ai-chat-suggestion-gloss"></div>
                            <div className="ai-chat-suggestion-content">
                              <span className="ai-chat-suggestion-text">{suggestion}</span>
                              <ArrowRightIcon className="ai-chat-suggestion-icon" />
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                    
                    {/* Follow-up suggestion */}
                    {followUp && !loading && (
                      <div className="ai-chat-followup">
                        <button
                          onClick={() => {
                            const text = followUp;
                            setFollowUp('');
                            send(text);
                          }}
                          className="ai-chat-suggestion"
                        >
                          <div className="ai-chat-suggestion-bg"></div>
                          <div className="ai-chat-suggestion-gloss"></div>
                          <div className="ai-chat-suggestion-content">
                            <span className="ai-chat-suggestion-text">{followUp}</span>
                            <ArrowRightIcon className="ai-chat-suggestion-icon" />
                          </div>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Input Area */}
            <div className="ai-chat-input-wrapper">
              <div className="ai-chat-input-separator"></div>
              <div className="ai-chat-input-container">
                <div className="ai-chat-input-row">
                  <div className="ai-chat-textarea-wrapper">
                    <textarea
                      className="ai-chat-textarea"
                      placeholder={isApiConfigured ? 'Pergunte sobre qualquer matéria...' : 'Configure as chaves de API'}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onInput={(e) => {
                        const ta = e.currentTarget;
                        ta.style.height = 'auto';
                        ta.style.height = Math.min(140, ta.scrollHeight) + 'px';
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          send();
                        }
                      }}
                      disabled={loading}
                    />
                    <div className="ai-chat-textarea-glow"></div>
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => send()}
                    disabled={loading || !isApiConfigured}
                    aria-label="Enviar mensagem"
                    className={`ai-chat-send-button ${(loading || !isApiConfigured) ? 'disabled' : ''}`}
                  >
                    <div className="ai-chat-send-bg"></div>
                    <div className="ai-chat-send-gloss"></div>
                    <div className="ai-chat-send-glow"></div>
                    <div className="ai-chat-send-icon">
                      <SendIcon className={loading ? 'pulsing' : ''} />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AIChatWidget;

