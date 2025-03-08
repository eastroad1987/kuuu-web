import { useState } from "react";



export default function useWriter() {

  // const [state, setState] = useState<>({

  //   return {
  //   session,
  //   status,
  //   isAuthenticated: checkAuth(),
  //   isLoading: status === "loading",
  //   user: session?.user,
  //   login,
  //   logout,
  //   updateSession,
  // };
  return {
    state: {},
    updateState: () => {},
    handlers: {},
  };
}
