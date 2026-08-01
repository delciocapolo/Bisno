import { Icon } from "@iconify/react";
import { useSelector } from "@tanstack/react-store";
import { useEffect } from "react";
import { resetBisnoStore, store } from "../../store";
import { useMutation } from "@tanstack/react-query";
import { categoryService } from "@src/services/category/index.service";
import { zoneService } from "@src/services/zones/index.service";
import { defaultValue } from "@src/lib/utils";
import { useNavigate } from "@tanstack/react-router";

export default function DoneStep() {
  const navigate = useNavigate();
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

  useEffect(() => {
    if (!state.stepWhat?.serviceId || !state.stepWhat?.zoneId) return;

    getZone({ zoneId: state.stepWhat?.zoneId });
    getCategory({ categoryId: state.stepWhat?.serviceId });
  }, [state.stepWhat?.serviceId, state.stepWhat?.zoneId]);

  return (
    <div className="w-full flex items-center flex-col gap-7">
      <div className="flex-center gap-1 pl-10 pr-5 py-5 border-5 border-red-700 w-fit animate-stampIn -rotate-3">
        <h1 className="text-headline-48 text-red-700 uppercase tracking-wider">
          Bisno enviado
        </h1>

        <Icon
          icon={"material-symbols:done"}
          className="text-red-700 text-6xl"
        />
      </div>

      <p className="text-body-16 font-medium text-background max-w-sm text-center">
        O teu pedido de <b>{defaultValue(category?.data?.name)}</b> já foi
        distribuído aos mixeiros de <b>{defaultValue(zone?.data?.name)}</b>.
      </p>

      <div className="max-w-sm px-5 py-3 flex-center bg-background gap-2">
        <Icon icon={"mdi:clock-fast"} className="text-primary text-xl" />
        <span className="text-body-16 font-medium">
          Resposta média: 15 minutos
        </span>
      </div>

      <button
        onClick={() => {
          resetBisnoStore();
          navigate({ to: "/bisno" });
        }}
        className="px-7 py-3 border-3 border-background hover:text-primary uppercase text-body-16 font-heading text-background"
      >
        Mandar outro bisno
      </button>
    </div>
  );
}
