import axios from "axios";
import { useEffect, useState } from "react";
import GetKnownConnections from "./GetKnownConnections";

const KnownConnections = () => {
    
    // Function for updating category table
    const [newCategory, setNewCategory] = useState({
        category: '',
    });
    const [categories, setCategories] = useState();
    const fetchCategoriesData = async () => {
        axios
        .get("http://localhost:8000/api/get-categories")
        .then((response) => {
            setCategories(response.data);
        })
        .then(console.log(categories))
        .catch((err) => {
            console.error(err);
        });
    }

    useEffect(() => {
        fetchCategoriesData();
      },[newCategory]);
    
      const [connection, setConnection] = useState({
        company: '',
        category: '',
    });

    // Function for updating connections table
    const [connections, setConnections] = useState();
    const [isLoading, setIsLoading] = useState(false)
    const fetchConnectionsData = async () => {
        setIsLoading(true);
        axios
        .get("http://localhost:8000/api/get-connections")
        .then((response) => {
            setIsLoading(false);
            setConnections(response.data);
        })
        .catch((err) => {
            console.error(err);
        });
    }

    useEffect(() => {
        fetchConnectionsData();
      },[connection]);

    // Function for adding a connection to connections table
    const createConnection = async () => {
        await axios
        .post("http://localhost:8000/api/add-new-connection", 
        connection,
        {
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then((response) => {
            setConnection({      
            company: '',
            category: '',
            })
        })
        .catch((err) => {
            return alert(err);
        });
    }

    // Function for adding a category to categories table
    const addCategory = async () => {
        await axios
        .post("http://localhost:8000/api/add-new-category", 
        newCategory,
        {
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then((response) => {
            setNewCategory({      
                category: '',
            })
        })
        .catch((err) => {
            return alert(err);
        });
    }

    const onChangeFormCategory = (e) => {
        if (e.target.name === 'category') {
          setNewCategory({...newCategory, category: e.target.value});
        }
    }
    
    const onChangeFormConnections = (e) => {
        if (e.target.name === 'company') {
          setConnection({...connection, company: e.target.value});
        } else if (e.target.name === 'category') {
          setConnection({...connection, category: e.target.value});
        }
    }

    return (
        <div>
            <h1>Connections</h1>
            <div>
                <h2>Add Category</h2>
                <form>
                    <div>
                        <div>
                            <label>Category</label>
                            <input 
                              type="text" 
                              value={newCategory.category}
                              onChange={(e) => onChangeFormCategory(e)} 
                              name="category" 
                              id="category" 
                              placeholder="Category" 
                            />

                        </div>
                    </div>
                    <button type="button" onClick= {()=>addCategory()}>Add Category</button>
                </form>
            </div>
            <div>
                <h2>Add Connections</h2>
                <form>
                    <div>
                        <div>
                            <label>Company</label>
                            <input 
                              type="text" 
                              value={connection.company}
                              onChange={(e) => onChangeFormConnections(e)} 
                              name="company" 
                              id="company" 
                              placeholder="Company" 
                            />
                        </div>
                        <div>
                            {/* <label>Category</label>
                            <input 
                              type="text" 
                              value={connection.category}
                              onChange={(e) => onChangeFormConnections(e)} 
                              name="category" 
                              id="category" 
                              placeholder="Category" 
                            /> */}
                            <label>Category</label>
                            <select 
                                value={connection.category}
                                onChange={(e) => onChangeFormConnections(e)} 
                                name="category" 
                                id="category" 
                                placeholder="Category" 
                            >
                                {categories && categories.map((item) => 
                                (
                                    <option key={item.category}>{item.category}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <button type="button" onClick= {()=>createConnection()}>Add Connection</button>
                </form>
            </div>
            <div>
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <>
                        <h2>Known Connections</h2>
                        <table border={1}>
                            <thead>
                                <tr>
                                    <th>Company</th>
                                    <th>Category</th>
                                </tr>
                            </thead>
                            {connections && connections.map(connection => 
                            <tbody key={connection.id}>
                                <tr>
                                    <td>{connection.company}</td>
                                    <td>{connection.category}</td>
                                </tr>
                            </tbody>
                            )}
                        </table>
                    </>
                )}
            </div>
        </div>
    );
}
export default KnownConnections;