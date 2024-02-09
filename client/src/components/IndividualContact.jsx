import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const IndividualContact = ({
  newName,
  newEmail,
  newPhone,
  newNotes,
  editContact,
}) => {
  return (
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
  );
};

export default IndividualContact;
