import { React, useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, NavLink, BrowserRouter } from 'react-router-dom'
import '../assets/css/main.css' // Import main CSS file
import Header from '../components/header.jsx'
import HeaderForOrdersPage from '../components/headerForOrdersPage.jsx'
import FooterForDashboardPage from '../components/footerForDashboardPage.jsx'
import axios from 'axios';

const API = import.meta.env.VITE_EXPRESSAPI_URL_WITHOUT_SLASH; 

const Table = ({ theadData, tbodyData }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          {theadData.map((heading) => (
            <th key={heading}>{heading}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tbodyData.map((row) => (
          <tr key={row.id}>
            {row.items.map((item, index) => (
              <td key={index}>{item}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const OrdersTable = ({ orders }) => {
  const theadData = ["order_id", "date", "items", "total", "status"];

  const tbodyData = orders.map(order => ({
    id: order._id,
    items: [
      order._id.slice(-8),
      new Date(order.createdAt).toLocaleDateString(),
      (order.items || []).map(item => `${item.name} (x${item.quantity})`).join(', '),
      `$${(order.total || 0).toFixed(2)}`,
      order.paymentStatus
    ]
  }));

  return (
    <div className="bg-white">
      <Table theadData={theadData} tbodyData={tbodyData} />
    </div>
  )
}

function Orders() {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await axios.get(`${API}/payment/orders`,
          { headers: { authorization: `Bearer ${localStorage.getItem('authToken')}` } });
        setOrders(response.data || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  return (
    <>

      <Header />

      <div className="container">

        <div id="gridcontainer">

            <div id="one">
                <HeaderForOrdersPage />
            </div>

            <div id="two">
              <div className="container px-4 py-3 mb-0 mt-0" style={{backgroundColor: "#ffffff"}}>
                 <h2 className="mb-0">Orders</h2>
                 <hr />

                  {loading && <p>Loading orders&hellip;</p>}
                  {!loading && orders.length === 0 && <p>No orders yet. Once a checkout is completed, it will show up here.</p>}
                  {!loading && orders.length > 0 && <OrdersTable orders={orders} />}

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

export default Orders