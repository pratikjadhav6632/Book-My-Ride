import { createContext, useState } from "react";

export const UserDataContext = createContext();

const [user, setUser] = useState({
  fullName: {
    firstName: "",
    lastname: "",
  },
  email: "",
});

export default function UserContext({ children }) {
  return (
    <div>
      <UserDataContext.Provider>{children}</UserDataContext.Provider>
    </div>
  );
}
