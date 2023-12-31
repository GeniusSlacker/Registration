import { nanoid } from '@reduxjs/toolkit';
import type { CollapseProps } from 'antd';
import { Collapse, Empty } from 'antd';
import { useRef, useState } from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setStep2_bendler, setStep2_edit, setStep2_emrMezmun, setStep2_esasMetn, setStep2_preambula, setStep2_remove } from '../../store/slices/mainInfoSlice';
import './MyAntAccordion.css';


function MyAntAccordion({ error }: any) {
    const [order, setOrder] = useState<string>('')
    const [change, setChange] = useState<boolean>(true)
    const ereaRef = useRef<HTMLTextAreaElement | null>(null)
    const [catchId, setCatchId] = useState<string>('')
    const dispatch = useDispatch()
    const { bendler, emrinMezmunu, preambula, esas_metn } = useSelector((store: RootState) => store.mainInfo.step2)
    //Add value to the array
    const handleAdd = () => {
        dispatch(setStep2_bendler({ id: nanoid(), bend: order }))
        setOrder('')
    }
    //Remove table row
    const handleTableRemover = (id: any) => {
        dispatch(setStep2_remove(id))
    }
    //Focus to the Bendin metni
    const handleSetToInput = (id: string) => {
        ereaRef.current?.focus()
        setChange(false)
        setCatchId(id)
    }
    //Change table info
    const changeValue = () => {
        dispatch(setStep2_edit({ id: catchId, newValue: order }))
        setOrder('')
    }
    //Getting Bendin metni
    const handleArea = (e: any) => { setOrder(e.target.value) }
    //Getting Emrin mezmunu value
    const handleEmrMezmun = (e: any) => {
        dispatch(setStep2_emrMezmun(e.target.value))
        if (emrinMezmunu == '' && error){
           //------------------
        }

    }
    //Getting Preambula value
    const handlePreambula = (e: any) => {
        dispatch(setStep2_preambula(e.target.value))
    }
    //Getting Metn value
    const handleEsasMetn = (e: any) => {
        dispatch(setStep2_esasMetn(e.target.value))
    }
    //Control button enable
    const disableControl = order.trim() === "" ? true : false

    //Ant accardion control
    const onChange = (key: string | string[]) => {
        console.log(key);
    };
    const items: CollapseProps['items'] = [
        {
            key: '1',
            label: 'Başlıq və əsaslandırma',
            children: <div>
                <div className='sablon_div'>
                    <button type='button' className='sablon '>+ Şablondan seç</button>
                    <button type='button' className='sablon'> Şablon kimi yadda saxla</button>
                </div>
                <h4>Əmrin məzmunu</h4>
                <input type="text" placeholder='Type' value={emrinMezmunu} onChange={handleEmrMezmun} />
                <h4>Preambula</h4>
                <textarea placeholder='Type' value={preambula} onChange={handlePreambula} rows={10}></textarea>
            </div>,
        },
        {
            key: '2',
            label: 'Əmr / Sərəncam / Qərar',
            children: <div>
                <div className='sablon_div'>
                    <button type='button' className='sablon '>+ Şablondan seç</button>
                    <button type='button' className='sablon'> Şablon kimi yadda saxla</button>
                </div>
                <h4>Bəndin mətni</h4>
                <textarea ref={ereaRef} onChange={handleArea} rows={7} value={order}> </textarea>

                <div className='sablon_div'>
                    <button type='button' disabled={disableControl} className='sablon '>Imtina et</button>
                    <button type='button' onClick={changeValue} disabled={change} className='sablon'>Dəyiş</button>
                    {/* @ts-ignore  */}
                    <button type='button' onClick={handleAdd} disabled={disableControl} className='sablon'>Əlavə et</button>
                </div>
                {bendler.length > 0 && <table>
                    <thead>
                        <tr>
                            <th>№</th>
                            <th>Bənd</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {bendler.map((item: any, index: number) => {
                            return (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td ><p >{item?.bend}</p></td>
                                    <td><button onClick={() => handleSetToInput(item.id)} className='change_btn' type='button'> <FaPencilAlt /> Dəyişdirmə</button></td>
                                    <td><button onClick={() => handleTableRemover(item.id)} className='change_btn' type='button'><FaTrash /> Sil</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>}
            </div>,
        },
        {
            key: '3',
            label: 'Tapşırıq',
            children: <div className='content'>
                <Empty />
            </div>
        },
        {
            key: '4',
            label: 'Əsas',
            children: <div>
                <h4>Mətn</h4>
                <textarea value={esas_metn} onChange={handleEsasMetn} rows={7}></textarea>
            </div>
        }
    ];
    return (
        <>
            <Collapse items={items} onChange={onChange} />
        </>
    )
}
export default MyAntAccordion



