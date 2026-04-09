import { StyleSheet, View, Platform } from 'react-native';
import Constants from 'expo-constants';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors, Spacing, Radii } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const BUILD_ID = '2026-04-09-8b323fa';
const APP_VERSION = '0.2.0';

export default function ExploreScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const expoVersion = Constants.expoConfig?.sdkVersion ?? 'unknown';
  const appName = Constants.expoConfig?.name ?? 'my-app';
  const nativeVersion = Constants.expoConfig?.version ?? APP_VERSION;

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: Colors.light.surface, dark: Colors.dark.surface }}
      headerImage={
        <IconSymbol
          size={200}
          color={colors.tint}
          name="info.circle.fill"
          style={styles.headerIcon}
        />
      }>
      <ThemedView style={styles.section}>
        <ThemedText type="title">About</ThemedText>
        <ThemedText style={{ color: colors.textSecondary }}>
          Your story goes here. Tell your customers who you are and what you do.
        </ThemedText>
      </ThemedView>

      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <ThemedText type="subtitle">Hours</ThemedText>
        <ThemedText style={{ color: colors.textSecondary }}>
          Mon–Fri: 9am – 9pm{'\n'}
          Sat–Sun: 10am – 6pm
        </ThemedText>
      </View>

      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <ThemedText type="subtitle">Contact</ThemedText>
        <ThemedText style={{ color: colors.textSecondary }}>
          hello@yourbrand.com{'\n'}
          (555) 123-4567
        </ThemedText>
      </View>

      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <ThemedText type="subtitle">Location</ThemedText>
        <ThemedText style={{ color: colors.textSecondary }}>
          123 Main Street{'\n'}
          Your City, ST 12345
        </ThemedText>
      </View>

      <View style={[styles.buildInfo, { borderColor: colors.border }]}>
        <ThemedText style={styles.buildLabel}>Build Info</ThemedText>
        <ThemedText style={[styles.buildText, { color: colors.textSecondary }]}>
          {appName} v{nativeVersion}
        </ThemedText>
        <ThemedText style={[styles.buildText, { color: colors.textSecondary }]}>
          Build: {BUILD_ID}
        </ThemedText>
        <ThemedText style={[styles.buildText, { color: colors.textSecondary }]}>
          Expo SDK: {expoVersion}
        </ThemedText>
        <ThemedText style={[styles.buildText, { color: colors.textSecondary }]}>
          Platform: {Platform.OS}
        </ThemedText>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerIcon: {
    position: 'absolute',
    bottom: -20,
    alignSelf: 'center',
    opacity: 0.3,
  },
  section: {
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  card: {
    padding: Spacing.lg,
    borderRadius: Radii.md,
    borderWidth: 1,
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  buildInfo: {
    marginTop: Spacing.lg,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    gap: Spacing.xs,
  },
  buildLabel: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    opacity: 0.5,
    marginBottom: Spacing.xs,
  },
  buildText: {
    fontSize: 12,
    fontFamily: 'monospace',
  },
});
