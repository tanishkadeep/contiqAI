import { PiSpinnerLight } from "react-icons/pi";

const loading = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <PiSpinnerLight className="animate-spin size-8 text-black dark:text-white" />
    </div>
  );
};

export default loading;
