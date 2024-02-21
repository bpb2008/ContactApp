import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const EditContactForm = ({
  cancelEdit,
  handleSubmit,
  setNewName,
  setNewEmail,
  setNewPhone,
  setNewNotes,
  newName,
  newEmail,
  newPhone,
  newNotes,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        variant="filled"
        sx={{ width: "400px" }}
        label="Name"
        value={newName}
        onChange={(e) => {
          setNewName(e.target.value);
        }}
      />
      <TextField
        variant="filled"
        sx={{ width: "400px" }}
        label="Email"
        value={newEmail}
        onChange={(e) => setNewEmail(e.target.value)}
      />
      <TextField
        variant="filled"
        sx={{ width: "400px" }}
        label="phone"
        value={newPhone}
        onChange={(e) => setNewPhone(e.target.value)}
      />
      <TextField
        variant="filled"
        sx={{ width: "400px" }}
        label="Notes"
        value={newNotes}
        onChange={(e) => setNewNotes(e.target.value)}
      />
      <div className="edit">
        <Button type="submit" variant="contained" sx={{ marginRight: "20px" }}>
          Submit Edit
        </Button>
        <Button variant="contained" onClick={cancelEdit}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default EditContactForm;
