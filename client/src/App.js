import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import EmployeeRegistration from './pages/employeeRegistration';


function App() {
  return (
    <div className="App">
      <Navbar title="Praathee Employee Registration" />
      <EmployeeRegistration />
      <Footer title="© Praathee Media Private Ltd.. 2024 All rights reserved." />
    </div>
  );
}

export default App;
