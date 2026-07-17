import { useCallback, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { FlashList, ListRenderItem } from "@shopify/flash-list";

import { ColorsContext } from "@/context/colors-context";
import { SuggestedPost } from "@/data/mock-feed";

import { SuggestedPostCard } from "./suggested-post-card";

export const SuggestedPostsSection = ({ posts }: { posts: SuggestedPost[] }) => {
  const colors = useContext(ColorsContext);
  const router = useRouter();

  const openSuggestions = () => {
    router.push("/suggestions");
  };

  const renderItem = useCallback<ListRenderItem<SuggestedPost>>(({ item }) => (
    <SuggestedPostCard post={item} />
  ), []);

  const keyExtractor = useCallback((post: SuggestedPost) => post.id, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Suggested for you</Text>
        <TouchableOpacity onPress={openSuggestions}>
          <Text style={[styles.seeAll, { color: colors.tint }]}>See All</Text>
        </TouchableOpacity>
      </View>
      <FlashList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        data={posts}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
  },
  seeAll: {
    fontSize: 14,
    fontWeight: "600",
  },
  scrollContent: {
    paddingHorizontal: 12,
  },
});
