
class Calculadora {
    constructor(textoOperacaoAnterior, textoOperacaoAtual) {
        this.textoOperacaoAnterior = textoOperacaoAnterior;
        this.textoOperacaoAtual = textoOperacaoAtual;
        this.clear();
    }

    clear(){
        this.operacaoAtual = '';
        this.operacaoAnterior = '';
        this.operacao = undefined;
    }

    delete(){
        this.operacaoAtual = this.operacaoAtual.toString().slice(0,-1);
    }

    appendNumber(number){
        if(number === '.' && this.operacaoAtual.includes('.')) return;
        this.operacaoAtual = this.operacaoAtual.toString() + number.toString();
    }

    escolherOperacao(operacao){
        if(this.operacaoAtual === '') return;
        if(this.operacaoAnterior !== ''){
            this.computar();
        }
        this.operacao = operacao;
        this.operacaoAnterior = this.operacaoAtual;
        this.operacaoAtual = '';
    }

    computar(){
        let computation;
        const ant = parseFloat(this.operacaoAnterior);
        const atual = parseFloat(this.operacaoAtual);
        if(isNaN(ant) || isNaN(atual)) return;
        switch (this.operacao){
            case '+':
                computation = ant + atual;
            break;
            case '-':
                computation = ant - atual;
            break;
            case '*':
                computation = ant * atual;
            break;
            case '÷':
                computation = ant / atual;
            break;
            default:
                return;
        }
        this.operacaoAtual = computation;
        this.operacao = undefined;
        this.operacaoAnterior = '';
    }

    getDisplayNumber(number){
        const stringNumber = number.toString();
        const integerDigit = parseFloat(stringNumber.split('.')[0])
        const decimalDigit = stringNumber.split('.')[1]
        let integerDisplay
        if(isNaN(integerDigit)){
            integerDisplay = '';
        } else {
            integerDisplay = integerDigit.toLocaleString('en', {maximumFractionDigits: 0});
        }
        if (decimalDigit != null){
            return `${integerDisplay}.${decimalDigit}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay(){
        this.textoOperacaoAtual.innerText = this.getDisplayNumber(this.operacaoAtual);
        if (this.operacao != null) {
            this.textoOperacaoAnterior.innerText = `${this.getDisplayNumber(this.operacaoAnterior)} ${this.operacao}`;
        } else {
            this.textoOperacaoAnterior.innerText = '';
        }
    }
}


const botaoNumerico = document.querySelectorAll('[data-number]');
const botaoOperacao = document.querySelectorAll('[data-operation]');
const botaoIgual = document.querySelector('[data-equals]');
const botaoDelete = document.querySelector('[data-delete]');
const botaoAllClear = document.querySelector('[data-all-clear]');
const textoOperacaoAnterior = document.querySelector('[data-operacao-anterior]');
const textoOperacaoAtual = document.querySelector('[data-operacao-atual]');

const calculadora = new Calculadora(textoOperacaoAnterior, textoOperacaoAtual);

botaoNumerico.forEach(button => {
    button.addEventListener('click', () => {
        calculadora.appendNumber(button.innerText);
        calculadora.updateDisplay();
    })
})

botaoOperacao.forEach(button => {
    button.addEventListener('click', () => {
        calculadora.escolherOperacao(button.innerText);
        calculadora.updateDisplay();
    })
})

botaoIgual.addEventListener('click', button => {
    calculadora.computar();
    calculadora.updateDisplay();
})

botaoAllClear.addEventListener('click', button => {
    calculadora.clear();
    calculadora.updateDisplay();
})

botaoDelete.addEventListener('click', button => {
    calculadora.delete();
    calculadora.updateDisplay();
})


