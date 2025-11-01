# Adding New Transitions

Follow these steps to add a new view transition:

## 1. Create CSS File
Create a new CSS file in `src/styles/transitions/your-transition-name.css`:

```css
@keyframes your-animation-name {
  0% { /* start state */ }
  100% { /* end state */ }
}

html.your-transition-name-transition::view-transition-old(root),
html.your-transition-name-transition::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

html.your-transition-name-transition::view-transition-old(root) {
  z-index: 1;
}

html.your-transition-name-transition::view-transition-new(root) {
  z-index: 2;
  animation: your-animation-name 0.5s ease-in-out forwards;
}
```

## 2. Import CSS
Add import to `src/styles/transitions.css`:
```css
@import './transitions/your-transition-name.css';
```

## 3. Add Type
Update `TransitionType` in `src/data/transitions.ts`:
```ts
export type TransitionType = 'theme-toggle' | 'vertical-wipe' | 'diagonal-slide' | 'your-transition-name';
```

## 4. Add Transition Object
Add new transition to the `transitions` array in `src/data/transitions.ts`:
```ts
{
  id: '6',
  title: 'Your Transition Name',
  slug: 'your-transition-name',
  description: 'Brief description of the animation',
  cssFile: 'your-transition-name.css',
  componentFile: 'theme-toggle.tsx',
}
```

That's it! The transition will automatically appear on the homepage and work with the play button.
