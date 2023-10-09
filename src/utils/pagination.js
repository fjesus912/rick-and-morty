//? currentPage = Página actual
//? residents = Arreglo total de residentes en la dimensión actual
const paginationLogic = (currentPage, residents) => {
  //! Excepción para el primer render
  if(residents.length === 0) {
    return {
      pages: [1],
      residentsInPage: []
    }
  }

  //* La cantidad de residentes por página
  const RESIDENTS_PER_PAGE = 21

  //* La cantidad total de páginas
  const totalPages = Math.ceil(residents.length / RESIDENTS_PER_PAGE)

  //* Residentes que se van a mostrar en la página actual
  const sliceEnd = RESIDENTS_PER_PAGE * currentPage
  const sliceStart = sliceEnd - RESIDENTS_PER_PAGE
  const residentsInPage = residents.slice(sliceStart, sliceEnd)

  //* Generación de arreglo de las páginas que se van a mostrar
  const pages = []
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i) 
  }

  return {
    residentsInPage,
    pages
  }
}

export {
  paginationLogic
}