import logo from './logo.svg';
import './App.css';
import React from 'react';
import SearchForm from './Component/SearchForm';
import ResultTable from './Component/ResultTable';
import AddUser from './Component/AddUser';
function App() { 
    const [kw, setKeyword] = React.useState(""); 
    const [newUser, setNewUser] = React.useState(null); 
    return ( 
        <div> 
          <SearchForm onChangeValue={setKeyword} /> 
          <AddUser onAdd={setNewUser} /> 
          <ResultTable keyword={kw} user = {newUser}   onAdded={() =>
          setNewUser(null)} /> 
        </div> 
    ); 
}
export default App;
