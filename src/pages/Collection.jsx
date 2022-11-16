import * as React from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import exampleImg from "../assets/img/example.png";
import Navigation from "../components/Navigation";
import { API } from "../config/API";
import { UserContext } from "../context/userContext";

const Collection = () => {
  const [state, dispatch] = React.useContext(UserContext);
  const [literatureCollection, setLiteratureCollection] = React.useState([]);
  const navigate = useNavigate();
  console.log("This State Collection", state);

  const getLiteratureCollection = async () => {
    const response = await API.get(`/collectionUser/${state.user.id}`);
    setLiteratureCollection(response.data.data);
    console.log("getLiteratureCollectionByUser", response.data.data);
  };

  React.useEffect(() => {
    getLiteratureCollection();
  }, [state]);

  return (
    <>
      <Navigation />
      <section className="bg-darkblue pt-5">
        <Container className="pt-5">
          <h2 className="text-white fw-bold my-3 title">My Collection</h2>
          <div className="row">
            {literatureCollection.length == 0 ? (
              <>
                <div className="d-grid justify-content-center align-items-center">
                  <h2 className="text-light text-center margin-top">Empty Collection</h2>
                  <button className="btn btn-danger w-100" onClick={() => navigate("/search")}>
                    Search Literature
                  </button>
                </div>
              </>
            ) : (
              <>
                {literatureCollection?.map((item, index) => (
                  <div className="col-lg-3 col-6 mb-5" key={index} onClick={() => navigate(`/detailCollection/${item?.id}`)}>
                    <img src={exampleImg} alt="example-img" width="100%" />
                    <h5 className="fw-bold text-white mt-3">{item?.literature?.title}</h5>
                    <h6 className="text-light fw-light">
                      <span className="float-start">{item?.literature?.author}</span>
                      <span className="float-end">{item?.literature?.publication_date}</span>
                    </h6>
                  </div>
                ))}
              </>
            )}
          </div>
        </Container>
      </section>
    </>
  );
};

export default Collection;
