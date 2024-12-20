const Skeleton = () => {
  return (
    <div
      className={"flex w-full h-8 items-center gap-4 max-w-sm animate-pulse"}
    >
      <div
        className={
          "w-full h-full flex flex-col items-start justify-start gap-3"
        }
      >
        <div
          className={
            "w-full dark:bg-neutral-800 bg-neutral-300 h-full rounded-lg"
          }
        />
        <div
          className={
            "w-2/3 dark:bg-neutral-800 bg-neutral-300 h-full rounded-lg"
          }
        />
      </div>
    </div>
  );
};

export default Skeleton;
