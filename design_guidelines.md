# RAW Consulting - Design Guidelines

## Design Approach

**Selected Approach:** Reference-Based with Modern B2B Consulting Influence

Drawing inspiration from contemporary consulting firms like McKinsey Digital, Accenture Interactive, and Boston Consulting Group's digital presence, combined with the clean, approachable aesthetics of modern SaaS companies. The design will balance professional credibility with approachable modernity.

**Core Design Principles:**
- Trust through restraint: Professional minimalism that emphasizes expertise
- Strategic whitespace: Content breathes, never cramped
- Clarity over cleverness: Direct messaging with visual hierarchy
- Credibility through structure: Organized, methodical presentation

---

## Typography System

**Primary Font:** Inter (Google Fonts)
- Headings: 600 weight for authority without heaviness
- Body: 400 weight for readability
- Accents: 500 weight for subtle emphasis

**Type Scale:**
- Hero headline: text-5xl md:text-6xl lg:text-7xl (bold, commanding)
- Section headers: text-3xl md:text-4xl lg:text-5xl
- Subsection titles: text-xl md:text-2xl
- Body text: text-base md:text-lg (generous sizing for readability)
- Small print: text-sm

**Line Heights:**
- Headlines: leading-tight (1.1-1.2)
- Body: leading-relaxed (1.7-1.8)

---

## Layout System

**Spacing Primitives:** Tailwind units of 4, 6, 8, 12, 16, 20, 24
- Micro spacing (within components): space-4, space-6
- Component spacing: space-8, space-12
- Section padding: py-16 md:py-20 lg:py-24
- Container padding: px-6 md:px-8 lg:px-12

**Grid Structure:**
- Main container: max-w-7xl mx-auto
- Content sections: max-w-6xl
- Text-heavy areas: max-w-4xl
- Narrow text blocks: max-w-2xl

**Responsive Breakpoints:**
- Mobile: Single column, stack everything
- Tablet (md:): 2-column grids where appropriate
- Desktop (lg:): Up to 3-column grids for service cards

---

## Page Structure & Sections

**1. Hero Section (80vh minimum)**
- Full-width background image showing professional consulting context (modern office, strategy session, or collaborative workspace)
- Centered content overlay with blur-backed container
- Large headline: "Transform Your Business Vision Into Reality"
- Subheadline emphasizing track record across industries
- Primary CTA: "Schedule Free Consultation"
- Trust indicator below CTA: "Trusted by businesses across 9+ industries"

**2. Services Grid (4 cards in 2x2 grid on desktop, stack on mobile)**
Each service card includes:
- Icon representation (use Heroicons)
- Service name as header
- 2-3 sentence description
- Subtle hover elevation effect
Cards:
- Business Development
- Web App MVP Development
- Social Media & Marketing
- Executive Coaching

**3. Industries Experience Section**
- Header: "Proven Success Across Diverse Industries"
- 3-column grid (desktop) / 2-column (tablet) / 1-column (mobile)
- Industry badges/pills displaying: Medical Devices, Education, Transportation, Travel, Micromobility, Wireless Retail, Economic Development, Public Policy, Youth Sports
- Brief stat or achievement for credibility

**4. Value Proposition / Why RAW Section**
- 2-column asymmetric layout
- Left: Large impactful statement about approach
- Right: 3-4 bullet points of differentiators
- Background treatment: subtle gradient or geometric pattern

**5. Social Proof / Results Section**
- Header: "Results That Speak"
- 3 metric cards in row (grid-cols-1 md:grid-cols-3)
- Each showing: Large number, metric label, brief context
- Examples: "9+ Industries Served", "X Businesses Launched", "X% Client Growth"

**6. Contact / Lead Capture Section**
- 2-column layout (form left, info right on desktop)
- Form fields: Name, Email, Phone, Company, Message, Service Interest (dropdown)
- Right column: Contact details, response time expectation, office hours
- Primary CTA button: "Get Started"
- Trust statement: "Your information is secure and never shared"

**7. Footer**
- Simple, clean design
- Left: RAW Consulting logo/name with tagline
- Center: Quick links (Services, Industries, About, Contact)
- Right: LinkedIn social link
- Bottom: Copyright, Privacy Policy, Terms

---

## Component Library

**Navigation Bar**
- Fixed/sticky header with backdrop blur
- Logo left, navigation center, CTA button right
- Links: Services, Industries, About, Contact
- Mobile: Hamburger menu with slide-in drawer

**Buttons**
- Primary: Solid background, medium size (px-8 py-3), rounded-lg
- Secondary: Outline style with hover fill
- Text buttons: Underline on hover
- Icon buttons: Circular with icon centered

**Cards**
- Service cards: Subtle border, padding-8, rounded-xl, shadow on hover
- Industry badges: pill shape (rounded-full), compact padding (px-4 py-2)
- Metric cards: Centered content, generous padding, light border

**Form Elements**
- Input fields: border, rounded-lg, padding-4, focus ring effect
- Labels: above fields, text-sm, medium weight
- Textarea: min-height for message field
- Dropdown: consistent styling with inputs
- All form elements maintain accessibility standards with proper labels, placeholders, and focus states

**Icons**
- Library: Heroicons (outline style primarily)
- Service icons: 3rem size (h-12 w-12)
- Navigation icons: 1.5rem size (h-6 w-6)
- Consistent stroke width across all icons

---

## Images

**Large Hero Image:**
- Full-width background image for hero section
- Professional setting: modern office, collaborative workspace, or strategic planning session
- Should convey: professionalism, growth, collaboration
- Image treatment: subtle overlay for text readability
- Placement: background of hero section (background-cover, background-center)

**Optional Supporting Images:**
- Industries section: Consider subtle icons or illustrations for each industry
- Value proposition: Abstract geometric shapes or professional consultation imagery
- Avoid stock photos of people looking at cameras - prefer action shots or environmental imagery

---

## Animations & Interactions

**Minimal, purposeful animations:**
- Smooth scroll behavior for anchor links
- Card hover: subtle lift (transform translateY(-4px)) with shadow increase
- Button hover: slight scale or background lightening
- Form focus: ring effect with smooth transition
- Section fade-in on scroll (subtle, 200-300ms)

**NO complex scroll-triggered animations or parallax effects** - maintain professional restraint

---

## Accessibility & Best Practices

- All interactive elements keyboard accessible
- Form inputs with proper labels and ARIA attributes
- Sufficient color contrast for all text
- Focus indicators visible on all interactive elements
- Semantic HTML structure throughout
- Alt text for all images
- Skip navigation link for keyboard users