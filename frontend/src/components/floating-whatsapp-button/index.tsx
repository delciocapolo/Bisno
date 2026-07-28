import { cn } from "@src/lib/utils";
import { Icon } from "@iconify/react";

export default function FloatingWhatsappButton() {
  return (
    <a
      href="https://wa.me"
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "fixed bottom-5 right-5 z-50",
        "flex items-center gap-2 bg-[#25D366] text-foreground py-3.5 px-4.5",
        "shadow-border-style text-background text-body-16 font-semibold",
        "hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0_#17130D] hover:text-[#FFFDF6] hover:no-underline",
      )}
    >
      <Icon icon={"mdi:whatsapp"} className="text-2xl" />
      Usar Whatsapp
    </a>
  );
}
