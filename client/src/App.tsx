import "./App.css";
import { useEffect, useState } from "react";
import { ITableAccountRow } from "./utils/interfaces";
import SignupForm from "./containers/SignupForm/SignupForm";
import RegistrationsTable from "./containers/RegistrationTable/RegistrationsTable";
import useWebSocket from "./hooks/useWebSocket";
import Toasts from "./utils/Toasts";

function App() {
  const ws = useWebSocket({
    socketUrl: "ws://localhost:443",
  });
  const [accounts, setAccounts] = useState<ITableAccountRow[]>([]);

  const onSubmit = (data: FormData) => {
    const entries = Array.from(data.entries());
    const accountData = Object.fromEntries(entries);
    if (accountData) {
      ws.send({
        type: "createAccount",
        data: {
          name: `${accountData?.firstName} ${accountData?.lastName}`,
          date: new Date(),
          email: accountData?.email,
        } as ITableAccountRow,
      });
    }
  };

  useEffect(() => {
    if (ws.data?.message) {
      setAccounts(ws.data?.message?.data);
      if (ws.data?.message?.type === "createAccountSuccess") {
        Toasts.success("Successfully registered user!");
      }
    }
  }, [ws.data]);

  return (
    <div className="App">
      <SignupForm onSubmit={onSubmit} />
      <RegistrationsTable accounts={accounts} />
    </div>
  );
}

export default App;
