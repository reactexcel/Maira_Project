import React from "react";
import { Box, Button,  TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { RegisterDetails, registerValidateSchema } from "../../utiles/validation";

const Register = () => {
  const initialValues = {
    firstname:'',
    lastname:'',
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: registerValidateSchema,
    onSubmit: async (values) => {
      console.log(values);
      // Handle form submission logic here
    },
  });


  return (
    <Box
      sx={{
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        minHeight: "100vh",
        backgroundImage: "linear-gradient(to left, lightblue, pink)",
      }}
    >
      <Box sx={{ p:3,display: "flex",
        flexDirection:{xs:"column" ,md:"row"},
        justifyContent: "center",
        alignItems: "center",backgroundImage:
"linear-gradient(to right bottom, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.2))",
     }}>
      <Box sx={{display:{xs:"none",md:"block"}}}>
        <img src="images/bgimage.png" height={"800px"} alt="image" />
      </Box>
      <Box
        sx={{
          borderRadius: "20px",
          p: 10,
          minWidth: "300px",
          maxWidth: "800px",
          bgcolor:"white",
          boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px"
          // backgroundImage:
          //   "linear-gradient(to right bottom, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.2))",
        }}
      >
        <form onSubmit={formik.handleSubmit}>
        <Box sx={{display:{xs:"flex",md:"none",justifyContent:"center"}}}>
        <img src="images/bgimage.png" width="50%" alt="image" />
      </Box>
          <Typography variant="h4" align="center">Register</Typography>
          {RegisterDetails.map((e,i)=>(
            <TextField
            type={e.type}
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
          
          <Box sx={{ textAlign: "center", my: 3 }}>
            <Button variant="contained" sx={{ bgcolor: "#417BF9",width:"50%" }} type="submit">
              Register
            </Button>
          </Box>
          <Typography variant="body2" align="center"> Already Have Account? Login Here</Typography>
        </form>
      </Box>
      </Box>
      
    </Box>
  );
};

export default Register;
