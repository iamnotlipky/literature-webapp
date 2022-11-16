import * as React from "react";
import { Alert, Container } from "react-bootstrap";
import Navigation from "../components/Navigation";
import { useMutation } from "react-query";
import { API } from "../config/API";
import { UserContext } from "../context/userContext";

const AddCollection = () => {
  const [message, setMessage] = React.useState(null);
  const [state, dispatch] = React.useContext(UserContext);

  const [form, setForm] = React.useState({
    title: "",
    publication_date: "",
    pages: "",
    isbn: "",
    author: "",
    file: "",
  });

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
    });
  };

  const handleOnSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.set("title", form.title);
      formData.set("publication_date", form.publication_date);
      formData.set("pages", form.pages);
      formData.set("isbn", form.isbn);
      formData.set("author", form.author);
      formData.set("file", form.file[0], form.file[0].name);

      const data = await API.post("/literature", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const alert = (
        <Alert variant="success" className="py-2">
          Add Literature Success!
        </Alert>
      );
      setMessage(alert);
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-2">
          Add Literature Failed!
        </Alert>
      );
      setMessage(alert);
    }
  });

  return (
    <>
      <Navigation />
      <section className="bg-page margin-top">
        <Container>
          <h2 className="text-white fw-bold my-3 title">Add Literature</h2>
          {message && message}
          <form onSubmit={(e) => handleOnSubmit.mutate(e)}>
            <div className="mb-3">
              <input type="text" className="form-control form-me" placeholder="Title" value={form.title} name="title" onChange={handleOnChange} />
            </div>
            <div className="mb-3">
              <input type="date" className="form-control form-me" placeholder="Publication Date" value={form.publication_date} name="publication_date" onChange={handleOnChange} />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control form-me" placeholder="Pages" value={form.pages} name="pages" onChange={handleOnChange} />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control form-me" placeholder="ISBN" value={form.isbn} name="isbn" onChange={handleOnChange} />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control form-me" placeholder="Author" value={form.author} name="author" onChange={handleOnChange} />
            </div>
            <div className="input-group mb-3 w-50">
              <input type="file" className="form-control form-me" name="file" onChange={handleOnChange} />
            </div>
            <button type="submit" className="btn btn-danger w-25 text-white fw-bold float-end">
              Add Literature
            </button>
          </form>
        </Container>
      </section>
    </>
  );
};

export default AddCollection;
