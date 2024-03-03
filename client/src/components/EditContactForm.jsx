import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const EditContactForm = ({
  cancelEdit,
  handleSubmit,
  setContactData,
  contactData,
}) => {
  const { name, email, phone, notes } = contactData;

  const onInputChanged = (key, value) =>
    setContactData((previousData) => ({
      ...previousData,
      [key]: value,
    }));

  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          marginTop: "10px",
        }}
      >
        <TextField
          variant="filled"
          sx={{ width: "400px" }}
          label="Name"
          value={name}
          onChange={(e) => onInputChanged("name", e.target.value)}
        />
        <TextField
          variant="filled"
          sx={{ width: "400px" }}
          label="Email"
          value={email}
          onChange={(e) => onInputChanged("email", e.target.value)}
        />
        <TextField
          variant="filled"
          sx={{ width: "400px" }}
          label="phone"
          value={phone}
          onChange={(e) => onInputChanged("phone", e.target.value)}
        />
        <TextField
          variant="filled"
          sx={{ width: "400px" }}
          label="Notes"
          value={notes}
          onChange={(e) => onInputChanged("notes", e.target.value)}
        />
        <Box sx={{ display: "flex", flexDirection: "row", marginTop: "20px" }}>
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
        </Box>
      </Box>
    </form>
  );
};

export default EditContactForm;
