import { useEffect, useState } from "react";

const GetKnownConnections = () => {
    
    const [connections, setConnections] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(async () => {
        setLoading(true)
        fetch("http://localhost:8000/api/get-connections")
        .then(response => response.json())
        .then(json => setConnections(json))
        .finally(() => {
            setLoading(false)
        })
    }, []);

    return (
        <div>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                <h1>Connections</h1>
                <table border={1}>
                    <tr>
                    <th>Company</th>
                    <th>Category</th>
                    </tr>
                    {connections.map(connection => (
                    <tr>
                        <td>{connection.company}</td>
                        <td>{connection.category}</td>
                    </tr>
                    ))}
                </table>
                </>
            )}
        </div>)
}
export default GetKnownConnections;