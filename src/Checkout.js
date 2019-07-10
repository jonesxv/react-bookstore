import React from 'react';
import del from './del.png';

class Checkout extends React.Component {

  render() {
    const cartList = Object.keys(this.props.cart).map(key => {
      const cart = this.props.cart;
      return (
        <tr key="key">
          <td>{cart[key].title}</td>
          <td><img onClick={() => this.props.removeBook(key)} alt="del" className="icon" src={del}></img></td>
        </tr>
        
      )
    })
    const total = Object.keys(this.props.cart).reduce((sum, item) => {
      return sum + this.props.cart[item].price
    }, 0)
    return (
      <div className="Checkout">
        <h3>Cart</h3>
          <table className="highlight">
            <thead>
              <tr>
                <th>Title</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {cartList}
            </tbody>
          </table>
          <p>Total: ${total}</p>
      </div>
    );
  }

}

export default Checkout;
