import { createFormHook } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { fieldContext, formContext, useFormContext } from "./form-context";

interface SubscribeButtonProps {
	label: string;
	loading?: boolean;
}

function SubscribeButton({ label, loading }: SubscribeButtonProps) {
	const form = useFormContext();
	return (
		<form.Subscribe selector={(state) => state.isSubmitting}>
			{() => (
				<Button type="submit" className="ml-auto" disabled={loading}>
					{loading && <Spinner />}
					{label}
				</Button>
			)}
		</form.Subscribe>
	);
}

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
	fieldComponents: {},
	formComponents: {
		SubscribeButton,
	},
	fieldContext,
	formContext,
});
