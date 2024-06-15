import React, { useState, useEffect } from "react";
import Select from "react-select";
import './Modal.css';

const UpdateModal = ({ isOpen, onClose, formType }) => {

    const [productData, setProductData] = useState({
        productId: '',
        name: '',
        unitPrice: '',
        stock: '',
        categoryId: ''
    });

    const [categoryData, setCategoryData] = useState({
        categoryId: '',
        name: '',
        description: '',
    });

    const [categories, setCategories] = useState([]);
    const [items, setItems] = useState([]); //Opciones para el Select ya sea para producto o categoria

    /*
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('');
                const data = await response.json();

               //Crear opciones para el Select ya sea de productos o categorías
               const productOptions = data.productos.map(product => ({
                value: product.ProductoId,
                label: product.ProductoNombre
               }));

               const categoriesOptions = data.categorias.map(category => ({
                value: category.CategoriaId,
                label: category.NombreCategoria
               }));

               setItems(formType === 'product' ? productOptions : categoriesOptions)

            } catch (error) {
                console.log('Error al obtener los datos', error)
            }
        };

        if (isOpen) {
            fetchData()
        }
    }, [isOpen, formType])
*/
    const handleItemChange = async (seletecOption) => {
        const selectedItemType = seletecOption ? seletecOption.type : '';
        const selectedItemId = seletecOption ? seletecOption.value : '';

        try {
            //Lógica para obtener los datos del elemento seleccionado
            const response = await fetch('');
            const data = await response.json();

            if (selectedItemType === 'product') {
                setProductData({
                    productId: data.ProductoId,
                    name: data.ProductoNombre,
                    unitPrice: data.PrecioUnitario,
                    stock: data.EnStock,
                    categoryId: data.CategoriaId

                });
            } else if (selectedItemType === 'category') {
                setCategoryData({
                    categoryId: data.CategoriaId,
                    name: data.NombreCategoria,
                    description: data.Detalle,
                })
            }
        } catch (error) {
            console.log('Error al obtener los datos del elemento seleccionado', error)
        }

    }
    /*
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('');
                const data = await response.json();
                setCategories(data.map(category => ({
                    value: category.categoriaId,
                    label: category.categoriaNombre,
                })));
            } catch (error) {
                console.error("Error al obtener categorías", error);
            }
        };

        if (isOpen) {
            fetchCategories();
        }
    }), [isOpen]
*/
    if (!isOpen) return null;

    const handleInputChange = (e, setData, data) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        });
    };

    //Validación para números enteros
    const handelNumericInputChange = (e, setData, data) => {
        const { name, value } = e.target;
        if (/^\d*$/.test(value)) {
            setData({
                ...data,
                [name]: value
            });
        }
    };

    //Validación para números decimales
    const handleDecimalInputChange = (e, setData, data) => {
        const { name, value } = e.target;
        if (/^\d*\.?\d*$/.test(value)) {
            setData({
                ...data,
                [name]: value
            });
        }
    };

    const handleCategoryChange = (seletecOption) => {
        setProductData({
            ...productData,
            categoryId: seletecOption ? seletecOption.value : ''
        });
    };

    const renderFormFields = () => {
        if (formType === 'product') {
            return (
                <>
                    <label>ID del Producto</label>
                    <input
                        type="number"
                        name="productId"
                        value={productData.productId}
                        onChange={(e) => handelNumericInputChange(e, setProductData, productData)}
                    />

                    <label>Nombre Producto</label>
                    <input
                        type="text"
                        name="name"
                        value={productData.name}
                        onChange={(e) => handleInputChange(e, setProductData, productData)}
                    />

                    <label>Precio Unitario</label>
                    <input
                        type="number"
                        step="0.01"
                        name="unitPrice"
                        value={productData.unitPrice}
                        onChange={(e) => handleDecimalInputChange(e, setProductData, productData)}
                    />

                    <label>Stock</label>
                    <input
                        type="number"
                        name="stock"
                        value={productData.stock}
                        onChange={(e) => handelNumericInputChange(e, setProductData, productData)}
                    />

                    <label>ID Categoría</label>
                    <Select
                        options={categories}
                        value={categories.find(cat => cat.value === productData.categoryId)}

                        placeholder="Seleccione una Categoría"
                    />

                </>
            )
        } else if (formType === 'category') {
            return (
                <>
                    <label>ID de Categoría</label>
                    <input
                        type="number"
                        name="categoryId"
                        value={categoryData.categoryId}
                        onChange={(e) => handelNumericInputChange(e, setCategoryData, categoryData)}
                    />

                    <label>Nombre Categoría</label>
                    <input
                        type="text"
                        name="name"
                        value={categoryData.name}
                        onChange={(e) => handleInputChange(e, setCategoryData, categoryData)}
                    />

                    <label>Descripción</label>
                    <input
                        type="text"
                        name="description"
                        value={categoryData.description}
                        onChange={(e) => handleInputChange(e, setCategoryData, categoryData)}
                    />
                </>
            )
        } else {
            return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = formType === 'product' ? 'api/producto' : 'api/categoria';

        const dataToSend = formType === 'product' ? {
            ProductoId: productData.productId,
            ProductoNombre: productData.name,
            PrecioUnitario: productData.unitPrice,
            EnStock: productData.stock,
            CategoriaId: productData.categoryId,
        } : {
            CategoriaId: categoryData.categoryId,
            NombreCategoria: categoryData.name,
            Detalle: categoryData.description
        }

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'aplication/json'
                },
                body: JSON.stringify(dataToSend)
            });

            if (response.ok) {
                alert('Guardado exitosamente');
                onClose();
            } else {
                alert('Error al guardar');
            }
        } catch (error) {
            alert('Error');
            console.log('Error al guardar', error);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{formType === 'product' ? 'Actualizar Producto' : 'Actualizar Categoría'}</h2>
                <Select
                    options={formType === 'product' ? items.filter(item => item.type === 'product') : items.filter(item => item.type === 'category')}
                    onChange={handleItemChange}
                    placeholder="Seleccione"
                />
                <form>
                    {renderFormFields()}
                    <button type="button" onClick={onClose}>Cerrar</button>
                    <button type="button" onClick={handleSubmit}>Actualizar</button>
                </form>

            </div>

        </div>
    )

};

export default UpdateModal;