import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import NotesIcon from "@mui/icons-material/Notes";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";

const EMPTY_CONTACT_DETAILS = {
  name: "",
  email: "",
  phone: "",
  notes: "",
};

const ViewContact = ({ selectedContactId }) => {
  const [contactDetails, setContactDetails] = useState(EMPTY_CONTACT_DETAILS);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/contacts/${selectedContactId}`
        );
        if (!response.ok) {
          throw new Error("Error fetching contact details");
        }
        const data = await response.json();
        setContactDetails(data);
      } catch (error) {
        console.error("Error fetching contact details: ", error);
      }
    };
    fetchContact();
  }, [selectedContactId]);

  if (!selectedContactId) {
    return <CircularProgress />;
  }

  const { name, email, phone, notes } = contactDetails;

  return (
    <Box>
      <Typography variant="h5" sx={{ color: "#1C468E" }}>
        <PersonIcon sx={{ color: "#000000" }} /> <span> </span>
        {name}
      </Typography>
      <Typography>
        <EmailIcon /> <span> </span>
        {email}
      </Typography>
      <Typography>
        <PhoneIcon /> <span> </span>
        {phone}
      </Typography>
      <Typography>
        <NotesIcon /> <span> </span>
        {notes}
      </Typography>
    </Box>
  );
};

export default ViewContact;
