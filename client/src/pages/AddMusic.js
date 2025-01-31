import React, { useState } from "react";
import { Container, Alert, Form, Row, Col, Button } from "react-bootstrap";

// import components
import NavbarAdmin from "../components/NavbarAdmin";

export default function AddMusic() {
  const [artis, setArtis] = useState([]);
  const [messageShowFailed, setMessageShowFailed] = useState("");
  const [messageNotif, setMessageNotif] = useState("");
  const [preview, setPreview] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    year: "",
    thumbnail: "",
    attache: "",
    artistId: "",
  });

  const { title, year, thumbnail, attache, artistId } = formData;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.name === "thumbnail") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  // loadDatasArtis
  // const loadArtis = async () => {
  //   try {
  //     const respons = await API.get("/artists");
  //     setArtis(respons.data.viewDatas);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   loadArtis();
  // }, []);
  // EndLoadDatasArtis

  // SaveDataToDatabase
  const handleOnSubmit = async (e) => {
    try {
      e.preventDefault();

      // const config = {
      //   headers: {
      //     "Content-type": "multipart/form-data",
      //   },
      // };

      // const formData = new FormData();
      // formData.set("title", data.title);
      // formData.set("year", data.year);
      // formData.set("attache", data.attache);
      // formData.set("artistId", data.artistId);
      // formData.set("imageFile", data.thumbnail[0], data.thumbnail[0].name);

      // // console.log("setNewData", formData);

      // const response = await API.post("/addmusicwithfile", formData, config); //-->this is sintact to inset to database

      // console.log("DataSaved: ", response);

      // if (response.data.status === "Validate Failed") {
      //   setMessageShowFailed(response.data.message);
      //   setMessageNotif("");
      // } else if (response.data.status === "Response Failed") {
      //   setMessageShowFailed(response.data.message);
      //   setMessageNotif("");
      // } else {
      //   setData({
      //     title: "",
      //     year: "",
      //     thumbnail: "",
      //     attache: "",
      //     artistId: "",
      //   });
      //   setMessageShowFailed("");
      //   setMessageNotif("Add Data Success!");
      // }
    } catch (error) {
      console.log("ErrorTryCath", error);
    }
  };
  // EndSaveDataToDatabase

  return (
    <div>
      <NavbarAdmin />
      <Container style={{ marginTop: "100px" }}>
        <h3 style={{ color: "#b8b8b8", marginBottom: "30px" }}>Add Music</h3>
        {messageShowFailed && (
          <Alert variant="danger">{messageShowFailed}</Alert>
        )}
        {messageNotif && <Alert variant="success">{messageNotif}</Alert>}
        <Form onSubmit={handleOnSubmit}>
          <Row>
            <Col sm={9}>
              <Form.Control
                onChange={handleInputChange}
                name="title"
                type="text"
                placeholder="Title"
                required
                className="input1"
                style={{
                  padding: "0 0 0 10px",
                  margin: "0 0 15px 0",
                }}
              />
            </Col>
            <Col sm={3}>
              <Form.Control
                onChange={handleInputChange}
                name="thumbnail"
                type="file"
                title="Thumbnail"
                style={{
                  border: "1px solid #fff",
                  borderRadius: "3px",
                  color: "#fff",
                  paddingTop: "3px",
                  paddingBottom: "3px",
                  cursor: "pointer",
                  width: "250px",
                }}
              />
            </Col>
          </Row>
          <Form.Control
            onChange={handleInputChange}
            name="year"
            type="number"
            placeholder="Year"
            required
            style={{ margin: "0 0 15px 0" }}
            className="input1"
          />
          <select
            onChange={handleInputChange}
            name="artistId"
            style={{
              width: "100%",
              height: "38px",
              borderRadius: "5px",
            }}
          >
            <option>--Select Singer--</option>
            {artis?.map((dataArtis, index) => (
              <option value={dataArtis.id}>
                {dataArtis.id} - {dataArtis.name}
              </option>
            ))}
          </select>
          <Row
            style={{
              marginTop: "20px",
            }}
          >
            {/* <Col sm={3}>
              <Button
                type="file"
                className="btn-register2"
                style={{
                  width: "100%",
                  background: "#4b4b4b",
                  borderColor: "#4b4b4b",
                }}
              >
                Attache
              </Button>
            </Col> */}
            <Col sm={3}>
              <Form.Control
                onChange={handleInputChange}
                name="attache"
                type="file"
                title="Attache"
                style={{
                  border: "1px solid #fff",
                  borderRadius: "3px",
                  color: "#fff",
                  cursor: "pointer",
                  width: "100%",
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <center>
                <Button
                  type="submit"
                  className="btn-register2"
                  style={{
                    width: "300px",
                    margin: "20px 0 0 0",
                    background: "#F58033",
                    borderColor: "#F58033",
                  }}
                >
                  Add Song
                </Button>
              </center>
            </Col>
          </Row>
          <Row>
            <Col sm={9}></Col>
            <Col sm={3}>
              {preview !== "" && (
                <img
                  src={preview}
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "cover",
                    paddingLeft: "15px",
                    paddingRight: "15px",
                    marginBottom: "15px",
                  }}
                />
              )}
            </Col>
          </Row>
        </Form>
        {/* <pre style={{ color: "#fff" }}>{JSON.stringify(formData, null, 3)}</pre>
        <pre style={{ color: "#fff" }}>{JSON.stringify(artis, null, 3)}</pre> */}
      </Container>
    </div>
  );
}
