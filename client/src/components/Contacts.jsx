import Box from "@mui/material/Box";
import TableContainer from "@mui/material/TableContainer";
import { useEffect, useState } from "react";
import { fetchContacts } from "../fetchContacts";
import DeleteConfirmation from "./DeleteConfirmation";
import ContactTable from "./ContactTable";

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
      <ContactTable
        contacts={contacts}
        handleContactClick={handleContactClick}
        openDeleteConfirmation={openDeleteConfirmation}
      />
      <DeleteConfirmation
        deleteConfirmationOpen={deleteConfirmationOpen}
        closeDeleteConfirmation={closeDeleteConfirmation}
        deleteContact={deleteContact}
        contactToDelete={contactToDelete}
      />
    </TableContainer>
  );
};

export default Contacts;
