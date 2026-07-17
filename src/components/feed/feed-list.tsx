import { useCallback, useRef } from "react";
import {
  LayoutChangeEvent,
  StyleSheet,
  View,
} from "react-native";

import { FlashList, ListRenderItem } from "@shopify/flash-list";
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import { FeedItem } from "@/components/feed/feed-item";
import { SuggestedPostsSection } from "@/components/feed/suggestions/suggested-posts-section";
import { FeedListItem } from "@/data/mock-feed";

const AnimatedFlashList = Animated.createAnimatedComponent(FlashList) as typeof FlashList;

export const FeedList = ({
  data,
}: {
  data: FeedListItem[];
}) => {
  const contentHeight = useRef(0);
  const layoutHeight = useRef(0);
  const scrollY = useSharedValue(0);
  const maxScroll = useSharedValue(1);

  const handleScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const updateMaxScroll = useCallback(() => {
    maxScroll.value = Math.max(1, contentHeight.current - layoutHeight.current);
  }, [maxScroll]);

  const handleContentSizeChange = useCallback((_w: number, h: number) => {
    contentHeight.current = h;
    updateMaxScroll();
  }, [updateMaxScroll]);

  const handleLayout = useCallback((e: LayoutChangeEvent) => {
    layoutHeight.current = e.nativeEvent.layout.height;
    updateMaxScroll();
  }, [updateMaxScroll]);

  const renderItem = useCallback<ListRenderItem<FeedListItem>>(({ item }) => (
    item.type === "suggestions" ? (
      <SuggestedPostsSection posts={item.posts} />
    ) : (
      <FeedItem item={item} />
    )
  ), []);

  const keyExtractor = useCallback((item: FeedListItem) => item.id, []);

  const getItemType = useCallback((item: FeedListItem) => (
    item.type === "suggestions" ? "suggestions" : "post"
  ), []);

  const progressFillStyle = useAnimatedStyle(() => ({
    width: `${Math.min(1, Math.max(0, scrollY.value / maxScroll.value)) * 100}%`,
  }));

  return (
    <View style={styles.wrapper}>
      <View style={styles.progressTrack}>
        <Animated.View style={[styles.progressFill, progressFillStyle]} />
      </View>
      <AnimatedFlashList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        getItemType={getItemType}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        onContentSizeChange={handleContentSizeChange}
        onLayout={handleLayout}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  content: {
    paddingBottom: 20,
  },
  progressTrack: {
    height: 3,
    backgroundColor: "rgba(0, 0, 0, 0.06)",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#FF3B30",
  },
});
