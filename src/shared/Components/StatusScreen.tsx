import classNames from "classnames";
import Lottie from "react-lottie";
import { Status } from "../../types";
import FailedLottie from "../Lottie/FailedLottie";
import LoadingLottie from "../Lottie/LoadingLottie";

export const StatusScreen = ({ status }: { status: Status }) => {
  const statusText =
    status === Status.writing
      ? "Generating your asset, this may take a few seconds."
      : "Generation Failed, please try again.";
  return (
    <div className="h-full w-full pb-10 overflow-hidden rounded-lg">
      <div className="flex flex-col justify-center items-center w-full h-full">
        <div
          className={classNames("w-28 h-28", {
            "w-10 h-10": status === Status.failed,
          })}
        >
          <Lottie
            options={{
              animationData:
                status === Status.writing ? LoadingLottie : FailedLottie,
              loop: status === Status.writing ? true : false,
            }}
          />
        </div>
        <p className="font-semibold sm:text-xs md:text-16 px-8 text-center mt-3">
          {statusText}
        </p>
      </div>
    </div>
  );
};
