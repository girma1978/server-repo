import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'; // Path to the Home component
import UserList from './components/UserList'; // Path to UserList
import EventList from './components/EventList'; // Path to EventList
import RSVPList from './components/RSVPList'; // Updated path to RSVPList
import './App.css'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/events" element={<EventList />} />
        <Route path="/rsvps" element={<RSVPList />} /> {/* Changed path to "/rsvps" */}
      </Routes>
    </Router>
  );
}

export default App;
