import React, { useEffect, useState } from "react";
import axios from "axios";

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        const response = await axios.get("http://localhost:8080/api/employees");
        setEmployees(response.data);
    };

    return (
        <div>
            <h2>Employee List</h2>
            <ul>
                {employees.map((employee) => (
                    <li key={employee.id}>
                        {employee.name} - {employee.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EmployeeList;
