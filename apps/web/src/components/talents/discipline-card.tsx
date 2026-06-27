"use client";

import { motion, type Variants } from "motion/react";
import DisciplineVisual from "./discipline-visual";
import type { Discipline } from "./disciplines";

interface DisciplineCardProps {
	discipline: Discipline;
	featured: boolean;
	variants: Variants;
}

export default function DisciplineCard({
	discipline,
	featured,
	variants,
}: DisciplineCardProps) {
	const { icon: Icon, title, description, variant, stat } = discipline;

	return (
		<motion.li
			className={`group flex h-full min-h-64 flex-col overflow-hidden rounded-2xl border border-white/8 bg-white/2 p-3 transition-colors duration-300 hover:border-white/20 hover:bg-white/4 ${
				featured ? "sm:col-span-2 lg:row-span-2" : ""
			}`}
			variants={variants}
		>
			<div className="relative flex-1 overflow-hidden rounded-xl border border-white/6 bg-white/2">
				<DisciplineVisual variant={variant} />
			</div>

			<div className="flex items-end justify-between gap-3 px-2 pt-4 pb-1">
				<div className="space-y-1 text-left">
					<h3
						className={`font-semibold text-white tracking-tight ${
							featured ? "text-2xl" : "text-lg"
						}`}
					>
						{title}
					</h3>
					<p className="text-pretty text-sm text-white/40 leading-relaxed">
						{description}
					</p>
					<p className="pt-1 font-medium text-white/30 text-xs">{stat}</p>
				</div>
				<Icon className="size-5 shrink-0 text-white/30 transition-colors group-hover:text-white" />
			</div>
		</motion.li>
	);
}
