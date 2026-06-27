"use client";

import { Search } from "lucide-react";
import type { FormEvent } from "react";

const POPULAR_SEARCHES = [
	"Programação",
	"Design",
	"Áudio",
	"Conteúdo",
	"Vídeo",
] as const;

export default function HeroSearch() {
	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
	};

	return (
		<div className="w-full max-w-xl">
			<form
				className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 p-1.5 pl-5 backdrop-blur-sm transition-colors focus-within:border-white/30"
				onSubmit={handleSubmit}
			>
				<Search className="size-5 shrink-0 text-white/40" />
				<input
					aria-label="Buscar talentos"
					className="min-w-0 flex-1 bg-transparent py-2.5 text-[15px] text-white placeholder:text-white/40 focus:outline-none"
					placeholder="Busque por habilidade, função ou palavra-chave"
					type="search"
				/>
				<button
					className="inline-flex shrink-0 items-center rounded-full bg-[#fafafa] px-5 py-2.5 font-semibold text-[#0a0a0a] text-sm transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(255,255,255,0.18)]"
					type="submit"
				>
					Buscar
				</button>
			</form>

			<div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm">
				<span className="text-white/30">Popular:</span>
				{POPULAR_SEARCHES.map((term) => (
					<button
						className="rounded-full border border-white/10 bg-white/3 px-3 py-1 text-white/60 transition-colors hover:border-white/25 hover:text-white"
						key={term}
						type="button"
					>
						{term}
					</button>
				))}
			</div>
		</div>
	);
}
