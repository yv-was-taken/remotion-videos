import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
} from "remotion";
import { COLORS, sec } from "./constants";
import { SceneThreat } from "./SceneThreat";
import { SceneIntro } from "./SceneIntro";
import { SceneHowItWorksShort } from "./SceneHowItWorksShort";
import { SceneToken } from "./SceneToken";
import { SceneClose } from "./SceneClose";

// ============================================================
// SHORT-FORM (9:16) COMPOSITION — 1080x1920
// Same audio/timing as widescreen, vertical layout
// ============================================================

export const StrongholdVideoShort: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bgDark }}>
      <Audio src={staticFile("narration.mp3")} />

      <Sequence from={0} durationInFrames={sec(19.5)}>
        <SceneThreat />
      </Sequence>

      <Sequence from={sec(19.5)} durationInFrames={sec(1.5)}>
        <SceneIntro />
      </Sequence>

      <Sequence from={sec(21)} durationInFrames={sec(14)}>
        <SceneHowItWorksShort />
      </Sequence>

      <Sequence from={sec(35)} durationInFrames={sec(20)}>
        <SceneToken />
      </Sequence>

      <Sequence from={sec(55)} durationInFrames={sec(11)}>
        <SceneClose />
      </Sequence>
    </AbsoluteFill>
  );
};
