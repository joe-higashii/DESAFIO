import DarkModeToggle from "@/components/DarkModeToggle";
import { useAuth } from "@/context/AuthContext";
import api from "@/services/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";

const LoginPage = () => {
  const { register, handleSubmit, watch, setValue } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const password = watch("password");

  useEffect(() => {
    if (localStorage.getItem("rememberMe") === "true") {
      setValue("email", localStorage.getItem("email") || "");
      setValue("password", localStorage.getItem("password") || "");
    }
  }, [setValue]);

  const onSubmit = async (data: any) => {
    try {
      const response = await api.post("/api/auth/login", {
        username: data.email,
        password: data.password,
      });

      console.log("Login response:", response);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.id);

      if (localStorage.getItem("rememberMe") === "true") {
        localStorage.setItem("email", data.email);
        localStorage.setItem("password", data.password);
      }
      router.push("/home");
    } catch (error) {
    }
  };

  const handleRememberMe = (e: any) => {
    if (e.target.checked) {
      localStorage.setItem("rememberMe", "true");
      localStorage.setItem("email", watch("email"));
      localStorage.setItem("password", watch("password"));
    } else {
      localStorage.setItem("rememberMe", "false");
      localStorage.removeItem("email");
      localStorage.removeItem("password");
    }
  };

  const navigate = (e: any) => {
    e.preventDefault();
    router.push("/register");
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <DarkModeToggle />
        </div>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Faça seu login
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Seu email
                </label>
                <input
                  type="email"
                  {...register("email")}
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="nome@email.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Senha
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-1 p-2 text-gray-900 focus:ring-primary-600 focus:border-primary-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    {showPassword ? (
                      <FiEyeOff size={20} />
                    ) : (
                      <FiEye size={20} />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      onChange={handleRememberMe}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Lembrar de mim
                    </label>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Entrar
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Ainda não possui uma conta?{" "}
                <a
                  href=""
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  onClick={navigate}
                >
                  Cadastre-se
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
