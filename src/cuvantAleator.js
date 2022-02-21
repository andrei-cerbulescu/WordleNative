const vector_cuvinte = ['apă', 'pisică', 'iepure']

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const cuvantAleator = () => {
  return vector_cuvinte[getRandomArbitrary(0, vector_cuvinte.length)]
}

export default cuvantAleator