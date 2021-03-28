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
