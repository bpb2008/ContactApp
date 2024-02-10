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
    alignItems: "stretch",
    width: "100%",
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
        flexDirection: "column",
      }}
    >
      <Paper
        elevation={1}
        sx={{
          ...paperStyles,
          width: "1085px",
          height: "50px",
          marginBottom: "15px",
          marginLeft: "45px",
          "@media (max-width:800px": {
            width: "500px",
          },
          "@media (max-width:400px)": {
            width: "400px",
          },
        }}
      >
        <Typography
          variant="h5"
          sx={{
            marginTop: "10px",
            "@media (max-width:400px)": {
              width: "400px",
            },
          }}
        >
          Contact List App
        </Typography>
      </Paper>
      <Container
        sx={{
          ...containerStyles,
          flexDirection: "row",
          "@media (max-width:800px)": {
            flexWrap: "wrap",
            width: "100%",
          },
        }}
      >
        <Container
          sx={{
            ...containerStyles,
            flexDirection: "column",
            "@media (max-width:800px)": {
              width: "100%",
              marginBottom: "15px",
            },
          }}
        >
          <Paper
            elevation={1}
            sx={{
              ...paperStyles,
              width: "500px",
              height: "355px",
              marginBottom: "10px",
              "@media (max-width:400px)": {
                width: "400px",
              },
            }}
          >
            <Typography sx={{ marginBottom: "10px", marginTop: "10px" }}>
              Select a contact from the list to view details.
            </Typography>
            {selectedContactId && (
              <ViewContact
                selectedContactId={selectedContactId}
                setSelectedContactId={setSelectedContactId}
                setContacts={setContacts}
              />
            )}
          </Paper>

          <Paper
            elevation={1}
            sx={{
              ...paperStyles,
              width: "500px",
              height: "395px",
              marginTop: "10px",
              justifyContent: "center",
              "@media (max-width:400px)": {
                width: "400px",
              },
            }}
          >
            <CreateContact setContacts={setContacts} />
          </Paper>
        </Container>
        <Paper
          elevation={1}
          sx={{
            ...paperStyles,
            width: "1000px",
            height: "770px",
            "@media (max-width:400px)": {
              width: "400px",
              marginLeft: "15px",
            },
          }}
        >
          <Contacts
            setSelectedContactId={setSelectedContactId}
            contacts={contacts}
            setContacts={setContacts}
          />
        </Paper>
      </Container>
    </Container>
  );
}

export default App;
