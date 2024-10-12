export default function Dropdown({ options, value, onChange, className, ...props }) {
    return (
        <select
            value={value}
            onChange={onChange}
            className={`px-3 py-2 border rounded ${className}`}
            {...props}
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}