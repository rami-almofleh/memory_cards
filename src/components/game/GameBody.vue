<template>
  {{ selectedImageType }}
  {{ selectedLevel }}
  {{ players }}
  <div class="container">
    <div class="game-body p-3 mx-auto row row-cols-1 g-4 justify-content-center" :class="cardsExtraClass">
      <div class="col" v-for="card in cards" :key="card.idx">
        <div class="scene">
          <div class="card shadow-lg border-0" :class="selectedImageType" :data-cardname="card.card_name" @click="flipThisCard($event, card.idx)" :id="`card_${card.idx}`">
            <div class="card__face card__face--front">Front {{ card }}</div>
            <div class="card__face card__face--back"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
Array.prototype.shuffle=function(){
  var len = this.length,temp,i
  while(len){
    i=Math.random()*len-- |0;
    temp=this[len],this[len]=this[i],this[i]=temp;
  }
  return this;
}

export default {
  name: "GameBody",
  data() {
    return {
      cardsNumber: 0,
      cardsExtraClass: "",
      cards: []
    }
  },
  computed: {
    players() {
      return this.$store.getters["game/getAllPlayers"]
    },
    selectedImageType() {
      return this.$store.getters["game/getSelectedImageType"]
    },
    selectedLevel() {
      return this.$store.getters["game/getSelectedLevel"]
    }
  },
  methods: {
    flipThisCard(event, idx) {

      // flip this card
      this.cards.forEach(c => {
        if (c.idx === idx) {
          c.flipped = !c.flipped
        }
      })
      event.target.parentElement.classList.toggle("flip")

      // get array from all flipped cards
      const flipped_cards = this.cards.filter(c => c.flipped)

      // when 2 cards are flipped, then all cards after 1 Second will be return to front face
      if (flipped_cards.length === 2) {
        setTimeout(() => {
          this.cards.forEach(c => {
            if (c.flipped) {
              // return this card to front face
              c.flipped = false
              document.getElementById(`card_${c.idx}`).classList.toggle("flip")
            }
          })
        }, 1000)
      }
    }
  },
  beforeMount() {
    if (this.players.length === 1) {
      if (this.selectedLevel === 'easy') {
        this.cardsNumber = 6
        this.cardsExtraClass = "row-cols-md-3"
      } else if (this.selectedLevel === 'medium') {
        this.cardsNumber = 8
        this.cardsExtraClass = "row-cols-md-4"
      } else {
        this.cardsNumber = 10
        this.cardsExtraClass = "row-cols-md-4"
      }
    } else {
      if (this.selectedLevel === 'easy') {
        this.cardsNumber = 14
        this.cardsExtraClass = "row-cols-md-4"
      } else if (this.selectedLevel === 'medium') {
        this.cardsNumber = 16
        this.cardsExtraClass = "row-cols-md-4"
      } else {
        this.cardsNumber = 20
        this.cardsExtraClass = "row-cols-md-4"
      }
    }

    // making the cards array
    this.cards = []
    let e = 0;
    for (let i=0; i<this.cardsNumber; i++) {
      if (i % 2 === 0) e++

      this.cards.push(
          {
            idx: i,
            card_name: e,
            flipped: false
          }
      )
    }

    // resort cards array random
    this.cards.shuffle()
  }
}
</script>

<style lang="sass" scoped>
.game-body
  max-width: 90%

  .scene
    width: 90%
    height: 12rem
    perspective: 600px

    .card
      position: relative
      width: 100%
      height: 100%
      cursor: pointer
      transform-style: preserve-3d
      transform-origin: center
      transition: transform 1s
      &.flip
        transform: rotateY(-180deg)

      &__face
        position: absolute
        width: 100%
        height: 100%
        backface-visibility: hidden
        &--back
          transform: rotateY(180deg)
        &--front
          background-image: radial-gradient(circle, #6bd1a1, #7ed69b, #90db95, #a4df90, #b7e38b, #c2e686, #cee981, #dbeb7d, #e2ee76, #eaf16f, #f2f467, #fbf65f)

@media (min-width: 900px)
  .game-body
    max-width: 70%
</style>
