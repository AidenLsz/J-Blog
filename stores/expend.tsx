import React, {useState,  createContext} from "react"

interface IExtendContextProps {
    isExtend: Boolean
    active: Number
    setExtend: (isExtend: Boolean) => void
    setActive: (active: Number) => void
}

interface IProps {
    children: JSX.Element
}

export const ExtendContext = createContext<IExtendContextProps>(
    {} as IExtendContextProps
)

export const ExtendContextProvider = ({children}: IProps): JSX.Element => {
    const [isExtend, setExtend] = useState<Boolean>(false)
    const [active, setActive] = useState<Number>(1)
    return (
        <ExtendContext.Provider
            value={{
                isExtend,
                setExtend,
                active,
                setActive
            }}
        >
            {children}
        </ExtendContext.Provider>
    )
}
