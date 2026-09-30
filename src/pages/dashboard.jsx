import { React, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import '../assets/css/main.css' // Import main CSS file
import Header from '../components/header.jsx'
import HeaderForDashboardPage from '../components/headerForDashboardPage.jsx'
import FooterForDashboardPage from '../components/footerForDashboardPage.jsx'
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale,PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { Card } from 'react-bootstrap';
import axios from 'axios';
import { logout } from '../redux/authSlice.jsx';

ChartJS.register(CategoryScale, LinearScale, ArcElement, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

const CHART_COLORS = [
  'rgb(179, 170, 248)',
  'rgb(54, 162, 235)',
  'rgb(255, 205, 86)',
  'rgb(75, 192, 192)',
  'rgb(153, 102, 255)',
  'rgb(255, 159, 64)'
];

// Group orders by month (e.g. "Jan 2026") and sum their totals
function buildMonthlyRevenue(orders) {
  const byMonth = {};
  orders.forEach(order => {
    const label = new Date(order.createdAt).toLocaleDateString(undefined, { month: 'short', year: 'numeric' });
    byMonth[label] = (byMonth[label] || 0) + order.total;
  });
  const labels = Object.keys(byMonth);
  return {
    labels,
    datasets: [{
      label: 'Revenue ($)',
      backgroundColor: CHART_COLORS,
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 1,
      data: labels.map(label => Number(byMonth[label].toFixed(2)))
    }]
  };
}

// Count orders placed per month
function buildOrdersPerMonth(orders) {
  const byMonth = {};
  orders.forEach(order => {
    const label = new Date(order.createdAt).toLocaleDateString(undefined, { month: 'short', year: 'numeric' });
    byMonth[label] = (byMonth[label] || 0) + 1;
  });
  const labels = Object.keys(byMonth);
  return {
    labels,
    datasets: [{
      label: 'Orders placed',
      data: labels.map(label => byMonth[label]),
      backgroundColor: CHART_COLORS,
      borderColor: '#007bff',
      borderWidth: 1,
      pointBackgroundColor: '#007bff',
      lineTension: 0
    }]
  };
}

// Sum revenue by product category across all order line items
function buildSalesByCategory(orders) {
  const byCategory = {};
  orders.forEach(order => {
    (order.items || []).forEach(item => {
      const key = item.category || 'Uncategorized';
      byCategory[key] = (byCategory[key] || 0) + (item.price || 0) * (item.quantity || 1);
    });
  });
  const labels = Object.keys(byCategory);
  return {
    labels,
    datasets: [{
      label: 'Sales by category',
      data: labels.map(label => Number(byCategory[label].toFixed(2))),
      backgroundColor: CHART_COLORS,
      hoverOffset: 4,
      borderColor: '#007bff',
      borderWidth: 1
    }]
  };
}

const ChartCard = ({ title, children }) => (
  <Card style={{ width: '100%', backgroundColor: 'transparent', padding: '0', border: 'none' }}>
    <Card.Body style={{ backgroundColor: '#ffffff'}}>
      <Card.Title style={{ backgroundColor: '#ffffff'}}>{title}</Card.Title>
      {children}
    </Card.Body>
  </Card>
);


const getCookieValue = (name) => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i=0;i < ca.length;i++) {
        let c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}


function Dashboard() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  // Access the state, defaulting to an empty object if no state exists
  // User details can be accessed via location.state
  // To access specific properties, you can destructure them like this:
  // name, age, email, _id, etc.
  // const { name, age, email, id } = location.state || {}; 
  // const { email } = location.state || getCookieValue('email') || {};
  const email = useSelector((state) => state.auth.email);

  useEffect(() => {

    // This will log the state passed from the LoginForm component
    // console.log('Email from location state or cookie:', email);
    // console.log('Email from cookie:', getCookieValue('email'));
    // console.log('Location state:', location.state);
    // console.log('Session token on dashboard page:', localStorage.getItem('authToken'));

    //validate the token here if needed
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.log('No valid token found. Redirecting to login.');
      navigate('/login');
    }

    async function validateToken() {
      try {
        await axios.post(import.meta.env.VITE_EXPRESSAPI_URL + 'user/auth/' + email, {}, {
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
          }
        })
        .then(response => {
          //console.log('Token validation response:', response.data);
          if (response.data.valid) {
            console.log('Token is valid.');
          } else {
            console.log('Token is invalid. Redirecting to login.');
            dispatch(logout()); // clear the stale login state everywhere
            navigate('/login?isAuthenticated=false');
          }
        })
        .catch(error => {
          console.error('Error validating token:', error);
          if ([401, 403].includes(error.response?.status)) dispatch(logout());
          navigate('/login');
        });

      } catch (error) {
          console.error('Unexpected error during token validation:', error);
          navigate('/login');
      }
    }
    
    validateToken();

  }, []); // Empty dependency array ensures this runs once on mount

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await axios.get(import.meta.env.VITE_EXPRESSAPI_URL + 'payment/orders',
          { headers: { authorization: `Bearer ${localStorage.getItem('authToken')}` } });
        setOrders(response.data || []);
      } catch (error) {
        console.error('Error fetching orders for dashboard:', error);
        setOrders([]);
      } finally {
        setLoadingOrders(false);
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
              <HeaderForDashboardPage />
            </div>

            <div id="two">

                <div className="container px-4 py-3 mb-0 mt-0" style={{backgroundColor: "#ffffff"}}>
                 
                <div className='d-flex gap-1 space-between'>
                  <h2 className="mb-0">Dashboard</h2>
                  
                  {/* {name && age && email && id ? ( */}
                  {email ? (
                    <p className="fs-5">[Hello, {email}!]</p>
                  ) : (
                    <p>No data received.</p>
                  )}
                </div>


                {loadingOrders && <p>Loading dashboard data&hellip;</p>}

                {!loadingOrders && orders.length === 0 && (
                  <p>No orders yet &mdash; charts will populate once a checkout is completed.</p>
                )}

                {!loadingOrders && orders.length > 0 && (
                  <div className="row w-100 bg-white">
                    <div className="col-4 p-0 m-0 bg-white">
                          <ChartCard title="Monthly Revenue">
                            <Bar data={buildMonthlyRevenue(orders)} />
                          </ChartCard>
                    </div>
                    <div className="col-4 p-0 m-0 bg-white">
                          <ChartCard title="Orders per Month">
                            <Line data={buildOrdersPerMonth(orders)} />
                          </ChartCard>
                    </div>
                    <div className="col-4 p-0 m-0 bg-white">
                          <ChartCard title="Sales by Category">
                            <Pie data={buildSalesByCategory(orders)} />
                          </ChartCard>
                    </div>
                  </div>
                )}

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

export default Dashboard
