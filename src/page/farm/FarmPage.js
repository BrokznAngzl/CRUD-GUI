import React, {useContext, useState} from "react";
import TableComp from "../../component/TableComp";
import FormComp from "./component/FormComp";
import {AiFillCaretUp} from "react-icons/ai";
import {AppContext} from "../../context/AppContext";

const FarmPage = () => {
    const [queryForm, setQueryForm] = useState(false);
    const {setPage} = useContext(AppContext);
    const columnHeader = ['Name', 'Title', 'Status', 'Role', 'Email', 'Actions']
    const tableData = [
        {
            id: 1,
            name: "Jane Cooper",
            title: "Regional Paradigm Technician",
            status: "Active",
            role: "Admin",
            email: "jane.cooper@example.com"
        },
        {
            id: 2,
            name: "John Doe",
            title: "Product Manager",
            status: "Inactive",
            role: "Manager",
            email: "john.doe@example.com"
        },
        {
            id: 3,
            name: "Emily Smith",
            title: "Software Engineer",
            status: "Active",
            role: "Developer",
            email: "emily.smith@example.com"
        },
        {
            id: 4,
            name: "Michael Johnson",
            title: "Customer Support Specialist",
            status: "Active",
            role: "Support",
            email: "michael.johnson@example.com"
        },
        {
            id: 5,
            name: "Jessica Brown",
            title: "Marketing Coordinator",
            status: "Inactive",
            role: "Marketing",
            email: "jessica.brown@example.com"
        },
        {
            id: 6,
            name: "David Lee",
            title: "Sales Manager",
            status: "Active",
            role: "Sales",
            email: "david.lee@example.com"
        },
        {
            id: 7,
            name: "Sophia Wilson",
            title: "HR Specialist",
            status: "Active",
            role: "HR",
            email: "sophia.wilson@example.com"
        },
        {
            id: 8,
            name: "Andrew Miller",
            title: "Financial Analyst",
            status: "Inactive",
            role: "Finance",
            email: "andrew.miller@example.com"
        },
        {
            id: 9,
            name: "Olivia Moore",
            title: "Graphic Designer",
            status: "Active",
            role: "Design",
            email: "olivia.moore@example.com"
        },
        {
            id: 10,
            name: "William Taylor",
            title: "Operations Manager",
            status: "Active",
            role: "Operations",
            email: "william.taylor@example.com"
        },
        {
            id: 11,
            name: "Ella Anderson",
            title: "Content Writer",
            status: "Inactive",
            role: "Content",
            email: "ella.anderson@example.com"
        },
        {
            id: 12,
            name: "James Robinson",
            title: "IT Administrator",
            status: "Active",
            role: "IT",
            email: "james.robinson@example.com"
        },
        {
            id: 13,
            name: "Isabella Clark",
            title: "Research Analyst",
            status: "Active",
            role: "Research",
            email: "isabella.clark@example.com"
        },
        {
            id: 14,
            name: "Daniel Harris",
            title: "Project Manager",
            status: "Inactive",
            role: "Project Management",
            email: "daniel.harris@example.com"
        }
    ];

    return (
        <div className="w-full mt-16">
            {/* form */}
            <div className={"flex justify-between"}>
                <FormComp toggleForm={setQueryForm} showForm={queryForm}/>

                <div className="relative m-5 w-2/4">
                    <div className="flex items-center  justify-end px-1 py-3">
                        <button
                            onClick={(e)=>setPage('addfarm')}
                            className="text-white bg-green-600 hover:bg-green-700 focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                            Add Farm
                        </button>
                    </div>
                </div>
            </div>

            <TableComp tableData={tableData} columnHeader={columnHeader}/>
        </div>
    );
};

export default FarmPage;
