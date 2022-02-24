import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from './../store/hooks';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Table = () => {
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState('');
    const searchRef = useRef<HTMLInputElement>(null);
    const originalData = useAppSelector((state) => state.warehouse);

    const [data, setData] = useState(originalData);
    const cityRef = useRef<HTMLSelectElement>(null);
    const clusterRef = useRef<HTMLSelectElement>(null);
    const minRef = useRef<HTMLInputElement>(null);
    const maxRef = useRef<HTMLInputElement>(null);
    const [min, setMin] = useState(0);

    let spaces: number[] = [];
    originalData.forEach((item) => {
        spaces.push(item.space_available);
    });
    const [max, setMax] = useState(Math.max(...spaces));
    let properties: string[] = [];
    for (const key of Object.keys(originalData[0])) {
        properties.push(key);
    }
    let cities: string[] = [];
    originalData.forEach((item) => {
        cities.push(item.city);
    });

    const uniqueCities = [...new Set(cities)];
    let clusters: string[] = [];
    originalData.forEach((item) => {
        clusters.push(item.cluster);
    });

    const uniqueClusters = [...new Set(clusters)];

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const cityExists = cityRef.current?.value.trim() !== '';
        const clusterExists = clusterRef.current?.value.trim() !== '';
        if (!cityExists && !clusterExists) {
            return;
        }
        const cluster = clusterRef.current?.value;
        const city = cityRef.current?.value;
        setData(
            originalData.filter((item) => {
                if (cityExists && clusterExists) {
                    return (
                        item.city === city &&
                        item.cluster === cluster &&
                        item.space_available >= min &&
                        item.space_available <= max
                    );
                } else if (cityExists && !clusterExists) {
                    return (
                        item.city === city &&
                        item.space_available >= min &&
                        item.space_available <= max
                    );
                } else if (!cityExists && clusterExists) {
                    return (
                        item.cluster === cluster &&
                        item.space_available >= min &&
                        item.space_available <= max
                    );
                }
            })
        );
    };

    const onSearchHandler = () => {
        setData(
            originalData.filter((item) =>
                item.name.toLowerCase().includes(searchTerm)
            )
        );
    };

    return (
        <Fragment>
            <div className='wrapper'>
                <input
                    className='search'
                    ref={searchRef}
                    type='text'
                    onChange={() => {
                        setSearchTerm(searchRef.current?.value as string);
                    }}
                    placeholder='Search Warehouse ny name'
                    value={searchTerm}
                />
                <button className='button button1' onClick={onSearchHandler}>
                    Search
                </button>
                <form onSubmit={submitHandler}>
                    <div className='filter'>
                        <select ref={cityRef} name='city' id='city'>
                            <option value={''}> --City-- </option>
                            {uniqueCities.map((city, idx) => {
                                return (
                                    <option key={idx} value={city}>
                                        {city}
                                    </option>
                                );
                            })}
                        </select>

                        <select name='clusters' id='cluster' ref={clusterRef}>
                            <option value={''}> --Cluster-- </option>;
                            {uniqueClusters.map((cluster, idx) => {
                                return (
                                    <option key={idx} value={cluster}>
                                        {cluster}
                                    </option>
                                );
                            })}
                        </select>
                        <div className='range'>
                            <label>Space Availability</label>
                            <input
                                ref={minRef}
                                type='number'
                                value={min}
                                onChange={() => {
                                    setMin(
                                        parseInt(
                                            minRef.current?.value as string
                                        )
                                    );
                                }}
                            />
                            <input
                                ref={maxRef}
                                type='number'
                                value={max}
                                onChange={() => {
                                    setMax(
                                        parseInt(
                                            maxRef.current?.value as string
                                        )
                                    );
                                }}
                            />
                        </div>
                        <button className='button button2' type='submit'>
                            Apply Filters
                        </button>
                    </div>
                </form>
                <br></br>
                <table className='card'>
                    <thead>
                        <tr>
                            {properties.map((item, idx) => (
                                <th key={idx} scope='col'>
                                    {item}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, idx) => {
                            const values = Object.values(item);

                            return (
                                <tr
                                    key={item.code}
                                    onClick={() => {
                                        navigate(item.code);
                                    }}>
                                    {values.map((val, idx) => {
                                        if (val === true) {
                                            return (
                                                <td
                                                    key={idx}
                                                    data-label={
                                                        properties[idx]
                                                    }>
                                                    <FaCheckCircle color='green' />
                                                </td>
                                            );
                                        } else if (val === false) {
                                            return (
                                                <td
                                                    data-label={properties[idx]}
                                                    key={idx}>
                                                    <FaTimesCircle color='red' />
                                                </td>
                                            );
                                        }
                                        return (
                                            <td
                                                key={idx}
                                                data-label={properties[idx]}>
                                                {val}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </Fragment>
    );
};

export default Table;
