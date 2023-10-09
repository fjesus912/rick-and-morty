import axios from "axios"
import { useEffect, useState } from "react"
import { characterStatus } from "../constants/resident"

const ResidentCard = ({ residentEndpoint }) => {
  const [resident, setResident] = useState(null)

  useEffect(() => {
    axios.get(residentEndpoint)
      .then(({ data }) => setResident(data))
      .catch((err) => console.log(err))
  }, [])


  return (
    <article className="border-2 border-[#8EFF8B] bg-[url('/headerbg.svg')]">
      <header className="relative">
        <img className="" src={resident?.image} alt="" />

        {/* Status */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/80 text-white px-4 py-1 rounded-md flex items-center gap-2">
          <div className={`h-3 w-3 ${characterStatus[resident?.status]} rounded-full`}></div>
          <span>{resident?.status}</span>
        </div>
      </header>
      <hr className="h-[2px] bg-[#8EFF8B] border-0" />
      <div className="p-4 ">
        <h4 className="text-3xl border-b-[1px] border-[#084851] p-2 mb-2">{resident?.name}</h4>
        <ul className="w-[150px]">
          <li><span className="text-[#938686]">Species</span> {resident?.species}</li>
          <li><span className="text-[#938686]">Origin</span> {resident?.origin.name}</li>
          <li><span className="text-[#938686]">Times appear</span> {resident?.episode.length}</li>
        </ul>
      </div>
    </article>
  )
}
export default ResidentCard