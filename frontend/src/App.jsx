import axios from "axios"
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
export default function App() {

  const [user, setUser] = useState({
    id: "",
    fullname: "",
    email: "",
    phone: "",
    location: "",
    hobby: ""
  });

  const [users, setUsers] = useState([]);

  const [update, setUpdate] = useState(false);

  const changeHandleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  const addRegister = () => {
    if (user.fullname === "" || user.email === "" || user.phone === "" || user.location === "" || user.hobby === "") {
      toast.error("All fields are required");
      return;
    }

    axios.post("http://localhost:3000/create", user).then((response) => {
      getRegisters();
      clearFields();
      toast.success("User created successfully");
    }).catch((error) => {
      console.error(error);
      toast.error("Error creating user");
    })
  }

  const clearFields = () => {
    setUser({
      fullname: "",
      email: "",
      phone: "",
      location: "",
      hobby: ""
    })
  }

  const btnUpdate = (e) => {
    setUser({
      id: e.id_user,
      fullname: e.fullname,
      email: e.email,
      phone: e.phone,
      location: e.location,
      hobby: e.hobby
    })
    setUpdate(true);
  }

  const updateRegister = () => {
    if (user.fullname === "" || user.email === "" || user.phone === "" || user.location === "" || user.hobby === "") {
      toast.error("All fields are required");
      return;
    }

    axios.put("http://localhost:3000/update", user).then((response) => {
      getRegisters();
      clearFields();
      toast.success("User updated successfully");
    })

    setUpdate(false)

  }

  const btnDelete = (e) => {
    if (confirm(`¿Estas seguro de eliminar el usuario "${e.fullname}"?`)) {
      axios.delete(`http://localhost:3000/delete/${e.id_user}`).then((response) => {
        getRegisters();
        toast.warning(`User "${e.fullname}" deleted successfully`);
      })
    }
  }

  const cancelUpdate = () => {
    setUpdate(false);
    clearFields();
  }

  useEffect(() => {
    getRegisters();
  }, [])

  const getRegisters = async () => {
    try{
      const data = await fetch("http://localhost:3000/list");
      const response = await data.json();
      setUsers(response);
    }catch(e){
      console.error(e);
    }
  }

  const dates = users.map((e) => {
    return <tr key={e.id_user} className="bg-white border-b border-gray-200 hover:bg-gray-50">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
        {e.fullname}
      </th>
      <td className="px-6 py-4 text-gray-900">
        {e.email}
      </td>
      <td className="px-6 py-4 text-gray-900">
        {e.phone}
      </td>
      <td className="px-6 py-4 text-gray-900">
        {e.location}
      </td>
      <td className="px-6 py-4 text-gray-900">
        {e.hobby}
      </td>
      <td className="px-6 py-4 text-gray-900 text-right">
        <div className="flex justify-end gap-3">
          <button type="button" onClick={() => { btnUpdate(e) }} className="font-medium text-green-500 hover:underline cursor-pointer">Edit</button>
          <button type="button" onClick={() => { btnDelete(e) }} className="font-medium text-red-500 hover:underline cursor-pointer">Delete</button>
        </div>
      </td>
    </tr>
  })

  return (
    <>
      <div className="container p-3 mx-auto">
        <div className='bg-gray-100 my-5 px-5 rounded-2xl block'>
          <ToastContainer />
          <h1 className='text-2xl font-bold text-center p-2 mb-5 uppercase'>User Registration</h1>
          <div className='p-3 bg-white flex flex-row gap-3 w-full rounded-2xl max-[540px]:flex-col'>
            <div className="w-full flex flex-col gap-3">
              <div className="w-full flex flex-col gap-2">
                <label htmlFor="fullname" className='select-none font-medium'>Full Name: </label>
                <input type="text" id='fullname' name="fullname" value={user.fullname} onChange={changeHandleInput} className='border border-gray-300 rounded-[10px] p-2 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500' required placeholder="John Doe" />
              </div>
              <div className="w-full flex flex-col gap-2">
                <label htmlFor="email" className="select-none font-medium">Email: </label>
                <input type="text" id="email" name="email" value={user.email} onChange={changeHandleInput} className="bg-white focus:outline-none border border-gray-300 p-2 rounded-[10px] focus:border-blue-500 focus:ring-2 focus:ring-blue-500" required placeholder="H9A5o@example.com" />
              </div>
              <div className="w-full flex flex-col gap-2">
                <label htmlFor="phone" className="select-none font-medium">Phone: </label>
                <input type="number" id="phone" min={0} name="phone" value={user.phone} onChange={changeHandleInput} className="bg-white focus:outline-none border border-gray-300 p-2 rounded-[10px] focus:border-blue-500 focus:ring-2 focus:ring-blue-500" required placeholder="123456789" />
              </div>
            </div>
            <div className="w-full flex flex-col gap-3">
              <div className="w-full flex flex-col gap-2">
                <label htmlFor="location" className="select-none font-medium">Location: </label>
                <input type="text" id="location" name="location" value={user.location} onChange={changeHandleInput} className="bg-white focus:outline-none border border-gray-300 p-2 rounded-[10px] focus:border-blue-500 focus:ring-2 focus:ring-blue-500" required placeholder="New York" />
              </div>
              <div className="w-full flex flex-col gap-2">
                <label htmlFor="hobby" className="select-none font-medium">Hobby: </label>
                <input type="text" id="hobby" name="hobby" value={user.hobby} onChange={changeHandleInput} className="bg-white focus:outline-none border border-gray-300 p-2 rounded-[10px] focus:border-blue-500 focus:ring-2 focus:ring-blue-500" required placeholder="Soccer" />
              </div>
            </div>
          </div>
          <div className="w-full text-center">
            {
              update ?
                <div className="flex justify-center items-center gap-5">
                  <button type="button" onClick={updateRegister} className="my-3 py-2 px-5 bg-green-600 text-white rounded-[10px] text-center block hover:bg-green-700 transition hover:cursor-pointer active:transform active:translate-y-1 select-none">Update</button>
                  <button type="button" onClick={cancelUpdate} className="my-3 py-2 px-5 bg-red-500 text-white rounded-[10px] text-center block hover:bg-red-700 transition hover:cursor-pointer active:transform active:translate-y-1 select-none">Cancel</button>
                </div>
                : <button type="button" className="my-3 py-2 px-5 inline-block bg-blue-500 text-white rounded-[10px] m-auto text-center hover:bg-blue-700 transition hover:cursor-pointer active:transform active:translate-y-1 select-none" onClick={addRegister}>Add Register</button>
            }
          </div>
        </div>
      </div>
      <div className="mt-5 container m-auto p-3">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Full Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone
                </th>
                <th scope="col" className="px-6 py-3">
                  Location
                </th>
                <th scope="col" className="px-6 py-3">
                  Hobby
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {
              users.length > 0
                ? dates
                : <tr className="border-b">
                    <th scope="row" colSpan={6} className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      Loanding...
                    </th>
                  </tr>
              }
            </tbody>
          </table>
        </div>

      </div>
    </>
  )
}
