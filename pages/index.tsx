import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React, { useReducer, useState } from "react";
import styles from "../styles/Home.module.css";

const userDetails: Array<{ Name: string; Value: string }> = [
  { Name: "First Name", Value: "John" },
  { Name: "Last Name", Value: "P" },
  { Name: "Email", Value: "Test@gmail" },
];

type OnChange = (Name: string, Value: string) => void;

function Child({
  Name,
  Value,
  onChange,
}: {
  Name: string;
  Value: string;
  onChange: OnChange;
}) {
  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    onChange(Name, event.target.value);
  }
  return (
    <div>
      <label>{Name}</label>
      <br />
      <input type="text" defaultValue={Value} onChange={changeHandler} />
    </div>
  );
}

const Home: NextPage = () => {
  const [user, setUser] = useState(userDetails);
  const [firstName, setFirstName] = useState(
    userDetails.find((d) => d.Name === "First Name")?.Value || ""
  );
  const [lastName, setLastName] = useState(
    userDetails.find((d) => d.Name === "Last Name")?.Value || ""
  );
  const [email, setEmail] = useState(
    userDetails.find((d) => d.Name === "Email")?.Value || ""
  );

  const onChange = (Name: string, Value: string) => {
    if (Name === "First Name") {
      setFirstName(Value);
    } else if (Name === "Last Name") {
      setLastName(Value);
    } else if (Name === "Email") {
      setEmail(Value);
    }
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUser([
      { Name: "First Name", Value: firstName },
      { Name: "Last Name", Value: lastName },
      { Name: "Email", Value: email },
    ]);
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
