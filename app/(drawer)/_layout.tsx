import { Drawer } from 'expo-router/drawer';
import { useRouter } from 'expo-router';
import { View, Pressable, StyleSheet } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { ThemedText } from '@/components/themed-text';
import i18n from '@/constants/i18n';
import { Colors, Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

function CustomDrawerContent(props: any) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <DrawerContentScrollView {...props}>
      <View style={[styles.drawerHeader, { borderBottomColor: colors.border }]}>
        <ThemedText style={styles.drawerTitle}>{i18n.t('common.appName')}</ThemedText>
      </View>
      <DrawerItemList {...props} />
      <View style={[styles.separator, { borderBottomColor: colors.border }]} />
      <DrawerItem
        label={i18n.t('drawer.logout')}
        icon={({ size, color }) => (
          <IconSymbol name="rectangle.portrait.and.arrow.right" size={size} color={color} />
        )}
        onPress={() => {}}
        style={{ opacity: 0.6 }}
      />
    </DrawerContentScrollView>
  );
}

export default function DrawerLayout() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const router = useRouter();

  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerTintColor: colors.text,
        headerStyle: { backgroundColor: colors.background },
        drawerActiveTintColor: colors.tint,
        drawerInactiveTintColor: colors.textSecondary,
        headerRight: () => (
          <Pressable onPress={() => router.push('/profile')} style={{ marginRight: Spacing.md }}>
            <IconSymbol name="person.circle.fill" size={28} color={colors.tint} />
          </Pressable>
        ),
      }}>
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerLabel: i18n.t('tabs.home'),
          title: i18n.t('tabs.home'),
          drawerIcon: ({ size, color }) => (
            <IconSymbol name="house.fill" size={size} color={color} />
          ),
          drawerItemStyle: { display: 'none' },
          headerTitle: i18n.t('common.appName'),
        }}
      />
      <Drawer.Screen
        name="profile"
        options={{
          drawerLabel: i18n.t('drawer.profile'),
          title: i18n.t('profile.title'),
          drawerIcon: ({ size, color }) => (
            <IconSymbol name="person.circle.fill" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="activity"
        options={{
          drawerLabel: i18n.t('drawer.activity'),
          title: i18n.t('activity.title'),
          drawerIcon: ({ size, color }) => (
            <IconSymbol name="clock.arrow.circlepath" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          drawerLabel: i18n.t('drawer.settings'),
          title: i18n.t('settings.title'),
          drawerIcon: ({ size, color }) => (
            <IconSymbol name="gearshape.fill" size={size} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  drawerHeader: {
    padding: Spacing.lg,
    borderBottomWidth: 1,
    marginBottom: Spacing.sm,
  },
  drawerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    borderBottomWidth: 1,
    marginHorizontal: Spacing.md,
    marginVertical: Spacing.sm,
  },
});
