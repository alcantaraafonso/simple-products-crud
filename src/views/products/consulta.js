import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import ProdutosService from '../../services/produtos'
import Card from '../../components/card'

import ProdutosTable from './produtosTable'

class ConsultaProdutos extends Component {
    constructor() {
        super()
        this.prepararEdicao = this.prepararEdicao.bind(this)
        this.deletar = this.deletar.bind(this)
        this.service = new ProdutosService()
    }
    
    state = {
        produtos: []
    }

    componentDidMount() {
        const produtos = this.service.getProdutos()
        this.setState( { produtos })
    }

    prepararEdicao = (sku) => {
        this.props.history.push(`/cadastro-produtos/${sku}`)

    }

    deletar = (sku) => {
        const produtos = this.service.deletar(sku)
        this.setState({produtos})
    }

    render() {
        return(
            <Card header="Consulta de Produtos">
                <ProdutosTable produtos={this.state.produtos} editarAction={this.prepararEdicao} deletarAction={this.deletar}/>
            </Card>
        )
    }
}

export default withRouter(ConsultaProdutos)