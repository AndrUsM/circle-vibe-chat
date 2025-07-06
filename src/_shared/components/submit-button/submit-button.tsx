import React from "react";

import { useFormikContext } from "formik";
import {
	ExtendedReactFunctionalComponent,
	SubmitButton as BaseSubmitButton,
	ButtonProps,
} from "@circle-vibe/components";

export type SubmitButtonProps = Omit<ButtonProps, 'type'>;

export const SubmitButton: ExtendedReactFunctionalComponent<SubmitButtonProps> = ({ children, ...props }) => {
	const { isSubmitting } = useFormikContext();

	return <BaseSubmitButton disabled={isSubmitting} type="submit" {...props}>{children}</BaseSubmitButton>;
}