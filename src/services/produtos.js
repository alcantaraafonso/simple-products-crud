const PRODUTOS = '_PRODUTOS';

export function ErroValidacao(errors) {
    this.errors = errors;
}


export default class ProdutoService {


    validar = (produto) => {
        const errors = []

        if (!produto.nome) {
            errors.push('O campo Nome é obrigatório')
        }
        if (!produto.sku) {
            errors.push('O campo SKU é obrigatório')
        }
        if (!produto.descricao) {
            errors.push('O campo Descrição é obrigatório')
        }
        if (!produto.preco || produto.preco <= 0) {
            errors.push('O campo preço deve ter um campo maior que zero')
        }
        if (!produto.fornecedor) {
            errors.push('O campo Fornecedor é obrigatório')
        }

        if (errors.length > 0) {
            throw new ErroValidacao(errors)
        }
    }

    getProdutos = () => {
        let produtos = localStorage.getItem(PRODUTOS);
        if (!produtos) {
            produtos = []
        } else {
            produtos = JSON.parse(produtos);
        }

        return produtos
    }

    obterIndex = (sku) => {
        let index = null
        this.getProdutos().forEach( (produto, i) => {
            if (produto.sku === sku) {
                index = i
            }
        })
        return index
    }

    deletar = (sku) => {
        const index = this.obterIndex(sku)
        if (index !== null) {
            const produtos = this.getProdutos()
            produtos.splice(index, 1);
            localStorage.setItem(PRODUTOS, JSON.stringify(produtos))
            return produtos
        }
    }

    salvar = (produto) => {

        this.validar(produto)
        
        let produtos = this.getProdutos()
        const index = this.obterIndex(produto.sku) 
        if (index === null) {
            produtos.push(produto)
        } else {
            produtos[index] = produto
        }
        localStorage.setItem(PRODUTOS, JSON.stringify(produtos))
    }


}