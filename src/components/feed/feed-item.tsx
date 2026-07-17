import { memo, useCallback, useContext, useMemo, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

import { ColorsContext } from "@/context/colors-context";
import { FeedPostSlim } from "@/data/mock-feed";

import { ActionButtons } from "./actions/action-buttons";
import { CommentList } from "./comments/comment-list";
import { CommentsLink } from "./comments/comments-link";
import { ImageCarousel } from "./content/image-carousel";
import { PostCaption } from "./content/post-caption";
import { PostTimestamp } from "./content/post-timestamp";
import { TagList } from "./content/tag-list";
import { PostHeader } from "./header/post-header";

const FeedItemComponent = ({
  item,
}: {
  item: FeedPostSlim;
}) => {
  const colors = useContext(ColorsContext);
  const router = useRouter();
  const [isHidden, setIsHidden] = useState(false);

  const containerStyle = useMemo(
    () => [
      styles.container,
      {
        backgroundColor: colors.cardBackground,
        borderBottomColor: colors.border,
      },
    ],
    [colors.border, colors.cardBackground],
  );

  const handleHidePost = useCallback(() => {
    setIsHidden(true);
  }, []);

  const handleImagePress = useCallback(() => {
    router.push(`/post/${item.id}`);
  }, [item.id, router]);

  if (isHidden) {
    return null;
  }

  return (
    <View style={containerStyle}>
      <PostHeader
        postId={item.id}
        username={item.user.username}
        avatar={item.user.avatar}
        isVerified={item.user.isVerified}
        locationName={item.location.name}
        onHidePost={handleHidePost}
      />

      <ImageCarousel
        images={item.images}
        onImagePress={handleImagePress}
      />

      <ActionButtons
        postId={item.id}
        username={item.user.username}
        likes={item.likes}
        isLiked={item.isLiked}
      />

      <PostCaption username={item.user.username} caption={item.caption} />

      <TagList tags={item.tags} />

      <CommentsLink totalComments={item.totalComments} postId={item.id} />

      <CommentList comments={item.comments} postId={item.id} />

      <PostTimestamp timestamp={item.timestamp} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 4,
    borderBottomWidth: 0.5,
  },
});

export const FeedItem = memo(FeedItemComponent);
