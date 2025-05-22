import React from "react";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="w-full border-b bg-white h-16 flex items-center justify-between px-6 md:px-12 sticky top-0 z-10">
        <div className="flex items-center gap-2">
          {/* Placeholder for logo icon */}
          <div className="w-6 h-6 bg-black rounded-sm flex items-center justify-center" />
          <span className="font-semibold text-lg ml-2">Level ICT</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm text-neutral-800">
          <a href="#" className="hover:underline">How it works</a>
          <a href="#" className="hover:underline">Explore opportunities</a>
          <a href="#" className="hover:underline">Create profile</a>
          <a href="#" className="hover:underline">Sign in</a>
          <button className="ml-4 px-4 py-2 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 transition">Post an opportunity</button>
        </nav>
        <div className="md:hidden">
          {/* Mobile Hamburger Icon placeholder */}
          <div className="w-6 h-6 bg-gray-300 rounded" />
        </div>
      </header>
      {/* Main */}
      <main className="flex-1 w-full flex flex-col items-center px-2 md:px-0">
        {/* Hero Card */}
        <section className="w-full max-w-3xl mt-10 rounded-xl overflow-hidden shadow-sm bg-gradient-to-br from-rose-200/70 via-blue-100/80 to-slate-200/80 p-8 flex flex-col gap-4 text-left">
          <h1 className="text-3xl md:text-4xl font-bold leading-tight text-white drop-shadow">Unlocking Opportunities in the ICT Sector</h1>
          <p className="text-base md:text-lg text-white/90 mb-3">Connecting Businesses, Procurement Offices, and ICT Professionals.</p>
          <div className="bg-white rounded-lg flex items-center px-4 py-2 gap-2 max-w-lg shadow-inner">
            <span className="text-gray-400">
              {/* Magnifier (search) icon placeholder */}
              <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><circle cx="9" cy="9" r="7" stroke="#A3A3A3" strokeWidth="2"/><path d="M16 16l-3-3" stroke="#A3A3A3" strokeWidth="2" strokeLinecap="round"/></svg>
            </span>
            <input
              type="text"
              placeholder="Search professionals, businesses, and opportunities"
              className="flex-1 py-1 px-2 bg-transparent outline-none text-sm text-black"
              disabled
            />
            <button className="px-3 py-1 rounded bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition">Search</button>
          </div>
        </section>
        {/* Stats Cards */}
        <div className="w-full max-w-3xl mt-7 flex gap-4 flex-col md:flex-row">
          <div className="flex-1 border rounded-xl p-5 bg-white min-w-[180px]">
            <div className="mb-1 text-sm text-neutral-800">ICT Businesses</div>
            <div className="text-2xl font-bold">1,000+</div>
          </div>
          <div className="flex-1 border rounded-xl p-5 bg-white min-w-[180px]">
            <div className="mb-1 text-sm text-neutral-800">ICT Professionals</div>
            <div className="text-2xl font-bold">3,000+</div>
          </div>
        </div>
        {/* Detailed Stats Section */}
        <section className="max-w-3xl w-full flex flex-col md:flex-row mt-10 mb-10 md:mb-0 gap-0 md:gap-16 justify-between items-start">
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1">ICT Businesses</h3>
            <div className="text-neutral-700 text-sm flex flex-col gap-1">
              <span>Businesses registered</span>
              <span>Opportunities posted</span>
              <span>Opportunities filled</span>
            </div>
          </div>
          <div className="flex flex-col gap-1 items-end text-neutral-700 text-sm flex-1">
            <span>100+</span>
            <span>200+</span>
            <span>150+</span>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1 mt-6 md:mt-0">ICT Professionals</h3>
            <div className="text-neutral-700 text-sm flex flex-col gap-1">
              <span>Professionals registered</span>
              <span>Opportunities applied</span>
              <span>Opportunities accepted</span>
            </div>
          </div>
          <div className="flex flex-col gap-1 items-end text-neutral-700 text-sm flex-1">
            <span>500+</span>
            <span>1,000+</span>
            <span>800+</span>
          </div>
        </section>
        {/* Sidebar Action (mobile = bottom) */}
        <div className="flex w-full justify-end max-w-3xl mb-10">
          <button className="px-5 py-2 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 transition">Post an opportunity</button>
        </div>
      </main>
      {/* Footer */}
      <footer className="w-full bg-transparent border-t mt-auto py-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center md:justify-between gap-2 text-sm text-gray-500">
          <div className="flex gap-5 mb-2 md:mb-0">
            <a href="#" className="hover:underline">Contact us</a>
            <a href="#" className="hover:underline">About us</a>
            <a href="#" className="hover:underline">Terms of service</a>
            <a href="#" className="hover:underline">Privacy policy</a>
          </div>
          <div className="mx-auto md:mx-0">
            © 2023 Level ICT. All rights reserved
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
