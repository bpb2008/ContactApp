import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import { fetchContacts } from "../fetchContacts";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import ClearIcon from "@mui/icons-material/Clear";

const Contacts = ({ setSelectedContactId, setContacts, contacts }) => {
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const contactsData = await fetchContacts();
      setContacts(contactsData);
    };
    fetchData();
  }, []);

  const openDeleteConfirmation = (contactId) => {
    setContactToDelete(contactId);
    setDeleteConfirmationOpen(true);
  };

  const closeDeleteConfirmation = () => {
    setContactToDelete(null);
    setDeleteConfirmationOpen(false);
  };

  const deleteContact = async (contactId) => {
    await fetch(`http://localhost:8080/contacts/${contactId}`, {
      method: "DELETE",
    });

    const refreshedListData = await fetchContacts();
    setContacts(refreshedListData);

    closeDeleteConfirmation();
  };

  const handleContactClick = (contactId) => {
    setSelectedContactId(contactId);
  };

  return (
    <TableContainer component={Box}>
      <Table>
        <TableHead sx={{ textAlign: "center" }}>
          <TableRow>
            <TableCell>
              <PersonIcon />
              &nbsp;Name
            </TableCell>
            <TableCell>
              <EmailIcon />
              &nbsp;Email
            </TableCell>
            <TableCell>
              <PhoneIcon />
              &nbsp;Phone
            </TableCell>
            <TableCell>{/* <DeleteIcon /> */}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contacts.map((contact) => (
            <TableRow key={contact.contact_id}>
              <TableCell>
                <Button
                  variant="text"
                  onClick={() => handleContactClick(contact.contact_id)}
                >
                  {contact.name}
                </Button>
              </TableCell>
              <TableCell>{contact.email}</TableCell>
              <TableCell>{contact.phone}</TableCell>
              <Button
                variant="text"
                onClick={() => openDeleteConfirmation(contact.contact_id)}
              >
                <ClearIcon sx={{ marginTop: "15px" }} />
              </Button>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={deleteConfirmationOpen} onClose={closeDeleteConfirmation}>
        <DialogTitle id="alert-dialog-title">{"Delete Contact"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this contact?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteConfirmation} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => deleteContact(contactToDelete)}
            color="primary"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};

export default Contacts;
