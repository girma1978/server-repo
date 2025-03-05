import { Link } from 'react-router-dom';
import UserList from '../components/UserList';
import EventList from '../components/EventList';
import RSVPList from '../components/RSVPList';

const Home = () => {
  return (
    <div className="home-page-container">
      <h1>Welcome to the Event Management System</h1>
      <nav>
        <ul className="navigation-list">
          <li><Link to="/users">Users</Link></li>
          <li><Link to="/events">Events</Link></li>
          <li><Link to="/rsvps">RSVPs</Link></li>
        </ul>
      </nav>
      
      <section>
        <h2>Users</h2>
        <UserList />
      </section>

      <section>
        <h2>Events</h2>
        <EventList />
      </section>

      <section>
        <h2>RSVPs</h2>
        <RSVPList />
      </section>
    </div>
  );
}

export default Home;
