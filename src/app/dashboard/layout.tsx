"use client";

import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ChevronRightIcon, HomeIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { ArrowLeft, ArrowRight, ClipboardListIcon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { CiShop } from "react-icons/ci";

interface NavigationItem {
  name: string;
  href?: string;
  icon?: React.ElementType;
  current: boolean;
  children?: NavigationItem[];
}



const navigation: NavigationItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon, current: true },
  {
    name: "Shop Management",
    icon: CiShop,
    current: false,
    children: [
      { name: "Billing", href: "#", current: false, icon: ClipboardListIcon },

    ],
  },
  // { name: "Logout", href: "#", icon: ArrowRight, current: false },

];

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <div className="flex h-screen ">
      <aside
        className={`fixed inset-y-0 left-0 z-30 bg-primary text-white shadow-lg transform transition-transform duration-300 ease-in-out ${isOpen ? "w-64" : "w-20"}`}
      >
        <div className="flex items-center justify-between px-4 py-4">
          {isOpen ? (
            <span className="text-lg font-semibold">
              {/* <Image src="/tiamed2.svg" alt="Company Logo" width={70} height={32} className="invert brightness-400" /> */}
            </span>
          ) : (
            // <Image src="/tiamed2.svg" alt="Company Logo" width={50} height={32} className="invert brightness-400" />
            <p className="text-lg font-semibold"></p>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Collapse Sidebar" : "Expand Sidebar"}
            className="p-2 hover:bg-primaryhover rounded-md  transition-colors duration-200"
          >
            {isOpen ? <ArrowLeft size={12} /> : <ArrowRight size={12} />}
          </button>
        </div>
        <nav className="mt-4 overflow-y-auto h-full">
          <ul className="space-y-2">
            {navigation.map((item) => (
              <li key={item.name}>
                {!item.children ? (
                  <Link
                    href={item.href ?? "#"}
                    className={clsx(
                      item.current ? "bg-primaryhover" : "hover:bg-primary",
                      "flex items-center gap-x-4 px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200"
                    )}
                  >
                    {item.icon && (
                      <item.icon className="h-5 w-5" aria-hidden="true" />
                    )}
                    {isOpen && <span>{item.name}</span>}
                  </Link>
                ) : (
                  <Disclosure as="div">
                    {({ open }) => (
                      <>
                        <DisclosureButton
                          className={clsx(
                            item.current ? "bg-primary" : "hover:bg-primaryhover w-full",
                            "flex items-center gap-x-4 px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200"
                          )}
                        >
                          {item.icon && (
                            <item.icon className="h-5 w-5" aria-hidden="true" />
                          )}
                          {isOpen && <span>{item.name}</span>}
                          {isOpen && (
                            <ChevronRightIcon
                              className={clsx(
                                "ml-auto h-4 w-4 transition-transform duration-200",
                                { "rotate-90": open }
                              )}
                            />
                          )}
                        </DisclosureButton>
                        {isOpen && open && (
                          <DisclosurePanel as="ul" className="mt-1 ml-6 space-y-1">
                            {item.children?.map((subItem) => (
                              <li key={subItem.name}>
                                <Link
                                  href={subItem.href ?? "#"}
                                  className="flex items-center gap-x-3 px-2 py-1 text-sm font-medium rounded-md hover:bg-primaryhover transition-colors duration-200"
                                >
                                  {subItem.icon && (
                                    <subItem.icon className="h-4 w-4" aria-hidden="true" />
                                  )}
                                  <span>{subItem.name}</span>
                                </Link>
                              </li>
                            ))}
                          </DisclosurePanel>
                        )}
                      </>
                    )}
                  </Disclosure>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 ml-20 transition-all duration-400 ${isOpen ? "ml-64" : "ml-20"}`}>

        {/* Top Navigation Bar */}
        <div className="relative isolate bg-white ">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80 animate-gradient-flow"
          >
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            />
          </div>
          <div className="relative z-10 max-w-full px-8 py-12 mx-auto">
            {children}
          </div>
        </div>

      </main>
    </div>
  );
};

export default Layout;