import './App.css';
import Chatbox from './components/chatbot';
import './index.css'

function App() {
  return (
    <div className="flex flex-col h-screen items-center bg-zinc-900">
      <header className="p-12">
        <header className="text-6xl text-white">
          <h1>Chatbot UI</h1>
        </header>

      </header>
      <Chatbox />
    </div>
  );
}

export default App;
