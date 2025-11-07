# 📧 Templates de Email - L2 EDUCA

Templates personalizados em português para o Supabase Auth.

## Como Configurar

1. Acesse o Dashboard do Supabase: https://app.supabase.com
2. Selecione seu projeto
3. Vá para **Authentication** → **Email Templates**
4. Copie e cole os templates abaixo

---

## 1. Confirm Signup (Verificação de Email)

**Nome no Supabase**: `Confirm signup`

**Assunto**: `Confirme seu email - L2 EDUCA`

**Corpo do Email** (HTML):

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirme seu email</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .header {
      background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
      padding: 40px 20px;
      text-align: center;
    }
    .header h1 {
      color: #ffffff;
      margin: 0;
      font-size: 32px;
      font-weight: 700;
    }
    .content {
      padding: 40px 30px;
    }
    .content h2 {
      color: #1a1a1a;
      font-size: 24px;
      margin-top: 0;
    }
    .content p {
      color: #4a4a4a;
      font-size: 16px;
      margin-bottom: 20px;
    }
    .button {
      display: inline-block;
      padding: 14px 32px;
      background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
      color: #ffffff !important;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      font-size: 16px;
      margin: 20px 0;
    }
    .button:hover {
      background: linear-gradient(135deg, #7c3aed 0%, #c084fc 100%);
    }
    .link-backup {
      background-color: #f8f9fa;
      padding: 15px;
      border-radius: 6px;
      word-break: break-all;
      font-size: 13px;
      color: #666;
      margin: 20px 0;
    }
    .footer {
      background-color: #f8f9fa;
      padding: 30px;
      text-align: center;
      color: #666;
      font-size: 14px;
    }
    .footer p {
      margin: 5px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>L2 EDUCA</h1>
    </div>
    <div class="content">
      <h2>Bem-vindo à L2 EDUCA! 🎓</h2>
      <p>Obrigado por se cadastrar na nossa plataforma educacional.</p>
      <p>Para completar seu cadastro e ter acesso completo a todos os conteúdos, precisamos que você confirme seu endereço de email.</p>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="{{ .ConfirmationURL }}" class="button">
          ✓ Confirmar meu email
        </a>
      </div>
      
      <p><strong>Ou copie e cole este link no seu navegador:</strong></p>
      <div class="link-backup">
        {{ .ConfirmationURL }}
      </div>
      
      <p style="margin-top: 30px; color: #666; font-size: 14px;">
        <strong>Importante:</strong> Este link expira em 24 horas.
      </p>
      
      <p style="color: #999; font-size: 13px; margin-top: 30px;">
        Se você não criou uma conta na L2 EDUCA, pode ignorar este email com segurança.
      </p>
    </div>
    <div class="footer">
      <p><strong>L2 EDUCA</strong></p>
      <p>Plataforma Educacional Online</p>
      <p style="margin-top: 15px; font-size: 12px; color: #999;">
        Este é um email automático. Por favor, não responda.
      </p>
    </div>
  </div>
</body>
</html>
```

---

## 2. Invite User (Convidar Usuário)

**Nome no Supabase**: `Invite user`

**Assunto**: `Você foi convidado para L2 EDUCA`

**Corpo do Email** (HTML):

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Convite L2 EDUCA</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .header {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      padding: 40px 20px;
      text-align: center;
    }
    .header h1 {
      color: #ffffff;
      margin: 0;
      font-size: 32px;
      font-weight: 700;
    }
    .content {
      padding: 40px 30px;
    }
    .content h2 {
      color: #1a1a1a;
      font-size: 24px;
      margin-top: 0;
    }
    .content p {
      color: #4a4a4a;
      font-size: 16px;
      margin-bottom: 20px;
    }
    .button {
      display: inline-block;
      padding: 14px 32px;
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: #ffffff !important;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      font-size: 16px;
      margin: 20px 0;
    }
    .link-backup {
      background-color: #f8f9fa;
      padding: 15px;
      border-radius: 6px;
      word-break: break-all;
      font-size: 13px;
      color: #666;
      margin: 20px 0;
    }
    .footer {
      background-color: #f8f9fa;
      padding: 30px;
      text-align: center;
      color: #666;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>L2 EDUCA</h1>
    </div>
    <div class="content">
      <h2>Você foi convidado! 🎉</h2>
      <p>Você recebeu um convite para se juntar à <strong>L2 EDUCA</strong>, nossa plataforma educacional.</p>
      <p>Clique no botão abaixo para aceitar o convite e criar sua conta:</p>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="{{ .ConfirmationURL }}" class="button">
          Aceitar Convite
        </a>
      </div>
      
      <p><strong>Ou copie e cole este link no seu navegador:</strong></p>
      <div class="link-backup">
        {{ .ConfirmationURL }}
      </div>
      
      <p style="margin-top: 30px; color: #666; font-size: 14px;">
        <strong>Importante:</strong> Este convite expira em 24 horas.
      </p>
    </div>
    <div class="footer">
      <p><strong>L2 EDUCA</strong></p>
      <p>Plataforma Educacional Online</p>
    </div>
  </div>
</body>
</html>
```

---

## 3. Magic Link (Login sem senha)

**Nome no Supabase**: `Magic Link`

**Assunto**: `Seu link de acesso - L2 EDUCA`

**Corpo do Email** (HTML):

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Link de Acesso</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .header {
      background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
      padding: 40px 20px;
      text-align: center;
    }
    .header h1 {
      color: #ffffff;
      margin: 0;
      font-size: 32px;
      font-weight: 700;
    }
    .content {
      padding: 40px 30px;
    }
    .content h2 {
      color: #1a1a1a;
      font-size: 24px;
      margin-top: 0;
    }
    .content p {
      color: #4a4a4a;
      font-size: 16px;
      margin-bottom: 20px;
    }
    .button {
      display: inline-block;
      padding: 14px 32px;
      background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
      color: #ffffff !important;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      font-size: 16px;
      margin: 20px 0;
    }
    .link-backup {
      background-color: #f8f9fa;
      padding: 15px;
      border-radius: 6px;
      word-break: break-all;
      font-size: 13px;
      color: #666;
      margin: 20px 0;
    }
    .warning {
      background-color: #fef3c7;
      border-left: 4px solid #f59e0b;
      padding: 15px;
      margin: 20px 0;
      border-radius: 4px;
    }
    .footer {
      background-color: #f8f9fa;
      padding: 30px;
      text-align: center;
      color: #666;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>L2 EDUCA</h1>
    </div>
    <div class="content">
      <h2>Seu link de acesso 🔐</h2>
      <p>Recebemos uma solicitação de login na sua conta.</p>
      <p>Clique no botão abaixo para acessar a plataforma:</p>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="{{ .ConfirmationURL }}" class="button">
          Fazer Login
        </a>
      </div>
      
      <p><strong>Ou copie e cole este link no seu navegador:</strong></p>
      <div class="link-backup">
        {{ .ConfirmationURL }}
      </div>
      
      <div class="warning">
        <strong>⚠️ Atenção:</strong>
        <ul style="margin: 10px 0; padding-left: 20px;">
          <li>Este link expira em 1 hora</li>
          <li>Só pode ser usado uma vez</li>
          <li>Não compartilhe com ninguém</li>
        </ul>
      </div>
      
      <p style="color: #999; font-size: 13px; margin-top: 30px;">
        Se você não solicitou este login, ignore este email. Sua conta permanece segura.
      </p>
    </div>
    <div class="footer">
      <p><strong>L2 EDUCA</strong></p>
      <p>Plataforma Educacional Online</p>
    </div>
  </div>
</body>
</html>
```

---

## 4. Change Email Address (Mudança de Email)

**Nome no Supabase**: `Change Email Address`

**Assunto**: `Confirme a mudança de email - L2 EDUCA`

**Corpo do Email** (HTML):

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirme mudança de email</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .header {
      background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
      padding: 40px 20px;
      text-align: center;
    }
    .header h1 {
      color: #ffffff;
      margin: 0;
      font-size: 32px;
      font-weight: 700;
    }
    .content {
      padding: 40px 30px;
    }
    .content h2 {
      color: #1a1a1a;
      font-size: 24px;
      margin-top: 0;
    }
    .content p {
      color: #4a4a4a;
      font-size: 16px;
      margin-bottom: 20px;
    }
    .button {
      display: inline-block;
      padding: 14px 32px;
      background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
      color: #ffffff !important;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      font-size: 16px;
      margin: 20px 0;
    }
    .link-backup {
      background-color: #f8f9fa;
      padding: 15px;
      border-radius: 6px;
      word-break: break-all;
      font-size: 13px;
      color: #666;
      margin: 20px 0;
    }
    .footer {
      background-color: #f8f9fa;
      padding: 30px;
      text-align: center;
      color: #666;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>L2 EDUCA</h1>
    </div>
    <div class="content">
      <h2>Mudança de email solicitada 📧</h2>
      <p>Recebemos uma solicitação para alterar o email da sua conta L2 EDUCA.</p>
      <p><strong>Novo email:</strong> {{ .Email }}</p>
      <p>Para confirmar esta mudança, clique no botão abaixo:</p>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="{{ .ConfirmationURL }}" class="button">
          Confirmar Mudança
        </a>
      </div>
      
      <p><strong>Ou copie e cole este link no seu navegador:</strong></p>
      <div class="link-backup">
        {{ .ConfirmationURL }}
      </div>
      
      <p style="margin-top: 30px; color: #666; font-size: 14px;">
        <strong>Importante:</strong> Este link expira em 24 horas.
      </p>
      
      <p style="color: #999; font-size: 13px; margin-top: 30px;">
        Se você não solicitou esta mudança, ignore este email e seu email original permanecerá o mesmo.
      </p>
    </div>
    <div class="footer">
      <p><strong>L2 EDUCA</strong></p>
      <p>Plataforma Educacional Online</p>
    </div>
  </div>
</body>
</html>
```

---

## 5. Reset Password (Recuperação de Senha)

**Nome no Supabase**: `Reset Password`

**Assunto**: `Redefinir sua senha - L2 EDUCA`

**Corpo do Email** (HTML):

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Redefinir Senha</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .header {
      background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
      padding: 40px 20px;
      text-align: center;
    }
    .header h1 {
      color: #ffffff;
      margin: 0;
      font-size: 32px;
      font-weight: 700;
    }
    .content {
      padding: 40px 30px;
    }
    .content h2 {
      color: #1a1a1a;
      font-size: 24px;
      margin-top: 0;
    }
    .content p {
      color: #4a4a4a;
      font-size: 16px;
      margin-bottom: 20px;
    }
    .button {
      display: inline-block;
      padding: 14px 32px;
      background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
      color: #ffffff !important;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      font-size: 16px;
      margin: 20px 0;
    }
    .link-backup {
      background-color: #f8f9fa;
      padding: 15px;
      border-radius: 6px;
      word-break: break-all;
      font-size: 13px;
      color: #666;
      margin: 20px 0;
    }
    .warning {
      background-color: #fee2e2;
      border-left: 4px solid #ef4444;
      padding: 15px;
      margin: 20px 0;
      border-radius: 4px;
    }
    .footer {
      background-color: #f8f9fa;
      padding: 30px;
      text-align: center;
      color: #666;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>L2 EDUCA</h1>
    </div>
    <div class="content">
      <h2>Redefinir sua senha 🔑</h2>
      <p>Recebemos uma solicitação para redefinir a senha da sua conta L2 EDUCA.</p>
      <p>Clique no botão abaixo para criar uma nova senha:</p>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="{{ .ConfirmationURL }}" class="button">
          Redefinir Minha Senha
        </a>
      </div>
      
      <p><strong>Ou copie e cole este link no seu navegador:</strong></p>
      <div class="link-backup">
        {{ .ConfirmationURL }}
      </div>
      
      <div class="warning">
        <strong>⚠️ Atenção de Segurança:</strong>
        <ul style="margin: 10px 0; padding-left: 20px;">
          <li>Este link expira em 1 hora</li>
          <li>Só pode ser usado uma vez</li>
          <li>Não compartilhe com ninguém</li>
        </ul>
      </div>
      
      <p style="color: #999; font-size: 13px; margin-top: 30px;">
        <strong>Se você não solicitou esta redefinição de senha</strong>, ignore este email. Sua senha não será alterada.
      </p>
    </div>
    <div class="footer">
      <p><strong>L2 EDUCA</strong></p>
      <p>Plataforma Educacional Online</p>
      <p style="margin-top: 15px; font-size: 12px; color: #999;">
        Em caso de dúvidas sobre segurança, entre em contato conosco.
      </p>
    </div>
  </div>
</body>
</html>
```

---

## Variáveis Disponíveis

O Supabase fornece as seguintes variáveis que você pode usar nos templates:

- `{{ .Email }}` - Email do usuário
- `{{ .Token }}` - Token de verificação
- `{{ .TokenHash }}` - Hash do token
- `{{ .SiteURL }}` - URL do seu site
- `{{ .ConfirmationURL }}` - URL completa de confirmação (mais usado)
- `{{ .RedirectTo }}` - URL de redirecionamento

---

## Teste os Templates

Após configurar os templates:

1. Teste fazendo um novo cadastro
2. Teste resetando a senha
3. Verifique se os emails chegam corretamente
4. Confira se os links funcionam

---

## Dicas de Personalização

- **Logo**: Adicione o logo da L2 EDUCA no header
- **Cores**: Ajuste as cores do gradient para combinar com a marca
- **Rodapé**: Adicione links para redes sociais
- **Idioma**: Todos os templates estão em português brasileiro

---

## Problemas Comuns

### Email não chega

1. Verifique a pasta de spam
2. Aguarde alguns minutos (pode demorar)
3. Verifique se o email está configurado no Supabase
4. Configure SMTP customizado para melhor deliverability

### Link não funciona

1. Verifique se as redirect URLs estão configuradas
2. Certifique-se de que está usando `/#/` (HashRouter)
3. Verifique se o link não expirou

---

**Pronto! Seus emails estão prontos para uso! 📧✨**

