import React from "react";

interface Props {
  left?: React.ReactNode;
  right?: React.ReactNode;
}

const TopContent = ({ left, right }: Props) => {
  return (
    <div className="flex flex-row justify-between items-center">
      {left}
      <div />
      {right}
    </div>
  );
};

export default TopContent;
