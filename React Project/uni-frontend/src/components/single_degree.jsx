import { useEffect, useState } from "react";

function SingleDegree() {
    const [data, setData] = useState([]);
	const [message, setMessage] = useState("");
	const [updated, setUpdated] = useState("");
	const [clicked, setClicked] = useState(false);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleChange = (event) => {
        const inputValue = event.target.value.toUpperCase();
        setMessage(inputValue);
	};

	// form   
	const handleClick = () => {
        // Checks  if message is valid
        const capitalLettersOnly = /^[A-Z]+$/;  // only CAPS
        const isValidCapitalLetters = capitalLettersOnly.test(message);
      
        if (!isValidCapitalLetters) {
          setError("Please enter a valid degree code");
          return;
        }
      
        // If message is valid --- >> update state and fetch data
        setUpdated(message);
        setClicked(true);
      };
      

	useEffect(() => {
		if (!clicked) {
			return;
		}

		setLoading(true);
		async function fetchData () {
			try {
                const req = `http://127.0.0.1:8000/api/cohort/?degree=${updated}`;
				const response = await fetch(req);
				const data = await response.json();
				setData(data);
				setError("");
			}
            catch (err) {
				setError("An error occurred while fetching data");
			} finally {
				setLoading(false);
				setClicked(false);
				setUpdated("");
			}
		};

		fetchData();
	}, [clicked, updated]);

	const displayData = () => {
        if (loading) { // render loading image if loading is true
            return <img src="uni.JPG" alt="loading" />;
        }

        //console.log(data);

		if (error) {
			return <p>{error}</p>;
		}

		if (!data.length) {
			return <p>Degree not Found</p>;
		}

				return (
        <div>
        <h1 style={{ color: "rgb(210, 103, 9)", fontSize: "35px", margin: "20px" }}>COHORTS</h1>

						<div className ="card-container">
                    {data.map((degree) => (
                    <div className ="card" key={degree.id}>
                    <h3 style={{ color: "gray"}}>{degree.id}</h3>
                    <p>Year: {degree.year}</p>
                    <p>{degree.name}</p>
                  </div>
                    ))}       
             
						</div>
        </div>
			);
	};

	return (
		<div>
			<div>
            <input
                type="text"
                id="message"
                name="message"
                onChange={handleChange}
                value={message}
                className="input-box"
                />
                <button onClick={handleClick} className="submit-button">
                VIEW DEGREE
                </button>

			</div>

			{displayData()}
		</div>
	);
}

export default SingleDegree
