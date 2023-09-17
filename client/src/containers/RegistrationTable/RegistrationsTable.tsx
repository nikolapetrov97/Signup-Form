import "./RegistrationsTable.css";
import { ITableAccountRow } from "../../utils/interfaces";
import { useMemo } from "react";

type Props = {
  accounts: ITableAccountRow[];
};

const RegistrationsTable = ({ accounts }: Props) => {
  const sortedAccounts = useMemo(
    () =>
      [...accounts].sort(
        (objA, objB) =>
          Number(new Date(objB.date)) - Number(new Date(objA.date))
      ),
    [accounts]
  );

  return sortedAccounts && sortedAccounts?.length > 0 ? (
    <div className="table-wrapper">
      <table border={1}>
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Creation Date</th>
          </tr>
        </thead>
        <tbody>
          {sortedAccounts?.map((account) => (
            <tr key={account?.email}>
              <td>{account?.email}</td>
              <td>{account?.name}</td>
              <td>{new Date(account?.date).toDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : null;
};

export default RegistrationsTable;
