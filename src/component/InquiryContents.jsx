import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './Inquiry.css';

const InquiryContents = () => {

    const { id } = useParams();
    const [ board, setBoard ] = useState(null);

    const getBoard = async() =>{
        try{
            const res = await axios(`/contents/${id}`);
            //res.data : 데이터가 1개 더라도 배열로 들어옴
            setBoard(res.data[0]);
            console.log(res);
        }catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        getBoard();
    },[]);

    const onRemove = async() =>{
        if(window.confirm('정말 삭제 하시겠습니까?')){
            try{
                //삭제 요청 보내기
                await axios.get(`/delete/${id}`);
                //삭제 후 리스트로 이동
                window.location.href = '/list';
            }catch(error){
                console.log(error);
            }
        }
    };

    if(board != null){
        return (
            <div className='inquiryContents'>
                <h2>no.{board.id} 문의 내용</h2> 
                <div className='content'>
                    <div className='title'>{board.title}</div>
                    <div className='div'>
                        <div className='type'>{board.type}</div>
                        <div className='writer'>작성자 : {board.writer}</div>
                        <div className='date'>작성일 : {board.reg_date.substring(0, board.reg_date.indexOf("T"))}</div>
                    </div>
                    <div className='con'>{board.contents}</div>
                </div>
                <div>
                    <Link to={`/modify/${board.id}`}><button>수정</button></Link>
                    <Link to={'/'}><button onClick={onRemove}>삭제</button></Link>
                    <Link to={'/'}><button>목록</button></Link>
                </div>
            </div>
        );
    }
};

export default InquiryContents;