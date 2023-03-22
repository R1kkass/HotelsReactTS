import { FC } from "react";
import { Link } from "react-router-dom";
import './BreadCrumbs.scss'

interface IArrs{
    arr:TArr[]
}
type TArr={
    name:string,
    link: string
}

const Breadcrumbs:FC<IArrs> = ({arr}) => {
  
    return (
      <div className="BreadCrumbs">
        {arr.map(({name, link})=>(
            <Link to={`${link}`}>
                {name} / {''}
            </Link>
        )
        )}
      </div>
    );
  };
  
  export default Breadcrumbs;