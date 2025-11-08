import React from 'react';

function ResultTable({ keyword, user, onAdded }) {
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [editing, setEditing] = React.useState(null);

  // Tải dữ liệu 1 lần khi component mount
  React.useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => { 
        setUsers(data); 
        setLoading(false); 
      });
  }, []);

  // Thêm user mới vào danh sách
  React.useEffect(() => {
    if (user) {
      setUsers(prev => [...prev, { ...user, id: prev.length + 1 }]);
      onAdded();
    }
  }, [user]);

  // Lọc danh sách theo keyword
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(keyword.toLowerCase()) ||
      u.username.toLowerCase().includes(keyword.toLowerCase())
  );

  // Xóa user
  function removeUser(id) {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  }

  // Kích hoạt chế độ sửa
  function editUser(user) {
    setEditing({ ...user, address: { ...user.address } });
  }

  // Lưu sau khi chỉnh sửa
  function saveUser() {
    setUsers(prev => prev.map(u => u.id === editing.id ? editing : u));
    setEditing(null);
  }

  // Xử lý thay đổi trong form edit
  const handleEditChange = (field, value) => {
    if (["street", "suite", "city"].includes(field)) {
      setEditing({ ...editing, address: { ...editing.address, [field]: value } });
    } else {
      setEditing({ ...editing, [field]: value });
    }
  };

  if (loading) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Đang tải dữ liệu...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h3>Danh sách Users (Tìm thấy: {filteredUsers.length})</h3>
      
      {editing && (
        <div style={{
          backgroundColor: '#f9f9f9',
          padding: '20px',
          marginBottom: '20px',
          border: '1px solid #ddd',
          borderRadius: '5px'
        }}>
          <h4>Sửa người dùng</h4>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="name">Name: </label>
            <input 
              id="name"
              type="text" 
              value={editing.name}
              onChange={(e) => handleEditChange("name", e.target.value)}
              style={{ marginLeft: '10px', padding: '5px', width: '300px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="username">Username: </label>
            <input 
              id="username"
              type="text" 
              value={editing.username}
              onChange={(e) => handleEditChange("username", e.target.value)}
              style={{ marginLeft: '10px', padding: '5px', width: '300px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="email">Email: </label>
            <input 
              id="email"
              type="text" 
              value={editing.email}
              onChange={(e) => handleEditChange("email", e.target.value)}
              style={{ marginLeft: '10px', padding: '5px', width: '300px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="street">Street: </label>
            <input 
              id="street"
              type="text" 
              value={editing.address?.street || ""}
              onChange={(e) => handleEditChange("street", e.target.value)}
              style={{ marginLeft: '10px', padding: '5px', width: '300px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="suite">Suite: </label>
            <input 
              id="suite"
              type="text" 
              value={editing.address?.suite || ""}
              onChange={(e) => handleEditChange("suite", e.target.value)}
              style={{ marginLeft: '10px', padding: '5px', width: '300px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="city">City: </label>
            <input 
              id="city"
              type="text" 
              value={editing.address?.city || ""}
              onChange={(e) => handleEditChange("city", e.target.value)}
              style={{ marginLeft: '10px', padding: '5px', width: '300px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="phone">Phone: </label>
            <input 
              id="phone"
              type="text" 
              value={editing.phone || ""}
              onChange={(e) => handleEditChange("phone", e.target.value)}
              style={{ marginLeft: '10px', padding: '5px', width: '300px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="website">Website: </label>
            <input 
              id="website"
              type="text" 
              value={editing.website || ""}
              onChange={(e) => handleEditChange("website", e.target.value)}
              style={{ marginLeft: '10px', padding: '5px', width: '300px' }}
            />
          </div>
          <button 
            onClick={saveUser}
            style={{
              padding: '8px 15px',
              backgroundColor: '#2c642eff',
              color: 'white',
              border: 'none',
              borderRadius: '3px',
              cursor: 'pointer',
              marginRight: '10px'
            }}
          >
            Lưu
          </button>
          <button 
            onClick={() => setEditing(null)}
            style={{
              padding: '8px 15px',
              backgroundColor: '#999',
              color: 'white',
              border: 'none',
              borderRadius: '3px',
              cursor: 'pointer'
            }}
          >
            Hủy
          </button>
        </div>
      )}

      <table style={{ 
        width: '100%', 
        borderCollapse: 'collapse',
        marginTop: '10px'
      }}>
        <thead>
          <tr style={{ backgroundColor: '#f0f0f0' }}>
            <th style={cellStyle}>ID</th>
            <th style={cellStyle}>Name</th>
            <th style={cellStyle}>Username</th>
            <th style={cellStyle}>Email</th>
            <th style={cellStyle}>City</th>
            <th style={cellStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((u) => (
            <tr key={u.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={cellStyle}>{u.id}</td>
              <td style={cellStyle}>{u.name}</td>
              <td style={cellStyle}>{u.username}</td>
              <td style={cellStyle}>{u.email}</td>
              <td style={cellStyle}>{u.address?.city || 'N/A'}</td>
              <td style={cellStyle}>
                <button 
                  onClick={() => editUser(u)}
                  style={{
                    padding: '5px 10px',
                    marginRight: '5px',
                    backgroundColor: '#516251ff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '3px',
                    cursor: 'pointer'
                  }}
                >
                  Sửa
                </button>
                <button 
                  className="btn-delete"
                  onClick={() => removeUser(u.id)}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: '#7a2b25ff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '3px',
                    cursor: 'pointer'
                  }}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {filteredUsers.length === 0 && (
        <div style={{ 
          padding: '20px', 
          textAlign: 'center',
          color: '#999'
        }}>
          Không tìm thấy user nào phù hợp với từ khóa "{keyword}"
        </div>
      )}
    </div>
  );
}

const cellStyle = {
  padding: '10px',
  textAlign: 'left',
  border: '1px solid #ddd'
};

export default ResultTable;