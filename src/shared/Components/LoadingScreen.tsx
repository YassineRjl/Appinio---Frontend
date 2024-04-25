import Lottie from "react-lottie";
import LoadingLottie from "../Lottie/LoadingLottie";

export const LoadingScreen = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <div>
        <Lottie
          width={112}
          height={112}
          options={{
            loop: true,
            animationData: LoadingLottie,
          }}
        />
        <p className="font-semibold sm:text-xs md:text-16 px-8 text-center">
          Loading...
        </p>
      </div>
    </div>
  );
};
