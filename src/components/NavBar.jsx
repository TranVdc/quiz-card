import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "./navbar.module.css";

export default function NavBar() {
  const { loginWithRedirect } = useAuth0();
  const { user, isAuthenticated } = useAuth0();
  const { logout } = useAuth0();

  return (
    <div className="container text-center">
      {!isAuthenticated && (
        <button
          className="btn btn-info btn-lg"
          type="button"
          onClick={() => loginWithRedirect()}
        >
          Log In
        </button>
      )}

      {isAuthenticated && (
        <>
          <div>
            <img src={user.picture} alt={user.name} />
            <h2>Hi {user.name}</h2>
            {/* <p>{user.email}</p> */}
          </div>
          <button
            className="btn btn-secondary btn-lg"
            type="button"
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
          >
            Log Out
          </button>
        </>
      )}
    </div>
  );
}
