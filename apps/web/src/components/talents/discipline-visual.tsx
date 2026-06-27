import { Play } from "lucide-react";

import type { DisciplineVariant } from "./disciplines";

const WINDOW_DOTS = ["dot-a", "dot-b", "dot-c"] as const;

const CODE_LINES = [
	{ id: "l1", width: "38%", indent: 0, accent: true },
	{ id: "l2", width: "62%", indent: 1, accent: false },
	{ id: "l3", width: "48%", indent: 2, accent: false },
	{ id: "l4", width: "70%", indent: 2, accent: false },
	{ id: "l5", width: "34%", indent: 1, accent: true },
	{ id: "l6", width: "56%", indent: 0, accent: false },
] as const;

const SWATCHES = [
	{ id: "s1", className: "bg-white/80" },
	{ id: "s2", className: "bg-white/45" },
	{ id: "s3", className: "bg-white/25" },
	{ id: "s4", className: "bg-white/15" },
	{ id: "s5", className: "border border-white/15 bg-transparent" },
] as const;

const AUDIO_BARS = [
	{ id: "a1", height: "32%" },
	{ id: "a2", height: "58%" },
	{ id: "a3", height: "42%" },
	{ id: "a4", height: "74%" },
	{ id: "a5", height: "52%" },
	{ id: "a6", height: "88%" },
	{ id: "a7", height: "60%" },
	{ id: "a8", height: "96%" },
	{ id: "a9", height: "46%" },
	{ id: "a10", height: "78%" },
	{ id: "a11", height: "36%" },
	{ id: "a12", height: "66%" },
	{ id: "a13", height: "84%" },
	{ id: "a14", height: "50%" },
	{ id: "a15", height: "92%" },
	{ id: "a16", height: "54%" },
	{ id: "a17", height: "40%" },
	{ id: "a18", height: "70%" },
	{ id: "a19", height: "58%" },
	{ id: "a20", height: "34%" },
] as const;

const CONTENT_LINES = [
	{ id: "c1", width: "100%" },
	{ id: "c2", width: "92%" },
	{ id: "c3", width: "96%" },
	{ id: "c4", width: "70%" },
] as const;

const FRAME_CLASS = "flex h-full w-full flex-col p-5";

function CodeVisual() {
	return (
		<div className={FRAME_CLASS}>
			<div className="flex items-center gap-1.5 pb-5">
				{WINDOW_DOTS.map((dot) => (
					<span className="size-2.5 rounded-full bg-white/15" key={dot} />
				))}
			</div>
			<div className="flex flex-1 flex-col justify-center gap-3 font-mono">
				{CODE_LINES.map((line) => (
					<div
						className="flex items-center"
						key={line.id}
						style={{ paddingLeft: `${line.indent * 18}px` }}
					>
						<span
							className={`h-2 rounded-full ${line.accent ? "bg-white/35" : "bg-white/12"}`}
							style={{ width: line.width }}
						/>
					</div>
				))}
			</div>
		</div>
	);
}

function DesignVisual() {
	return (
		<div className={FRAME_CLASS}>
			<div className="flex flex-1 gap-3">
				<div className="flex flex-1 items-center justify-center rounded-xl border border-white/8 bg-white/3">
					<div className="size-14 rounded-full bg-white/20" />
				</div>
				<div className="flex w-1/3 flex-col gap-3">
					<div className="flex-1 rounded-xl bg-white/8" />
					<div className="flex-1 rounded-xl border border-white/8" />
				</div>
			</div>
			<div className="mt-3 flex gap-2">
				{SWATCHES.map((swatch) => (
					<span
						className={`size-7 flex-1 rounded-lg ${swatch.className}`}
						key={swatch.id}
					/>
				))}
			</div>
		</div>
	);
}

function AudioVisual() {
	return (
		<div className={FRAME_CLASS}>
			<div className="flex flex-1 items-center justify-center gap-[5px]">
				{AUDIO_BARS.map((bar) => (
					<span
						className="w-1.5 rounded-full bg-white/30"
						key={bar.id}
						style={{ height: bar.height }}
					/>
				))}
			</div>
		</div>
	);
}

function ContentVisual() {
	return (
		<div className={FRAME_CLASS}>
			<div className="flex h-full gap-4">
				<div className="aspect-square h-full rounded-xl border border-white/8 bg-white/3" />
				<div className="flex flex-1 flex-col justify-center gap-3">
					<span className="h-3 w-1/2 rounded-full bg-white/30" />
					{CONTENT_LINES.map((line) => (
						<span
							className="h-2 rounded-full bg-white/12"
							key={line.id}
							style={{ width: line.width }}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

function VideoVisual() {
	return (
		<div className={FRAME_CLASS}>
			<div className="relative flex flex-1 items-center justify-center rounded-xl border border-white/8 bg-white/3">
				<span className="flex size-14 items-center justify-center rounded-full bg-white/90 text-black">
					<Play className="size-5 translate-x-0.5 fill-current" />
				</span>
				<div className="absolute inset-x-5 bottom-4 flex items-center gap-2">
					<span className="h-1 flex-1 rounded-full bg-white/15">
						<span className="block h-full w-1/3 rounded-full bg-white/60" />
					</span>
					<span className="size-2.5 rounded-full bg-white/60" />
				</div>
			</div>
		</div>
	);
}

const VISUALS: Record<DisciplineVariant, () => React.JSX.Element> = {
	code: CodeVisual,
	design: DesignVisual,
	audio: AudioVisual,
	content: ContentVisual,
	video: VideoVisual,
};

export default function DisciplineVisual({
	variant,
}: {
	variant: DisciplineVariant;
}) {
	const Visual = VISUALS[variant];
	return <Visual />;
}
