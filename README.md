# Elderly Computer Skills Game

A simple HTML/CSS/jQuery recreation of the Elderly Computer Skills Game designed to help elderly users learn basic computer skills.

## Features

- **6 Progressive Levels** covering different computer skills:
  - Levels 1-3: Copy & Paste (decreasing time limits: 60s, 30s, 15s)
  - Levels 4-5: Drag & Drop (30s, 15s)
  - Level 6: File Copy operations (30s)

- **Elderly-Friendly Design**:
  - Large buttons and text
  - High contrast colors
  - Clear visual feedback
  - Simple, intuitive interface

- **Educational Features**:
  - Step-by-step tutorials for each skill
  - Progress tracking (completed levels are saved)
  - Visual success/failure feedback
  - Countdown timer with color-coded warnings

## How to Run

1. **Simple Method**: Open `index.html` directly in your web browser
2. **Local Server Method**: 
   ```bash
   cd elderlygame
   python3 -m http.server 8000
   ```
   Then open http://localhost:8000 in your browser

## Game Mechanics

### Copy & Paste Levels (1-3)
- Players copy a phrase and paste it into 5 input boxes
- Real-time validation with color-coded feedback
- Green = correct, Red = incorrect, Gray = empty

### Drag & Drop Levels (4-5)
- Players drag files from a grid into a "My Documents" folder
- Visual feedback when hovering over drop zone
- Files disappear when successfully dropped

### File Copy Level (6)
- Players right-click files to copy them
- Right-click the backup folder to paste
- Visual feedback for copy/paste actions

## Technical Details

- **HTML5**: Semantic structure with accessibility in mind
- **CSS3**: Responsive design with elderly-friendly styling
- **jQuery**: Game logic and interactions
- **Local Storage**: Progress is saved between sessions
- **Drag & Drop API**: Native HTML5 drag and drop
- **Responsive**: Works on desktop and mobile devices

## Browser Compatibility

- Chrome/Edge: Full support
- Firefox: Full support  
- Safari: Full support
- Mobile browsers: Responsive design

## Files Structure

```
elderlygame/
├── index.html      # Main game file
├── styles.css      # All styling
├── game.js         # Game logic with jQuery
└── README.md       # This file
```

## Educational Value

This game teaches elderly users:
- Basic mouse operations (clicking, dragging)
- Keyboard shortcuts (Ctrl+C, Ctrl+V)
- File management concepts
- Right-click context menus
- Visual feedback interpretation

The progressive difficulty helps build confidence while the large, clear interface reduces frustration for elderly users.
