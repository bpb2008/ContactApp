import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useEffect, useState, useRef } from "react";
import EditContactForm from "./EditContactForm";
import IndividualContact from "./IndividualContact";
import { fetchContacts } from "../fetchContacts";

const ViewContact = ({ selectedContactId, setContacts }) => {
  const [editButtonClicked, setEditButtonClicked] = useState(false);

  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });
  const originalContactDetails = useRef(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/contacts/${selectedContactId}`
        );

        if (!response.ok) {
          throw new Error("Error fetching contact details");
        }

        const contactDetails = await response.json();

        setContactData(contactDetails);
        originalContactDetails.current = contactDetails;
      } catch (error) {
        console.error("Error fetching contact details: ", error);
      }
    };

    fetchContact();
  }, [selectedContactId]);

  if (!selectedContactId) {
    return <CircularProgress />;
  }

  const editContact = () => {
    setEditButtonClicked(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8080/editContact/${selectedContactId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contactData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to edit contact");
      }

      await response.json();

      const refreshedListData = await fetchContacts();
      setContacts(refreshedListData);
    } catch (error) {
      console.error("Error updating entry: ", error);

      setSnackbarMessage("Error editing contact. Please try again.");
    } finally {
      setEditButtonClicked(false);
    }
  };

  const cancelEdit = () => {
    setContactData(originalContactDetails.current);
    setEditButtonClicked(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarMessage("");
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {editButtonClicked ? (
          <EditContactForm
            cancelEdit={cancelEdit}
            handleSubmit={handleSubmit}
            setContactData={setContactData}
            contactData={contactData}
          />
        ) : (
          <IndividualContact
            editContact={editContact}
            contactData={contactData}
          />
        )}
      </Box>
      <Snackbar
        open={!!snackbarMessage}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="error">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ViewContact;
