import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { icons } from "../../utils/icons.js";

const Manager = () => {
  const passRef = useRef();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);
  const showPassword = () => {
    if (isPasswordVisible)
      setIsPasswordVisible(false), (passRef.current.type = "password");
    else setIsPasswordVisible(true), (passRef.current.type = "text");
  };

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const savePassword = () => {
    setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
    localStorage.setItem(
      "passwords",
      JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
    );
    console.log([...passwordArray, form]);
    setform({ site: "", username: "", password: "" });
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const editPassword = (item) => {
    setform({
      site: item.site,
      username: item.username,
      password: item.password,
    });
    setPasswordArray(passwordArray.filter((i) => i.id != item.id));
  };
  const deletePassword = (id) => {
    setPasswordArray(passwordArray.filter((item) => item.id != id));
    localStorage.setItem(
      "passwords",
      JSON.stringify(passwordArray.filter((item) => item.id != id))
    );
  };
  const copyText = (item) => {
    // console.log(item);
    navigator.clipboard.writeText(item);
  };
  return (
    <>
      <div className="lg:myContainer ">
        <div className="logo select-none">
          <h1 className="text-4xl font-bold text-center">
            <span className="text-green-600">&lt;</span>
            Pass<span className="text-green-600">OP/&gt;</span>
          </h1>
          <p className="text-lg text-green-600 text-center">
            Your own Password Manager
          </p>
        </div>
        <div className=" flex flex-col text-black p-4 gap-3 ">
          <input
            onChange={handleChange}
            value={form.site}
            className="border bg-transparent text-white border-green-500 w-full rounded-full  px-4 py-1 outline-none"
            type="text"
            name="site"
            placeholder="Enter Website URL"
          />
          <div className="lg:flex w-full gap-3">
            <input
              onChange={handleChange}
              value={form.username}
              className="border border-green-500 w-full rounded-full bg-transparent text-white  px-4 py-1 outline-none"
              type="text"
              name="username"
              placeholder="Enter Username"
            />
            <div className="relative border border-green-500 w-full rounded-full px-4 py-1 outline-none flex items-center">
              <input
                ref={passRef}
                onChange={handleChange}
                value={form.password}
                className="outline-none flex-1 bg-transparent text-white "
                type="password"
                name="password"
                placeholder="Enter Password"
              />
              <button
                onClick={showPassword}
                className="cursor-pointer text-white absolute right-0 lg:text-xl text-sm mr-2 "
              >
                {isPasswordVisible ? <icons.LuEyeOff /> : <icons.LuEye />}
              </button>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex items-center bg-green-600 font-semibold rounded-full py-1  w-fit px-4 mx-auto hover:bg-green-400"
          >
            <icons.IoIosAdd className="size-6" />
            Add Password
          </button>
        </div>

        <div className="mx-2 passwords">
          <h2 className="text-xl font-bold my-2">Your Passwords</h2>
          {passwordArray.length === 0 && <div>No Passwords to Show.</div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full">
              <thead className="bg-green-600 border border-white text-black font-mono text-sm lg:text-xl text-center">
                <tr className="">
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-transparent text-white">
                {passwordArray.map((item, index) => (
                  <tr className=" " key={index}>
                    <td className="table-data">
                      <div className="flex justify-start items-center space-x-2">
                        <span className=" flex-1 overflow-hidden ">
                          <a className="" href={item.site} target="_blank">
                            {item.site}
                          </a>
                        </span>
                        <span
                          className="cursor-pointer hover:text-green-600"
                          onClick={() => copyText(item.site)}
                        >
                          <icons.MdOutlineContentCopy />
                        </span>
                      </div>
                    </td>
                    <td className=" table-data">
                      <div className="flex justify-start items-center space-x-2">
                        <span className="flex-1 overflow-hidden">
                          {item.username}
                        </span>
                        <span
                          className="cursor-pointer hover:text-green-600"
                          onClick={() => copyText(item.username)}
                        >
                          <icons.MdOutlineContentCopy />
                        </span>
                      </div>
                      {/* </div> */}
                    </td>
                    <td className=" table-data">
                      <div className="flex justify-start items-center space-x-2">
                        <span className="flex-1 overflow-hidden">
                          {"*".repeat(item.password.length)}
                        </span>
                        <span
                          className="cursor-pointer hover:text-green-600"
                          onClick={() => copyText(item.password)}
                        >
                          <icons.MdOutlineContentCopy />
                        </span>
                      </div>
                    </td>
                    <td className=" table-data">
                      <div className="flex space-x-2 cursor-pointer justify-center items-center text-xl lg:text-2xl ">
                        <span
                          className="hover:text-green-600 "
                          onClick={() => editPassword(item)}
                        >
                          <icons.MdEdit />
                        </span>
                        <span
                          className="hover:text-green-600 "
                          onClick={() => deletePassword(item.id)}
                        >
                          <icons.MdDelete />
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
