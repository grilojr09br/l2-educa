# Admin Panel - Quick Start Guide

## 🚀 Quick Start (2 minutes)

### 1. Start Development Server
```bash
cd l2-educa
npm run dev
```

### 2. Access Admin Panel
- Open browser to `http://localhost:5173`
- Click the blue "**Admin Panel**" button in the top-right corner
- Or navigate directly to `http://localhost:5173/#/dev-admin`

### 3. Make Your First Edit
1. Click "**Editar**" on any subject card
2. Change the "**Status**" dropdown:
   - `ativo` = Active (green badge)
   - `em atualização` = Being Updated (orange badge)
   - `em breve` = Coming Soon (gray badge)
3. Click "**Salvar**"
4. Navigate back to Terminal to see the updated badge!

## 🎯 Common Tasks

### Change Subject Status
```
Admin Panel → Subjects Tab → Edit Subject → Change Status → Save
```

### Add New Subject
```
Admin Panel → Click "Adicionar Nova Disciplina" → Edit fields → Save
```

### Export Configuration
```
Admin Panel → Bottom Bar → Select "Manual" mode → Click "Exportar Config"
```

### Import Configuration
```
Admin Panel → Bottom Bar → Select "Manual" mode → Click "Importar Config" → Choose file
```

## 💾 Persistence Modes

### Session (Default) - Quick Testing
- Changes disappear on page refresh
- Perfect for experiments
- No setup needed

### LocalStorage - Persistent Changes
1. Select "**LocalStorage**" in bottom bar
2. Make your changes
3. Click "**Salvar no LocalStorage**"
4. Changes persist across refreshes

### Manual - Export/Import
1. Select "**Manual**" in bottom bar
2. Click "**Exportar Config**" to download JSON
3. Click "**Importar Config**" to restore from JSON
4. Share configs with team members

## 🔒 Security Notes

- ✅ **Dev Only**: Admin panel ONLY works in development mode
- ✅ **Production Safe**: Completely excluded from production builds
- ✅ **No Secrets**: All data is client-side configuration
- ✅ **Route Protected**: /dev-admin redirects in production

## 📝 Example Workflow

### Updating Subject During Content Development

1. Start dev server: `npm run dev`
2. Open admin panel
3. Set persistence to "LocalStorage"
4. Mark subjects as "em atualização" while working on them
5. Mark as "ativo" when content is complete
6. Changes persist while you work
7. Build for production when ready: `npm run build`
   - Admin panel is automatically excluded
   - Your status changes don't affect production (use default statuses)

## 🎨 Customization Examples

### Change Subject Color
```
Edit Subject → Color field → Pick new color → Save
```

### Change Icon (Material Icons)
```
Edit Subject → Icon field → Enter icon name → Save
Examples: functions, science, biotech, nature, psychology
```

### Update Description
```
Edit Subject → Description field → Type new description → Save
```

## 🐛 Troubleshooting

### Admin Button Not Showing?
- ✅ Ensure you're running `npm run dev` (not production build)
- ✅ Check browser console for errors
- ✅ Refresh page

### Changes Not Saving?
- ✅ Check persistence mode (may be in Session mode)
- ✅ Click "Salvar no LocalStorage" if using LocalStorage mode
- ✅ Browser must allow localStorage (won't work in incognito)

### Admin Panel Shows 404?
- ✅ Use hash router: `/#/dev-admin` not `/dev-admin`
- ✅ Only accessible in development mode

## 📚 Full Documentation

For complete documentation, see:
- **User Guide**: `ADMIN_PANEL_GUIDE.md`
- **Implementation Details**: `ADMIN_IMPLEMENTATION_SUMMARY.md`

## 💡 Tips

1. **Export Before Big Changes**: Always export current config before major modifications
2. **Use Session for Experiments**: Test changes without worrying about persistence
3. **LocalStorage for Development**: Keep changes while working on content
4. **Verify in Terminal**: Always check Terminal page to see how changes look
5. **Production Builds**: Admin changes don't affect production - it uses code defaults

---

**Need Help?** See full documentation in `ADMIN_PANEL_GUIDE.md`

