import { useEffect, useState } from "react";
import axios from "axios";

const GetKnownConnections = () => {
    
    const [connections, setConnections] = useState();

    useEffect(() => {
        axios
          .get("http://localhost:8000/api/get-connections")
          .then((response) => setConnections(response.data))
          .catch((err) => {
            console.error(err);
          });
      }, []);

    return (
        <div>
            <>
            <h2>Connections</h2>
                <table>
                    <tr>
                    <th>Company</th>
                    <th>Category</th>
                    </tr>
                    {connections && connections.map(connection => 
                    <tr key={connection.id}>
                        <td>{connection.company}</td>
                        <td>{connection.category}</td>
                    </tr>
                    )}
                </table>
            </>
        </div>)
}
export default GetKnownConnections