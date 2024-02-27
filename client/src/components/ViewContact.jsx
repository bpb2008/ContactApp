import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useEffect, useState } from "react";
import EditContactForm from "./EditContactForm";
import IndividualContact from "./IndividualContact";
import { fetchContacts } from "../fetchContacts";

const ViewContact = ({
  selectedContactId,
  setContacts,
  newPhone,
  newEmail,
  newName,
  newNotes,
  setNewName,
  setNewEmail,
  setNewPhone,
  setNewNotes,
}) => {
  const [editButtonClicked, setEditButtonClicked] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [originalData, setOriginalData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
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
        setNewName(data.name);
        setNewEmail(data.email);
        setNewPhone(data.phone);
        setNewNotes(data.notes);
        setOriginalData({
          name: data.name,
          email: data.email,
          phone: data.phone,
          notes: data.notes,
        });
      } catch (error) {
        console.error("Error fetching contact details: ", error);
      }
    };
    fetchContact();

    if (!selectedContactId) {
      setNewName("");
      setNewEmail("");
      setNewPhone("");
      setNewNotes("");
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
          body: JSON.stringify({ newName, newEmail, newPhone, newNotes }),
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
      setNewName(originalData.name);
      setNewEmail(originalData.email);
      setNewPhone(originalData.phone);
      setNewNotes(originalData.notes);
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
            setNewName={setNewName}
            setNewEmail={setNewEmail}
            setNewPhone={setNewPhone}
            setNewNotes={setNewNotes}
            newName={newName}
            newEmail={newEmail}
            newPhone={newPhone}
            newNotes={newNotes}
          />
        ) : (
          <IndividualContact
            editContact={editContact}
            newName={newName}
            newEmail={newEmail}
            newPhone={newPhone}
            newNotes={newNotes}
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
