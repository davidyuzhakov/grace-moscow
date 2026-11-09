interface FormInputProps {
  label: string
  typeInput: React.HTMLInputTypeAttribute
  placeholder: string
}

export function FormInput({ label, typeInput, placeholder }: FormInputProps) {
  return (
    <label className="flex flex-col items-start gap-1">
      <span className="font-semibold">{label}</span>
      <input
        required
        type={typeInput}
        className="border border-border-strong focus:border-accent rounded-lg py-2 px-4 w-full"
        placeholder={placeholder}
      />
    </label>
  )
}
