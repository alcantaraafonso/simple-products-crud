import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from '../views/home'
import CadastroProduto from '../views/products/cadastro'
import ConsultaProduto from '../views/products/consulta'

/**
 * /cadastro-produtos/:sku? -> Fala que esta rota recebe um parâmetro chamado sku e que ele é
 * opcional, representado pelo símbolo (?)
 */
export default () => {
    return(
        <Switch>
            <Route exact path="/cadastro-produtos/:sku?" component={CadastroProduto} />
            <Route exact path="/consulta-produtos" component={ConsultaProduto} />
            <Route exact path="/" component={Home} />
        </Switch>
    )
}