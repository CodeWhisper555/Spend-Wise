function Card({
  children,
  className = "",
  padding = "p-5",
  hover = false,
}) {
  return (
    <section
      className={[
        "rounded-2xl border border-black/10 bg-white text-[#171717]",
        "dark:border-white/10 dark:bg-[#111111] dark:text-[#f5f5f5]",
        "transition-colors duration-300",
        padding,
        hover
          ? [
              "transition duration-200",
              "hover:-translate-y-0.5",
              "hover:border-[#d9a928]/40",
              "hover:bg-[#fafafa]",
              "dark:hover:border-[#d9a928]/30",
              "dark:hover:bg-[#151515]",
            ].join(" ")
          : "",
        className,
      ].join(" ")}
    >
      {children}
    </section>
  );
}

export default Card;