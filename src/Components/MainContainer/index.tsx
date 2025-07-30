import clsx from "clsx";

type MainContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export function MainContainer({ children, className }: MainContainerProps) {
  return (
    <div
      className={clsx(
        "min-h-screen bg-gradient-to-b from-slate-950 to-slate-800 text-white",
        className
      )}
    >
      {children}
    </div>
  );
}
