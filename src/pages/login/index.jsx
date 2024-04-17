import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { LoginDetails, loginValidateSchema } from "../../utiles/validation";


const Login = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: loginValidateSchema,
    onSubmit: async (values) => {
      console.log(values);
      // Handle form submission logic here
    },
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection:{xs:"column" ,md:"row"},
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundImage: "linear-gradient(to left, lightblue, pink)",
      }}
    >
      <Box sx={{display:{xs:"none",md:"block"}}}>
        <img src="images/bgimage.png" width="100%" alt="image" />
      </Box>
      <Box
        sx={{
          borderRadius: "10px",
          p: 2,
          width: "100%",
          maxWidth: "500px",
          backgroundImage:
            "linear-gradient(to right bottom, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.2))",
        }}
      >
        <form onSubmit={formik.handleSubmit}>
        <Box sx={{display:{xs:"block",md:"none"}}}>
        <img src="images/bgimage.png" width="50%" alt="image" />
      </Box>
          <Typography variant="h4" align="center">Login</Typography>
          {LoginDetails.map((e,i)=>(
            <TextField
            key={i}
            id={e.id}
            label={e.label}
            variant="outlined"
            sx={{ width: "100%" }}
            margin="normal"
            value={formik.values[e.id]}
            onChange={formik.handleChange}
            error={formik.touched[e.id] && Boolean(formik.errors[e.id])}
            helperText={formik.touched[e.id] && formik.errors[e.id]}
          />
          ))}
          
          <Box sx={{ textAlign: "center", my: 1 }}>
            <Button variant="contained" sx={{ bgcolor: "#417BF9" }} type="submit">
              Login
            </Button>
          </Box>
          <Typography variant="body2" align="center">Doesn't Have Account? Register Here</Typography>
        </form>
      </Box>
      
    </Box>
  );
};

export default Login;
