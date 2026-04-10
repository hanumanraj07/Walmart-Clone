# Walmart Clone - Modern React E-commerce

A production-quality e-commerce website built with React 18 + Vite that replicates the Walmart online shopping experience. Features a modern, polished UI with comprehensive retail functionality.

## Features

### Core Pages
- **Home** - Hero carousel, flash deals with countdown timers, category shortcuts, product carousels
- **Login/Signup** - Authentication forms with validation, password strength meter, floating labels
- **Cart** - Two-column layout, quantity controls, order summary with sticky sidebar
- **Payment** - Multi-step checkout with step indicator, payment method selector
- **Success** - Order confirmation with animated checkmark and recommendations

### UI/UX Features
- **Hero Carousel** - Auto-advancing slides with dot indicators and arrow controls
- **Flash Deals** - Countdown timer badges, discount percentages, limited deal tags
- **Product Cards** - Hover zoom effect, add-to-cart overlay, wishlist button, star ratings
- **Category Grid** - Quick access icons with hover effects
- **Responsive Design** - Optimized for mobile (375px), tablet (768px), and desktop (1440px)
- **Micro-animations** - Entrance animations, cart badge pop, button press feedback
- **Mobile Drawer** - Full-screen slide-in navigation menu

### Design System
- **Color Palette** - Walmart Blue (#0071ce), Yellow (#ffc220), White (#ffffff), Gray (#f2f2f2)
- **Typography** - Helvetica Neue, Arial, sans-serif with consistent sizing scale
- **Spacing** - 8px grid system with responsive adjustments
- **Shadows** - Layered shadow system for depth and hierarchy
- **Border Radius** - Consistent 4px-16px radius scale
- **Transitions** - 150ms-400ms ease timing for smooth interactions

## Tech Stack

- **React 18** - UI library with hooks
- **Vite** - Fast build tool and dev server
- **React Router v6** - Client-side routing
- **Box Icons** - Icon library
- **CSS Modules** - Scoped component styling

## Project Structure

```
walmart-clone/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx              # Entry point
    ├── App.jsx               # Root component with routing
    ├── styles/
    │   ├── variables.css     # CSS custom properties
    │   └── global.css       # Global styles & animations
    ├── components/
    │   ├── Header.jsx        # Sticky header with nav
    │   ├── Header.module.css
    │   ├── Footer.jsx       # Site footer
    │   ├── Footer.module.css
    │   ├── ProductCard.jsx  # Reusable product card
    │   ├── ProductCard.module.css
    │   ├── Carousel.jsx     # Hero carousel component
    │   └── Carousel.module.css
    └── pages/
        ├── Home.jsx         # Homepage with sections
        ├── Home.module.css
        ├── Login.jsx        # Sign in form
        ├── Login.module.css
        ├── Signup.jsx       # Create account form
        ├── Signup.module.css
        ├── Cart.jsx         # Shopping cart
        ├── Cart.module.css
        ├── Payment.jsx       # Checkout flow
        ├── Payment.module.css
        ├── Success.jsx       # Order confirmation
        └── Success.module.css
```

## Installation

```bash
cd walmart-clone
npm install
```

## Development

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Build

```bash
npm run build
npm run preview
```

## CSS Architecture

### Variables (`variables.css`)
All design tokens defined as CSS custom properties:
- Colors (primary, secondary, semantic)
- Spacing (4px-48px scale)
- Typography (sizes, weights, line heights)
- Shadows (sm, md, lg, xl)
- Border radius (4px-9999px)
- Transitions (150ms-400ms)

### Global Styles (`global.css`)
- Reset styles
- Utility animations (fadeIn, slideIn, bounce, etc.)
- Skeleton loading animation
- Screen reader only class

### Component Modules
Each component has its own `.module.css` file following BEM-like naming:
- `.component__element--modifier` pattern
- Scoped styles prevent conflicts
- No inline styles in JSX

## Responsive Breakpoints

| Breakpoint | Width | Description |
|------------|-------|-------------|
| Mobile | < 480px | Single column, collapsed nav |
| Tablet | 480px - 768px | 2-column grids, simplified nav |
| Desktop | 768px - 1024px | Full layout, 3-4 column grids |
| Large | > 1024px | Maximum content width |

## Component Features

### Header
- Sticky on scroll with shadow
- Top bar: Logo, search, cart/account
- Secondary bar: Category pills (scrollable)
- Mobile: Hamburger menu with drawer

### ProductCard
- Hover zoom on image (scale 1.04)
- Add to cart overlay on hover
- Wishlist heart button
- Badge tags (Best Seller, Limited Deal, New)
- Star rating with half-star support
- Price display with discount

### Carousel
- Auto-advancing (6s interval)
- Smooth CSS transitions (400ms)
- Dot indicators
- Arrow navigation
- Responsive height

### Cart
- Two-column layout (items + summary)
- Quantity stepper controls
- Remove with fade animation
- Sticky order summary
- Empty cart state

### Payment
- Step indicator with checkmarks
- Shipping form with validation
- Payment method cards (radio toggle)
- Card input formatting
- Order summary sidebar

### Success
- Animated checkmark (SVG stroke)
- Order details card
- "Track Order" and "Continue Shopping" buttons
- "You may also like" recommendations

## Accessibility

- Semantic HTML elements
- ARIA labels on interactive elements
- Focus-visible styles
- Keyboard navigation support
- Screen reader only utilities
- Minimum 44px tap targets

## Performance

- Lazy loading images
- CSS transitions (GPU accelerated)
- Intersection Observer for animations
- CSS Modules (no runtime overhead)
- Vite fast HMR

## Notes

- This is a frontend demonstration project
- No backend or database connected
- Forms validate but don't persist data
- Cart state resets on page refresh

## License

This project is for educational purposes only. Walmart is a registered trademark of Walmart Inc.
