import React, { useEffect } from "react";
import { Box, CircularProgress, Stack, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { LoginDetails, loginValidateSchema } from "../../utiles/validation";
import { Link, useNavigate } from "react-router-dom";
import ButtonComponent from "../../components/button";
import {toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { instance } from "../../axiosInstance/instance";

const Login = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = React.useState(false);
  const initialValues = {
    emailAddress: "",
    password: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: loginValidateSchema,
    onSubmit: async (values) => {
      console.log(values);
      setLoader(true)
      try {
        const response = await instance.post("/api/user/login",values);

        if(response.status){
          toast.success("Login Successfully", {
            position: "top-right",
            autoClose: 5000,
          });
          localStorage.setItem('token',response.data.user.token);
          formik.resetForm();
          navigate("/dashboard");
        }
        else{
          toast.error(response.message, {
            position: "top-right",
            autoClose: 5000,
          });
          setLoader(false)
        }
       
        console.log("Success:", response);
      } catch (error) {
        console.error("Error:", error);
        setLoader(false)
        toast.error("Server Issue", {
          position: "top-right",
          autoClose: 5000,
        });
      }
    },
  });
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, []);
  return (

        <Stack
          sx={{
            // backgroundImage:
            //   "linear-gradient(to right bottom, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.2))",
            justifyContent: "center",
            width: "100%",
            //boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px",

            // width: "100%",
          }}
        >
          <form
            style={{
              // width: "100%",
              // height: "100%",
              borderRadius: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(255, 255, 255, 0.50)",
              backdropFilter: "blur(15px)",
              border: "2px solid rgba(255, 255, 255, 0.1)",
            }}
            onSubmit={formik.handleSubmit}
          >
            <Stack
              spacing={2}
              sx={{ alignItems: "center", width: "100%", p: 4 }}
            >
              <Box
                sx={{
                  display: { xs: "flex", md: "none", justifyContent: "center" },
                }}
              >
                <img src="images/bgimage.png" width="50%" alt="image" />
              </Box>
              <Typography
                variant="h4"
                align="center"
                sx={{ fontSize: "calc(20px + 2vmin)", fontWeight: 600 }}
              >
                Login
              </Typography>
              {LoginDetails.map((e, i) => (
                <Stack sx={{ width: "100%" }} key={i}>
                  <Typography variant="body2" mb={1} sx={{ fontWeight: 600 }}>
                    {e.label}
                  </Typography>
                  <TextField
                    type={e.type}
                    id={e.id}
                    placeholder={`Enter ${e.label}`}
                    variant="outlined"
                    sx={{ width: "100%" }}
                    value={formik.values[e.id]}
                    onChange={formik.handleChange}
                    error={formik.touched[e.id] && Boolean(formik.errors[e.id])}
                    helperText={formik.touched[e.id] && formik.errors[e.id]}
                  />
                </Stack>
              ))}
              <Link to="/reset-password" style={{ textDecoration: "none" }}>
                <Typography variant="body2" align="center">
                  {" "}
                  Forgot Password
                </Typography>
              </Link>

              <ButtonComponent text={loader ? (
                  <CircularProgress size={"1.5rem"} color="inherit" />
                ) : (
                  "Login"
                )} />

              <Typography variant="body2" align="center">
                {" "}
                Don&apos;t have an account?{" "}
                <Link to="/register" style={{ textDecoration: "none" }}>
                  Register Here
                </Link>
              </Typography>
            </Stack>
          </form>
        </Stack>

  );
};

export default Login;
