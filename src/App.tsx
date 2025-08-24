import Header from './components/Header';
import SearchBar from './components/SearchMovie';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header />
      <main className="p-6">
        <SearchBar />
      </main>
    </div>
  );
}

export default App;
