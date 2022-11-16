import * as React from "react";
import { Container } from "react-bootstrap";
import Navigation from "../components/Navigation";
import { FaSearch } from "react-icons/fa";
import exampleImg from "../assets/img/example.png";
import { API } from "../config/API";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";

const Search = () => {
  const [state, dispatch] = React.useContext(UserContext);
  const [literatures, setLiteratures] = React.useState([]);
  const [search, setSearch] = React.useState("");

  const navigate = useNavigate();

  const getLiteratures = async () => {
    const response = await API.get(`/literatures`);
    setLiteratures(response.data.data);
    console.log("getLiteratures", response.data.data);
  };

  React.useEffect(() => {
    getLiteratures();
  }, [state]);

  let { data: searchResult } = useQuery("searchResultCache", async () => {
    const response = await API.get("/literatures/approve");
    return response.data.data;
  });

  return (
    <>
      <Navigation />
      <section className="bg-page margin-top">
        <Container>
          <form>
            <div className="row">
              <div className="col-lg-6 col-12">
                <div className="d-flex">
                  <div className="me-3 w-100">
                    <input type="text" className="form-control form-me" id="exampleInputEmail1" placeholder="Search for literature" onChange={(e) => setSearch(e.target.value)} />
                  </div>
                  <button className="btn btn-danger text-white">
                    <FaSearch />
                  </button>
                </div>
              </div>
            </div>
          </form>
          <div className="row mt-lg-5 mt-md-5 mt-3">
            <div className="col-lg-12 col-md-9 col-12 mt-lg-0 mt-3 mb-5">
              <div className="row">
                {searchResult
                  ?.filter((item) => {
                    return search.toLocaleLowerCase() === "" ? item : item.title.toLocaleLowerCase().includes(search);
                  })
                  .map((item) => (
                    <div className="col-lg-3 col-6 mb-5" key={item?.id} onClick={() => navigate(`/detail/${item?.id}`)}>
                      <img src={exampleImg} alt="example-img" width="100%" />
                      <h5 className="fw-bold text-white mt-3">{item?.title}</h5>
                      <h6 className="text-light fw-light">
                        <span className="float-start">{item?.author}</span>
                        <span className="float-end">{item?.publication_date}</span>
                      </h6>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Search;
