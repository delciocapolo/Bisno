import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { env } from "@src/env";
import FadeTicker from "@src/components/fade-ticket";
import FloatingWhatsappButton from "@src/components/floating-whatsapp-button";
import MarqueeBanner from "@src/components/marquee-banner";
import { NavbarHeightElement } from "@src/components/navbar";
import { cn, defaultValue } from "@src/lib/utils";
import { createFileRoute, Link } from "@tanstack/react-router";
import Navbar from "@src/components/navbar";
import Footer from "@src/components/footer";
import { useQuery } from "@tanstack/react-query";
import { categoryService } from "@src/services/category/index.service";

export const Route = createFileRoute("/")({ component: Home });
const STEPS = [
  {
    title: "Diz o que precisas",
    description:
      "Escolhe o serviço, a tua zona e descreve o pedido. Leva menos de um minuto.",
  },
  {
    title: "A Bisno distribui",
    description:
      "O teu pedido vai directo ao mixeiro certo da tua zona. Sem intermediários a cobrar.",
  },
  {
    title: "Ele fala contigo",
    description:
      "O mixeiro recebe o bisno e contacta-te no WhatsApp. Combinam tudo entre vocês.",
  },
];

function Home() {
  const [totaBisnosToday, setTotaBisnosToday] = useState<number>(0);
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await categoryService.list({ pageSize: 12 });
      return data;
    },
  });

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
      <Navbar />

      <main className="">
        <NavbarHeightElement />

        <header
          className={cn(
            "h-[calc(100vh-80px)] flex items-center max-lg:px-3",
            "bg-primary border-b-2 border-b-[#C1121F]",
          )}
        >
          <div className="container mx-auto space-y-7">
            <FadeTicker />

            <div className="font-heading uppercase text-background">
              <h1 className="text-[clamp(2.65rem,5.75vw,8rem)] leading-25 max-lg:leading-12 ">
                Precisas de algo?
              </h1>
              <h1 className="flex gap-5 text-[clamp(2.45rem,5vw,7rem)] leading-25 max-lg:leading-12 max-lg:gap-3">
                <div className="bg-background px-3 max-lg:px-2">
                  <span className="text-primary">ha mixeiro</span>
                </div>
                na tua
              </h1>
              <h1 className="text-[clamp(2.65rem,5vw,7rem)] leading-23 max-lg:leading-12">
                Zona.
              </h1>
            </div>

            <div className="max-w-2/5 max-lg:max-w-full">
              <p className="font-sans text-headline-20 font-normal text-gray-900 max-lg:text-headline-32 max-lg:font-medium max-lg:font-sans">
                Diz o que precisas, a Bisno passa o teu pedido ao mixeiro certo
                e ele liga-te no WhatsApp. Sem contas, sem complicações.
              </p>
            </div>

            <div className="flex items-center justify-start gap-3 max-lg:flex-col max-lg:items-start">
              <Link
                to="/bisno"
                className="inline-flex items-center justify-center gap-2 uppercase text-headline-20 font-medium font-heading bg-background text-foreground py-4 px-7"
              >
                Preciso de algo
                <Icon icon={"mdi:arrow-right"} fontSize={"1.35rem"} />
              </Link>
              <Link
                to="/mixeiro"
                className="uppercase text-headline-20 font-medium font-heading border-3 border-background text-background bg-transparent py-4 px-7"
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

        <section className="py-24 max-lg:px-3 bg-foreground">
          <article className="container mx-auto space-y-7">
            <div className="text-background space-y-2">
              <h1 className="uppercase">
                O que há no {defaultValue(env.VITE_APP_NAME)}
              </h1>
              <p className="text-body-18 text-gray-500 font-normal">
                Escolhe o serviço e manda já o pedido.
              </p>
            </div>

            <ul className="grid grid-cols-6 gap-5 max-lg:grid-cols-2">
              {categories?.map((category, index) => (
                <li key={index} className="inline-flex">
                  <Link
                    to="/"
                    className={cn(
                      "shadow-border-style",
                      "inline-flex items-start justify-center flex-col gap-3 px-5 py-7 w-full",
                      "hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0_#17130D] hover:no-underline",
                    )}
                  >
                    <Icon
                      icon={category.icon}
                      className="text-[#C1121F] text-2xl"
                    />
                    <span className="font-sans text-body-14 font-extrabold text-background uppercase">
                      {category.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </article>
        </section>

        <section className="py-24 max-lg:px-3 bg-(--accent-900)">
          <article className="container mx-auto space-y-10">
            <div className="text-background space-y-2">
              <h1 className="uppercase text-foreground">Como funciona</h1>
            </div>

            <ul className="grid grid-cols-3 gap-5 max-lg:grid-cols-1">
              {STEPS.map((step, index) => (
                <li
                  key={index}
                  className={cn(
                    "inline-flex items-start justify-center flex-col gap-2 px-7 py-7 w-full",
                    "shadow-border-style bg-foreground",
                  )}
                >
                  <h1 className="text-(--accent-900) text-6xl leading-snug">
                    {index + 1}
                  </h1>
                  <h2 className="font-heading uppercase text-background text-headline-20 max-lg:text-headline-40">
                    {step.title}
                  </h2>
                  <p className="text-gray-800 text-body-16 max-lg:text-body-18">
                    {step.description}
                  </p>
                </li>
              ))}
            </ul>
          </article>
        </section>
      </main>

      <Footer />

      <FloatingWhatsappButton />
    </>
  );
}
