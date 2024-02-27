import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useEffect, useState } from "react";
import EditContactForm from "./EditContactForm";
import IndividualContact from "./IndividualContact";
import { fetchContacts } from "../fetchContacts";

const ViewContact = ({ selectedContactId, setContacts }) => {
  const [editButtonClicked, setEditButtonClicked] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [contactData, setContactData] = useState({
    newName: "",
    newEmail: "",
    newPhone: "",
    newNotes: "",
    originalData: {
      name: "",
      email: "",
      phone: "",
      notes: "",
    },
  });

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
        setContactData((previousData) => ({
          ...previousData,
          newName: data.name,
          newEmail: data.email,
          newPhone: data.phone,
          newNotes: data.notes,
          originalData: {
            name: data.name,
            email: data.email,
            phone: data.phone,
            notes: data.notes,
          },
        }));
      } catch (error) {
        console.error("Error fetching contact details: ", error);
      }
    };
    fetchContact();

    if (!selectedContactId) {
      setContactData((previousData) => ({
        ...previousData,
        newName: "",
        newEmail: "",
        newPhone: "",
        newNotes: "",
      }));
    }
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

      await response.json();

      const refreshedListData = await fetchContacts();
      setContacts(refreshedListData);

      if (!response.ok) {
        throw new Error("Failed to edit contact");
      }
    } catch (error) {
      console.error("Error updating entry: ", error);
      setSnackbarMessage("Error editing contact. Please try again.");
      setContactData((previousData) => ({
        ...previousData,
        newName: previousData.originalData.name,
        newEmail: previousData.originalData.email,
        newPhone: previousData.originalData.phone,
        newNotes: previousData.originalData.notes,
      }));
      setOpenSnackbar(true);
    } finally {
      setEditButtonClicked(false);
    }
  };

  const cancelEdit = () => {
    setEditButtonClicked(false);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
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
        open={openSnackbar}
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
