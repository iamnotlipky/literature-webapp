import * as React from "react";
import { Container } from "react-bootstrap";
import Navigation from "../components/Navigation";
import { API } from "../config/API";
import { UserContext } from "../context/userContext";
import { useQuery } from "react-query";
import approveImg from "../assets/img/approve.png";
import cancelImg from "../assets/img/cancel.png";

const Owner = () => {
  const [state, dispatch] = React.useContext(UserContext);
  const [idLiterature, setIdLiterature] = React.useState();

  let { data: literatures, refetch } = useQuery("verificationliteratureCache", async () => {
    const response = await API.get("/literatures");
    return response.data.data;
  });

  const [form] = React.useState({
    status: "cancel",
  });

  const [formProgress] = React.useState({
    status: "approve",
  });

  const handleSubmitCancel = async (literature_id) => {
    try {
      const formData = new FormData();
      formData.set("status", form.status);

      const response = await API.patch(`/literature/${literature_id}`, formData);

      refetch();
      setIdLiterature("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitApprove = async (literature_id) => {
    try {
      const formData = new FormData();
      formData.set("status", formProgress.status);

      const response = await API.patch(`/literature/${literature_id}`, formData);
      console.log(response);

      refetch();
      setIdLiterature("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navigation />
      <section className="bg-whiter margin-top vh-100">
        <Container>
          <h2 className="fw-bold title my-3">Literatures Verification</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">User or Author</th>
                <th scope="col">ISBN</th>
                <th scope="col">Literature</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {literatures?.map((item) => (
                <tr key={item?.id}>
                  <th scope="row">{item?.id}</th>
                  <td>{item?.author}</td>
                  <td>{item?.isbn}</td>
                  <td>{item?.title}</td>
                  <td>
                    {item.status === "pending" ? (
                      <span className="text-warning">Waiting to be verifed</span>
                    ) : item.status === "cancel" ? (
                      <span className="text-danger">Cancel</span>
                    ) : item.status === "approve" ? (
                      <span className="text-success">Approve </span>
                    ) : (
                      <span> </span>
                    )}
                  </td>
                  <td>
                    {item.status === "pending" ? (
                      <span>
                        <div>
                          <button
                            className="btn btn-danger text-white fw-bold w-30 py-1 px-2 me-3"
                            onClick={(e) => {
                              setIdLiterature(item?.id);
                              handleSubmitCancel(item?.id);
                            }}
                          >
                            Cancel
                          </button>

                          <button
                            className="btn btn-success text-white fw-bold w-30 py-1 px-2"
                            onClick={(e) => {
                              setIdLiterature(item?.id);
                              handleSubmitApprove(item?.id);
                            }}
                          >
                            Approv
                          </button>
                        </div>
                      </span>
                    ) : item.status === "cancel" ? (
                      <span>
                        <img src={cancelImg} alt="approve-img" />
                      </span>
                    ) : item.status === "approve" ? (
                      <span>
                        <img src={approveImg} alt="cancel-img" />
                      </span>
                    ) : (
                      <span></span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Container>
      </section>
    </>
  );
};

export default Owner;
