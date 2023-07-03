import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FacebookRounded from "@mui/icons-material/FacebookRounded";
import Google from "@mui/icons-material/Google";
import Apple from "@mui/icons-material/Apple";
import { useEffect, useState } from "react";
import { Button, TextInput } from "../../component";
import { api } from "../../utils/api";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useAuthDispatch } from "../../context/auth.context";
import { Snackbar } from "@mui/material";
import React from "react";
import { useSession, signOut } from "next-auth/react";

const Form = () => {
  const { data: session } = useSession();
  const authDispatch = useAuthDispatch();
  console.log("resp>>", session);

  useEffect(() => {
    if (session) {
      console.log("Sign-in error", session);
      if (session?.error) {
        console.log("Sign-in error", session);
      } else {
        const userInfo = session?.token;
        console.log("User info", userInfo);
        if (userInfo) {
          if (userInfo.picture.includes("google")) {
            console.log("Google sign-in SUCCESS", userInfo);
            api
              .socialAuth({
                ...userInfo,
                firstName: userInfo.name,
                image: userInfo.picture,
                email: userInfo.email,
                socialId: userInfo.sub,
                authType: "google",
              })
              .then((res) => {
                console.log("Google sign-in SUCCESS", res);
                authDispatch({ type: "LOGIN", payload: res });
                router.push("./");
              })
              .catch(() => {
                console.log("API error");
              });
          } else if (userInfo.picture.includes("fbsbx")) {
            console.log("Facebook sign-in SUCCESS", userInfo);
            api
              .socialAuth({
                ...userInfo,
                firstName: userInfo.name,
                image: userInfo.picture,
                email: userInfo.email,
                socialId: userInfo.sub,
                authType: "facebook",
              })
              .then((res) => {
                console.log("Facebook sign-in SUCCESS", res);
                authDispatch({ type: "LOGIN", payload: res });
                router.push("./");
              })
              .catch(() => {
                console.log("API error");
              });
          }
        }
      }
    }
  }, [session]);

  const router = useRouter();
  const [info, setInfo] = useState({});
  const [display, setDisplay] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmitSigInForm = () => {
    if (info && info.email && info.password) {
      api
        .userLogin(info)
        .then((res) => {
          authDispatch({ type: "LOGIN", payload: res });
          router.push("./");
        })
        .catch((err) => {
          setMessage("InValid email or Password");
          setDisplay(true);
        });
    } else {
      setMessage("please check your fields");
      setDisplay(true);
    }
  };
  const handleSignInWithGoogle = () => {
    signIn("google");
  };

  const handleSignInWithFacebook = () => {
    signIn("facebook");
  };
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={display}
        onClose={() => {
          setDisplay(false);
        }}
        ContentProps={{
          "aria-describedby": "message-id",
        }}
        message={<span id="message-id">{message}</span>}
      />
      <TextInput
        onChange={(e) => {
          setInfo({ ...info, email: e.target.value });
        }}
        alignItems="flex-start"
        id="email/phone"
        label="email/phone"
        size="small"
      />

      <TextInput
        onChange={(e) => {
          setInfo({ ...info, password: e.target.value });
        }}
        alignItems="flex-start"
        id="password"
        label="password"
        size="small"
        type="password"
      />
      <Button
        onClick={() => {
          handleSubmitSigInForm();
        }}
        title="SIGN IN"
        width="80%"
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          width: "80%",
          marginY: 3,
        }}
      >
        <div
          style={{
            height: 1,
            width: "25%",
            backgroundColor: "#000",
          }}
        />
        <div>or</div>
        <div style={{ height: 1, width: "25%", backgroundColor: "#000" }} />
      </Box>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "80%",
        }}
      >
        <FacebookRounded style={{ color: "#1877F2", fontSize: 30 }} />
        <Button
          onClick={handleSignInWithFacebook}
          title="Continue with Facebook"
          width="85%"
          backgroundColor="#1877F2"
        />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "80%",
        }}
      >
        <Button
          onClick={handleSignInWithGoogle}
          title="Continue with Google"
          width="85%"
          color="#444"
          backgroundColor="#F0F0F0"
        />
        <Google style={{ color: "#FE2B25", fontSize: 30 }} />
      </div>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          width: "80%",
          marginY: 2,
        }}
      >
        <div
          style={{
            width: "50%",
          }}
        >
          Do You Have An Account?
        </div>
        <div style={{ height: 30, width: 1, backgroundColor: "#000" }} />
        <div
          onClick={() => {
            router.push("./signup");
          }}
          style={{ width: "40%", cursor: "pointer" }}
        >
          Sign Up
        </div>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          width: "80%",
          marginY: 2,
        }}
      >
        <div
          style={{
            width: "50%",
            cursor: "pointer",
          }}
          onClick={() => {
            router.push("./resetPass");
          }}
        >
          Forgot Password?
        </div>
        <div style={{ height: 30, width: 1, backgroundColor: "#000" }} />
        <div
          style={{ width: "40%", cursor: "pointer" }}
          onClick={() => {
            router.push("./resetPass");
          }}
        >
          Reset Password
        </div>
      </Box>
    </div>
  );
};
export default Form;
