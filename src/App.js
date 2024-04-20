import { useEffect } from 'react';
import { Box, ThemeProvider } from '@mui/material';
import WebFont from "webfontloader";

import { CustomComponent } from './CustomStyle';
import Page from './Containers/Page';
import Loading from './Containers/Loading';
import ContextMenuTable from './Components/MenuTable/ContextMenuTable';
import GlobalFunction from './GlobalFunction';

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Open Sans", "Oswald", "Arial"]
      }
    });
  }, []);

  return (
    <ThemeProvider theme={CustomComponent}>
      <Box className="App">
        <Page />
      </Box>
      
      <Loading />
      <ContextMenuTable />

      <GlobalFunction />
    </ThemeProvider>
  );
}

export default App;
