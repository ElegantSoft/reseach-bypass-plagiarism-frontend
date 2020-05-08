import React, { ChangeEvent, useState } from "react";
import {
  createMuiTheme,
  createStyles,
  makeStyles,
  Theme,
  ThemeProvider,
} from "@material-ui/core/styles";
// import "./App.css";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  Button,
  CircularProgress,
  Grid,
  Icon,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import Axios from "axios";
import Header from "./components/Header";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: theme.spacing(2),
      // height: "100%",
    },
    container: {
      marginTop: theme.spacing(3),
    },
    result: {
      // minHeight: 300,
    },
  })
);

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");
  const [result, setResult] = useState<string>("");

  const fetchData = async (): Promise<void> => {
    setLoading(true);
    try {
      const res = await Axios.post(
        "https://o6u-backend.herokuapp.com/api/leads/test/",
        {
          content,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setResult(res.data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  const theme = createMuiTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#7289DA",
      },
      background: {
        default: "#2C2F33",
      },
    },
  });
  const classes = useStyles();

  const changeContent = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Container className={classes.container}>
        <Grid container>
          <Grid item xs={12} md={6} justify="space-between">
            <Paper className={classes.paper}>
              <form>
                <TextField
                  id="content"
                  placeholder="Enter the original content"
                  fullWidth
                  multiline
                  rows={15}
                  onChange={changeContent}
                  value={content}
                />
              </form>
              <Button
                color="primary"
                variant="contained"
                endIcon={<SendIcon />}
                style={{ marginTop: 10 }}
                fullWidth
                onClick={() => fetchData()}
              >
                Convert
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper className={`${classes.paper} ${classes.result}`}>
              <Typography variant="h6">Result will show Here</Typography>
              <Grid justify="center" style={{ display: "flex" }}>
                {loading ? (
                  <CircularProgress />
                ) : (
                  <Typography variant="body1">{result}</Typography>
                )}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default App;
