"use client";

import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion, useTransform } from "motion/react";
import Link from "next/link";
import type { CSSProperties } from "react";

import { DEFAULT_ROTATE_MS, EASE_OUT_EXPO, ROTATING_FIELDS } from "./constants";
import HeroBackground from "./hero-background";
import HeroSearch from "./hero-search";
import HeroStats from "./hero-stats";
import RotatingWord from "./rotating-word";
import type { HeroFreelancersProps } from "./types";
import { usePointerParallax } from "./use-pointer-parallax";
import { useRotatingIndex } from "./use-rotating-index";

const HEADING_STYLE: CSSProperties = {
	fontWeight: 800,
	fontSize: "clamp(2.6rem,7.4vw,5.6rem)",
	lineHeight: 1.06,
	letterSpacing: "-.035em",
	color: "#fafafa",
};

const PARAGRAPH_STYLE: CSSProperties = {
	fontSize: "clamp(1rem,1.35vw,1.16rem)",
	lineHeight: 1.55,
	color: "rgba(255,255,255,.5)",
};

export default function HeroFreelancers({
	rotateMs = DEFAULT_ROTATE_MS,
	parallax = true,
	showGrid = true,
}: HeroFreelancersProps) {
	const prefersReducedMotion = useReducedMotion();
	const parallaxEnabled = parallax && !prefersReducedMotion;

	const activeIndex = useRotatingIndex(
		ROTATING_FIELDS.length,
		rotateMs,
		!prefersReducedMotion
	);
	const { x, y, onPointerMove, onPointerLeave } =
		usePointerParallax(parallaxEnabled);

	const contentX = useTransform(x, (value) => value * 9);
	const contentY = useTransform(y, (value) => value * 7);

	const maskUp = (delay: number) => ({
		initial: prefersReducedMotion ? false : { y: "112%" },
		animate: { y: 0 },
		transition: { duration: 0.95, ease: EASE_OUT_EXPO, delay },
	});

	const rise = (delay: number) => ({
		initial: prefersReducedMotion ? false : { opacity: 0, y: 26 },
		animate: { opacity: 1, y: 0 },
		transition: { duration: 0.9, ease: EASE_OUT_EXPO, delay },
	});

	return (
		<section
			className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden"
			onPointerLeave={onPointerLeave}
			onPointerMove={onPointerMove}
			style={{ background: "#060607" }}
		>
			<HeroBackground parallaxX={x} parallaxY={y} showGrid={showGrid} />

			<motion.div
				className="relative z-[2] flex w-full max-w-[1080px] flex-col items-center px-6 text-center"
				style={{ x: contentX, y: contentY }}
			>
				<h1 style={HEADING_STYLE}>
					<span className="block overflow-hidden px-[0.04em]">
						<motion.span className="inline-block" {...maskUp(0.18)}>
							Contrate os melhores
						</motion.span>
					</span>
					<span className="block overflow-hidden px-[0.04em]">
						<motion.span className="inline-block" {...maskUp(0.3)}>
							freelancers de{" "}
							<RotatingWord activeIndex={activeIndex} words={ROTATING_FIELDS} />
						</motion.span>
					</span>
				</h1>

				<motion.p
					className="mt-6 max-w-[540px] font-normal"
					style={PARAGRAPH_STYLE}
					{...rise(0.5)}
				>
					Conecte-se com profissionais de tecnologia, design e música. Encontre
					o talento certo e tire qualquer projeto do papel — hoje.
				</motion.p>

				<motion.div className="mt-9 flex w-full justify-center" {...rise(0.55)}>
					<HeroSearch />
				</motion.div>

				<motion.div {...rise(0.7)}>
					<Link
						className="mt-5 inline-flex items-center gap-1 text-sm text-white/50 transition-colors hover:text-white"
						href="#cadastro"
					>
						Quer trabalhar como freelancer? Criar perfil
						<ArrowRight className="size-4" />
					</Link>
				</motion.div>

				<motion.div className="mt-12" {...rise(0.85)}>
					<HeroStats />
				</motion.div>
			</motion.div>
		</section>
	);
}
