import ModalProvider from "./api/provider/modal-provider";
import SessionProvider from "./api/provider/session-provider";
import RootRoute from "./root-route";

export default function App() {
  return (
    <SessionProvider>
      <ModalProvider>
        <RootRoute />
      </ModalProvider>
    </SessionProvider>
  );
}
