import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { TextField, Select, MenuItem, FormControl, InputLabel, Button, Typography, Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { codeConvert as convertCode } from "./components/converter";

// Light用のテーマ
const lightTheme = createTheme();

// Dark用のテーマ
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const IndexPage: React.FC<PageProps> = () => {
  const [inputValue, setInputValue] = React.useState<string>("");
  const [outputValue, setOutputValue] = React.useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = React.useState<string>("");
  const [darkMode, setDarkMode] = React.useState(true);

  // プログラミング言語が選択されたときの処理
  const handleLanguageChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedLanguage(event.target.value as string);
  };

  // ダークモード切り替え
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Container maxWidth="md">
        <Box mt={4} mb={4}>
          <Typography variant="h4" align="center">Code Translator</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Select a Programming Language</InputLabel>
              <Select
                value={selectedLanguage}
                onChange={handleLanguageChange}
                label="Select a Programming Language"
              >
                <MenuItem value="javascript">JavaScript</MenuItem>
                <MenuItem value="python">Python</MenuItem>
                <MenuItem value="c#">C#</MenuItem>
                <MenuItem value="c++">C++</MenuItem>
                <MenuItem value="c">C</MenuItem>
                <MenuItem value="java">Java</MenuItem>
                <MenuItem value="go">Go</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={6}
              variant="outlined"
              label="Input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={6}
              variant="outlined"
              label="Output"
              value={outputValue}
              readOnly
            />
          </Grid>
          <Grid item xs={12} align="center">
            <Button variant="contained" color="primary" onClick={async () => {
              if (selectedLanguage === "") {
                alert("Please select a programming language");
                return;
              }
              if (inputValue === "") {
                alert("Please enter a program");
                return;
              }

              const output = await convertCode(inputValue, selectedLanguage);
              setOutputValue(output);
            }}>
              Translate
            </Button>
          </Grid>
          <Grid item xs={12} align="center">
            <Button onClick={toggleDarkMode}>
              {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            </Button>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default IndexPage;

export const Head: HeadFC = () => <title>Code Translator</title>
