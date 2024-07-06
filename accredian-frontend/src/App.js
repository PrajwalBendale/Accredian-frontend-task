// App.js
import React, { useState } from "react";
//import { Button, Modal, TextField, Typography } from "@material-ui";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  AppBar,
  Box,
  Button,
  Container,
  Modal,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import logo from "./logo.png";
import heroImg from "./hero-image.png";
import { palette } from "@mui/system";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

const App = () => {
  const [open, setOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      referrerName: "",
      referrerEmail: "",
      refereeName: "",
      refereeEmail: "",
      course: "",
    },

    validationSchema: Yup.object({
      referrerName: Yup.string().required("Required"),
      referrerEmail: Yup.string()
        .email("Invalid email address")
        .required("Required"),
      refereeName: Yup.string().required("Required"),
      refereeEmail: Yup.string()
        .email("Invalid email address")
        .required("Required"),
      course: Yup.string().required("Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      //console.log(values);

      // Handle form submission
      try {
        const response = await axios.post(
          //`http://localhost:3010/referral`,
          `https://accredian-backend-task-37od.onrender.com/referral`,
          values
        );
        // console.log(response);
        console.log(response.data.message);

        if (response.status == 200) {
          //formik();
          resetForm();
          setOpen(false);
          toast.success(response.data.message);
        } else {
          toast.error(`${response.data.message}`);
        }
      } catch (error) {
        resetForm();
        setOpen(false);
        toast.error(`${error}`);
        console.log(error);
      }
    },
  });

  return (
    <div>
      <AppBar position="static" color="default">
        <Toolbar>
          <img src={logo} width={"12%"} height={"auto"} alt="Accredian" />
          <div style={{ flexGrow: 1 }}></div>
          <nav>
            <Button color="inherit">Courses</Button>
            <Button color="inherit">Refer & Earn</Button>
            <Button color="inherit">Resources</Button>
            <Button color="inherit">About Us</Button>
            <Button color="inherit">Login</Button>
            <Button variant="contained" color="primary">
              Try for free
            </Button>
          </nav>
        </Toolbar>
      </AppBar>
      <Container
        sx={{
          mt: 5,
          bgcolor: "#EEF5FF",
          borderRadius: 4,
        }}
      >
        <Grid2 container spacing={2} alignItems="center">
          <Grid2 item xs={12} md={6}>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              height="100%"
              textAlign="center"
            >
              <Typography variant="h2">Let's Learn & Earn</Typography>
              <Typography variant="h5" component="p" gutterBottom>
                Get a chance to win up-to{" "}
                <span style={{ color: "#1A73E8" }}>Rs. 15,000</span>
              </Typography>

              <Button
                variant="contained"
                color="primary"
                onClick={() => setOpen(true)}
              >
                Refer Now
              </Button>
            </Box>
          </Grid2>
          <Grid2 item xs={12} md={6}>
            <div>
              <img
                src={heroImg}
                width={"100%"}
                height={"auto"}
                alt="Accredian"
              />
            </div>
          </Grid2>
        </Grid2>
      </Container>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div>
          <form onSubmit={formik.handleSubmit}>
            <Container
              sx={{
                zIndex: "modal",
                bgcolor: "#fff",
                display: "flex",
                flexDirection: "column",
              }}
              fixed
            >
              <Typography variant="h4">
                Please submit details for Refer
              </Typography>
              <TextField
                label="Referrer Name"
                name="referrerName"
                onChange={formik.handleChange}
                value={formik.values.referrerName}
                error={
                  formik.touched.referrerName &&
                  Boolean(formik.errors.referrerName)
                }
                helperText={
                  formik.touched.referrerName && formik.errors.referrerName
                }
                sx={{ m: 1 }}
              />
              <TextField
                label="Referrer Email"
                name="referrerEmail"
                onChange={formik.handleChange}
                value={formik.values.referrerEmail}
                error={
                  formik.touched.referrerEmail &&
                  Boolean(formik.errors.referrerEmail)
                }
                helperText={
                  formik.touched.referrerEmail && formik.errors.referrerEmail
                }
                sx={{ m: 1 }}
              />
              <TextField
                label="Referee Name"
                name="refereeName"
                onChange={formik.handleChange}
                value={formik.values.refereeName}
                error={
                  formik.touched.refereeName &&
                  Boolean(formik.errors.refereeName)
                }
                helperText={
                  formik.touched.refereeName && formik.errors.refereeName
                }
                sx={{ m: 1 }}
              />
              <TextField
                label="Referee Email"
                name="refereeEmail"
                onChange={formik.handleChange}
                value={formik.values.refereeEmail}
                error={
                  formik.touched.refereeEmail &&
                  Boolean(formik.errors.refereeEmail)
                }
                helperText={
                  formik.touched.refereeEmail && formik.errors.refereeEmail
                }
                sx={{ m: 1 }}
              />
              <TextField
                label="Course"
                name="course"
                onChange={formik.handleChange}
                value={formik.values.course}
                error={formik.touched.course && Boolean(formik.errors.course)}
                helperText={formik.touched.course && formik.errors.course}
                sx={{ m: 1 }}
              />
              <Button
                type="submit"
                variant="contained"
                endIcon={<SendIcon />}
                color="primary"
                sx={{ m: 1 }}
                size="medium"
              >
                Submit
              </Button>
            </Container>
          </form>
        </div>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default App;
