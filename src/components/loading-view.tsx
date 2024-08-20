import { Skeleton, Theme } from "@radix-ui/themes";
import React from "react";

const LoadingView = () => {
  return (
    <div><Theme className="!min-h-full">
    <div className="rounded-[20px] space-y-3 bg-white p-4">
      <div className="w-full flex justify-between">
        <Skeleton width="208px" height="28px" />

        <Skeleton width="28px" height="28px" />
      </div>
      <div className="border-t border-stroke pt-3 w-full flex justify-between items-center">
        <Skeleton width="208px" height="28px" />
        <div className="flex items-center gap-3">
          <Skeleton width="18px" height="18px" />
          <Skeleton width="18px" height="18px" />
        </div>
      </div>
    </div>
  </Theme></div>
  );
};

export default LoadingView;
