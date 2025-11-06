import React, { useState } from "react";

// Single-file React prototype for "SyncUp — The Smart Campus Companion"
// - Default export a React component so this can be dropped into a React app (CRA/Vite) with TailwindCSS enabled.
// - Mobile-first, responsive layout. University colors: blue (#0b5ed7), white, light grey.
// - No backend: placeholders/hooks where API calls should be added.

export default function SyncUpPrototype() {
  const [route, setRoute] = useState("home");
  const [user] = useState({ name: "Arjun Kumar", initials: "AK", wallet: 500, year: "1st Year", dept: "Computer Science" });

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header user={user} onNavigate={setRoute} />

      <main className="max-w-6xl mx-auto px-4 py-6">
        {route === "home" && <Home onNavigate={setRoute} user={user} />}
        {route === "study" && <StudyHub onNavigate={setRoute} />}
        {route === "teacher" && <TeacherTracker onNavigate={setRoute} />}
        {route === "skill" && <SkillSwap onNavigate={setRoute} />}
        {route === "profile" && <Profile user={user} />}
      </main>

      <footer className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white shadow-md rounded-full px-4 py-2 hidden md:flex gap-4">
        <NavButton onClick={() => setRoute("home")} label="Home" />
        <NavButton onClick={() => setRoute("study")} label="Study Hub" />
        <NavButton onClick={() => setRoute("teacher")} label="Teacher Tracker" />
        <NavButton onClick={() => setRoute("skill")} label="SkillSwap" />
        <NavButton onClick={() => setRoute("profile")} label="Profile" />
      </footer>
    </div>
  );
}

function Header({ user, onNavigate }) {
  return (
    <header className="bg-white border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate("home")}>
            <div className="w-8 h-8 rounded-md bg-blue-600 text-white flex items-center justify-center font-bold">SU</div>
            <div className="text-lg font-semibold">SyncUp</div>
          </div>
          <nav className="hidden md:flex gap-4 ml-6 text-sm text-gray-600">
            <button onClick={() => onNavigate("home")} className="py-1 px-2">Home</button>
            <button onClick={() => onNavigate("study")} className="py-1 px-2">Study Hub</button>
            <button onClick={() => onNavigate("teacher")} className="py-1 px-2">Teacher Tracker</button>
            <button onClick={() => onNavigate("skill")} className="py-1 px-2">SkillSwap</button>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:block text-sm text-gray-600">₹{user.wallet}</div>
          <div onClick={() => onNavigate("profile")} className="w-9 h-9 rounded-full bg-blue-700 text-white flex items-center justify-center font-medium cursor-pointer">{user.initials}</div>
        </div>
      </div>
    </header>
  );
}

function NavButton({ onClick, label }) {
  return (
    <button onClick={onClick} className="text-sm px-3 py-2 hover:bg-gray-100 rounded-md">{label}</button>
  );
}

function Home({ onNavigate, user }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Welcome back, {user.name.split(" ")[0]}! 👋</h1>
        <div className="md:hidden flex gap-2">
          <button onClick={() => onNavigate("study")} className="px-3 py-2 bg-blue-600 text-white rounded-md">Study Hub</button>
          <button onClick={() => onNavigate("teacher")} className="px-3 py-2 bg-blue-600 text-white rounded-md">Teachers</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Group Study Hub" desc="Create or join study rooms, chat, and schedule sessions." actionLabel="Open" onAction={() => onNavigate("study")} />
        <Card title="Teacher's Cabin Tracker" desc="See live availability and request appointments." actionLabel="Open" onAction={() => onNavigate("teacher")} />
        <Card title="SkillSwap Marketplace" desc="Post or bid on microtasks like tutoring or digitizing notes." actionLabel="Open" onAction={() => onNavigate("skill")} />
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-medium mb-2">Recent Activity</h3>
          <ul className="text-sm text-gray-600 space-y-3">
            <li>Joined C Programming study session — 2 hours ago</li>
            <li>Completed Notes Digitizing task for ₹150 — Yesterday</li>
            <li>Appointment with Dr. Sharma confirmed — 2 days ago</li>
          </ul>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm md:col-span-2">
          <h3 className="font-medium mb-2">Quick Stats</h3>
          <div className="space-y-3">
            <Stat label="Study Sessions" value={12} />
            <Stat label="Tasks Completed" value={8} />
            <Stat label="Wallet Balance" value={`₹${user.wallet}`} highlight />
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ title, desc, actionLabel, onAction }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm font-semibold text-gray-700">{title}</div>
          <div className="text-xs text-gray-500 mt-1">{desc}</div>
        </div>
        <div>
          <button onClick={onAction} className="mt-1 bg-blue-700 text-white px-3 py-1 rounded-md">{actionLabel}</button>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, highlight }) {
  return (
    <div className="flex items-center justify-between bg-gray-100 p-3 rounded-md">
      <div className="text-sm text-gray-600">{label}</div>
      <div className={`text-sm font-semibold ${highlight ? "text-green-600" : "text-gray-800"}`}>{value}</div>
    </div>
  );
}

