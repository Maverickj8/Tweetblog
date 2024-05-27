"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { signIn } from "next-auth/react";

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  function handleSubmit(event) {
    event.preventDefault();

    signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
      callbackUrl: "http://localhost:3000/Login",
    }).then((res) => {
      console.log(res);
      if (!res.error && res.url) {
        toast("Login Successfull");
        router.push("/dashboard");
      } else if (res.error == "CredentialsSignin") {
        toast("Invalid Credentials");
      }
      return;
    });
  }
  return (
    <form onClick={handleSubmit} className="flex flex-col items-center justify-center mt-20">
      <div className="flex flex-col items-center space-y-3">
        <input
          type="name"
          value={formData.name}
          onChange={(event) => {
            setFormData((prev) => ({ ...prev, name: event.target.value }));
          }}
          className="rounded-full text-stone-950 bg-slate-300 p-2 font-bold"
        />
        <input
          type="email"
          value={formData.email}
          onChange={(event) => {
            setFormData((prev) => ({ ...prev, email: event.target.value }));
          }}
          className="rounded-full text-stone-950 bg-slate-300 p-2"
        />
        <input
          type="username"
          value={formData.username}
          onChange={(event) => {
            setFormData((prev) => ({ ...prev, username: event.target.value }));
          }}
          className="rounded-full text-stone-950 bg-slate-300 p-2"
        />
        <input
          type="password"
          value={formData.password}
          onChange={(event) => {
            setFormData((prev) => ({ ...prev, password: event.target.value }));
          }}
          className="rounded-full text-stone-950 bg-slate-300 p-2"
        />
      </div>
      <ToastContainer />
      <button type="submit">sign in</button>
    </form>
  );
};

export default Login;
