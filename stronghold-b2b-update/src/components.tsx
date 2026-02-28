import React from "react";
import {
  useCurrentFrame,
  interpolate,
  Img,
  staticFile,
  spring,
  useVideoConfig,
} from "remotion";
import { COLORS } from "./constants";

// ============================================================
// GlowText — styled text with configurable glow
// ============================================================
export const GlowText: React.FC<{
  children: React.ReactNode;
  fontSize?: number;
  color?: string;
  glowColor?: string;
  style?: React.CSSProperties;
}> = ({
  children,
  fontSize = 52,
  color = COLORS.textWhite,
  glowColor = COLORS.accentCyan,
  style = {},
}) => (
  <div
    style={{
      fontSize,
      fontWeight: 700,
      color,
      textShadow: `0 0 40px ${glowColor}55, 0 0 80px ${glowColor}22`,
      fontFamily:
        "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
      lineHeight: 1.35,
      ...style,
    }}
  >
    {children}
  </div>
);

// ============================================================
// FadeIn — simple opacity + translateY entrance
// ============================================================
export const FadeIn: React.FC<{
  children: React.ReactNode;
  delay?: number;
  duration?: number;
}> = ({ children, delay = 0, duration = 12 }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame - delay, [0, duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const y = interpolate(frame - delay, [0, duration], [25, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div style={{ opacity, transform: `translateY(${y}px)` }}>{children}</div>
  );
};

// ============================================================
// GridBackground — animated cyber-grid
// ============================================================
export const GridBackground: React.FC<{ intensity?: number }> = ({
  intensity = 0.12,
}) => {
  const frame = useCurrentFrame();
  const offset = (frame * 0.3) % 60;
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: intensity,
        backgroundImage: `
          linear-gradient(${COLORS.accentCyan}15 1px, transparent 1px),
          linear-gradient(90deg, ${COLORS.accentCyan}15 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
        backgroundPosition: `0 ${offset}px`,
      }}
    />
  );
};

// ============================================================
// ScanLine — horizontal moving scan beam
// ============================================================
export const ScanLine: React.FC<{ speed?: number }> = ({ speed = 2 }) => {
  const frame = useCurrentFrame();
  const y = (frame * speed) % 1080;
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: y,
        height: 2,
        background: `linear-gradient(90deg, transparent, ${COLORS.accentCyan}40, transparent)`,
        boxShadow: `0 0 20px ${COLORS.accentCyan}30`,
      }}
    />
  );
};

// ============================================================
// Particles — floating dots
// ============================================================
export const Particles: React.FC<{ count?: number }> = ({ count = 20 }) => {
  const frame = useCurrentFrame();
  return (
    <>
      {Array.from({ length: count }, (_, i) => {
        const x = (i * 137 + frame * 0.5) % 1920;
        const y = (i * 97 + frame * 0.3) % 1080;
        const size = 2 + (i % 3);
        const opacity = 0.08 + (i % 5) * 0.04;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: size,
              height: size,
              borderRadius: "50%",
              backgroundColor: COLORS.accentCyan,
              opacity,
            }}
          />
        );
      })}
    </>
  );
};

// ============================================================
// RadialGlow — centered glow effect
// ============================================================
export const RadialGlow: React.FC<{
  size?: number;
  color?: string;
  opacity?: number;
  blur?: number;
}> = ({
  size = 600,
  color = COLORS.accentCyan,
  opacity = 0.12,
  blur = 60,
}) => (
  <div
    style={{
      position: "absolute",
      width: size,
      height: size,
      borderRadius: "50%",
      background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      opacity,
      filter: `blur(${blur}px)`,
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
    }}
  />
);

// ============================================================
// Helper: highlight a word in text with accent color
// ============================================================
export function renderHighlighted(
  text: string,
  highlight: string,
  color: string = COLORS.accentCyan
): React.ReactNode {
  const idx = text.indexOf(highlight);
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <span style={{ color }}>{highlight}</span>
      {text.slice(idx + highlight.length)}
    </>
  );
}

// ============================================================
// FeatureBadge — numbered badge for feature announcements
// ============================================================
export const FeatureBadge: React.FC<{
  number: string;
  delay?: number;
}> = ({ number, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 80 },
  });

  const glowPulse = interpolate(
    Math.sin((frame - delay) * 0.08),
    [-1, 1],
    [0.3, 0.7]
  );

  return (
    <div
      style={{
        transform: `scale(${scale})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          fontSize: 80,
          fontWeight: 900,
          color: COLORS.accentCyan,
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          textShadow: `0 0 60px ${COLORS.accentCyan}${Math.round(glowPulse * 255).toString(16).padStart(2, "0")}, 0 0 120px ${COLORS.accentCyan}33`,
          letterSpacing: 4,
        }}
      >
        {number}
      </div>
    </div>
  );
};

// ============================================================
// WordReveal — per-word opacity reveal synced to narration
// ============================================================
export interface WordTiming {
  text: string;
  at: number;
  color?: string;
}

export const WordReveal: React.FC<{
  words: WordTiming[];
  fontSize?: number;
  color?: string;
  glowColor?: string;
  style?: React.CSSProperties;
}> = ({
  words,
  fontSize = 34,
  color = COLORS.textWhite,
  glowColor = COLORS.accentCyan,
  style = {},
}) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        fontSize,
        fontWeight: 700,
        color,
        textShadow: `0 0 40px ${glowColor}55, 0 0 80px ${glowColor}22`,
        fontFamily:
          "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
        lineHeight: 1.35,
        ...style,
      }}
    >
      {words.map((word, i) => {
        const wordOpacity = interpolate(
          frame,
          [word.at, word.at + 1],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        return (
          <span
            key={i}
            style={{
              opacity: wordOpacity,
              ...(word.color ? { color: word.color } : {}),
            }}
          >
            {word.text}
            {i < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </div>
  );
};
