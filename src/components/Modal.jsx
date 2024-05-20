import { useDispatch } from "react-redux";
import { closeModel } from "../features/modal/modalSlice";
import { clearCart } from "../features/cart/cartSlice";

const Modal = () => {
  const dispatch = useDispatch()
  return (
    <aside className="modal-container">
      <div className="modal">
        <h4>Remove all items your shopping cart ?</h4>
        <div className="btn-container">
          <button 
            className="btn confirm-btn"
            type="button" 
            onClick={() => {
              dispatch(clearCart());
              dispatch(closeModel());
            }}
          >
            confirm
          </button>
          <button 
              className="btn clear-btn"
              type="button" 
              onClick={() => dispatch(closeModel())}
            >
            cancel
          </button>
        </div>
      </div>
    </aside>
  )
}
export default Modal