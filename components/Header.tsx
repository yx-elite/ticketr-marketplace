import Link from "next/link";
import Image from "next/image";
import logo from "@/images/logo.png";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/SearchBar";

const Header = () => {
  return (
    <div className="border-b">
      <div className="flex flex-col lg:flex-row items-center gap-4 p-4">
        {/* Logo and Sign In/Out on Mobile */}
        <div className="flex items-center justify-between w-full lg:w-auto lg:mr-8">
          <Link href="/" className="font-bold shrink-0">
            <Image src={logo} alt="logo" width={100} height={100} className="w-24 lg:w-28"/>
          </Link>

          <div className="lg:hidden">
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="default" className="bg-gray-100 text-gray-800 px-3 py-1.5 text-sm rounded-lg hover:bg-gray-200 transition border border-gray-300">
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>

        {/* Search Bar - Full Width on Mobile */}
        <div className="w-full lg:max-w-2xl">
          <SearchBar />
        </div>

        {/* Desktop Action Buttons */}  
        <div className="hidden lg:block ml-auto">
          <SignedIn>
            <div className="flex items-center gap-4">
              <Link href="/seller">
                <button className="bg-blue-600 text-white px-3 py-1.5 text-sm rounded-md hover:bg-blue-700 transition">
                  Sell Tickets
                </button>
              </Link>
              <Link href="/tickets">
                <button className="bg-gray-100 text-gray-800 px-3 py-1.5 text-sm rounded-md hover:bg-gray-200 transition border border-gray-300">
                  My Tickets
                </button>
              </Link>
              <UserButton />
            </div>
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-gray-100 text-gray-800 px-3 py-1.5 text-sm rounded-md hover:bg-gray-200 transition border border-gray-300">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
        </div>

        {/* Mobile Action Buttons */}
        <div className="lg:hidden w-full flex justify-center gap-4">
          <SignedIn>
            <Link href="/seller" className="flex-1">
              <button className="w-full bg-blue-600 text-white px-3 py-1.5 text-sm rounded-md hover:bg-blue-700 transition">
                Sell Tickets
              </button>
            </Link>
            <Link href="/tickets" className="flex-1">
              <button className="w-full bg-gray-100 text-gray-800 px-3 py-1.5 text-sm rounded-md hover:bg-gray-200 transition border border-gray-300">
                My Tickets
              </button>
            </Link>
          </SignedIn>
        </div>
      </div>
    </div>
  )
}

export default Header