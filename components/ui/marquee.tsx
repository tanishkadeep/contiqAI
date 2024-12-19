export const Marquee: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="max-w-screen-2xl mx-auto overflow-hidden my-10 z-10 [mask-image:linear-gradient(to_right,transparent,black,transparent)]">
      <div className="relative flex max-w-[90vw] overflow-hidden py-5 mx-auto">
        <div className="flex w-max animate-marquee [--duration:30s]">
          {children}
          {children}
          {children}
          {children}
          {children}
          {children}
          {children}
        </div>
      </div>
    </div>
  );
};
