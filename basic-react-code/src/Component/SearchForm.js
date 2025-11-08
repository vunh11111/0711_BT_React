// Component SearchForm nhận props onChangeValue để truyền giá trị tìm kiếm lên parent component
function SearchForm({ onChangeValue }) {
  // Render UI của component
  return (
    // Container bọc input search
    <div>
      {/* 
        Input search - controlled component được quản lý bởi parent
        Sử dụng onChange event để gọi callback mỗi khi người dùng nhập
      */}
      <input
        type="text"
        placeholder="Tìm theo name, username" // Placeholder hướng dẫn người dùng
        // onChange event handler: sử dụng arrow function inline
        // e.target.value lấy giá trị hiện tại của input và truyền lên parent qua callback
        onChange={(e) => onChangeValue(e.target.value)}
      />
    </div>
  );
}

// Export component để sử dụng ở component khác
export default SearchForm;