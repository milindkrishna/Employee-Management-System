import React,{useState} from 'react'

const Home = () => {
    const [inputs, setInputs] = useState({
        
        name:'',
        email:''
    });

    const [tableData, setTableData] = useState([])

    const [editClick, setEditClick] = useState(false)

    const [editIndex, setEditIndex] = useState('')

    const handleChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }

const handleSubmit = (e) => {
        e.preventDefault();
        
        if(editClick){
            const tempTableData = tableData.slice(); // shallow copy of tableData
            const updatedItem = Object.assign({}, tempTableData[editIndex], inputs); // create new object with updated properties
            tempTableData[editIndex] = updatedItem; // replace item at editIndex
            setTableData(tempTableData);
            setEditClick(false);
            setInputs({
              name: "",
              email: "",
            });
        } else {
            setTableData([...tableData, inputs]);
            setInputs({
              name:'',
              email:''
            });
        }
}
    

const handleDelete = (index) => {
    const filterData = tableData.filter((item, i) => i !== index)
    setTableData(filterData)
}

const handleEdit = (index) => {
    // extract the data from the form
    const tempData = tableData[index];
    setInputs({
        name: tempData.name,
        email: tempData.email
    })

    setEditClick(true)
    setEditIndex(index)
    
}

  return (
    <div className='min-h-screen bg-[#004b43] font-serif'>
  <h1 className='text-center text-white pt-3 pb-3 font-serif'>Employee Management System</h1>
  <div className='bg-slate-100 max-w-fit m-auto p-10'>
    <form onSubmit={handleSubmit}>
      <div className='flex flex-col'>
        <label>Name</label>
        <input 
          name='name'
          value={inputs.name}
          onChange={handleChange}
          className='mb-3'
        />
      </div>

      <div className='flex flex-col'>
        <label>Email</label>
        <input 
          name='email'
          value={inputs.email}
          onChange={handleChange}
          className='mb-3'
        />
      </div>
      <button type='submit' className='w-full bg-sky-500 text-white mt-3'>
        {editClick? "Update":"Add"}
      </button>
    </form>
  </div>
    
  <div className='overflow-x-auto'>
    <table className='w-full text-center mt-3'>
      <thead className='text-white'>
        <tr>
          <th className='p-2'>Name</th>
          <th className='p-2'>Email</th>
          <th className='p-2'>Actions</th>
        </tr>
      </thead>
      <tbody className='text-white'>
        {
          tableData.map((item, i) => (
            <tr key={i}>
              <td className='p-2'>{item.name}</td>
              <td className='p-2'>{item.email}</td>
              <td className='p-2'>
                <button className='mr-3 text-yellow-300' onClick={() => handleEdit(i)}>Edit</button>
                <button className='text-red-500' onClick={() => handleDelete(i)}>Delete</button>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  </div>

  <style jsx>{`
    @media (max-width: 640px) {
      .max-w-fit {
        max-width: 100%;
      }

      input {
        width: 100%;
      }

      .text-center {
        text-align: center;
      }

      .overflow-x-auto {
        overflow-x: scroll;
      }
    }

    @media (min-width: 640px) {
      .max-w-fit {
        max-width: 640px;
      }
    }
  `}</style>
</div>

  )
}

export default Home