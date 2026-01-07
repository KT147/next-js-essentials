import Link from "next/link"
import logo from "@/assets/logo.png"
import classes from "./MainHeader.module.css"
import Image from "next/image"


function MainHeader() {
  return (
    <header className={classes.header}>
        <Link className={classes.logo} href="/">
        <Image src={logo} alt="A plate with food" priority/>NextLevel Food</Link>

        <nav className={classes.nav}>
            <ul>
                <li><Link href="/meals">Browse meals</Link></li>
                <li><Link href="/community">Meals Community</Link></li>
            </ul>
        </nav>
    </header>
  )
}

export default MainHeader