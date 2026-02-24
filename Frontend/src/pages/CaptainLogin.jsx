import { useState } from "react";
import { Link } from "react-router-dom";
export default function CaptainLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(email, password);
    if (email === "pratikjadhav6632@gmail.com" && password === "123456") {
      alert("Login sucess");
    } else {
      alert("login failed");
    }
    setUserData({
      email: email,
      password: password,
    });
    console.log(userData);
    setEmail("");
    setPassword("");
  };
  return (
    <>
      <div className="p-7 h-screen mt-5 flex flex-col justify-between">
        <div>
          <h3 className="text-3xl font-bold twxt-black mb-3 ">Uber</h3>
          <form action="" onSubmit={(e) => handleLogin(e)}>
            <h3 className="text-xl mb-2">What's your Email</h3>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
              placeholder="Enter your email"
              className="rounded-md border outline-amber-500 p-2 w-full mb-2 text-lg"
            />
            <h3 className="text-xl mb-2">Enter Password</h3>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Enter your password"
              className="rounded-md border outline-amber-500 p-2 w-full mb-2 text-lg"
            />
            <button className="rounded-md border p-2 w-full mt-5 bg-black text-white font-bold text-2xl">
              Login
            </button>

            <h3 className="mt-7  flex justify-center ">
              I don't have an account?{" "}
              <Link to="/captain-signup" className="text-blue-500">
                Signup
              </Link>
            </h3>
          </form>
        </div>

        <div className="mt-7  mb-5 flex justify-center ">
          <Link
            className="flex item-center justify-center w-full p-3 rounded-md text-xl font-semibold text-white bg-amber-600"
            to="/user-login"
          >
            Signup as User
          </Link>
        </div>
      </div>
    </>
  );
}
