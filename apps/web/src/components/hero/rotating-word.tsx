"use client";

import { type CSSProperties, useEffect, useRef, useState } from "react";

interface RotatingWordProps {
	activeIndex: number;
	words: readonly string[];
}

const ROLL_TRANSITION = "cubic-bezier(0.16,1,0.3,1)";

/**
 * A vertical word roller: every word is stacked in a column that slides to the
 * active index while the visible window animates its width to fit the word.
 */
export default function RotatingWord({
	words,
	activeIndex,
}: RotatingWordProps) {
	const innerRef = useRef<HTMLSpanElement>(null);
	const [stepHeight, setStepHeight] = useState(0);
	const [widths, setWidths] = useState<number[]>([]);

	useEffect(() => {
		const inner = innerRef.current;
		if (!inner) {
			return;
		}
		const measure = () => {
			const children = Array.from(inner.children) as HTMLElement[];
			if (children.length === 0) {
				return;
			}
			setStepHeight(children[0].offsetHeight);
			setWidths(children.map((child) => child.offsetWidth));
		};
		measure();
		window.addEventListener("resize", measure);
		return () => window.removeEventListener("resize", measure);
	}, []);

	const isMeasured = stepHeight > 0 && widths.length === words.length;

	const outerStyle: CSSProperties = {
		display: "inline-block",
		overflow: "hidden",
		verticalAlign: "bottom",
		height: isMeasured ? `${stepHeight}px` : "1.06em",
		width: isMeasured ? `${widths[activeIndex]}px` : "auto",
		transition: isMeasured ? `width 0.7s ${ROLL_TRANSITION}` : undefined,
	};

	const innerStyle: CSSProperties = {
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-start",
		transform: isMeasured
			? `translateY(${-activeIndex * stepHeight}px)`
			: undefined,
		transition: isMeasured ? `transform 0.7s ${ROLL_TRANSITION}` : undefined,
	};

	return (
		<span style={outerStyle}>
			<span ref={innerRef} style={innerStyle}>
				{words.map((word) => (
					<span
						className="block whitespace-nowrap bg-linear-to-b from-white to-white/60 bg-clip-text text-transparent leading-[1.06]"
						key={word}
					>
						{word}
					</span>
				))}
			</span>
		</span>
	);
}
