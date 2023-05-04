import React, { useState } from "react";
import "./Home.css";
import List from "../List/List";
import { uid } from "uid";

const Home = () => {
  //membuat json
  const [contact, setContact] = useState([
    {
      id: 1,
      name: "John Doe",
      telp: "08123456789",
    },
    {
      id: 2,
      name: "Jane Doe",
      telp: "08123456729",
    },
  ]);

  //membuat state untuk mengupdate data
  const [isUpdate, setIsUpdate] = useState({
    id: null,
    status: false,
  });

  //memanipulasi form
  const [formData, setFormData] = useState({
    name: "",
    telp: "",
  });

  //membuat function untuk menghandle form jika berubah
  function handleChange(e) {
    let data = { ...formData }; //clone data yang ada pada form
    data[e.target.name] = e.target.value; //input yang berisi nama dan telp akan diganti dengan value yang baru
    setFormData(data); // mengubah value form
  }

  function handleSubmit(e) {
    e.preventDefault(); // agar tidak reload fungsi ini
    let data = [...contact]; //clone data yang ada pada state contact

    //validasi jika form kosong
    if (formData.name === "" || formData.telp === "") {
      alert("Please fill in the form");
      return false;
    }

    if (isUpdate.status) {
      //jika status update true
      data.forEach((contact) => {
        // looping data di state contact
        if (contact.id === isUpdate.id) {
          // jika id contact sama dengan id yang diupdate
          contact.name = formData.name; // maka nama contact akan diganti dengan nama yang baru
          contact.telp = formData.telp; // dan telp contact akan diganti dengan telp yang baru
        }
      });
    } else {
      data.push({ id: uid(), name: formData.name, telp: formData.telp }); // mengubah data ke array
    }
    setIsUpdate({ id: null, status: false }); // mengubah status update menjadi false
    setContact(data); // menambah data yang diubah ke array ke state contact
    setFormData({ name: "", telp: "" }); // mengubah value form menjadi kosong

    alert("Data berhasil ditambahkan");
  }

  function handleEdit(id) {
    let data = [...contact]; // clone data yang ada pada state contact
    let foundData = data.find((contact) => contact.id === id); // mencari data yang akan diupdate
    setFormData({ name: foundData.name, telp: foundData.telp }); // mengubah value form dengan data yang ditemukan
    setIsUpdate({ id: id, status: true }); // mengubah status update menjadi true
  }

  function handleDelete(id) {
    let data = [...contact]; // clone data yang ada pada state contact
    let filteredData = data.filter((contact) => contact.id !== id); // menghapus data yang akan dihapus
    setContact(filteredData);
  }

  return (
    <div className="container-fluid p-0">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#FF8787"
          fill-opacity="1"
          d="M0,128L11.4,128C22.9,128,46,128,69,144C91.4,160,114,192,137,202.7C160,213,183,203,206,170.7C228.6,139,251,85,274,106.7C297.1,128,320,224,343,234.7C365.7,245,389,171,411,154.7C434.3,139,457,181,480,213.3C502.9,245,526,267,549,240C571.4,213,594,139,617,90.7C640,43,663,21,686,42.7C708.6,64,731,128,754,170.7C777.1,213,800,235,823,208C845.7,181,869,107,891,80C914.3,53,937,75,960,90.7C982.9,107,1006,117,1029,144C1051.4,171,1074,213,1097,218.7C1120,224,1143,192,1166,186.7C1188.6,181,1211,203,1234,224C1257.1,245,1280,267,1303,234.7C1325.7,203,1349,117,1371,122.7C1394.3,128,1417,224,1429,272L1440,320L1440,0L1428.6,0C1417.1,0,1394,0,1371,0C1348.6,0,1326,0,1303,0C1280,0,1257,0,1234,0C1211.4,0,1189,0,1166,0C1142.9,0,1120,0,1097,0C1074.3,0,1051,0,1029,0C1005.7,0,983,0,960,0C937.1,0,914,0,891,0C868.6,0,846,0,823,0C800,0,777,0,754,0C731.4,0,709,0,686,0C662.9,0,640,0,617,0C594.3,0,571,0,549,0C525.7,0,503,0,480,0C457.1,0,434,0,411,0C388.6,0,366,0,343,0C320,0,297,0,274,0C251.4,0,229,0,206,0C182.9,0,160,0,137,0C114.3,0,91,0,69,0C45.7,0,23,0,11,0L0,0Z"
        ></path>
      </svg>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-6">
            <form onSubmit={handleSubmit}>
              <div class="mb-3">
                <h6 className="text-start">Nama</h6>
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={formData.name}
                  onChange={handleChange}
                  name="name"
                />
              </div>
              <div class="mb-3">
                <h6 className="text-start">No Telp</h6>
                <input
                  type="passwordtext"
                  class="form-control"
                  id="exampleInputPassword1"
                  value={formData.telp}
                  onChange={handleChange}
                  name="telp"
                />
              </div>
              <div className="d-flex justify-content-end">
                <button type="submit" class="btn btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-6">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nama</th>
                  <th scope="col">No Telephone</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <List
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                  data={contact}
                />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
