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
    <div className="text-start">
      <p className="text-14 font-medium mb-2">Output language</p>
      <div>
        <button
          type="button"
          className={classNames(
            "transition-all ease overflow-hidden w-full flex justify-between items-center rounded-xl bg-white px-4 py-2.5 border border-1 border-gray-300/60 text-sm text-gray-900",
            {
              "delay-200 duration-100": !isOpen,
              "border-b-0 rounded-b-none duration-100": isOpen,
            }
          )}
          id="menu-button"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center justify-between space-x-2">
            <div className="w-6 h-6 pt-1">{currentLanguage?.icon}</div>
            <span>{currentLanguage?.label} </span>
          </div>

          <ArrowDown
            className={classNames({
              "rotate-180": isOpen,
            })}
          />
        </button>
      </div>
      <ul
        className={classNames(
          "duration-300 transition-all ease w-full origin-top-right bg-white focus:outline-none",
          {
            "h-0 overflow-hidden rounded-t-none": !isOpen,
            "h-64 overflow-auto border border-1 border-t-0 border-gray-300/60 rounded-t-none":
              isOpen,
          }
        )}
      >
        {languageList.map(({ label, value, icon }) => (
          <li className="py-1 " key={value}>
            <button
              type="button"
              className="w-full text-14 text-start px-4 py-2 hover:bg-gray-100 focus:bg-gray-100"
              role="menuitem"
              onClick={() => handleLanguageChange(value)}
            >
              <div className="flex items-center justify-start space-x-2">
                <div className="w-6 h-6 pt-1">{icon}</div>
                <span>{label}</span>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
