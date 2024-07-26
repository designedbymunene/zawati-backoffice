"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

interface AnchorLinkProps {
  href: string;
  title: string;
  icon: React.ReactNode;
}

const AnchorLink = ({ href, title, icon }: AnchorLinkProps) => {
  const pathname = usePathname();
  // console.log("pathname", pathname);
  // console.log("href", href);
  return (
    <li>
      <Link
        key={href}
        href={href}
        className={` link relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 dark:text-white hover:text-gray-800 hover:dark:bg-gray-800 border-l-4  hover:border-green-500 pr-6 ${
          pathname === href ? "border-green-500" : "border-transparent"
        }`}
      >
        <span className="inline-flex justify-center items-center ml-4">
          {icon}
        </span>
        <span className={`ml-2 text-sm tracking-wide truncate `}>{title}</span>
      </Link>
    </li>
  );
};

export default AnchorLink;
