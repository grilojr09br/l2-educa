import React, { useState, useEffect, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import './Sidebar.css';
import SUBJECTS_CONFIG, { getSubjectFromPath, getAllTopics } from '../config/subjectsConfig';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSubjects, setExpandedSubjects] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, isEmailVerified, logout } = useAuth();
  const { success, error } = useNotification();

  const currentSubject = useMemo(() => 
    getSubjectFromPath(location.pathname), 
    [location.pathname]
  );

  // Persist sidebar state
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('l2educa_sidebar_expanded');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
          setExpandedSubjects(parsed);
        } else {
          console.warn('Invalid sidebar state format, using defaults');
        }
      }
    } catch (error) {
      console.error('Error loading sidebar state:', error);
      try {
        sessionStorage.removeItem('l2educa_sidebar_expanded');
      } catch (e) {
        console.error('Cannot clear corrupted sidebar state:', e);
      }
    }
  }, []);

  // Auto-expand current subject
  useEffect(() => {
    try {
      if (currentSubject && currentSubject.id) {
        setExpandedSubjects(prev => ({
          ...prev,
          [currentSubject.id]: true,
        }));
      }
    } catch (error) {
      console.error('Error auto-expanding subject:', error);
    }
  }, [currentSubject]);

  // Save expanded state
  useEffect(() => {
    try {
      if (expandedSubjects && typeof expandedSubjects === 'object') {
        const jsonString = JSON.stringify(expandedSubjects);
        sessionStorage.setItem('l2educa_sidebar_expanded', jsonString);
      }
    } catch (error) {
      if (error.name === 'QuotaExceededError') {
        console.error('sessionStorage quota exceeded');
      } else {
        console.error('Error saving sidebar state:', error);
      }
    }
  }, [expandedSubjects]);

  // Toggle subject expansion
  const toggleSubject = (subjectId) => {
    try {
      if (!subjectId || typeof subjectId !== 'string') {
        console.error('Invalid subjectId for toggle:', subjectId);
        return;
      }
      
      setExpandedSubjects(prev => ({
        ...prev,
        [subjectId]: !prev[subjectId],
      }));
    } catch (error) {
      console.error('Error toggling subject:', error);
    }
  };

  // Filter topics based on search
  const filteredSubjects = useMemo(() => {
    try {
      if (!searchQuery || !searchQuery.trim()) {
        return Object.values(SUBJECTS_CONFIG) || [];
      }

      const query = searchQuery.toLowerCase();
      const allTopics = getAllTopics();
      
      if (!Array.isArray(allTopics)) {
        console.error('getAllTopics did not return an array');
        return Object.values(SUBJECTS_CONFIG) || [];
      }

      const matchingTopics = allTopics.filter(topic =>
        topic && (
          (topic.title && topic.title.toLowerCase().includes(query)) ||
          (topic.subjectName && topic.subjectName.toLowerCase().includes(query))
        )
      );

      const subjectIds = new Set(matchingTopics.map(t => t.subjectId).filter(Boolean));
      const subjects = Object.values(SUBJECTS_CONFIG) || [];
      
      return subjects.filter(subject =>
        subject && (
          subjectIds.has(subject.id) || 
          (subject.name && subject.name.toLowerCase().includes(query))
        )
      );
    } catch (error) {
      console.error('Error filtering subjects:', error);
      return Object.values(SUBJECTS_CONFIG) || [];
    }
  }, [searchQuery]);

  // Get active (non-coming-soon) topics for a subject
  const getActiveTopics = (subject) => {
    try {
      if (!subject || !subject.topics || !Array.isArray(subject.topics)) {
        return [];
      }

      // Filter for active topics (not coming soon)
      let activeTopics = subject.topics.filter(topic => 
        topic && !topic.comingSoon && topic.path
      );

      // Apply search filter if present
      if (searchQuery && searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        activeTopics = activeTopics.filter(topic =>
          topic.title && topic.title.toLowerCase().includes(query)
        );
      }

      return activeTopics;
    } catch (error) {
      console.error('Error getting active topics:', error);
      return [];
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button 
        className={`sidebar-toggle ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <span className="material-icons">
          {isOpen ? 'close' : 'menu'}
        </span>
      </button>

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-content">
          {/* Header */}
          <div className="sidebar-header">
            <h2 className="sidebar-logo">L2 EDUCA</h2>
            <p className="sidebar-subtitle">Centro de Conhecimento</p>
          </div>

          {/* Sticky Section - Search + Terminal */}
          <div className="sidebar-sticky-section">
            {/* Search Bar */}
            <div className="sidebar-search">
              <span className="material-icons search-icon">search</span>
              <input
                type="text"
                placeholder="Buscar tópicos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              {searchQuery && (
                <button
                  className="search-clear"
                  onClick={() => setSearchQuery('')}
                  aria-label="Limpar busca"
                >
                  <span className="material-icons">close</span>
                </button>
              )}
            </div>

            {/* Terminal Button - Enhanced */}
            <Link
              to="/"
              className={`sidebar-nav-button terminal-button-enhanced ${location.pathname === '/' ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              <div className="terminal-icon-wrapper">
                <span className="material-icons button-icon">terminal</span>
                <div className="terminal-pulse"></div>
              </div>
              <span className="button-label">Terminal</span>
              <div className="button-glow"></div>
            </Link>
          </div>

          {/* Subjects Navigation */}
          <nav className="sidebar-nav">
            {filteredSubjects.map((subject) => {
              const activeTopics = getActiveTopics(subject);
              const hasActiveTopics = activeTopics.length > 0;
              const isExpanded = expandedSubjects[subject.id];
              
              return (
                <div key={subject.id} className="sidebar-subject-group">
                  {/* Subject Button */}
                  <Link
                    to={subject.path}
                    className={`sidebar-nav-button subject-button ${
                      location.pathname === subject.path ? 'active' : ''
                    }`}
                    onClick={() => setIsOpen(false)}
                    style={{ '--subject-color': subject.color }}
                  >
                    <span className="material-icons button-icon">{subject.icon}</span>
                    <span className="button-label">{subject.name}</span>
                    
                    {/* Expand/Collapse Arrow for subjects with active topics */}
                    {hasActiveTopics && (
                      <button
                        className="expand-toggle"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleSubject(subject.id);
                        }}
                        aria-label={isExpanded ? 'Colapsar tópicos' : 'Expandir tópicos'}
                      >
                        <span className="material-icons">
                          {isExpanded ? 'expand_less' : 'expand_more'}
                        </span>
                      </button>
                    )}
                    
                    <div className="button-glow"></div>
                  </Link>

                  {/* Active Topics List */}
                  {hasActiveTopics && (
                    <div className={`sidebar-topics ${isExpanded ? 'expanded' : ''}`}>
                      {activeTopics.map((topic) => (
                        <Link
                          key={topic.id}
                          to={topic.path}
                          className={`sidebar-topic-link ${
                            location.pathname === topic.path ? 'active' : ''
                          }`}
                          onClick={() => setIsOpen(false)}
                        >
                          <span className="material-icons topic-icon">{topic.icon || 'article'}</span>
                          <span className="topic-label">{topic.title}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Authentication Section */}
          <div className="sidebar-auth-section">
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  className="sidebar-auth-button profile-button"
                  onClick={() => setIsOpen(false)}
                >
                  {user?.avatar_url ? (
                    <img 
                      src={user.avatar_url} 
                      alt="Avatar" 
                      className="button-icon sidebar-avatar"
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '2px solid rgba(255,255,255,0.3)'
                      }}
                    />
                  ) : (
                    <span className="material-icons button-icon">account_circle</span>
                  )}
                  <span className="button-label">
                    {user?.username || 'Perfil'}
                    {isAuthenticated && !isEmailVerified && <span className="unverified-badge" title="Email não verificado">⚠</span>}
                  </span>
                  <div className="button-glow"></div>
                </Link>
                <button
                  className="sidebar-auth-button logout-button"
                  onClick={async () => {
                    try {
                      setIsOpen(false);
                      await logout();
                      success('Você saiu com sucesso!');
                      
                      // ROBUST: Get base URL with /l2 subdirectory
                      let baseUrl = import.meta.env.VITE_SITE_URL;
                      if (!baseUrl) {
                        const currentPath = window.location.pathname;
                        baseUrl = currentPath.includes('/l2') 
                          ? window.location.origin + '/l2'
                          : window.location.origin;
                      }
                      
                      window.location.href = `${baseUrl}/#/login`;
                    } catch (err) {
                      error('Erro ao fazer logout. Tente novamente.');
                      console.error('Logout error:', err);
                      
                      // Force redirect with correct URL
                      const baseUrl = import.meta.env.VITE_SITE_URL || 
                                      (window.location.pathname.includes('/l2') 
                                        ? window.location.origin + '/l2' 
                                        : window.location.origin);
                      window.location.href = `${baseUrl}/#/login`;
                    }
                  }}
                >
                  <span className="material-icons button-icon">logout</span>
                  <span className="button-label">Sair</span>
                  <div className="button-glow"></div>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="sidebar-auth-button login-button"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="material-icons button-icon">login</span>
                  <span className="button-label">Entrar</span>
                  <div className="button-glow"></div>
                </Link>
                <Link
                  to="/register"
                  className="sidebar-auth-button register-button"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="material-icons button-icon">person_add</span>
                  <span className="button-label">Cadastrar</span>
                  <div className="button-glow"></div>
                </Link>
              </>
            )}
          </div>

          {/* Footer - Compact Design */}
          <div className="sidebar-footer">
            <div className="footer-compact">
              <h3 className="footer-brand">L2 EDUCA</h3>
              <div className="footer-credits">
                <span className="copyright">© L2</span>
                <span className="divider">•</span>
                <span className="ai-badge">
                  <span className="material-icons">psychology</span>
                  L2 ATLAS
                </span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
