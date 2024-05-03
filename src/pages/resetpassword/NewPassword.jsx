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
  ResetPasswordDetails,
  resetPasswordValidateSchema,
} from "../../utiles/validation";
import { Link, useNavigate } from "react-router-dom";
import ButtonComponent from "../../components/button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { instance } from "../../axiosInstance/instance";

const CreatePassword = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = React.useState(false);

  const initialValues = {
    newPassword: "",
    confirmPassword: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: resetPasswordValidateSchema,
    onSubmit: async (values) => {
      console.log(values);
      setLoader(true);
      try {
        const response = await instance.post(
          `api/user/reset-pwd/${localStorage.getItem(
            "token"
          )}`,values);

        console.log("Success:", response);
        if (response.status) {
          toast.success("Reset Successfully", {
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
      } catch (error) {
        console.error("Error:", error);
      }
    },
  });

  return (
    <Stack
      sx={{
        // borderRadius: "20px",
        // backgroundImage:
        //   "linear-gradient(to right bottom, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.2))",

        justifyContent: "center",
        width: "100%",
        //boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px",
      }}
    >
      <form
        style={{
          //   width: "100%",
          //   height: "100%",
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
            Reset Password
          </Typography>
          {ResetPasswordDetails.map((e, i) => (
            <Stack sx={{ width: "100%" }} key={i}>
              <Typography variant="body2" mb={1} sx={{ fontWeight: 600 }}>
                {e.label}
              </Typography>
              <TextField
                type={e.type}
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
                "Reset"
              )
            }
          />
          <Stack direction="row" sx={{ justifyContent: "space-between" }}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Typography variant="body2" align="center" mx={3}>
                {" "}
                Back to Login
              </Typography>
            </Link>
            <Link to="/register" style={{ textDecoration: "none" }}>
              <Typography variant="body2" align="center">
                {" "}
                Back to Register
              </Typography>
            </Link>
          </Stack>
        </Stack>
      </form>
    </Stack>
  );
};

export default CreatePassword;
