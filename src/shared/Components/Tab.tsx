import classNames from "classnames";
import React, { useMemo, useState } from "react";

interface TabGroupProps {
  children: React.ReactElement[];
  sticky?: boolean;
  className?: string;
}

export const TabGroup = ({
  children,
  sticky = false,
  className,
}: TabGroupProps) => {
  const [activeTab, setActiveTab] = useState(children[0].props.assetId);

  const tabs = useMemo(
    () =>
      React.Children.map(children, (child) =>
        React.cloneElement(child, {
          isActive: child.props.assetId === activeTab,
          onTabSwitch: () => setActiveTab(child.props.assetId),
        })
      ),
    [children, activeTab]
  );

  const activeChild = useMemo(
    () =>
      React.Children.toArray(children).find(
        (child) =>
          React.isValidElement(child) && child.props.assetId === activeTab
      ) as React.ReactElement,
    [children, activeTab]
  );
  const { component: Component, name } = activeChild?.props || {};

  return (
    <div className={className}>
      <div
        className={classNames(
          `relative flex justify-start items-center rounded-lg border border-[#D1D1DB] w-full`,
          {
            "sticky -top-[1px] bg-white z-10": sticky,
          }
        )}
      >
        <div className="flex justify-start items-center overflow-x-auto w-full">
          {tabs}
        </div>
      </div>

      <div className="mt-8 rounded-lg shadow pt-5 px-8 pb-8 space-y-8">
        <span className="text-xs font-medium">{name}</span>
        {Component ? <Component /> : null}
      </div>
    </div>
  );
};

interface TabProps {
  name: string;
  isActive?: boolean;
  onTabSwitch?: () => void;
  assetId: string;
  component: () => JSX.Element;
}

export const Tab = ({ name, isActive = false, onTabSwitch }: TabProps) => {
  return (
    <button
      className={classNames(
        "inline-block w-full hover:bg-[#F7F7F8] py-4 text-14 min-w-[160px]",
        {
          "border-b-2 text-[#7047EB] border-[#7047EB]": isActive,
          "text-[#6C6C89]": !isActive,
        }
      )}
      onClick={onTabSwitch}
    >
      <div className="flex items-center justify-center space-x-1">
        <span>{name}</span>
      </div>
    </button>
  );
};
