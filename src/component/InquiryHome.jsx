import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import InquiryList from './InquiryList';
import InquiryContents from './InquiryContents';
import InquiryForm from './InquiryForm';
import InquiryModify from './InquiryModify';
import './Inquiry.css';

const InquiryHome = () => {
    return (
        <div className='inquiryHome'>
            <h1>문의 하기</h1>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<InquiryList />} />
                    <Route path='/list' element={<InquiryList />} />
                    <Route path='/contents/:id' element={<InquiryContents />} />
                    <Route path='/form' element={<InquiryForm />} />
                    <Route path='/modify/:id' element={<InquiryModify />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default InquiryHome;