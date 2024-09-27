"use client";
import classnames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import { useSession } from "next-auth/react";
import {
  Box,
  Flex,
  Container,
  DropdownMenu,
  Avatar,
  Text,
} from "@radix-ui/themes";
import Skeleton from "@/app/components/Skeleton";

const NavBar = () => {


  return (
    <nav className=" border-b mb-5 px-5 py-3">
      {/* <Container> */}
      <Flex justify={"between"}>
        <Flex align={"center"} gap={"3"}>
          <Link href="/">
            <AiFillBug />
          </Link>
          <NavLinks /> 
        </Flex>
        <AuthStatus />
      </Flex>
      {/* </Container> */}
    </nav>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();
  if (status === "loading") return <Skeleton width={"3rem"} />;
  if (status === "unauthenticated")
    return <Link href="/api/auth/signin">Log in</Link>;
  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            className="cursor-pointer"
            src={session?.user?.image!}
            fallback="?"
            size={"2"}
            radius="full"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size={"2"}>{session?.user?.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link className="nav-link" href="/api/auth/signout">Log out</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

const NavLinks = () => {
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  const curPath = usePathname();
  return (
    <ul className="flex space-x-6">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={classnames({
                    "nav-link": true,
                    "!text-zinc-900": curPath === link.href,
                  })}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
  );
}
export default NavBar;
