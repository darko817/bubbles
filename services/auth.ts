import { User } from "@/types";

const API_BASE_URL = "https://api.com"; 

interface AuthResponse {
  user: User;
  token: string;
}

export const logIn = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      const message = data.message || "Login failed. Please try again.";
      throw new Error(message);
    }

    return {
      user: data.user,
      token: data.token,
    };
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong while logging in.");
  }
};

export const signUp = async (
    name: string,
    surname: string,
    phoneNumber: string,
    email: string,
    password: string
  ): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name,
        surname,
        phoneNumber,
        email,
        password,
      }),
    });
  
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }
  
  };

  /* const handleSignUp = async () => {
  const formData = { name, surname, phoneNumber, email, password };

  try {
    signUpSchema.parse(formData);
    setErrors({});

    if (!isAgreed) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        agreement: "You must agree to the privacy policy.",
      }));
      return;
    }

    await signUp(name, surname, phoneNumber, email, password);
    router.push("/(auth)/login"); // Or show a success modal/toast
  } catch (error) {
    if (error instanceof z.ZodError) {
      const newErrors: { [key: string]: string } = {};
      error.errors.forEach((err) => {
        newErrors[err.path[0]] = err.message;
      });
      setErrors(newErrors);
    } else {
      console.error("Signup error:", error);
      alert(error.message || "Something went wrong");
    }
  }
};
 */