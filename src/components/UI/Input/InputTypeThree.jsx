import "./InputTypeThree.css";
export const InputTypeThree = (props) => {
	const {
		wrapperClassName,
		htmlFor,
		labelClassName,
		labelText,
		type,
		className,
		placeholder,
		name,
		value,
		iconClassName,
		onChange,
		toggleVisibility,
	} = props;
	return (
		<div className={wrapperClassName}>
			<label htmlFor={htmlFor} className={labelClassName}>
				{labelText}
			</label>
			<input
				type={type}
				className={className}
				placeholder={placeholder}
				name={name}
				onChange={onChange}
				value={value}
				required
			/>
			<i className={iconClassName} onClick={toggleVisibility} />
		</div>
	);
};
