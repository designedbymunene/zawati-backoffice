"use client";

import React, { useState } from "react";

import Link from "next/link";
import axios, { AxiosError } from "axios";
import { Button, Input } from "@nextui-org/react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const RegisterPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <form className="w-full">
      <div>
        <span className="text-sm">Welcome</span>
        <h1 className="text-2xl font-bold">Sign up to Zawati</h1>
      </div>
      <div className="w-1/2">
        <div className="flex mt-5 w-full flex-wrap md:flex-nowrap gap-4">
          <Input variant="bordered" label="Name" />
          <Input variant="bordered" label="Username" />
        </div>
        <Input
          className="my-5 "
          type="email"
          label="Email"
          variant="bordered"
        />
        <Input
          label="Password"
          variant="bordered"
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <EyeIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeOffIcon className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
          className=" my-5"
        />

        <Button color="primary" className="w-full my-5">
          Create Account
        </Button>
        <p className="self-center">
          Already have an account? &nbsp;
          <Link className="underline " href={"/"}>
            Sign In
          </Link>
        </p>
      </div>
    </form>
  );
};

export default RegisterPage;
