import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";

const EmpListing = () => {
  const [empdata, empdatachange] = useState(null);
  const navigate = useNavigate();

  const LoadDetail = (id) => {
    navigate("/employee/detail/" + id);
  };

  const LoadEdit = (id) => {
    console.log("Edit ID: ", id);
    navigate("/employee/edit/" + id);
  };

  const Removefunction = (id) => {
    if (window.confirm("Do you want to remove?")) {
      fetch(`http://localhost:8000/employees/${id}`, {
        method: "DELETE",
      })
        .then((res) => {
          alert("Removed successfully.");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  useEffect(() => {
    fetch("http://localhost:8000/employees")
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        console.log(resp);
        empdatachange(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className="container">
      <div className="card">
        <div className="card-title">
          <h2>Employee Listing</h2>
        </div>
        <div className="card-body">
          <div className="divbtn">
            <Link to="/employee/create" className="btn btn-success">
              Create Record (+)
            </Link>
          </div>

          <Table
            style={{
              width: "100%",
              tableLayout: "fixed",
              borderStyle: "solid",
              borderWidth: "1px",
            }}
          >
            <thead>
              <tr>
                <th style={{ width: "10%" }}>Id</th>
                <th style={{ width: "10%" }}>Name</th>
                <th style={{ width: "20%" }}>Area</th>
                <th style={{ width: "20%" }}>Example</th>
                <th style={{ width: "20%" }}>Contract</th>
                <th style={{ width: "10%" }}>Actions</th>
                <th style={{ width: "10%" }}></th>
              </tr>
            </thead>
            {/*<tbody>{renderCategoryRows()}</tbody>-->*/}
            <tbody>
              {empdata &&
                empdata.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.area}</td>
                    <td>{item.example}</td>
                    <td>{item.contract}</td>
                    <td>{item.actions}</td>
                    <td>
                      <span>
                        <BsFillTrashFill
                          variant="link"
                          onClick={() => Removefunction(item.id)}
                        />
                        <Button
                          variant="link"
                          onClick={() => LoadEdit(item.id)}
                        >
                          <BsFillPencilFill />
                        </Button>
                        <Button
                          onClick={() => LoadDetail(item.id)}
                          className="btn btn-primary"
                        >
                          Details
                        </Button>
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default EmpListing;
