import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import FileCopyIcon from "@mui/icons-material/FileCopy";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    document.execCommand("copy");
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Container maxWidth="sm"
      style={{
        border: "5px solid grey", 
        borderRadius: "20px", 
        padding: "20px",
        backgroundColor: "#fff", 
      }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Password Generator
        </Typography>
        <div>
          <TextField
            value={password}
            variant="outlined"
            fullWidth
            placeholder="Generated Password"
            inputRef={passwordRef}
            InputProps={{
              readOnly: true,
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={copyPasswordToClipboard}
            startIcon={<FileCopyIcon />}
            style={{ marginTop: "1rem" }}
          >
            Copy
          </Button>
        </div>
        <Grid container spacing={2} style={{ marginTop: "1rem" }}>
          <Grid item xs={12}>
            <Typography variant="body1">Password Length: {length}</Typography>
            <Slider
              value={length}
              min={6}
              max={100}
              onChange={(e, value) => setLength(value)}
              valueLabelDisplay="auto"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={numberAllowed}
                  onChange={() => setNumberAllowed((prev) => !prev)}
                  color="primary"
                />
              }
              label="Numbers"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={charAllowed}
                  onChange={() => setCharAllowed((prev) => !prev)}
                  color="primary"
                />
              }
              label="Special Characters"
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default App;
