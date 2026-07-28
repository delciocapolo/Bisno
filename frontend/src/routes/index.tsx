import { Icon } from "@iconify/react";
import FadeTicker from "@src/components/fade-ticket";
import FloatingWhatsappButton from "@src/components/floating-whatsapp-button";
import MarqueeBanner from "@src/components/marquee-banner";
import { NavbarHeightElement } from "@src/components/navbar";
import { cn } from "@src/lib/utils";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const [totaBisnosToday, setTotaBisnosToday] = useState<number>(0);

  useEffect(() => {
    function getRandomInt(min: number, max: number) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    setInterval(() => {
      setTotaBisnosToday(getRandomInt(1, 500));
    }, 5000);
  }, []);

  return (
    <>
      <main className="">
        <NavbarHeightElement />

        <header className="bg-primary h-[calc(100vh-80px)] flex items-center border-b-2 border-b-[#C1121F]">
          <div className="container mx-auto space-y-7">
            <FadeTicker />

            <div className="font-heading uppercase text-[clamp(0.95rem,6vw,7rem)] leading-none text-background">
              {/* eslint-disable-next-line */}
              {/* prettier-ignore */}
              <h1 className="text-[clamp(0.95rem,6.75vw,8rem)]">
                P<span className="relative inline-block before:absolute before:bottom-1 before:right-0 before:-rotate-20 before:px-3 before:py-2 before:bg-primary before:block">r</span>ecias de algo?
              </h1>
              <h1 className="flex gap-8">
                <div className="bg-background w-fit px-3">
                  <span className="text-primary">ha mixeiro</span>
                </div>
                na tua
              </h1>
              <h1 className="">Zona.</h1>
            </div>

            <div className="max-w-2/5">
              <p className="font-sans text-xl text-gray-900">
                Diz o que precisas, o Bisno passa o teu pedido ao mixeiro certo
                e ele liga-te no WhatsApp. Sem contas, sem complicações.
              </p>
            </div>

            <div className="flex items-center justify-start gap-3">
              <Link
                to="/bisno"
                className="inline-flex items-center justify-center gap-2 uppercase text-headline-20 font-medium font-heading bg-background text-foreground py-4 px-7"
              >
                Preciso de algo
                <Icon icon={"mdi:arrow-right"} fontSize={"1.35rem"} />
              </Link>
              <Link
                to="/mixeiro"
                className="inline-flex items-center justify-center gap-2 uppercase text-headline-20 font-medium font-heading border-3 border-background text-background bg-transparent py-4 px-7"
              >
                Quero receber novos bisnos
              </Link>
            </div>

            <div className="">
              <p className="flex items-center gap-2 text-body-16 font-semibold text-background">
                <b className="text-[#C1121F] text-headline-24">
                  {totaBisnosToday}
                </b>{" "}
                bisnos activos hoje em Luanda
              </p>
            </div>
          </div>
        </header>

        <section className="">
          <MarqueeBanner />
        </section>

        <section className="py-24 bg-foreground">
          <article className="container mx-auto">
            <div className="text-background space-y-2">
              <h1 className="uppercase">O que há no Bisno</h1>
              <p className="text-body-18 text-gray-500 font-normal">
                Escolhe o serviço e manda já o pedido.
              </p>
            </div>

            <ul className="grid grid-cols-6 gap-3 bg-red-500 w-full">
              {Array.from({ length: 10 }).map((_, index) => (
                <li key={index} className="inline-flex">
                  <Link
                    to="/"
                    className={cn(
                      "flex items-center gap-2 bg-[#25D366] text-foreground py-3.5 px-4.5",
                      "shadow-border-style text-background text-body-16 font-semibold",
                      "hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0_#17130D] hover:text-[#FFFDF6] hover:no-underline",
                    )}
                  >
                    <Icon
                      icon={"fa6-solid:screwdriver-wrench"}
                      className="text-[#C1121F]"
                    />
                    Canalizador
                  </Link>
                </li>
              ))}
            </ul>
          </article>
        </section>
      </main>

      <FloatingWhatsappButton />
    </>
  );
}
