import { useCallback, useMemo, useRef, useState } from "react";
import {
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  StyleProp,
  View,
  ViewStyle,
} from "react-native";

import { FlashList, ListRenderItem } from "@shopify/flash-list";

import { FeedItem } from "@/components/feed/feed-item";
import { SuggestedPostsSection } from "@/components/feed/suggestions/suggested-posts-section";
import { FeedListItem } from "@/data/mock-feed";

export const FeedList = ({
  data,
}: {
  data: FeedListItem[];
}) => {
  const contentHeight = useRef(0);
  const layoutHeight = useRef(0);
  const [progress, setProgress] = useState(0);

  const handleScroll = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offset = e.nativeEvent.contentOffset.y;
    const max = Math.max(1, contentHeight.current - layoutHeight.current);
    const p = Math.min(1, Math.max(0, offset / max));
    setProgress(p);
  }, []);

  const handleContentSizeChange = useCallback((_w: number, h: number) => {
    contentHeight.current = h;
  }, []);

  const handleLayout = useCallback((e: LayoutChangeEvent) => {
    layoutHeight.current = e.nativeEvent.layout.height;
  }, []);

  const renderItem = useCallback<ListRenderItem<FeedListItem>>(({ item }) => (
    item.type === "suggestions" ? (
      <SuggestedPostsSection posts={item.posts} />
    ) : (
      <FeedItem item={item} />
    )
  ), []);

  const keyExtractor = useCallback((item: FeedListItem) => item.id, []);

  const progressFillStyle = useMemo<StyleProp<ViewStyle>>(
    () => [styles.progressFill, { width: `${progress * 100}%` }],
    [progress],
  );

  return (
    <View style={styles.wrapper}>
      <View style={styles.progressTrack}>
        <View style={progressFillStyle} />
      </View>
      <FlashList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
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
