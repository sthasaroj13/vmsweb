"use client";

import Button from "@/src/component/Button";
import InputField from "@/src/component/InputField";
import VmsLogo from "@/src/assets/vmslogo22.png";
import Image from "next/image";
import Link from "next/link";
import { loginProps } from "@/src/types/SignupSingInType";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "@/src/query/server/SignupSignInSlice";
import { login } from "@/src/utils/authSlice";
import useAppDispatch from "@/src/hooks/useAppDispatch";
import useAppSelector from "@/src/hooks/useAppSelector";
import { useRouter } from "next/navigation";
type FormValues = {
  Login: loginProps;
};
const page = () => {
  const [loginApi] = useLoginMutation();
  const dispatch = useAppDispatch();
  const { role } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      Login: {
        username: "",
        password: "",
      },
    },
  });
  const onSubmit = async (data: FormValues) => {
    console.log(data, "login");
    try {
      const payLoad = { ...data.Login };

      const res = await loginApi(payLoad).unwrap();

      if (res.success && res.token && res.username && res.role) {
        dispatch(
          login({
            token: res.token,
            username: res.username,
            role: res.role,
          })
        );
        alert(res.message || "Login successful!");
        if (role == "admin") {
          router.push("/DashBoardPage");
        } else {
          null;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className=" space-y-2 pt-6">
                <header>Username</header>
                <InputField
                  className={`${errors.Login?.username && "border-red-500"}`}
                  {...register("Login.username", { required: true })}
                  type="text"
                />
              </div>
              <div className=" space-y-2 py-5">
                <header>Password</header>
                <InputField
                  {...register("Login.password", { required: true })}
                  className={`${errors.Login?.password && "border-red-500"}`}
                  type="text"
                />
              </div>
              <Button type="submit" className=" py-2 bg-primary w-full ">
                <span className="text-white cursor-pointer ">Login</span>
              </Button>
            </form>

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
