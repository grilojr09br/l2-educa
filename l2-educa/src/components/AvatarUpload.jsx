import React, { useState, useRef } from 'react';
import { supabase } from '../config/supabase';
import { useAuth } from '../contexts/AuthContext';
import './AvatarUpload.css';

const AvatarUpload = ({ currentAvatar, onUploadSuccess }) => {
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentAvatar);
  const [error, setError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState('');
  const fileInputRef = useRef(null);

  // Magic byte signatures for file validation
  const IMAGE_SIGNATURES = {
    'image/jpeg': [0xff, 0xd8, 0xff],
    'image/png': [0x89, 0x50, 0x4e, 0x47],
    'image/webp': [0x52, 0x49, 0x46, 0x46],
    'image/gif': [0x47, 0x49, 0x46, 0x38],
  };

  /**
   * Validates file signature (magic bytes) to prevent malicious files
   */
  const validateFileSignature = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const arr = new Uint8Array(e.target.result).subarray(0, 8);
        
        // Check against known image signatures
        for (const [mimeType, signature] of Object.entries(IMAGE_SIGNATURES)) {
          const matches = signature.every((byte, index) => arr[index] === byte);
          if (matches) {
            resolve({ valid: true, detectedType: mimeType });
            return;
          }
        }
        
        reject(new Error('Arquivo inválido. Formato não reconhecido como imagem.'));
      };
      reader.onerror = () => reject(new Error('Erro ao ler arquivo'));
      reader.readAsArrayBuffer(file.slice(0, 8));
    });
  };

  /**
   * Frontend image compression with progressive quality
   * Strips metadata by re-encoding through canvas
   */
  const compressImage = async (file, targetSize = 500) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          
          // Smart sizing: 400px for small images, 600px for larger
          const originalSize = file.size / 1024; // KB
          const MAX_SIZE = originalSize > 1024 ? 600 : 400;
          
          let width = img.width;
          let height = img.height;

          // Calcular proporções mantendo aspecto
          if (width > height) {
            if (width > MAX_SIZE) {
              height *= MAX_SIZE / width;
              width = MAX_SIZE;
            }
          } else {
            if (height > MAX_SIZE) {
              width *= MAX_SIZE / height;
              height = MAX_SIZE;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          
          // Fill background for transparency (if any)
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, width, height);
          
          // Draw image (this strips all EXIF metadata)
          ctx.drawImage(img, 0, 0, width, height);

          // Progressive quality compression
          let quality = 0.88; // Start with high quality
          
          const tryCompress = () => {
            canvas.toBlob(
              (blob) => {
                if (blob) {
                  const compressedSize = blob.size / 1024; // KB
                  
                  // If still too large and quality can be reduced, try again
                  if (compressedSize > targetSize && quality > 0.6) {
                    quality -= 0.1;
                    tryCompress();
                  } else {
                    resolve(blob);
                  }
                } else {
                  reject(new Error('Falha ao comprimir imagem'));
                }
              },
              'image/jpeg', // JPEG para melhor compatibilidade
              quality
            );
          };
          
          tryCompress();
        };
        img.onerror = () => reject(new Error('Falha ao carregar imagem'));
      };
      reader.onerror = () => reject(new Error('Falha ao ler arquivo'));
    });
  };

  const handleFileSelect = async (event) => {
    try {
      setError(null);
      setUploadProgress('');
      const file = event.target.files?.[0];
      
      if (!file) return;

      // Validar tipo de arquivo MIME
      if (!file.type.startsWith('image/')) {
        setError('Por favor, selecione uma imagem válida');
        return;
      }

      setUploading(true);
      
      // Step 1: Validate file signature (magic bytes)
      setUploadProgress('🔍 Validando arquivo...');
      console.log('🔍 Validando assinatura do arquivo...');
      try {
        await validateFileSignature(file);
        console.log('✅ Arquivo válido');
      } catch (validationError) {
        throw new Error(validationError.message);
      }

      // Step 2: Frontend compression (quick initial optimization)
      setUploadProgress('📦 Comprimindo imagem...');
      console.log('📦 Comprimindo imagem (frontend)...');
      const compressedBlob = await compressImage(file);
      console.log('✅ Compressão frontend completa:', {
        original: (file.size / 1024).toFixed(2) + ' KB',
        compressed: (compressedBlob.size / 1024).toFixed(2) + ' KB',
        reduction: ((1 - compressedBlob.size / file.size) * 100).toFixed(1) + '%'
      });

      // Step 3: Send to backend for additional security processing
      setUploadProgress('🔐 Processando com segurança...');
      console.log('🔐 Enviando para processamento backend...');
      
      const formData = new FormData();
      formData.append('image', compressedBlob, 'avatar.jpg');

      // Get auth token from Supabase session
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) {
        throw new Error('Sessão expirada. Faça login novamente.');
      }

      // Call backend optimization endpoint
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';
      const response = await fetch(`${backendUrl}/api/images/optimize-avatar`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Erro no processamento backend');
      }

      // Get optimized image from backend
      const optimizedBlob = await response.blob();
      const reductionHeader = response.headers.get('X-Reduction');
      console.log('✅ Otimização backend completa:', {
        finalSize: (optimizedBlob.size / 1024).toFixed(2) + ' KB',
        totalReduction: reductionHeader || 'N/A',
      });

      // Step 4: Upload to Supabase Storage
      setUploadProgress('☁️ Enviando para nuvem...');
      console.log('☁️ Fazendo upload para Supabase...');
      
      const fileExt = 'jpg';
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      // Don't include 'avatars/' in path - bucket is already 'avatars'
      const filePath = fileName;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, optimizedBlob, {
          contentType: 'image/jpeg',
          upsert: true,
          cacheControl: '3600',
        });

      if (uploadError) {
        throw uploadError;
      }

      // Obter URL pública
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      console.log('✅ Upload completo:', publicUrl);
      setUploadProgress('✅ Concluído!');

      // Atualizar preview
      setPreview(publicUrl);

      // Chamar callback de sucesso
      if (onUploadSuccess) {
        onUploadSuccess(publicUrl);
      }

    } catch (err) {
      console.error('❌ Erro no upload:', err);
      setError(err.message || 'Erro ao fazer upload da imagem');
    } finally {
      setUploading(false);
      setTimeout(() => setUploadProgress(''), 3000);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = async () => {
    try {
      setError(null);
      setPreview(null);
      if (onUploadSuccess) {
        onUploadSuccess(null);
      }
    } catch (err) {
      console.error('Erro ao remover avatar:', err);
      setError('Erro ao remover foto');
    }
  };

  return (
    <div className="avatar-upload">
      <div className="avatar-preview" onClick={handleClick}>
        {preview ? (
          <img src={preview} alt="Avatar" className="avatar-image" />
        ) : (
          <div className="avatar-placeholder">
            <span className="material-icons">account_circle</span>
          </div>
        )}
        
        {uploading && (
          <div className="avatar-loading">
            <div className="spinner"></div>
          </div>
        )}

        {!uploading && (
          <div className="avatar-overlay">
            <span className="material-icons">camera_alt</span>
            <span className="overlay-text">Alterar foto</span>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="avatar-input"
        disabled={uploading}
      />

      <div className="avatar-actions">
        <button
          type="button"
          onClick={handleClick}
          disabled={uploading}
          className="btn-upload"
        >
          {uploading ? 'Enviando...' : 'Escolher Foto'}
        </button>
        
        {preview && !uploading && (
          <button
            type="button"
            onClick={handleRemove}
            className="btn-remove"
          >
            Remover
          </button>
        )}
      </div>

      {uploadProgress && (
        <div className="avatar-progress">
          {uploadProgress}
        </div>
      )}

      {error && (
        <div className="avatar-error">
          {error}
        </div>
      )}

      <p className="avatar-hint">
        JPG, PNG, WebP ou GIF. Sem limite de tamanho. 
        Otimização automática com segurança.
      </p>
    </div>
  );
};

export default AvatarUpload;


