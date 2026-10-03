# Design System - DirectGros SaaS

## Palette de Couleurs

### Primaires
- **Gradient Principal**: #667eea → #764ba2 (Violet/Indigo)
- **Accent Rose**: #f5576c
- **Orange Accent**: #ffa500

### Secondaires
- **Blanc**: #ffffff
- **Gris Clair**: #f9f9f9
- **Gris Moyen**: #666666
- **Gris Foncé**: #1a1a1a
- **Bordure**: #eeeeee

### Statuts
- **Succès**: #4caf50
- **Alerte**: #ffa500
- **Critique**: #f5576c
- **Info**: #667eea

## Typographie

### Fonts
- **Système**: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif

### Hiérarchie
- **H1**: 42px, 800, line-height: 1.2
- **H2**: 28px, 700, line-height: 1.3
- **H3**: 20px, 600, line-height: 1.4
- **Body**: 16px, 400, line-height: 1.6
- **Small**: 14px, 400, line-height: 1.5
- **Label**: 12px, 600, uppercase, letter-spacing: 0.5px

## Spacing

### Scale (8px base)
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- xxl: 48px
- xxxl: 64px

## Composants

### Boutons
- **Primary**: Fond gradient, texte blanc
- **Secondary**: Fond transparent, bordure, texte couleur
- **Danger**: Fond rouge (#f5576c), texte blanc
- **Ghost**: Pas de fond, texte couleur

### Cartes
- Arrondis: 12px
- Ombre: 0 4px 16px rgba(0,0,0,0.15)
- Bordure sup: 4px solid (couleur selon contexte)
- Padding: 24px
- Hover: translateY(-4px), ombre augmentée

### Badges
- Padding: 6px 12px
- Arrondi: 20px
- Font-size: 12px
- Fond transparent, texte coloré

### Inputs
- Bordure: 1px solid #ddd
- Padding: 12px 16px
- Arrondi: 8px
- Focus: bordure #667eea, ombre légère

## Breakpoints

- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: < 768px

## Animations

- **Transition standard**: 0.3s ease
- **Hover card**: translateY(-4px), shadow increase
- **Focus outline**: 2px solid, 2px offset

## Accessibilité

- Contraste minimum: AA (4.5:1 pour texte)
- Focus visible obligatoire
- Alt text sur toutes images
- Texte > 12px lisible
