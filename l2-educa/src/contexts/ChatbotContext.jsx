import React, { createContext, useContext, useState, useCallback, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { getSubjectFromPath, getTopicFromPath } from '../config/subjectsConfig';
import { generateSystemPrompt } from '../utils/chatbotPrompts';
import { 
  saveChatHistory, 
  loadChatHistory, 
  clearChatHistory, 
  clearAllChats as clearAllChatsUtil,
  hasChatHistory 
} from '../utils/chatPersistence';

const ChatbotContext = createContext();

export const useChatbot = () => {
  const context = useContext(ChatbotContext);
  if (!context) {
    throw new Error('useChatbot must be used within ChatbotProvider');
  }
  return context;
};

export const ChatbotProvider = ({ children }) => {
  const location = useLocation();
  
  // Chat state
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Location context for AI
  const [currentContext, setCurrentContext] = useState({
    pathname: '/',
    currentSubject: null,
    currentTopic: null
  });
  
  // API configuration
  const [apiConfig, setApiConfig] = useState({
    provider: 'openrouter',
    model: import.meta.env.VITE_OPENROUTER_MODEL || 'openai/gpt-3.5-turbo',
    apiKeys: [],
    backendUrl: import.meta.env.VITE_BACKEND_URL || ''
  });
  
  // Parse API keys from environment
  useEffect(() => {
    const parseKeyList = (raw) => {
      const value = (raw || '').trim();
      if (!value) return [];
      try {
        if (value.startsWith('[') && value.endsWith(']')) {
          const arr = JSON.parse(value);
          if (Array.isArray(arr)) return arr.map(s => String(s).trim().replace(/^"|"$/g, '')).filter(Boolean);
        }
      } catch {}
      return value
        .split(/[\n,;\\s]+/)
        .map(s => s.trim().replace(/^"|"$/g, ''))
        .filter(Boolean);
    };
    
    const singleKey = import.meta.env.VITE_OPENROUTER_API_KEY || '';
    const multiKeys = import.meta.env.VITE_OPENROUTER_API_KEYS || '';
    const singleParsed = parseKeyList(singleKey);
    const multiParsed = parseKeyList(multiKeys);
    const keyPool = (multiParsed.length ? multiParsed : singleParsed).filter(Boolean);
    
    setApiConfig(prev => ({
      ...prev,
      apiKeys: keyPool
    }));
  }, []);
  
  // Generate contextual welcome message
  const getWelcomeMessage = useCallback((context) => {
    const { currentSubject, currentTopic } = context;
    
    if (currentTopic && currentSubject) {
      return `Olá! 👋 Vamos estudar **${currentTopic.title || currentTopic.name}** em ${currentSubject.name}? Estou aqui para ajudar!`;
    }
    
    if (currentSubject) {
      return `Olá! 👋 Pronto para **${currentSubject.name}**? Posso ajudar você a entender conceitos, praticar exercícios e navegar pelos tópicos!`;
    }
    
    return 'Olá! 👋 Sou seu assistente de estudos da **L2 EDUCA**. Por onde quer começar hoje?';
  }, []);
  
  // Update context when location changes and load/save chat history
  useEffect(() => {
    const pathname = location.pathname;
    const currentSubject = getSubjectFromPath(pathname);
    const currentTopic = currentSubject ? getTopicFromPath(pathname, currentSubject) : null;
    
    const newContext = {
      pathname,
      currentSubject,
      currentTopic
    };
    
    setCurrentContext(newContext);
    
    console.log('📍 Chatbot context updated:', {
      pathname,
      subject: currentSubject?.name,
      topic: currentTopic?.title || currentTopic?.name
    });
    
    // Load chat history for this pathname
    setIsTransitioning(true);
    
    const savedMessages = loadChatHistory(pathname);
    
    if (savedMessages && savedMessages.length > 0) {
      console.log(`💬 Loaded ${savedMessages.length} messages for ${pathname}`);
      setMessages(savedMessages);
    } else {
      // No saved history, start with welcome message
      const welcomeMessage = {
        role: 'assistant',
        content: getWelcomeMessage(newContext)
      };
      setMessages([welcomeMessage]);
    }
    
    // Transition animation
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  }, [location.pathname, getWelcomeMessage]);
  
  // Save chat history whenever messages change
  useEffect(() => {
    if (messages.length > 0 && !isTransitioning) {
      saveChatHistory(location.pathname, messages);
    }
  }, [messages, location.pathname, isTransitioning]);
  
  // Generate dynamic system prompt based on current context
  const systemPrompt = useMemo(() => {
    return generateSystemPrompt(currentContext);
  }, [currentContext]);
  
  // Add a message to the chat
  const addMessage = useCallback((message) => {
    setMessages(prev => [...prev, message]);
  }, []);
  
  // Clear current chat history
  const clearCurrentChat = useCallback(() => {
    const pathname = location.pathname;
    clearChatHistory(pathname);
    
    const welcomeMessage = {
      role: 'assistant',
      content: getWelcomeMessage(currentContext)
    };
    setMessages([welcomeMessage]);
    
    console.log(`🗑️ Cleared chat for ${pathname}`);
  }, [location.pathname, currentContext, getWelcomeMessage]);
  
  // Clear all chat histories
  const clearAllChatsHandler = useCallback(() => {
    clearAllChatsUtil();
    
    const welcomeMessage = {
      role: 'assistant',
      content: getWelcomeMessage(currentContext)
    };
    setMessages([welcomeMessage]);
    
    console.log('🗑️ Cleared all chats');
  }, [currentContext, getWelcomeMessage]);
  
  // Open/close chat
  const openChat = useCallback(() => setIsOpen(true), []);
  const closeChat = useCallback(() => setIsOpen(false), []);
  const toggleChat = useCallback(() => setIsOpen(prev => !prev), []);
  
  // Get full conversation for API calls
  const getConversation = useCallback(() => {
    return [
      { role: 'system', content: systemPrompt },
      ...messages
    ];
  }, [systemPrompt, messages]);
  
  // Check if API is configured
  const isApiConfigured = useMemo(() => {
    return apiConfig.apiKeys.length > 0 || apiConfig.backendUrl.length > 0;
  }, [apiConfig]);
  
  // Check if current path has saved history
  const hasHistory = useMemo(() => {
    return hasChatHistory(location.pathname);
  }, [location.pathname]);
  
  // Context value
  const contextValue = useMemo(() => ({
    // State
    messages,
    isOpen,
    currentContext,
    apiConfig,
    systemPrompt,
    isTransitioning,
    hasHistory,
    
    // Actions
    addMessage,
    setMessages,
    clearCurrentChat,
    clearAllChats: clearAllChatsHandler,
    openChat,
    closeChat,
    toggleChat,
    
    // Utilities
    getConversation,
    isApiConfigured
  }), [
    messages,
    isOpen,
    currentContext,
    apiConfig,
    systemPrompt,
    isTransitioning,
    hasHistory,
    addMessage,
    clearCurrentChat,
    clearAllChatsHandler,
    openChat,
    closeChat,
    toggleChat,
    getConversation,
    isApiConfigured
  ]);
  
  return (
    <ChatbotContext.Provider value={contextValue}>
      {children}
    </ChatbotContext.Provider>
  );
};

export default ChatbotContext;

