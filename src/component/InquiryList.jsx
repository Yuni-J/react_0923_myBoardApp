import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Inquiry.css';

const InquiryList = () => {
    //db에 저장되어 있는 inquiry 요소를 가져오기 => listInquiry 저장
    const [ listInquiry, setInquiry ] = useState([]);

    //비동기로 db에 접속하여 select로 가져오기
    // get : 데이터 가져올때 (생략 가능)
    // post : 데이터 보낼때 (반드시 써야 함)
    const getBoardData = async() =>{
        try{
            const boards = await axios.get('/list');
            console.log(boards);
            setInquiry(boards.data);
        }catch(error){
            console.log(error);
        }
    } 

    //컴포넌트가 랜더링 될 때, 혹은 업데이트 될 때 실행되는 hooks
    useEffect(()=>{
        getBoardData();
    },[]);

    if(listInquiry.length > 0){
        //안에 return
        return (
            <div className='inquiryList'>
                <h2>문의 내역</h2>
                <table>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>문의유형</th>
                            <th>제목</th>
                            <th>작성자</th>
                            <th>작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listInquiry.map( i => (
                                <tr key={i.id}>
                                    <td>{i.id}</td>
                                    <td>{i.type}</td>
                                    <td>
                                        <Link to={`/contents/${i.id}`} className='link'>{i.title}</Link>
                                    </td>
                                    <td>{i.writer}</td>
                                    <td>{i.reg_date.substring(0, i.reg_date.indexOf("T"))}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <Link to={'/form'}><button>문의하기</button></Link>
            </div>
        );
    }
};

export default InquiryList;