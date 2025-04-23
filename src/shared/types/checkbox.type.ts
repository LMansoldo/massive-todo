export interface ICheckboxProps {
	id?: string;
	name?: string;
	checked: boolean;
	onChange: (checked: boolean) => void;
	label?: string;
	className?: string;
	disabled?: boolean;
}