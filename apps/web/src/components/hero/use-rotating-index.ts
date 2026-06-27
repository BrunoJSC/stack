import { useEffect, useState } from "react";

/**
 * Cycles an index from 0..count-1 on a fixed interval.
 * Pass `enabled = false` (e.g. reduced motion) to freeze on the first item.
 */
export function useRotatingIndex(
	count: number,
	intervalMs: number,
	enabled: boolean
): number {
	const [index, setIndex] = useState(0);

	useEffect(() => {
		if (!enabled || count <= 1) {
			return;
		}
		const id = setInterval(() => {
			setIndex((current) => (current + 1) % count);
		}, intervalMs);
		return () => clearInterval(id);
	}, [count, intervalMs, enabled]);

	return index;
}
