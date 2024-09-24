import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Inquiry.css';

const InquiryForm = () => {

    const [ board, setBoard ] = useState({
        title: '',
        type: '',
        writer:'',
        contents: ''
    });

    const { title, type, writer, contents } = board;

    const onChange = (e) =>{
        const{ name, value } = e.target;
        setBoard({
            ...board,
            [name]:value
        })
    };

    const onCreate = async() =>{
        //board 객체를 서버로 전송
        //board 객체의 내용 중 하나라도 null 이면 안됨
        if(title === ''){
            alert('title is null!!');
        }
        if(writer === ''){
            alert('writer is null!!');
        }
        if(contents === ''){
            alert('contents is null!!');
        }
        if(window.confirm('등록하시겠습니까?')){
            try{
                const res = await axios.post('/insert', board);
                window.location.href = '/list';
            }catch(error){
                console.log(error);
            }
        }

    };

    return (
        <div className='inquiryForm'>
            <h2>문의 하기</h2>
            <div className='content'>
                <label htmlFor="type" className='type'>문의 유형
                    <select name="type" id="type" value={type} onChange={onChange}
                    style={{ marginLeft: '40px'}}>
                        <option value="">--문의 유형 선택--</option>
                        <option value="상품문의">상품문의</option>
                        <option value="배송문의">배송문의</option>
                        <option value="결제/취소문의">결제/취소문의</option>
                        <option value="교환/환불문의">교환/환불문의</option>
                        <option value="기타문의">기타문의</option>
                    </select>
                </label>
                <label htmlFor="w" className='writer'>작성자
                    <input type="text" id='w' name='writer' value={writer} onChange={onChange} />
                </label>
                <label htmlFor="t" className='title'>
                    <div>※제목은 최대 30자까지 입력 가능합니다.</div>제목
                    <input type="text" id='t' name='title' value={title} onChange={onChange} placeholder='제목을 입력해주세요' />
                </label>
                <label htmlFor="c" className='con'>내용
                    <textarea type="text" id='c' name='contents' value={contents} onChange={onChange} placeholder='내용을 입력해주세요' />
                </label>
            </div>
            <Link to={'/'}><button>취소</button></Link>
            <Link to={'/'}><button onClick={onCreate}>등록</button></Link>
        </div>
    );
};

export default InquiryForm;