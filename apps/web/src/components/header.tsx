"use client";

import { Boxes } from "lucide-react";
import Link from "next/link";

import { ModeToggle } from "./mode-toggle";
import UserMenu from "./user-menu";

export default function Header() {
	return (
		<header className="pointer-events-none fixed inset-x-0 top-3 z-50 px-3">
			<nav className="pointer-events-auto mx-auto flex h-14 max-w-3xl items-center justify-between gap-3 rounded-2xl border border-border/60 bg-background/70 px-3 shadow-black/5 shadow-lg backdrop-blur-lg supports-backdrop-filter:bg-background/60">
				<Link
					className="flex items-center gap-2 px-2 py-1.5 font-semibold text-sm tracking-tight"
					href="/"
				>
					<Boxes className="size-5 text-primary" />
					<span>stack</span>
				</Link>

				<div className="flex items-center gap-2">
					<ModeToggle />
					<UserMenu />
				</div>
			</nav>
		</header>
	);
}
