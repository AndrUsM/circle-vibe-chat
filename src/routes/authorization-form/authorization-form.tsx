import React from "react";

import { AuthorizationForm as Form } from "../../features/users/components/authorization-form/authorization-form";

import './authorization-form.scss';

export const AuthorizationForm: React.FC = () => {
	return (<div className="centered-form h-full">
		<div className="bg-light rounded-1 p-3 min-w-80">
			<Form/>
		</div>
	</div>);
};
