<template>
    <div>
      <h1 class="titulo">{{ h1 }}</h1>

      <p v-show="mensagem" class="centralizado">{{ mensagem }}</p>

      <input type="search" class="filtro" v-on:input="filtro = $event.target.value" placeholder="Filtre o título">
      {{ filtro }}
      <ul class="lista-fotos">
        <li class="lista-fotos-item" v-for="foto of fotosComFiltro">
  
          <meu-painel :titulo="foto.titulo">
            <imagem-responsiva v-my-transform:scale.animate="1.2" :url="foto.url" :titulo="foto.titulo"></imagem-responsiva>
            <botao tipo="button" rotulo="REMOVER" @botaoAtivado="remove(foto)" :confirmacao="false" estilo="perigo"></botao>
          </meu-painel>
  
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import Painel from '../shared/painel/Painel.vue'
  import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva.vue';
  import Botao from '../shared/botao/Botao.vue';
  
  export default {
  
    components: {
      'meu-painel' : Painel,
      'imagem-responsiva': ImagemResponsiva,
      'botao' : Botao
    },
  
    data() {
      return {
        h1: "Alurapic",
        fotos: [],
        filtro: '',
        mensagem: ''
      }
    },
  
    computed: {
      fotosComFiltro() {
        if(this.filtro){
          let exp = new RegExp(this.filtro.trim(), 'i');
          return this.fotos.filter(foto => exp.test(foto.titulo));
        } else {
          return this.fotos;
        }
      }
    },

    methods: {
      remove(foto) {
        
          this.$http.delete(`http://localhost:3000/v1/fotos/${foto._id}`)
          .then(() => this.mensagem = 'Foto removida com sucesso', err => {
            console.log(err);
            this.mensagem = 'Não foi possível remover a foto';
          });
        
      }
    },
  
    created(){
      let promise = this.$http.get('http://localhost:3000/v1/fotos');
      promise
        .then(res => res.json())
        .then(fotos => this.fotos = fotos, err => console.log(err));
    }
  }
  
  </script>
  
  <style>
  
    .titulo {
      text-align: center;
    }

  
    .lista-fotos {
      list-style: none;
    }
  
    .lista-fotos .lista-fotos-item {
      display: inline-block;
    }
  
    .filtro {
      display: block;
      width: 100%;
    }
  
  </style>
  