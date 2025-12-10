# Crash Claim Website

A modern, responsive web application for submitting and managing crash claims with integrated Trusted Form functionality for secure IP address collection and data verification.

## Features

### 🚀 Core Functionality
- **Streamlined Claim Submission**: Easy-to-use form with comprehensive validation
- **Trusted Form Integration**: Automatic IP address collection for verification and fraud prevention
- **Responsive Design**: Optimized for all devices (mobile, tablet, desktop)
- **Modern UI**: Clean, professional interface with smooth animations

### 📋 Pages
1. **Home Page**: Hero section, benefits, data accuracy information, form preview
2. **Form Page**: Complete claim submission with real-time validation
3. **Privacy Policy**: Comprehensive privacy information
4. **Terms and Conditions**: Complete terms of service

### 🎨 Design
- **Color Scheme**: Professional blue and white theme
- **Typography**: Clean, readable fonts with proper hierarchy
- **Components**: Built with shadcn/ui for consistency
- **Dark Mode**: Full dark mode support included

### ✅ Form Validation
- Email format validation
- Phone number format validation
- Date validation (prevents future dates)
- Vehicle year validation (1900 to current year + 1)
- Minimum character requirements
- Numeric validation for monetary amounts

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Routing**: React Router v6
- **Form Security**: Trusted Form API
- **Icons**: Lucide React

## Project Structure

```
src/
├── components/
│   ├── common/
│   │   ├── Header.tsx          # Navigation header
│   │   └── Footer.tsx          # Footer with links
│   └── ui/                     # shadcn/ui components
├── pages/
│   ├── Home.tsx                # Landing page
│   ├── FormPage.tsx            # Claim submission form
│   ├── PrivacyPolicy.tsx       # Privacy policy
│   └── TermsAndConditions.tsx  # Terms and conditions
├── hooks/                      # Custom React hooks
├── lib/                        # Utility functions
├── routes.tsx                  # Route configuration
├── App.tsx                     # Main application
└── index.css                   # Design system & styles
```

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or pnpm package manager

### Installation
```bash
# Install dependencies (if needed)
pnpm install
```

### Development
```bash
# Note: This project uses a custom build system
# Use the lint command to check code quality
npm run lint
```

## Key Features Explained

### Trusted Form Integration
The form page automatically loads the Trusted Form script which:
- Collects the user's IP address
- Generates a certificate URL for verification
- Provides fraud prevention capabilities
- Ensures data authenticity

### Form Validation
Comprehensive client-side validation includes:
- **Personal Information**: Name, email, phone validation
- **Incident Details**: Date, location, description requirements
- **Vehicle Information**: Make, model, year, license plate validation
- **Insurance Information**: Optional fields with format validation

### Responsive Design
- Mobile-first approach
- Breakpoints optimized for all screen sizes
- Touch-friendly interactive elements
- Flexible grid layouts

## Pages Overview

### Home Page (`/`)
- **Hero Section**: Eye-catching introduction with CTA
- **Benefits Section**: Three key benefits with icons
- **Data Accuracy Section**: Explains importance of accurate information
- **Form Preview**: Shows what information is needed
- **Policy Links**: Easy access to privacy and terms

### Form Page (`/form`)
- **Personal Information**: Name, email, phone, date
- **Incident Details**: Location and description
- **Vehicle Information**: Make, model, year, license plate
- **Insurance Information**: Optional company and policy details
- **Success Confirmation**: Shows after successful submission

### Privacy Policy (`/privacy-policy`)
Comprehensive privacy policy covering:
- Information collection practices
- IP address collection explanation
- Data usage and sharing
- Security measures
- User rights

### Terms and Conditions (`/terms-and-conditions`)
Complete terms covering:
- Service usage guidelines
- Claim submission requirements
- Liability limitations
- Dispute resolution

## Design System

### Colors
- **Primary**: Blue (HSL: 217 91% 60%)
- **Background**: White
- **Foreground**: Dark gray
- **Accent**: Light blue
- **Muted**: Light gray

### Typography
- **Headings**: Bold, clear hierarchy
- **Body**: Readable, comfortable line height
- **Labels**: Medium weight for form fields

### Components
All UI components follow shadcn/ui patterns:
- Buttons with variants (default, outline, ghost)
- Cards with headers and content sections
- Inputs with labels and error states
- Toast notifications for feedback

## Security Features

### Data Protection
- IP address collection via Trusted Form
- Client-side validation to prevent invalid data
- Secure form submission preparation
- Privacy policy compliance

### Validation
- Email format verification
- Phone number format checking
- Date range validation
- Numeric input validation

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility

- Semantic HTML elements
- ARIA labels where needed
- Keyboard navigation support
- Screen reader friendly
- High contrast ratios

## Future Enhancements

Potential features for future development:
- Backend API integration
- Email notifications
- Claim tracking system
- User dashboard
- File upload for photos
- Multi-language support
- Payment processing
- Admin panel

## Contributing

When contributing to this project:
1. Follow the existing code style
2. Use TypeScript for type safety
3. Follow component patterns from shadcn/ui
4. Ensure responsive design
5. Test on multiple devices
6. Run lint before committing

## License

This project is proprietary and confidential.

## Support

For questions or issues:
- Email: support@crashclaim.com
- Phone: (555) 123-4567

## Acknowledgments

- Built with React and TypeScript
- UI components from shadcn/ui
- Icons from Lucide React
- Form security by Trusted Form
