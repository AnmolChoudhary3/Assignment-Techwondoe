import React from 'react'

type Props = {
    isActive?: boolean;
    children?: React.ReactNode;
};

const Badge: React.FC<Props> = ({children, isActive=true}) =>{
  return (
    <div className={`flex m-auto gap-2 font-bold text-left rounded-full w-fit shadow-md px-3 py-0.1 ${isActive ?  'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-800'}`}>
        {children}
    </div>
  )
}

export default Badge