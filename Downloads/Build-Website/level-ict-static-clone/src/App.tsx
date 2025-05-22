import type React from "react";
import { useState } from "react";

// Mock data for professionals and businesses
const mockResults = [
  {
    id: 1,
    name: "Acme Tech Solutions",
    type: "Business",
    description: "Cloud services and software development"
  },
  {
    id: 2,
    name: "Jane Doe",
    type: "Professional",
    description: "Full Stack Developer"
  },
  {
    id: 3,
    name: "ProcureIT Ltd.",
    type: "Business",
    description: "Procurement consulting for ICT sector"
  },
  {
    id: 4,
    name: "John Smith",
    type: "Professional",
    description: "Network Infrastructure Engineer"
  },
  {
    id: 5,
    name: "Connect Professionals Inc.",
    type: "Business",
    description: "IT Staffing & Talent Solutions"
  },
  {
    id: 6,
    name: "Amira Kamau",
    type: "Professional",
    description: "Data Analyst"
  }
];

function App() {
  // State for search functionality
  const [query, setQuery] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [results, setResults] = useState(mockResults);

  // Handle search
  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = query.trim().toLowerCase();
    setSearchActive(true);
    if (trimmed === "") {
      setResults(mockResults);
      return;
    }
    setResults(
      mockResults.filter(
        (item) =>
          item.name.toLowerCase().includes(trimmed) ||
          item.description.toLowerCase().includes(trimmed)
      )
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header/Nav */}
      <header className="w-full border-b bg-white">
        <div className="max-w-6xl mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-center space-x-2">
            <span className="inline-block rounded-[4px] bg-black w-4 h-4 mr-2" />
            <span className="font-semibold text-lg">Level ICT</span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm">
            <a href="#" className="hover:underline">How it works</a>
            <a href="#" className="hover:underline">Explore opportunities</a>
            <a href="#" className="hover:underline">Create profile</a>
            <a href="#" className="hover:underline">Sign in</a>
            <button className="ml-4 px-4 py-2 font-semibold bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition-colors">Post an opportunity</button>
          </nav>
        </div>
      </header>

      {/* Main Card Section */}
      <main className="flex-1 w-full px-2 flex flex-col items-center pt-8 pb-12">
        <section className="w-full max-w-3xl">
          <div className="rounded-2xl overflow-hidden mb-8 shadow" style={{ background: "linear-gradient(120deg, #cab6c1 0%, #9ac2cd 85%)" }}>
            <div className="p-10 md:p-12">
              <h1 className="text-white text-3xl md:text-4xl font-bold mb-4">
                Unlocking Opportunities in the ICT Sector
              </h1>
              <p className="text-white text-base md:text-lg mb-6">
                Connecting Businesses, Procurement Offices, and ICT Professionals.
              </p>
              <form
                className="flex bg-white/80 rounded-lg shadow-inner items-center px-4 py-2"
                onSubmit={handleSearch}
              >
                <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="8" strokeWidth="2" /><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M21 21l-2-2" /></svg>
                <input
                  type="text"
                  placeholder="Search professionals, businesses, and opportunities"
                  className="flex-1 px-2 py-1 bg-transparent outline-none"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="ml-2 px-4 py-2 bg-blue-600 text-white rounded font-semibold shadow hover:bg-blue-700 transition-colors"
                >
                  Search
                </button>
              </form>
              {/* Results */}
              {searchActive && (
                <div className="mt-6 bg-white/95 rounded-lg shadow-lg px-4 py-4">
                  {results.length > 0 ? (
                    <ul className="divide-y divide-gray-200">
                      {results.map(item => (
                        <li key={item.id} className="py-3 flex flex-col md:flex-row md:items-center md:justify-between">
                          <div>
                            <span className="font-medium text-gray-900">{item.name}</span>
                            <span className="ml-3 text-xs text-gray-500 font-semibold px-2 py-1 rounded bg-gray-100 inline-block">
                              {item.type}
                            </span>
                            <div className="text-gray-500 text-sm">{item.description}</div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-center text-gray-400 py-6">No results found</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Stat cards */}
        <section className="w-full max-w-3xl flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 border rounded-xl py-5 px-6 bg-white">
            <div className="text-[13px] text-gray-700 mb-1">ICT Businesses</div>
            <div className="font-bold text-2xl">1,000+</div>
          </div>
          <div className="flex-1 border rounded-xl py-5 px-6 bg-white">
            <div className="text-[13px] text-gray-700 mb-1">ICT Professionals</div>
            <div className="font-bold text-2xl">3,000+</div>
          </div>
        </section>

        {/* Details/statistics breakdown */}
        <section className="w-full max-w-3xl flex flex-row gap-4 items-start">
          <div className="flex-1">
            <div className="font-semibold mb-2">ICT Businesses</div>
            <ul className="text-gray-700 text-[15px] space-y-2 mb-6">
              <li className="flex justify-between"><span>Businesses registered</span> <span className="ml-8 text-gray-900 font-medium">100+</span></li>
              <li className="flex justify-between"><span>Opportunities posted</span> <span className="ml-8 text-gray-900 font-medium">200+</span></li>
              <li className="flex justify-between"><span>Opportunities filled</span> <span className="ml-8 text-gray-900 font-medium">150+</span></li>
            </ul>
            <div className="font-semibold mb-2">ICT Professionals</div>
            <ul className="text-gray-700 text-[15px] space-y-2">
              <li className="flex justify-between"><span>Professionals registered</span> <span className="ml-8 text-gray-900 font-medium">500+</span></li>
              <li className="flex justify-between"><span>Opportunities applied</span> <span className="ml-8 text-gray-900 font-medium">1,000+</span></li>
              <li className="flex justify-between"><span>Opportunities accepted</span> <span className="ml-8 text-gray-900 font-medium">800+</span></li>
            </ul>
          </div>
          <div className="flex flex-col items-end gap-6 min-w-[200px] mt-6 md:mt-0">
            <button className="px-5 py-3 font-semibold bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition-colors whitespace-nowrap">
              Post an opportunity
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t pt-10 pb-8 bg-white mt-auto">
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-8 px-4">
          <div className="flex gap-12 text-sm text-gray-500 mb-2">
            <a href="#" className="hover:underline">Contact us</a>
            <a href="#" className="hover:underline">About us</a>
            <a href="#" className="hover:underline">Terms of service</a>
            <a href="#" className="hover:underline">Privacy policy</a>
          </div>
          <div className="text-xs text-gray-400 text-center">© 2023 Level ICT. All rights reserved</div>
        </div>
      </footer>
    </div>
  );
}

export default App;
