import { useState } from "react";
import { Link } from "react-router-dom";
export default function CaptainSignup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});

  const handleSignup = (e) => {
    e.preventDefault();
    console.log(email, password);

    setUserData({
      fullName: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      password: password,
    });
    console.log(userData);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };
  return (
    <>
      <div className="p-7 h-screen mt-5 flex flex-col justify-between">
        <div>
          <h3 className="text-3xl font-bold twxt-black  ">Book My Ride</h3>
          <img
            className="h-7"
            src="https://png.pngtree.com/png-vector/20190411/ourmid/pngtree-vector-forward-icon-png-image_925823.jpg"
            alt=""
          />
          <form action="" onSubmit={(e) => handleSignup(e)}>
            <h3 className="text-xl mb-2">What's your name</h3>
            <div className="flex w-full justify-between">
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="FirstName"
                className="border p-2 rounded-md w-full mr-1  outline-amber-500"
              />
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="LastName"
                className="border p-2 w-full  rounded-md ml-1 outline-amber-500"
              />
            </div>
            <h3 className="text-xl mb-2">What's your Email</h3>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="rounded-md border outline-amber-500 p-2 w-full mb-2 text-lg"
            />
            <h3 className="text-xl mb-2">Enter Password</h3>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="rounded-md border outline-amber-500 p-2 w-full mb-2 text-lg"
            />
            <button className="rounded-md border p-2 w-full mt-5 bg-black text-white font-bold text-2xl">
              Signup
            </button>

            <h3 className="mt-7  flex justify-center ">
              I have an account?{" "}
              <Link to="/captain-login" className="text-blue-500">
                Login
              </Link>
            </h3>
          </form>
        </div>

        <div className="mt-7  mb-5 flex justify-center ">
          <Link
            className="flex item-center justify-center w-full p-3 rounded-md text-xl font-semibold text-white bg-amber-600"
            to="/user-signup"
          >
            Signup as User
          </Link>
        </div>
      </div>
    </>
  );
}
