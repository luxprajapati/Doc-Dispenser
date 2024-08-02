import { setLoading, setToken } from "../../redux/slices/authSlice";
import { endpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import toast from "react-hot-toast";

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSWORDTOKEN_API,
  RESETPASSWORD_API,
  CHANGEPASSWORD_API,
} = endpoints;

export function sentotp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      });

      console.log("SENDOTP_API RESPONSE...............", response);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
    } catch (err) {
      console.log("SENDOTP_API ERROR..................", err);
      toast.error("Failed to Send OTP");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function signup(
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
      });

      console.log("SIGNUP_API RESPONSE...............", response);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Signup Successful");
      navigate("/login");
    } catch (err) {
      console.log("SIGNUP_API ERROR..................", err);
      toast.error("Failed to Signup");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });
      console.log("LOGIN_API RESPONSE...............", response);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Login Successful");
      dispatch(setToken(response.data.token));
      localStorage.setItem("token", JSON.stringify(response.data.token));
      navigate("/dashboard");
    } catch (err) {
      console.log("LOGIN_API ERROR..................", err);
      toast.error("Failed to Login");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null));
    localStorage.removeItem("token");
    toast.success("Logged Out");
    navigate("/");
  };
}

export function getPasswordToken(email, setEmailSent) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", RESETPASSWORDTOKEN_API, {
        email,
      });
      console.log("RESETPASSWORDTOKEN_API RESPONSE...............", response);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Reset Password Link sent to your email");
      setEmailSent(true);
    } catch (err) {
      console.log("RESETPASSWORDTOKEN_API ERROR..................", err);
      toast.error("Failed to Send Reset Password Token");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function resetPassword(password, confirmPassword, token) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", RESETPASSWORD_API, {
        password,
        confirmPassword,
        token,
      });
      console.log("RESETPASSWORD_API RESPONSE...............", response);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Password Reset Successful");
    } catch (err) {
      console.log("RESETPASSWORD_API ERROR..................", err);
      toast.error("Failed to Reset Password");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export async function changePassword(token, formData) {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", CHANGEPASSWORD_API, formData, {
      Authorization: `Bearer ${token}`,
    });
    console.log("CHANGEPASSWORD_API RESPONSE...............", response);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    toast.success("Password Changed Successfully");
  } catch (err) {
    console.log("CHANGEPASSWORD_API ERROR..................", err);
    toast.error("Failed to Change Password");
  }
  toast.dismiss(toastId);
}
