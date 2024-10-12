export default function Input({ type, value, onChange, placeholder, className, ...props }) {
    return (
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`px-3 py-2 border rounded ${className}`}
            {...props}
        />
    );
}