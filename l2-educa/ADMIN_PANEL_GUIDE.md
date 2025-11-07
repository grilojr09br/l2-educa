# Admin Panel Guide - L2 EDUCA

## 🎯 Overview

The Admin Panel is a **development-only** tool that allows you to manage subject data, topic configurations, and test navigation routes in real-time. It is completely excluded from production builds for security and performance.

## 🔐 Access

### Development Mode
- **URL**: `http://localhost:5173/#/dev-admin`
- **Quick Access**: Click the blue "Admin Panel" button in the top-right corner of the Terminal page
- **Requirement**: Only accessible when running `npm run dev`

### Production Mode
- ❌ **Not accessible** - All admin files are automatically excluded from production builds
- Attempting to navigate to `/dev-admin` will redirect to the home page

## 🚀 Features

### 1. **Subject Management** (Tab 1)

#### Edit Subject
Click "Editar" on any subject card to modify:
- **Name**: Display name of the subject
- **Icon**: Material Icons name (e.g., `functions`, `science`, `biotech`)
- **Color**: Primary color (hex format)
- **Gradient**: CSS gradient string for visual effects
- **Description**: Short description shown on cards
- **Path**: Route path (e.g., `/math`, `/physics`)
- **Topics**: Number of topics available
- **Status**: Choose from:
  - `ativo` - Active and fully functional
  - `em atualização` - Being updated/improved
  - `em breve` - Coming soon
- **Coming Soon Flag**: Toggle to show/hide "Em Desenvolvimento" badge

#### Add New Subject
Click the "Adicionar Nova Disciplina" button to create a new subject with default values. You can then edit it immediately.

#### Delete Subject
Click "Deletar" to remove a subject (requires confirmation).

### 2. **Topics Management** (Tab 2)
Currently displays an info message. Topic management will be implemented in a future update. For now, edit topics directly in the page component files.

### 3. **Navigation Testing** (Tab 3)
- View all available routes
- Quick test links to navigate to any page
- Useful for verifying that all routes work correctly

## 💾 Persistence Modes

The admin panel supports three persistence modes to suit different workflows:

### Session Mode (Default)
- Changes last **only during current browser session**
- Resets when you refresh the page or close the browser
- Perfect for quick testing without affecting stored data

### LocalStorage Mode
- Changes are **saved permanently** to browser's localStorage
- Persists across browser refreshes and sessions
- Manual save required - click "Salvar no LocalStorage"
- Clear with "Limpar LocalStorage" button

### Manual Mode (Export/Import)
- **Export Config**: Download current configuration as JSON file
  - File name: `l2educa-config-[timestamp].json`
  - Includes all subject data and metadata
  
- **Import Config**: Load configuration from JSON file
  - Restores subjects from previously exported file
  - Useful for sharing configurations between team members

## 🎨 Common Use Cases

### Changing Subject Status
1. Navigate to `/dev-admin`
2. Click "Editar" on the subject you want to update
3. Change the "Status" dropdown
4. Click "Salvar"
5. Return to Terminal to see the updated status badge

### Testing New Subject
1. Click "Adicionar Nova Disciplina"
2. Edit the automatically created subject
3. Fill in all fields (name, icon, color, path, etc.)
4. Set status to "em breve" if not ready
5. Navigate to Terminal to see it appear in the grid

### Exporting Configuration for Production
1. Configure all subjects as needed
2. Select "Manual" persistence mode
3. Click "Exportar Config"
4. Share the JSON file with your team
5. Import on other machines or after resetting

### Quick Status Updates During Content Development
1. Set persistence mode to "LocalStorage"
2. Update statuses as you work on different subjects
3. Changes persist across page refreshes
4. Build production when ready - admin changes won't affect it

## 🔧 Technical Details

### Architecture
```
src/
├── contexts/
│   └── AdminContext.jsx      # State management & persistence
├── components/
│   └── AdminGuard.jsx         # Dev-only route protection
└── pages/
    └── AdminPanel.jsx         # Main admin UI
    └── AdminPanel.css         # Admin-specific styles
```

