import { type MotionValue, useMotionValue, useSpring } from "motion/react";
import { type PointerEvent, useCallback } from "react";

interface PointerParallax {
	onPointerLeave: () => void;
	onPointerMove: (event: PointerEvent<HTMLElement>) => void;
	/** Spring-smoothed horizontal offset, normalized to roughly [-0.5, 0.5]. */
	x: MotionValue<number>;
	/** Spring-smoothed vertical offset, normalized to roughly [-0.5, 0.5]. */
	y: MotionValue<number>;
}

const SPRING = { stiffness: 120, damping: 22, mass: 0.4 } as const;

/**
 * Tracks the pointer position within an element and exposes spring-smoothed,
 * normalized offsets that consumers can map onto any layer with `useTransform`.
 */
export function usePointerParallax(enabled: boolean): PointerParallax {
	const rawX = useMotionValue(0);
	const rawY = useMotionValue(0);
	const x = useSpring(rawX, SPRING);
	const y = useSpring(rawY, SPRING);

	const onPointerMove = useCallback(
		(event: PointerEvent<HTMLElement>) => {
			if (!enabled) {
				return;
			}
			const rect = event.currentTarget.getBoundingClientRect();
			rawX.set((event.clientX - rect.left) / rect.width - 0.5);
			rawY.set((event.clientY - rect.top) / rect.height - 0.5);
		},
		[enabled, rawX, rawY]
	);

	const onPointerLeave = useCallback(() => {
		rawX.set(0);
		rawY.set(0);
	}, [rawX, rawY]);

	return { x, y, onPointerMove, onPointerLeave };
}
