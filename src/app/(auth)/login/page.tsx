"use client";

import React, { useState } from "react";

import * as z from "zod";
import axios from "axios";
import Link from "next/link";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Button, Input } from "@nextui-org/react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useUserStore } from "../_store";

const formSchema = z.object({
  UserName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  Password: z.string().min(4, {
    message: "Password must be at least 4 characters.",
  }),
});

const LoginPage = () => {
  const router = useRouter();
  const { saveUser } = useUserStore();

  const [loading, setLoading] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      UserName: process.env.NODE_ENV === "development" ? "TestUser" : "",
      Password: process.env.NODE_ENV === "development" ? "1111" : "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    await axios
      .post("https://apis.automittech.tech/", {
        RequestID: "LoginValidate",
        ...values,
      })
      .then((response) => {
        setLoading(false);
        console.log(response.data);
        toast.success(`Welcome back, ${response.data[0].UserName}`, {
          position: "top-right",
          icon: "👏",
        });
        saveUser(response.data[0]);
        Cookies.set("currentUser", response.data[0].Role);
        router.push("/dashboard");
      })
      .catch((error) => {
        setLoading(false);

        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          toast.error(error.response.data.Message);
        }
      });
  }

  return (
    <div className="w-1/2">
      <>
        <span className="text-sm">Welcome back</span>
        <h1 className="text-2xl font-bold">Sign in to Zawati</h1>
      </>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="UserName"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Input
              label="Username"
              variant="bordered"
              className="mt-5"
              isInvalid={!!errors.UserName}
              errorMessage={!!errors.UserName && errors.UserName.message}
              {...field}
            />
          )}
        />

        <Controller
          control={control}
          name="Password"
          rules={{ required: true }}
          render={({ field }) => (
            <Input
              label="Password"
              variant="bordered"
              className="mt-5"
              isInvalid={!!errors.Password}
              errorMessage={!!errors.Password && errors.Password.message}
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
              {...field}
            />
          )}
        />

        {/* <div className="flex justify-between mt-2">
          <span className="text-sm text-blue-700 hover:underline cursor-pointer">
            Forgot password?
          </span>
        </div> */}
        <Button
          type="submit"
          color={"primary"}
          isLoading={loading}
          className="w-full my-5"
        >
          {loading ? "Signing in..." : "Sign In"}
        </Button>
        {/* <p>
          Don&#39;t have an account? &nbsp;
          <Link className="underline" href={"/register"}>
            Sign Up
          </Link>
        </p> */}
      </form>
    </div>
  );
};

export default LoginPage;

// else if (error.request) {
//   // The request was made but no response was received
//   // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
//   // http.ClientRequest in node.js
//   console.log(error.request);
// } else {
//   // Something happened in setting up the request that triggered an Error
//   console.log("Error", error.message);
// }
