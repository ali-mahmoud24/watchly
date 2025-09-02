import Header from "@/components/Header";
import SearchBar from "@/components/SearchMovie";
import Watchlist from "@/components/watchlist";

import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header />
      <main className="p-6">
        <Toaster
          richColors
          position="top-right"
          theme="light"
        />
        {/* SearchBar */}
        <SearchBar />
        {/* Watchlist */}
        <Watchlist />
      </main>
    </div>
  );
}

export default App;
