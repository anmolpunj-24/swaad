import { BottleWine, Droplets, PillBottle } from "lucide-react";
import { useEffect, useState } from "react";

const loaderItems = [
  { icon: PillBottle },
  { icon: Droplets },
  { icon: BottleWine },
];

export default function GlobalLoader() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % loaderItems.length);
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  const Icon = loaderItems[index].icon;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#2A2622]/45 backdrop-blur-[2px]">
      <div className="flex flex-col items-center">
        <div key={index} className="animate-loader-switch text-[#765A38]">
          <Icon size={45} strokeWidth={1.5} />
        </div>
      </div>

      <style jsx>{`
        @keyframes loader-switch {
          0% {
            opacity: 0;
            transform: scale(0.75) translateY(6px);
          }

          20% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }

          75% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }

          100% {
            opacity: 0;
            transform: scale(0.85) translateY(-6px);
          }
        }

        :global(.animate-loader-switch) {
          animation: loader-switch 1.2s ease-in-out both;
        }
      `}</style>
    </div>
  );
}
