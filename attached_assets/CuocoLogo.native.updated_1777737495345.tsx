// CuocoLogo.native.tsx — Cuoco brand mark + wordmark for React Native.
//
// Requires: react-native-svg (peer dep). Install with:
//   yarn add react-native-svg
//   # or with Expo:
//   npx expo install react-native-svg
//
// Usage:
//   import { CuocoMark, CuocoLockup } from './CuocoLogo.native';
//
//   <CuocoMark size={64} />                        // mark only
//   <CuocoMark size={64} variant="light" />        // for dark surfaces (brass-light C + brass flame)
//   <CuocoLockup size={48} />                      // mark + wordmark
//   <CuocoMark size={32} ink="#1F1B16" accent="#8A6E3F" />
//
// Tokens (keep in sync with the design system):
//   ink:         #1F1B16
//   cream:       #F4EFE7
//   brass:       #8A6E3F   (primary accent)
//   brassLight:  #B8A47A   (accent on dark surfaces)

import * as React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle, Platform } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

type Variant = 'dark' | 'light';

export interface CuocoMarkProps {
  /** Pixel size of the square mark. Default 64. */
  size?: number;
  /** "dark" = ink-on-cream (default). "light" = cream-on-dark, for placement on dark surfaces. */
  variant?: Variant;
  /** Override the C color directly. */
  ink?: string;
  /** Override the flame / ring accent directly. */
  accent?: string;
  /** Override the inner sparkle color directly. */
  spark?: string;
  /** Accessibility label. Defaults to "Cuoco". Pass empty string to hide from a11y. */
  accessibilityLabel?: string;
  style?: ViewStyle;
}

export const CUOCO_TOKENS = {
  ink: '#1F1B16',
  cream: '#F4EFE7',
  brass: '#8A6E3F',
  brassLight: '#B8A47A',
  surface: '#FBF7F0',
  bg: '#E9E5DC',
} as const;

function resolvePalette(variant: Variant, ink?: string, accent?: string, spark?: string) {
  const dark = variant !== 'light';
  // dark variant  -> ink C, brass flame, cream sparkle (on cream surfaces)
  // light variant -> brass-light C, brass flame, cream sparkle (on ink surfaces)
  return {
    ink: ink ?? (dark ? CUOCO_TOKENS.ink : CUOCO_TOKENS.brassLight),
    accent: accent ?? (dark ? CUOCO_TOKENS.brass : CUOCO_TOKENS.brass),
    spark: spark ?? (dark ? CUOCO_TOKENS.cream : CUOCO_TOKENS.cream),
    sparkOpacity: 1,
    highlightColor: dark ? CUOCO_TOKENS.cream : CUOCO_TOKENS.ink,
    highlightOpacity: dark ? 0.32 : 0.28,
  };
}

export function CuocoMark({
  size = 64,
  variant = 'dark',
  ink,
  accent,
  spark,
  accessibilityLabel = 'Cuoco',
  style,
}: CuocoMarkProps) {
  const p = resolvePalette(variant, ink, accent, spark);
  const a11y = accessibilityLabel
    ? {
        accessible: true,
        accessibilityRole: 'image' as const,
        accessibilityLabel,
      }
    : { accessibilityElementsHidden: true, importantForAccessibility: 'no-hide-descendants' as const };

  return (
    <View style={[{ width: size, height: size }, style]} {...a11y}>
      <Svg width={size} height={size} viewBox="0 0 100 100">
        {/* C — high-contrast didone-style ring */}
        <Path
          d="M 78 22 C 70 14, 58 10, 48 10 C 28 10, 14 26, 14 50 C 14 74, 28 90, 48 90 C 58 90, 70 86, 78 78 L 72 70 C 66 76, 58 80, 50 80 C 36 80, 26 68, 26 50 C 26 32, 36 20, 50 20 C 58 20, 66 24, 72 30 Z"
          fill={p.ink}
        />
        {/* Flame body */}
        <Path
          d="M 50 32 C 44 42, 38 50, 38 58 C 38 67, 44 73, 50 73 C 56 73, 62 67, 62 58 C 62 52, 58 48, 56 42 C 54 47, 51 48, 50 44 C 49 40, 50 36, 50 32 Z"
          fill={p.accent}
        />
        {/* Flame inner highlight */}
        <Path
          d="M 50 50 C 47 55, 45 59, 45 63 C 45 67, 47 70, 50 70 C 53 70, 55 67, 55 63 C 55 60, 52 58, 51 55 C 50 53, 50 51, 50 50 Z"
          fill={p.highlightColor}
          fillOpacity={p.highlightOpacity}
        />
        {/* AI sparkle — inside the flame */}
        <Path
          d="M 50 36 L 50.9 41.1 L 55 42 L 50.9 42.9 L 50 48 L 49.1 42.9 L 45 42 L 49.1 41.1 Z"
          fill={p.spark}
          fillOpacity={p.sparkOpacity}
        />
        {/* Voice / recording ring at bottom-right */}
        <Circle cx="84" cy="78" r="4.4" fill="none" stroke={p.accent} strokeWidth="1.4" />
        <Circle cx="84" cy="78" r="1.6" fill={p.accent} />
      </Svg>
    </View>
  );
}

export interface CuocoLockupProps extends CuocoMarkProps {
  /** Gap between mark and wordmark, as a fraction of size. Default 0.35. */
  gap?: number;
  /** Wordmark size multiplier vs. mark size. Default 0.7. */
  wordScale?: number;
  /**
   * Override the wordmark font family. RN won't render Newsreader unless it's been
   * registered (expo-font / Font.loadAsync, or linked native font). Defaults to a
   * platform serif so it gracefully falls back instead of disappearing.
   */
  fontFamily?: string;
  textStyle?: TextStyle;
}

export function CuocoLockup({
  size = 64,
  variant = 'dark',
  ink,
  accent,
  spark,
  gap = 0.35,
  wordScale = 0.7,
  fontFamily,
  accessibilityLabel = 'Cuoco',
  style,
  textStyle,
}: CuocoLockupProps) {
  const p = resolvePalette(variant, ink, accent, spark);
  const wordSize = size * wordScale;
  const resolvedFont =
    fontFamily ??
    (Platform.select({
      ios: 'Newsreader-Medium', // expects font registered via expo-font / Info.plist
      android: 'Newsreader-Medium', // expects font in android/app/src/main/assets/fonts
      default: 'serif',
    }) as string);

  return (
    <View
      style={[styles.row, { columnGap: size * gap }, style]}
      accessible
      accessibilityRole="image"
      accessibilityLabel={accessibilityLabel || undefined}
    >
      <CuocoMark
        size={size}
        variant={variant}
        ink={ink}
        accent={accent}
        spark={spark}
        accessibilityLabel=""
      />
      <Text
        allowFontScaling={false}
        style={[
          {
            fontFamily: resolvedFont,
            fontWeight: '500',
            fontSize: wordSize,
            letterSpacing: wordSize * 0.18,
            color: p.ink,
            lineHeight: wordSize * 1.05,
            // RN doesn't have textTransform on every version — uppercase the string instead:
          },
          textStyle,
        ]}
      >
        CUOCO
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CuocoMark;
