import { Button } from "@stack/ui/components/button";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import z from "zod";

import { authClient } from "@/lib/auth-client";

import AuthField from "./auth-field";

const signUpSchema = z.object({
	name: z.string().min(2, "O nome deve ter ao menos 2 caracteres"),
	email: z.email("Endereço de e-mail inválido"),
	password: z.string().min(8, "A senha deve ter ao menos 8 caracteres"),
});

export default function SignUpForm() {
	const router = useRouter();

	const form = useForm({
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
		onSubmit: async ({ value }) => {
			await authClient.signUp.email(
				{
					email: value.email,
					password: value.password,
					name: value.name,
				},
				{
					onSuccess: () => {
						router.push("/dashboard");
						toast.success("Conta criada com sucesso");
					},
					onError: (error) => {
						toast.error(error.error.message || error.error.statusText);
					},
				}
			);
		},
		validators: {
			onSubmit: signUpSchema,
		},
	});

	return (
		<form
			className="grid gap-4"
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit();
			}}
		>
			<form.Field name="name">
				{(field) => (
					<AuthField
						autoComplete="name"
						field={field}
						label="Nome"
						placeholder="Seu nome"
					/>
				)}
			</form.Field>

			<form.Field name="email">
				{(field) => (
					<AuthField
						autoComplete="email"
						field={field}
						label="E-mail"
						placeholder="voce@exemplo.com"
						type="email"
					/>
				)}
			</form.Field>

			<form.Field name="password">
				{(field) => (
					<AuthField
						autoComplete="new-password"
						field={field}
						label="Senha"
						placeholder="••••••••"
						type="password"
					/>
				)}
			</form.Field>

			<form.Subscribe
				selector={(state) => ({
					canSubmit: state.canSubmit,
					isSubmitting: state.isSubmitting,
				})}
			>
				{({ canSubmit, isSubmitting }) => (
					<Button
						className="mt-2 w-full"
						disabled={!canSubmit || isSubmitting}
						type="submit"
					>
						{isSubmitting ? "Criando conta..." : "Criar conta"}
					</Button>
				)}
			</form.Subscribe>
		</form>
	);
}
