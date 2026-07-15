import { PixelRatio } from "react-native";

const toSourcePixels = (layoutPixels: number) =>
  Math.ceil(layoutPixels * PixelRatio.get());

export const getSizedImageUri = (
  uri: string,
  width: number,
  height = width,
) => {
  const sourceWidth = toSourcePixels(width);
  const sourceHeight = toSourcePixels(height);
  const squareSize = Math.max(sourceWidth, sourceHeight);

  return uri
    .replace(/(pravatar\.cc\/)\d+/, `$1${squareSize}`)
    .replace(
      /(picsum\.photos\/(?:id\/\d+|seed\/[^/]+)\/)\d+\/\d+/,
      `$1${sourceWidth}/${sourceHeight}`,
    );
};
