import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  addCartItem = product => {
    // if cart item already in the carList then update the cart Quantity

    const {cartList} = this.state
    // find the product is exiisted in the cartList array
    // if you found the quantity of that cartList item is increase else product is inserted into the cartList
    const existedCartProduct = cartList.find(
      eachProduct => eachProduct.id === product.id,
    )
    console.log(existedCartProduct)
    if (existedCartProduct === undefined) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } else {
      // update quantity not reflected in same page when we go on other page it will reflect
      const newQuantity = product.quantity
      this.setState({
        cartList: [
          ...cartList.map(eachProduct => {
            if (eachProduct.id === product.id) {
              return {
                ...eachProduct,
                quantity: eachProduct.quantity + newQuantity,
              }
            }
          }),
        ],
      })
    }

    //   TODO: Update the code here to implement addCartItem
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const filteredCartList = cartList.filter(
      eachProduct => eachProduct.id !== id,
    )
    this.setState({cartList: filteredCartList})
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const cartProduct = cartList.find(eachProduct => eachProduct.id === id)
    cartProduct.quantity += 1
    this.setState({cartList: cartList})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const cartProduct = cartList.find(eachProduct => eachProduct.id === id)
    if (cartProduct.quantity === 1) {
      const filteredCartList = cartList.filter(
        eachProduct => eachProduct.id !== id,
      )
      this.setState({cartList: filteredCartList})
    } else {
      cartProduct.quantity -= 1
      this.setState({cartList: cartList})
    }
  }

  render() {
    const {cartList} = this.state
    console.log(cartList)
    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
