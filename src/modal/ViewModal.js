import React, { useState, useEffect } from "react";
import './Modal.css';

const ViewModal = ({ isOpen, onClose, formType }) => {

   const [items, setItems] = useState([]);

    if (!isOpen) return null;
/*
    useEffect(() => {
        const fetchData = async () => {
            let url = '';
            if (formType === 'product') {
                url = 'api/obtener/product'
            } else if (formType === 'category') {
                url = 'api/obteber/categorias'
            }

            try {
                const response = await fetch(url);
                const data = await response.json();
                setItems(data);
            } catch (error) {
                console.log("Error al obtener los datos", error)
            }
        };

        if (isOpen) {
            fetchData();
        }
    }, [isOpen, formType])
*/
    const handleDelete = async (id) => {
        let url = '';
        if (formType === 'product') {
            url = 'api/eliminar/product'
        } else if (formType === 'category') {
            url = 'api/eliniar/categorias'
        }

        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                alert('Eliminado exitosamente');
                //Actualizar la lista de elementos
                const updateItems = items.filter(item => item.id !== id);
                setItems(updateItems);
            } else {
                alert('Error al eliminar')
            }
        } catch (error) {
            alert('Error al eliminar');
            console.log('Error al eliminar', error);
        }
    }

    const renderTable = () => {
        if (formType === 'product') {
            return (
                <table>
                    <thead>
                        <tr>
                            <th>ID Producto</th>
                            <th>Nombre</th>
                            <th>Precio Unitario</th>
                            <th>Stock</th>
                            <th>Categoria</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(product => (
                            <tr key={product.ProductId}>
                                <td>{product.NombreProducto}</td>
                                <td>{product.PrecioUnitario}</td>
                                <td>{product.EnStock}</td>
                                <td>{product.CategoriaId}</td>
                                <td>
                                    <button onClick={() => handleDelete(product.ProductId)} >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        } else if (formType === 'category') {
            return (
                <table>
                    <thead>
                        <tr>
                            <th>ID Categoria</th>
                            <th>Nombre</th>
                            <th>Detalle</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(category => (
                            <tr key={category.CategoriaId}>
                                <td>{category.CategoriaId}</td>
                                <td>{category.NombreCategoria}</td>
                                <td>{category.Detalle}</td>
                                <td>
                                    <button onClick={() => handleDelete(category.CategoriaId)} >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        } else {
            return null;
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{formType === 'product' ? 'Lista de Productos' : 'Lista de Categorías'}</h2>
                <form>
                    {renderTable()}
                    <button type="button" onClick={onClose}>Cerrar</button>
                </form>

            </div>

        </div>
    )

};

export default ViewModal;