"use client"

import { usePathname } from "next/navigation";
import React from "react";
import classes from "./NavLink.module.css"
import Link from "next/link";

function NavLink(props) {

    const path = usePathname()
  return (
    <Link
      href={props.href}
      className={path.startsWith(props.href) ? `${classes.link} ${classes.active}` : classes.link}
    >
      {props.children}
    </Link>
  );
}

export default NavLink;