### Integration with App
- `App.jsx`: AdminProvider wraps entire app, AdminPanel route is conditional
- `Terminal.jsx`: Uses `useAdmin()` hook to get dynamic subjects array
- `vite.config.js`: Custom plugin excludes admin files from production builds

### Data Flow
```
AdminContext (Source of Truth)
    ↓
Terminal.jsx (Consumer)
    ↓
Subject Cards (Display)
```

All subject data flows from `AdminContext`, ensuring consistency across the app.

## 🚨 Security & Production

### What's Excluded from Production
- `/pages/AdminPanel.jsx` and `/pages/AdminPanel.css`
- `/contexts/AdminContext.jsx`
- `/components/AdminGuard.jsx`
- Admin route in `App.jsx`
- "Admin Panel" button in Terminal

### How It Works
1. **Conditional Imports**: Admin components only import in development
2. **Conditional Routes**: Admin route only renders when `import.meta.env.MODE === 'development'`
3. **Vite Plugin**: Custom plugin intercepts admin file imports during production build
4. **Route Guard**: AdminGuard redirects to home if accessed in production

### Verification
After building for production (`npm run build`):
```bash
# Check dist/assets/ for admin files (should NOT exist)
ls dist/assets/ | grep -i admin

# Check bundle size (should be similar to pre-admin size)
ls -lh dist/assets/*.js
```

## 🔮 Future Enhancements

### Backend Authentication (Prepared)
The admin system includes placeholders for future backend integration:

```jsx
// In AdminContext.jsx
const login = async (username, password) => {
  // TODO: Replace with actual API call
  // const response = await fetch('/api/auth/login', {...})
};
```

When implementing backend auth:
1. Replace placeholder functions in `AdminContext.jsx`
2. Update `AdminGuard.jsx` to check backend session
3. Add login UI component
4. Implement JWT/session management

### Topics Management
The "Topics" tab is prepared for future implementation:
- Toggle topic availability
- Mark topics as "coming soon"
- Reorder topics
- Edit topic metadata (title, description, difficulty)

## 📝 Tips & Best Practices

1. **Use Session Mode for Experiments**: Test changes without worrying about persistence
2. **Export Before Major Changes**: Always export current config before making large modifications
3. **Verify Routes**: Use Navigation tab to test new routes before committing
4. **Status Consistency**: Keep status fields consistent with actual content state
5. **LocalStorage Limits**: Browser localStorage is limited (~5-10MB), export regularly for backup

## 🐛 Troubleshooting

### Admin Panel Not Accessible
- ✅ Ensure you're running in development mode (`npm run dev`)
- ✅ Check URL is `/#/dev-admin` not `/dev-admin`
- ✅ Verify no JavaScript errors in browser console

### Changes Not Persisting
- ✅ Check persistence mode (may be in Session mode)
- ✅ Click "Salvar no LocalStorage" if using LocalStorage mode
- ✅ Verify browser allows localStorage (not in incognito mode)

### Admin Button Not Showing
- ✅ Confirm `import.meta.env.MODE === 'development'`
- ✅ Check browser console for component errors
- ✅ Clear browser cache and refresh

### Production Build Includes Admin Files
- ✅ Run `npm run build` and check `dist/assets/`
- ✅ Verify vite.config.js plugin is active
- ✅ Check console output during build for exclusion messages

## 📚 Related Documentation

- **Creating New Pages**: See `guias-importantes/02-COMO-CRIAR-NOVA-PAGINA-MATERIA.md`
- **Project Structure**: See `guias-importantes/01-ESTRUTURA-DO-SITE.md`
- **Deployment**: See `DEPLOYMENT_GUIDE.md`

---

**Last Updated**: October 2025  
**Version**: 1.0.0  
**Maintainer**: L2 Development Team

