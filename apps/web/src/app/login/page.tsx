"use client";

import { Button } from "@stack/ui/components/button";
import { Card } from "@stack/ui/components/card";
import { BadgeCheck, Boxes, ShieldCheck, Star, Zap } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";

import Loader from "@/components/loader";
import SignInForm from "@/components/sign-in-form";
import SignUpForm from "@/components/sign-up-form";
import { authClient } from "@/lib/auth-client";

const BENEFITS = [
	{
		icon: BadgeCheck,
		label: "Freelancers verificados em tecnologia, design e áudio",
	},
	{
		icon: ShieldCheck,
		label: "Pagamento protegido — você só libera quando aprovar",
	},
	{
		icon: Zap,
		label: "Publique um projeto e receba propostas em minutos",
	},
] as const;

export default function LoginPage() {
	const { isPending } = authClient.useSession();
	const [mode, setMode] = useState<"sign-in" | "sign-up">("sign-in");
	const isSignIn = mode === "sign-in";

	return (
		<div className="relative isolate flex min-h-full items-center justify-center overflow-hidden px-4 py-16 sm:py-24">
			{/* soft ambient glow behind the card */}
			<div
				aria-hidden="true"
				className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-96 w-[48rem] max-w-none -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--color-foreground)_8%,transparent),transparent)] blur-3xl"
			/>

			<motion.div
				animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
				className="w-full max-w-5xl"
				initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
				transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
			>
				<Card className="gap-0 overflow-hidden rounded-3xl p-0 py-0 shadow-2xl shadow-black/5 md:grid md:min-h-152 md:grid-cols-2">
					{/* brand panel — dark, matches the landing aesthetic */}
					<aside className="relative hidden flex-col justify-between overflow-hidden bg-[#060607] p-12 md:flex">
						<div
							aria-hidden="true"
							className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-size-[44px_44px] [mask-image:radial-gradient(ellipse_70%_60%_at_30%_15%,#000,transparent)]"
						/>
						<div
							aria-hidden="true"
							className="pointer-events-none absolute -top-24 -left-16 size-80 rounded-full bg-[radial-gradient(closest-side,rgba(150,168,220,0.18),transparent)] blur-3xl"
						/>

						<Link
							className="relative inline-flex items-center gap-2 font-semibold text-sm text-white tracking-tight"
							href="/"
						>
							<Boxes className="size-5" />
							<span>stack</span>
						</Link>

						<div className="relative space-y-8">
							<div className="space-y-3">
								<p className="font-medium text-white/40 text-xs uppercase tracking-[0.2em]">
									Marketplace de talentos
								</p>
								<h2 className="text-balance font-semibold text-3xl text-white leading-snug tracking-tight">
									Onde os melhores projetos encontram os melhores freelancers.
								</h2>
							</div>

							<ul className="space-y-3.5">
								{BENEFITS.map(({ icon: Icon, label }) => (
									<li
										className="flex items-start gap-3 text-sm text-white/70"
										key={label}
									>
										<Icon className="mt-0.5 size-4 shrink-0 text-white" />
										<span className="text-pretty leading-relaxed">{label}</span>
									</li>
								))}
							</ul>
						</div>

						<div className="relative flex items-center gap-3 border-white/10 border-t pt-6">
							<span className="flex items-center gap-1.5">
								<Star className="size-4 fill-white text-white" />
								<span className="font-semibold text-sm text-white">4,9/5</span>
							</span>
							<span className="text-white/20">·</span>
							<span className="text-sm text-white/50">
								12 mil+ profissionais ativos
							</span>
						</div>
					</aside>

					{/* form panel */}
					<div className="flex flex-col justify-center bg-card p-10 sm:p-12">
						<Link
							className="mb-8 inline-flex items-center gap-2 font-semibold text-sm tracking-tight md:hidden"
							href="/"
						>
							<Boxes className="size-5 text-primary" />
							<span>stack</span>
						</Link>

						<div className="space-y-1.5">
							<h1 className="font-semibold text-3xl tracking-tight">
								{isSignIn ? "Bem-vindo de volta" : "Crie sua conta"}
							</h1>
							<p className="text-muted-foreground text-sm">
								{isSignIn
									? "Entre para continuar de onde parou"
									: "Comece a contratar ou oferecer seus serviços"}
							</p>
						</div>

						<div className="mt-8">
							{isPending ? (
								<Loader />
							) : (
								<>
									{isSignIn ? <SignInForm /> : <SignUpForm />}

									{isSignIn ? (
										<div className="mt-4 text-right">
											<Link
												className="text-muted-foreground text-xs transition-colors hover:text-foreground"
												href="#recuperar-senha"
											>
												Esqueceu a senha?
											</Link>
										</div>
									) : (
										<p className="mt-4 text-pretty text-muted-foreground text-xs leading-relaxed">
											Ao criar uma conta, você concorda com os{" "}
											<Link
												className="underline underline-offset-2 transition-colors hover:text-foreground"
												href="#termos"
											>
												Termos
											</Link>{" "}
											e a{" "}
											<Link
												className="underline underline-offset-2 transition-colors hover:text-foreground"
												href="#privacidade"
											>
												Política de Privacidade
											</Link>
											.
										</p>
									)}

									<p className="mt-8 border-border/60 border-t pt-6 text-center text-muted-foreground text-sm">
										{isSignIn ? "Não tem uma conta?" : "Já tem uma conta?"}{" "}
										<Button
											className="h-auto p-0 text-sm"
											onClick={() => setMode(isSignIn ? "sign-up" : "sign-in")}
											type="button"
											variant="link"
										>
											{isSignIn ? "Criar conta" : "Entrar"}
										</Button>
									</p>
								</>
							)}
						</div>
					</div>
				</Card>
			</motion.div>
		</div>
	);
}
