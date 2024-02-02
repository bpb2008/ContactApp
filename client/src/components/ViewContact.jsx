import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { fetchContacts } from "../fetchContacts";

const EMPTY_CONTACT_DETAILS = {
  name: "",
  email: "",
  phone: "",
  notes: "",
};

const ViewContact = ({ selectedContactId }) => {
  const [contactDetails, setContactDetails] = useState(EMPTY_CONTACT_DETAILS);
  const [editButtonClicked, setEditButtonClicked] = useState(false);
  const [contactToEdit, setContactToEdit] = useState();

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

  const editContact = (e) => {
    e.preventDefault();
    setEditButtonClicked(true);
    handleEdit();
  };

  const handleEdit = async (newData) => {
    try {
      const response = await fetch(
        `http://localhost:8080/contacts/${selectedContactId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newData),
        }
      );

      const result = await response.json();
      console.log("result test");
      console.log(result);

      const refreshedListData = await fetchContacts();
      setContactDetails(refreshedListData);
      console.log("Contact edited: ", result);

      if (!response.ok) {
        throw new Error("Failed to edit contact");
      }
    } catch (error) {
      console.error("Error updating entry: ", error);
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
        <form onSubmit={handleEdit}>
          <TextField
            variant="filled"
            sx={{ width: "400px" }}
            onChange={(e) =>
              setContactToEdit({ ...contactToEdit, name: e.target.value })
            }
          >
            {name}
          </TextField>
          <TextField
            variant="filled"
            sx={{ width: "400px" }}
            onChange={(e) =>
              setContactToEdit({ ...contactToEdit, email: e.target.value })
            }
          >
            {email}
          </TextField>
          <TextField
            variant="filled"
            sx={{ width: "400px" }}
            onChange={(e) =>
              setContactToEdit({ ...contactToEdit, phone: e.target.value })
            }
          >
            {phone}
          </TextField>
          <TextField
            variant="filled"
            sx={{ width: "400px" }}
            onChange={(e) =>
              setContactToEdit({ ...contactToEdit, notes: e.target.value })
            }
          >
            {notes}
          </TextField>
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
            {name}
          </Typography>
          <Typography sx={{ fontSize: "20px" }}>{email}</Typography>
          <Typography sx={{ fontSize: "20px" }}>{phone}</Typography>
          <Typography sx={{ fontSize: "15px" }}>{notes}</Typography>
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
