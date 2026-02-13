# beó lab

A research app measuring whether brief offline micro-interventions ("pauses") improve perceived digital self-control over 4 weeks.

**Authors:** Julie Hendry (MSc, FBCS), Mark Andrew Pope — beó LLC

## Study

Pre-registered on OSF. See `OSF-Preregistration-beo-2026.docx` for full study protocol.

- **Design:** Single-arm observational, within-subjects, 4-week longitudinal
- **Participants:** Adults 18+, iOS, English-speaking
- **Primary outcome:** Self-Control Score change (T2 - T1), adapted from Digital Flourishing Scale (Janicke-Bowles et al., 2023)

## Tech Stack

- **Framework:** React Native with Expo (managed workflow)
- **Language:** TypeScript
- **Navigation:** React Navigation (native stack + bottom tabs)
- **Storage:** AsyncStorage (local, on-device)
- **Notifications:** expo-notifications (daily + weekly)
- **Target:** iOS (TestFlight via EAS Build)

## Getting Started

```bash
npm install
npx expo start
```

## Building for TestFlight

```bash
npx eas build --platform ios --profile production
npx eas submit --platform ios
```

You will need to configure `eas.json` with your Apple Developer credentials first.

## Project Structure

```
src/
  constants/        Design tokens, pause data
  context/          Global app state (AppContext)
  components/       Reusable UI (Button, Card, Timer, LikertScale)
  screens/          App screens
    onboarding/     Welcome, Demographics, Assessment, Result
  navigation/       Stack + tab navigation
  hooks/            Storage utilities
  utils/            Scoring, notifications, data export
  types/            TypeScript type definitions
```

## Design

Styled to match beo.llc:
- Primary: #3D6B4A (forest green)
- Background: #F5F5F3 (warm off-white)
- Typography: System fonts, clean hierarchy
- Accessible: WCAG-compliant contrast, large touch targets, screen reader labels

## Contact

- General: info@beo.llc
- Research: lab@beo.llc
