import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import Header from "./components/custom/Header";
import { Toaster } from "./components/ui/sonner";
import { Provider } from "react-redux";
import { resumeStore } from "./store/store";

function App() {
  const { user, isLoaded, isSignedIn } = useUser();

  //navigate to signIn if user not authenticate
  if (!isSignedIn && isLoaded) {
    return <Navigate to="/auth/sign-in" />;
  }
  return (
    <>
      <Provider store={resumeStore}>
        <Header />
        {/* all the children element of app render */}
        <Outlet />
        <Toaster />
      </Provider>
    </>
  );
}

export default App;
