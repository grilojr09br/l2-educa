import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAdmin } from '../contexts/AdminContext';
import './AdminPanel.css';

const AdminPanel = () => {
  const {
    subjects,
    updateSubject,
    addSubject,
    deleteSubject,
    resetToDefault,
    exportConfig,
    importConfig,
    persistenceMode,
    setPersistenceMode,
    saveToLocalStorage,
    clearLocalStorage,
  } = useAdmin();

  const [activeTab, setActiveTab] = useState('subjects');
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [alert, setAlert] = useState(null);

  // Show alert message
  const showAlert = (message, type = 'success') => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000);
  };

  // Start editing a subject
  const handleEdit = (subject) => {
    setEditingId(subject.id);
    setEditForm({ ...subject });
  };

  // Cancel editing
  const handleCancel = () => {
    setEditingId(null);
    setEditForm({});
  };

  // Save edited subject
  const handleSave = () => {
    updateSubject(editingId, editForm);
    setEditingId(null);
    setEditForm({});
    showAlert('Disciplina atualizada com sucesso!');
  };

  // Delete subject with confirmation
  const handleDelete = (subjectId) => {
    if (window.confirm('Tem certeza que deseja deletar esta disciplina?')) {
      deleteSubject(subjectId);
      showAlert('Disciplina deletada com sucesso!', 'error');
    }
  };

  // Add new subject
  const handleAddSubject = () => {
    const newSubject = {
      id: `subject-${Date.now()}`,
      name: 'Nova Disciplina',
      icon: 'school',
      color: '#6366f1',
      gradient: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
      description: 'Descrição da disciplina',
      path: `/nova-disciplina-${Date.now()}`,
      topics: 0,
      status: 'em breve',
    };
    addSubject(newSubject);
    showAlert('Nova disciplina adicionada!', 'info');
  };

  // Handle import
  const handleImport = (e) => {
    const file = e.target.files[0];
    if (file) {
      importConfig(file)
        .then(() => {
          showAlert('Configuração importada com sucesso!');
        })
        .catch((err) => {
          showAlert('Erro ao importar configuração: ' + err.message, 'error');
        });
    }
  };

  // Handle reset
  const handleReset = () => {
    if (window.confirm('Tem certeza que deseja resetar para configuração padrão?')) {
      resetToDefault();
      showAlert('Configuração resetada!', 'info');
    }
  };

  console.warn('🔒 Admin Panel is DEV-ONLY and will not be included in production builds');

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>
          <span className="material-icons">admin_panel_settings</span>
          Admin Panel
          <span className="dev-badge">Dev Only</span>
        </h1>
        <p>Gerenciar disciplinas, tópicos e configurações do sistema</p>
      </div>

      {alert && (
        <div className={`alert alert-${alert.type}`}>
          <span className="material-icons">
            {alert.type === 'success' ? 'check_circle' : alert.type === 'error' ? 'error' : 'info'}
          </span>
          {alert.message}
        </div>
      )}

      <div className="admin-tabs">
        <button
          className={`admin-tab ${activeTab === 'subjects' ? 'active' : ''}`}
          onClick={() => setActiveTab('subjects')}
        >
          Disciplinas
        </button>
        <button
          className={`admin-tab ${activeTab === 'topics' ? 'active' : ''}`}
          onClick={() => setActiveTab('topics')}
        >
          Tópicos
        </button>
        <button
          className={`admin-tab ${activeTab === 'navigation' ? 'active' : ''}`}
          onClick={() => setActiveTab('navigation')}
        >
          Navegação
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'subjects' && (
          <>
            <div className="subjects-grid">
              {subjects.map((subject) => (
                <div
                  key={subject.id}
                  className={`subject-card ${editingId === subject.id ? 'editing' : ''}`}
                >
                  {editingId === subject.id ? (
                    <div className="edit-form">
                      <div className="form-group">
                        <label>Nome</label>
                        <input
                          type="text"
                          value={editForm.name || ''}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        />
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label>Ícone (Material Icons)</label>
                          <input
                            type="text"
                            value={editForm.icon || ''}
                            onChange={(e) => setEditForm({ ...editForm, icon: e.target.value })}
                          />
                        </div>

                        <div className="form-group">
                          <label>Cor</label>
                          <input
                            type="color"
                            value={editForm.color || '#6366f1'}
                            onChange={(e) => setEditForm({ ...editForm, color: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label>Gradiente CSS</label>
                        <input
                          type="text"
                          value={editForm.gradient || ''}
                          onChange={(e) => setEditForm({ ...editForm, gradient: e.target.value })}
                          placeholder="linear-gradient(135deg, #6366f1 0%, #a855f7 100%)"
                        />
                      </div>

                      <div className="form-group">
                        <label>Descrição</label>
                        <textarea
                          value={editForm.description || ''}
                          onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                          rows="2"
                        />
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label>Path</label>
                          <input
                            type="text"
                            value={editForm.path || ''}
                            onChange={(e) => setEditForm({ ...editForm, path: e.target.value })}
                          />
                        </div>

                        <div className="form-group">
                          <label>Número de Tópicos</label>
                          <input
                            type="number"
                            value={editForm.topics || 0}
                            onChange={(e) => setEditForm({ ...editForm, topics: parseInt(e.target.value) || 0 })}
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label>Status</label>
                          <select
                            value={editForm.status || 'ativo'}
                            onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                          >
                            <option value="ativo">Ativo</option>
                            <option value="em atualização">Em Atualização</option>
                            <option value="em breve">Em Breve</option>
                          </select>
                        </div>

                        <div className="form-group">
                          <label>Coming Soon?</label>
                          <select
                            value={editForm.comingSoon ? 'true' : 'false'}
                            onChange={(e) => setEditForm({ ...editForm, comingSoon: e.target.value === 'true' })}
                          >
                            <option value="false">Não</option>
                            <option value="true">Sim</option>
                          </select>
                        </div>
                      </div>

                      <div className="subject-card-actions">
                        <button className="btn btn-success" onClick={handleSave}>
                          <span className="material-icons">save</span>
                          Salvar
                        </button>
                        <button className="btn btn-secondary" onClick={handleCancel}>
                          <span className="material-icons">close</span>
                          Cancelar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="subject-card-header">
                        <div
                          className="subject-icon-preview"
                          style={{ background: subject.gradient }}
                        >
                          <span className="material-icons">{subject.icon}</span>
                        </div>
                        <div className="subject-card-title">
                          <h3>{subject.name}</h3>
                          <span className={`subject-status-badge ${subject.status.replace(' ', '-')}`}>
                            {subject.status}
                          </span>
                        </div>
                      </div>

                      <p className="subject-card-info">
                        <strong>Path:</strong> {subject.path}
                      </p>
                      <p className="subject-card-info">
                        <strong>Tópicos:</strong> {subject.topics}
                      </p>
                      <p className="subject-card-info">
                        <strong>Descrição:</strong> {subject.description}
                      </p>

                      <div className="subject-card-actions">
                        <button className="btn btn-primary" onClick={() => handleEdit(subject)}>
                          <span className="material-icons">edit</span>
                          Editar
                        </button>
                        <button className="btn btn-danger" onClick={() => handleDelete(subject.id)}>
                          <span className="material-icons">delete</span>
                          Deletar
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}

              <button className="add-subject-btn" onClick={handleAddSubject}>
                <span className="material-icons">add_circle</span>
                Adicionar Nova Disciplina
              </button>
            </div>
          </>
        )}

        {activeTab === 'topics' && (
          <div className="alert alert-info">
            <span className="material-icons">info</span>
            Gerenciamento de tópicos será implementado em breve. Por enquanto, edite os tópicos diretamente nos arquivos de página.
          </div>
        )}

        {activeTab === 'navigation' && (
          <>
            <h3>Testar Navegação</h3>
            <div className="nav-test-grid">
              <div className="nav-test-item">
                <h4>Terminal (Home)</h4>
                <p>/</p>
                <Link to="/" className="btn btn-primary">
                  <span className="material-icons">home</span>
                  Testar
                </Link>
              </div>

              {subjects.map((subject) => (
                <div key={subject.id} className="nav-test-item">
                  <h4>{subject.name}</h4>
                  <p>{subject.path}</p>
                  <Link to={subject.path} className="btn btn-primary">
                    <span className="material-icons">open_in_new</span>
                    Testar
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Persistence Controls */}
      <div className="persistence-controls">
        <div className="persistence-mode">
          <label>Modo de Persistência:</label>
          <select
            value={persistenceMode}
            onChange={(e) => setPersistenceMode(e.target.value)}
          >
            <option value="session">Sessão (Temporário)</option>
            <option value="localStorage">LocalStorage (Persistente)</option>
            <option value="manual">Manual (Export/Import)</option>
          </select>
        </div>

        <div className="persistence-actions">
          {persistenceMode === 'localStorage' && (
            <>
              <button className="btn btn-success" onClick={saveToLocalStorage}>
                <span className="material-icons">save</span>
                Salvar no LocalStorage
              </button>
              <button className="btn btn-danger" onClick={clearLocalStorage}>
                <span className="material-icons">delete</span>
                Limpar LocalStorage
              </button>
            </>
          )}

          <button className="btn btn-primary" onClick={exportConfig}>
            <span className="material-icons">download</span>
            Exportar Config
          </button>

          <div className="file-input-wrapper">
            <button className="btn btn-primary">
              <span className="material-icons">upload</span>
              Importar Config
            </button>
            <input type="file" accept=".json" onChange={handleImport} />
          </div>

          <button className="btn btn-secondary" onClick={handleReset}>
            <span className="material-icons">restore</span>
            Resetar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;

