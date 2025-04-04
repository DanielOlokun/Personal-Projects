// page where all modules can be seen

import { useEffect, useState } from "react";

function ModuleList() {
    const [data, setData] = useState([]);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		async function fetchData () {
			try {
                const req = `http://127.0.0.1:8000/api/module`;
				const response = await fetch(req);
				const data = await response.json();
				setData(data);
				setError("");
			}
            catch (err) {
				setError("An error occurred while fetching data");
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	const displayData = () => {
        if (loading) { // render loading image if loading is true
            return <img src="shibthinking.gif" alt="loading" />;
        }

        //console.log(data);

		if (error) {
			return <p>{error}</p>;
		}

		return (
            <div>
                <h1 style={{ color: "rgb(210, 103, 9)", fontSize: "50px", margin: "20px" }}>ALL MODULES</h1>

			<div className="card-container">
                    {data.map((module) => (
                    <div className="card" key={module.code}>
                    <h3 style={{ color: "gray"}}>{module.code}</h3>
                    <p>{module.full_name}</p>
                    <ul>
                        <i>Delivered to:</i>
                        {module.delivered_to.map((option) => (
                            <li key={option}>{option.split('/')[5]}</li>
                        ))}
                    </ul>
                    <p>CA SPLIT : {module.ca_split}</p>
                    <br></br>

                  </div>
                    ))}           
			</div>
            </div>
		);
	};

	return (
		<div>
			{displayData()}
		</div>
	);
}

export default ModuleList