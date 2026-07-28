import { Link } from "@tanstack/react-router";
import Divider from "../divider";
import LogoApp from "../logo";
import { cn } from "@src/lib/utils";

export default function Footer() {
  return (
    <footer className="bg-background">
      <section className="py-24 max-lg:px-3">
        <article className="container mx-auto grid grid-cols-2 max-lg:grid-cols-1 max-lg:gap-y-7">
          <div className="space-y-5 max-lg:space-y-3">
            <h1 className="uppercase text-headline-56 leading-15 tracking-wide max-lg:leading-8">
              És mixeiro?{" "}
              <span className="text-primary">
                O teu próximo cliente está aqui.
              </span>
            </h1>
            <p className="text-body-16 text-[#B8B0A2]">
              Cadastra-te com o teu BI e começa a receber bisnos da tua zona
              directamente no WhatsApp. Grátis.
            </p>
          </div>

          <div className="flex items-center justify-end max-lg:justify-start">
            <Link
              to="/mixeiro"
              className="uppercase text-headline-20 font-medium font-heading text-background bg-primary py-4 px-7 tracking-wide"
            >
              Cadastrar agora
            </Link>
          </div>
        </article>
      </section>

      <Divider className="text-[#2E2820]" />

      <section
        className={cn(
          "max-w-[94%] py-2 max-lg:px-3 mx-auto",
          "flex justify-between items-center",
        )}
      >
        <LogoApp className="text-xl" />

        <p className="text-body-14 text-gray-300">
          Feito em Angola, para Angola.
        </p>
      </section>
    </footer>
  );
}