// ---------------- Study Hub Page ----------------
function StudyHub() {
  const rooms = [
    { id: 1, tag: "C Programming", title: "C Programming Basics Study Group", members: "8/15", owner: "Rohan Kumar", time: "Today, 5:00 PM", joined: true },
    { id: 2, tag: "Mathematics-I", title: "Calculus Problem Solving", members: "12/20", owner: "Priya Sharma", time: "Tomorrow, 3:00 PM" },
    { id: 3, tag: "Physics", title: "Physics Lab Preparation", members: "6/10", owner: "Aditya Singh", time: "Today, 7:00 PM", joined: true },
    { id: 4, tag: "Python", title: "Python Data Structures", members: "15/25", owner: "Sneha Patel", time: "Nov 8, 4:00 PM" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Group Study Hub</h2>
        <div>
          <button className="px-3 py-2 bg-blue-700 text-white rounded-md">+ Create Room</button>
        </div>
      </div>

      <div className="bg-white p-3 rounded-md">
        <input placeholder="Search study rooms..." className="w-full border rounded-md p-2 text-sm" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rooms.map((r) => (
          <div key={r.id} className="bg-white p-4 rounded-md shadow-sm">
            <div className="flex items-center justify-between">
              <div className="text-xs text-gray-500">{r.tag}</div>
              {r.joined && <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Joined</div>}
            </div>
            <h3 className="font-semibold mt-2">{r.title}</h3>
            <p className="text-sm text-gray-500 mt-1">Learn pointers, arrays, and functions together</p>
            <div className="flex items-center gap-3 text-sm text-gray-600 mt-3">
              <div>👥 {r.members}</div>
              <div>•</div>
              <div>🧑‍🏫 {r.owner}</div>
            </div>
            <div className="mt-3 flex gap-3">
              {r.joined ? (
                <button className="flex-1 bg-blue-700 text-white rounded-md py-2">Open Chat</button>
              ) : (
                <button className="flex-1 bg-white border rounded-md py-2">Join Room</button>
              )}
              <button className="py-2 px-3 border rounded-md">📅 {r.time}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------- Teacher Tracker Page ----------------
function TeacherTracker() {
  const teachers = [
    { id: 1, name: "Dr. Rajesh Sharma", dept: "Computer Science", subject: "C Programming", cabin: "CS-301", status: "Free" },
    { id: 2, name: "Prof. Priya Gupta", dept: "Mathematics", subject: "Mathematics-I", cabin: "MA-205", status: "In Class", next: "3:00 PM" },
    { id: 3, name: "Dr. Anil Patel", dept: "Physics", subject: "Physics", cabin: "PH-102", status: "Free" },
    { id: 4, name: "Prof. Sunita Kumar", dept: "Computer Science", subject: "Python", cabin: "CS-304", status: "On Leave" },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Teacher's Cabin Tracker</h2>
      <p className="text-sm text-gray-600">Check real-time availability and request appointments with your teachers</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {teachers.map((t) => (
          <div key={t.id} className="bg-white p-4 rounded-md shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">👩‍🏫</div>
              </div>
              <div className={`text-sm px-2 py-1 rounded-full ${t.status === "Free" ? "bg-green-100 text-green-700" : t.status === "In Class" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-700"}`}>
                {t.status}
              </div>
            </div>

            <h3 className="font-semibold mt-3">{t.name}</h3>
            <div className="text-sm text-gray-600">{t.dept}</div>
            <div className="text-sm text-gray-500 mt-2">📚 {t.subject}</div>
            <div className="text-sm text-gray-500">📍 Cabin: {t.cabin}</div>
            {t.next && <div className="text-sm text-gray-500 mt-1">Next: {t.next}</div>}

            <div className="mt-4">
              {t.status === "Free" ? (
                <button className="w-full bg-blue-700 text-white py-2 rounded-md">Meet Now</button>
              ) : (
                <button className="w-full border py-2 rounded-md">Request Appointment</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------- SkillSwap Page ----------------
function SkillSwap() {
  const tasks = [
    { id: 1, tag: "Notes Digitizing", title: "Digitize Physics Lab Notes", price: 150, owner: "Priya Sharma", bids: 3, posted: "2 hours ago" },
    { id: 2, tag: "Code Help", title: "Python Assignment Help", price: 300, owner: "Rohan Patel", bids: 5, posted: "5 hours ago" },
    { id: 3, tag: "Design Work", title: "PPT Design for Engineering Project", price: 400, owner: "Ananya Singh", bids: 7, posted: "1 day ago" },
    { id: 4, tag: "Tutoring", title: "Mathematics Tutoring Session", price: 500, owner: "Karan Verma", bids: 4, posted: "2 days ago" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">SkillSwap Marketplace</h2>
        <button className="px-3 py-2 bg-blue-700 text-white rounded-md">+ Post Task</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tasks.map((t) => (
          <div key={t.id} className="bg-white p-4 rounded-md shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs text-gray-500">{t.tag}</div>
                <h3 className="font-semibold mt-1">{t.title}</h3>
                <p className="text-sm text-gray-500 mt-1">Posted by {t.owner} • {t.posted}</p>
              </div>
              <div className="text-green-700 font-semibold">₹{t.price}</div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-gray-600">{t.bids} bids received</div>
              <button className="bg-blue-700 text-white px-4 py-2 rounded-md">Place Bid</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------- Profile Page ----------------
function Profile({ user }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white p-4 rounded-md shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-blue-700 text-white flex items-center justify-center text-xl font-semibold">{user.initials}</div>
          <div>
            <div className="font-semibold">{user.name}</div>
            <div className="text-sm text-gray-500">B.Tech Student</div>
            <div className="text-sm mt-2">⭐ 4.8 (24 ratings)</div>
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-600">
                 <div>LinkedIn: https://www.linkedin.com/in/arjunkumar_72/</div>
                <div>Email ID: arjun.kumar@college.edu.in</div>
                <div>Location: Delhi, India</div>
                <div>Subject: Computer Science</div>
        </div>

        <div className="mt-4">
          <h4 className="text-sm font-medium">Statistics</h4>
          <div className="mt-2 space-y-2">
            <Stat label="Study Sessions" value={12} />
            <Stat label="Tasks Completed" value={8} />
            <Stat label="Wallet Balance" value={`₹${user.wallet}`} highlight />
          </div>
        </div>
      </div>

      <div className="md:col-span-2 bg-white p-4 rounded-md shadow-sm">
        <h3 className="font-semibold">Profile Details</h3>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <div className="text-xs text-gray-500">Year</div>
            <div className="font-medium">{user.year}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Department</div>
            <div className="font-medium">{user.dept}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">College</div>
            <div className="font-medium">Indian Institute of Technology</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Tasks Posted</div>
            <div className="font-medium">5 tasks</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/*
Notes for usage:
- Drop this file into any React project and import + render <SyncUpPrototype /> in App.jsx.
- This prototype uses TailwindCSS classes. To get the same look, run inside a project with Tailwind configured.
- Replace placeholder data with API calls as backend is developed. Hooks/handlers to add: createRoom, joinRoom, requestAppointment, postTask, placeBid, login.
- Colors are kept to blue/white/light-gray and a minimal, professional aesthetic suitable for a hackathon demo.
*/
