/* eslint-disable react/prop-types */
import { useMediaQuery } from "react-responsive";

export const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 767 });
  return isDesktop ? children : null;
};

export const Mobile = ({ children }) => {
  const isDesktop = useMediaQuery({ maxWidth: 766 });
  return isDesktop ? children : null;
};
