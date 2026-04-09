import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

// Tab labels — change these for multilingual support
const TAB_LABELS = {
  home: 'Home',
  about: 'About',
};

const TAB_ICON_SIZE = 32;

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarIconStyle: { marginTop: 2 },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: TAB_LABELS.home,
          tabBarIcon: ({ color }) => <IconSymbol size={TAB_ICON_SIZE} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: TAB_LABELS.about,
          tabBarIcon: ({ color }) => <IconSymbol size={TAB_ICON_SIZE} name="info.circle.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
