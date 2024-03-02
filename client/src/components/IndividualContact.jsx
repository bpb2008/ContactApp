import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const IndividualContact = ({ contactData, editContact }) => {
  const { name, email, phone, notes } = contactData;

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
  );
};

export default IndividualContact;
