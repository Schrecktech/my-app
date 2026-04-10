import type { PropsWithChildren, ReactElement } from 'react';
import { PixelRatio, StyleSheet } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollOffset,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Spacing } from '@/constants/theme';

const BASE_HEADER_HEIGHT = 125;

type Props = PropsWithChildren<{
  headerImage: ReactElement;
  headerBackgroundColor: { dark: string; light: string };
}>;

export default function ParallaxScrollView({
  children,
  headerImage,
  headerBackgroundColor,
}: Props) {
  const insets = useSafeAreaInsets();
  const backgroundColor = useThemeColor({}, 'background');
  const colorScheme = useColorScheme() ?? 'light';
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollOffset(scrollRef);
  const fontScale = PixelRatio.getFontScale();
  const headerHeight = BASE_HEADER_HEIGHT * Math.min(fontScale, 2);
  const totalHeaderHeight = headerHeight + insets.top;
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-totalHeaderHeight, 0, totalHeaderHeight],
            [-totalHeaderHeight / 2, 0, totalHeaderHeight * 0.75]
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [-totalHeaderHeight, 0, totalHeaderHeight], [2, 1, 1]),
        },
      ],
    };
  });

  return (
    <Animated.ScrollView
      ref={scrollRef}
      style={{ backgroundColor, flex: 1 }}
      scrollEventThrottle={16}>
      <Animated.View
        style={[
          styles.header,
          { backgroundColor: headerBackgroundColor[colorScheme], height: totalHeaderHeight, paddingTop: insets.top },
          headerAnimatedStyle,
        ]}>
        {headerImage}
      </Animated.View>
      <ThemedView style={styles.content}>{children}</ThemedView>
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    padding: Spacing.xl,
    gap: Spacing.md,
    overflow: 'hidden',
  },
});
