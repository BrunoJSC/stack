import { Button } from "@stack/ui/components/button";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import z from "zod";

import { authClient } from "@/lib/auth-client";

import AuthField from "./auth-field";

const signInSchema = z.object({
	email: z.email("Endereço de e-mail inválido"),
	password: z.string().min(8, "A senha deve ter ao menos 8 caracteres"),
});

export default function SignInForm() {
	const router = useRouter();

	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		onSubmit: async ({ value }) => {
			await authClient.signIn.email(
				{
					email: value.email,
					password: value.password,
				},
				{
					onSuccess: () => {
						router.push("/dashboard");
						toast.success("Login realizado com sucesso");
					},
					onError: (error) => {
						toast.error(error.error.message || error.error.statusText);
					},
				}
			);
		},
		validators: {
			onSubmit: signInSchema,
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
						autoComplete="current-password"
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
						{isSubmitting ? "Entrando..." : "Entrar"}
					</Button>
				)}
			</form.Subscribe>
		</form>
	);
}
