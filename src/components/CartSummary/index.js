import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const totalCheckoutPrice = cartList.reduce(
        (total, eachProduct) =>
          total + eachProduct.quantity * eachProduct.price,
        0,
      )
      return (
        <div className="cart-summary-container">
          <div>
            <h1 className="order-total-heading">
              Order Total:{' '}
              <span className="span-total">Rs {totalCheckoutPrice}/-</span>
            </h1>
            <p className="item-count-para">{cartList.length} items in cart</p>
            <button className="checkout-btn" type="button">
              Checkout
            </button>
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
