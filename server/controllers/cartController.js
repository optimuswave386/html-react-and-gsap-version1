 //controller/cartController.js

// Example data source (replace with actual database logic)
// let cartItems = [
//  { id: 1, productId: 1, name: 'Bluetooth Speaker', category: 'Electronics', price: 100, image: 'Electronics1.jpg', description: 'A bluetooth speaker', quantity: 2 },
//  { id: 2, productId: 2, name: 'Wireless Controller', category: 'Electronics', price: 20, image: 'Electronics2.jpg', description: 'A wireless controller', quantity: 1 }
//]; 
let cartItems = []; 

// route is /cart/
// Controller to get all cart items
exports.getAllCartItems = (req, res) => {
  res.status(200).json(cartItems);
};

// route is /cart/:id
// Controller to get a single cart item by ID
exports.getCartItemById = (req, res) => {
  const itemId = parseInt(req.params.id);
  const item = cartItems.find(i => i.id === itemId);

  if (item) {
    res.status(200).json(item);
  } else {
    res.status(404).send('Cart item not found');
  }
};

// POST
// Controller to add an item to the cart
exports.addItemToCart = (req, res) => {
  const newItem = req.body; // Assuming middleware like express.json() is used
  cartItems.push(newItem);
  res.status(201).json(newItem);
};

// PUT
// Controller to update a cart item
exports.updateCartItem = (req, res) => {
  const itemId = parseInt(req.params.id);
  const updatedItem = req.body; // Assuming middleware like express.json() is used
  const itemIndex = cartItems.findIndex(i => i.id === itemId);

  if (itemIndex !== -1) {
    cartItems[itemIndex] = updatedItem;
    res.status(200).json(updatedItem);
  } else {
    res.status(404).send('Cart item not found');
  }
};

// DELETE
// Controller to remove an item from the cart
exports.removeItemFromCart = (req, res) => {
  const itemId = parseInt(req.params.id);   
  const itemIndex = cartItems.findIndex(i => i.id === itemId);

  if (itemIndex !== -1) {
    cartItems.splice(itemIndex, 1);
    res.status(200).send('Item removed from cart');
  } else {
    res.status(404).send('Cart item not found');
  }
};

// DELETE all
// Controller to clear the entire cart — used after a successful checkout
exports.clearCart = (req, res) => {
  cartItems.length = 0;
  res.status(200).send('Cart cleared');
};

// Controller to check if a product is already in the cart
exports.checkCartItem = (req, res) => {
  const productId = parseInt(req.params.productId);
  const item = cartItems.find(i => i.productId === productId);

  if (item) {
    res.status(200).json({ exists: true });
  } else {
    res.status(200).json({ exists: false });
  }
};

// Controller to patch item quantity in cart
exports.patchCartItemQuantity = (req, res) => {
  const itemId = parseInt(req.params.id);
  const { quantity } = req.body; // Assuming middleware like express.json() is used
  const itemIndex = cartItems.findIndex(i => i.id === itemId);

  if (itemIndex !== -1) {
    cartItems[itemIndex].quantity = quantity;
    res.status(200).json(cartItems[itemIndex]);
  } else {
    res.status(404).send('Cart item not found');
  }
};