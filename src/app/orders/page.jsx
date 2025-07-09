"use client";
import styles from './orders.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function orders() {

  const [ formVisible, setFormVisible ] = useState(false);
  const [ orders, setOrders ] = useState([]);
  const [ jastipers, setJastipers ] = useState([]);
  const [ vendors, setVendors ] = useState([]);
  const [ date, setDate ] = useState('');
  const [ customer, setCustomer ] = useState('');
  const [ jastiper, setJastiper ] = useState('');
  const [ vendor, setVendor ] = useState('');
  const [ menu, setMenu ] = useState('');
  const [ qty, setQty ] = useState('');
  const [ price, setPrice ] = useState('');
  const [ notes, setNotes ] = useState('');
  const [ status, setStatus ] = useState('');
  const [ msg, setMsg ] = useState('');
  const [ editId, setEditId ] = useState(null);

  const router = useRouter();
  const handleChange = (e) => {
    const path = e.target.value;
    if (path) router.push(path);
  };
  
  const fetchorders = async () => {
    const res = await fetch('/api/orders');
    const data = await res.json();
    setOrders(data);
  };

  const fetchjastipers = async () => {
    const res = await fetch('/api/jastipers');
    const data = await res.json();
    setJastipers(data);
  };

  const fetchvendors = async () => {
    const res = await fetch('/api/vendors');
    const data = await res.json();
    setVendors(data);
  };

  useEffect(() => {
    fetchorders();
    fetchjastipers();
    fetchvendors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editId ? 'PUT' : 'POST';
    const res = await fetch('/api/orders', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: editId, date, customer, jastiper, vendor, menu, qty, price, notes, status }),
    });

    if (res.ok) {
      setMsg('Saved Successfully!');
      setDate('');
      setCustomer('');
      setJastiper('');
      setVendor('');
      setMenu('');
      setQty('');
      setPrice('');
      setNotes('');
      setStatus('');
      setEditId(null);
      setFormVisible(false);
      fetchorders();
    } else {
      setMsg('Failed to Save Data!');
    }
  };

  const handleEdit = (item) => {
      setDate(item.date ? new Date(item.date).toISOString().split('T')[0] : '');
      setCustomer(item.customer);
      setJastiper(item.jastiper);
      setVendor(item.vendor);
      setMenu(item.menu);
      setQty(item.qty);
      setPrice(item.price);
      setNotes(item.notes);
      setStatus(item.status ? 'Paid':'Unpaid');
      setEditId(item.id);
      setFormVisible(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are You Sure?')) return;
    await fetch('/api/orders', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    fetchorders();
  };

  return (
    <div className={styles.container}>
        <select onChange={handleChange} className={styles.dropdownNavigate}>
          <option value="">Orders</option>
          <option value="/jastipers">Jastipers</option>
          <option value="/vendors">Vendors</option>
        </select>
        <h1 className={styles.title}>Perserikatan Jastiper ITBSS</h1>
        <h2 className={styles.subtitle}>List of Order</h2>
        <button
            className={styles.buttonToggle}
            onClick={() => setFormVisible(!formVisible)}>
            {formVisible ? 'Close Form' : 'Add Data'}
        </button>
        
        {formVisible && (
            <div className={styles.formWrapper}>
                <h3>Input New Order</h3>
                <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <span>Date</span>
                    <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    />
                </div>
                <div className={styles.formGroup}>
                    <span>Customer</span>
                    <input
                    type="text"
                    value={customer}
                    onChange={(e) => setCustomer(e.target.value)}
                    required
                    />
                </div>
                <div className={styles.formGroup}>
                    <span>Jastiper</span>
                    <select 
                    value={jastiper}
                    onChange={(e) => setJastiper(e.target.value)}
                    required
                    >
                    <option value="">Choose Jastiper</option>
                    {jastipers.map((jastipers) => (
                      <option key={jastipers.id} value={jastipers.id}>
                        {jastipers.name}
                      </option>
                    ))}
                    </select>
                </div>
                <div className={styles.formGroup}>
                    <span>Vendor</span>
                    <select 
                    value={vendor}
                    onChange={(e) => setVendor(e.target.value)}
                    required
                    >
                    <option value="">Choose Vendor</option>
                    {vendors.map((vendors) => (
                      <option key={vendors.id} value={vendors.id}>
                        {vendors.name}
                      </option>
                    ))}
                    </select>
                </div>
                <div className={styles.formGroup}>
                    <span>Menu</span>
                    <input
                    type="text"
                    value={menu}
                    onChange={(e) => setMenu(e.target.value)}
                    required
                    />
                </div>
                <div className={styles.formGroup}>
                    <span>Qty</span>
                    <input
                    type="text"
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                    required
                    />
                </div>
                <div className={styles.formGroup}>
                    <span>Price</span>
                    <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    />
                </div>
                <div className={styles.formGroup}>
                    <span>Notes</span>
                    <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    />
                </div>
                <div className={styles.formGroup}>
                    <span>Status</span>
                    <label>
                        <input
                        type="radio"
                        value="Paid"
                        checked={status === "Paid"}
                        onChange={(e) => setStatus(e.target.value)}
                        />
                        Paid
                    </label>
                    <label>
                        <input
                        type="radio"
                        value="Unpaid"
                        checked={status === "Unpaid"}
                        onChange={(e) => setStatus(e.target.value)}
                        />
                        Unpaid
                    </label>
                </div>
                <button type="submit">
                    Submit
                </button>
                <p>{msg}</p>
                </form>
            </div>
        )}

        <div className={styles.tableWrapper}>
            <table>
                <thead>
                <tr>
                    <th>No</th>
                    <th>Date</th>
                    <th>Customer</th>
                    <th>Jastiper</th>
                    <th>Vendor</th>
                    <th>Menu</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Notes</th>
                    <th>Status</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                    {orders.map((item, index) => (
                        <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{new Date(item.date).toLocaleDateString('en-GB')}</td>
                        <td>{item.customer}</td>
                        <td>{item.jastipers?.name}</td>
                        <td>{item.vendors?.name}</td>
                        <td>{item.menu}</td>
                        <td>{item.qty}</td>
                        <td>{item.price}</td>
                        <td>{item.notes}</td>
                        <td>{item.status ? 'Paid':'Unpaid'}</td>
                        <td>
                          <button style={{ marginRight: '5px' }} onClick={() => handleEdit(item)}>Edit</button>
                          <button onClick={() => handleDelete(item.id)}>Delete</button>
                        </td>
                        </tr>
                    ))}
                    {orders.length === 0 && (
                        <tr>
                        <td colSpan="11">No Data Available</td>
                        </tr>
                    )}
                </tbody>
            </table>    
        </div>
    </div>
  );
}