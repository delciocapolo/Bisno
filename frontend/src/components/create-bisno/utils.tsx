import { cn } from "@src/lib/utils";
import { changeStep } from "./store";

interface StepTabProps {
  index: number;
  label: string;
  currentStep: number;
}

const handleClasseState = (isActive: boolean, isDone: boolean) => {
  return isActive
    ? "shadow-border-style -rotate-1 bg-primary -translate-x-0.5"
    : isDone
      ? "bg-background"
      : "bg-transparent border-3 border-[#17130d]";
};

export default function StepTab({ index, label, currentStep }: StepTabProps) {
  const isDone = currentStep > index;
  const isActive = currentStep === index;

  const onClick = () => changeStep(index);

  return (
    <div className="relative">
      <button
        disabled={!isActive && !isDone}
        onClick={isDone ? onClick : undefined}
        className={cn(
          "group w-full px-5 py-3 space-y-1.5 text-background text-start transition-transform duration-150",
          handleClasseState(isActive, isDone),
          "disabled:border-gray-400 disabled:cursor-not-allowed",
        )}
      >
        <h1
          className={cn(
            "text-body-16 leading-none font-heading font-semibold",
            isDone ? "text-foreground!" : "text-background!",
            "group-disabled:text-gray-400!",
          )}
        >
          {String(index).padStart(2, "0")}
        </h1>
        <p
          className={cn(
            "text-body-12 uppercase font-bold leading-none",
            isDone ? "text-foreground!" : "text-background!",
            "group-disabled:text-gray-400!",
          )}
        >
          {label}
        </p>
      </button>
    </div>
  );
}
