import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";
import moment from "moment";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [allData, setAllData] = useState([]);
  const [data, setData] = useState([]);

  const onSearch = (e) => {
    setSearchInput(e.target.value);
  };

  const clickSearch = () => {
    console.log((searchInput))
    axios({method:"get",url:`https://hack2skill-task2.onrender.com/search`,params:{search:searchInput} })
    .then((res)=>{
      setAllData([])
      setSearchResult(res.data)
      console.log(res)
    })
  };

  const updateDB = () => {};

  const getData = () => {
    axios
      .get("https://hack2skill-task2.onrender.com/getData")
      .then((res) => {
        setAllData(res.data.videoData);
        console.log(allData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {}, []);

  return (
    <>
      <button onClick={updateDB}>Update Database</button>
      <button onClick={getData}>Get Data From Database</button>
      <div>
        <input type="text" placeholder="search video" onChange={onSearch} />
        <button onClick={clickSearch}>Search</button>
      </div>

      <div style={{ display: "flex" }}>
        <div>
          {allData.length != 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Published At</th>
                  <th>Thumbnail</th>
                </tr>
              </thead>
              <tbody>
                {allData.map((e) => {
                  let date = moment.unix(e.publishedAt); // Convert Unix timestamp to moment object
                  let readableTime = date.format("MMMM Do, h:mm:ss a"); // Format the moment object
                  return (
                    <tr>
                      <td>{e.title}</td>
                      <td>{e.description}</td>
                      <td>{readableTime}</td>
                      <td>
                        <img src={e.thumbnail} alt="" />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <h2>No data found</h2>
          )}
        </div>
        <div>
          {searchResult.length != 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Published At</th>
                  <th>Thumbnail</th>
                </tr>
              </thead>
              <tbody>
                {searchResult.map((e) => {
                  let date = moment.unix(e.publishedAt); 
                  let readableTime = date.format("MMMM Do, h:mm:ss a"); 

                  return (
                    <tr>
                      <td>{e.title}</td>
                      <td>{e.description}</td>
                      <td>{readableTime}</td>
                      <td>
                        <img src={e.thumbnail} alt="" />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <h2>No Search data found</h2>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
