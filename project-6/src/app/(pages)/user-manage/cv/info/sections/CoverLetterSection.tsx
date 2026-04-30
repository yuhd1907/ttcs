"use client";

import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";

const MAX_COVER_LETTER = 500;

export default function CoverLetterSection() {
  const [isEditing, setIsEditing] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-6 relative">
      {!isEditing ? (
        <>
          <button
            onClick={() => setIsEditing(true)}
            className="absolute top-6 right-6 text-blue-500 hover:text-blue-600 transition-colors"
          >
            <CiEdit className="w-6 h-6" />
          </button>
          <div className="flex items-center min-h-[70px]">
            <div>
              <h2 className="text-[17px] font-bold text-gray-900 mb-1">
                Thư xin việc
              </h2>
              {coverLetter ? (
                <p className="text-[15px] text-gray-800 whitespace-pre-wrap">
                  {coverLetter}
                </p>
              ) : (
                <p className="text-[15px] text-gray-400">
                  Giới thiệu bản thân và lý do vì sao bạn sẽ là lựa chọn tuyển
                  dụng tuyệt vời
                </p>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-4">
          <h2 className="text-[17px] font-bold text-gray-900 pb-4 border-b border-gray-200">
            Thư xin việc
          </h2>
          <p className="text-[14px] text-gray-400 italic">
            Gợi ý: Bắt đầu bằng việc mô tả những gì bạn có thể mang đến cho
            công việc và tại sao công việc này lại khiến bạn hứng thú
          </p>
          <textarea
            value={coverLetter}
            onChange={(e) => {
              if (e.target.value.length <= MAX_COVER_LETTER)
                setCoverLetter(e.target.value);
            }}
            rows={6}
            className="w-full border border-gray-300 rounded-md p-3 text-[15px] text-gray-900 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 resize-none transition-all"
          />
          <div className="flex justify-between items-center">
            <span className="text-[13px] text-gray-500">
              {coverLetter.length}/{MAX_COVER_LETTER} ký tự
            </span>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsEditing(false)}
                className="text-[15px] font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Huỷ
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-2 rounded text-[15px] font-medium transition-colors"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
