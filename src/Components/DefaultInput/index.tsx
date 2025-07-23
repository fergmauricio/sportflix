import clsx from "clsx";

type DefaultInputProps = {
  id: string;
  label?: string;
  labelText?: string;
} & React.ComponentProps<"input">;

export function DefaultInput({
  id,
  type,
  labelText,
  label,
  ...rest
}: DefaultInputProps) {
  return (
    <>
      {labelText && (
        <label htmlFor={id} className={clsx("font-bold text-2xl")}>
          {labelText}
        </label>
      )}
      <input
        {...rest}
        className={clsx(
          "bg-transparent text-3xl text-center",
          "p-3 text-gray-900 dark:text-white outline-none",
          "border-2 border-b-2 border-blue-500/50",
          "transition-all duration-300 ease-in-out",
          "focus:border-2 focus:border-blue-500/50 rounded-xl",
          "placeholder:text-gray-500 placeholder:text-2xl font-bold placeholder:italic"
        )}
        placeholder={label}
        type={type}
        id={id}
      />
    </>
  );
}
