import { suisse } from "@/app/fonts";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "About", href: "/about" },
  { label: "Art", href: "/art" },
  { label: "Architecture", href: "/architecture" },
];

export default function Navbar({showNav}:{showNav: boolean}){
  const pathname = usePathname();

return(
<div
        className={`fixed top-0 left-0 w-full z-50 transition-[top] duration-300 ease-in-out ${
          showNav ? "top-0" : "top-[-3.3125rem]"
        }`}
      >
        <div className={`${suisse.className} relative flex h-[3.3125rem] justify-between items-center border-b bg-[#E1E3E3] p-3`}>
          <div className="flex justify-between items-center text-[0.875rem] ml-[0.625rem]">
             {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- intentional: forces a full reload so Home restarts from its true initial state, not a client-side route swap */}
            <a
            href="/"
            className="mr-4 font-[450] text-[1.4375rem] cursor-pointer max-[400px]:text-[1.25rem] min-[650px]:hidden"
          >
            KAAN
          </a>
            {NAV_ITEMS.map(({ label, href }, index) => (
              <Link
                key={href}
                href={href}
                className={`${suisse.className} cursor-pointer  ${
                  index < NAV_ITEMS.length - 1 ? "mr-3" : ""
                } ${pathname === href ? "italic" : ""} max-[400px]:text-[0.8125rem]`}
              >
                {label}
              </Link>
            ))}
          </div>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- intentional: forces a full reload so Home restarts from its true initial state, not a client-side route swap */}
          <a
            href="/"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-[450] text-[1.4375rem] tracking-wide cursor-pointer max-[650px]:hidden"
          >
            KAAN
          </a>
          <div className="text-[1rem]">
            <i className="pi pi-search text-[1rem]"></i>
          </div>
        </div>
      </div>
)
    }
