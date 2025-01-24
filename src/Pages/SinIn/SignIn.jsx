import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { ImSpinner8 } from "react-icons/im";
import { useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import UseAuth from "../../Hooks/UseAuth";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const SignIn=()=> {
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const { googleSigin, signInUser } = UseAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const handleGoogleSignIn= async () => {
    setGoogleLoading(true);
    try {
      const googleUser = await  googleSigin(); 

      const user = {
        name: googleUser.user.displayName,
        email: googleUser.user.email,
        photo: googleUser.user.photoURL,
        role: "user",
      };

      const response = await axiosPublic.post("/google-signin", user);

      if (response.data.status === "login") {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Login successful!",
          showConfirmButton: false,
          timer: 2000,
        });
      } else if (response.data.status === "signup") {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "SignUp successful!",
          showConfirmButton: false,
          timer: 2000,
        });
      }

      navigate("/");
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: error.message || "Something went wrong with Google Sign-In!",
        showConfirmButton: true,
      });
    } finally {
      setGoogleLoading(false);
    }
  };


  const {
reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;
    setLoading(true)
    
    signInUser(email, password)
      .then(result => {
        if (result) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Login Successfully",
            showConfirmButton: false,
            timer: 1500
          });
          reset();
          navigate("/");
        }
      })
      .catch(err => {
        Swal.fire({
          position: "top-center",
          icon: "error",
          title: "Login Failed",
          text: err.message,
          showConfirmButton: false,
          timer: 1500
        });
      });
      
    setLoading(false)
  };

  return (
    <div className="flex flex-col max-w-lg p-8 mx-auto mt-10 bg-white rounded-lg shadow-lg">
      <div className="mb-4 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Sign In</h1>
        <p className="text-gray-600 text-sm">Access your account</p>
      </div>

      <button
        className="flex items-center justify-center w-full p-2 mb-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors"
        onClick={handleGoogleSignIn}
        disabled={googleLoading}
      >
        {googleLoading ? (
          <ImSpinner8 className="animate-spin text-xl mr-2" />
        ) : (
          <FcGoogle className="text-xl mr-2" />
        )}
        {googleLoading ? "Signing in with Google..." : "Continue with Google"}
      </button>

      <div className="relative mb-2 text-center">
        <span className="bg-white px-2 text-gray-600 text-sm">or sign in with email</span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-1">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            {...register("email", { required: true, minLength: 6 })}
            id="email"
            placeholder="Enter your email"
            className="w-full px-4 py-1 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#6b9080] focus:outline-none"
          />
          {errors.email && <span className="text-sm text-red-500">Valid email is required</span>}
        </div>

        <div className="space-y-1">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            {...register("password", {
              required: true,
              minLength: 6,
              maxLength: 12,
              pattern: /([A-Z][a-z][0-9])/,
            })}
            id="password"
            placeholder="Enter your password"
            className="w-full px-4 py-1 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#6b9080] focus:outline-none"
          />
          {errors.password?.type === "required" && <span className="text-sm text-red-500">Password is required</span>}
          {errors.password?.type === "minLength" && <span className="text-sm text-red-500">Password must be at least 6 characters</span>}
          {errors.password?.type === "maxLength" && <span className="text-sm text-red-500">Password must be under 12 characters</span>}
          {errors.password?.type === "pattern" && <span className="text-sm text-red-500">Password must contain at least one uppercase letter, one lowercase letter, and one number</span>}
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center p-2 text-sm font-medium text-white bg-[#6b9080] rounded-md shadow-md hover:bg-blue-600 transition-colors"
          disabled={loading}
        >
          {loading ? <ImSpinner8 className="animate-spin text-lg mr-2" /> : null}
          {loading ? "Signing..." : "Sign In"}
        </button>
      </form>

      <p className="text-center mt-6 text-sm text-gray-600">
        Don’t have an account?{" "}
        <Link to="/signup" className="text-[#6b9080] hover:underline">
          Sign Up
        </Link>
      </p>
    </div>
  );
}

export default SignIn;
