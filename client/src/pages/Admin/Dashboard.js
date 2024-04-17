import React, { useEffect, useState, useContext } from "react";
import Clock from 'react-clock';
import html2canvas from 'html2canvas';
import { UserContext } from "../../components/User_Context";
import { employeeInfo } from "../../api";
import { Link } from 'react-router-dom';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { BarChart } from '@mui/x-charts/BarChart';
import 'react-circular-progressbar/dist/styles.css';
import 'react-clock/dist/Clock.css';

const formatCurrentDateTime = (showTime) => {
  const currentDate = new Date();
  if (showTime) {
    const options = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
    return currentDate.toLocaleTimeString('en-US', options);
  } else {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('en-US', options);
    const day = currentDate.getDate();
    const suffix = (day === 1 || day === 21 || day === 31) ? 'st' : (day === 2 || day === 22) ? 'nd' : (day === 3 || day === 23) ? 'rd' : 'th';
    return formattedDate.replace(',', suffix + ',');
  }
};

const AdminDashboard = () => {
  const { user } = useContext(UserContext);
  const [attendanceData, setAttendanceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(formatCurrentDateTime(true));
  const [currentDate, setCurrentDate] = useState(formatCurrentDateTime(false));
  const [currentDay, setCurrentDay] = useState('');
  const [value, setValue] = useState(new Date());


  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(formatCurrentDateTime(true));
      setCurrentDate(formatCurrentDateTime(false));
      setCurrentDay(new Date().toLocaleString('default', { weekday: 'long' }));
      setValue(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await employeeInfo();
        setAttendanceData(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [user.username]);

  const captureScreenshot = () => {
    const element = document.querySelector('.admin__graph');
    html2canvas(element).then(canvas => {
      const screenshotUrl = canvas.toDataURL(); // Convert canvas to base64 encoded image data URL
      const a = document.createElement('a');
      a.href = screenshotUrl;
      a.download = `${currentDate}.png`; // Specify the filename for the downloaded screenshot
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  };



  return (
    <>
      <div className='container'>
        <div className='dashboard__details'>
          <div className='dashboard__clock__and__progress'>
            <div className='card dashboard__clock'>
              <div className='dashboard__clock__info'>
                <Clock value={value} />
                <time>{currentTime}</time>
                <time>{currentDate}</time>
                <p>{currentDay}</p>
              </div>
              <div className='dashboard_links'>
                <Link to="/admin/addUser">
                  <button className='button'>Add User</button>
                </Link>
              </div>
            </div>
            <div className='dashboard__progress'>
              <div className='card progress'>
                {attendanceData ? (
                  <div className='progress__bar'>
                    <CircularProgressbar
                      value={100*(attendanceData.presentEmployees / attendanceData.totalEmployees)}
                      text={`${attendanceData.presentEmployees}/${attendanceData.totalEmployees}`}
                      background
                      backgroundPadding={6}
                      styles={buildStyles({
                        backgroundColor: "#3e98c7",
                        textColor: "#fff",
                        pathColor: "#fff",
                        trailColor: "transparent"
                      })}
                    />
                  </div>
                ) : <div className="loader-container"><div className="loader"></div></div>}
                <div className='progress__text'>
                  <p className='progress_heading'>Employees Present</p>
                  <table>
                    <tbody>
                      <tr>
                        <td>Total Employees:</td>
                        <td>{attendanceData ? attendanceData.totalEmployees : 0}</td>
                      </tr>
                      <tr>
                        <td>Total Present:</td>
                        <td>{attendanceData ? attendanceData.presentEmployees : 0}</td>
                      </tr>
                    </tbody>
                  </table>
                  <Link to="/admin/employeeList">
                    <button className='button'>List of Employees</button>
                  </Link>
                </div>
              </div>
              <div className='card progress'>
                {attendanceData ? (
                  <div className='progress__bar'>
                    <CircularProgressbar
                      value={100*(attendanceData.absentEmployees/attendanceData.totalEmployees)}
                      text={`${attendanceData.absentEmployees}/${attendanceData.totalEmployees}`}
                      background
                      backgroundPadding={6}
                      styles={buildStyles({
                        backgroundColor: "#3e98c7",
                        textColor: "#fff",
                        pathColor: "#fff",
                        trailColor: "transparent"
                      })}
                    />
                  </div>
                ) : <div className="loader-container"><div className="loader"></div></div>}
                <div className='progress__text'>
                  <p className='progress_heading'>Employees Absent</p>
                  <table>
                    <tbody>
                      <tr>
                        <td>Total Employees:</td>
                        <td>{attendanceData ? attendanceData.totalEmployees : 0}</td>
                      </tr>
                      <tr>
                        <td>Total Absent:</td>
                        <td>{attendanceData ? attendanceData.absentEmployees : 0}</td>
                      </tr>
                    </tbody>
                  </table>
                  <Link to="/admin/leaveOfAll">
                    <button className='button'>View Leave History</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {!loading && !error && attendanceData && (
            <div className='dashboard__calendar__and__graph only__graph'>
              <div className='dashboard__graph'>
                <div className="admin__graph">
                  <BarChart
                    xAxis={[{ scaleType: 'band', data: ['Total', 'Present', 'Absent'] }]}
                    series={[{ data: [attendanceData ? attendanceData.totalEmployees : 0, attendanceData ? attendanceData.presentEmployees : 0, attendanceData ? attendanceData.absentEmployees : 0] }]}
                    width={500}
                    height={300}
                  />
                </div>
                <button className='button' onClick={captureScreenshot}>Download Graph</button>
              </div>
            </div>
          )}
          {loading && <div className="loader-container"><div className="loader"></div></div>}
          {error && <div className="error">Error: {error}</div>}
          {!loading && !attendanceData && <div className="error">No attendance data available</div>}
        </div>
      </div>

    </>
  );
};

export default AdminDashboard;
