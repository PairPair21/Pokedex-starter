import PokemonCard from "@/components/PokemonCard";
import { IPokemonDetailResponse } from "@/interface/pokemonDetail";
import { pokemonDetailServices, pokemonListServices } from "@/services";

import React,{ useEffect, useState } from "react";
import { Link, Route, Routes, useParams } from "react-router-dom";

type pokemonType = {
    data: IPokemonDetailResponse | undefined
    loading:boolean 
    error: null | any
}

const DetailPage = () => {
    const { name } = useParams()

    const[pokemon, setPokemon] = useState<pokemonType>({
        data:undefined, 
        loading: true, 
        error: null 
    })

    const callData = async (name:string) => {
        const response = await pokemonDetailServices.getPokemonDetail(name)
        if(response.status === 200){
            if(response.data)        
            setPokemon({ 
                data:{
                ...response.data,
                image:response.data.sprites.other['official-artwork'].front_default
            }, 
                loading: false, 
                error: null 
            })
        }else{
            setPokemon({
            data:undefined,
            loading: false,
            error: response.error
            })
        }
    }

    useEffect(() => {
        if(name) callData(name)
    },[name])

    return (
        <div className="w-[90%] m-[auto] max-w-[1100px]">
            <div className="flex justify-center">
                <img src="/project-resources/logo.webp" className="max-h-[80px] mt-[20px] " alt="" />
            </div>
            <div className="w-[90%] max-w-[600px] m-[auto]">
                <div className="flex items-center justify-center bg-[#6FC1EA] w-[60px] h-[40px] rounded-[16px] shadow-lg shadow-blue-500/50 opacity-30">
                    <Link to={'/'} className="text-white w-[60px] text-xl text-center font-bold">&#x3C;</Link>
                </div>
                { pokemon.data && (

                    <div className="rounded-[20px] overflow-hidden shadow p-[16px] m-[auto]">
                        <div className='bg-center aspect-square w-full bg-cover rounded-[20px] relative h-[400px]'> 
                            <img className="absolute h-[auto] max-h-[400px] aspect-square translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%]" 
                            src="/project-resources/pokemon_bg.png" 
                            alt="" 
                            />
                        
                            <img className="absolute rounded-t-lg h-[50%]  sm:h-[250px] p-[40px] translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%]" 
                            src={pokemon.data.image}
                            alt="" />
                        </div>

                        <div className="pt-5 bg-[#253641] rounded-[20px] p-[16px] my[20px]">
                            <div className='flex justify-between'>
                                <h5 className="
                                capitalize mb-2 text-xl font-bold tracking-tight 
                                text-white dark:text-white">
                                    {pokemon.data.name}
                                </h5>
                                <h5 className="
                                mb-2 text-xl font-bold tracking-tight 
                                text-white dark:text-white">
                                    #{pokemon.data.id}
                                </h5>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[20px] gap-y-[30px]">
                                <div>
                                    <div className="flex gap-x-[10px]">
                                        <div className="text-[#4EB6F2] font-semibold">Height</div>
                                        <div className="text-white">{(pokemon.data.height/10).toFixed(2)} m</div>
                                    </div>
                                    <div className="flex gap-x-[10px]">
                                        <div className="text-[#4EB6F2] font-semibold">Weight</div>
                                        <div className="text-white">{(pokemon.data.weight/10).toFixed(2)} kg</div>
                                    </div>
                                </div>
                                <div className='flex gap-2 justify-start sm:justify-end mt-[16px]'>
                                {pokemon.data.types.map((item) => {
                                    return(
                                    <span className={`badge-type-${item.type.name} capitalize px-[14px]  py-1 rounded-[12px]`}>
                                        {item.type.name}
                                    </span>
                                )})}
                                </div>
                                <div>
                                <h5 className="text-white font-semibold">Abilities</h5>
                                <div className="grid grid-cols-2 sm:grid-cols-1 gap-[10px] mt-[16px]">
                                    {pokemon.data.abilities.map((item)=>{
                                        return(
                                            <div className={`bg-[#4EB6F2] capitalize px-[14px]  py-1 rounded-[12px]`}>
                                                {item.ability.name}
                                            </div>
                                        )
                                    })}
                                    </div>
                                </div>
                                <div>
                                <h5 className="text-white font-semibold">State</h5>
                                <div className="grid grid-cols-1 gap-[10px] mt-[16px]">
                                    {pokemon.data.stats.map((item)=>{
                                        return(
                                            <div className="flex gap-x-[10px] justify-between">
                                                <div className="text-[#4EB6F2] font-semibold capitalize">{item.stat.name}</div>
                                                <div className="text-white">{item.base_stat}</div>
                                            </div>
                                        )
                                    })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default DetailPage;