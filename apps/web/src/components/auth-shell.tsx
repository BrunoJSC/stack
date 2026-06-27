"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@stack/ui/components/card";
import { Boxes } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import Loader from "@/components/loader";
import SignInForm from "@/components/sign-in-form";
import SignUpForm from "@/components/sign-up-form";
import { authClient } from "@/lib/auth-client";

interface AuthShellProps {
	mode: "sign-in" | "sign-up";
}

export default function AuthShell({ mode }: AuthShellProps) {
	const router = useRouter();
	const { data: session, isPending } = authClient.useSession();
	const isSignIn = mode === "sign-in";

	useEffect(() => {
		if (session) {
			router.replace("/dashboard");
		}
	}, [session, router]);

	return (
		<div className="relative isolate flex min-h-full items-center justify-center overflow-hidden px-4 py-16 sm:py-24">
			{/* fine grid, faded toward the edges */}
			<div
				aria-hidden="true"
				className="mask-[radial-gradient(ellipse_55%_50%_at_50%_30%,black,transparent)] pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,color-mix(in_oklab,var(--color-foreground)_4%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklab,var(--color-foreground)_4%,transparent)_1px,transparent_1px)] bg-size-[56px_56px]"
			/>
			{/* soft ambient glow */}
			<div
				aria-hidden="true"
				className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-96 w-176 max-w-none -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--color-foreground)_8%,transparent),transparent)] blur-3xl"
			/>

			<motion.div
				animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
				className="flex w-full max-w-sm flex-col gap-8"
				initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
				transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
			>
				<Link
					className="flex items-center justify-center gap-2 font-semibold text-sm tracking-tight"
					href="/"
				>
					<Boxes className="size-5 text-primary" />
					<span>stack</span>
				</Link>

				<Card className="border-border/60 bg-card/80 shadow-black/5 shadow-xl backdrop-blur-sm">
					<CardHeader className="text-center">
						<CardTitle className="text-xl tracking-tight">
							{isSignIn ? "Bem-vindo de volta" : "Crie sua conta"}
						</CardTitle>
						<CardDescription>
							{isSignIn
								? "Entre para acessar sua conta"
								: "Comece a contratar ou oferecer seus serviços"}
						</CardDescription>
					</CardHeader>
					<CardContent>
						{isPending ? (
							<Loader />
						) : (
							<>
								{isSignIn ? <SignInForm /> : <SignUpForm />}

								{isSignIn ? (
									<div className="mt-4 text-center">
										<Link
											className="text-muted-foreground text-xs transition-colors hover:text-foreground"
											href="#recuperar-senha"
										>
											Esqueceu a senha?
										</Link>
									</div>
								) : (
									<p className="mt-4 text-pretty text-center text-muted-foreground text-xs leading-relaxed">
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

								<p className="mt-6 border-border/60 border-t pt-6 text-center text-muted-foreground text-sm">
									{isSignIn ? "Não tem uma conta?" : "Já tem uma conta?"}{" "}
									<Link
										className="font-medium text-foreground underline-offset-4 hover:underline"
										href={isSignIn ? "/register" : "/login"}
									>
										{isSignIn ? "Criar conta" : "Entrar"}
									</Link>
								</p>
							</>
						)}
					</CardContent>
				</Card>
			</motion.div>
		</div>
	);
}
