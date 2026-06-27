import { Boxes, Github, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

const LINK_GROUPS = [
	{
		title: "Plataforma",
		links: [
			{ label: "Encontrar talentos", href: "#talentos" },
			{ label: "Como funciona", href: "#como-funciona" },
			{ label: "Preços", href: "#precos" },
		],
	},
	{
		title: "Freelancers",
		links: [
			{ label: "Criar perfil", href: "#cadastro" },
			{ label: "Oportunidades", href: "#oportunidades" },
		],
	},
	{
		title: "Empresa",
		links: [
			{ label: "Sobre", href: "#sobre" },
			{ label: "Contato", href: "#contato" },
		],
	},
] as const;

const SOCIAL_LINKS = [
	{ label: "Instagram", href: "https://instagram.com", icon: Instagram },
	{ label: "GitHub", href: "https://github.com", icon: Github },
	{ label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
] as const;

const LEGAL_LINKS = [
	{ label: "Privacidade", href: "#privacidade" },
	{ label: "Termos", href: "#termos" },
] as const;

export default function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className="border-white/8 border-t bg-[#060607]">
			<div className="mx-auto max-w-5xl px-4 py-16">
				<div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_repeat(3,1fr)]">
					<div className="flex flex-col gap-4">
						<Link
							className="flex items-center gap-2 font-semibold text-sm text-white tracking-tight"
							href="/"
						>
							<Boxes className="size-5 text-white" />
							<span>stack</span>
						</Link>
						<p className="max-w-xs text-pretty text-sm text-white/40 leading-relaxed">
							O marketplace para contratar freelancers de tecnologia, design e
							música. Encontre o talento certo e dê vida ao seu projeto.
						</p>
						<div className="mt-1 flex items-center gap-1">
							{SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
								<a
									aria-label={label}
									className="inline-flex size-9 items-center justify-center rounded-lg text-white/40 transition-colors hover:bg-white/5 hover:text-white"
									href={href}
									key={label}
									rel="noopener noreferrer"
									target="_blank"
								>
									<Icon className="size-4" />
								</a>
							))}
						</div>
					</div>

					{LINK_GROUPS.map((group) => (
						<nav aria-label={group.title} key={group.title}>
							<h2 className="font-medium text-sm text-white/90">
								{group.title}
							</h2>
							<ul className="mt-4 flex flex-col gap-3">
								{group.links.map((link) => (
									<li key={link.label}>
										<Link
											className="text-sm text-white/40 transition-colors hover:text-white"
											href={link.href}
										>
											{link.label}
										</Link>
									</li>
								))}
							</ul>
						</nav>
					))}
				</div>

				<div className="mt-12 flex flex-col items-center justify-between gap-4 border-white/8 border-t pt-6 sm:flex-row">
					<p className="text-white/30 text-xs">
						© {year} stack. Todos os direitos reservados.
					</p>
					<ul className="flex items-center gap-6">
						{LEGAL_LINKS.map((link) => (
							<li key={link.label}>
								<Link
									className="text-white/30 text-xs transition-colors hover:text-white"
									href={link.href}
								>
									{link.label}
								</Link>
							</li>
						))}
					</ul>
				</div>
			</div>
		</footer>
	);
}
