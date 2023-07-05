import React from 'react';
import { Type } from '@/interface/pokemonDetail';
import { Link } from 'react-router-dom';

interface PokemonCardProps {
    image:string
    name:string
    id:number
    type:Type[]
}

const PokemonCard = ( { image,name,id,type } :PokemonCardProps ) => {

    return(
        <div className="
        max-w-sm rounded-[20px] overflow-hidden
        shadow dark:bg-gray-800 dark:border-gray-700 p-[16px] bg-[#253641] max-w-[275px] m-[auto]">
            <div className='bg-[url("/project-resources/poke-card-bg.png")] bg-center aspect-square w-full bg-cover rounded-[20px]'>
                <Link to={`/detail/${name}`} className='bg-[url("/project-resources/poke-card-bg.png")]'>
                    <img className="rounded-t-lg max-h-[218px] p-[40px] w-full" 
                    src={image}
                    alt="" />
                </Link>
            </div>
            <div className="pt-5">
                <div className='flex justify-between'>
                    <h5 className="
                    capitalize mb-2 text-xl font-bold tracking-tight 
                    text-white dark:text-white">
                        {name}
                    </h5>
                    <h5 className="
                    mb-2 text-xl font-bold tracking-tight 
                    text-white dark:text-white">
                        #{id}
                    </h5>
                </div>
                <div className='flex gap-2 justify-end mt-[16px]'>
                    {type.map((item) => {
                        return<span className={`badge-type-${item.type.name} capitalize px-[14px]  py-1 rounded-[12px]`}>
                            {item.type.name}
                        </span>
                    })}
                </div>
            </div>
        </div>
    )
}

export default PokemonCard