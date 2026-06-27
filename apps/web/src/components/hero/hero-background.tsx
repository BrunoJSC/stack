"use client";

import {
	type MotionValue,
	motion,
	useReducedMotion,
	useTransform,
} from "motion/react";
import type { CSSProperties } from "react";

interface HeroBackgroundProps {
	parallaxX: MotionValue<number>;
	parallaxY: MotionValue<number>;
	showGrid: boolean;
}

const GRID_STYLE: CSSProperties = {
	position: "absolute",
	inset: 0,
	backgroundImage:
		"linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px)",
	backgroundSize: "62px 62px",
	maskImage:
		"radial-gradient(ellipse 72% 58% at 50% 42%,#000 0%,transparent 72%)",
	WebkitMaskImage:
		"radial-gradient(ellipse 72% 58% at 50% 42%,#000 0%,transparent 72%)",
};

const GLOW_STYLE: CSSProperties = {
	position: "absolute",
	inset: 0,
	borderRadius: "50%",
	background:
		"radial-gradient(ellipse at center,rgba(150,168,220,.16),rgba(120,138,200,.05) 45%,transparent 70%)",
	filter: "blur(22px)",
};

const NOISE_URL =
	"url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22180%22 height=%22180%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%222%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')";

/** All non-interactive background layers of the hero. */
export default function HeroBackground({
	parallaxX,
	parallaxY,
	showGrid,
}: HeroBackgroundProps) {
	const prefersReducedMotion = useReducedMotion();

	const gridX = useTransform(parallaxX, (value) => value * -20);
	const gridY = useTransform(parallaxY, (value) => value * -20);
	const glowX = useTransform(parallaxX, (value) => value * 30);
	const glowY = useTransform(parallaxY, (value) => value * 24);

	return (
		<>
			{showGrid && (
				<motion.div
					aria-hidden="true"
					className="pointer-events-none absolute -inset-[12%]"
					style={{ x: gridX, y: gridY }}
				>
					<motion.div
						animate={prefersReducedMotion ? undefined : { y: -14 }}
						initial={{ y: 0 }}
						style={GRID_STYLE}
						transition={{
							duration: 8,
							repeat: Number.POSITIVE_INFINITY,
							repeatType: "reverse",
							ease: "easeInOut",
						}}
					/>
				</motion.div>
			)}

			<motion.div
				aria-hidden="true"
				className="pointer-events-none absolute"
				style={{
					left: "50%",
					top: "42%",
					width: 920,
					height: 560,
					marginLeft: -460,
					marginTop: -280,
					x: glowX,
					y: glowY,
				}}
			>
				<motion.div
					animate={
						prefersReducedMotion ? undefined : { opacity: 0.78, scale: 1.12 }
					}
					initial={{ opacity: 0.4, scale: 1 }}
					style={GLOW_STYLE}
					transition={{
						duration: 4.5,
						repeat: Number.POSITIVE_INFINITY,
						repeatType: "reverse",
						ease: "easeInOut",
					}}
				/>
			</motion.div>

			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-0"
				style={{
					background:
						"radial-gradient(ellipse 82% 80% at 50% 32%,transparent 52%,rgba(0,0,0,.72))",
				}}
			/>
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
				style={{ backgroundImage: NOISE_URL }}
			/>
		</>
	);
}
