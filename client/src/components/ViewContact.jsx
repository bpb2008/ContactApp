import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import EditContactForm from "./EditContactForm";
import IndividualContact from "./IndividualContact";
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

      await response.json();

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
  );
};

export default ViewContact;
