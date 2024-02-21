import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useState } from "react";
import { fetchContacts } from "../fetchContacts";

const CreateContact = ({ setContacts }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/addContact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, phone, notes }),
      });

      if (!response.ok) {
        throw new Error("Failed to create contact");
      }

      await response.json();
      const refreshedListData = await fetchContacts();
      setContacts(refreshedListData);
      setName("");
      setEmail("");
      setPhone("");
      setNotes("");
    } catch (error) {
      console.error("Oh no! Error creating contact: ", error);
      setSnackbarMessage("Error creating contact. Please try again.");
      setOpenSnackbar(true);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const textfieldStyles = {
    width: "400px",
    margin: "10px",
    "@media(max-width:400px)": {
      width: "300px",
    },
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          label="Name"
          variant="filled"
          sx={{ ...textfieldStyles }}
        />
        <TextField
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          variant="filled"
          sx={{ ...textfieldStyles }}
        />
        <TextField
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          label="Phone"
          variant="filled"
          sx={{ ...textfieldStyles }}
        />
        <TextField
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          label="Notes"
          variant="filled"
          sx={{ ...textfieldStyles }}
        />
        <Button type="submit" variant="contained" sx={{ marginTop: "20px" }}>
          Create New Contact
        </Button>
      </form>
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

export default CreateContact;
