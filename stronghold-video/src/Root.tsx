import { Composition } from "remotion";
import { StrongholdVideo } from "./StrongholdVideo";
import { StrongholdVideoShort } from "./StrongholdVideoShort";

// 65.8s audio → 1974 frames at 30fps (round to 1980 for clean end)
const DURATION_FRAMES = 1980;
const FPS = 30;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="StrongholdVideo"
        component={StrongholdVideo}
        durationInFrames={DURATION_FRAMES}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="StrongholdVideoShort"
        component={StrongholdVideoShort}
        durationInFrames={DURATION_FRAMES}
        fps={FPS}
        width={1080}
        height={1920}
      />
    </>
  );
};
