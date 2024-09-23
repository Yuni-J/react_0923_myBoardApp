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
                    <label htmlFor="t" className='title'>제목
                        <input type="text" id='t' name='title' value={board.title} onChange={onChange} placeholder='제목을 입력해주세요' />
                    </label>
                    <label htmlFor="type" className='type'>
                        <select name="type" id="type" value={board.type} onChange={onChange}>
                            <option value="">--문의 유형--</option>
                            <option value="상품문의">상품문의</option>
                            <option value="배송문의">배송문의</option>
                            <option value="결제/취소문의">결제/취소문의</option>
                            <option value="교환/환불문의">교환/환불문의</option>
                            <option value="기타문의">기타문의</option>
                        </select>
                    </label>
                    <label htmlFor="w" className='writer'>작성자 : {board.writer}</label>
                    <label htmlFor="c" className='con'>내용
                        <textarea type="text" id='c' name='contents' value={board.contents} onChange={onChange} placeholder='내용을 입력해주세요' />
                    </label>
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