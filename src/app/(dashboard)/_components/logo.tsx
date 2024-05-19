import Image from "next/image";
import Link from "next/link";

export function HeaderLogo() {
  return (
    <Link href="/">
      <div className="items-center hidden lg:flex">
        <Image alt="logo" src="/logo.png" width={32} height={32} />
        <p className="font-semibold text-white text-2xl ml-2.5">
          Control
        </p>
      </div>
      </Link>
  )
}