import React from "react";
import { usePathname } from "next/navigation";
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";

const Navigationbar = () => {
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = ["/", "orders"];
  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color={pathname !== "/" ? "foreground" : "primary"} href="/">
            Users
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            color={pathname !== "/orders" ? "foreground" : "primary"}
            href="/orders"
            aria-current="page"
          >
            Orders
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end"></NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                item === "/"
                  ? pathname === item
                    ? "primary"
                    : "foreground"
                  : pathname === "/" + item
                    ? "primary"
                    : "foreground"
              }
              className="w-full"
              href={item}
              size="lg"
            >
              {item === "/" ? "users" : item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default Navigationbar;
