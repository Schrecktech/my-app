import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import i18n from '@/constants/i18n';
import { Colors, Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function SecurityHistoryScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={[styles.empty, { color: colors.textSecondary }]}>
        {i18n.t('activity.emptySecurity')}
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing.xl },
  empty: { fontSize: 16 },
});
