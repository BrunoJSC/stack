import {
	AudioLines,
	Clapperboard,
	Code2,
	type LucideIcon,
	Palette,
	PenLine,
} from "lucide-react";

export type DisciplineVariant =
	| "code"
	| "design"
	| "audio"
	| "content"
	| "video";

export interface Discipline {
	description: string;
	icon: LucideIcon;
	/** Social-proof figure shown on the card (e.g. number of professionals). */
	stat: string;
	title: string;
	variant: DisciplineVariant;
}

export const DISCIPLINES: Discipline[] = [
	{
		icon: Code2,
		title: "Programação",
		description: "Sites, apps, APIs e automações sob medida.",
		variant: "code",
		stat: "1,4 mil+ profissionais",
	},
	{
		icon: Palette,
		title: "Design",
		description: "Identidade visual, UI/UX e branding.",
		variant: "design",
		stat: "980+ profissionais",
	},
	{
		icon: AudioLines,
		title: "Áudio & Beats",
		description: "Produção de beats, mixagem e masterização.",
		variant: "audio",
		stat: "420+ profissionais",
	},
	{
		icon: PenLine,
		title: "Conteúdo",
		description: "Copywriting, social media e roteiros.",
		variant: "content",
		stat: "1,1 mil+ profissionais",
	},
	{
		icon: Clapperboard,
		title: "Vídeo",
		description: "Edição, motion graphics e finalização.",
		variant: "video",
		stat: "560+ profissionais",
	},
];
