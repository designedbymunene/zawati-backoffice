import Link from "next/link";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen flex">
      <div className="hidden sm:flex w-1/3 p-5 bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-green-600 via-stone-900 to-green-400 justify-around items-center">
        <div>
          <h1 className="text-white font-bold text-4xl font-sans">Zawati</h1>
          <p className="text-white mt-1 mb-5 ">
            Zawati is a digital merry-go-round platform that allows you to
            save.
          </p>
          <Link
            href={"https://www.zawati.com"}
            className="px-5 py-2.5 bg-white text-black rounded-md"
          >
            Read More
          </Link>
        </div>
      </div>
      <div className="w-full flex pl-10 items-center">{children}</div>
    </div>
  );
};

export default AuthLayout;
