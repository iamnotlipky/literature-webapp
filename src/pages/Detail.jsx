import * as React from "react";
import { Container } from "react-bootstrap";
import Navigation from "../components/Navigation";
import detailImg from "../assets/img/detail.png";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { BsBookmark } from "react-icons/bs";
import { BsBookmarkFill } from "react-icons/bs";
import { API } from "../config/API";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { UserContext } from "../context/userContext";
import { useState } from "react";

const Detail = () => {
  const [state, dispatch] = React.useContext(UserContext);
  const [collections, setCollections] = React.useState();
  const params = useParams();
  const navigate = useNavigate();
  const { id } = useParams();

  console.log("This params", params.id);

  const { data: literature } = useQuery("literatureCache", async () => {
    const response = await API.get(`literature/${params.id}`);
    return response.data.data;
  });

  const getCollections = async () => {
    const response = await API.get(`/collectionLiterature/${id}`);
    console.log("getCollections", response.data.data);

    setCollections(response.data.data);
    return;
  };

  console.log(collections);

  const handleCollection = async (literature_id) => {
    try {
      let addCollection = {
        user_id: state.user.id,
        literature_id: literature_id,
      };
      await API.post(`/collection`, addCollection);
      navigate("/collection");
      console.log("Add Collection Response", addCollection);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/collection/${id}`);
      navigate("/collection");
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getCollections();
  }, []);

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
                <h2 className="title text-white fw-bold">{literature?.title}</h2>
                <h5 className="fw-light text-white">{literature?.author}</h5>
              </div>
              <div className="mb-4">
                <h2 className="title text-white fw-bold">Publication Date</h2>
                <h5 className="fw-light text-white">{literature?.publication_date}</h5>
              </div>
              <div className="mb-4">
                <h2 className="title text-white fw-bold">Pages</h2>
                <h5 className="fw-light text-white">{literature?.pages}</h5>
              </div>
              <div className="mb-4">
                <h2 className="title text-white fw-bold ">ISBN</h2>
                <h5 className="fw-light text-white">{literature?.isbn}</h5>
              </div>
              <div className="mb-4">
                <a className="btn btn-danger fw-bold w-50 text-white" href={literature?.file}>
                  Read Literature <BsFileEarmarkPdf />
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-md-2 col-12 order-lg-3 order-2 mb-3">
              {collections?.length == 0 ? (
                <button
                  className="btn btn-danger w-100 text-white fw-bold"
                  onClick={() => {
                    handleCollection(literature?.id);
                    getCollections(literature?.id);
                  }}
                >
                  Add To Collection <BsBookmark />
                </button>
              ) : (
                <button className="btn btn-danger w-100 text-white fw-bold" onClick={() => handleDelete(collections[0]?.id)}>
                  Delete Collection <BsBookmarkFill />
                </button>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Detail;
