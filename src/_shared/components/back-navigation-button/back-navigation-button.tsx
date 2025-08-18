import React from "react";
import {
	Button,
	Icon,
	noop,
	useIcons,
	IconLayout,
} from "@circle-vibe/components";

interface BackNavigationButtonProps {
	onClick?: VoidFunction;
}

export const BackNavigationButton: React.FC<BackNavigationButtonProps> = ({
	onClick = noop,
}) => {
	const { cilArrowThickLeft } = useIcons();
	
	return (<Button size="medium" color="primary" onClick={onClick}>
		<IconLayout space="0.5rem">
			<Icon color="var(--cv-light)" size={12} name={cilArrowThickLeft}/>
			
			<span>Back</span>
		</IconLayout>
	</Button>);
};
