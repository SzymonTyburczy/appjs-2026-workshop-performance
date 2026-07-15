import { useState } from "react";
import { Image, ImageProps } from "expo-image";
import { StyleProp, View, ViewStyle } from "react-native";

import { ImageShimmer } from "./image-shimmer";

export const ImageWithShimmer = ({
  style,
  contentFit = "cover",
  onLoad,
  ...imageProps
}: ImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <View style={[style as StyleProp<ViewStyle>, { overflow: "hidden" }]}>
      <Image
        {...imageProps}
        style={style}
        contentFit={contentFit}
        onLoad={(event) => {
          setIsLoaded(true);
          onLoad?.(event);
        }}
      />
      {!isLoaded && <ImageShimmer />}
    </View>
  );
};
