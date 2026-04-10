import { StyleSheet, View, Platform } from 'react-native';
import Constants from 'expo-constants';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import i18n from '@/constants/i18n';
import { Colors, Spacing, Radii } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const BUILD_ID = Constants.expoConfig?.extra?.buildId ?? 'unknown';
const APP_VERSION = '0.2.0';

export default function AboutScreen() {
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
        <ThemedText type="title">{i18n.t('about.title')}</ThemedText>
        <ThemedText style={{ color: colors.textSecondary }}>
          {i18n.t('about.description')}
        </ThemedText>
      </ThemedView>

      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <ThemedText type="subtitle">{i18n.t('about.hoursTitle')}</ThemedText>
        <ThemedText style={{ color: colors.textSecondary }}>
          {i18n.t('about.hoursBody')}
        </ThemedText>
      </View>

      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <ThemedText type="subtitle">{i18n.t('about.contactTitle')}</ThemedText>
        <ThemedText style={{ color: colors.textSecondary }}>
          {i18n.t('about.contactEmail')}
          {'\n'}
          {i18n.t('about.contactPhone')}
        </ThemedText>
      </View>

      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <ThemedText type="subtitle">{i18n.t('about.locationTitle')}</ThemedText>
        <ThemedText style={{ color: colors.textSecondary }}>
          {i18n.t('about.locationBody')}
        </ThemedText>
      </View>

      <View style={[styles.buildInfo, { borderColor: colors.border }]}>
        <ThemedText style={styles.buildLabel}>{i18n.t('about.buildInfo')}</ThemedText>
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
