import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import PageNav from "../components/PageNav";
import { useAuth } from "../context/FakeAuthContext";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import Message from "../components/Message";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const { login, isAuthenticated, error } = useAuth();
  const navigation = useNavigate();
  function handleClick(e) {
    e.preventDefault();
    if(email && password)login(email, password);
  }
  useEffect(function () {
    if (isAuthenticated) {
      navigation("/app");
    }
  }, [isAuthenticated]);
  return (
    <>
      <main className={styles.login}>
        <PageNav />
        <form className={styles.form}>
          <div className={styles.row}>
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <div className={styles.row}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <p className={styles.error}>{!isAuthenticated && error && <Message message={error} />}</p>
          </div>
          <div>
            <Button type="primary" onClick={handleClick}>Login</Button>
          </div>
        </form>
      </main>
    </>
  );
}
