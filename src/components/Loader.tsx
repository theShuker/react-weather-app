import { BiLoaderAlt } from "react-icons/bi"

export default function Loader() {
  return (
    <div className="flex gap-2 items-center">
      <BiLoaderAlt className="animate-spin" />
      Loading...
    </div>
  )
}
