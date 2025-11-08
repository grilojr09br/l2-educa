# Guia de Deploy - Matemática de Nível Mestre

Este documento contém instruções para fazer o deploy da aplicação educacional.

## 📦 Build de Produção

### Passo 1: Gerar o arquivo HTML

```bash
npm run build
```

Isso criará o arquivo `dist/index.html` (~320 KB) que é completamente self-contained.

### Passo 2: Testar localmente

```bash
npm run preview
```

Ou simplesmente abra o arquivo `dist/index.html` diretamente no navegador.

## 🌐 Opções de Deploy

### Opção 1: Hospedagem Estática (Recomendado)

O arquivo `dist/index.html` pode ser hospedado em qualquer servidor web estático:

#### Netlify
1. Arraste o arquivo `index.html` para [Netlify Drop](https://app.netlify.com/drop)
2. Ou configure deploy automático:
   ```bash
   # Instalar Netlify CLI
   npm install -g netlify-cli
   
   # Deploy
   netlify deploy --prod --dir=dist
   ```

#### Vercel
```bash
# Instalar Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

#### GitHub Pages
1. Commit o código para o GitHub
2. Habilite GitHub Pages nas configurações do repositório
3. Configure para usar a branch `main` e pasta `/dist`

#### Cloudflare Pages
1. Conecte seu repositório
2. Configure build command: `npm run build`
3. Configure output directory: `dist`

### Opção 2: CDN

Para máxima performance, coloque o arquivo HTML em um CDN:

- **Cloudflare CDN**
- **AWS CloudFront**
- **Google Cloud CDN**
- **Azure CDN**

### Opção 3: Compartilhamento Direto

Como o arquivo é self-contained, você pode:

1. **Enviar por email** - O arquivo HTML pode ser enviado diretamente
2. **WhatsApp/Telegram** - Compartilhe o arquivo HTML
3. **Google Drive/Dropbox** - Hospede e compartilhe o link
4. **Servidor local** - Copie para qualquer servidor web

## ⚙️ Configurações de Servidor (Opcional)

Se estiver usando um servidor web tradicional, adicione estas configurações:

### Apache (.htaccess)
```apache
# Habilitar GZIP
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript
</IfModule>

# Cache headers
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/html "access plus 1 hour"
</IfModule>

# Fallback para SPA
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### Nginx
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/dist;
    
    # GZIP
    gzip on;
    gzip_types text/html text/css application/javascript;
    
    # Cache
    location / {
        try_files $uri $uri/ /index.html;
        add_header Cache-Control "public, max-age=3600";
    }
}
```

## 🔒 HTTPS

Para produção, sempre use HTTPS:

- **Let's Encrypt** (gratuito): Use Certbot
- **Cloudflare**: SSL automático
- **Netlify/Vercel**: HTTPS incluído gratuitamente

## 📊 Monitoramento

### Analytics (Opcional)

Para adicionar Google Analytics ou similar, edite o `index.html` antes do build:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Performance Monitoring

- **Lighthouse**: Audite com Chrome DevTools
- **PageSpeed Insights**: https://pagespeed.web.dev/
- **WebPageTest**: https://www.webpagetest.org/

## 🔄 Atualizações

Para atualizar a aplicação:

1. Faça as alterações no código fonte
2. Execute `npm run build`
3. Substitua o arquivo no servidor/CDN
4. Limpe o cache do CDN (se aplicável)

## 🎯 Otimizações de Performance

### Já Implementadas ✅
- ✅ Single file HTML (sem requests adicionais para JS/CSS)
- ✅ Código minificado
- ✅ Assets inline
- ✅ Lazy loading de componentes (via React)
- ✅ Animações otimizadas (CSS transforms)

### Opcionais
- [ ] Service Worker para PWA
- [ ] Compressão Brotli no servidor
- [ ] HTTP/2 Server Push
- [ ] Preload de fontes críticas

## 🌍 Multi-região

Para audiência global:

1. **Cloudflare**: Distribuição automática em +200 cidades
2. **AWS CloudFront**: Configure múltiplos edge locations
3. **Vercel**: Edge network global incluído

## 📱 Progressive Web App (PWA)

Para transformar em PWA (opcional):

1. Adicione `manifest.json`:
```json
{
  "name": "Matemática de Nível Mestre",
  "short_name": "L2 Educa",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0a0a0a",
  "theme_color": "#6366f1",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

2. Adicione Service Worker para cache offline

## 🧪 Testes Antes do Deploy

```bash
# Build
npm run build

# Preview local
npm run preview

# Teste em diferentes dispositivos
# - Desktop Chrome/Firefox/Safari
# - Mobile iOS Safari
# - Mobile Android Chrome
# - WhatsApp WebView (iOS e Android)
```

### Checklist de Deploy
- [ ] Build executado sem erros
- [ ] Teste em múltiplos navegadores
- [ ] Teste em mobile (iOS e Android)
- [ ] Teste no WhatsApp (compartilhar link)
- [ ] Verificar responsividade
- [ ] Verificar todas as interatividades
- [ ] Validar HTML (https://validator.w3.org/)
- [ ] Lighthouse Score > 90
- [ ] Tamanho do arquivo aceitável

## 📞 Suporte

Para questões sobre deploy:
- Documentação Vite: https://vitejs.dev/guide/static-deploy.html
- Netlify Docs: https://docs.netlify.com/
- Vercel Docs: https://vercel.com/docs

---

**Bom deploy! 🚀**

