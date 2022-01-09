<template>
  <div class="container">
    <div class="game-body p-3 mx-auto row row-cols-3 g-4 justify-content-center" :class="cardsExtraClass">
      <div class="col" v-for="card in cards" :key="card.idx">
        <div class="scene">
          <div class="card shadow-lg border-0" :class="selectedImageType" :data-cardname="card.card_name" @click="flipThisCard($event, card.idx)" :id="`card_${card.idx}`">
            <div class="card__face card__face--front"></div>
            <div class="card__face card__face--back" :class="{'won' : card.won}"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
Array.prototype.shuffle=function(){
  let len = this.length,temp,i
  while(len){
    i=Math.random()*len-- |0;
    temp=this[len],this[len]=this[i],this[i]=temp;
  }
  return this;
}

export default {
  name: "GameBody",
  emits: ["restartGame"],
  data() {
    return {
      cardsNumber: 0,
      cardsExtraClass: "",
      cards: [],
      active_player_id: 1
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
    startGame(isNewStart) {
      // remove flip class from all cards
      this.cards.forEach(c => {
        if (document.getElementById(`card_${c.idx}`)) {
          document.getElementById(`card_${c.idx}`).classList.remove("flip")
        }
      })

      if (this.players.length === 1) {
        if (this.selectedLevel === 'easy') {
          this.cardsNumber = 6
          this.cardsExtraClass = "row-cols-md-3"
        } else if (this.selectedLevel === 'medium') {
          this.cardsNumber = 8
          this.cardsExtraClass = "row-cols-md-4"
        } else {
          this.cardsNumber = 12
          this.cardsExtraClass = "row-cols-md-4"
        }
      } else {
        if (this.selectedLevel === 'easy') {
          this.cardsNumber = 12
          this.cardsExtraClass = "row-cols-md-4"
        } else if (this.selectedLevel === 'medium') {
          this.cardsNumber = 16
          this.cardsExtraClass = "row-cols-md-4"
        } else {
          this.cardsNumber = 20
          this.cardsExtraClass = "row-cols-md-4"
        }
      }

      setTimeout(() => {
        // making the cards array
        this.cards = []
        let e = 0;
        for (let i=0; i<this.cardsNumber; i++) {
          if (i % 2 === 0) e++

          this.cards.push(
              {
                idx: i,
                card_name: e,
                flipped: false,
                won: false
              }
          )
        }

        // resort cards array random
        this.cards.shuffle()
      }, isNewStart ? 1000 : 0)
    },
    flipThisCard(event, idx) {

      // check if this card won
      if (this.cards.filter(c => c.idx === idx && c.won).length > 0) {
        return;
      }

      // check if this card flipped
      if (this.cards.filter(c => c.idx === idx && c.flipped).length > 0) {
        return;
      }

      // get array from all flipped cards
      const flipped_cards = this.cards.filter(c => c.flipped && !c.won)

      // when 2 cards are flipped then don't flip this one
      if (flipped_cards.length === 2) {
        return;
      }

      // flip this card
      this.cards.forEach(c => {
        if (c.idx === idx) {
          c.flipped = !c.flipped
        }
      })
      event.target.parentElement.classList.toggle("flip")

      // when 2 cards are flipped, then all cards after 1 Second will be return to front face
      const flipped_cards_new_array = this.cards.filter(c => c.flipped && !c.won)
      if (flipped_cards_new_array.length === 2) {
        setTimeout(() => {
          this.cards.forEach(c => {

            // check if flipped
            if (c.flipped) {

              // check if won
              if (!c.won) {
                let tt = flipped_cards_new_array.map(c => c.card_name).reduce(function(a,b){
                  if (a.indexOf(b) < 0 ) a.push(b);
                  return a;
                },[]);

                if (tt.length === 1) {
                  c.won = true

                  this.players.forEach(p => {
                    if (p.id === this.active_player_id) {
                      p.score += 0.5
                    }
                  })
                }
              }

              if (!c.won) {
                // return this card to front face
                c.flipped = false
                document.getElementById(`card_${c.idx}`).classList.toggle("flip")
              }
            }
          })
        }, 1000)
      }

      setTimeout(() => {
        if (this.cards.filter(c => c.flipped).length === this.cards.length) {
          this.emitter.emit("stopTimer")
        }
      },1500)
    },
    restartGame() {
      this.startGame(true)

      // reset scores
      this.players.forEach(p => {
        p.score = 0
      })
    }
  },
  beforeMount() {
    // start new Game
    this.startGame(false)

    // get event restartGame
    this.emitter.on("restartGame", this.restartGame)

    // reset scores
    this.players.forEach(p => {
      p.score = 0
    })
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
          &.won
            background-color: #ddd
            filter: contrast(0.5)
        &--front
          background-image: linear-gradient(45deg, #555 25%, transparent 25%, transparent), linear-gradient(-45deg, #555 25%, transparent 25%, transparent), linear-gradient(45deg, transparent 75%, #555 75%), linear-gradient(-45deg, transparent 75%, #555 75%)
          background-size: 45px 45px
          background-position: center
          border: 2px solid #555

@media (min-width: 900px)
  .game-body
    max-width: 70%
</style>
