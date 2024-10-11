import React, { useState, useEffect, useRef } from "react";
import { Button, Input, Drawer, Form, message } from "antd";
import { FaPlus } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import axios from "axios";
import MonacoEditor from "@monaco-editor/react"; // Monaco Editor import
import "../../App.css";
import remove from "../remove.png";

interface SubmittedData {
  id: number;
  name?: string;
  description?: string;
  imgUrl?: string;
  kod?: string;
  eslatma?: string;
  eslatmaFayl?: string;
}

function All() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imgUrl: "",
    eslatma: "",
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

  const fetchData = async (query: string = "") => {
    setLoading(true);
    try {
      const response = await axios.get<SubmittedData[]>(
        "https://c0adcbfd27d5ecc2.mokky.dev/bootstrap"
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

  const formatDescription = (description?: string) => {
    if (typeof description !== "string") return "No description available"; // Agar description string bo'lmasa

    const regex = /\*(.*?)\*/g; // Yulduzchalar orasidagi matnni qidirish
    const parts = description.split(regex); // Matnni qismlarga bo'lish

    return parts.map((part, index) => {
      if (index % 2 === 1) {
        // Agar indeks juft bo'lmasa, bu qism yulduzchalar orasida
        return (
          <span
            key={index}
            style={{
              marginLeft: "5px",
              marginRight: "5px",
              backgroundColor: "black",
              borderRadius: "5px",
              color: "red",
              padding: "4px",
            }}
          >
            {part}
          </span>
        );
      }
      return part; // Oddiy matnni qaytarish
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post<SubmittedData>(
        "https://c0adcbfd27d5ecc2.mokky.dev/bootstrap",
        formData
      );

      setFilteredData((prevData) => [...prevData, response.data]);

      setOpenDrawer(false);
      setFormData({
        name: "",
        description: "",
        imgUrl: "",
        eslatma: "",
        kod: "",
      });
      message.success("Ma'lumot muvaffaqiyatli qo'shildi!");
    } catch (error) {
      console.error("Error submitting data:", error);
      message.error("Ma'lumot qo'shishda xatolik yuz berdi.");
    }
  };

  return (
    <div style={{ backgroundColor: "#0e1212", color: "white" }}>
      <div
        style={{
          width: "100%",
          height: "60px",
          display: "flex",
          alignItems: "center",
          color: "#fff",
          backgroundColor: "rgb(0, 57, 63)",
          paddingBottom: "20px",
          paddingTop: "10px",
        }}
      >
        <div
          style={{
            padding: "10px",
            paddingLeft: "50px",
            gap: "10px",
            width: "300px",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Button
            className="add-button"
            icon={<FaPlus style={{ fontSize: "20px" }} />}
            onClick={showDrawer}
          />
          <h2 style={{ fontWeight: "bold", margin: 0 }}>Ma'lumot qo'shish</h2>
        </div>

        <div
          style={{
            padding: "10px",
            width: "670px",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
            marginLeft: "250px",
          }}
        >
          <Input
            style={{
              borderRadius: "24px",
              width: "500px",
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
              right: "180px",
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
          height: "83.2vh",
          overflowY: "auto",
          padding: "20px",
          marginTop: "10px",
        }}
        className="data-container"
        ref={dataContainerRef}
      >
        {loading ? (
          <p>Yuklanmoqda...</p>
        ) : noData ? (
          <div style={{ textAlign: "center" }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img src={remove} alt="" />
            </div>
            <Button
              className="premium-button"
              type="primary"
              onClick={showDrawer}
            >
              Qo'shish
            </Button>
          </div>
        ) : (
          filteredData.map((item) => (
            <div className="data-item" key={item.id}>
              <h3 className="data-name">
                <span className="spands">Nomi : </span>
                {item.name}
              </h3>
              <p className="data-description">
                <span className="spands">Malumot : </span>
                {formatDescription(item.description)}
              </p>

              <div
                style={{
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
              {item.eslatmaFayl && (
                <p className="data-eslatmaFayl">
                  <span className="spands">Eslatma Fayl : </span>
                  {item.eslatmaFayl}
                </p>
              )}
              {item.kod && (
                <div className="data-code-container">
                  <MonacoEditor
                    height="200px"
                    language="javascript"
                    value={item.kod}
                    options={{ theme: "vs-dark", minimap: { enabled: false } }}
                    onChange={(value) => {}}
                  />
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
          <Button type="primary" onClick={handleSubmit}>
            Codni qo'shish
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
            <Input.TextArea
              name="eslatma"
              rows={4}
              placeholder="Eslatma"
              value={formData.eslatma}
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item label="Kod">
            <MonacoEditor
              height="200px"
              language="javascript"
              value={formData.kod}
              onChange={(value) =>
                setFormData((prevData) => ({ ...prevData, kod: value || "" }))
              }
              options={{ theme: "vs-dark", minimap: { enabled: false } }}
            />
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
}

export default All;
