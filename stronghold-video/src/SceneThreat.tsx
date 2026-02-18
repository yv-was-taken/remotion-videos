import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { COLORS, sec } from "./constants";
import {
  GlowText,
  FadeIn,
  GridBackground,
  ScanLine,
  renderHighlighted,
} from "./components";

interface Caption {
  text: string;
  from: number;
  to: number;
  highlight?: string;
  highlightColor?: string;
}

export const SceneThreat: React.FC = () => {
  const frame = useCurrentFrame();

  const captions: Caption[] = [
    {
      text: "Autonomous agents hold private keys\nand move real capital around the clock!",
      from: 0,
      to: sec(4.3),
      highlight: "private keys",
    },
    {
      text: "Every website they scrape,\nevery document they parse\nis an open door!",
      from: sec(4.5),
      to: sec(8.6),
    },
    {
      text: "A single prompt injection\ncan hijack an agent's behavior!",
      from: sec(8.8),
      to: sec(12.7),
      highlight: "prompt injection",
      highlightColor: COLORS.warningAmber,
    },
    {
      text: "A single credential leak can expose\nprivate keys to the open internet.",
      from: sec(12.9),
      to: sec(17.1),
      highlight: "credential leak",
      highlightColor: COLORS.dangerRed,
    },
    {
      text: "One exploit is all it takes!",
      from: sec(17.1),
      to: sec(19.3),
    },
  ];

  const currentCaption = captions.find(
    (c) => frame >= c.from && frame < c.to
  );

  // Red vignette pulse — intensifies over time
  const progress = interpolate(frame, [0, sec(19.5)], [0, 1], {
    extrapolateRight: "clamp",
  });
  const dangerPulse =
    interpolate(Math.sin(frame * 0.1), [-1, 1], [0.15, 0.35]) * progress;

  // "One exploit is all it takes!" — flash red on this separate slide
  const isExploitLine = frame >= sec(17.1) && frame < sec(19.3);
  const flashOpacity = isExploitLine
    ? interpolate(Math.sin(frame * 0.5), [-1, 1], [0, 0.12])
    : 0;

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bgDark,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <GridBackground intensity={0.06} />
      <ScanLine speed={1.5} />

      {/* Red vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at center, transparent 40%, ${COLORS.dangerRed} 100%)`,
          opacity: dangerPulse,
        }}
      />

      {/* Flash on "one exploit" */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: COLORS.dangerRed,
          opacity: flashOpacity,
        }}
      />

      {/* Caption */}
      {currentCaption && (
        <FadeIn key={currentCaption.from} duration={4}>
          <GlowText
            fontSize={isExploitLine ? 72 : 54}
            color={isExploitLine ? COLORS.dangerRed : COLORS.textWhite}
            glowColor={isExploitLine ? COLORS.dangerRed : COLORS.accentCyan}
            style={{
              textAlign: "center",
              maxWidth: 1200,
              padding: "0 80px",
              whiteSpace: "pre-line",
            }}
          >
            {currentCaption.highlight
              ? renderHighlighted(
                  currentCaption.text,
                  currentCaption.highlight,
                  currentCaption.highlightColor || COLORS.accentCyan
                )
              : currentCaption.text}
          </GlowText>
        </FadeIn>
      )}
    </AbsoluteFill>
  );
};
