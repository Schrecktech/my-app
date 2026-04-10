import { StyleSheet, View, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import i18n from '@/constants/i18n';
import { Colors, Spacing, Radii } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const ACTIVITY_ITEMS = [
  {
    titleKey: 'activity.messagesTitle',
    subtitleKey: 'activity.messagesSubtitle',
    icon: 'bubble.left.fill' as const,
    route: '/activity/messages' as const,
  },
  {
    titleKey: 'activity.transactionsTitle',
    subtitleKey: 'activity.transactionsSubtitle',
    icon: 'creditcard.fill' as const,
    route: '/activity/transactions' as const,
  },
  {
    titleKey: 'activity.securityTitle',
    subtitleKey: 'activity.securitySubtitle',
    icon: 'lock.shield.fill' as const,
    route: '/activity/security-history' as const,
  },
];

export default function ActivityScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {ACTIVITY_ITEMS.map((item) => (
          <Pressable
            key={item.route}
            style={[styles.card, { borderColor: colors.border }]}
            onPress={() => router.push(item.route)}>
            <IconSymbol name={item.icon} size={28} color={colors.tint} />
            <View style={styles.cardText}>
              <ThemedText style={styles.cardTitle}>{i18n.t(item.titleKey)}</ThemedText>
              <ThemedText style={[styles.cardSubtitle, { color: colors.textSecondary }]}>
                {i18n.t(item.subtitleKey)}
              </ThemedText>
            </View>
            <IconSymbol name="chevron.right" size={16} color={colors.textSecondary} />
          </Pressable>
        ))}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: Spacing.xl },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    borderWidth: 1,
    borderRadius: Radii.md,
    marginBottom: Spacing.sm,
    gap: Spacing.md,
  },
  cardText: { flex: 1 },
  cardTitle: { fontSize: 16, fontWeight: '600' },
  cardSubtitle: { fontSize: 13, marginTop: 2 },
});
