import "./ManageUser.css";
import Swal from "sweetalert2";
import UseAxios from "../../utils/useAxios";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useContext, useRef, useState } from "react";
import { CiUser } from "react-icons/ci";
import { FaArrowsRotate } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { TbPasswordUser } from "react-icons/tb";
import { toast } from "sonner";
import { Mycontext } from "../../Authcontext/Authcontext";
import { createUser } from "../../utils/createUser";
import { formateDate } from "../../utils/dateFormater";

const ManageUser = () => {

    const { createAccountWithEmail, setCreatingUser } = useContext(Mycontext)

    const daterRef = useRef(null)

    const [showForm, setShowForm] = useState(false)
    const [status, setStatus] = useState("")
    const [date, setDate] = useState("")

    const myAxios = UseAxios()
    const { data = [], refetch } = useQuery({
        queryKey: ["userDaa", status, date],
        queryFn: async () => {
            const { data: Users } = await axios.get(`https://alpaago-weather-app-server.vercel.app/api/users?status=${status}&&date=${date}`)
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

        const toastId = toast.loading("Please wait...")
        const user = await createAccountWithEmail(userEmail, userPassword)
        const userObj = {
            userName,
            userEmail,
            status: "active"
        }

        await createUser(userObj)
        toast.dismiss(toastId)
        toast.success("user added")
        setCreatingUser(false)
        form.reset()
        setShowForm(false)
        refetch()


    }


    const hanldeChangeStatus = async (status, id) => {

        if (status === "active") {
            await myAxios.put(`/user/status?id=${id}&&status=${"inactive"}`)
            toast.success("Status update successfully")
            refetch()
        }

        if (status === "inactive") {
            await myAxios.put(`/user/status?id=${id}&&status=${"active"}`)
            toast.success("Status update successfully")
            refetch()
        }

        else {
            return;
        }


    }


    const handleDateFilter = (e) => {
        const value = e.target.value
        const dateValue = formateDate(value)
        setDate(dateValue)
    }


    const deleteUser = async (id) => {
        Swal.fire({
            title: "Do you sure want to delete?",
            showDenyButton: true,
            confirmButtonText: "Yes ✔️",
            denyButtonText: `No X`
        }).then(async (result) => {
            if (result.isConfirmed) {

                await myAxios.delete(`/user?id=${id}`)
                toast.success("Successfully deleted")
                refetch()

            }
            else if (result.isDenied) {
                return;
            }
        });

    }



    const clearDateFilter = () => {
        daterRef.current.value = ""
        setDate("")
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

                    <div>
                        <p>Date: </p>
                        <input type="date" ref={daterRef} name="" id="" onChange={handleDateFilter} />
                        <button onClick={clearDateFilter} className="clearBtn">Clear</button>
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>

                            <th>Sl</th>
                            <th>User name</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.map((user, index) => <tr key={user?._id}>
                                <td>{index + 1}</td>
                                <td>{user?.userName}</td>
                                <td>{user?.date}</td>
                                <td className="status"
                                    style={{ color: user?.status === "active" ? "#12b712" : "red" }}
                                    onClick={() => hanldeChangeStatus(user?.status, user?._id)}
                                >{user?.status}
                                    <FaArrowsRotate className="rotateIcon" />
                                </td>
                                <td>
                                    <button onClick={() => deleteUser(user?._id)}>Delete</button>
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