import { STEPS } from "./constants";
import StepTab from "./utils";
import StepWhat from "./steps/what";
import { useSelector } from "@tanstack/react-store";
import { store } from "./store";
import { Activity } from "react";
import StepDescription from "./steps/description";
import StepContact from "./steps/contact";
import DoneStep from "./steps/done";

export default function CreateBisnoComponent() {
  const { step } = useSelector(store, (state) => state);

  return (
    <div className="w-full space-y-5">
      <Activity mode={step !== 4 ? "visible" : "hidden"}>
        <div className="grid grid-cols-3 gap-3">
          {STEPS.map((s) => (
            <StepTab
              key={s.index}
              index={s.index}
              label={s.label}
              currentStep={step}
            />
          ))}
        </div>

        <Activity mode={step === 1 ? "visible" : "hidden"}>
          <StepWhat />
        </Activity>

        <Activity mode={step === 2 ? "visible" : "hidden"}>
          <StepDescription />
        </Activity>

        <Activity mode={step === 3 ? "visible" : "hidden"}>
          <StepContact />
        </Activity>
      </Activity>

      <Activity mode={step === 4 ? "visible" : "hidden"}>
        <DoneStep />
      </Activity>
    </div>
  );
}
