"use client";
import classnames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import { useSession } from "next-auth/react";
import { Box, Flex , Container, DropdownMenu, Avatar, Text} from "@radix-ui/themes";


const NavBar = () => {
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  const curPath = usePathname();
  const { status, data: session } = useSession();
  return (
    <nav className=" border-b mb-5 px-5 py-3">
      {/* <Container> */}
      <Flex justify={"between"}>
        <Flex align={"center"} gap={"3"}>
          <Link href="/">
            <AiFillBug />
          </Link>

          <ul className="flex space-x-6">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={classnames({
                    "text-zinc-500": curPath === link.href,
                    "text-zinc-700": curPath !== link.href,
                    "hover:text-zinc-900 transition-colors": true,
                  })}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </Flex>

        <Box>
          {status === "authenticated" && (
            // <Link href="/api/auth/signout">Log out</Link>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Avatar className="cursor-pointer" src = {session?.user?.image!} fallback="?" size={"2"} radius="full" />
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Label>
                  <Text size={"2"}>{session?.user?.email}</Text>
                </DropdownMenu.Label>
                <DropdownMenu.Item>
                  <Link href="/api/auth/signout">Log out</Link>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          )}
          {status === "unauthenticated" && (
            <Link href="/api/auth/signin">Log in</Link>
          )}
        </Box>
      </Flex>
      {/* </Container> */}
    </nav>
  );
};

export default NavBar;
