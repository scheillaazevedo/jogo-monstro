// ETAPAS DE DESENVOLVIMENTO RECOMENDADAS:

// 1- Crie primeiro toda a estutura (box)
// 2- Guarde a nome do jogador e utilize sempre que necessário;
// 3- A animação da barra de progresso. Ela deve apresentar 3 cores: barra = 100% ? roxo,  barra < 50 ? amarelo, barra < 15 ? vermelho. Também deve infomar a (%).
// 4- Defina como entender o ganhador.
// 5- Defina qual box será visivel conforme etapa do jogo
// 6- Faça funcionar a mensagem do vencedor

// 7- Crie uma função base: geradora de numeros aleatorios com min e max.
// (a função Math.random gera valores entre 0 e 1)

// 8- Crie uma função de ataque valida tanto para o especial setado como true,
// quanto para o normal setado como false. 

// 9- Crie a funcao de curar
// 10- Faça o historico

new Vue ({
    el: '#app',
    data: {
        nomeAstronauta: '',
        jogar: false,
        vidaAstronauta: 100,
        vidaAlienigena: 100,
        vidasAstroAlien: 'vidaAstronauta' + 'vidaAlienigena',
        logs: [],
    },
    computed:{
        vitoria(){
            return this.vidaAstronauta == 0 || this.vidaAlienigena == 0 || this.vidasAstroAlien == 0
        },
    },
    methods: {
        comecar(){
            if (this.nomeAstronauta <= 0) {
                console.log("Erro")
            } else {
                this.$forceUpdate()
                this.jogar = true
                this.vidaAstronauta = 100
                this.vidaAlienigena = 100
                this.logs = []
            }
            
        },
        desistirJogo(){
            this.jogar = false
            this.vidaAstronauta = ''
            this.vidaAlienigena = ''
            this.logs = 0
        },
        novamente(){
            this.jogar = true
            this.vidaAstronauta = 100
            this.vidaAlienigena = 100
            this.logs = []
        },
        //função com a ordem de ataque
        ordemAtaque(evento) {
            this.ataque('vidaAlienigena', 5, 10, evento, 'Astronauta', 'Alienígena', 'astro')
            this.ataque('vidaAstronauta', 7, 12, false, 'Alienígena', 'Astronauta', 'alien')
        },

        //função que aplica ordem de ataque
        ataque(valorAtual, min, max, evento, origem, alvo, nome){
            const superAtaque = evento ? 5 : 0

            const atacar = this.valorAleatorio(min + superAtaque, max + superAtaque)

            this[valorAtual] = Math.max(this[valorAtual] - atacar, 0)

            this.historico(`${origem} atingiu ${alvo} com ataque de ${atacar}.`, nome)
        },
        //funcao base
        valorAleatorio(min, max){
            const valor = Math.random() * (max - min) + min
            return Math.round(valor)
        },

        //funcao ordem de para curar
        ordemCura(){
            this.curar(10,15)
            this.ataque('vidaAstronauta', 7, 12, false, 'Alienígena', 'Astronauta', 'alien')
        },

        //funcao que aplica ordem de curar
        curar(min, max){
            const curarAstronauta = this.valorAleatorio(min, max)

            this.vidaAstronauta = Math.min(this.vidaAstronauta + curarAstronauta, 100)
            
            this.historico(`Astronauta ganhou cura de ${curarAstronauta}`, 'astro')
        },

        //log
        historico(texto, nome){
            this.logs.unshift({texto, nome})
        },

    },
})