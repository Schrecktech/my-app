import { Stack } from 'expo-router';
import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';

import { IconSymbol } from '@/components/ui/icon-symbol';
import i18n from '@/constants/i18n';
import { Colors, Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function ActivityLayout() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const router = useRouter();

  const headerLeft = (icon: Parameters<typeof IconSymbol>[0]['name']) => () => (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginRight: Spacing.md }}>
      <Pressable onPress={() => router.back()}>
        <IconSymbol name="chevron.left" size={22} color={colors.tint} />
      </Pressable>
      <IconSymbol name={icon} size={20} color={colors.tint} />
    </View>
  );

  return (
    <Stack
      screenOptions={{
        headerBackVisible: false,
        headerTintColor: colors.text,
        headerStyle: { backgroundColor: colors.background },
      }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="messages"
        options={{
          title: i18n.t('activity.messagesTitle'),
          headerLeft: headerLeft('bubble.left.fill'),
        }}
      />
      <Stack.Screen
        name="transactions"
        options={{
          title: i18n.t('activity.transactionsTitle'),
          headerLeft: headerLeft('creditcard.fill'),
        }}
      />
      <Stack.Screen
        name="security-history"
        options={{
          title: i18n.t('activity.securityTitle'),
          headerLeft: headerLeft('lock.shield.fill'),
        }}
      />
    </Stack>
  );
}
