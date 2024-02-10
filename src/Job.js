import React from 'react';
import { Tabs, Tab, Typography, Box ,Grid, Container} from '@mui/material';

function Job() {
  const [value, setValue] = React.useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
        centered 
        style={{ margin: '10px' }}
      >
        <Tab value="one" label="Item One" />
        <Tab value="two" label="Item Two" />
        <Tab value="three" label="Item Three" />
      </Tabs>

      <TabPanel value={value} index="one">
        {/* Content for Tab 1 */}
        <Container>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
        <Typography>siddhu</Typography>
        </Grid>
        <Grid item xs={6}>
        <Typography>siddhu</Typography>
        </Grid>
        <Grid item xs={6}>
        <Typography>siddhu</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>siddhu</Typography>
        </Grid>
      </Grid>
      </Container>
      </TabPanel>

      <TabPanel value={value} index="two">
        {/* Content for Tab 2 */}
        {/* Add your content for Tab 2 here */}
      </TabPanel>

      <TabPanel value={value} index="three">
        {/* Content for Tab 3 */}
        {/* Add your content for Tab 3 here */}
      </TabPanel>
    </div>
  );
}

function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

export default Job;
