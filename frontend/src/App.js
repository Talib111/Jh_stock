import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from './components/Dashboard';
import Products from './components/Products';
import Form from './components/Form';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Header/>
      <Dashboard/>
      <Products/>
      <Form/>
    </div>
  );
}

export default App;
