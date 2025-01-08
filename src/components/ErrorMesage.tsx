import { PropsWithChildren} from "react"

const ErrorMesage = ({children}:PropsWithChildren) => {
  return (
    <>
      <p className="bg-red-600 p-2 font-bold text-sm text-center">
        {children}
      </p>
    </>
  )
}

export default ErrorMesage
