import { Composition } from "remotion";
import { B2BUpdateVideo } from "./B2BUpdateVideo";

// 72.7s audio → 2181 frames at 30fps (round to 2220 for fade out)
const DURATION_FRAMES = 2220;
const FPS = 30;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="B2BUpdateVideo"
        component={B2BUpdateVideo}
        durationInFrames={DURATION_FRAMES}
        fps={FPS}
        width={1920}
        height={1080}
      />
    </>
  );
};
