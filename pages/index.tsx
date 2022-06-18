import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React, { useReducer, useState } from "react";
import styles from "../styles/Home.module.css";

type User = Array<{ Name: string; Value: string }>;
const userDetails: User = [
  { Name: "First Name", Value: "John" },
  { Name: "Last Name", Value: "P" },
  { Name: "Email", Value: "Test@gmail" },
];
type ActionType =
  | { Name: "First Name"; Value: string }
  | { Name: "Last Name"; Value: string }
  | { Name: "Email"; Value: string };

function Child({
  Name,
  Value,
  onChange,
}: {
  Name: string;
  Value: string;
  onChange: ({ Name, Value }: { Name: string; Value: string }) => void;
}) {
  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    onChange({ Name, Value: event.target.value });
  }
  return (
    <div>
      <label>{Name}</label>
      <br />
      <input type="text" defaultValue={Value} onChange={changeHandler} />
    </div>
  );
}

function reducer(state: User, action: ActionType) {
  state = state.map((i) => ({ ...i }));
  let record = state.find((i) => i.Name === action.Name);
  if (record?.Value) {
    record.Value = action.Value;
  }
  return state;
}

const Home: NextPage = () => {
  const [userState, setUserState] = useReducer(reducer, userDetails);
  const [user, setUser] = useState(userDetails);

  function onChange(data: any) {
    setUserState(data);
  }
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUser(userState);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Parent Child Demo</title>
      </Head>

      <main className={styles.main}>
        {user.map((d) => (
          <div key={d.Name}>
            {d.Name}: {d.Value}
          </div>
        ))}
        <form onSubmit={onSubmit}>
          {user.map((d) => (
            <Child key={d.Name} {...d} onChange={onChange} />
          ))}
          <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
};

export default Home;
