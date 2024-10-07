"use client";

import React from "react";

import Image from "next/image";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from "@nextui-org/react";
import ThemeSwitcher from "./themeSwitcher";
import { handleSignOut } from "@/middleware";
import useHydratedStore, { useUserStore } from "@/app/(auth)/_store";

const Navbar = () => {
  const { user } = useUserStore();

  return (
    <header className="antialiased">
      <nav className="fixed top-0 z-50 w-full flex bg-white border-b border-gray-200 dark:border-gray-600 dark:bg-black  px-4 lg:px-6 py-1">
        <div className="flex h-10 items-center my-2">
          <Image
            width={45}
            height={40}
            src={"/logo.png"}
            alt="zawati logo"
            className="rounded-xl"
          />
          <span className="self-center ml-3 text-2xl font-semibold whitespace-nowrap dark:text-white">
            Zawati
          </span>
        </div>

        <div className="md:space-x-6 justify-end items-center ml-auto flex space-x-3">
          <div className="relative">
            <ThemeSwitcher />
          </div>
          {/* <div className="relative">
            <BellIcon />
          </div> */}
          <div className="relative mt-2">
            <Dropdown placement="bottom-start">
              <DropdownTrigger>
                <User
                  as="button"
                  avatarProps={{
                    isBordered: true,
                    src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
                  }}
                  className="transition-transform"
                  description={user?.Role}
                  name={user?.UserName}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="User Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-bold">Signed in as</p>
                  <p className="font-bold">{user?.UserName}</p>
                </DropdownItem>
                {/* <DropdownItem key="settings">My Settings</DropdownItem> */}
                <DropdownItem
                  key="logout"
                  color="danger"
                  onClick={() => handleSignOut()}
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
