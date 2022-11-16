import * as React from "react";
import { Container } from "react-bootstrap";
import Navigation from "../components/Navigation";
import detailImg from "../assets/img/detail.png";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { BsBookmarkFill } from "react-icons/bs";
import { API } from "../config/API";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { UserContext } from "../context/userContext";

const DetailCollection = () => {
  const [state, dispatch] = React.useContext(UserContext);
  const [collections, setCollections] = React.useState([]);

  const params = useParams();
  const navigate = useNavigate();

  console.log("This params", params.id);

  const { data: collection } = useQuery("collectionCache", async () => {
    const response = await API.get(`collection/${params.id}`);
    return response.data.data;
  });

  const getCollections = async () => {
    const response = await API.get(`/collections`);
    setCollections(response.data.data);
    console.log("getCollections", response.data.data);
  };

  React.useEffect(() => {
    getCollections();
  }, [state]);

  const handleDelete = async () => {
    try {
      await API.delete(`/collection/${params.id}`);
      navigate("/collection");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navigation />
      <section className="bg-page margin-top">
        <Container>
          <div className="row">
            <div className="col-lg-4 col-md-4 col-12 mb-lg-0 mb-3 order-lg-1 order-1">
              <img src={detailImg} alt="detail-img" width="100%" />
            </div>
            <div className="col-lg-5 col-md-5 col-12 order-lg-2 order-3">
              <div className="mb-4">
                <h2 className="title text-white fw-bold">{collection?.literature.title}</h2>
                <h5 className="fw-light text-white">{collection?.literature.author}</h5>
              </div>
              <div className="mb-4">
                <h2 className="title text-white fw-bold">Publication Date</h2>
                <h5 className="fw-light text-white">{collection?.literature.publication_date}</h5>
              </div>
              <div className="mb-4">
                <h2 className="title text-white fw-bold">Pages</h2>
                <h5 className="fw-light text-white">{collection?.literature.pages}</h5>
              </div>
              <div className="mb-4">
                <h2 className="title text-white fw-bold ">ISBN</h2>
                <h5 className="fw-light text-white">{collection?.literature.isbn}</h5>
              </div>
              <div className="mb-4">
                <a className="btn btn-danger fw-bold w-50 text-white" href={collection?.literature.file}>
                  Read Literature <BsFileEarmarkPdf />
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-md-2 col-12 order-lg-3 order-2 mb-3">
              <button className="btn btn-danger w-100 text-white fw-bold" onClick={() => handleDelete()}>
                Delete Collection <BsBookmarkFill />
              </button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default DetailCollection;
