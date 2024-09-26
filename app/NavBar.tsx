'use client';
import classnames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import { useSession } from 'next-auth/react';
import { Box } from "@radix-ui/themes";

const NavBar = () => {
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  const curPath = usePathname()
  const { status, data: session } = useSession()
  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <AiFillBug />
      </Link>

      <ul className="flex space-x-6">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={classnames({
                "text-zinc-500" : curPath === link.href,
                "text-zinc-700" : curPath !== link.href,
                "hover:text-zinc-900 transition-colors" : true  
              })}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <Box>
       {status === 'authenticated' && <Link href="/api/auth/signout">Log out</Link>}
       {status === 'unauthenticated' && <Link href="/api/auth/signin">Log in</Link>}

      </Box>
    </nav>
  );
};

export default NavBar;
