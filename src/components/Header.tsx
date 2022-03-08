import * as React from 'react';

interface IHeaderProps {
    title: string
}

const Header: React.FunctionComponent<IHeaderProps> = ({title}) => {
  return (
    <div className="bg-teal-500 p-4 mb-2">
    <div className="container mx-auto max-w-2xl">
      <p className="text-white font-semibold text-xl tracking-tight">{title}</p>
    </div>
  </div>
  );
};

export default Header;
