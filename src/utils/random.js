const getRandomNumber = (limit) => {
  // 0 ---> 0.999999
  return Math.floor(Math.random() * limit) + 1
}

export{
  getRandomNumber
}