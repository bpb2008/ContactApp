import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import NotesIcon from "@mui/icons-material/Notes";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";

const ViewContact = ({ selectedContactId, setSelectedContactId }) => {
  useEffect(() => {
    const fetchContact = async (selectedContactId) => {
      try {
        const response = await fetch(
          `http://localhost:8080/contacts/${selectedContactId}`
        );
        if (!response.ok) {
          throw new Error("Error fetching contact details");
        }
        const data = await response.json();
        console.log(data);
        setSelectedContactId(data);
      } catch (error) {
        console.error("Error fetching contact details: ", error);
      }
    };
    console.log(fetchContact(selectedContactId));
  }, [selectedContactId, setSelectedContactId]);

  if (!selectedContactId) {
    return <CircularProgress />;
  }

  return (
    <Box>
      <Typography variant="h5" sx={{ color: "#1C468E" }}>
        <PersonIcon sx={{ color: "#000000" }} /> <span> </span>
        {selectedContactId.name}
      </Typography>
      <Typography>
        <EmailIcon /> <span> </span>
        {selectedContactId.email}
      </Typography>
      <Typography>
        <PhoneIcon /> <span> </span>
        {selectedContactId.phone}
      </Typography>
      <Typography>
        <NotesIcon /> <span> </span>
        {selectedContactId.notes}
      </Typography>
    </Box>
  );
};

export default ViewContact;
