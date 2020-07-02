import { useEffect } from "react";

const useClickOutside = (ref, setIsOpen) => {
  const handleClickOutside = event => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
};

export default useClickOutside;
