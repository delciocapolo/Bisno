import { cn } from "@src/lib/utils";

const textMarquee = [
  "Já há alguém na tua zona",
  "Manda o teu bisno",
  "Arranja o teu bisno agora",
  "o teu próximo cliente está aqui",
];

export default function MarqueeBanner() {
  return (
    <div className="w-full bg-[#181410] border-t-2 border-[#C0392B] py-3 overflow-hidden">
      <style>{`
        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marqueeScroll 14s linear infinite;
        }
      `}</style>

      <div
        className={cn(
          "flex whitespace-nowrap w-max marquee-track gap-3",
          "text-body-14 font-black font-heading uppercase tracking-wide text-primary",
        )}
      >
        {textMarquee.map((text, index) => (
          <>
            <span key={index}>{text}</span>
            <span className="text-[#c0910f] text-body-18">✳</span>
          </>
        ))}
      </div>
    </div>
  );
}
