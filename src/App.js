import logo from './logo.svg';
import './App.css';
import ClientDetails from "./clientDetails";
import TreeViewComponent from './TreeViewComponent';
import ClientCreation from './ClientCreationWizard';
import Clients from './Clients';
import Pie from './Overview';
import Browse from './browse';
import AddTeams from './AddTeams';
import Job from './Job';
import  OneDriveFilesTable   from './Sid'
import AzureApp from './AzureApp';
import Home from './Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#f7f5f5', // Set this to the color of your Chip
      },
    },
  });
  
  return (
    
    <BrowserRouter>
      <Routes>
          <Route index element={<Clients />} />
          <Route path="clients" element={<Clients/>} />
          <Route path="browse" element={<Browse/>} />
          <Route path="clientdetails" element={<ClientDetails />} />
          <Route path="overview" element={<Pie/>} />
          <Route path="addteams" element={<AddTeams/>} />
          <Route path="jobs" element={<Job/>} />
          <Route path="create" element={<ClientCreation/>} />
          <Route path="azure" element={<Home/>} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
