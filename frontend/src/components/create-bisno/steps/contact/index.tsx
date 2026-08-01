import { cn, defaultValue, formatMobile } from "@src/lib/utils";
import { Activity, useEffect } from "react";
import { store, changeStep, updateStepContactState } from "../../store";
import { useSelector } from "@tanstack/react-store";
import { Icon } from "@iconify/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { categoryService } from "@src/services/category/index.service";
import { zoneService } from "@src/services/zones/index.service";
import { channelService } from "@src/services/channels/index.service";
import { bisnoService } from "@src/services/bisno/index.service";
import { toast } from "sonner";

export default function StepContact() {
  const state = useSelector(store, (state) => {
    const { step, ...rest } = state;
    return rest;
  });
  const { mutate: getCategory, data: category } = useMutation({
    mutationFn: categoryService.getCategory,
  });
  const { mutate: getZone, data: zone } = useMutation({
    mutationFn: zoneService.getZone,
  });
  const {
    mutate: createBisno,
    isPending: isCreatingBisno,
    reset: resetCreateBisno,
  } = useMutation({
    mutationFn: bisnoService.create,
    onError: (error) => {
      toast.error(error.message);
      resetCreateBisno();
    },
    onSuccess: () => {
      changeStep(4);
      resetCreateBisno();
    },
  });
  const { data: channels } = useQuery({
    queryKey: ["all-channels"],
    queryFn: async () => {
      return await channelService.list();
    },
  });

  useEffect(() => {
    if (!state.stepWhat?.serviceId || !state.stepWhat?.zoneId) return;

    getZone({ zoneId: state.stepWhat?.zoneId });
    getCategory({ categoryId: state.stepWhat?.serviceId });
  }, [state.stepWhat?.serviceId, state.stepWhat?.zoneId]);

  return (
    <div className="w-full space-y-3">
      <h1 className="text-headline-48 text-background uppercase">
        Como te contactamos?
      </h1>

      <div className="space-y-5">
        <div className="bg-primary py-3 px-5 space-y-2.5 shadow-border-style">
          <h2 className="uppercase text-body-12 font-bold text-background tracking-widest">
            O teu bisno
          </h2>
          <h1 className="uppercase text-headline-20 font-heading leading-none text-background">
            {`${defaultValue(category?.data?.name)} · ${defaultValue(zone?.data?.name)}`}
          </h1>
          <p className="max-w-xl truncate text-body-14 text-background">
            "{defaultValue(state.stepDescription?.description)}"
          </p>
        </div>

        <nav className="grid grid-cols-2 divide-x-2 divide-background border-2 border-background">
          {channels?.map((channel) => {
            const active = state.stepContact?.channel === channel.id;

            return (
              <button
                type="button"
                key={channel.id}
                onClick={() => updateStepContactState({ channel: channel.id })}
                className={cn(
                  "flex items-center justify-center gap-2 py-3 font-bold text-body-14",
                  active
                    ? "bg-background text-primary"
                    : "bg-foreground text-background",
                )}
              >
                <Icon
                  icon={channel.icon}
                  fontSize="1.25rem"
                  className={active ? "text-primary" : undefined}
                />
                {channel.name}
              </button>
            );
          })}
        </nav>

        <div className="space-y-2">
          <label
            htmlFor={"bisno-mobile"}
            className="text-body-14 font-bold uppercase text-background"
          >
            O teu número de WhatsApp
          </label>
          <div className="flex border-2 border-background">
            <span className="flex items-center bg-background px-4 text-body-16 font-black text-foreground">
              +244
            </span>
            <input
              id={"bisno-mobile"}
              name="mobile"
              type="text"
              aria-label="Numero de telefone"
              value={formatMobile(state.stepContact?.mobile || "")}
              onChange={(e) => {
                const mobileHandled = e.target.value
                  .split(" ")
                  .join("")
                  .replace(/\D/g, "");
                updateStepContactState({ mobile: mobileHandled });
              }}
              placeholder="9XX XXX XXX"
              inputMode="tel"
              maxLength={11}
              className="w-full bg-foreground px-4 py-3 text-body-16 placeholder:text-gray-400 focus:outline-none text-background"
            />
          </div>

          {(() => {
            const mobile = state.stepContact?.mobile ?? "";
            const isEmpty = mobile.length === 0;
            const isValid = mobile.length >= 9 && mobile.startsWith("9");
            const isInvalid = !isEmpty && !isValid;

            return (
              <div>
                <Activity mode={isInvalid ? "visible" : "hidden"}>
                  <p className="mt-4 mb-7 text-body-14 text-(--error-600) font-medium">
                    Número inválido! Começa com 9 e tem 9 dígitos.
                  </p>
                </Activity>

                <Activity mode={isValid ? "visible" : "hidden"}>
                  <p className="mt-4 mb-7 flex items-center justify-start text-body-14 font-semibold text-(--success-700)!">
                    <Icon icon="material-symbols:done" className="text-lg" />
                    Número válido
                  </p>
                </Activity>

                <Activity mode={isEmpty ? "visible" : "hidden"}>
                  <p className="mt-4 mb-7 text-body-14 text-gray-400! font-semibold leading-0">
                    Número angolano: começa com 9, tem 9 dígitos.
                  </p>
                </Activity>
              </div>
            );
          })()}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          disabled={!(state.stepWhat?.serviceId && state.stepWhat?.zoneId)}
          onClick={() => changeStep(2)}
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
              state.stepContact?.channel &&
              state.stepContact.mobile &&
              state.stepContact.mobile.length >= 9,
            ) || isCreatingBisno
          }
          onClick={() => {
            if (
              !state.stepContact?.mobile ||
              !state.stepDescription?.description ||
              !state.stepWhat?.serviceId ||
              !state.stepWhat?.zoneId
            ) {
              toast.error(
                "Para proceder, há um campo que deve ser preenchido!",
              );
              return;
            }

            createBisno({
              customerName: "ANONYMOU",
              customerMobile: state.stepContact?.mobile!,
              customerMobileHasWhatsapp:
                state.stepContact?.channel === "whatsapp",
              description: state.stepDescription?.description!,
              serviceId: state.stepWhat?.serviceId!,
              zoneId: state.stepWhat?.zoneId!,
            });
          }}
          className={cn(
            "w-fit inline-flex items-center justify-center gap-2 uppercase text-headline-20 font-medium font-heading bg-background text-foreground py-3 px-7 h-13.5",
            "disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed",
          )}
        >
          {isCreatingBisno ? "A enviar..." : "Mandar bisno"}
        </button>
      </div>
    </div>
  );
}
