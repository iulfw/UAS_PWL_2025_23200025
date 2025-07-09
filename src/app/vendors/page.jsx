"use client";
import styles from './vendors.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function vendors() {

  const [ formVisible, setFormVisible ] = useState(false);
  const [ vendors, setVendors ] = useState([]);
  const [ name, setName ] = useState('');
  const [ msg, setMsg ] = useState('');
  const [ editId, setEditId ] = useState(null);

  const router = useRouter();
  const handleChange = (e) => {
    const path = e.target.value;
    if (path) router.push(path);
  };

  const fetchvendors = async () => {
    const res = await fetch('/api/vendors');
    const data = await res.json();
    setVendors(data);
  };

  useEffect(() => {
    fetchvendors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editId ? 'PUT' : 'POST';
    const res = await fetch('/api/vendors', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: editId, name }),
    });

    if (res.ok) {
      setMsg('Saved Successfully!');
      setName('');
      setEditId(null);
      setFormVisible(false);
      fetchvendors();
    } else {
      setMsg('Failed to Save Data!');
    }
  };

  const handleEdit = (item) => {
      setName(item.name);
      setEditId(item.id);
      setFormVisible(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are You Sure?')) return;
    await fetch('/api/vendors', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    fetchvendors();
  };

  return (
    <div className={styles.container}>
        <select onChange={handleChange} className={styles.dropdownNavigate}>
          <option value="">Vendors</option>
          <option value="/orders">Orders</option>
          <option value="/jastipers">Jastipers</option>
        </select>
        <h1 className={styles.title}>Perserikatan Jastiper ITBSS</h1>
        <h2 className={styles.subtitle}>List of Vendor</h2>
        <button
            className={styles.buttonToggle}
            onClick={() => setFormVisible(!formVisible)}>
            {formVisible ? 'Close Form' : 'Add Data'}
        </button>
        
        {formVisible && (
            <div className={styles.formWrapper}>
                <h3>Input New Vendor</h3>
                <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <span>Name</span>
                    <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    />
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
                    <th>Name</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                    {vendors.map((item, index) => (
                        <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>
                          <button style={{ marginRight: '5px' }} onClick={() => handleEdit(item)}>Edit</button>
                          <button onClick={() => handleDelete(item.id)}>Delete</button>
                        </td>
                        </tr>
                    ))}
                    {vendors.length === 0 && (
                        <tr>
                        <td colSpan="3">No Data Available</td>
                        </tr>
                    )}
                </tbody>
            </table>    
        </div>
    </div>
  );
}