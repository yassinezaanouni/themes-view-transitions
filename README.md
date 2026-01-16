# View Transitions Playground

A beautiful, modern showcase of theme transitions using the View Transition API. Built with Next.js 15, React 19, and shadcn/ui.

## ✨ Features

- **31 Unique Transitions**: Explore different transition effects including circular reveal, fade & slide, vertical wipe, scale & fade, diagonal slide, and rotate & zoom...
- **Live Demos**: Interactive demos for each transition with replay functionality
- **Code Viewer**: Syntax-highlighted code blocks with copy functionality
- **Responsive Design**: Beautiful on all screen sizes
- **Dark Mode**: Smooth theme switching with animated transitions
- **Modern Stack**: Built with the latest Next.js, React, and Tailwind CSS

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd themes-view-transitions
```

2. Install dependencies:

```bash
pnpm install
```

3. Run the development server:

```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎨 Transitions Included

### Theme Transitions

1. **Circular Reveal Theme** - Circular reveal animation originating from the toggle button
2. **Vertical Wipe Theme** - Vertical wipe effect for theme changes
3. **Diagonal Slide Theme** - Diagonal sliding animation

### Navigation Transitions

1. **Fade & Slide Navigation** - Smooth fade and slide effect for page navigation
2. **Scale & Fade** - Scale and fade effect for smooth transitions
3. **Rotate & Zoom** - Rotating zoom effect for dramatic page changes

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **React**: React 19
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui
- **Animations**: Motion (Framer Motion)
- **Theme Management**: next-themes
- **Syntax Highlighting**: react-syntax-highlighter
- **Icons**: Lucide React

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with theme provider
│   ├── page.tsx            # Gallery page
│   └── transition/
│       └── [slug]/
│           └── page.tsx    # Detail page for each transition
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── code-block.tsx      # Code viewer with syntax highlighting
│   ├── theme-provider.tsx  # Theme context provider
│   ├── theme-toggle.tsx    # Animated theme toggle button
│   ├── transition-card.tsx # Gallery card component
│   ├── transition-detail.tsx # Detail page component
│   └── view-transition-link.tsx # Link with View Transition API
└── data/
    └── transitions.ts      # Transition data and code snippets
```

## 🌐 Browser Support

The View Transition API is supported in:

- ✅ Chrome 111+
- ✅ Edge 111+
- ✅ Safari 18+
- ⚠️ Firefox (in development)

The site gracefully falls back to regular transitions in unsupported browsers.

## 📝 Adding New Transitions

To add a new transition:

1. Add the transition data to `src/data/transitions.ts`:

```typescript
{
  id: '7',
  title: 'Your Transition Name',
  slug: 'your-transition-slug',
  description: 'Description of your transition',
  category: 'Theme' or 'Navigation',
  globalCss: `/* Your CSS here */`,
  componentCode: `/* Your component code here */`,
}
```

2. The transition will automatically appear in the gallery!

## 🎯 Key Features Explained

### View Transition API Integration

The project uses the View Transition API to create smooth, animated transitions between pages and theme changes. The API is accessed through:

```typescript
document.startViewTransition(() => {
  // Your state change here
});
```

### Semantic Tokens

All colors use semantic tokens from the design system, making it easy to maintain consistency and support theming:

```css
--color-primary
--color-chart-1
--color-background
```

### Responsive Grid

The gallery uses a responsive grid that adapts to different screen sizes:

- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3 columns

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

---

Built with ❤️ using Next.js and the View Transition API
