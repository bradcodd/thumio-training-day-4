# Changelog Version 2

## Session Changes

### Added

- **New Branch**: Created `front-end` branch for frontend reorganization work

- **Folder Structure for Scalability**:
  - `components/common/` - Shared components (Icons)
  - `components/studio/` - Studio-specific components (all modals, chat, preview, etc.)
  - `pages/Landing/` - Landing page components
  - `pages/Studio/` - Studio page components
  - `pages/Auth/` - Authentication pages (login/signup)
  - `pages/Settings/` - Settings page

- **Routing System**:
  - Installed `react-router-dom@6` for client-side routing
  - Added `BrowserRouter` and route configuration in `App.tsx`
  - Routes:
    - `/` - Landing page
    - `/login` - Login page
    - `/signup` - Signup page
    - `/studio` - Studio editor page
    - `/settings` - Settings page
    - `*` - Redirects to `/`

- **Authentication Pages** (`pages/Auth/`):
  - `LoginPage.tsx` - Login page with Google OAuth and email login (dummy)
  - `SignupPage.tsx` - Signup page with Google OAuth and email signup (dummy)
  - Two-column layout with benefits list and auth card
  - Dark themed UI matching brand design
  - Google button navigates to `/studio`
  - Email forms show demo status messages

- **Settings Page** (`pages/Settings/SettingsPage.tsx`):
  - Account section (email, subscription plan)
  - Branding section (logo upload placeholder)
  - AI Preferences section:
    - AI Analysis on Upload toggle
    - Show Title Modal on Upload toggle
    - Default Chat Mode selector (Agent/Assistant)
  - Export Preferences section:
    - Default Download Format selector (JPEG/PNG)
    - JPEG Quality slider (50-100%)
  - Studio Preferences section:
    - Auto-Save Projects toggle
    - Show Grid by Default toggle
  - Danger Zone section:
    - Clear All Projects button
  - Professional dark UI with sections and proper styling

- **Landing Page Enhancements**:
  - Added Log in and Sign up buttons to header
  - Added Log in button to hero section alongside main CTA

### Changed

- **Component Organization**:
  - Moved all studio components from `components/` to `components/studio/`:
    - `AdjustmentsModal.tsx`
    - `ApiKeySelectionView.tsx`
    - `ChatInterface.tsx`
    - `DownloadModal.tsx`
    - `FeedbackModal.tsx`
    - `FiltersModal.tsx`
    - `Header.tsx`
    - `ImagePreview.tsx`
    - `ImageUpload.tsx`
    - `ProjectsView.tsx`
    - `TextOverlayModal.tsx`
  - Moved `Icons.tsx` to `components/common/Icons.tsx`
  - Moved `LandingPage.tsx` to `pages/Landing/LandingPage.tsx`
  - Moved `App.tsx` content to `pages/Studio/StudioPage.tsx`

- **Import Path Updates**:
  - Updated all component imports throughout the codebase to reflect new folder structure
  - Studio components now import Icons from `../common/Icons`
  - Studio page imports components from `../../components/studio/`
  - Auth pages import Icons from `../../components/common/Icons`

- **Navigation Updates**:
  - `LandingPage.tsx` now uses `useNavigate()` from React Router instead of `window.location.href`
  - `Header.tsx` in Studio now includes navigation to `/settings` via dropdown
  - Added `useNavigate` hook to Header component

- **Branding Updates**:
  - Replaced all references to "Bumpups" with "Thumio"
  - Replaced "Bump AI" with "Thumio AI"
  - Updated selling points on auth pages to focus on AI thumbnail editing:
    - "AI thumbnail editing in one prompt"
    - "Support for local and YouTube videos"
    - "Smart enhancements powered by Thumio AI"

- **App.tsx Restructure**:
  - Transformed from full Studio implementation to routing wrapper
  - Now serves as main app router with route definitions
  - Imports and renders page components based on current route

- **Studio.tsx**:
  - Now a simple re-export of `StudioPage` from pages folder
  - Maintains backward compatibility

### Technical Details

- **Dependencies Added**:
  - `react-router-dom@6` - Client-side routing
  - Includes React Router components: `BrowserRouter`, `Routes`, `Route`, `Navigate`, `Link`, `useNavigate`

- **File Structure**:
  ```
  components/
    ├── common/
    │   └── Icons.tsx
    └── studio/
        ├── AdjustmentsModal.tsx
        ├── ApiKeySelectionView.tsx
        ├── ChatInterface.tsx
        ├── DownloadModal.tsx
        ├── FeedbackModal.tsx
        ├── FiltersModal.tsx
        ├── Header.tsx
        ├── ImagePreview.tsx
        ├── ImageUpload.tsx
        ├── ProjectsView.tsx
        └── TextOverlayModal.tsx
  pages/
    ├── Auth/
    │   ├── LoginPage.tsx
    │   └── SignupPage.tsx
    ├── Landing/
    │   └── LandingPage.tsx
    ├── Settings/
    │   └── SettingsPage.tsx
    └── Studio/
        └── StudioPage.tsx
  ```

- **Routing Flow**:
  - Landing page (/) serves as entry point
  - Users can navigate to login/signup from landing page
  - Google OAuth (dummy) takes users directly to studio
  - Studio header provides access to settings
  - All navigation uses React Router for client-side routing (no page reloads)

- **Build Status**:
  - All changes verified with `npm run build`
  - No linter errors
  - TypeScript compilation successful
  - Standard Vite chunk-size warning (expected for single-bundle build)

### Commits Made

1. **"scalable design and multiple pages"**
   - Component reorganization
   - Pages folder structure
   - React Router setup
   - Basic routing between landing and studio

2. **"Added login logic"**
   - Login and signup pages
   - Auth routes
   - Landing page auth links
   - Branding updates (Thumio)

3. **"Added settings page"**
   - Settings page with comprehensive preferences
   - Settings route
   - Header navigation to settings

5. **"add CHANGELOG_v2"**
   - Added PROMPTS_v1.md documentation

5. **"add PROMPTS_v2"**
   - Added PROMPTS_v2.md documentation

