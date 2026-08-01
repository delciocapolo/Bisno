import { createFileRoute, useNavigate } from "@tanstack/react-router";
import CreateBisnoComponent from "@src/components/create-bisno";
import Navbar, { NavbarHeightElement } from "@src/components/navbar";
import FloatingWhatsappButton from "@src/components/floating-whatsapp-button";
import { Icon } from "@iconify/react";
import { resetBisnoStore } from "@src/components/create-bisno/store";

export const Route = createFileRoute("/bisno/")({
  component: RouteComponent,
});

export default function RouteComponent() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <main className="">
        <header>
          <NavbarHeightElement />
        </header>

        <section className="py-10 bg-foreground space-y-3 max-lg:px-3">
          <article className="container mx-auto max-w-2xl">
            <button
              onClick={() => {
                resetBisnoStore();
                navigate({ to: "/" });
              }}
              className="inline-flex items-center justify-center gap-2 capitalize text-body-14 font-medium bg-transparent text-gray-700 pt-3 pr-5"
            >
              <Icon icon={"mdi:arrow-left"} fontSize={"1rem"} />
              Sair
            </button>
          </article>

          <article className="container mx-auto max-w-2xl">
            <CreateBisnoComponent />
          </article>
        </section>
      </main>

      <FloatingWhatsappButton />
    </>
  );
}
