import axios from "axios";
import { useEffect, useState } from "react";
import GetKnownConnections from "./GetKnownConnections";

const KnownConnections = () => {
    
    const [connection, setConnection] = useState({
        company: '',
        category: '',
    });  
    
    const [connections, setConnections] = useState();
    const [isLoading, setIsLoading] = useState(false)
    const fetchData = async () => {
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
        fetchData();
      },[connection]);

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

    const onChangeForm = (e) => {
        if (e.target.name === 'company') {
          setConnection({...connection, company: e.target.value});
        } else if (e.target.name === 'category') {
          setConnection({...connection, category: e.target.value});
        }
    }

    return (
        <div >
            <div>
                <div>
                <h1>Add Connection</h1>
                <form>
                    <div>
                        <div>
                            <label>Company</label>
                            <input 
                              type="text" 
                              value={connection.company}
                              onChange={(e) => onChangeForm(e)} 
                              name="company" 
                              id="company" 
                              placeholder="Company" 
                            />
                        </div>
                        <div>
                            <label>Category</label>
                            <input 
                              type="text" 
                              value={connection.category}
                              onChange={(e) => onChangeForm(e)} 
                              name="category" 
                              id="category" 
                              placeholder="Category" 
                            />
                        </div>
                    </div>
                    <button type="button" onClick= {()=>createConnection()}>Create</button>
                </form>
                </div>
            </div>
            <div>
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <>
                    <h2>Connections</h2>
                        <table>
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
};
export default KnownConnections;