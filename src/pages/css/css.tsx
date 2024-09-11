import React, { useState, useEffect, useRef } from "react";
import { Button, Input, Drawer, Form, message } from "antd";
import { FaPlus } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import axios from "axios";
import "highlight.js/styles/github.css";
import "../../App.css";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript"; // Kod tili tanlang
import "codemirror/theme/material.css"; // Temani tanlang

interface SubmittedData {
  id: number;
  name?: string;
  description?: string;
  imgUrl?: string;
  chooseFile?: string;
  kod?: string;
  eslatma?: string;
  eslatmaFayl?: string;
}

function CssPage() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imgUrl: "",
    eslatma: "",
    chooseFile: null as File | null,
    eslatmaFayl: "",
    kod: "",
  });

  const [filteredData, setFilteredData] = useState<SubmittedData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState(false);
  const dataContainerRef = useRef<HTMLDivElement>(null);

  const showDrawer = () => {
    setOpenDrawer(true);
  };

  const onClose = () => {
    setOpenDrawer(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prevData) => ({ ...prevData, chooseFile: file }));
  };

  const fetchData = async (query: string = "") => {
    setLoading(true);
    try {
      const response = await axios.get<SubmittedData[]>(
        "https://c0adcbfd27d5ecc2.mokky.dev/css"
      );
      const data = response.data;
      const filtered = data.filter(
        (item) =>
          item.name?.toLowerCase().includes(query.toLowerCase()) ||
          item.description?.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
      setNoData(filtered.length === 0);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    if (dataContainerRef.current) {
      dataContainerRef.current.scrollTop =
        dataContainerRef.current.scrollHeight;
    }
  }, [filteredData]);

  const handleSubmit = async () => {
    try {
      const formDataWithFileUrl = {
        ...formData,
        chooseFile: formData.chooseFile
          ? URL.createObjectURL(formData.chooseFile)
          : "",
      };

      const response = await axios.post<SubmittedData>(
        "https://c0adcbfd27d5ecc2.mokky.dev/css",
        formDataWithFileUrl
      );

      setFilteredData((prevData) => [...prevData, response.data]);

      setOpenDrawer(false);
      setFormData({
        name: "",
        description: "",
        imgUrl: "",
        eslatma: "",
        chooseFile: null,
        eslatmaFayl: "",
        kod: "",
      });
      message.success("Ma'lumot muvaffaqiyatli qo'shildi!");
    } catch (error) {
      console.error("Error submitting data:", error);
      message.error("Ma'lumot qo'shishda xatolik yuz berdi.");
    }
  };

  return (
    <div>
      <div
        style={{
          width: "100%",
          height: "60px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            padding: "10px",
            paddingLeft: "50px",
            width: "270px",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Button
            style={{
              borderRadius: "50%",
              backgroundColor: "#20D472",
              color: "white",
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            icon={<FaPlus style={{ fontSize: "24px" }} />}
            onClick={showDrawer}
          />
          <h2 style={{ fontWeight: "bold", margin: 0 }}>Ma'lumot qo'shish</h2>
        </div>

        <div
          style={{
            padding: "10px",
            width: "270px",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
            marginLeft: "200px",
          }}
        >
          <Input
            style={{
              borderRadius: "24px",
              width: "300px",
              height: "44px",
              backgroundColor: "#EDEFF3",
              border: "none",
              paddingLeft: "20px",
              paddingRight: "20px",
              fontSize: "16px",
              outline: "none",
            }}
            placeholder="Qidirish"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <IoMdSearch
            style={{
              position: "absolute",
              top: "50%",
              right: "20px",
              transform: "translateY(-50%)",
              cursor: "pointer",
              fontSize: "22px",
              color: "#8D9BA8",
            }}
          />
        </div>
      </div>

      <div
        style={{
          width: "100%",
          height: "80vh",
          overflowY: "auto",
          padding: "20px",
        }}
        className="data-container"
        ref={dataContainerRef}
      >
        {loading ? (
          <p>Yuklanmoqda...</p>
        ) : noData ? (
          <div style={{ textAlign: "center" }}>
            <img
              src="https://example.com/no-data.gif" // Ma'lumot topilmasa GIF URL
              alt="No Data"
              style={{ width: "100px", height: "100px" }}
            />
            <p>Ma'lumot topilmadi</p>
            <Button type="primary" onClick={showDrawer}>
              Qo'shish
            </Button>
          </div>
        ) : (
          filteredData.map((item) => (
            <div className="data-item" key={item.id}>
              <h3 className="data-name ">
                <span className="spands">Nomi : </span>
                {item.name}
              </h3>
              <p className="data-description">
                <span className="spands">Malumot : </span>
                {item.description}
              </p>

              <div
                style={{
                  border: "1px solid white",
                  borderRadius: "10px",
                  padding: "4px",
                  marginBottom: "20px",
                }}
              >
                {item.imgUrl && (
                  <img src={item.imgUrl} alt="Rasm" className="data-image" />
                )}
                {item.eslatma && (
                  <p className="data-eslatma">
                    <span className="spands">Eslatma : </span>
                    {item.eslatma}
                  </p>
                )}
              </div>
              {item.chooseFile && (
                <img
                  src={item.chooseFile}
                  alt="Choose file"
                  className="data-file-image"
                />
              )}
              {item.eslatmaFayl && (
                <p className="data-eslatmaFayl">
                  <span className="spands">Eslatma Fayl : </span>
                  {item.eslatmaFayl}
                </p>
              )}
              {item.kod && (
                <div className="data-code-container">
                  <pre className="data-code">{item.kod}</pre>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <Drawer
        title="Ma'lumot qo'shish"
        placement="right"
        width={600}
        onClose={onClose}
        open={openDrawer}
        extra={
          <Button type="primary" onClick={onClose}>
            Yopish
          </Button>
        }
      >
        <Form layout="vertical">
          <Form.Item label="Name">
            <Input
              name="name"
              placeholder="Nomi"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item label="Description">
            <Input.TextArea
              name="description"
              rows={4}
              placeholder="Tavsif"
              value={formData.description}
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item label="Image URL">
            <Input
              name="imgUrl"
              placeholder="Rasm URL"
              value={formData.imgUrl}
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item label="Eslatma">
            <Input
              name="eslatma"
              placeholder="Eslatma"
              value={formData.eslatma}
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item label="Choose File">
            <Input type="file" onChange={handleFileChange} />
          </Form.Item>

          <Form.Item label="Eslatma Fayl">
            <Input
              name="eslatmaFayl"
              placeholder="Eslatma Fayl"
              value={formData.eslatmaFayl}
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item label="Code">
            <CodeMirror
              value={formData.kod}
              options={{
                mode: "javascript", // Kod tili tanlang
                theme: "material", // Temani tanlang
                lineNumbers: true,
              }}
              onBeforeChange={(editor, data, value) => {
                setFormData((prevData) => ({ ...prevData, kod: value }));
              }}
            />
          </Form.Item>

          <Button type="primary" onClick={handleSubmit}>
            Qo'shish
          </Button>
        </Form>
      </Drawer>
    </div>
  );
}

export default CssPage;
