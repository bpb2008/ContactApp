import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import ClearIcon from "@mui/icons-material/Clear";

const ContactTable = ({
  contacts,
  handleContactClick,
  openDeleteConfirmation,
}) => {
  return (
    <Table>
      <TableHead sx={{ textAlign: "center" }}>
        <TableRow>
          <TableCell>
            <PersonIcon sx={{ marginRight: "10px" }} />
            Name
          </TableCell>
          <TableCell>
            <EmailIcon sx={{ marginRight: "10px" }} />
            Email
          </TableCell>
          <TableCell>
            <PhoneIcon sx={{ marginRight: "5px" }} />
            Phone
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
            <TableCell>
              <Button
                variant="text"
                onClick={() => openDeleteConfirmation(contact.contact_id)}
              >
                <ClearIcon sx={{ marginTop: "15px" }} />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ContactTable;
