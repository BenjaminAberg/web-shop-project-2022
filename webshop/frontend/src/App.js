import './App.css';
import RoutingComponent from './components/routing/RoutingComponent';
import Shop from './components/pages/Shop';

function App() {
    return (
      <div>
          <div className="App">
                <div><RoutingComponent/></div>
          </div>
          <div className="App">
                <div><Shop/></div>
          </div>
      </div>
    );
}
  
export default App;