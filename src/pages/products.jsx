import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import '../assets/css/main.css' // Import main CSS file
import '../assets/css/products.css' // product card grid
import Header from '../components/header.jsx'
import HeaderForProductsPage from '../components/headerForProductsPage.jsx'
import FooterForDashboardPage from '../components/footerForDashboardPage.jsx'
import axios from 'axios';
import { incrementCartCount } from '../redux/cartSlice.jsx';

function Products() {

  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(5);

  useEffect( () => {
    
    async function fetchProducts() {
      await axios.get('http://localhost:3000/product/getallproductsfromdatabase/' + productsPerPage)
        .then(response => {
          // console.log('Products fetched:', response.data);
          // Handle the fetched products data as needed
          setProducts(response.data);
        })
        .catch(error => {
          console.error('Error fetching products:', error);
        });
    }

    fetchProducts();

  }, [productsPerPage, currentPage]);
  
  async function addToCart(productId) {
    // Logic to add product to cart
    console.log(`Adding product ${productId} to cart`);

    //check if product already in cart
    const existingCartItem = await axios.get(`http://localhost:3000/cart/check/${productId}`)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error('Error checking cart item:', error);
        return null;
      });

    if (existingCartItem && existingCartItem.exists) {
      alert('Product is already in the cart.');
      return;
    }

    const product = products.find(p => p.id === productId);
    if (!product) return;

    try {
      await axios.post('http://localhost:3000/cart', {
        id: productId,
        productId: productId,
        name: product.name,
        category: product.category,
        price: product.price,
        image: product.image,
        description: product.description,
        quantity: 1 // Default quantity
      })
      .then(response => {
        console.log('Product added to cart:', response.data);
        dispatch(incrementCartCount());
        alert('Product added to cart!');
      })
      .catch(error => {
        console.error('Error adding product to cart:', error);
        alert('Failed to add product to cart.');
      });
    } catch (error) {
      console.error('Error in addToCart function:', error);
    }

  }

  function handleProductsPerPageChange(event) {
    setProductsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1); // Reset to first page on change
  }

  return (
    <>

      <Header />

      <div className="container">

        <div id="gridcontainer">

            <div id="one">
                <HeaderForProductsPage />
            </div>

            <div id="two">
              
              <div className="container text-bg-light px-4 py-3 mb-0 mt-0">
                <div className="row text-bg-light">

                  <div className="col-12 d-flex align-items-center justify-content-between flex-wrap px-2 pt-3">
                    <h2 className="mb-0">Products</h2>
                    <div>
                      <label htmlFor="productsPerPage" className="me-2">Items:</label>
                      <select id="productsPerPage" name="productsPerPage" value={productsPerPage} onChange={handleProductsPerPageChange} className="products-select">
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-12">
                    <hr />
                  </div>

                  <div className="col-12">
                    <h3>Top Sellers</h3>
                    <div className="product-grid">
                      {products.map(product => (
                        <article key={product.id} className="product-card">
                          <div className="product-card-media">
                            <img src={product.image} alt={product.name} loading="lazy" />
                          </div>
                          <div className="product-card-body">
                            <h5 className="product-card-title" title={product.name}>{product.name}</h5>
                            <p className="product-card-category">{product.category}</p>
                            <p className="product-card-desc" title={product.description}>{product.description}</p>
                            <div className="product-card-footer">
                              <div>
                                <span className="product-card-price">{product.price}</span>
                                <small className="text-muted d-block">Buy/Sell</small>
                              </div>
                              <button onClick={() => addToCart(product.id)} className="btn btn-dark btn-sm">Add to cart</button>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

            </div>

            <div id="seven">
              <FooterForDashboardPage />
            </div>
        
        </div>

      </div>

    </>
  )
}

export default Products
