import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
const EmpDetail = () => {
const { empid } = useParams();
const [empdata, empdatachange] = useState({});

  useEffect(() => {
    fetch("http://localhost:8000/employees/" + empid)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        console.log(resp);
        empdatachange(resp);
      })
      .catch((err) => {
        console.log(err.message);
      })
  }, [empid])

  return (
    <div className="container">
      <div className="card">
        <div className="card-title">
          <h2>Employee Create</h2>
        </div>
        <div className="card-body"></div>
        <div>
          {empdata && (
            <div>
              <h1>
                The Employee name is : {empdata.name}({empdata.id})
              </h1>
              <h3>Area is : {empdata.area}</h3>
              <h5>Example is : {empdata.example}</h5>
              <h5>Contract is : {empdata.contract}</h5>
              <h5>Actions is : {empdata.actions}</h5>
              <Link className="btn btn-danger" to="/employee">
                Back to Listing
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default EmpDetail;
