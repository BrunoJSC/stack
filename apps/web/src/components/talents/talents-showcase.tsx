"use client";

import { motion, useReducedMotion } from "motion/react";

import DisciplineCard from "./discipline-card";
import { DISCIPLINES } from "./disciplines";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export default function TalentsShowcase() {
	const prefersReducedMotion = useReducedMotion();

	const containerVariants = {
		hidden: {},
		visible: { transition: { staggerChildren: 0.08 } },
	};

	const itemVariants = {
		hidden: prefersReducedMotion ? {} : { opacity: 0, y: 24 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.6, ease: EASE_OUT_EXPO },
		},
	};

	return (
		<section
			className="scroll-mt-24 border-white/6 border-t bg-[#060607] px-4 py-24 sm:py-32"
			id="talentos"
		>
			<div className="mx-auto max-w-6xl">
				<motion.div
					className="mx-auto max-w-2xl text-center"
					initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
					transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
					viewport={{ once: true, amount: 0.5 }}
					whileInView={{ opacity: 1, y: 0 }}
				>
					<p className="font-medium text-white/40 text-xs uppercase tracking-[0.2em]">
						Talentos
					</p>
					<h2 className="mt-4 text-balance font-semibold text-3xl text-white tracking-tight sm:text-4xl">
						Encontre o profissional certo
					</h2>
					<p className="mt-4 text-pretty text-white/50 sm:text-lg">
						Explore as áreas mais procuradas e contrate freelancers verificados
						em poucos cliques.
					</p>
				</motion.div>

				<motion.ul
					className="mt-14 grid gap-4 sm:grid-cols-2 lg:h-144 lg:grid-cols-4 lg:grid-rows-2"
					initial="hidden"
					variants={containerVariants}
					viewport={{ once: true, amount: 0.15 }}
					whileInView="visible"
				>
					{DISCIPLINES.map((discipline, index) => (
						<DisciplineCard
							discipline={discipline}
							featured={index === 0}
							key={discipline.title}
							variants={itemVariants}
						/>
					))}
				</motion.ul>
			</div>
		</section>
	);
}
