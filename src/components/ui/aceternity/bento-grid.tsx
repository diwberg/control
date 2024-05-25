import { cn, formatCurrency, formatPercent } from "@/lib/utils";
import { CountUp } from "../count-up";
import { Spotlight } from "./spotlight";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[12rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  value,
  dateRange,
  percent,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  value?: number
  dateRange?: string
  percent?: number
}) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-3xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-2",
        className,
        "bg-[conic-gradient(at_top,_var(--tw-gradient-stops))]  via-gray-100 to-gray-700/50 dark:to-gray-900/80",
        value! >= 0 ? "from-emerald-900/70 dark:from-emerald-900/80 via-gray-100" : "from-rose-900/70 dark:from-rose-900/80"
      )}
    >
      {header}
      <div className=" group-hover/bento:translate-x-2 transition duration-200 flex items-center">
        <div className="size-6 mr-3 h-full min-w-8 lg:min-w-11 flex items-center justify-center">
          {icon}
        </div>
        <div>
          <div className="font-sans text-lg font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
            {title}
          </div>
          <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300">
            {description}
            {percent && (
              <p className={cn("text-muted-foreground text-sm line-clamp-1", percent < 0 ? "text-rose-500" : "text-emerald-500" )}>
              <CountUp
              preserveValue
              start={0}
              end={percent}
              decimal="2"
              decimalPlaces={2}
              formattingFn={formatPercent}
              />{" "} desde o último intervalo
              </p>
            )}
          </div>
        </div>
      </div>
      {value && (
        <>
          <h1 className="group-hover/bento:translate-x-2 transition duration-200 text-2xl md:text-3xl lg:text-4xl flex flex-col items-center justify-center font-black">
            <CountUp
              preserveValue
              start={0}
              end={value}
              decimal="2"
              decimalPlaces={2}
              formattingFn={formatCurrency}
            />
          <span className="font-light group-hover/bento:translate-x-2 transition duration-200 text-muted-foreground text-xs text-center">{dateRange}</span>
          </h1>
        </>
      )}
    </div>
  );
};
