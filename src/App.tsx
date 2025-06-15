import { CurrentUserProvider } from "@core/context";
import { RootRoute } from "./routes/root.route";

import { ToastContainer, toast } from "react-toastify";

export const App: React.FC = () => {
  return (
    <CurrentUserProvider>
      <RootRoute />

      <ToastContainer />
    </CurrentUserProvider>
  );
};
