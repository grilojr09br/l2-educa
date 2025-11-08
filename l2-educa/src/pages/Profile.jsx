import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabase';
import AuroraBackground from '../components/AuroraBackground';
import GlassCard from '../components/GlassCard';
import Footer from '../components/Footer';
import AvatarUpload from '../components/AvatarUpload';
import './Profile.css';

const Profile = () => {
  const { user, getUserProfile, updateProfile, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    bio: '',
    avatar_url: '',
    username: '',
  });
  const [message, setMessage] = useState(null);
  const [usernameStatus, setUsernameStatus] = useState(null);
  const [isUpdatingUsername, setIsUpdatingUsername] = useState(false);

  useEffect(() => {
    loadProfile();
    loadUsernameStatus();
  }, []);

  const loadProfile = async () => {
    try {
      const profileData = await getUserProfile();
      setProfile(profileData);
      setFormData({
        full_name: profileData?.full_name || '',
        bio: profileData?.bio || '',
        avatar_url: profileData?.avatar_url || '',
        username: profileData?.username || user?.username || '',
      });
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const loadUsernameStatus = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) return;

      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';
      const response = await fetch(`${backendUrl}/api/profile/username-status`, {
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUsernameStatus(data.data);
      }
    } catch (error) {
      console.error('Error loading username status:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    try {
      // Update user_profiles table (bio, full_name)
      await updateProfile({
        full_name: formData.full_name,
        bio: formData.bio,
      });
      
      // Reload profile data immediately
      await loadProfile();
      
      // Exit edit mode
      setIsEditing(false);
      
      // Show success message
      setMessage({ type: 'success', text: 'Perfil atualizado com sucesso!' });
      
      // Force a small delay to ensure UI updates
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'Erro ao atualizar perfil' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleUsernameUpdate = async () => {
    if (!formData.username || formData.username === profile?.username) {
      return;
    }

    setIsUpdatingUsername(true);
    setMessage(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) {
        throw new Error('Sessão expirada');
      }

      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';
      const response = await fetch(`${backendUrl}/api/profile/username`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: formData.username }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao atualizar username');
      }

      setMessage({ type: 'success', text: `Username atualizado! Você pode alterar mais ${data.data.changesRemaining} vez(es) esta semana.` });
      
      // Reload profile data
      await loadProfile();
      await loadUsernameStatus();
      
      // Force reload user data in AuthContext
      window.location.reload();
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setIsUpdatingUsername(false);
    }
  };

  const handleLogout = async () => {
    try {
      // Call logout (will clear everything)
      await logout();
      
      // ROBUST: Get base URL with /l2 subdirectory
      // Method 1: Use env variable
      let baseUrl = import.meta.env.VITE_SITE_URL;
      
      // Method 2: Detect from current URL (backup)
      if (!baseUrl) {
        const currentPath = window.location.pathname;
        if (currentPath.includes('/l2')) {
          baseUrl = window.location.origin + '/l2';
        } else {
          baseUrl = window.location.origin;
        }
      }
      
      // Force navigate to login with correct URL
      window.location.href = `${baseUrl}/#/login`;
    } catch (error) {
      console.error('Logout error:', error);
      // Force navigate anyway with correct URL
      const baseUrl = import.meta.env.VITE_SITE_URL || 
                      (window.location.pathname.includes('/l2') 
                        ? window.location.origin + '/l2' 
                        : window.location.origin);
      window.location.href = `${baseUrl}/#/login`;
    }
  };

  return (
    <div className="profile-page">
      <AuroraBackground />

      <div className="profile-content">
        {/* Back to Home Button */}
        <button 
          onClick={() => navigate('/')} 
          className="btn-back-home"
          aria-label="Voltar para a tela inicial"
        >
          <span className="material-icons">home</span>
          <span className="btn-text">Ir para a Tela Inicial</span>
        </button>

        <GlassCard>
          <div className="profile-header">
            <h1 className="profile-title">Meu Perfil</h1>
            <div className="profile-actions">
              {!isEditing ? (
                <>
                  <button onClick={() => setIsEditing(true)} className="btn-edit">
                    Editar Perfil
                  </button>
                  <button onClick={handleLogout} className="btn-logout">
                    Sair
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({
                      full_name: profile?.full_name || '',
                      bio: profile?.bio || '',
                      avatar_url: profile?.avatar_url || '',
                    });
                  }}
                  className="btn-cancel"
                >
                  Cancelar
                </button>
              )}
            </div>
          </div>

          {message && (
            <div className={`profile-message ${message.type}`}>
              {message.text}
            </div>
          )}

          {!isEditing ? (
            <div className="profile-view">
              {/* Avatar Section - Top */}
              <div className="profile-avatar-section">
                {user?.avatar_url ? (
                  <img
                    src={user.avatar_url}
                    alt="Avatar"
                    className="profile-avatar-large"
                  />
                ) : (
                  <div className="profile-avatar-placeholder">
                    <span className="material-icons">account_circle</span>
                  </div>
                )}
              </div>

              <div className="profile-field">
                <label className="profile-label">Username</label>
                <p className="profile-value">{user?.username}</p>
              </div>

              <div className="profile-field">
                <label className="profile-label">Email</label>
                <p className="profile-value">{user?.email}</p>
              </div>

              <div className="profile-field">
                <label className="profile-label">Nome Completo</label>
                <p className="profile-value">
                  {profile?.full_name || 'Não informado'}
                </p>
              </div>

              <div className="profile-field">
                <label className="profile-label">Bio</label>
                <p className="profile-value">
                  {profile?.bio || 'Nenhuma bio adicionada'}
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSave} className="profile-form">
              {/* Username Field with Rate Limit */}
              <div className="form-group">
                <label htmlFor="username" className="form-label">
                  Username
                  {usernameStatus && (
                    <span className="username-limit-badge">
                      {usernameStatus.changesRemaining} alteração(ões) restante(s) esta semana
                    </span>
                  )}
                </label>
                <div className="username-input-group">
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="seu_username"
                    pattern="[a-zA-Z0-9_]{3,20}"
                    title="3-20 caracteres: letras, números e underscore"
                    disabled={!usernameStatus?.canChange || isUpdatingUsername}
                  />
                  {formData.username !== profile?.username && usernameStatus?.canChange && (
                    <button
                      type="button"
                      onClick={handleUsernameUpdate}
                      disabled={isUpdatingUsername}
                      className="btn-update-username"
                    >
                      {isUpdatingUsername ? '...' : '✓'}
                    </button>
                  )}
                </div>
                {!usernameStatus?.canChange && (
                  <p className="form-hint error">
                    Você atingiu o limite de 2 alterações por semana. 
                    {usernameStatus?.lastChange && 
                      ` Próxima alteração disponível em ${Math.ceil(7 - Math.floor((Date.now() - new Date(usernameStatus.lastChange).getTime()) / (1000 * 60 * 60 * 24)))} dias.`
                    }
                  </p>
                )}
                <p className="form-hint">
                  3-20 caracteres. Apenas letras, números e underscore (_)
                </p>
              </div>

              <div className="form-group">
                <label htmlFor="full_name" className="form-label">
                  Nome Completo
                </label>
                <input
                  type="text"
                  id="full_name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Seu nome completo"
                />
              </div>

              <div className="form-group">
                <label htmlFor="bio" className="form-label">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="form-textarea"
                  placeholder="Conte um pouco sobre você..."
                  rows="4"
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  Foto de Perfil
                </label>
                
                {/* Show current avatar preview */}
                {(formData.avatar_url || user?.avatar_url) && (
                  <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
                    <img
                      src={formData.avatar_url || user.avatar_url}
                      alt="Avatar atual"
                      style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '3px solid rgba(139, 92, 246, 0.5)',
                      }}
                    />
                  </div>
                )}
                
                <AvatarUpload
                  currentAvatar={formData.avatar_url || user?.avatar_url}
                  onUploadSuccess={async (url) => {
                    // Atualizar no estado local
                    setFormData({ ...formData, avatar_url: url });
                    
                    // Salvar no banco de dados imediatamente
                    try {
                      const { error } = await supabase
                        .from('users')
                        .update({ avatar_url: url })
                        .eq('id', user.id);
                      
                      if (error) throw error;
                      
                      setMessage({ type: 'success', text: 'Foto atualizada com sucesso!' });
                      
                      // Reload profile AND force page refresh to update all components
                      await loadProfile();
                      setTimeout(() => {
                        window.location.reload();
                      }, 500);
                    } catch (err) {
                      console.error('Erro ao atualizar avatar:', err);
                      setMessage({ type: 'error', text: 'Erro ao salvar foto' });
                    }
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={isSaving}
                className="btn-save"
              >
                {isSaving ? 'Salvando...' : 'Salvar Alterações'}
              </button>
            </form>
          )}
        </GlassCard>

        <Footer />
      </div>
    </div>
  );
};

export default Profile;

