"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";

import { AuthForm } from "@/components/custom/auth-form";
import Header from "@/components/custom/Header";
import { SubmitButton } from "@/components/custom/submit-button";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { login, register, type LoginActionState, type RegisterActionState } from "../actions";

export default function AuthPage() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [loginState, setLoginState] = useState<LoginActionState>({ status: "idle" });
  const [registerState, setRegisterState] = useState<RegisterActionState>({ status: "idle" });

  const state = authMode === "login" ? loginState : registerState;

  const toggleDarkMode = () => setDarkMode(!darkMode);

  useEffect(() => {
    if (state.status === "success") {
      toast.success(authMode === "login" ? "Logged in successfully" : "Account created successfully");
      router.push("/");
    } else if (state.status === "failed") {
      setIsLoading(false);
      toast.error(authMode === "login" ? "Invalid credentials" : "Failed to create account");
    } else if (state.status === "invalid_data") {
      setIsLoading(false);
      toast.error("Invalid data submitted");
    } else if (state.status === "user_exists") {
      setIsLoading(false);
      toast.error("Account already exists");
    }
  }, [state.status, authMode, router]);

  const handleLogin = async (formData: FormData) => {
    setLoginState({ status: "in_progress" });
    try {
      const result = await login({ status: "idle" }, formData);
      setLoginState(result);
    } catch {
      setLoginState({ status: "failed" });
    }
  };

  const handleRegister = async (formData: FormData) => {
    setRegisterState({ status: "in_progress" });
    try {
      const result = await register({ status: "idle" }, formData);
      setRegisterState(result);
    } catch {
      setRegisterState({ status: "failed" });
    }
  };

  const handleSubmit = async (formData: FormData) => {
    setEmail(formData.get("email") as string);
    setIsLoading(true);

    if (authMode === "login") {
      await handleLogin(formData);
    } else {
      await handleRegister(formData);
    }
  };

  const handleGuestSignup = async () => {
    try {
      setIsLoading(true);
      const guestEmail = `guest_${Date.now()}@guestmeteorlinker.com`;
      const guestPassword = `guest_${Date.now()}`;

      const formData = new FormData();
      formData.append("email", guestEmail);
      formData.append("password", guestPassword);

      await handleRegister(formData);
    } catch (error) {
      setIsLoading(false);
      toast.error("Failed to sign up as guest");
    }
  };

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <main className="relative min-h-screen flex flex-col items-center justify-center text-white dark:bg-gray-900 dark:text-gray-100">
        <Header />
        <button
          onClick={toggleDarkMode}
          className="absolute top-4 right-4 px-4 py-2 rounded-md bg-gray-800 text-white dark:bg-gray-200 dark:text-black"
        >
          Toggle {darkMode ? "Light" : "Dark"} Mode
        </button>

        <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-black dark:text-gray-100">
            Meteor Linker
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-2xl text-[#718096] dark:text-gray-400">
            Your AI Assistant that will book your flights and help you choose your flight destinations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Button
              className="rounded-3xl border border-b-4 p-6 px-9 border-[#444545] text-white bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-700 dark:hover:bg-indigo-600"
              onClick={() => {
                setAuthMode("register");
                setShowAuthModal(true);
              }}
              disabled={isLoading}
            >
              Sign Up
            </Button>
            <Button
              className="rounded-3xl border border-b-4 p-6 px-9 border-[#444545] text-black bg-white hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
              onClick={() => {
                setAuthMode("login");
                setShowAuthModal(true);
              }}
              disabled={isLoading}
            >
              Log In
            </Button>
          </div>
          <Button
            className="text-black underline bg-transparent dark:text-gray-400 hover:bg-transparent"
            onClick={handleGuestSignup}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Continue as Guest"}
          </Button>
        </div>

        <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
          <DialogContent className="sm:max-w-md dark:bg-gray-800 dark:text-gray-100">
            <DialogHeader>
              <DialogTitle>
                {authMode === "login" ? "Sign In" : "Sign Up"}
              </DialogTitle>
            </DialogHeader>
            <AuthForm action={handleSubmit} defaultEmail={email}>
              <SubmitButton>
                {authMode === "login" ? "Sign in" : "Sign up"}
              </SubmitButton>
              <p className="text-center text-sm text-gray-600 mt-4 dark:text-gray-400">
                {authMode === "login"
                  ? "Don't have an account? "
                  : "Already have an account? "}
                <button
                  type="button"
                  onClick={() =>
                    setAuthMode(authMode === "login" ? "register" : "login")
                  }
                  className="font-semibold text-gray-800 dark:text-gray-200 hover:underline"
                  disabled={isLoading}
                >
                  {authMode === "login" ? "Sign up" : "Sign in"}
                </button>
                {authMode === "login" ? " for free." : " instead."}
              </p>
            </AuthForm>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}

