import React, {useState, createContext} from "react"

interface IExtendContextProps {
    isExtend: Boolean
    setExtend: (isExtend: Boolean) => void
}

interface IProps {
    children: JSX.Element
}

export const ExtendContext = createContext<IExtendContextProps>(
    {} as IExtendContextProps
)

export const ExtendContextProvider = ({children}: IProps): JSX.Element => {
    const [isExtend, setExtend] = useState<Boolean>(false)

    return (
        <ExtendContext.Provider
            value={{
                isExtend,
                setExtend
            }}
        >
            {children}
        </ExtendContext.Provider>
    )
}
