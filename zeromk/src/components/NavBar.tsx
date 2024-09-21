import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, Fragment } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { useRouter } from "next/router";
import { Menu, Transition } from "@headlessui/react";
import { IoChevronDownOutline } from "react-icons/io5";

const Navbar = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const { pathname } = useRouter();
  const [navbarBg, setNavbarBg] = useState("bg-transparent");
  const [dividerDisabled, setDividerDisabled] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const triggerHeight = 50;

      if (scrollY > triggerHeight) {
        setNavbarBg("bg-black");
        setDividerDisabled(true);
      } else {
        setNavbarBg("bg-transparent");
        setDividerDisabled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav
        className={`navbar fixed z-10 w-full mx-auto px-2 sm:px-4 py-3 rounded drop-shadow-md ${navbarBg} font-['Roobert'] bg-opacity-90`}
      >
        <div className="max-w-[1080px] container flex flex-wrap justify-between items-center mx-auto">
          <Link href="/" className="flex items-center flex-1">
            <span className="flex flex-row items-end self-center font-['trap'] text-neutral-100 text-2xl whitespace-nowrap">
              <Image
                src="/finn.png"
                width="40"
                height="40"
                alt="TokenTechies"
                className="mr-3"
              />
              TokenTechies
            </span>
          </Link>
          <div className="flex md:order-2" style={{ marginLeft: "2rem" }}>
            <w3m-button />
            <button
              data-collapse-toggle="mobile-menu-4"
              type="button"
              className="ml-2 md:ml-0 inline-flex items-center py-2 px-3 text-sm text-gray-300 rounded-lg md:hidden hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
              onClick={() => setIsOpenMenu(!isOpenMenu)}
            >
              <span className="sr-only">Open main menu</span>
              <HiMenuAlt3 size="25" />
            </button>
          </div>
          <div
            className={`${
              isOpenMenu ? "block" : "hidden"
            } justify-between items-center w-full md:flex md:w-auto md:order-1`}
          >
            <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-md md:font-medium">
              <li></li>
              <li>
                <Link
                  href="/"
                  className={`${
                    pathname === "/" ? "underline" : ""
                  } block underline-offset-4 py-2 pr-4 pl-3 text-neutral-300 hover:text-teal-400 border-b border-neutral-400 hover:bg-neutral-800 md:hover:bg-transparent md:border-0 md:hover:font-bold md:p-0`}
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/create"
                  className={`${
                    pathname === "/create" ? "underline" : ""
                  } block underline-offset-4 py-2 pr-4 pl-3 text-neutral-300 hover:text-teal-400 border-b border-neutral-400 hover:bg-neutral-800 md:hover:bg-transparent md:border-0 md:hover:font-bold md:p-0`}
                  aria-current="page"
                >
                  Create
                </Link>
              </li>
              <li>
                <Link
                  href="/invest"
                  className={`${
                    pathname === "/invest" ? "underline" : ""
                  } block underline-offset-4 py-2 pr-4 pl-3 text-neutral-300 hover:text-teal-400 border-b border-neutral-400 hover:bg-neutral-800 md:hover:bg-transparent md:border-0 md:hover:font-bold md:p-0`}
                  aria-current="page"
                >
                  Invest
                </Link>
              </li>
              <Menu as="div" className="relative inline-block w-full text-left">
                <div>
                  <Menu.Button className="inline-flex w-full items-center py-2 pr-4 pl-3 text-neutral-300 hover:text-teal-400 border-b border-neutral-400 hover:bg-neutral-800 md:hover:bg-transparent md:border-0 md:hover:font-bold md:p-0">
                    Profile
                    <IoChevronDownOutline
                      className="-mr-1 ml-2 h-5 w-5"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="relative md:absolute right-0 mt-2 w-72 md:w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                    <div className="px-1 py-1 ">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href={"/bucket"}
                            className={`${
                              active
                                ? "bg-violet-500 text-white"
                                : "text-gray-900"
                            } group flex w-full items-center rounded-md px-2 py-2 md:text-sm text-md`}
                          >
                            Your bucket
                          </Link>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </ul>
          </div>
        </div>
        {!dividerDisabled && !isOpenMenu && (
          <div className="flex justify-center">
            <hr className="my-2 w-[90%] sm:w-[80%] md:w-[75%] h-[1px] border-t-0 bg-slate-400/40" />
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
