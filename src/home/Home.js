import React, { useState } from "react";
import Select from "react-select";
import './Home.css'
import CreateModal from "../modal/CreateModal";
import UpdateModal from "../modal/UpdateModal";
import ViewModal from "../modal/ViewModal";

const logo = 'process.env.PUBLIC_URL + "/images/Logo.png"'; //Subir las imagenes y cambiar la url
const product = 'process.env.PUBLIC_URL + "/images/products.png"';
const category = 'process.env.PUBLIC_URL + "/images/categoria.png"';

function Home() {

const [modalCreateIsOpen, setModalCreateIsOpen] = useState(false);
const [modalUpdateIsOpen, setModalUpdateIsOpen] = useState(false);
const [modalViewIsOpen, setModalViewIsOpen] = useState(false);
const [formType, setFormType] = useState(null);

const options = [
    { value: 'create', label: 'Crear' },
    { value: 'update', label: 'Actualizar' },
    { value: 'view', label: 'Ver' },
];

const customStyles = {
    //Estilos para el contenedor del dropdown
    control: base => ({
        ...base,
        width: '200px', //Ancho del dropdown
        borderRadius: '5px',
        backgroundColor: '#f1f1f1',
        border: '1px solid #ccc'
    }),
    //Estilos para las opciones 
    option: (provider, state) => ({
        ...provider,
        backgroundColor: state.isSelected ? '#ddd' : 'white',
        color: '#333',
        padding: '10px'
    }),
    //Estilos para el menú
    menu: base => ({
        ...base,
        border: '1px solid #ccc',
        borderRadius: '5px',
        boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)'
    })
};

const handleSelectChange = (selectedOption, formType) => {
    if (selectedOption.value === 'create' || selectedOption.value === 'update' || selectedOption.value === 'view') {
        setFormType(formType);
        setModalCreateIsOpen(true);
    }
};

return (
    <div className="container">

        <div className="center">
            <img src={logo} alt="Logo" />
        </div>

        <div className="side-images">

            <div className="left">
                <img src={product} alt="Product Image" className="img-product" />
                <div className="fixed-width-dropdown">
                    <Select
                        options={options}
                        placeholder="Producto"
                        styles={customStyles}
                        onChange={(selectedOption) => handleSelectChange(selectedOption, 'product')} />

                </div>

            </div>

            <div className="right">
                <img src={category} alt="Category Image" className="img-category" />
                <div className="fixed-width-dropdown">
                    <Select
                        options={options}
                        placeholder="Categoría"
                        styles={customStyles}
                        onChange={(selectedOption) => handleSelectChange(selectedOption, 'category')} />

                </div>

            </div>

        </div>

        <CreateModal
            isOpen={modalCreateIsOpen}
            onClose={() => setModalCreateIsOpen(false)}
            formType={formType}
        />

        <UpdateModal
            isOpen={modalUpdateIsOpen}
            onClose={() => setModalUpdateIsOpen(false)}
            formType={formType}
        />

        <ViewModal 
         isOpen={modalViewIsOpen}
         onClose={() => setModalViewIsOpen(false)}
         formType={formType}
        />


    </div>
)
};

export default Home;