import React from "react";
import {
  Box,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import {
  RegisterDetails,
  registerValidateSchema,
} from "../../utiles/validation";
import { Link, useNavigate } from "react-router-dom";
import {toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ButtonComponent from "../../components/button";
import { instance } from "../../axiosInstance/instance";

const Register = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = React.useState(false);

  const initialValues = {
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
    confirm_Password: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: registerValidateSchema,
    onSubmit: async (values) => {
      console.log(values);
      setLoader(true);
      try {
        const response = await instance.post(
          "/api/user/register",values);
        if (response.status) {
          toast.success("Register Successfully", {
            position: "top-right",
            autoClose: 5000,
          });
          formik.resetForm();
          navigate("/");
        } else {
          toast.error(response.message, {
            position: "top-right",
            autoClose: 5000,
          });
          setLoader(false);
        }

        console.log("Success:", response);
      } catch (error) {
        console.error("Error:", error);
        setLoader(false);
        toast.error("Server Issue", {
          position: "top-right",
          autoClose: 5000,
        });
      }
    },
  });

  return (
    <Stack
      sx={{
        borderRadius: "20px",
        // backgroundImage:
        //   "linear-gradient(to right bottom, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.2))",
        width: "100%",
        justifyContent: "center",
        // boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px",
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
        <Stack spacing={2} sx={{ alignItems: "center", width: "100%", p: 4 }}>
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
            Register
          </Typography>
          {RegisterDetails.map((e, i) => (
            <Stack sx={{ width: "100%" }} key={i}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {e.label}
              </Typography>
              <TextField
                type={e.type}
                key={i}
                placeholder={`Enter ${e.label}`}
                id={e.id}
                variant="outlined"
                sx={{ width: "100%" }}
                value={formik.values[e.id]}
                onChange={formik.handleChange}
                error={formik.touched[e.id] && Boolean(formik.errors[e.id])}
                helperText={formik.touched[e.id] && formik.errors[e.id]}
              />
            </Stack>
          ))}

          <ButtonComponent
            text={
              loader ? (
                <CircularProgress size={"1.5rem"} color="inherit" />
              ) : (
                "Register"
              )
            }
          />

          <Typography variant="body2" align="center">
            {" "}
            Already Have Account?{" "}
            <Link to="/" style={{ textDecoration: "none" }}>
              {" "}
              Login Here
            </Link>
          </Typography>
        </Stack>
      </form>
    </Stack>
  );
};

export default Register;
