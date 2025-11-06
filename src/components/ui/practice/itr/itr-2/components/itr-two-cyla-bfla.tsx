import React, { useState } from "react";
import ItrTwoCyla from "./itr-two-cyla.tsx";
import ItrTwoBfla from "./Itr-two-bfla.tsx";

interface ItrTwoCylaBflaProps {
  onSubmit: (data: any) => void;
  onBack: () => void;
  initialData?: {
    cyla?: any;
    bfla?: any;
  };
}

const ItrTwoCylaBfla: React.FC<ItrTwoCylaBflaProps> = ({
  onSubmit,
  onBack,
  initialData,
}) => {
  const [currentStep, setCurrentStep] = useState<"cyla" | "bfla">("cyla");
  const [cylaData, setCylaData] = useState(initialData?.cyla);
  const [bflaData, setBflaData] = useState(initialData?.bfla);

  const handleCylaSubmit = (data: any) => {
    setCylaData(data);
    setCurrentStep("bfla");
  };

  const handleBflaSubmit = (data: any) => {
    setBflaData(data);
    onSubmit({
      cyla: cylaData,
      bfla: data,
    });
  };

  const handleBflaBack = () => {
    setCurrentStep("cyla");
  };

  return (
    <>
      {currentStep === "cyla" && (
        <ItrTwoCyla
          onSubmit={handleCylaSubmit}
          onBack={onBack}
          initialData={cylaData}
        />
      )}

      {currentStep === "bfla" && (
        <ItrTwoBfla
          onSubmit={handleBflaSubmit}
          onBack={handleBflaBack}
          initialData={bflaData}
        />
      )}
    </>
  );
};

export default ItrTwoCylaBfla;
