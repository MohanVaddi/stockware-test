import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './../components/Warehouse.module.css';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { useNavigate } from 'react-router-dom';
import { warehouseActions } from '../store/warehouse';
const Warehouse = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { warehouseId } = useParams();
    const data = useAppSelector((state) =>
        state.warehouse.filter((item) => warehouseId === item.code)
    );
    let properties: string[] = [];
    for (const key of Object.keys(data[0])) {
        properties.push(key);
    }
    const item = data[0];
    const [name, setName] = useState(item.name);
    const [cluster, setCluster] = useState(item.cluster);
    const [city, setCity] = useState(item.city);
    const [space_available, setSpaceAvailable] = useState(item.space_available);
    const [isLive, setIsLive] = useState(item.is_live);
    const isLiveRef = useRef<HTMLInputElement>(null);
    const space_availableRef = useRef<HTMLInputElement>(null);
    const cityRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const clusterRef = useRef<HTMLInputElement>(null);

    const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(
            warehouseActions.modifyData({
                code: item.code,
                newData: {
                    name: name,
                    cluster: cluster,
                    city: city,
                    space_available: space_available,
                    is_live: isLive,
                },
            })
        );
        navigate('/');
    };

    return (
        <div className={styles.card}>
            <h1 className={styles.header}>{warehouseId}</h1>
            <small className={styles.small}>
                * Cluster, Warehouse name, City, Space available, and live
                status values are editable. *
            </small>
            <form onSubmit={formSubmitHandler}>
                <div className={styles.wrapper}>
                    <p className={styles.title}>Name</p>
                    <input
                        key={'name'}
                        ref={nameRef}
                        value={name}
                        onChange={() => {
                            setName(nameRef.current?.value as string);
                        }}
                    />
                    <p className={styles.title}>Code</p>
                    <p>{item.code}</p>
                    <p className={styles.title}>Id</p>
                    <p>{item.id}</p>
                    <p className={styles.title}>city</p>
                    <input
                        key={'city'}
                        ref={cityRef}
                        value={city}
                        onChange={() => {
                            setCity(cityRef.current?.value as string);
                        }}
                    />
                    <p className={styles.title}>space_available</p>
                    <input
                        key={'space_available'}
                        ref={space_availableRef}
                        type={'number'}
                        value={space_available}
                        onChange={() => {
                            setSpaceAvailable(
                                parseInt(
                                    space_availableRef.current?.value as string
                                )
                            );
                        }}
                    />
                    <p className={styles.title}>type</p>
                    <p>{item.type}</p>
                    <p className={styles.title}>cluster</p>
                    <input
                        key={'cluster'}
                        ref={clusterRef}
                        value={cluster}
                        onChange={() => {
                            setCluster(clusterRef.current?.value as string);
                        }}
                    />
                    <p className={styles.title}>is_registered</p>
                    <p>{item.is_registered ? 'True' : 'False'}</p>
                    <p className={styles.title}>is_live</p>
                    <input
                        key={'is_live'}
                        ref={isLiveRef}
                        value={isLive ? 'True' : 'False'}
                        onChange={() => {}}
                        onClick={() => {
                            setIsLive(!isLive);
                        }}
                    />
                </div>
                <p className={styles.submitBtnWrapper}>
                    <button
                        className={`${styles.button} ${styles.button2}`}
                        onClick={() => {
                            navigate('/');
                        }}>
                        Back
                    </button>
                    <button
                        className={`${styles.button} ${styles.button1}`}
                        type='submit'>
                        Apply Changes
                    </button>
                </p>
            </form>
        </div>
    );
};

export default Warehouse;
