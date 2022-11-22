import React, { Component } from "react"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: []
      };
  }

    async componentDidMount() {
      try {
        const res = await fetch('http://127.0.0.1:8000/products');
        const productList = await res.json();
        this.setState({
          productList
        });
      } catch (e) {
        console.log(e);
    }
    }

    renderItems = () => {
      const products = this.state.productList;
      return products.map( item => (
        <li 
          key={item.id}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <span 
            name={item.name}
            >
              {item.name}
            </span>
        </li>
      ));
    };

    render() {
      return (
        <main className="content">
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <ul className="list-group list-group-flush">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
      </main>
      )
    }
  }
  
export default App;