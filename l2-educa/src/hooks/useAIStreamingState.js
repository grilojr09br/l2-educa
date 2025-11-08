/**
 * ENTERPRISE-LEVEL AI Streaming State Management
 * Robust, definitive solution for detecting AI response states
 * Multiple layers of fallback and intelligent detection
 */

import { useState, useEffect, useRef } from 'react';

/**
 * AI Streaming States (Enterprise FSM - Finite State Machine)
 */
export const AI_STATES = {
  IDLE: 'IDLE',                       // No activity
  THINKING: 'THINKING',               // AI is processing (no content yet)
  STREAMING: 'STREAMING',             // AI is streaming content
  COMPLETED: 'COMPLETED',             // Stream completed
  ERROR: 'ERROR',                     // Error occurred
};

/**
 * Custom hook for managing AI streaming state
 * @param {boolean} loading - Is AI currently loading
 * @param {Array} messages - Chat messages array
 * @param {Object} lastMessage - Last message in chat
 * @returns {Object} State management object
 */
export const useAIStreamingState = (loading, messages, lastMessage) => {
  const [aiState, setAiState] = useState(AI_STATES.IDLE);
  const [thinkingStartTime, setThinkingStartTime] = useState(null);
  const [streamingStartTime, setStreamingStartTime] = useState(null);
  const previousLoadingRef = useRef(false);
  const hasContentRef = useRef(false);
  const stateLogRef = useRef([]);

  /**
   * Log state transitions for debugging
   */
  const logStateTransition = (from, to, reason) => {
    const log = {
      timestamp: Date.now(),
      from,
      to,
      reason,
      messageCount: messages.length,
      lastMessageRole: lastMessage?.role,
      lastMessageLength: lastMessage?.content?.length || 0,
      loading,
    };
    
    stateLogRef.current.push(log);
    
    // Keep only last 20 transitions
    if (stateLogRef.current.length > 20) {
      stateLogRef.current.shift();
    }
    
    console.log(`🤖 AI State: ${from} → ${to}`, reason, log);
  };

  /**
   * Detect if we should show ThinkingIndicator
   */
  const shouldShowThinking = () => {
    // Layer 1: Basic checks
    if (!loading) return false;
    if (!lastMessage) return false;
    if (lastMessage.role !== 'assistant') return false;
    
    // Layer 2: Content checks
    const hasContent = lastMessage.content && lastMessage.content.length > 0;
    const hasMinimalContent = lastMessage.content && lastMessage.content.length < 5;
    
    // Layer 3: State-based decision
    // Show thinking if:
    // - No content yet
    // - OR very minimal content (< 5 chars, likely just starting)
    return !hasContent || hasMinimalContent;
  };

  /**
   * Detect if AI is actively streaming
   */
  const isActivelyStreaming = () => {
    if (!loading) return false;
    if (!lastMessage) return false;
    if (lastMessage.role !== 'assistant') return false;
    
    const hasContent = lastMessage.content && lastMessage.content.length >= 5;
    return hasContent;
  };

  /**
   * Main state machine logic
   */
  useEffect(() => {
    const prevState = aiState;
    
    // Transition: IDLE → THINKING
    if (loading && !previousLoadingRef.current && lastMessage?.role === 'assistant') {
      setAiState(AI_STATES.THINKING);
      setThinkingStartTime(Date.now());
      hasContentRef.current = false;
      logStateTransition(prevState, AI_STATES.THINKING, 'Loading started, assistant message detected');
      return;
    }
    
    // Transition: THINKING → STREAMING
    if (aiState === AI_STATES.THINKING && lastMessage?.content?.length >= 5) {
      setAiState(AI_STATES.STREAMING);
      setStreamingStartTime(Date.now());
      hasContentRef.current = true;
      logStateTransition(prevState, AI_STATES.STREAMING, `Content received: ${lastMessage.content.length} chars`);
      return;
    }
    
    // Transition: STREAMING → COMPLETED
    if ((aiState === AI_STATES.STREAMING || aiState === AI_STATES.THINKING) && !loading) {
      setAiState(AI_STATES.COMPLETED);
      const thinkingDuration = thinkingStartTime ? Date.now() - thinkingStartTime : 0;
      const streamingDuration = streamingStartTime ? Date.now() - streamingStartTime : 0;
      logStateTransition(
        prevState, 
        AI_STATES.COMPLETED, 
        `Stream completed (thinking: ${thinkingDuration}ms, streaming: ${streamingDuration}ms)`
      );
      
      // Reset to IDLE after a brief moment
      setTimeout(() => {
        setAiState(AI_STATES.IDLE);
        logStateTransition(AI_STATES.COMPLETED, AI_STATES.IDLE, 'Reset after completion');
      }, 500);
      return;
    }
    
    // Transition: Any → IDLE (cleanup)
    if (!loading && aiState !== AI_STATES.IDLE && aiState !== AI_STATES.COMPLETED) {
      setAiState(AI_STATES.IDLE);
      logStateTransition(prevState, AI_STATES.IDLE, 'Loading stopped, cleanup');
      return;
    }
    
    // Update previous loading state
    previousLoadingRef.current = loading;
  }, [loading, messages.length, lastMessage?.content, aiState, thinkingStartTime, streamingStartTime]);

  /**
   * Force reset state (for error recovery)
   */
  const resetState = () => {
    logStateTransition(aiState, AI_STATES.IDLE, 'Manual reset');
    setAiState(AI_STATES.IDLE);
    setThinkingStartTime(null);
    setStreamingStartTime(null);
    hasContentRef.current = false;
  };

  /**
   * Get state analytics
   */
  const getAnalytics = () => {
    const now = Date.now();
    return {
      currentState: aiState,
      thinkingDuration: thinkingStartTime ? now - thinkingStartTime : 0,
      streamingDuration: streamingStartTime ? now - streamingStartTime : 0,
      totalDuration: thinkingStartTime ? now - thinkingStartTime : 0,
      transitionHistory: stateLogRef.current,
    };
  };

  return {
    // States
    aiState,
    isThinking: aiState === AI_STATES.THINKING,
    isStreaming: aiState === AI_STATES.STREAMING,
    isCompleted: aiState === AI_STATES.COMPLETED,
    isIdle: aiState === AI_STATES.IDLE,
    
    // Smart detectors
    shouldShowThinking: shouldShowThinking(),
    isActivelyStreaming: isActivelyStreaming(),
    
    // Utilities
    resetState,
    getAnalytics,
    
    // Timestamps
    thinkingStartTime,
    streamingStartTime,
  };
};

export default useAIStreamingState;

