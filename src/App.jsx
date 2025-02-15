import Navbar from "./components/Navbar"
import CarContainer from "./components/CartContainer";
import Modal from "./components/Modal";
import { useDispatch, useSelector } from "react-redux";
import { calculateTotals, getCartItems } from "./features/cart/cartSlice";
import { useEffect } from "react";

const App = () => {
  const { cartItems, isLoading } = useSelector((store) => store.cart);
  const { isOpen } = useSelector((store) => store.modal);

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems]);

  useEffect(() => {
    dispatch(getCartItems());
  }, [])

  if (isLoading) {
    return (
      <div className="loading">
        <h3>Loading...</h3>
      </div>
    )
  }
  
  return (
    <main>
      { isOpen && ( <Modal /> )}
      <Navbar />
      <CarContainer />
    </main>
  )
}
export default App
