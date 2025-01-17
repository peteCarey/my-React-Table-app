import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const EmpEdit = () => {
  const { empid } = useParams();
 // const [empdata, empdatachange] = useState({});
  const [id, idchange] = useState("");
  const [name, namechange] = useState("");
  const [area, areachange] = useState("");
  const [example, examplechange] = useState("");
  const [contract, contractchange] = useState("");
  const [actions, actionschange] = useState("");
  const [validation, valchange] = useState(false);

  const navigate = useNavigate();
  // const [empdata, empdatachange] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/employees/" + empid)
      .then((res) => {
        return res.json();
      }).then((resp) =>{
          idchange(resp.id);
          namechange(resp.name);
          areachange(resp.area);
          examplechange(resp.example);
          contractchange(resp.contract);
          actionschange(resp.actions);
          console.log(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [empid]);

 const handleSubmit = (e) => {
   e.preventDefault();
   console.log({ id, name, area, example, contract, actions });
   const empData = {id, name, area, example, contract, actions };

   fetch("http://localhost:8000/employees",+empid, {
     method: "PUT",
     headers: { "content-type": "application/json" },
     body: JSON.stringify(empData),
   })
     .then((res) => {
       alert("Saved successfully.");
       navigate("/employee");
     })
     .catch((err) => {
       console.log(err.message);
     });
 };

  return (
    <div>
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <form className="container" onSubmit={handleSubmit}>
            <div className="card" style={{ textAlign: "left" }}>
              <div className="card-title">
                <h2>Edit Employee </h2>
              </div>

              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>ID</label>
                      <input
                        value={id}
                        disabled="disabled"
                        onChange={(e) => idchange(e.target.value)}
                        className="form-control"
                      ></input>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        required
                        value={name}
                        onMouseDown={(e) => valchange(true)}
                        onChange={(e) => namechange(e.target.value)}
                        className="form-control"
                      ></input>
                      {name.length === 0 && validation && (
                        <span className="text-danger">Enter the name</span>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Area</label>
                      <input
                        value={area}
                        onChange={(e) => areachange(e.target.value)}
                        className="form-control"
                      ></input>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Example</label>
                      <input
                        value={example}
                        onChange={(e) => examplechange(e.target.value)}
                        className="form-control"
                      ></input>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Contract</label>
                      <input
                        value={contract}
                        onChange={(e) => contractchange(e.target.value)}
                        className="form-control"
                      ></input>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Actions</label>
                      <input
                        value={actions}
                        onChange={(e) => actionschange(e.target.value)}
                        className="form-control"
                      ></input>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <Button className="btn btn-success" type="submit">
                        Save
                      </Button>
                      <Link to="/employee" className="btn btn-danger">
                        Back
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default EmpEdit;
