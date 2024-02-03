import "./ManageUser.css";
import UseAxios from "../../utils/useAxios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { CiUser } from "react-icons/ci";
import { FaArrowsRotate } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { TbPasswordUser } from "react-icons/tb";

const ManageUser = () => {

    const [showForm, setShowForm] = useState(false)

    const axios = UseAxios()
    const { data = [] } = useQuery({
        queryKey: ["userDaa"],
        queryFn: async () => {
            const { data: Users } = await axios.get("/users")
            return Users
        }
    })


    return (
        <div className="userContainer">

            <div className="tableContainer">
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
                        <form>
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
                                <input type="Email" placeholder="Enter user password" name="userEmail" required />
                            </div>

                            <div>
                                <p>User Photo (optional)</p>
                                <input type="file" accept="*/image" name="userPhoto" required />
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