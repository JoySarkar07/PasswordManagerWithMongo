import React, { useState, useEffect, useRef } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import { FaCopy } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Body = () => {
  const [form, setForm] = useState({ url: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);
  const [passowrdVisibility, setPassowrdVisibility] = useState(false);
  const passref = useRef();


  const showToast = (message="")=>{
    return toast(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }

  const getPasswords = async ()=>{
    try{
      const req =await fetch('http://localhost:3000/');
      const paswords = await req.json();
      setPasswordArray(paswords);
    }
    catch(e){
      console.log(e);
    }
  }
  useEffect(() => {
    getPasswords();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveData =async () => {
    if(form.url.length>3 && form.username.length>3 && form.password.length>3){
      try{
        const req =await fetch('http://localhost:3000/',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({ id: uuidv4(), ...form })});
        if(req.status===200){
          setPasswordArray([...passwordArray, { id: uuidv4(), ...form }]);
          setForm({ url: "", username: "", password: "" });
        }
        else{
          console.log("Internal Server Error");
        }
      }
      catch(e){
        console.log(e);
      }
    }
    else{
      console.log("Please Enter more than 3 char");
    }
  };

  const showPassword = () => {
    if (passowrdVisibility) {
      passref.current.type = "password";
      setPassowrdVisibility(false);
    } else {
      passref.current.type = "text";
      setPassowrdVisibility(true);
    }
  };

  const copytoClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast('Copied to clipboard', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  };

  const deleteItem =async (id)=>{
    const c = confirm("Are you sure ? You want to delete this password");
    if(c){
      const newpasswordArray = passwordArray.filter((item)=>{
        return item.id!==id;
      })
      setPasswordArray(newpasswordArray);
      // console.log(newpasswordArray);
      await fetch('http://localhost:3000/',{method:'DELETE',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:id})});
    }
    // console.log("Item deleted");
  }

  const editItem = (id)=>{
    const editeditem = passwordArray.find((item)=>{
      return item.id===id;
    })
    setForm({ url: editeditem.url, username: editeditem.username, password: editeditem.password });
    deleteItem(id);
    // console.log("Edited item is : ",editeditem);
  }

  const passwordToSter = (password="")=>{
    let stars = "";
    for(let i=0;i<password.length;i++){
      stars += "*";
    }
    return stars;
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
      <div className="w-4/5 m-auto mt-5 flex flex-col items-center gap-5">
        <div className="flex flex-col items-center">
          {/* THis is the logoname */}
          <div className="text-black font-bold text-xl">
            <span className="text-green-700 font-bold">&lt;</span>
            JP
            <span className="text-green-700 font-bold">Manager/&gt;</span>
          </div>
          <div>Your own password Manager</div>
        </div>
        {/* This is the url input field */}
        <input
          className="w-full border border-green-400 rounded-xl px-3 py-1"
          type="text"
          name="url"
          placeholder="website url"
          value={form.url}
          onChange={handleChange}
        />
        <div className="w-full flex gap-5 flex-col md:flex-row">
          {/* THis is username input field */}
          <input
            className="border border-green-400 rounded-xl px-3 py-1 w-full md:w-2/3"
            type="text"
            name="username"
            placeholder="username"
            value={form.username}
            onChange={handleChange}
          />
          {/* This is password input field */}
          <div className="w-full md:w-1/3 relative">
            <input
              className="w-full border border-green-400 rounded-xl py-1 px-3"
              ref={passref}
              type="password"
              name="password"
              placeholder="password"
              value={form.password}
              onChange={handleChange}
            />
            <button
              className="absolute right-2 top-[9px]"
              onClick={showPassword}
            >
              {passowrdVisibility ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>
          </div>
        </div>
        {/* save button for saving the passwords */}
        <button
          className="border border-green-800 px-5 py-2 rounded-3xl flex justify-center items-center bg-green-300"
          onClick={saveData}
        >
          <lord-icon
            src="https://cdn.lordicon.com/ncitidvz.json"
            trigger="hover"
          ></lord-icon>
          save
        </button>
      </div>
      {/* Show the posswords */}
      <div className="w-4/5 m-auto mt-5">
        {passwordArray.length === 0 && <div>No items available to show</div>}
        {passwordArray.length > 0 && (
          <table className="table-fixed w-full rounded-md overflow-hidden mb-20">
            <thead className="bg-green-300">
              <tr>
                <th>Website Url</th>
                <th>Username</th>
                <th>Password</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="bg-green-100">
              {passwordArray.map((item) => {
                return (
                  <tr
                    key={item.id}
                    className="border-2 border-white text-center"
                  >
                    <td>
                      <div className="flex justify-center items-center gap-1 flex-wrap break-all">
                        <a href={item.url} target="_blank">
                          {item.url}
                        </a>
                        <button
                          onClick={() => {
                            copytoClipboard(item.url);
                          }}
                        >
                          <FaCopy />
                        </button>
                      </div>
                    </td>
                    <td>
                      <div className="flex justify-center items-center gap-1 flex-wrap break-all">
                        {item.username}
                        <button
                          onClick={() => {
                            copytoClipboard(item.username);
                          }}
                        >
                          <FaCopy />
                        </button>
                      </div>
                    </td>
                    <td>
                      <div className="flex justify-center items-center gap-1 flex-wrap break-all">
                        {passwordToSter(item.password)}
                        <button
                          onClick={() => {
                            copytoClipboard(item.password);
                          }}
                        >
                          <FaCopy />
                        </button>
                      </div>
                    </td>
                    <td className="flex items-center justify-center gap-5">
                      {/* Edit button */}
                      <span className="cursor-pointer" onClick={()=>{editItem(item.id)}}>
                        <lord-icon
                          src="https://cdn.lordicon.com/fikcyfpp.json"
                          trigger="hover"
                          style={{ width: "25px", height: "25px" }}
                        ></lord-icon>
                      </span>
                      {/* Delete button */}
                      <span className="cursor-pointer" onClick={()=>{deleteItem(item.id)}}>
                        <lord-icon
                          src="https://cdn.lordicon.com/hwjcdycb.json"
                          trigger="hover"
                          style={{ width: "25px", height: "25px" }}
                        ></lord-icon>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Body;
