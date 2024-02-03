import "./ManageUser.css";
import UseAxios from "../../utils/useAxios";
import { useQuery } from "@tanstack/react-query";
import { updateProfile } from "firebase/auth";
import { useContext, useState } from "react";
import { CiUser } from "react-icons/ci";
import { FaArrowsRotate } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { TbPasswordUser } from "react-icons/tb";
import { Mycontext } from "../../Authcontext/Authcontext";
import { createUser } from "../../utils/createUser";
import { uploadImg } from "../../utils/uploadImg";

const ManageUser = () => {

    const { createAccountWithEmail, setCreatingUser } = useContext(Mycontext)

    const [showForm, setShowForm] = useState(false)
    const [status, setStatus] = useState("")

    const axios = UseAxios()
    const { data = [], refetch } = useQuery({
        queryKey: ["userDaa", status],
        queryFn: async () => {
            const { data: Users } = await axios.get(`/users?status=${status}`)
            return Users
        }
    })


    const handleAdduser = async (e) => {
        e.preventDefault()
        const form = e.target
        const userName = form.userName.value
        const userEmail = form.userEmail.value
        const userPassword = form.userPassword.value
        setCreatingUser(true)
        const user = await createAccountWithEmail(userEmail, userPassword)
        const userObj = {
            userName,
            userEmail,
            status: "active"
        }

        await createUser(userObj)
        setCreatingUser(false)
        form.reset()
        setShowForm(false)
        refetch()


    }

    return (
        <div className="userContainer">

            <div className="tableContainer">
                <div className="filter">
                    <div>
                        <p>Status: </p>
                        <select onChange={(e) => setStatus(e.target.value)}>
                            <option value="">All</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>

                            <th>Sl</th>
                            <th>User name</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.map((user, index) => <tr key={user?._id}>
                                <td>{index + 1}</td>
                                <td>{user?.userName}</td>
                                <td className="status"
                                    style={{ color: user?.status === "active" ? "#12b712" : "red" }}
                                >{user?.status}
                                    <FaArrowsRotate className="rotateIcon" />
                                </td>
                                <td>
                                    <button>Delete</button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
                <button onClick={() => setShowForm(true)} className="addBtn">Add user + </button>
            </div>


            {
                showForm ?
                    <div className="userAddForm">
                        <form onSubmit={handleAdduser}>
                            <div className="cross" onClick={() => setShowForm(false)}>
                                <RxCross2 />
                            </div>
                            <div>
                                <p><CiUser />User name</p>
                                <input type="text" placeholder="Enter user name" name="userName" required />
                            </div>

                            <div>
                                <p><MdOutlineMailOutline />User Email</p>
                                <input type="Email" placeholder="Enter user email" name="userEmail" required />
                            </div>
                            <div>
                                <p><TbPasswordUser />Password</p>
                                <input type="password" placeholder="Enter user password" name="userPassword" required />
                            </div>

                            <button>Add a new user</button>
                        </form>
                    </div>
                    :
                    ""
            }

        </div>
    );
};

export default ManageUser;