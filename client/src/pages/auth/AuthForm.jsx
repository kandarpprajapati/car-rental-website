import { getFormData } from "@/lib/getFormData";
import { useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
  FormSubmit,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { useAuthHook } from "../../hooks/useAuthHook";
import toast from "react-hot-toast";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const [loading, setLoading] = useState(false); // Add loading state

  const { mutateAsync, error, isPending } = useAuthHook();

  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = getFormData(event.target);

    // Check if confirmPassword exists in formData
    if (formData.confirmPassword) {
      // Check if password matches confirmPassword
      if (formData.password !== formData.confirmPassword) {
        toast.error("Password and Confirm Password do not match!");
        return;
      }

      // Call the auth/register API
      await mutateAsync(
        {
          url: "auth/register",
          data: {
            email: formData.email,
            password: formData.password,
            username: formData.email.split("@")[0],
          },
        },
        {
          onSuccess: () => {
            navigate("/");
          },
        }
      );
    } else {
      // Call the auth/login API
      await mutateAsync(
        {
          url: "auth/login",
          data: {
            emailOrUsername: formData.email,
            password: formData.password,
          },
        },
        {
          onSuccess: () => {
            navigate("/");
          },
        }
      );
    }

    setLoading(false);
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const response = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );

        const data = await response.json();

        localStorage.setItem("user", JSON.stringify(data));
        console.log("User Data:", data);

        navigate("/");

        // Here you can handle the user data, e.g., store it in state, context, or local storage.
        // You can also redirect the user to a different page.
      } catch (error) {
        console.error("Error fetching user info:", error);
        // Handle error appropriately, e.g., display an error message to the user.
      }
    },
    onError: (error) => {
      console.error("Login Failed:", error);
      // Handle login error, e.g., display an error message to the user.
    },
  });

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-50 py-10">
      <div className="w-[90%] max-w-[400px] bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-primary-foreground mb-6">
          {isLogin ? "Login" : "Signup"}
        </h1>
        <Form onSubmit={submit}>
          {/* Email */}
          <FormField name="email">
            <FormLabel>Email *</FormLabel>
            <FormControl asChild>
              <Input type="email" placeholder="Enter Email" required />
            </FormControl>
            <FormMessage match="valueMissing" className="text-red-800">
              Please enter your email
            </FormMessage>
            <FormMessage match="typeMismatch" className="text-red-800">
              Please provide a valid email
            </FormMessage>
          </FormField>

          {/* Password */}
          <FormField name="password" className="mt-4">
            <FormLabel>Password *</FormLabel>
            <FormControl asChild>
              <Input type="password" placeholder="Enter Password" required />
            </FormControl>
            <FormMessage match="valueMissing" className="text-red-800">
              Please enter your password
            </FormMessage>
          </FormField>

          {/* Confirm Password (Signup only) */}
          {!isLogin && (
            <FormField name="confirmPassword" className="mt-4">
              <FormLabel>Confirm Password *</FormLabel>
              <FormControl asChild>
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  required
                />
              </FormControl>
              <FormMessage match="valueMissing" className="text-red-800">
                Please confirm your password
              </FormMessage>
            </FormField>
          )}

          {/* Forgot Password (Login only) */}
          {isLogin && (
            <div className="text-right mt-2">
              <a
                href="#"
                className="text-sm text-primary-foreground hover:underline"
              >
                Forgot Password?
              </a>
            </div>
          )}

          {/* Submit Button */}
          <FormSubmit asChild>
            <Button variant="default" className="w-full" loading={loading}>
              {loading
                ? isLogin
                  ? "Logging In..."
                  : "Signing Up..."
                : isLogin
                ? "Login"
                : "Signup"}
            </Button>
          </FormSubmit>

          {/* Google Login Button */}
          <Button
            variant="secondaryoutline"
            className="w-full mt-4 flex justify-center items-center gap-2"
            onClick={googleLogin}
          >
            <img
              src="https://banner2.cleanpng.com/20181108/vqy/kisspng-youtube-google-logo-google-images-google-account-consulting-crm-the-1-recommended-crm-for-g-suite-1713925083723.webp"
              alt="Google Logo"
              className="w-7 h-6"
            />
            Continue with Google
          </Button>

          {/* Toggle between Login and Signup */}
          <div className="text-center mt-4">
            {isLogin ? (
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <button
                  type="button"
                  className="text-primary-foreground hover:underline"
                  onClick={() => setIsLogin(false)}
                >
                  Signup
                </button>
              </p>
            ) : (
              <p className="text-sm text-gray-600">
                Already have an account?
                <button
                  type="button"
                  className="text-primary-foreground hover:underline"
                  onClick={() => setIsLogin(true)}
                >
                  Login
                </button>
              </p>
            )}
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AuthForm;
