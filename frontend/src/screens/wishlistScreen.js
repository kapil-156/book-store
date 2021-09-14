import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToWishlist,  removeFromWishlist } from '../actions/wishlistActions';
import MessageBox from '../components/MessageBox';
 
export default function WishlistScreen(props) {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split('=')[1])
    : 1;
    const wishlist = useSelector((state) => state.wishlist);
    const { wishlistItems } = wishlist;
    const dispatch = useDispatch();
    useEffect(() => {
      if (productId) {
        dispatch(addToWishlist(productId, qty));
      }
    }, [dispatch, productId, qty]);
 
    const removeFromWishlistHandler = (id) => {
        // delete action
        dispatch(removeFromWishlist(id));
      };
 
  return (
    <div>
      
      <div className="row top">
      <div className="col-2">
        <h1>WishList</h1>
        {wishlistItems.length === 0 ? (
          <MessageBox>
            Wishlist is empty. <Link to="/">Go Home</Link>
          </MessageBox>
        ) : (
          <ul>
            {wishlistItems.map((item) => (
              <li key={item.product}>
                <div className="row">
                  <div>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="small"
                    ></img>
                  </div>
                  <div className="min-30">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>
                  
                  <div>${item.price}</div>
                  <div>
                    <button
                      type="button"
                      onClick={() => removeFromWishlistHandler(item.product)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="col-1">
        <div className="card card-body">
          <ul>
            <li>
              <h2>
                Subtotal ({wishlistItems.reduce((a, c) => a + c.qty, 0)} items) : $
                {wishlistItems.reduce((a, c) => a + c.price * c.qty, 0)}
              </h2>
            </li>
          </ul>
        </div>
      </div>
    </div>
    </div>
  );
}