import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    link: string;
    status: string;
    date: string;
    button:string;
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  py-10",
        className
      )}
    >
      {items.map((item, idx) => (
        <Link
          href={item?.link}
          key={item?.link}
          className="relative group  block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block  rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
            <CardButton>{item.button}</CardButton>
            <CardStatus>{item.status}</CardStatus>
            <CardDate>{item.date}</CardDate>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-neutral-100 border border-transparent dark:border-white/[0.2]  relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-black font-bold tracking-wide mt-4", className)}>
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-8 text-black tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};
export const CardStatus = ({
  className,
  status,
}: {
  className?: string;
  status: "Active" | "Pending" | "Completed"; // Example statuses
}) => {
  const statusColors = {
    Active: "text-green-400",
    Pending: "text-yellow-400",
    Completed: "text-blue-400",
  };

  return (
    <span className={cn(`mt-2 text-sm font-medium`, statusColors[status], className)}>
      {status}
    </span>
  );
};
export const CardDate = ({
  className,
  date,
}: {
  className?: string;
  date: string;
}) => {
  return (
    <span className={cn("mt-2 text-xs text-zinc-500", className)}>
      {date}
    </span>
  );
};
export const CardButton = ({
  className,
  onClick,
  children,
}: {
  className?: string;
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-all",
        className
      )}
    >
      {children}
    </button>
  );
};
