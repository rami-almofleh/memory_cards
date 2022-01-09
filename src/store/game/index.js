import state from './state'

export default {
  namespaced: true,
  state: state,
  getters: {
    getAllLevels(state) {
      return state.levels
    },
    getAllImageTypes(state) {
      return state.imageTypes
    },
    getSelectedImageType(state) {
      return state.selectedImageType
    },
    getSelectedLevel(state) {
      return state.selectedLevel
    },
    getAllPlayers(state) {
      return state.players
    },
    playersSeeded(state) {
      return state.players_seeded
    }
  },
  mutations: {
    deletePlayer(state, id) {
      state.players = state.players.filter(p => p.id !== id)
    },
    addPlayer(state, player) {
      state.players.push(player)
    },
    updatePlayer(state, player) {
      let idx = state.players.findIndex(p => p.id === player.id);
      state.players = [
        ...state.players.slice(0, idx),
        Object.assign(state.players[idx], player),
        ...state.players.slice(idx + 1),
      ];
    },
    setSelectedLevel(state, selectedLevel) {
      localStorage.setItem("selectedLevel", selectedLevel)
      state.selectedLevel = selectedLevel
    },
    setSelectedImageType(state, selectedImageType) {
      localStorage.setItem("selectedImageType", selectedImageType)
      state.selectedImageType = selectedImageType
    }
  }
}
