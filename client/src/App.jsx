import "./App.css";
import { useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CreateContact from "./components/CreateContact";
import ViewContact from "./components/ViewContact";
import Contacts from "./components/Contacts";

function App() {
  const [selectedContactId, setSelectedContactId] = useState(null);
  const [contacts, setContacts] = useState([]);

  const containerStyles = {
    display: "flex",
    position: "relative",
    alignItems: "stretch",
  };

  const paperStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  return (
    <Container
      sx={{
        ...containerStyles,
        width: "100%",
        flexDirection: "row",
      }}
    >
      <Container
        sx={{
          ...containerStyles,
          flexDirection: "column",
          width: "50%",
        }}
      >
        <Paper
          elevation={1}
          sx={{
            ...paperStyles,
            width: "500px",
            height: "325px",
            marginBottom: "10px",
          }}
        >
          <Typography variant="h4" sx={{ marginTop: "30px" }}>
            Contact List App
          </Typography>
          <Typography sx={{ marginBottom: "30px" }}>
            Select a contact from the list to view details.
          </Typography>
          {selectedContactId && (
            <ViewContact
              selectedContactId={selectedContactId}
              setSelectedContactId={setSelectedContactId}
            />
          )}
        </Paper>

        <Paper
          elevation={1}
          sx={{
            ...paperStyles,
            width: "500px",
            height: "425px",
            marginTop: "10px",
            justifyContent: "center",
          }}
        >
          <CreateContact setContacts={setContacts} />
        </Paper>
      </Container>
      <Paper
        elevation={1}
        sx={{
          ...paperStyles,
          width: "800px",
          height: "750px",
          paddingTop: "20px",
        }}
      >
        <Contacts
          setSelectedContactId={setSelectedContactId}
          contacts={contacts}
          setContacts={setContacts}
        />
      </Paper>
    </Container>
  );
}

export default App;
