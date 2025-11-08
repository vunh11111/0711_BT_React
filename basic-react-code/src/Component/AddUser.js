import React from 'react';

// Component AddUser nhận props onAdd để xử lý việc thêm user mới
function AddUser({ onAdd }) {
  // State để quản lý trạng thái hiển thị form thêm user
  const [adding, setAdding] = React.useState(false);
  
  // State để quản lý dữ liệu của user mới
  // Sử dụng object với các thuộc tính tương ứng với thông tin user
  const [user, setUser] = React.useState({
    name: "", 
    username: "", 
    email: "",
    address: { street: "", suite: "", city: "" }, // Address là nested object
    phone: "", 
    website: ""
  });

  // Handler xử lý sự kiện thay đổi input
  // Sử dụng destructuring để lấy id và value từ event target
  const handleChange = (e) => {
    const { id, value } = e.target;
    
    // Kiểm tra nếu field thuộc address object thì update nested object
    if (["street", "suite", "city"].includes(id)) {
      // Sử dụng spread operator để giữ nguyên các giá trị cũ và chỉ update field thay đổi
      setUser({ ...user, address: { ...user.address, [id]: value } });
    } else {
      // Update field thông thường ở level đầu tiên của object
      setUser({ ...user, [id]: value });
    }
  };

  // Handler xử lý logic khi nhấn nút Thêm
  const handleAdd = () => {
    // Validate dữ liệu bắt buộc: name và username không được để trống
    if (user.name === "" || user.username === "") {
      alert("Vui lòng nhập Name và Username!");
      return;
    }
    
    // Gọi callback function từ parent component để truyền dữ liệu user lên
    onAdd(user);
    
    // Reset form về trạng thái ban đầu sau khi thêm thành công
    setUser({ 
      name: "", 
      username: "", 
      email: "", 
      address: { street: "", suite: "", city: "" }, 
      phone: "", 
      website: "" 
    });
    
    // Đóng form thêm user
    setAdding(false);
  };

  // Render UI của component
  return (
    // Container chính với styling inline
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', marginBottom: '20px' }}>
      {/* Nút mở form thêm user, sử dụng onClick event handler */}
      <button 
        onClick={() => setAdding(true)}
        style={{
          padding: '10px 20px',
          backgroundColor: '#174972ff',
          color: 'white',
          border: 'none',
          borderRadius: '3px',
          cursor: 'pointer',
          fontSize: '14px'
        }}
      >
        Thêm
      </button>

      {/* Conditional rendering: chỉ hiển thị form khi adding = true */}
      {adding && (
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          marginTop: '15px',
          border: '1px solid #ddd',
          borderRadius: '5px'
        }}>
          <h4>Thêm người dùng</h4>
          
          {/* Input field cho Name - controlled component */}
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="name">Name: </label>
            <input 
              id="name"
              type="text"
              value={user.name} // Giá trị được quản lý bởi state
              onChange={handleChange} // Handler cập nhật state khi có thay đổi
              style={{ marginLeft: '10px', padding: '5px', width: '300px' }}
            />
          </div>

          {/* Input field cho Username - controlled component */}
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="username">Username: </label>
            <input 
              id="username"
              type="text" 
              value={user.username}
              onChange={handleChange}
              style={{ marginLeft: '10px', padding: '5px', width: '300px' }}
            />
          </div>

          {/* Input field cho Email - controlled component */}
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="email">Email: </label>
            <input 
              id="email"
              type="text" 
              value={user.email}
              onChange={handleChange}
              style={{ marginLeft: '10px', padding: '5px', width: '300px' }}
            />
          </div>

          {/* Input field cho Street - controlled component với nested object */}
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="street">Street: </label>
            <input 
              id="street"
              type="text" 
              value={user.address.street} // Truy cập nested object
              onChange={handleChange}
              style={{ marginLeft: '10px', padding: '5px', width: '300px' }}
            />
          </div>

          {/* Input field cho Suite - controlled component với nested object */}
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="suite">Suite: </label>
            <input 
              id="suite"
              type="text" 
              value={user.address.suite}
              onChange={handleChange}
              style={{ marginLeft: '10px', padding: '5px', width: '300px' }}
            />
          </div>

          {/* Input field cho City - controlled component với nested object */}
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="city">City: </label>
            <input 
              id="city"
              type="text" 
              value={user.address.city}
              onChange={handleChange}
              style={{ marginLeft: '10px', padding: '5px', width: '300px' }}
            />
          </div>

          {/* Input field cho Phone - controlled component */}
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="phone">Phone: </label>
            <input 
              id="phone"
              type="text" 
              value={user.phone}
              onChange={handleChange}
              style={{ marginLeft: '10px', padding: '5px', width: '300px' }}
            />
          </div>

          {/* Input field cho Website - controlled component */}
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="website">Website: </label>
            <input 
              id="website"
              type="text" 
              value={user.website}
              onChange={handleChange}
              style={{ marginLeft: '10px', padding: '5px', width: '300px' }}
            />
          </div>

          {/* Nút xác nhận thêm user, kích hoạt handleAdd */}
          <button 
            onClick={handleAdd}
            style={{
              padding: '8px 15px',
              backgroundColor: '#275428ff',
              color: 'white',
              border: 'none',
              borderRadius: '3px',
              cursor: 'pointer',
              marginRight: '10px'
            }}
          >
            Thêm
          </button>
          
          {/* Nút hủy, đóng form và không lưu dữ liệu */}
          <button 
            onClick={() => setAdding(false)}
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
    </div>
  );
}

// Export component để sử dụng ở nơi khác
export default AddUser;