import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
} from "remotion";
import { COLORS, sec } from "./constants";
import { SceneOpener } from "./SceneOpener";
import { SceneB2BAPI } from "./SceneB2BAPI";
import { SceneImageScan } from "./SceneImageScan";
import { SceneEgress } from "./SceneEgress";
import { SceneClose } from "./SceneClose";

// ============================================================
// MAIN COMPOSITION — word-level timestamps from Whisper
//
// Audio: 72.7s — Scene breakdown:
//   0.0  - 10.0s  OPENER           (welcome back, initiatives)
//  10.0  - 31.5s  B2B API          (pipeline scanning)
//  31.5  - 47.0s  IMAGE SCANNING   (hidden prompt injection)
//  47.0  - 58.5s  SCAN EGRESS      (output protection)
//  58.5  - 74.0s  CLOSE            (CTA, GET STRONG!)
// ============================================================

export const B2BUpdateVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bgDark }}>
      {/* Narration audio */}
      <Audio src={staticFile("narration.mp3")} />

      {/* Scene 1: Opener */}
      <Sequence from={0} durationInFrames={sec(10)}>
        <SceneOpener />
      </Sequence>

      {/* Scene 2: B2B API */}
      <Sequence from={sec(10)} durationInFrames={sec(21.5)}>
        <SceneB2BAPI />
      </Sequence>

      {/* Scene 3: Image Scanning */}
      <Sequence from={sec(31.5)} durationInFrames={sec(15.5)}>
        <SceneImageScan />
      </Sequence>

      {/* Scene 4: Scan Egress */}
      <Sequence from={sec(47)} durationInFrames={sec(11.5)}>
        <SceneEgress />
      </Sequence>

      {/* Scene 5: Close */}
      <Sequence from={sec(58.5)} durationInFrames={sec(15.5)}>
        <SceneClose />
      </Sequence>
    </AbsoluteFill>
  );
};
