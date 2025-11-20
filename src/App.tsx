import ModalProvider from "@/provider/ModalProvider";
import SessionProvider from "@/provider/SessionProvider";
import RootRoute from "@/routes/RootRoute";

export default function App() {
  return (
    <SessionProvider>
      <ModalProvider>
        <RootRoute />
      </ModalProvider>
    </SessionProvider>
  );
}
