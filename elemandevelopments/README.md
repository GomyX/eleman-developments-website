# El Eman Developments Website

A premium real estate developer website for El Eman Developments, targeting the Egyptian market with Arabic/English bilingual support.

## 🏗️ Project Overview

El Eman Developments is a subsidiary of El Eman Group focused on property development and sales. This website showcases luxury residential projects in Egypt with a focus on the Egyptian market and Islamic cultural sensitivity.

## 🎨 Brand Identity

- **Brand Name:** El Eman Developments
- **Tagline:** "Where Belief Takes Shape" (حيث يتشكل الإيمان)
- **Brand Voice:** Visionary, Nurturing, Elevated
- **Target Market:** Egyptian property buyers, investors (70% mobile traffic)

## 🎨 Design System

### Color Palette
- **Warm Gold:** #E8B883 (dominant color - warmth & luxury)
- **Pure Black:** #040404 (text & strong contrasts)
- **Charcoal:** #6D6C6B (secondary text & subtle elements)
- **Light Gray:** #9D9B98 (borders & inactive states)
- **Off White:** #F3F2F2 (backgrounds & cards)
- **Dark Gray:** #4E4D4C (headers & navigation)
- **Deep Charcoal:** #3C3B3C (footer & dark sections)
- **Burnt Orange:** #D79C5C (CTAs & accent buttons)
- **Muted Purple:** #847C84 (subtle accents & hover states)
- **Caramel:** #BC8C64 (secondary buttons & highlights)

### Typography
- **Arabic:** 'Noto Sans Arabic', sans-serif
- **English:** 'Montserrat', sans-serif
- **Weights:** 400 (regular), 600 (semi-bold), 700 (bold)

## 🛠️ Tech Stack

- **Framework:** Next.js 14+ with App Router
- **Styling:** Tailwind CSS with custom color configuration
- **UI Components:** Radix UI primitives
- **Internationalization:** next-intl with RTL support
- **Language:** TypeScript
- **Icons:** Lucide React
- **Images:** Next.js Image optimization

## 📁 Project Structure

```
src/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx (locale-specific layout)
│   │   ├── page.tsx (homepage)
│   │   ├── projects/
│   │   │   └── page.tsx (projects listing)
│   │   ├── about/
│   │   │   └── page.tsx (about page)
│   │   ├── investment/
│   │   │   └── page.tsx (investment page)
│   │   └── contact/
│   │       └── page.tsx (contact page)
│   └── layout.tsx (root layout)
├── components/
│   ├── layout/
│   │   ├── Header.tsx (navigation header)
│   │   └── Footer.tsx (footer)
│   └── ui/
│       └── WhatsAppButton.tsx (floating WhatsApp button)
├── data/
│   └── projects.ts (sample project data)
├── lib/
│   └── utils.ts (utility functions)
└── styles/
    └── globals.css (global styles)
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd elemandevelopments
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🌐 Internationalization

The website supports Arabic (RTL) and English (LTR) with automatic locale detection:

- **Arabic (default):** `/ar`
- **English:** `/en`

### Adding New Translations

1. Add new keys to `messages/ar.json` and `messages/en.json`
2. Use the `useTranslations` hook in components:
```typescript
const t = useTranslations('namespace');
```

## 📱 Mobile-First Design

The website is optimized for mobile devices with:
- Touch-friendly navigation (44px minimum tap targets)
- Responsive design with mobile-first approach
- Fast loading on 3G networks
- WhatsApp integration for Egyptian market

## 🎯 Key Features

### Homepage
- Hero section with call-to-action buttons
- Featured projects showcase
- Why choose El Eman section
- Success stories and testimonials
- Latest updates section

### Projects
- Advanced filtering system
- Project cards with detailed information
- Status indicators (Under Construction, Ready for Delivery, Planning)
- Unit types and pricing information

### Contact
- Contact form with validation
- Office locations and contact information
- Emergency contact section
- WhatsApp integration

### Investment
- Investment opportunities overview
- ROI calculators
- Market analysis
- Investment benefits

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file:
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Tailwind Configuration
Custom colors and fonts are configured in `tailwind.config.ts`

## 📦 Build & Deployment

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Export Static Site
```bash
npm run export
```

## 🚀 Deployment

The project is optimized for AWS Amplify deployment:

1. Connect your repository to AWS Amplify
2. Configure build settings:
   - Build command: `npm run build`
   - Output directory: `.next`
3. Deploy

## 📊 Performance

- Lighthouse score target: 90+ on mobile
- Core Web Vitals optimization
- Image optimization with Next.js Image component
- Lazy loading for all media
- Efficient bundle splitting

## 🔒 Security

- No sensitive data in client-side code
- Environment variables for API keys
- Input validation on forms
- HTTPS enforcement in production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary to El Eman Developments.

## 📞 Support

For support and questions:
- Email: info@elemandevelopments.com
- Phone: +20 123 456 7890

---

**El Eman Developments** - Where Belief Takes Shape
