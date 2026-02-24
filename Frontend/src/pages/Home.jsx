import { useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [data, setData] = useState();

  return (
    <>
      <div>
        <div className="bg-[url(https://images.unsplash.com/photo-1628477264396-ed041a8b422f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-bottom h-screen pt-8 w-full flex flex-col justify-between bg-red-400 ">
          <div>
            <div className="ml-9">
              <h1 className="text-3xl text-white font-bold">Uber</h1>
            </div>
          </div>
          <div className="bg-white py-4 px-4 pb-7">
            <h2 className="text-3xl font-bold">Get Started with uber</h2>
            <Link
              to="/user-login"
              className=" flex item-center justify-center w-full bg-black text-white py-3 rounded mt-2"
            >
              Continue
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
