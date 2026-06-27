"use client";
import { useQuery } from "@tanstack/react-query";

import HeroFreelancers from "@/components/hero/hero-freelancers";
import TalentsShowcase from "@/components/talents/talents-showcase";
import { trpc } from "@/utils/trpc";

export default function Home() {
	const healthCheck = useQuery(trpc.healthCheck.queryOptions());

	let apiStatus = "Sistema offline";
	if (healthCheck.isLoading) {
		apiStatus = "Verificando...";
	} else if (healthCheck.data) {
		apiStatus = "Sistema online";
	}

	return (
		<div className="bg-[#060607]">
			<HeroFreelancers />
			<TalentsShowcase />
			<div className="flex justify-center px-4 pb-24">
				<span className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/2 px-3.5 py-1.5 text-white/50 text-xs">
					<span
						className={`size-1.5 rounded-full ${healthCheck.data ? "bg-emerald-400" : "bg-white/30"}`}
					/>
					{apiStatus}
				</span>
			</div>
		</div>
	);
}
