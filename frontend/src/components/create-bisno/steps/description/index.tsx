import { cn } from "@src/lib/utils";
import { Activity, useState } from "react";
import { changeStep, store, updateStepDescriptionState } from "../../store";
import { useSelector } from "@tanstack/react-store";
import { Icon } from "@iconify/react";

export default function StepDescription() {
  const [contentLength, setContentLength] = useState<0>(0);
  const state = useSelector(store, (state) => {
    const { step, ...rest } = state;
    return rest;
  });

  return (
    <div className="w-full space-y-3">
      <h1 className="text-headline-48 text-background uppercase">
        Conta o teu bisno
      </h1>

      <p className="flex items-center justify-start text-body-14 text-gray-400 font-medium">
        Quanto mais claro, mais rápido o mixeiro responde.
      </p>

      <div className="space-y-1">
        <textarea
          rows={6}
          maxLength={300}
          id="bisno-description"
          name="bisno-description"
          value={state.stepDescription?.description || ""}
          placeholder="Ex: Torneira da cozinha a pingar, preciso de reparação urgente"
          className={cn(
            "w-full border-3 border-[#17130d] p-3 text-background",
            "focus-within:outline-3 focus-within:outline-primary outline-offset",
          )}
          onChange={(event) => {
            setContentLength(event.target.textLength);
            updateStepDescriptionState({ description: event.target.value });
          }}
        />

        <label
          htmlFor="bisno-description"
          className="flex justify-between items-center"
        >
          <span className="text-gray-400 text-body-14 font-semibold">
            {`${contentLength || 0}/300`}
          </span>

          <p
            className={cn(
              "flex items-center justify-start text-body-14 font-semibold",
              state.stepDescription?.description &&
                state.stepDescription?.description.length >= 10
                ? "text-(--success-700)!"
                : "text-gray-400!",
            )}
          >
            <Activity
              mode={
                state.stepDescription?.description &&
                state.stepDescription?.description.length >= 10
                  ? "hidden"
                  : "visible"
              }
            >
              Escreve pelo menos 10 caracteres
            </Activity>

            <Activity
              mode={
                state.stepDescription?.description &&
                state.stepDescription?.description.length >= 10
                  ? "visible"
                  : "hidden"
              }
            >
              <Icon icon={"material-symbols:done"} className="text-lg" />
              {"Pedido claro"}
            </Activity>
          </p>
        </label>
      </div>

      <div className="flex items-center gap-2">
        <button
          disabled={!(state.stepWhat?.serviceId && state.stepWhat?.zoneId)}
          onClick={() => changeStep(1)}
          className={cn(
            "w-fit inline-flex items-center justify-center gap-2 uppercase text-headline-20 font-medium font-heading border-3 border-background text-background py-3 px-5 h-13.5",
            "disabled:bg-gray-300 disabled:text-gray-500",
          )}
        >
          <Icon icon={"mdi:arrow-left"} fontSize={"1.25rem"} />
          Voltar
        </button>
        <button
          disabled={
            !Boolean(
              state.stepDescription?.description &&
              state.stepDescription?.description?.length >= 10,
            )
          }
          onClick={() => changeStep(3)}
          className={cn(
            "w-fit inline-flex items-center justify-center gap-2 uppercase text-headline-20 font-medium font-heading bg-background text-foreground py-3 px-5 h-13.5",
            "disabled:bg-gray-300 disabled:text-gray-500",
          )}
        >
          Continuar
          <Icon icon={"mdi:arrow-right"} fontSize={"1.25rem"} />
        </button>
      </div>
    </div>
  );
}
