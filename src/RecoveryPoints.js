import * as React from 'react';
import dayjs from 'dayjs';
import Badge from '@mui/material/Badge';
import { Button } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import axios from 'axios';
import Chip from '@mui/material/Chip';


// ... (your imports)

export default function RecoveryPoints() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = React.useState([]);
  const [initialValue, setInitialValue] = React.useState();
  //const [value, setValue] = React.useState(dayjs('2022-04-17'));
  const [highlightedTimes, setHighlightedTimes] = React.useState([]);
  const [currentMonthData, setCurrentMonthData] = React.useState({});
  const [highlightedActiveDays, setHighlightedActiveDays] = React.useState({});
  const [selectedDate,setSelectedDate] = React.useState();
  const [selectedChip, setSelectedChip] = React.useState(null);

  const handleChipClick = (index) => {
    // Handle click event, you can add your logic here
    setSelectedChip(index);
    // handleNameClick(item.id,item.itemType,item.userId,item.name,1);
  };

  const setInitialValues = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const date = `${year}-${month}-${day}`;
    const startOfMonth = dayjs(date).startOf('month').format('YYYY-MM-DD');
    const endOfMonth = dayjs(date).endOf('month').format('YYYY-MM-DD');
    setInitialValue(dayjs(date));
    fetchJobs(startOfMonth, endOfMonth);
  };

  React.useEffect(() => {
    setInitialValues();
  }, []);

  const handleYearOrMonthChange = (date) => {
    const startOfMonth = dayjs(date).startOf('month').format('YYYY-MM-DD');
    const endOfMonth = dayjs(date).endOf('month').format('YYYY-MM-DD');
    fetchJobs(startOfMonth, endOfMonth);
  };

  const handleDateChange = (newDate) => {
    const date = dayjs(newDate).format('YYYY-MM-DD');
    const day = dayjs(newDate).format('DD');
    if (highlightedActiveDays.includes(day)) {
      const times = currentMonthData[date].map((element) => element.startedTime);
      setHighlightedTimes(times);
    } else {
      setHighlightedTimes([]);
    }
  };

  function ServerDay(props) {
    const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;
  
    const isSelected =
      !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;
  
    return (
      <Badge
        key={props.day.toString()}
        overlap="circular"
        badgeContent={isSelected ? '💼' : undefined}
      >
        <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
      </Badge>
    );
  }
  
  
  

  const fetchJobs = async (startDate, endDate) => {
    try {
      setIsLoading(true);
      const url = `http://localhost:8080/jobs/calender/1?startdate=${startDate}&enddate=${endDate}`;
      const response = await axios.get(url);

      if (response.data) {
        const jobDays = Object.keys(response.data);

        if (jobDays.length > 0) {
          const lastDate = jobDays[jobDays.length - 1];
          setSelectedDate(dayjs(lastDate));

          const times = response.data[lastDate].map((element) => element.startedTime);
          const highlightedDates = jobDays.map((date) => dayjs(date).date());
          const temp = jobDays.map((date) => dayjs(date).format('DD'));
          setHighlightedDays(highlightedDates);
          setHighlightedTimes(times);
          setHighlightedActiveDays(temp);
        } else {
          setInitialValue(null);
          setHighlightedTimes([]);
          setHighlightedDays([]);
          setHighlightedActiveDays([]);
        }

        setCurrentMonthData(response.data);
      } else {
        setInitialValue(null);
        setHighlightedDays([]);
        setHighlightedTimes([]);
        setCurrentMonthData({});
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setInitialValue(null);
      setHighlightedDays([]);
      setHighlightedTimes([]);
      setCurrentMonthData({});
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div style={{ width: '100%' }}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
       <div style={{ width: '100%' }}>
      <DateCalendar
        //defaultValue={initialValue}
        width="100%"
        loading={isLoading}
        onMonthChange={handleYearOrMonthChange}
        onYearChange={handleYearOrMonthChange}
        onChange={handleDateChange}
        //selected={selectedDate}
        renderLoading={() => <DayCalendarSkeleton />}
        value={selectedDate}
        slots={{
          day: ServerDay,
        }}
        slotProps={{
          day: {
            highlightedDays,
          },
        }}
      />
      </div>
      <div>
        {highlightedTimes.map((time, index) => (
          <Chip
          label={time}
          component="a"
          clickable
          onClick={() => handleChipClick(index)}
          style={{ backgroundColor: selectedChip === index ? '#8d9094' : undefined }}
        />
          // <Button size="small" key={index} sx={{ marginLeft: '2px' }} variant="outlined" color="primary">
          //   {time}
          // </Button>
        ))}
      </div>
      <div width="100%">
        {highlightedTimes.length > 0 ? (
          <Button sx={{ margin: '5px' }} variant="contained">
            Restore
          </Button>
        ) : (
          <Chip
                label="NO JOBS ARE AVAILABLE"
                component="a"
              />
        )}
      </div>
    </LocalizationProvider>
    </div>
  );
}
