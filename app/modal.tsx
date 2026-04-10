import { StyleSheet, View, Platform, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import Constants from 'expo-constants';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import i18n from '@/constants/i18n';
import { Colors, Spacing, Radii } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const BUILD_ID = Constants.expoConfig?.extra?.buildId ?? 'dev';

export default function DebugModal() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const appName = Constants.expoConfig?.name ?? 'my-app';
  const appVersion = Constants.expoConfig?.version ?? '0.0.0';
  const expoVersion = Constants.expoConfig?.sdkVersion ?? 'unknown';
  const bundleId = Platform.select({
    ios: Constants.expoConfig?.ios?.bundleIdentifier,
    android: Constants.expoConfig?.android?.package,
    default: 'N/A',
  }) ?? 'N/A';

  const rows = [
    { label: 'App', value: appName },
    { label: 'Version', value: `v${appVersion}` },
    { label: 'Build', value: BUILD_ID },
    { label: 'Expo SDK', value: expoVersion },
    { label: 'Platform', value: Platform.OS },
    { label: 'OS Version', value: Platform.Version?.toString() ?? 'unknown' },
    { label: 'Bundle ID', value: bundleId },
    { label: 'New Arch', value: Constants.expoConfig?.newArchEnabled ? 'Yes' : 'No' },
  ];

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <ThemedText type="title" style={styles.title}>{i18n.t('modal.title')}</ThemedText>
        <ThemedText style={[styles.subtitle, { color: colors.textSecondary }]}>
          {i18n.t('modal.subtitle')}
        </ThemedText>

        <View style={[styles.table, { borderColor: colors.border }]}>
          {rows.map((row, idx) => (
            <View
              key={row.label}
              style={[
                styles.row,
                idx < rows.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border },
              ]}>
              <ThemedText style={[styles.label, { color: colors.textSecondary }]}>
                {row.label}
              </ThemedText>
              <ThemedText style={styles.value}>{row.value}</ThemedText>
            </View>
          ))}
        </View>

        <Link href="/" dismissTo style={styles.dismiss}>
          <ThemedText style={{ color: colors.tint }}>{i18n.t('modal.dismiss')}</ThemedText>
        </Link>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    padding: Spacing.xl,
    paddingTop: Spacing.xxl,
  },
  title: {
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: Spacing.lg,
  },
  table: {
    borderWidth: 1,
    borderRadius: Radii.md,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm + 2,
    paddingHorizontal: Spacing.md,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
  },
  value: {
    fontSize: 13,
    fontFamily: 'monospace',
    flexShrink: 1,
    textAlign: 'right',
  },
  dismiss: {
    alignSelf: 'center',
    marginTop: Spacing.xl,
    paddingVertical: Spacing.sm,
  },
});
