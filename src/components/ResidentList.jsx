import { IconChevronsLeft, IconChevronsRight } from "@tabler/icons-react"
import { useEffect, useState } from "react"
import ResidentCard from "./ResidentCard"
import { paginationLogic } from "../utils/pagination"

const ResidentList = ({ residents }) => {
  const [currentPage, setCurrentPage] = useState(1)

  const { pages, residentsInPage } = paginationLogic(currentPage, residents)

  useEffect(() => {
    setCurrentPage(1)
  }, [residents])

  return (
    <section className="bg-[url('/pagebg.svg')]">
      <div className="px-4">
        <section className="grid grid-cols-[repeat(auto-fit,_280px)] justify-center gap-6 max-w-[1000px] mx-auto py-10">
          {
            residentsInPage.map((resident) => (<ResidentCard key={resident} residentEndpoint={resident} />))
          }
        </section>

        {/* Paginación */}
        <ul className="text-lg flex gap-3 justify-center flex-wrap pb-10">
          {
            currentPage !== 1 && (
              <button className="flex items-center justify-center bg-[#062226] w-[45px] h-[45px] rounded-md" onClick={() => setCurrentPage(currentPage - 1)}>
                <IconChevronsLeft />
              </button>
            )}

          {
            pages.map((page) => (
              <li key={page}>
                <button className={`text-white w-[45px] h-[45px] rounded-md ${page === currentPage && "!bg-[#062226]"}`} onClick={() => setCurrentPage(page)}>{page}</button>
              </li>
            ))
          }

          {currentPage !== pages.length && (
            <button className="flex items-center justify-center bg-[#062226] w-[45px] h-[45px] rounded-md" onClick={() => setCurrentPage(currentPage + 1)}>
              <IconChevronsRight />
            </button>
          )}

        </ul>
      </div>
    </section>
  )
}
export default ResidentList