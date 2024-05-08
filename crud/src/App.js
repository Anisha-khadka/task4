import { useEffect, useState } from "react";
import './style.css'
import { EmpData } from "./StudentData";

function App() {
  const [data, setdata] = useState([]);
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [age, setAge] = useState(0)
  const [id, setId] = useState(0)

  useEffect(() => {
    setdata(EmpData);
  }, []);

  const handleEdit = (id) => {
    const dt = data.filter((index) => index.id === id);
    if (dt !== undefined) {
      if (window.confirm("Are you sure to edit this item?")) {
        const dt = data.filter((index) => index.id !== id);
        setdata(dt);
      }
      setId(id);
      setfirstName(dt[0].firstName);
      setlastName(dt[0].lastName);
      setAge(dt[0].age);
    }
  };
  const handleDelete = (id) => {
    if (id > 0) {
      if (window.confirm("Are you sure to delete this item?")) {
        const dt = data.filter((index) => index.id !== id);
        setdata(dt);
      }
    }
  };
  const handleSave = (e) => {
   let error = '';
   if(firstName==="")
    error +='First name is required ';
   if(lastName==="")
    error +='last name is required ';
   if(age<=0)
    error +='age is required ';

   if(error==="")
    {
  
   const dt=[...data];
   const newobj = {
        id:EmpData.length+ 1,
        firstName:firstName,
        lastName:lastName,
        age:age
   }
   dt.push(newobj);
   setdata(dt);
   
  }
  else
  {
   alert(error) 
  }
  };
  const handleClear=()=>{
       setId(0);
      setfirstName("");
      setlastName("");
      setAge('');
  };
  return (
    <>
    <div className="app">
      <h1>STUDENT ENTRY</h1>
    <div className="containers">
      <div className="formfield">
        <input
          type="text"
          placeholder="First Name"
          onChange={(e) => setfirstName(e.target.value)}
          value={firstName}
        />
        
        <input
          type="text"
          placeholder="Last Name"
          onChange={(e) => setlastName(e.target.value)}
          value={lastName}
        />
        
        <input
          type="number"
          placeholder="age"
          onChange={(e) => setAge(e.target.value)}
          value={age}
        /><br/>
        
        <button onClick={() => handleSave()}>Save</button>
        <button onClick={() => handleClear()}>Clear</button>

      </div>
      <div className="table_list">
        <table className="table">
          <thead>
            <tr>
              <td >Id</td>
              <td>First Name</td>
              <td>Last Name</td>
              <td>age</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {data.map((index) => {
              return (
                <tr key={index}>
                  <td>{index.id}</td>
                  <td>{index.firstName}</td>
                  <td>{index.lastName}</td>
                  <td>{index.age}</td>
                  <td>
                    <button onClick={() => handleEdit(index.id)}>Edit</button>
                    <button onClick={() => handleDelete(index.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      </div>
      </div>
    </>
  );
}

export default App;
