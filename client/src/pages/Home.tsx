import React from "react";

const Home: React.FC = () => {
  return (
    <div className="flex flex-auto items-center justify-center min-h-screen bg-linear-to-br from-orange-300 to-yellow-500">
      <div className="flex max-w-3xl max-h p-5 rounded-2xl">
        <img
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.wallpapersafari.com%2F98%2F90%2FmjHyV5.jpg&f=1&nofb=1&ipt=b349f151cd35da8a3a239a460785937dc558f6551fcc4619543f88eec11499ba&ipo=images"
          alt="Concert"
          className="w-screen rounded-xl shadow-lg"
        />
      </div>
      <div className="flex max-w-2xl max-h text-center bg-stone-500/40 p-8 rounded-2xl shadow-lg mt-6">
        <div>
          <h1 className="text-5xl font-bold text-amber-900/70 mb-4 font-sans">
            Welcome to Next Venue
          </h1>
          <p className="text-lg text-black mb-6 font-sans">
            Discover and plan your next unforgettable event with ease. Check for
            weather updates and create RSVPs for you and your guests. Log in or
            register today to plan your next outing!
          </p>
          <button
            className="bg-amber-700 text-white px-6 py-3 rounded-xl text-lg font-semibold shadow-md hover:bg-amber-900 transition"
            onClick={() => (window.location.href = "/CreateEvent")}
          >
            Create Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
