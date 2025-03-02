import React from "react";

interface RSVP {
  id: number;
  event: string;
  date: string;
  status: "upcoming" | "past";
}

interface UserProfileProps {
  user: {
    name: string;
    username: string;
    email: string;
    profilePicture: string;
  };
  rsvps: RSVP[];
}

const UserProfile: React.FC<UserProfileProps> = ({ user, rsvps }) => {
  const upcomingRsvps = rsvps.filter((rsvp) => rsvp.status === "upcoming");
  const pastRsvps = rsvps.filter((rsvp) => rsvp.status === "past");

  return (
    <div className="flex flex-auto max-w-4xl mx-auto p-6 bg-stone-700/40 shadow-lg rounded-lg">
      <div className="flex items-center gap-4">
        <img
          src={user.profilePicture}
          alt="Profile"
          className="w-20 h-20 rounded-full border"
        />
        <div>
          <h2 className="flex text-xl font-bold">{user.name}</h2>
          <p className="flex text-gray-500">@{user.username}</p>
          <p className="flex text-gray-600">{user.email}</p>
        </div>
      </div>

      <div className="mt-6 p-2">
        <h3 className="text-lg font-semibold">Upcoming RSVPs</h3>
        <ul className="mt-2 space-y-2">
          {upcomingRsvps.length > 0 ? (
            upcomingRsvps.map((rsvp) => (
              <li key={rsvp.id} className="p-2 bg-amber-100 rounded-lg">
                {rsvp.event} - {rsvp.date}
              </li>
            ))
          ) : (
            <p className="text-gray-500">No upcoming events</p>
          )}
        </ul>
      </div>

      <div className="mt-6 p-2">
        <h3 className="text-lg font-semibold">Past RSVPs</h3>
        <ul className="mt-2 space-y-2">
          {pastRsvps.length > 0 ? (
            pastRsvps.map((rsvp) => (
              <li key={rsvp.id} className="p-2 bg-gray-200 rounded-lg">
                {rsvp.event} - {rsvp.date}
              </li>
            ))
          ) : (
            <p className="text-gray-500">No past events</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default UserProfile;
