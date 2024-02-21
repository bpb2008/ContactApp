import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

const DeleteConfirmation = ({
  deleteConfirmationOpen,
  closeDeleteConfirmation,
  deleteContact,
  contactToDelete,
}) => {
  return (
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
  );
};

export default DeleteConfirmation;
