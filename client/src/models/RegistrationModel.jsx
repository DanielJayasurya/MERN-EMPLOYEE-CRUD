import {
  Backdrop,
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  MenuItem,
  Modal,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
import apiController from "../apiController";
import CustomAlerts from "../components/CustomAlert";

function RegistrationModel({
  open,
  onClose,
  fetchRegistrations,
  editingRegistration,
}) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    qualification: "select",
    gender: "select",
    location: "",
    job_title: "select",
    employee_id: "",
  });

  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSuccessAlertClose = () => {
    setShowSuccessMessage(false);
  };

  const handleErrorAlertClose = () => {
    setShowErrorMessage(false);
  };

  useEffect(() => {
    if (editingRegistration) {
      setFormData({
        firstName: editingRegistration.firstName,
        lastName: editingRegistration.lastName,
        phoneNumber: editingRegistration.phoneNumber,
        email: editingRegistration.email,
        qualification: editingRegistration.qualification,
        gender: editingRegistration.gender,
        location: editingRegistration.location,
        job_title: editingRegistration.job_title,
        employee_id: editingRegistration.employee_id,
      });
    }
  }, [editingRegistration]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };
  const handleSelectChange = (fieldName) => (e) => {
    setFormData({ ...formData, [fieldName]: e.target.value });
    setErrors({ ...errors, [fieldName]: "" });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (!/^[A-Za-z]{1,20}$/.test(formData.firstName.trim())) {
      newErrors.firstName = "Only characters are allowed";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (!/^[A-Za-z]{1,20}$/.test(formData.lastName.trim())) {
      newErrors.lastName = "Only characters are allowed";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.phoneNumber.trim())) {
      newErrors.phoneNumber = "Invalid phone number";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (formData.qualification === "select") {
      newErrors.qualification = "Qualification is required";
    }

    if (formData.gender === "select") {
      newErrors.gender = "Gender is required";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    } else if (!/^[A-Za-z ]{1,25}$/.test(formData.location.trim())) {
      newErrors.location = "Only characters are allowed up to 25";
    }
    if (!formData.employee_id.trim()) {
      newErrors.employee_id = "Employee ID is required";
    }

    if (formData.job_title === "select") {
      newErrors.job_title = "Job Title is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      if (editingRegistration) {
        const response = await apiController.put(
          `/registrations/${editingRegistration._id}`,
          formData
        );
        console.log(response);
      } else {
        const response = await apiController.post("/registrations", formData);
        console.log(response.data);
      }
      fetchRegistrations();
      setFormData({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        qualification: "select",
        gender: "select",
        location: "",
        job_title: "select",
        employee_id: "",
      });
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        onClose();
      }, 1000);
    } catch (error) {
      const errorMessage = error.message || "An error occurred";
      setErrorMessage(errorMessage);
      setShowErrorMessage(true);
      console.error("Error submitting registration:", error);
    }
  };

  const handleClose = () => {
      onClose();
      setErrors({});
      setFormData({});
  };

  const job_title = [
    { value: "select", label: "--select one--" },
    { value: "Software Developer", label: "Software Developer" },
    { value: "MERN Stack Developer", label: "MERN Stack Developer" },
    { value: "Frontend Developer", label: "Frontend Developer" },
    { value: "Backend Developer", label: "Backend Developer" },
    { value: "Full Stack Developer", label: "Full Stack Developer" },
  ];

  const qualificationOptions = [
    { value: "select", label: "-- select one --" },
    { value: "No formal education", label: "No formal education" },
    { value: "Primary education", label: "Primary education" },
    { value: "Secondary education", label: "Secondary education" },
    { value: "Bachelor's degree", label: "Bachelor's degree" },
    { value: "Master's degree", label: "Master's degree" },
    { value: "others", label: "Others" },
  ];

  const genderOptions = [
    { value: "select", label: "-- select one --" },
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "others", label: "Others" },
  ];

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Backdrop
          open={open}
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <Paper
            style={{
              maxWidth: "850px",
              minHeight: "32rem",
              margin: "5%",
              borderRadius: "10px",
            }}
          >
            <Grid container>
              <Grid
                item
                sx={{ display: "flex", padding: "15px 33px 8px 15px" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "3%",
                  }}
                >
                  <FaAngleDoubleRight size={25} style={{ color: "#0056CE" }} />
                  <Typography
                    style={{ whiteSpace: "nowrap", fontFamily: "poppins" }}
                  >
                    {editingRegistration
                      ? "Edit Employee Details"
                      : "Add Employee"}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <hr />
            <form>
              <Grid container>
                <Grid
                  item
                  xs={12}
                  style={{
                    display: "flex",
                    gap: "4%",
                    padding: "10px 20px 0px 20px",
                  }}
                >
                  <Grid item xs={12}>
                    <Typography
                      style={{
                        fontSize: "15px",
                        fontFamily: "poppins",
                        color: "#000000",
                      }}
                    >
                      First name<span className="error">*</span>
                    </Typography>
                    <TextField
                      size="small"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      fullWidth
                      inputProps={{
                        style: { fontFamily: "poppins" },
                      }}
                    />
                    {errors.firstName && (
                      <Typography
                        style={{ fontSize: "15px", fontFamily: "poppins" }}
                        color="error"
                      >
                        {errors.firstName}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      style={{
                        fontSize: "15px",
                        fontFamily: "poppins",
                        color: "#000000",
                      }}
                    >
                      Last Name<span className="error">*</span>
                    </Typography>
                    <TextField
                      size="small"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      fullWidth
                      inputProps={{
                        style: { fontFamily: "poppins" },
                      }}
                    />
                    {errors.lastName && (
                      <Typography
                        style={{ fontSize: "15px", fontFamily: "poppins" }}
                        color="error"
                      >
                        {errors.lastName}
                      </Typography>
                    )}
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{
                    display: "flex",
                    gap: "4%",
                    padding: "10px 20px 0px 20px",
                  }}
                >
                  <Grid item xs={12} lg={6}>
                    <Typography
                      style={{
                        fontSize: "15px",
                        fontFamily: "poppins",
                        color: "#000000",
                      }}
                    >
                      Phone Number<span className="error">*</span>
                    </Typography>
                    <TextField
                      size="small"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      fullWidth
                      inputProps={{
                        style: { fontFamily: "poppins" },
                      }}
                    />
                    {errors.phoneNumber && (
                      <Typography
                        style={{ fontSize: "15px", fontFamily: "poppins" }}
                        color="error"
                      >
                        {errors.phoneNumber}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Typography
                      style={{
                        fontSize: "15px",
                        fontFamily: "poppins",
                        color: "#000000",
                      }}
                    >
                      Email<span className="error">*</span>
                    </Typography>
                    <TextField
                      size="small"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      fullWidth
                      inputProps={{
                        style: { fontFamily: "poppins" },
                      }}
                    />
                    {errors.email && (
                      <Typography
                        style={{ fontSize: "15px", fontFamily: "poppins" }}
                        color="error"
                      >
                        {errors.email}
                      </Typography>
                    )}
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{
                    display: "flex",
                    gap: "4%",
                    padding: "10px 20px 0px 20px",
                  }}
                >
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <FormLabel
                        style={{
                          fontSize: "15px",
                          fontFamily: "poppins",
                          color: "#000000",
                        }}
                      >
                        Qualification
                        <span className="error">*</span>
                      </FormLabel>
                      <Select
                        value={formData.qualification}
                        onChange={handleSelectChange("qualification")}
                        sx={{ height: "40px" }}
                      >
                        {qualificationOptions.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            <Typography style={{ fontFamily: "poppins" }}>
                              {option.label}
                            </Typography>
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.qualification && (
                        <Typography
                          style={{ fontSize: "15px", fontFamily: "poppins" }}
                          color="error"
                        >
                          {errors.qualification}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <FormLabel
                        style={{
                          fontSize: "15px",
                          fontFamily: "poppins",
                          color: "#000000",
                        }}
                      >
                        Gender
                        <span className="error">*</span>
                      </FormLabel>
                      <Select
                        value={formData.gender}
                        onChange={handleSelectChange("gender")}
                        sx={{ height: "40px" }}
                      >
                        {genderOptions.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            <Typography style={{ fontFamily: "poppins" }}>
                              {option.label}
                            </Typography>
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.gender && (
                        <Typography
                          style={{ fontSize: "15px", fontFamily: "poppins" }}
                          color="error"
                        >
                          {errors.gender}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{
                    display: "flex",
                    gap: "4%",
                    padding: "10px 20px 0px 20px",
                  }}
                >
                  <Grid item xs={12}>
                    <Typography
                      style={{
                        fontSize: "15px",
                        fontFamily: "poppins",
                        color: "#000000",
                      }}
                      inputProps={{
                        style: { fontFamily: "poppins" },
                      }}
                    >
                      Location<span className="error">*</span>
                    </Typography>
                    <TextField
                      size="small"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      variant="outlined"
                      fullWidth
                      inputProps={{
                        style: { fontFamily: "poppins" },
                      }}
                    />
                    {errors.location && (
                      <Typography
                        style={{ fontSize: "15px", fontFamily: "poppins" }}
                        color="error"
                      >
                        {errors.location}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      style={{
                        fontSize: "15px",
                        fontFamily: "poppins",
                        color: "#000000",
                      }}
                    >
                      Employee ID<span className="error">*</span>
                    </Typography>
                    <TextField
                      size="small"
                      name="employee_id"
                      value={formData.employee_id}
                      onChange={handleInputChange}
                      variant="outlined"
                      fullWidth
                      inputProps={{
                        style: { fontFamily: "poppins" },
                      }}
                    />
                    {errors.employee_id && (
                      <Typography
                        style={{ fontSize: "15px", fontFamily: "poppins" }}
                        color="error"
                      >
                        {errors.employee_id}
                      </Typography>
                    )}
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{
                    padding: "10px 20px 0px 20px",
                  }}
                >
                  <FormControl fullWidth>
                    <FormLabel
                      style={{
                        fontSize: "15px",
                        fontFamily: "poppins",
                        color: "#000000",
                      }}
                    >
                      Job Title
                      <span className="error">*</span>
                    </FormLabel>
                    <Select
                      fullWidth
                      name="shortlistReason"
                      value={formData.job_title}
                      onChange={handleSelectChange("job_title")}
                      sx={{ height: "40px" }}
                    >
                      {job_title.map((job_title) => (
                        <MenuItem key={job_title.value} value={job_title.value}>
                          <Typography style={{ fontFamily: "poppins" }}>
                            {job_title.label}
                          </Typography>
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.job_title && (
                      <Typography
                        style={{ fontSize: "15px", fontFamily: "poppins" }}
                        color="error"
                      >
                        {errors.job_title}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>
                <CustomAlerts
                  open={showErrorMessage}
                  severity="error"
                  message={errorMessage}
                  handleClose={handleErrorAlertClose}
                />
                <CustomAlerts
                  open={showSuccessMessage}
                  severity="success"
                  message="Successfully Submitted"
                  handleClose={handleSuccessAlertClose}
                />
              </Grid>

              <Grid
                item
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={12}
                align="start"
                mt={0}
              >
                <Box display="flex" m={2}>
                  <Button
                    variant="contained"
                    onClick={handleSubmit}
                    size="medium"
                    id="text-13-500-20-Inter"
                    style={{
                      background: "#0056CE",
                      textTransform: "capitalize",
                      borderRadius: "6px",
                      width: "130px",
                      height: "35px",
                    }}
                  >
                    Submit
                  </Button>
                  <Button
                    variant="contained"
                    size="medium"
                    onClick={handleClose}
                    sx={{
                      ml: 2,
                      background: "#0056CE",
                      textTransform: "capitalize",
                      borderRadius: "6px",
                      width: "130px",
                      height: "35px",
                    }}
                    id="text-13-500-20-Inter"
                  >
                    Cancel
                  </Button>
                </Box>
              </Grid>
            </form>
          </Paper>
        </Backdrop>
      </Modal>
    </>
  );
}

export default RegistrationModel;
