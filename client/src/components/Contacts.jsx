import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import { fetchContacts } from "../fetchContacts";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import ClearIcon from "@mui/icons-material/Clear";

const Contacts = ({ setSelectedContactId, setContacts, contacts }) => {
  useEffect(() => {
    const fetchData = async () => {
      const contactsData = await fetchContacts();
      setContacts(contactsData);
    };
    fetchData();
  }, []);

  const deleteContact = async (contactId) => {
    await fetch(`http://localhost:8080/contacts/${contactId}`, {
      method: "DELETE",
    });
    const refreshedListData = await fetchContacts();
    setContacts(refreshedListData);
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
                onClick={() => deleteContact(contact.contact_id)}
              >
                <ClearIcon sx={{ marginTop: "15px" }} />
              </Button>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Contacts;
