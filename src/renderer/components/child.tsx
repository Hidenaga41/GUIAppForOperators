import { Box } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import React from "react";
import {render } from "react-dom"
import theme from "../theme";
import Greetings from "./Greetings";
// Setup root node where our React app will be attached to
const child = document.createElement("div");

child.id = "child";
document.body.appendChild(child);

const Child = () =>  {
  return (
    // Setup theme and css baseline for the Material-UI app
    // https://material-ui.com/customization/theming/
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          backgroundColor: (theme) => theme.palette.background.default,
        }}
      >
        <main>
          {/* This is where your app content should go */}
          hogehoge fugafuga
        </main>
      </Box>
    </ThemeProvider>
  );
}

render(<Child />, document.getElementById("child"));

