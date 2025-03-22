import React from 'react'
import { FaHandHoldingUsd } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

export default function PackageCard({destination}) {

    const navigate = useNavigate();

    return (
        <div className='max-w-[370px] border-2 md:border hover:shadow-2xl relative bg-white cursor-pointer' onClick={()=>navigate(`/destination-tour/${destination._id}`)}>
            <img src={destination?.packageImgUrl} alt="" className='w-full h-[190px] object-cover' />
            <div className='p-3'>
                <h3 className='text-lg font-semibold'>{destination?.packageName}</h3>
                <p className='text-xs mb-6'>{destination?.stayCity}</p>
                <hr />
                <div className='flex gap-4 mt-6 mb-6'>
                    {
                        destination?.packageIncludes.map((item, index) => {
                            return (
                                <div key={index}>
                                    {
                                        item.Name === 'Hotel' && <div className='flex flex-col gap-1 items-center'><img src="https://www.easemytrip.com/holidays/Content/customize/img/hotel-1.svg" alt="Hotel" /><p className='text-xs text-gray-700'>{item.Name}</p></div>
                                    }
                                    {
                                        item.Name === 'Sightseeing' && <div className='flex flex-col gap-1 items-center'><img src="https://www.easemytrip.com/holidays/Content/customize/img/sightseeing-1.svg" alt="Sightseeing" /><p className='text-xs text-gray-700'>{item.Name}</p></div>
                                    }
                                    {
                                        item.Name === 'Transfer' && <div className='flex flex-col gap-1 items-center'><img src="https://www.easemytrip.com/holidays/Content/customize/img/transfer-1.svg" alt="Transfer" /><p className='text-xs text-gray-700'>{item.Name}</p></div>
                                    }
                                    {
                                        item.Name === 'Meal' && <div className='flex flex-col gap-1 items-center'><img src="https://www.easemytrip.com/holidays/Content/customize/img/meal-1.svg" alt="Meal" /><p className='text-xs text-gray-700'>{item.Name}</p></div>
                                    }

                                </div>
                            )
                        })
                    }
                </div>
                <hr />
                <div className='flex justify-between items-center'>
                    <div className=''>
                        <span className='block text-xs text-gray-800'>Starting from</span>
                        {
                            destination?.CuttingPrice.IsActive && <span className='line-through text-gray-700 text-sm font-bold'>{destination.currSymbol}{destination.CuttingPrice.Amount}</span>
                        }
                        <p className='flex items-center gap-2'> <span className=' text-2xl font-bold'>{destination.currSymbol}{destination.twoPaxOccupancy}</span></p>
                        <span className='text-xs'>per person on twin sharing</span>
                    </div>
                    <button className='px-6 py-1 rounded-full bg-[#125296] text-white font-semibold'>View Package</button>
                </div>

            </div>
            <div className='flex gap-4 bg-blue-50 px-4 py-1 w-full absolute bottom-0'>
                <p className='text-gray-700 flex gap-2'><FaHandHoldingUsd size={15} /><span className='text-xs font-bold'> No Cost EMI Starts from {destination.currSymbol}2290</span></p>
                <span className='text-xs flex justify-end text-blue-600 font-semibold'>See options</span>
            </div>
        </div>
    )
}
