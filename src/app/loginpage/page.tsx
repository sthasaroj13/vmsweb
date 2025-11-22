"use client";

import Button from "@/src/component/Button";
import InputField from "@/src/component/InputField";
import VmsLogo from "@/src/assets/vmslogo22.png";
import Image from "next/image";
import Link from "next/link";
const page = () => {
  return (
    <>
      <main className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className=" flex  space-x-0.5">
          <div className=" h-100 w-90 bg-white rounded-l-2xl shadow-2xl px-2.5">
            <h1 className=" text-center   font-bold  text-[40px] pt-8 text-primary">
              VMS
            </h1>
            <h2 className=" text-center italic text-[14px]">
              wlecome to Vehicle management system
            </h2>
            <div className=" space-y-2 pt-6">
              <header>Username</header>
              <InputField type="text" />
            </div>
            <div className=" space-y-2 py-5">
              <header>Password</header>
              <InputField type="text" />
            </div>

            <Button type="submit" className=" py-2 bg-primary w-full ">
              <span className="text-white cursor-pointer ">Login</span>
            </Button>

            <span className="block text-[14px] pt-2.5">
              New here?{" "}
              <Link href="/signuppage">
                <i className="text-primary cursor-pointer">Create an account</i>
              </Link>
            </span>
          </div>

          <div className=" h-100 w-90 bg-primary rounded-r-2xl  shadow-2xl">
            <div className=" flex  pt-4 justify-center">
              <Image
                alt="vmsLogo"
                src={VmsLogo}
                className=" w-80 h-50 rounded-[10px]"
              />
            </div>
            <span className=" block text-white  text-center pt-4">
              आफ्नो सवारी व्यवस्थापन सजिलो बनाउनुहोस्
            </span>
            <span className=" block text-white  text-center pt-4">
              Manage Your Fleet with Ease
            </span>
          </div>
        </div>
      </main>
    </>
  );
};

export default page;
