import { Link } from "react-router-dom";

import { ExtendedReactFunctionalComponent } from "@circle-vibe/components";

// @ts-ignore
import logoSrc from "../../../../public/logo.png";

export const TopbarLogo: ExtendedReactFunctionalComponent = () => {
  return (
    <Link to={"/"} className="cursor-pointer">
      <img src={logoSrc} height="28px" />
    </Link>
  );
};
