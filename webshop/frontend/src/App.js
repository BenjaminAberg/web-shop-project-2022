import './App.css';
import RoutingComponent from './components/routing/RoutingComponent';
import Shop from './components/pages/Shop';
import LoadMore from './components/routing/LoadMore';

function App() {
    return (
      <div>
          <div className="Menu-bar">
                <div><RoutingComponent/></div>
          </div>
          <div className="App">
                <div><Shop/></div>
          </div>
          <div>
                <div><LoadMore/></div>
          </div>
      </div>
    );
}
  
export default App;