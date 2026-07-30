import { Link, type NotFoundRouteProps } from "@tanstack/react-router";
import Navbar, { NavbarHeightElement } from "../navbar";
import { cn } from "@src/lib/utils";
import { Icon } from "@iconify/react";
import FloatingWhatsappButton from "../floating-whatsapp-button";

export default function NotFound(props: NotFoundRouteProps) {
  console.error(props);

  return (
    <>
      <Navbar />

      <main className="">
        <header>
          <NavbarHeightElement />
        </header>

        <section className="bg-foreground">
          <article className="min-h-[calc(100vh-var(--header-height))] flex flex-col items-center justify-center gap-4 p-8">
            <h1
              className={cn(
                "font-heading text-[clamp(90px,20vw,180px)] leading-[.95]",
                "text-primary! text-stroke",
              )}
            >
              404
            </h1>
            <h2 className="text-headline-40 text-background uppercase">
              Esse bisno não existe
            </h2>
            <p className="text-gray-500 max-w-lg text-center">
              A página que procuras não foi encontrada. Talvez tenha mudado de
              sítio, como tudo no mercado.
            </p>
            {/* Optional: link back home */}
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 uppercase text-headline-20 font-medium font-heading bg-background text-foreground py-4 px-7"
            >
              <Icon icon={"mdi:arrow-left"} fontSize={"1.35rem"} />
              Voltar ao início
            </Link>
          </article>
        </section>
      </main>

      <FloatingWhatsappButton />
    </>
  );
}
