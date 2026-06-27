import { Input } from "@stack/ui/components/input";
import { Label } from "@stack/ui/components/label";
import type { AnyFieldApi } from "@tanstack/react-form";

export default function AuthField({
	field,
	label,
	type = "text",
	placeholder,
	autoComplete,
}: {
	field: AnyFieldApi;
	label: string;
	type?: "text" | "email" | "password";
	placeholder?: string;
	autoComplete?: string;
}) {
	const errors = field.state.meta.errors;
	const hasError = field.state.meta.isTouched && errors.length > 0;

	return (
		<div className="grid gap-2">
			<Label htmlFor={field.name}>{label}</Label>
			<Input
				aria-invalid={hasError}
				autoComplete={autoComplete}
				id={field.name}
				name={field.name}
				onBlur={field.handleBlur}
				onChange={(e) => field.handleChange(e.target.value)}
				placeholder={placeholder}
				type={type}
				value={field.state.value}
			/>
			{hasError &&
				errors.map((error) => (
					<p className="text-destructive text-xs" key={error?.message}>
						{error?.message}
					</p>
				))}
		</div>
	);
}
