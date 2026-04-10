import { StyleSheet, View } from 'react-native';
import { Link } from 'expo-router';
import Constants from 'expo-constants';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import i18n from '@/constants/i18n';
import { Colors, Spacing, Radii } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function AboutScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const appVersion = Constants.expoConfig?.version ?? '0.0.0';

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

      <Link href="/modal" style={styles.versionLink}>
        <ThemedText style={[styles.versionText, { color: colors.textSecondary }]}>
          v{appVersion}
        </ThemedText>
      </Link>
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
  versionLink: {
    alignSelf: 'center',
    marginTop: Spacing.lg,
    paddingVertical: Spacing.sm,
  },
  versionText: {
    fontSize: 12,
    lineHeight: 18,
    opacity: 0.5,
  },
});
