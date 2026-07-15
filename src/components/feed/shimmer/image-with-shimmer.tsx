import { Image, ImageProps } from "expo-image";
import { StyleProp, View, ViewStyle } from "react-native";

const DEFAULT_BLURHASH = "L6PZfSi_.AyE_3t7t7R**0o#DgR4";

export const ImageWithShimmer = ({
  style,
  contentFit = "cover",
  ...imageProps
}: ImageProps) => {
  return (
    <View style={[style as StyleProp<ViewStyle>, { overflow: "hidden" }]}>
      <Image
        {...imageProps}
        style={style}
        contentFit={contentFit}
        placeholder={{ blurhash: DEFAULT_BLURHASH }}
        transition={200}
      />
    </View>
  );
};
