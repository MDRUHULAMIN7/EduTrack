import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Swal from "sweetalert2";
import UseAuth from "../../Hooks/UseAuth";
import { FcGoogle } from "react-icons/fc";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { ImSpinner8 } from "react-icons/im";

const SignUp = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [photo, setPhoto] = useState("");
  const { createUser, updateuserprofile, googleSigin } = UseAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const cloudinary_api = import.meta.env.VITE_Cloudinary_API_KEY; 
  const upload_preset = "bycj1ok9"
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

      const onSubmit = async (data) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", data.photo[0]);
    formData.append("upload_preset", upload_preset);

    try {
    
      const res = await fetch(cloudinary_api, {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      const { email, password, name } = data;
      const photoUrl = result.secure_url;
      setPhoto(photoUrl);

     
      await createUser(email, password);
      await updateuserprofile(name, photoUrl);

     
      const newUser = { name, email, photo: photoUrl, role: "user" };

     
      const response = await axiosPublic.post("/users", newUser);

      if (response.data.message === "user already exist !") {
        Swal.fire({
          position: "top-center",
          icon: "warning",
          title: "User already exists!",
          showConfirmButton: true,
        });
      } else {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "SignUp Successfully !",
          showConfirmButton: false,
          timer: 2000,
        });
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: "Something went wrong!",
        showConfirmButton: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setGoogleLoading(true);
    try {
      const googleUser = await googleSigin(); 

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

  return (
    <div className="flex flex-col max-w-lg p-10 mx-auto mt-10 bg-white rounded-lg shadow-lg">
      <div className="mb-4 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Sign Up</h1>
        <p className="text-gray-600 text-xs">Create your account to get started</p>
      </div>

      <button
        className="flex items-center justify-center w-full p-2 mb-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors"
        onClick={() => handleGoogleSignUp()}
        disabled={googleLoading}
      >
        {googleLoading ? (
          <ImSpinner8 className="animate-spin text-xl mr-2" />
        ) : (
          <FcGoogle className="text-xl mr-2" />
        )}
        {googleLoading ? "Signing in..." : "Continue with Google"}
      </button>

      <div className="relative mb-2 text-center">
        <span className="bg-white px-2 text-gray-600 text-sm">or sign up with email</span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <div className="space-y-1">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            id="name"
            placeholder="Enter your name"
            className="w-full px-4 py-1 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#6b9080] focus:outline-none"
          />
          {errors.name && <span className="text-sm text-red-500">Name is required</span>}
        </div>

        <div className="space-y-1">
          <label htmlFor="photo" className="block text-sm font-medium text-gray-700">Profile Photo</label>
          <input
            type="file"
            {...register("photo", { required: true })}
            id="photo"
            className="w-full px-4 py-1 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#6b9080] focus:outline-none"
          />
          {photo && <p className="text-sm text-gray-500 mt-2">{photo.slice(0, 30)}</p>}
          {errors.photo && <span className="text-sm text-red-500">Photo is required</span>}
        </div>

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
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>

      <p className="text-center mt-6 text-sm text-gray-600">
        Already have an account? <Link to="/signin" className="text-[#6b9080] hover:underline">SignIn</Link>
      </p>
    </div>
  );
};

export default SignUp;
