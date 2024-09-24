import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Inquiry.css';

const InquiryModify = () => {

    const { id } = useParams();

    //db에서 해당 파일 가져오기
    const [ board, setBoard ] = useState(null);

    const getBoard = async()=>{ 
        try{
            const res = await axios(`/contents/${id}`);
            setBoard(res.data[0]);
            console.log(res);
        }
        catch(error){
            console.log(error);
        }
    };
    
    useEffect(()=>{
        getBoard();
    },[]);

    const onChange = (e) => {
        const { name, value } = e.target;

        setBoard({
            ...board,
            [name]:value
        });
    };

    const onSubmit = async() =>{
        try{
            const res = await axios.post(`/update/${id}`, board);
            console.log(res);
            window.location.href = `/contents/${id}`;
        }catch(error){
            console.log(error);
        }
    };


    if(board !== null){
        return (
            <div className='inquiryModify'>
                <h2>문의 하기 수정</h2>
                <div className='content'>
                    <div className='title'>
                        <input type="text" id='t' name='title' value={board.title} onChange={onChange} placeholder='제목을 입력해주세요' />
                    </div>
                    <div className='div'>
                        <div className='type'>
                            <select name="type" id="type" value={board.type} onChange={onChange}>
                                <option value="">--문의 유형--</option>
                                <option value="상품문의">상품문의</option>
                                <option value="배송문의">배송문의</option>
                                <option value="결제/취소문의">결제/취소문의</option>
                                <option value="교환/환불문의">교환/환불문의</option>
                                <option value="기타문의">기타문의</option>
                            </select>
                        </div>
                        <div className='writer'>작성자 : {board.writer}</div>
                        <div className='date'>작성일 : {board.reg_date.substring(0, board.reg_date.indexOf("T"))}</div>
                    </div>
                    <div className='con'>
                        <textarea type="text" id='c' name='contents' value={board.contents} onChange={onChange} placeholder='내용을 입력해주세요' />
                    </div>
                </div>
                <div>
                    <button onClick={onSubmit}>수정</button>
                    <Link to={`/contents/${id}`}><button>취소</button></Link>
                    <Link to={'/'}><button>목록</button></Link>
                </div>  
            </div>
        );
    };
};

export default InquiryModify;