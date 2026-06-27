import { Star } from "lucide-react";

const STATS = [
	{ id: "rating", value: "4,9/5", label: "avaliação média", rating: true },
	{ id: "freelancers", value: "12 mil+", label: "freelancers", rating: false },
	{ id: "skills", value: "150+", label: "habilidades", rating: false },
] as const;

/** Trust/social-proof row shown beneath the hero search. */
export default function HeroStats() {
	return (
		<div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
			{STATS.map((stat) => (
				<div className="flex items-center gap-2" key={stat.id}>
					{stat.rating ? (
						<Star className="size-4 fill-white text-white" />
					) : null}
					<span className="font-semibold text-white">{stat.value}</span>
					<span className="text-sm text-white/40">{stat.label}</span>
				</div>
			))}
		</div>
	);
}
