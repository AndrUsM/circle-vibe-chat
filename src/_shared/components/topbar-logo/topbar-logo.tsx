import { Link } from "react-router-dom";

import { ExtendedReactFunctionalComponent } from "@circle-vibe/components";

import { useCurrentUser } from "@core/hooks";
import { PrivatePagesEnum, PublicPagesEnum } from "@core/navigation";

// @ts-ignore
import logoSrc from "../../../../public/logo.png";

export const TopbarLogo: ExtendedReactFunctionalComponent = () => {
  const { user } = useCurrentUser();

  return (
    <Link
      to={
        user
          ? `/app/${PrivatePagesEnum.CONVERSATIONS}`
          : `/auth/${PublicPagesEnum.SIGN_IN}`
      }
      className="cursor-pointer"
    >
      <img src={logoSrc} height="28px" />
    </Link>
  );
};
