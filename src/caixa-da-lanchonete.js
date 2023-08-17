class CaixaDaLanchonete {
    constructor() {
        this.cardapio = {
            cafe: { descricao: "Café", preco: 3.00 },
            chantily: { descricao: "Chantily (extra do Café)", preco: 1.50 },
            suco: { descricao: "Suco Natural", preco: 6.20 },
            sanduiche: { descricao: "Sanduíche", preco: 6.50 },
            queijo: { descricao: "Queijo (extra do Sanduíche)", preco: 2.00 },
            salgado: { descricao: "Salgado", preco: 7.25 },
            combo1: { descricao: "1 Suco e 1 Sanduíche", preco: 9.50 },
            combo2: { descricao: "1 Café e 1 Sanduíche", preco: 7.50 }
        };
    }

    calcularValorDaCompra(metodoDePagamento, itens) {      
        if (!["debito", "credito", "dinheiro"].includes(metodoDePagamento)) {
            return "Forma de pagamento inválida!";
        }        
    
        if (itens.length === 0) {
            return "Não há itens no carrinho de compra!";
        } 

        let temQueijo = false;
        for (const item of itens) {
            const [codigoItem, _] = item.split(',');
            if (codigoItem === "queijo") {
                temQueijo = true;
                break;
            }
        }
        

        if (temQueijo && !this.verificarSanduiche(itens)) {
            return "Item extra não pode ser pedido sem o principal";
        }

        let valorTotal = 0;
    
        for (const item of itens) {
            const [codigoItem, quantidadeItem] = item.split(',');
            const quantidade = parseInt(quantidadeItem);
    
            if (!this.cardapio[codigoItem]) {
                return "Item inválido!";
            } else if (quantidade === 0) {
                return "Quantidade inválida!";
            }

            valorTotal += this.cardapio[codigoItem].preco * quantidade;            
        }     
                         
            if (metodoDePagamento === "dinheiro") {
                valorTotal *= 0.95;
            } else if (metodoDePagamento === "credito") {
                valorTotal *= 1.03;
            }

        return `R$ ${valorTotal.toFixed(2).replace('.', ',')}`;
    }

    verificarSanduiche(itens) {
        for (const item of itens) {
            const [codigoItem, _] = item.split(',');
            if (codigoItem === "sanduiche") {
                return true;
            }
        }
        return false;
    }
}

export { CaixaDaLanchonete };
