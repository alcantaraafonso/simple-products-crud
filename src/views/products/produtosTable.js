import React from 'react'

export default (props) => (
    <table className="table table-hover">
        <thead>
            <tr>
            <th scope="col">Nome</th>
            <th scope="col">SKU</th>
            <th scope="col">Preço</th>
            <th scope="col">Fornecedor</th>
            <th scope="col">Ações</th>
            </tr>
        </thead>
        <tbody>
            { props.produtos.map( (produto, idx) => {
                let classe = idx % 2 === 0 ? "table-light" : "table-dark"
                return (<tr className={classe} key={idx}>
                    <th scope="row">{produto.nome}</th>
                    <th>{produto.sku}</th>
                    <th>{produto.preco}</th>
                    <th>{produto.fornecedor}</th>
                    <th>
                        <button type="button" className="btn btn-success btn-sm" onClick={() => props.editarAction(produto.sku)}>Editar</button>
                        <button type="button" className="btn btn-warning btn-sm" onClick={() => props.deletarAction(produto.sku)}>Excluir</button>
                    </th>
                </tr>)
            }) }
        </tbody>
    </table>    
)