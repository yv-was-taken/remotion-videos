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
import { SceneHowItWorks } from "./SceneHowItWorks";
import { SceneToken } from "./SceneToken";
import { SceneClose } from "./SceneClose";

// ============================================================
// MAIN COMPOSITION — word-level timestamps from Whisper
//
// Audio: 65.8s — Scene breakdown:
//   0.0  - 19.5s  THE THREAT        (danger, vulnerabilities)
//  19.5  - 21.0s  INTRODUCING       (1.5s flash reveal)
//  21.0  - 35.0s  HOW IT WORKS      (proxy architecture)
//  35.0  - 55.0s  $STRONG TOKEN     (value prop, burns)
//  55.0  - 66.0s  CTA + CLOSE       (buy, quote)
// ============================================================

export const StrongholdVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bgDark }}>
      {/* Narration audio */}
      <Audio src={staticFile("narration.mp3")} />

      {/* Scene 1: The Threat */}
      <Sequence from={0} durationInFrames={sec(19.5)}>
        <SceneThreat />
      </Sequence>

      {/* Scene 2: Introducing Stronghold (1.5s flash) */}
      <Sequence from={sec(19.5)} durationInFrames={sec(1.5)}>
        <SceneIntro />
      </Sequence>

      {/* Scene 3: How It Works */}
      <Sequence from={sec(21)} durationInFrames={sec(14)}>
        <SceneHowItWorks />
      </Sequence>

      {/* Scene 4: $STRONG Token */}
      <Sequence from={sec(35)} durationInFrames={sec(20)}>
        <SceneToken />
      </Sequence>

      {/* Scene 5: CTA + Close */}
      <Sequence from={sec(55)} durationInFrames={sec(11)}>
        <SceneClose />
      </Sequence>
    </AbsoluteFill>
  );
};
