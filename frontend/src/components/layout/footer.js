import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex min-h-[2.5rem] items-center justify-end bg-[#211E1B] px-4 text-sm text-[#AFA69A]">
      <span>
        © 2026 &nbsp;
        <Link
          href="https://swaadtasteofpunjab.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-[#DDBB72] transition-colors duration-200 hover:text-[#F3E8D0]"
        >
          SWAAD
        </Link>
        . &nbsp; All rights reserved. &nbsp; CMS v1.0
      </span>
    </footer>
  );
}
