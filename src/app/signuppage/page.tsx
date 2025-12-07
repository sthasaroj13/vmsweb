"use client";
import Button from "@/src/component/Button";
import InputField from "@/src/component/InputField";
import VmsLogo from "@/src/assets/vmslogo22.png";
import Image from "next/image";
import Link from "next/link";
import useDropdown from "@/src/hooks/useDropDown";
import { ChevronDown, Loader2 } from "lucide-react";
import { useGetUserRolesQuery } from "@/src/query/server/RolesSlice";
import { useState } from "react";
import { rolesProps } from "@/src/types/rolesType";
import { signupProps } from "@/src/types/SignupSingInType";
import { Controller, useForm } from "react-hook-form";
import { useSignupMutation } from "@/src/query/server/SignupSignInSlice";
import { useRouter } from "next/navigation";
import { ApiResponse } from "@/src/types/ApiResponse";
import Toaster from "@/src/component/Toaster";
type formValues = {
  SignUp: signupProps;
};
const page = () => {
  const roleDropdown = useDropdown();
  const router = useRouter();
  const { data: getUserRolesApi } = useGetUserRolesQuery();
  const [setSignupApi, { isLoading }] = useSignupMutation();
  const [selectedRole, setSelectedRole] = useState<rolesProps | null>(null);
  const [toaster, setToaster] = useState<boolean>(false);
  const [isResponse, setIsResponse] = useState<ApiResponse | null>(null);
  const handleSelectRole = (role: rolesProps) => {
    setSelectedRole(role);
    roleDropdown.closeDropdown();
  };
  const showToaster = (response: ApiResponse) => {
    setIsResponse(response);
    setToaster(true);
  };
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<formValues>({
    defaultValues: {
      SignUp: {
        username: "",
        email: "",
        password: "",
        role: "",
      },
    },
  });
  const onSubmit = async (data: formValues) => {
    console.log(data);
    try {
      const payload = {
        ...data.SignUp,
      };
      const res = await setSignupApi(payload).unwrap();
      if (res.success === true) {
        reset();
        showToaster(res);
        router.push("/loginpage");
      }
    } catch (error: any) {
      console.log("Error:", error);
      let errorMessage = "Failed to Save";
      if (error?.message?.message) {
        errorMessage = error.message.message;
      } else if (typeof error?.message === "string") {
        errorMessage = error.message;
      }
      const errorResponse: ApiResponse = {
        success: false,
        message: errorMessage,
        data: null,
      };
      showToaster(errorResponse);
    }
  };
  return (
    <>
      <main className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className=" flex  space-x-0.5">
          <div className=" h-140 w-90 bg-white rounded-l-2xl shadow-2xl px-2.5">
            <h1 className=" text-center   font-bold  text-[40px] pt-8 text-primary">
              VMS
            </h1>
            <h2 className=" text-center italic text-[14px]">
              wlecome to Vehicle management system
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className=" space-y-2 pt-6">
                <header>Username</header>
                <InputField
                  className={`${errors.SignUp?.username && "border-red-500"}`}
                  type="text"
                  {...register("SignUp.username", { required: true })}
                />
              </div>
              <div className=" space-y-2 pt-6">
                <header>Email</header>
                <InputField
                  className={`${errors.SignUp?.email && "border-red-500"}`}
                  type="email"
                  {...register("SignUp.email", { required: true })}
                />
              </div>
              <div className=" space-y-2 pt-5">
                <header>Password</header>
                <InputField
                  className={`${errors.SignUp?.password && "border-red-500"}`}
                  {...register("SignUp.password", { required: true })}
                  type="text"
                />
              </div>
              <div className="relative py-1 ">
                <Controller
                  name="SignUp.role"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <div className="relative py-5">
                      <button
                        type="button"
                        onClick={roleDropdown.toggle}
                        className={`h-7.5 w-full cursor-pointer border-2
                         border-gray-400 rounded-[.625rem] flex justify-between 
                         items-center px-2 ${
                           errors.SignUp?.role && "border-red-500"
                         }`}
                      >
                        <span>
                          {selectedRole ? selectedRole.name : "Select role"}
                        </span>
                      </button>

                      {roleDropdown.isOpen && (
                        <div className="bg-white absolute z-20 w-full max-h-23 rounded-[.625rem] shadow-md overflow-auto">
                          <ul>
                            {getUserRolesApi?.data.map((role) => (
                              <li
                                key={role.id}
                                className={`${
                                  selectedRole?.id === role.id
                                    ? "bg-primary text-white"
                                    : "hover:bg-amber-100"
                                } pl-2 py-1.5 cursor-pointer`}
                                onClick={() => {
                                  setSelectedRole(role);
                                  field.onChange(role.name);
                                  roleDropdown.closeDropdown();
                                }}
                              >
                                {role.name}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                />

                <div
                  className={`absolute right-1.5 top-7 transform ${
                    roleDropdown.isOpen ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <ChevronDown size={18} />
                </div>
              </div>
              <Button
                disabled={isLoading}
                type="submit"
                className="  bg-primary w-full  py-2 cursor-pointer  "
              >
                {isLoading ? (
                  <div className=" flex justify-center">
                    <Loader2 className="  animate-spin text-white text-center" />
                  </div>
                ) : (
                  <span className="text-white ">Sign up</span>
                )}
              </Button>
            </form>

            <span className="block text-[14px] pt-2.5">
              <Link href="/loginpage">
                Already have an account? <i className="text-primary">Log in</i>
              </Link>
            </span>
          </div>

          <div className=" h-140 w-90 bg-primary rounded-r-2xl  shadow-2xl">
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
        {isResponse && toaster && (
          <Toaster
            isOpen={toaster}
            setIsOpen={setToaster}
            isresponse={isResponse}
          />
        )}
      </main>
    </>
  );
};

export default page;
