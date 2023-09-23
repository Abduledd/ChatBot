import './App.css';
import Chatbox from './components/chatbot';
import './index.css'
import logo from './assets/LogoBgBlack-removebg-preview.png'

function App() {
  return (
    <div className="flex flex-col h-screen items-center bg-gray-900">
      <header className="p-3 flex items-center justify-center">
        <img src={logo} alt="Logo" className="mr-4 h-32 w-32" />
        <div className="text-6xl text-white">
          <h1 className="text-center">Chatbot UI</h1>
        </div>
      </header>
      <Chatbox />
    </div>



  );
}

export default App;
