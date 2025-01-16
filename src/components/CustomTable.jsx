import { Button, Table } from "react-bootstrap";

const CustomTable = () => {
  return (
    <div>
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
            <th style={{ width: "179px" }}></th>
            <th style={{ width: "524px" }}></th>
            <th style={{ width: "275px" }}></th>
            <th style={{ width: "139px" }}>
              <Button
                style={{
                  backgroundColor: "#00978F",
                  width: "192px",
                  height: "41px",
                }}
                onClick={toggleModal}
              >
                Create New Record
              </Button>
            </th>
            <th style={{ width: "119px" }}></th>
          </tr>
          <tr>
            <th style={{ width: "179px" }}>Name</th>
            <th style={{ width: "524px" }}>Area</th>
            <th style={{ width: "275px" }}>Example</th>
            <th style={{ width: "139px" }}>Contract</th>
            <th style={{ width: "119px" }}>ExceptionsReasons</th>
          </tr>
        </thead>
        <tbody>{renderCategoryRows()}</tbody>
      </Table>
      ;
    </div>
  );
};
export default CustomTable;
