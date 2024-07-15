import React from "react";
import logo from "/logo.svg";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

function Header() {
  const { user, isLoaded, isSignedIn } = useUser();
  const navigate = useNavigate();
  return (
    <div
      id="printHeader"
      className="flex justify-between px-10 py-5 shadow-md items-center"
    >
      <img src={logo} alt="logo" width={100} height={100} />
      {isSignedIn ? (
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            Dashboard
          </Button>
          <UserButton />
        </div>
      ) : (
        <Link to="/auth/sign-in">
          <Button>Get Started</Button>
        </Link>
      )}
    </div>
  );
}

export default Header;
