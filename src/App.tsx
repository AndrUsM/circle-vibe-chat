import { RootRoute } from "./routes/root.route";

import { ToastContainer, toast } from "react-toastify";

export const App: React.FC = () => {
  return (
    <>
      <RootRoute />

      <ToastContainer />
    </>
  );
};
