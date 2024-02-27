import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const EditContactForm = ({
  cancelEdit,
  handleSubmit,
  setContactData,
  contactData,
}) => {
  const { newName, newEmail, newPhone, newNotes } = contactData;
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
          value={newName}
          onChange={(e) => {
            setContactData((previousData) => ({
              ...previousData,
              newName: e.target.value,
            }));
          }}
        />
        <TextField
          variant="filled"
          sx={{ width: "400px" }}
          label="Email"
          value={newEmail}
          onChange={(e) => {
            setContactData((previousData) => ({
              ...previousData,
              newEmail: e.target.value,
            }));
          }}
        />
        <TextField
          variant="filled"
          sx={{ width: "400px" }}
          label="phone"
          value={newPhone}
          onChange={(e) => {
            setContactData((previousData) => ({
              ...previousData,
              newPhone: e.target.value,
            }));
          }}
        />
        <TextField
          variant="filled"
          sx={{ width: "400px" }}
          label="Notes"
          value={newNotes}
          onChange={(e) => {
            setContactData((previousData) => ({
              ...previousData,
              newNotes: e.target.value,
            }));
          }}
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
