import classNames from "classnames";
import { useState } from "react";
import { ArrowDown } from "../../../shared/Icons/ArrowDown";
import { supportedLanguages } from "../../../utils/constants";

export const LanguageDropdown = ({
  onLanguageChange,
}: {
  onLanguageChange: (langTag: string) => void;
}): JSX.Element => {
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const [isOpen, setIsOpen] = useState(false);

  // for displaying the current language
  const currentLanguage = supportedLanguages.find(
    (lang) => lang.value === selectedLanguage
  );

  // for displaying the list of languages without the current language
  const languageList = supportedLanguages.filter(
    (lang) => lang.value !== currentLanguage?.value
  );

  const handleLanguageChange = (langTag: string) => {
    onLanguageChange(langTag);
    setIsOpen(false);
    setSelectedLanguage(langTag);
  };
  return (
    <div className="text-start relative z-10">
      <p className="text-14 font-medium mb-2 ">Output language</p>
      <div className="">
        <button
          type="button"
          className={classNames(
            "transition-all overflow-hidden ease flex w-full justify-between items-center rounded-xl bg-white px-4 py-2.5 border border-1 border-gray-300/60 text-sm text-gray-900",
            {
              "delay-200 duration-100": !isOpen,
              "border-b-0 rounded-b-none duration-100": isOpen,
            }
          )}
          id="menu-button"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center justify-between space-x-2">
            <div className="w-6 h-6">{currentLanguage?.icon}</div>
            <span>{currentLanguage?.label} </span>
          </div>

          <ArrowDown
            className={classNames({
              "transform rotate-180": isOpen,
            })}
          />
        </button>
      </div>
      <div
        className={classNames(
          "duration-300 transition-all  ease z-10 w-full origin-top-right bg-white focus:outline-none",
          {
            "h-0 overflow-hidden rounded-t-none": !isOpen,
            "h-64 overflow-auto border border-1 border-t-0 border-gray-300/60 rounded-t-none":
              isOpen,
          }
        )}
        role="menu"
        tabIndex={-1}
      >
        {languageList.map(({ label, value, icon }) => (
          <div className="py-1 " role="none" key={value}>
            <button
              type="button"
              className="w-full text-start px-4 py-2 text-14 hover:bg-gray-100 focus:bg-gray-100"
              role="menuitem"
              onClick={() => handleLanguageChange(value)}
            >
              <div className="flex items-center justify-start space-x-2">
                <div className="w-6 h-6">{icon}</div>
                <span>{label} </span>
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
