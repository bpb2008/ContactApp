import "./App.css";
import { useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import CreateContact from "./components/CreateContact";
import ViewContact from "./components/ViewContact";
import Contacts from "./components/Contacts";

function App() {
  const [selectedContactId, setSelectedContactId] = useState(null);
  const [contacts, setContacts] = useState([]);

  const containerStyles = {
    display: "flex",
    alignItems: "center",
    width: "100%",
  };

  const paperStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const boxStyles = {
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
          width: "1120px",
          height: "50px",
          marginBottom: "15px",
          "@media (max-width:800px": {
            width: "500px",
          },
          "@media (max-width:400px)": {
            width: "400px",
          },
          justifyContent: "center",
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
      <Box
        sx={{
          ...boxStyles,
          flexDirection: "row",
          "@media (max-width:800px)": {
            flexWrap: "wrap",
            width: "100%",
          },
        }}
      >
        <Box
          sx={{
            ...boxStyles,
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
        </Box>
        <Paper
          elevation={1}
          sx={{
            ...paperStyles,
            width: "600px",
            marginLeft: "15px",
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
            selectedContactId={selectedContactId}
          />
        </Paper>
      </Box>
    </Container>
  );
}

export default App;
