import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import ProdutoService from '../../services/produtos'

import Card from '../../components/card'

const initialState = {
    nome: '',
    sku: '',
    descricao: '',
    preco: 0,
    fornecedor: '',
    sucesso: false,
    errors: [], 
    atualizando: false
}

class CadastroProduto extends Component {

    constructor() {
        super();
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onClear = this.onClear.bind(this);

        this.service = new ProdutoService();
    }

    state = initialState

    componentDidMount() {
        const sku = this.props.match.params.sku
        if(sku) {
            const prod = this.service.getProdutos().filter( produto => produto.sku === sku)
            if(prod.length === 1) {
                this.setState({...prod[0], atualizando: true})
            }
        }
    }

    onChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        /**
         * Coloca-se entre colchetes para que o próprio JS descubra qual valor do state deve ser atualizado
         */
        this.setState({
            [name]: value
        })
    }

    onSubmit = (event) => {
        event.preventDefault();
        const produto = {
            nome: this.state.nome,
            sku: this.state.sku,
            descricao: this.state.descricao,
            preco: this.state.preco,
            fornecedor: this.state.fornecedor                
        }
        try {
            this.service.salvar(produto)
            this.onClear();
            this.setState( {sucesso: true} )
        } catch(erro) {
            const errors = erro.errors
            this.setState({errors: errors})
        }

    }

    onClear = () => {
        this.setState(initialState)

    }

    render() {
        let cardTitle = this.state.atualizando ? "Atualização": "Cadastro"
        cardTitle += "de Produto"
        return (
            
            <Card header={cardTitle}>
                <form id="frm_produto" onSubmit={this.onSubmit}>
                { this.state.sucesso &&
                        <div className="alert alert-dismissible alert-success">
                            <button type="button" className="close" data-dismiss="alert">&times;</button>
                            <strong>Sucesso</strong> Cadastro realizado com sucesso.
                        </div> 
                }                 
                { this.state.errors.length > 0 &&
                        this.state.errors.map( (msg, i) => {
                            return (
                                <div className="alert alert-dismissible alert-danger" key={i}>
                                    <button type="button" className="close" data-dismiss="alert">&times;</button>
                                    <strong>Erro!</strong> {msg}.
                                </div> 
                            )
                        })
                    }                 
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Nome: *</label>
                                <input type="text" className="form-control" 
                                    value={this.state.nome} onChange={this.onChange} 
                                    name="nome"/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>SKU: *</label>
                                <input type="text" className="form-control"
                                    disabled={this.state.atualizando} 
                                    onChange={this.onChange} value={this.state.sku}
                                    name="sku"/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label>Descrição: *</label>
                                <textarea className="form-control" 
                                    value={this.state.descricao} onChange={this.onChange}
                                    name="descricao"/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Preço: *</label>
                                <input type="text" className="form-control" onChange={this.onChange}
                                    value={this.state.preco} name="preco"/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Fornecedor: *</label>
                                <input type="text" className="form-control" onChange={this.onChange} 
                                    value={this.state.fornecedor} name="fornecedor"/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-1">
                            <button className="btn btn-primary" type="submit">{this.state.atualizando ? 'Atualizar': 'Cadastrar'}</button>
                        </div>
                        <div className="col-md-1">
                            <button className="btn btn-danger" onClick={this.onClear}>Limpar</button>
                        </div>
                    </div>
                </form>
            </Card>
        )
    }

}

export default withRouter(CadastroProduto)