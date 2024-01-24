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
      },[connections]);

    return (
        <div>
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
        </div>)
}
export default GetKnownConnections