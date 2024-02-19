import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { IoMail } from "react-icons/io5";
import { BiArrowToTop } from "react-icons/bi";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoMdExit } from "react-icons/io";
import { FaFileExcel } from "react-icons/fa";
import RegistrationModel from "../models/RegistrationModel";
import apiController from "../apiController";
import * as XLSX from 'xlsx';  

const EmployeeRegistration = () => {
  const [registrations, setRegistrations] = useState([]);
  const [data, setData] = useState([]);
  const [keywordsInputValue, setKeywordsInputValue] = useState("");
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);

  function formatDate(isoDate) {
    const monthNames = [
      "Jan",
      "Feb",
      "March",
      "April",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const monthIndex = date.getMonth();
    const day = date.getDate();
    const monthName = monthNames[monthIndex];
    return ` ${day}-${monthName}-${year}`;
  }

  const handleRegistration = () => {
    setIsRegistrationModalOpen(true);
  };

  const [exitID, setExitId] = useState(null);
  const handleExit = async (id) => {
    setExitId(id);
    setExitConformation(true);
  };

  const handleExitConformation = async () => {
    try {
      await apiController.put(`/registrations/${exitID}/schedule`, {
        status: "Exited From Company",
      });
      fetchRegistrations();
      setExitConformation(false);
    } catch (error) {
      console.error("Error scheduling training:", error);
    }
  };

  const [exitConfirmation, setExitConformation] = useState(false);
  const handleExitDialog = () => {
    setSelectedRegistration(null);
    setExitConformation(false);
  };

  const keywordsFilter = () => {
    const filteredData = data.filter(
      (registration) =>
        registration.firstName
          .toLowerCase()
          .includes(keywordsInputValue.toLowerCase()) ||
        registration.lastName
          .toLowerCase()
          .includes(keywordsInputValue.toLowerCase()) ||
        registration.location
          .toLowerCase()
          .includes(keywordsInputValue.toLowerCase()) ||
        registration.email
          .toLowerCase()
          .includes(keywordsInputValue.toLowerCase()) ||
        registration.status
          .toLowerCase()
          .includes(keywordsInputValue.toLowerCase()) ||
        registration.job_title
          .toLowerCase()
          .includes(keywordsInputValue.toLowerCase())
    );
    setRegistrations(filteredData);
  };

  const fetchRegistrations = async () => {
    try {
      const response = await apiController.get("/registrations");
      setRegistrations(response.data);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching registrations:", error);
    }
  };
  useEffect(() => {
    fetchRegistrations();
  }, []);

  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [selectedRegistration, setSelectedRegistration] = useState(null);

  const handleOpenDialog = (registration) => {
    setSelectedRegistration(registration);
    setDeleteConfirmation(true);
    console.log(registration)
  };

  const handleCloseDialog = () => {
    setSelectedRegistration(null);
    setDeleteConfirmation(false);
  };

  const handleDelete = async () => {
    try {
      await apiController.delete(`/registrations/${selectedRegistration._id}`);
      fetchRegistrations();
      setDeleteConfirmation(false);
    } catch (error) {
      console.error("Error deleting registration:", error);
    }
  };

  const [editingRegistration, setEditingRegistration] = useState(null);

  const handleEdit = (registration) => {
    setEditingRegistration(registration);
    setIsRegistrationModalOpen(true);
  };

  const handleExcelDownload = () => {
    const data = registrations.map((registration, index) => ({
      S_No: index + 1,
      Name: `${registration.firstName} ${registration.lastName}`,
      PhoneNumber: registration.phoneNumber,
      Location: registration.location,
      Email: registration.email,
      Status: registration.status,
      JobTitle: registration.job_title,
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Registrations');
    const excelFileName = 'employee_registrations.xlsx';
    XLSX.writeFile(wb, excelFileName);
  };

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollThreshold = 100;
      setIsVisible(scrollY > scrollThreshold);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Grid pb={7}>
        <Grid p={2}>
          <TextField
            onChange={(e) => setKeywordsInputValue(e.target.value)}
            value={keywordsInputValue}
            placeholder="Search Keywords"
            variant="outlined"
            sx={{
              "& input::placeholder": { fontSize: "13px" },
              paddingBottom: "1rem",
            }}
            InputProps={{
              style: {
                border: "none",
                width: "612px",
                height: "45px",
              },

              endAdornment: (
                <IconButton
                  aria-label="Search"
                  onClick={() => {
                    keywordsFilter();
                  }}
                >
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />
          <Box mt={1}>
            <Button
              onClick={handleRegistration}
              variant="contained"
              style={{ textTransform: "capitalize" }}
            >
             <Typography style={{fontFamily:"poppins"}}>Add Employee</Typography> 
            </Button>
          </Box>
        </Grid>
        <Grid p={2} style={{display:"flex",justifyContent:"flex-end"}}>
          <Button onClick={handleExcelDownload} variant="contained" style={{display:"flex",alignItems:"center",textTransform:"capitalize",gap:"4px"}}> <FaFileExcel size={20} style={{display:"flex",justifyContent:"flex-start"}}/> <Typography style={{fontFamily:"poppins"}}>Download Details in Excel </Typography></Button> 
        </Grid>

        <Grid p={2}>
          <TableContainer component={Paper} style={{ marginTop: "20px" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography
                      style={{
                        fontFamily: "poppins",
                        fontWeight: 800,
                        fontSize: 18,
                      }}
                    >
                      Employee
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      style={{
                        fontFamily: "poppins",
                        fontWeight: 800,
                        fontSize: 18,
                      }}
                    >
                      Status
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      style={{
                        fontFamily: "poppins",
                        fontWeight: 800,
                        fontSize: 18,
                      }}
                    >
                      Joined Date
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      style={{
                        fontFamily: "poppins",
                        fontWeight: 800,
                        fontSize: 18,
                      }}
                    >
                      Job Title
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      style={{
                        fontFamily: "poppins",
                        fontWeight: 800,
                        fontSize: 18,
           
                      }}
                    >
                      Actions
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {registrations.length > 0 ? (
                  registrations.map((registration) => (
                    <TableRow key={registration._id}>
                      <TableCell style={{ width: "22rem" }}>
                        <Grid>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: "2%",
                              marginLeft: ".2rem",
                            }}
                          >
                            <Typography
                              style={{ fontFamily: "poppins", fontSize: 15 }}
                            >
                              {registration.firstName} {registration.lastName}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              gap: "2%",
                              alignItems: "center",
                              marginTop: ".4em",
                            }}
                          >
                            <Box sx={{ width: "18px", height: "18px" }}>
                              <PhoneAndroidIcon
                                sx={{
                                  color: "#0056CE",
                                  height: "20px",
                                  width: "20px",
                                  margin: "0",
                                  padding: "0",
                                }}
                              />
                            </Box>
                            <Typography
                              style={{ fontFamily: "poppins", fontSize: 15 }}
                            >
                              {registration.phoneNumber}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              gap: "1%",
                              alignItems: "center",
                              marginTop: ".4em",
                            }}
                          >
                            <LocationOnIcon
                              sx={{
                                color: "#0056CE",
                                height: "22px",
                                width: "22px",
                                margin: "0",
                                padding: "0",
                              }}
                            />
                            <Typography
                              style={{
                                marginTop: "2px",
                                fontFamily: "poppins",
                                fontSize: 15,
                                textTransform: "capitalize",
                              }}
                            >
                              {registration.location}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: "2%",
                              marginTop: ".3em",
                            }}
                          >
                            <IoMail
                              style={{
                                color: "#0056CE",
                                height: "20px",
                                width: "20px",
                                margin: "0",
                                padding: "0",
                              }}
                            />
                            <Typography
                              style={{ fontFamily: "poppins", fontSize: 15 }}
                            >
                              <a
                                className="email-link"
                                href={`mailto:${registration.email}`}
                              >
                                {registration.email}
                              </a>
                            </Typography>
                          </Box>
                        </Grid>
                      </TableCell>
                      <TableCell style={{ width: "15rem" }}>
                        <Typography
                          style={{
                            fontFamily: "poppins",
                            fontSize: 15,
                            textTransform: "capitalize",
                          }}
                        >
                          {registration.status}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          align="left"
                          style={{ fontFamily: "poppins", fontSize: 15 }}
                        >
                          {formatDate(registration.created_at)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          style={{
                            fontFamily: "poppins",
                            fontSize: 15,
                            textTransform: "capitalize",
                          }}
                        >
                          {registration.job_title}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            gap: "10%",
                            alignItems: "center",
                          }}
                        >
                          <MdEdit
                            style={{
                              height: "25px",
                              width: "25px",
                              cursor: "pointer",
                            }}
                            onClick={() => handleEdit(registration)}
                            title="Edit Registration"
                          />
                          <MdDelete
                            style={{
                              height: "25px",
                              width: "25px",
                              cursor: "pointer",
                            }}
                            onClick={() => handleOpenDialog(registration)}
                            title="Delete Registration"
                          />
                          <IoMdExit
                            style={{
                              height: "25px",
                              width: "25px",
                              cursor: "pointer",
                            }}
                            onClick={() => handleExit(registration._id)}
                            title="Terminate Employee"
                          />
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5}>
                      <Typography style={{ fontFamily: "poppins" }}>
                        No Employee to display
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Dialog open={deleteConfirmation} onClose={handleCloseDialog}>
            <DialogTitle style={{ fontFamily: "poppins" }}>
              Delete Confirmation
            </DialogTitle>
            <DialogContent style={{ fontFamily: "poppins" }}>
              Are you sure you want to delete this registration?
            </DialogContent>
            <DialogActions>
              <Button
                style={{ fontFamily: "poppins" }}
                onClick={handleCloseDialog}
              >
                Cancel
              </Button>
              <Button
                style={{ fontFamily: "poppins" }}
                onClick={handleDelete}
                variant="contained"
                color="error"
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog open={exitConfirmation} onClose={handleExitDialog}>
            <DialogTitle style={{ fontFamily: "poppins" }}>
            Terminate Confirmation
            </DialogTitle>
            <DialogContent style={{ fontFamily: "poppins" }}>
            Are you sure you want to terminate the employee from the company?
            </DialogContent>
            <DialogActions>
              <Button
                style={{ fontFamily: "poppins" }}
                onClick={handleExitDialog}
              >
                Cancel
              </Button>
              <Button
                style={{ fontFamily: "poppins" }}
                onClick={handleExitConformation}
                variant="contained"
                color="error"
              >
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>

      {isVisible && (
        <Box
          sx={{
            backgroundColor: "#2F70CB",
            height: "2rem",
            width: "2rem",
            position: "fixed",
            bottom: "28px",
            right: "20px",
            zIndex: "1000",
            borderRadius: "50px",
          }}
        >
          <BiArrowToTop
            size={25}
            onClick={scrollToTop}
            style={{
              position: "fixed",
              bottom: "30px",
              right: "23px",
              zIndex: "1000",
              color: "#fff",
            }}
            title="scroll to top"
          />
        </Box>
      )}

      <RegistrationModel
        open={isRegistrationModalOpen}
        onClose={() => {
          setIsRegistrationModalOpen(false);
          setEditingRegistration(null);
        }}
        fetchRegistrations={fetchRegistrations}
        editingRegistration={editingRegistration}
      />
    </>
  );
};

export default EmployeeRegistration;
