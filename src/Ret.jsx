import { useEffect, useRef, useState } from 'react';
import { Table, Button, Col, Row} from "react-bootstrap";
import UseModal from "./components/UseModal";
import AddRecordModal from "./components/AddRecordModal";
import ModalDeleteConfirm from './components/ModalDeleteConfirm';
import RetentionPeriodColumn from './components/RetentionPeriodColumn';
import Footer from './components/Footer.js';
import Pagination from './components/Pagination';
import "./components/Modal.css";
import axios from 'axios';

const Retention = () => {
    const [categories, setCategories] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedRetention, setSelectedRetention] = useState([]);
    const [retentionPeriods, setRetentionPeriods] = useState([]);
    const [isCategoryFilterActive, setIsCategoryFilterActive] = useState(false);
    const [isRetentionFilterActive, setIsRetentionFilterActive] = useState(false);
    const [isShowingModal, toggleModal] = UseModal();
    const [isShowingDeleteModal, toggleDeleteModal] = UseModal();
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const [editId, setEditId] = useState(-1);
    const [category, updateCategory] = useState("");
    const [rationale, updateRationale] = useState("");
    const [example, updateExample] = useState("");
    const [retentionPeriod, updateRetentionPeriod] = useState("");
    const [expandedRows, setExpandedRows] = useState({});
    const [isOverflowed, setIsOverflowed] = useState({});
    const refs = useRef([]);
    const uniqueCategories = [...new Set(categories.map(cat => cat.category))];
    const [isOpen, setIsOpen] = useState(false);
    const [showReadMoreButton, setShowReadMoreButton] = useState(false);
    const ref = useRef(null);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;
    const firstIndex = (currentPage - 1) * recordsPerPage;
    const lastIndex = firstIndex + recordsPerPage;
    const [selectedAction, setSelectedAction] = useState("");
    const [rowToDelete, setRowToDelete] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        const applyFilters = () => {
            let filtered = categories;
            if (selectedCategories.length) {
                filtered = filtered.filter(cat => selectedCategories.includes(cat.category));
            }
            if (selectedRetention.length) {
                filtered = filtered.filter(cat => selectedRetention.includes(cat.retentionPeriod));
            }
            setFilteredCategories(filtered);
            setCurrentPage(1);
        };

        applyFilters();
        }, [selectedCategories, selectedRetention, categories]);

    useEffect(() => {
        setTimeout(() => {
            if (ref.current) {
                console.log(ref.current.scrollHeight, ref.current.clientHeight)
                setShowReadMoreButton(
                    ref.current.scrollHeight !== ref.current.clientHeight
                )
            }
        }, 1000);
    }, [])

    const handleCheckboxChange = (setState, event) => {
        const value = event.target.value;
        console.log(value);
        setState((prev) =>
            event.target.checked
                ? [...prev, value]
                : prev.filter((item) => item !== value)
        );
    };

    const handleCategoryMasterCheckboxChange = (e) => {
        const isChecked = e.target.checked;
        setIsCategoryFilterActive(isChecked);
        if (!isChecked) {
            setSelectedCategories([]);
            document.querySelectorAll('input[name="cat"]').forEach(input => input.checked = false);
        }
    };

    const handleRetentionMasterCheckboxChange = (e) => {
        const isChecked = e.target.checked;
        setIsRetentionFilterActive(isChecked);
        if (!isChecked) {
            setSelectedRetention([]);
            document.querySelectorAll('input[name="ret"]').forEach(input => input.checked = false);
        }
    };

    const handleSelectChange = (event, id) => {
        const action = event.target.value;
        if (action !== selectedAction) { 
            setSelectedAction(action);
        }
        if (action === "edit") {
            handleEdit(id); 
        } else if (action === "delete") {
            setRowToDelete(id);
            toggleDeleteModal(id);
            setSelectedAction("");
        }
    };

    const handleEdit = async (id) => {
        try {
            const res = await axios.get(http://localhost:8000/retention/${id});
            updateCategory(res.data.category);
            updateRationale(res.data.rationale);
            updateExample(res.data.example);
            updateRetentionPeriod(res.data.retentionPeriod);
            setEditId(id);
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdate = async () => {
        try {
            await axios.put(http://localhost:8000/retention/${editId}, {
                id: editId,
                category,
                rationale,
                example,
                retentionPeriod
            });
            location.reload();
            setEditId(-1);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteConfirm = async () => {
        try {
            await axios.delete(http://localhost:8000/retention/${rowToDelete});
            setCategories((prev) => prev.filter((cat) => cat.id !== rowToDelete));
            toggleDeleteModal();
            setRowToDelete(null);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddRecord = (newRecord) => {
        setCategories((prevCategories) => [...prevCategories, newRecord]);
        setFilteredCategories((prevFiltered) => [...prevFiltered, newRecord]);

        const totalPages = Math.ceil((filteredCategories.length + 1) / recordsPerPage);
        setCurrentPage(totalPages);
    };


    const fetchCategories = async () => {
        try {
            const { data } = await axios.get("http://localhost:8000/retention");
            setCategories(data);
            setFilteredCategories(data);
            setIsPending(false);
        } catch (err) {
            setError(err.message);
            setIsPending(false);
        }
    };

    useEffect(() => {
        const overflowStatus = {};
        refs.current.forEach((ref, index) => {
            if (ref) {
                const isContentOverflowing = ref.scrollHeight > ref.clientHeight;
                overflowStatus[index] = isContentOverflowing;
            }
        });
        setIsOverflowed(overflowStatus);
    }, [filteredCategories]);

    const toggleRowExpansion = (rowIndex) => {
        setExpandedRows(prev => ({
            ...prev,
            [rowIndex]: !prev[rowIndex]
        }));
    };

    const renderExpandableCell = (content, uniqueKey) => {
        const isExpanded = expandedRows[uniqueKey];
        const isOverflow = isOverflowed[uniqueKey];

        const containerStyle = {
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 3,
            maxHeight: isExpanded ? 'none' : '4.5em',
        };

        return (
            <div style={containerStyle} ref={(el) => (refs.current[uniqueKey] = el)}>
                {content}
                {isOverflow && (
                    <span
                        style={{ color: 'blue', cursor: 'pointer', marginLeft: 5 }}
                        onClick={() => toggleRowExpansion(uniqueKey)}
                    >
                        {isExpanded ? "Hide" : "Read more..."}
                    </span>
                )}
            </div>
        );
    };
/*
    const paragraphStyles = {
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 3,

    };
*/
    const renderCategoryRows = () => {
        if (isPending) return <tr><td colSpan="6">Loading...</td></tr>;
        if (error) return <tr><td colSpan="6">{error}</td></tr>;

        const paginatedData = filteredCategories.slice(firstIndex, lastIndex);

        return paginatedData.map((cat, index) => (
            cat.id === editId ? (
                <tr key={index}>
                    <td><input type="text" value={category} onChange={e => updateCategory(e.target.value)} /></td>
                    <td><input type="text" value={rationale} onChange={e => updateRationale(e.target.value)} /></td>
                    <td><input type="text" value={example} onChange={e => updateExample(e.target.value)} /></td>
                    <td><input type="text" value={retentionPeriod} onChange={e => updateRetentionPeriod(e.target.value)} /></td>
                    <td><Button onClick={handleUpdate} style={{backgroundColor: "#00978F", display:"block", margin: "0 auto"}}>Update</Button></td>
                </tr>
            ) : (
                <tr key={index}>
                    <td>{cat.category}</td>
                    <td> {renderExpandableCell(cat.rationale, rationale-${index})}
                    {showReadMoreButton && (
                <button id="myBtn" onClick={() => setIsOpen(!isOpen)}>
                  {isOpen ?'Read Less...':'Read More...'}</button>
                  )}
                    </td>
                    <td>{renderExpandableCell(cat.example, example-${index})}
                    {showReadMoreButton && (
                <button id="myBtn" onClick={() => setIsOpen(!isOpen)}>
                  {isOpen ?'Read Less...':'Read More...'}</button>
                  )}
                    </td>
                    <td>
                        <RetentionPeriodColumn
                            retentionPeriod={cat.retentionPeriod.split(' - ')[0]}
                            tooltip={cat.retentionPeriod.split(' - ')[1]} />
                    </td>
                    <td> 
                        <select id="action-select" value={selectedAction} onChange={(event) => handleSelectChange(event, cat.id)}
                            className={selectedAction === "" ? "no-border" : ""}>
                            <option value="">Actions:</option>
                            <option value="edit"  onClick={() => handleEdit(cat.id)}>Edit record</option>
                            <option value="delete" onClick={() => toggleDeleteModal(cat.id)}>Delete</option>
                        </select>
                    </td>
                </tr>
            )
        ));
    };

    useEffect(() => {
        const uniqueRetentionPeriods = Array.from(new Set(categories.map(cat => cat.retentionPeriod.split("-")[0])));
        console.log(uniqueRetentionPeriods);
        //const uniqueRetention = [ ...new Set(uniqueRetentionPeriods)];
        setRetentionPeriods(uniqueRetentionPeriods);

    }, [categories]);


    return (
     <>
        <Row>
            <Col xs={2} style = {{backGroundColor:"yellow"}}>
                <div className= "filter-panel">
                <div className="title">Filters</div>
                <div className="checkList">
                    <div className="categories">
                        <input
                            type="checkbox"
                            checked={isCategoryFilterActive}
                            onChange={handleCategoryMasterCheckboxChange}
                            disabled={isRetentionFilterActive}
                        />
                        <span className="title">Categories</span>
                    </div>
                    <div className="categories">
                        {uniqueCategories.map((item, index) => (
                            <div className="checkbox-container" key={index}>
                                <input
                                    value={item}
                                    type="checkbox"
                                    name="cat"
                                    id={commandControl-${index}} 
                                    onChange={(e) => handleCheckboxChange(setSelectedCategories, e)}
                                    disabled={!isCategoryFilterActive}
                                />
                                <span className="checkbox-label">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="checkList">
                    <div className="retention">
                        <input
                            type="checkbox"
                            checked={isRetentionFilterActive}
                            onChange={handleRetentionMasterCheckboxChange}
                            disabled={isCategoryFilterActive}
                        />
                        <span className="title">Retention Period</span>
                    </div>
                    <div className="retention">
                        {retentionPeriods.map((item, index) => (
                            <div key={index}>
                                <input
                                    value={item}
                                    type="checkbox"
                                    name="ret"
                                    onChange={(e) => handleCheckboxChange(setSelectedRetention, e)}
                                    disabled={!isRetentionFilterActive}
                                />
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
                </div>
            </Col>

            <Col xs={10} className="column-right">
                <div className="table-wrapper">
                    <Table style={{ width: "100%", tableLayout: "fixed", borderStyle: "solid", borderWidth: "1px" }}>
                        <thead>
                            <tr>
                                <th style={{ width: "179px" }}></th>
                                <th style={{ width: "524px" }}></th>
                                <th style={{ width: "275px" }}></th>
                                <th style={{ width: "139px" }}><Button style={{backgroundColor: "#00978F", width: "192px", height: "41px"}} onClick={toggleModal}>Create New Record</Button></th>
                                <th style={{ width: "119px" }}></th>
                            </tr>
                            <tr>
                                <th style={{ width: "179px" }}>Categories</th>
                                <th style={{ width: "524px" }}>Rationale</th>
                                <th style={{ width: "275px" }}>Example</th>
                                <th style={{ width: "139px" }}>Retention Period</th>
                                <th style={{ width: "119px" }}></th>
                            </tr>
                        </thead>
                        <tbody >{renderCategoryRows()}</tbody>
                       
                    </Table>
                </div>
                
                
                <Footer footerMessage={true} showLogo={false} showFooterBar={false} />
                <Pagination
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalRecords={filteredCategories.length}
                        recordsPerPage={recordsPerPage} 
                    />
                    <hr />
            </Col>  
        </Row> 
      
        <AddRecordModal onAddRecord={handleAddRecord} show={isShowingModal} onHide={toggleModal} dialogClassName="modal-dialog-scrollable" centered />
        <ModalDeleteConfirm   show={isShowingDeleteModal}  onHide={() => { toggleDeleteModal(); setRowToDelete(null); }} 
        onDeleteConfirm={handleDeleteConfirm} />
        </>  
           
    );
};

export default Retention;