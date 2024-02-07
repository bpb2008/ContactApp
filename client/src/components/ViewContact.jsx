import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { fetchContacts } from "../fetchContacts";

const ViewContact = ({ selectedContactId, setContacts }) => {
  const [editButtonClicked, setEditButtonClicked] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newNotes, setNewNotes] = useState("");

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
          body: JSON.stringify({ newName, newEmail, newPhone, newNotes }),
        }
      );

      const result = await response.json();

      const refreshedListData = await fetchContacts();
      setContacts(refreshedListData);

      if (!response.ok) {
        throw new Error("Failed to edit contact");
      }
    } catch (error) {
      console.error("Error updating entry: ", error);
    } finally {
      setEditButtonClicked(false);
    }
  };

  const cancelEdit = () => {
    setEditButtonClicked(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      {/* Separate edit button clicked into its own file */}
      {editButtonClicked ? (
        <form onSubmit={handleSubmit}>
          <TextField
            variant="filled"
            sx={{ width: "400px" }}
            label="Name"
            value={newName}
            onChange={(e) => {
              setNewName(e.target.value);
            }}
          />
          <TextField
            variant="filled"
            sx={{ width: "400px" }}
            label="Email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <TextField
            variant="filled"
            sx={{ width: "400px" }}
            label="phone"
            value={newPhone}
            onChange={(e) => setNewPhone(e.target.value)}
          />
          <TextField
            variant="filled"
            sx={{ width: "400px" }}
            label="Notes"
            value={newNotes}
            onChange={(e) => setNewNotes(e.target.value)}
          />
          <div className="edit">
            <Button
              type="submit"
              variant="contained"
              sx={{ marginRight: "20px" }}
            >
              Submit Edit
            </Button>
            <Button variant="contained" onClick={cancelEdit}>
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h4" sx={{ color: "#1C468E", marginTop: "40px" }}>
            {newName}
          </Typography>
          <Typography sx={{ fontSize: "20px" }}>{newEmail}</Typography>
          <Typography sx={{ fontSize: "20px" }}>{newPhone}</Typography>
          <Typography sx={{ fontSize: "15px" }}>{newNotes}</Typography>
          <Button
            variant="contained"
            sx={{ marginTop: "10px" }}
            onClick={editContact}
          >
            Edit Contact
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ViewContact;
